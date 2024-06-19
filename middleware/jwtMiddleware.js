import jwt from 'jsonwebtoken';
import { promisify } from 'util';

const verifyJwt = promisify(jwt.verify);

export const authenticateJWT = (req, res, next) => {
  // const token = req.headers.token?.split(' ')[1];
  const {token} = req.cookies;

  if (!token) {
    return res.status(401).json({ message: 'No hay token proporcionado' });
  }

  try {
    const decoded = verifyJwt(token, '12345');
    req.user = decoded; // Adjunta los datos decodificados del usuario al objeto de solicitud
    next();
  } catch (error) {
    console.error(error);
    res.status(403).json({ message: 'Token inválido' });
  }
};
