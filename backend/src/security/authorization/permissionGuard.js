export function authorize(requiredRole, userRole) {
  if (!requiredRole) return true;
  if (requiredRole === 'admin') return userRole === 'admin';
  if (requiredRole === 'user') return ['user', 'admin'].includes(userRole);
  return userRole === requiredRole;
}

export function requirePermission(requiredRole, req, res, next) {
  const userRole = req.user?.role || 'guest';
  if (!authorize(requiredRole, userRole)) {
    return res.status(403).json({
      success: false,
      error: {
        code: 'FORBIDDEN',
        message: 'Você não possui permissão para executar esta ação.'
      }
    });
  }

  return next();
}
