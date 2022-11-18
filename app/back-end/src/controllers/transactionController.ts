import { NextFunction, Request, Response } from 'express';
import TransactionsService from '../services/transactionService';
interface Transaction {
  userCredited: string,
  userDebited: string,
  value: number,
}
export default class LoginController {
  private transactionsService: TransactionsService;
  constructor() {
    this.transactionsService = new TransactionsService();
  }
  createTransaction = async (req: Request, res: Response, next: NextFunction) => {
    const { userCredited, userDebited, value } = req.body as Transaction;
    const { code, message } = await this.transactionsService.createTransaction(userCredited, userDebited, value);
    res.status(code).json({ message });
  };
}




