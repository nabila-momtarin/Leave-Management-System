// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// import { jwtConfig } from '../config/jwt';

// export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
//   // Extract token from Authorization header
//   const token = req.header('Authorization')?.replace('Bearer ', '');

//   if (!token) {
//     return res.status(401).json({ message: 'Access Denied. No Token Provided.' });
//   }

//   // Verify the token
//   jwt.verify(token, jwtConfig.secretKey, (err, decoded) => {
//     if (err) {
//       return res.status(403).json({ message: 'Invalid or expired token.' });
//     }

//     // Attach decoded user data to request
//     req.user = decoded;
//     next();
//   });
// };
