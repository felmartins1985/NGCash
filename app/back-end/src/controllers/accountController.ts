import { NextFunction, Request, Response } from 'express';
import AccountService from '../services/accountService';

export default class AccountController {
  private service: AccountService;

  constructor() {
    this.service = new AccountService();
  }

  public async findOneAccount(req: Request, res: Response, _next: NextFunction) {
    const id = Number(req.params.id);
    const account = await this.service.findOneAccount(id);
    return res.status(200).json(account);
  }
}
