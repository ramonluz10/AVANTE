import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { writeSecurityLog } from '../monitoring/logger.js';

const JWT_SECRET = process.env.JWT_SECRET || 'change-me-in-production';
const ACCESS_TOKEN_TTL = process.env.ACCESS_TOKEN_TTL || '15m';
const REFRESH_TOKEN_TTL = process.env.REFRESH_TOKEN_TTL || '7d';

const inMemoryUsers = new Map();
const refreshTokens = new Map();

function signToken(payload, expiresIn) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

export async function registerUser(req, res) {
  const { email, password, name } = req.body || {};

  if (!email || !password || !name) {
    return res.status(400).json({
      success: false,
      error: { code: 'INVALID_REGISTER', message: 'Nome, e-mail e senha são obrigatórios.' }
    });
  }

  const normalizedEmail = String(email).trim().toLowerCase();
  if (inMemoryUsers.has(normalizedEmail)) {
    return res.status(409).json({
      success: false,
      error: { code: 'USER_EXISTS', message: 'Este e-mail já está cadastrado.' }
    });
  }

  const passwordHash = await argon2.hash(password);
  const user = {
    id: `user_${Date.now()}`,
    email: normalizedEmail,
    name: String(name).trim(),
    passwordHash,
    role: 'user'
  };

  inMemoryUsers.set(normalizedEmail, user);
  writeSecurityLog('user_registered', { email: normalizedEmail, userId: user.id });

  return res.status(201).json({
    success: true,
    data: {
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    }
  });
}

export async function loginUser(req, res) {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: { code: 'INVALID_LOGIN', message: 'E-mail e senha são obrigatórios.' }
    });
  }

  const normalizedEmail = String(email).trim().toLowerCase();
  const user = inMemoryUsers.get(normalizedEmail);
  if (!user) {
    writeSecurityLog('login_failed', { email: normalizedEmail, reason: 'user_not_found' });
    return res.status(401).json({
      success: false,
      error: { code: 'INVALID_CREDENTIALS', message: 'Credenciais inválidas.' }
    });
  }

  const passwordOk = await argon2.verify(user.passwordHash, password);
  if (!passwordOk) {
    writeSecurityLog('login_failed', { email: normalizedEmail, reason: 'password_invalid' });
    return res.status(401).json({
      success: false,
      error: { code: 'INVALID_CREDENTIALS', message: 'Credenciais inválidas.' }
    });
  }

  const accessToken = signToken({ sub: user.id, role: user.role }, ACCESS_TOKEN_TTL);
  const refreshToken = signToken({ sub: user.id, type: 'refresh' }, REFRESH_TOKEN_TTL);
  refreshTokens.set(user.id, refreshToken);

  res.cookie('avante_refresh', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  writeSecurityLog('login_success', { email: normalizedEmail, userId: user.id });

  return res.status(200).json({
    success: true,
    data: {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    }
  });
}

export function refreshAccessToken(req, res) {
  const refreshToken = req.cookies?.avante_refresh;
  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      error: { code: 'REFRESH_REQUIRED', message: 'Refresh token ausente.' }
    });
  }

  try {
    const decoded = verifyToken(refreshToken);
    if (decoded.type !== 'refresh') {
      throw new Error('invalid-token-type');
    }

    const storedRefresh = refreshTokens.get(decoded.sub);
    if (!storedRefresh || storedRefresh !== refreshToken) {
      throw new Error('refresh-token-not-found');
    }

    const user = inMemoryUsers.get(Array.from(inMemoryUsers.values()).find((item) => item.id === decoded.sub)?.email || '');
    if (!user) {
      throw new Error('user-not-found');
    }

    const accessToken = signToken({ sub: user.id, role: user.role }, ACCESS_TOKEN_TTL);
    const newRefreshToken = signToken({ sub: user.id, type: 'refresh' }, REFRESH_TOKEN_TTL);
    refreshTokens.set(user.id, newRefreshToken);

    res.cookie('avante_refresh', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    writeSecurityLog('refresh_success', { userId: user.id });

    return res.status(200).json({ success: true, data: { accessToken } });
  } catch {
    writeSecurityLog('refresh_failed', { reason: 'token_invalid' });
    return res.status(401).json({
      success: false,
      error: { code: 'INVALID_REFRESH', message: 'Refresh token inválido.' }
    });
  }
}

export function logoutUser(req, res) {
  const refreshToken = req.cookies?.avante_refresh;
  if (refreshToken) {
    try {
      const decoded = verifyToken(refreshToken);
      refreshTokens.delete(decoded.sub);
    } catch {
      // sem ação adicional, apenas invalida o cookie
    }
  }

  res.clearCookie('avante_refresh', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  });

  writeSecurityLog('logout_success', { userId: req.user?.userId || 'anonymous' });

  return res.status(200).json({ success: true, data: { message: 'Logout realizado com sucesso.' } });
}
