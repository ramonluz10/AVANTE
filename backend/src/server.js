import 'dotenv/config';
import crypto from 'node:crypto';
import express from 'express';
import compression from 'compression';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { verifyToken } from './security/authentication/tokenService.js';
import { requirePermission } from './security/authorization/permissionGuard.js';
import { sanitizePayload, validatePayloadShape } from './security/validators/requestSanitizer.js';
import { writeSecurityLog } from './security/monitoring/logger.js';
import authRoutes from './security/authentication/authRoutes.js';

const app = express();
const port = process.env.PORT || 4000;
app.set('trust proxy', 1);
const groqApiKey = process.env.GROQ_API_KEY;
const geminiApiKey = process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;
const activeProvider = groqApiKey ? 'groq' : geminiApiKey ? 'gemini' : 'fallback';
const providerModel = process.env.GROQ_MODEL || process.env.GEMINI_MODEL || 'llama-3.1-8b-instant';
const providerConfigured = Boolean(groqApiKey || geminiApiKey);
const fallbackEnabled = process.env.AVI_FALLBACK !== 'false';
const fallbackReply = process.env.AVI_FALLBACK_REPLY || 'Oi! Estou em modo de teste do Avi. Posso te ajudar a organizar seu estudo com uma resposta local enquanto o provedor externo não estiver disponível.';

const allowedOrigins = [
  process.env.FRONTEND_ORIGIN,
  'http://localhost:3000',
  'http://localhost:3001'
].filter(Boolean);

app.disable('x-powered-by');
app.use(compression());
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: false
  })
);
app.use((_, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
});
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`Origem não permitida pelo CORS: ${origin}`));
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false, limit: '1mb' }));
app.use(cookieParser());

app.use((req, _res, next) => {
  req.requestId = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
  next();
});

const aviChatLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Muitas solicitações de conversa foram recebidas. Tente novamente em instantes.'
  }
});

app.use('/api/auth', authRoutes);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'avante-backend', aviConfigured: providerConfigured, provider: activeProvider });
});

app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err?.message || err);
  res.status(err?.statusCode || 500).json({
    success: false,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Ocorreu um erro interno no servidor.'
    }
  });
});

app.get('/api/dashboard', (_req, res) => {
  res.json({
    todayFocus: 'Revisar matemática',
    consistency: 91,
    plannedBlocks: 3,
    mentorMessage: 'Você está indo bem. Vamos ajustar o plano para manter a calma e o ritmo.'
  });
});

const AVI_SYSTEM_PROMPT = `Você é o Avi, o mentor de estudos do Avante, um app brasileiro de planejamento de estudos.
Seu tom é: acolhedor, calmo, direto — nunca performático ou infantilizado. Você nunca causa ansiedade.
Você ajuda a pessoa a organizar tarefas, priorizar o que estudar e comemorar pequenas conquistas.
Responda sempre em português do Brasil, em respostas curtas (2-4 frases), como uma conversa real.
Nunca use emojis em excesso — no máximo um, e só quando fizer sentido.`;

// Endpoint real de chat do Avi, usando o provedor ativo configurado no backend.
// A chave nunca é exposta ao frontend — fica só aqui, lida de process.env.
app.use('/api/avi/chat', aviChatLimiter);
app.post('/api/avi/chat', async (req, res, next) => {
  if (!validatePayloadShape(req.body || {}, ['message', 'history'])) {
    writeSecurityLog('invalid_payload_shape', { requestId: req.requestId, endpoint: '/api/avi/chat' });
    return res.status(400).json({
      success: false,
      error: {
        code: 'INVALID_PAYLOAD',
        message: 'Payload inválido para esta operação.'
      },
      requestId: req.requestId
    });
  }

  const sanitizedPayload = sanitizePayload(req.body || {});
  req.body = sanitizedPayload;

  const token = req.headers.authorization?.replace(/^Bearer\s+/i, '') || null;
  const decoded = verifyToken(token);

  if (!decoded) {
    writeSecurityLog('unauthorized_request', { requestId: req.requestId, endpoint: '/api/avi/chat' });
    return res.status(401).json({
      success: false,
      error: {
        code: 'AUTH_REQUIRED',
        message: 'Você precisa estar autenticado para usar o Avi.'
      },
      requestId: req.requestId
    });
  }

  req.user = { role: decoded.role || 'user', userId: decoded.sub };

  return requirePermission('user', req, res, () => next());
}, async (req, res) => {
  if (!providerConfigured) {
    return res.status(503).json({
      error: 'A chave do provedor de IA não está configurada no backend. Adicione-a no arquivo .env e reinicie o servidor.'
    });
  }

  const { message, history } = req.body || {};
  if (!message || typeof message !== 'string') {
    return res.status(400).json({
      success: false,
      error: {
        code: 'INVALID_MESSAGE',
        message: 'Campo "message" é obrigatório.'
      },
      requestId: req.requestId
    });
  }

  const trimmedMessage = message.trim();
  if (trimmedMessage.length < 1 || trimmedMessage.length > 500) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'INVALID_MESSAGE_LENGTH',
        message: 'Campo "message" deve ter entre 1 e 500 caracteres.'
      },
      requestId: req.requestId
    });
  }

  try {
    const safeHistory = Array.isArray(history)
      ? history.slice(-10).map((m) => ({
          from: m.from === 'user' ? 'user' : 'avi',
          text: String(m.text || '').slice(0, 250)
        }))
      : [];

    const messages = [
      { role: 'system', content: AVI_SYSTEM_PROMPT },
      ...safeHistory.map((m) => ({
        role: m.from === 'user' ? 'user' : 'assistant',
        content: m.text
      })),
      { role: 'user', content: trimmedMessage }
    ];

    let reply = '';

    if (activeProvider === 'groq') {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${groqApiKey}`
        },
        body: JSON.stringify({
          model: providerModel,
          messages,
          temperature: 0.7,
          max_tokens: 300
        })
      });

      const data = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(data?.error?.message || 'Erro ao falar com o provedor Groq.');
      }

      reply = data?.choices?.[0]?.message?.content?.trim()
        || 'Desculpa, não consegui pensar em uma resposta agora. Pode tentar de novo?';
    } else {
      const contents = [
        ...(Array.isArray(history)
          ? history.slice(-10).map((m) => ({
              role: m.from === 'user' ? 'user' : 'model',
              parts: [{ text: String(m.text || '') }]
            }))
          : []),
        {
          role: 'user',
          parts: [{ text: message }]
        }
      ];

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${providerModel}:generateContent?key=${geminiApiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: AVI_SYSTEM_PROMPT }]
            },
            contents
          })
        }
      );

      const data = await response.json().catch(() => null);
      if (!response.ok) {
        const providerMessage = data?.error?.message || 'Não foi possível falar com o Avi agora. Tente novamente em instantes.';
        const detailMessage = providerMessage.includes('quota')
          ? 'O Gemini está sem quota disponível para este projeto. Verifique o billing do Google AI Studio.'
          : providerMessage;
        throw new Error(detailMessage);
      }

      reply = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim()
        || 'Desculpa, não consegui pensar em uma resposta agora. Pode tentar de novo?';
    }

    writeSecurityLog('ai_response_success', {
      requestId: req.requestId,
      userId: req.user?.userId,
      endpoint: '/api/avi/chat'
    });

    res.json({ success: true, reply, requestId: req.requestId });
  } catch (err) {
    console.error('Erro ao chamar a API do provedor de IA:', err.message);
    writeSecurityLog('ai_response_error', {
      requestId: req.requestId,
      userId: req.user?.userId,
      endpoint: '/api/avi/chat',
      message: err.message
    });

    if (fallbackEnabled) {
      return res.json({ success: true, reply: fallbackReply, requestId: req.requestId });
    }

    const statusCode = err.message.includes('quota') ? 429 : 502;
    const errorMessage = err.message.includes('quota')
      ? 'O provedor de IA está sem quota disponível para este projeto. Verifique o billing do provedor.'
      : 'Não foi possível falar com o Avi agora. Tente novamente em instantes.';

    res.status(statusCode).json({
      success: false,
      error: {
        code: statusCode === 429 ? 'AI_QUOTA' : 'AI_ERROR',
        message: errorMessage
      },
      requestId: req.requestId
    });
  }
});

app.listen(port, () => {
  console.log(`Backend Avante rodando em http://localhost:${port}`);
  if (!providerConfigured) {
    console.warn('⚠️  Nenhuma chave de IA encontrada — o chat do Avi vai responder com fallback local ou erro até você configurar o .env');
  } else {
    console.log(`Provedor ativo: ${activeProvider}`);
  }
});
