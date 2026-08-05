export function writeSecurityLog(event, details = {}) {
  const payload = {
    timestamp: new Date().toISOString(),
    event,
    ...details
  };

  console.log('[SECURITY]', JSON.stringify(payload));
}
