import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import LoginService from '../services/loginService';
import 'dotenv/config';
import { IUser } from '../interfaces/IUser';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';
interface IToken {
  username: string;
}
export default async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (!token || token.length === 0) {
      return next({ code: 401, message: 'Token not found' });
    }
    const validateToken: IToken = verify(token, JWT_SECRET) as IToken;
    const service = new LoginService();
    const user = await service.findUser(validateToken.username) as IUser;
    if (!user) {
      return next({ code: 401, message: 'Token must be a valid token' });
    }
    next();
  } catch (err) {
    next({ code: 401, message: 'Token must be a valid token' });
  }
};
