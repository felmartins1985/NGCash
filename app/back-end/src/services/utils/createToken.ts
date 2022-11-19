import { sign, SignOptions } from 'jsonwebtoken';
import 'dotenv/config';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

export default (username:string) => {
  const jwtConfig: SignOptions = { expiresIn: '7d', algorithm: 'HS256' };
  const token = sign({ username }, JWT_SECRET, jwtConfig);
  return token;
};
