import crypto from 'crypto';

const defaultSecret = process.env.JWT_SECRET || 'change-me-in-production';

function base64UrlEncode(value) {
  return Buffer.from(value)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

function base64UrlDecode(value) {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  const padding = normalized.length % 4 === 0 ? '' : '='.repeat(4 - (normalized.length % 4));
  return Buffer.from(normalized + padding, 'base64').toString('utf8');
}

export function issueToken(payload, secret = defaultSecret) {
  const header = base64UrlEncode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = base64UrlEncode(JSON.stringify({ ...payload, iat: Math.floor(Date.now() / 1000) }));
  const signature = crypto.createHmac('sha256', secret).update(`${header}.${body}`).digest('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');

  return `${header}.${body}.${signature}`;
}

export function verifyToken(token, secret = defaultSecret) {
  if (!token || typeof token !== 'string') return null;
  const [header, body, signature] = token.split('.');
  if (!header || !body || !signature) return null;

  const expectedSignature = crypto.createHmac('sha256', secret).update(`${header}.${body}`).digest('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');

  if (signature !== expectedSignature) return null;

  try {
    const parsed = JSON.parse(base64UrlDecode(body));
    if (!parsed.exp || parsed.exp < Math.floor(Date.now() / 1000)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function buildSessionToken(userId, role = 'user') {
  return issueToken({
    sub: userId,
    role,
    exp: Math.floor(Date.now() / 1000) + 60 * 60
  });
}
