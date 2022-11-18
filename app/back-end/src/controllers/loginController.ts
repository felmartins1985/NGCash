import { NextFunction, Request, Response } from 'express';
import { ILogin } from '../interfaces/ILogin';
import LoginService from '../services/loginService';

export default class LoginController {
  private service: LoginService;

  constructor() {
    this.service = new LoginService();
  }

  public async createUser(req: Request, res: Response, next: NextFunction) {
    const user = req.body as ILogin;
    const { code, token, message } = await this.service.createUser(user);
    if (message) {
      return next({ code, message });
    }
    return res.status(code).json({ token });
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    const user = req.body as ILogin;
    const { code, token, message } = await this.service.login(user);
    if (message) {
      return next({ code, message });
    }
    return res.status(code).json({ token });
  }

}
