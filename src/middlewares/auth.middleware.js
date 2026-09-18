import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'modulo7_secret';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    const error = new Error('Token no proporcionado');
    error.status = 401;
    return next(error);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (error) {
    const authError = new Error('Token inválido o expirado');
    authError.status = 401;
    return next(authError);
  }
};

export { authMiddleware };
export default authMiddleware;
