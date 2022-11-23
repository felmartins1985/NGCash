import { NextFunction, Request, Response } from 'express';
import TransactionsService from '../services/transactionService';

interface Transaction {
  userCredited: string,
  userDebited: string,
  value: number,
}

interface filterTransaction{
  params: string,
  type: string
}
export default class LoginController {
  private transactionsService: TransactionsService;
  constructor() {
    this.transactionsService = new TransactionsService();
  }

  createTransaction = async (req: Request, res: Response, _next: NextFunction) => {
    const { userCredited, userDebited, value } = req.body as Transaction;
    const { code, message } = await this.transactionsService
      .createTransaction(userCredited, userDebited, value);
    res.status(code).json({ message });
  };

  filterTransaction = async (req: Request, res: Response, _next: NextFunction) => {
    const { params, type } = req.query as unknown as filterTransaction;
    const transactions = await this.transactionsService.filterTransaction(params, type);
    res.status(200).json(transactions);
  };

  findTransactionsUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { code, transactions } = await this
      .transactionsService.findTransactionsUser(Number(id));
    res.status(code).json(transactions);
  };
}
