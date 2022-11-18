import Transaction from '../database/models/TransactionModel';
import { ITransaction } from '../interfaces/ITransasction';
export default class TransactionModel {
  protected _transaction: Transaction;

  public async findOneTransaction(string:string): Promise<ITransaction | null> {
    const transactions = await Transaction.findOne({ where: {$or:[
      { createdAt: string },
      { id: string },
    ] }});
    return transactions;
  }

  public async findAll(): Promise<ITransaction[]> {
    const transactions = await Transaction.findAll();
    return transactions;
  }
  public async createTransaction(creditedIdAccountId: number, debitedAccountId: number, value: number): Promise<ITransaction | null> {
    const transactions = await Transaction.create({ creditedIdAccountId, debitedAccountId, value });
    return transactions;
  }
}
