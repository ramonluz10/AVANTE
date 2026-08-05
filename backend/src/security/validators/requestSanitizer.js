function sanitizeString(input) {
  if (typeof input !== 'string') return input;
  return input.trim().replace(/[<>]/g, '').slice(0, 500);
}

export function sanitizePayload(payload) {
  if (Array.isArray(payload)) {
    return payload.map((item) => sanitizePayload(item));
  }

  if (payload && typeof payload === 'object') {
    return Object.fromEntries(
      Object.entries(payload).map(([key, value]) => [key, sanitizePayload(value)])
    );
  }

  if (typeof payload === 'string') {
    return sanitizeString(payload);
  }

  return payload;
}

export function validatePayloadShape(payload, allowedKeys = []) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return false;
  }

  const invalidKeys = Object.keys(payload).filter((key) => !allowedKeys.includes(key));
  return invalidKeys.length === 0;
}
