import { Transaction } from 'sequelize/types';
import TransactionM from '../database/models/TransactionModel';
import { ITransaction } from '../interfaces/ITransaction';

export default class TransactionModel {
  findTransaction = async (string:string): Promise<ITransaction[] | null> => {
    const transactions = await TransactionM.findAll({ where: { $or: [
      { createdAt: string },
      { id: string },
    ] } });
    return transactions;
  };

  findAll = async (): Promise<ITransaction[]> => {
    const transactions = await TransactionM.findAll();
    return transactions;
  };

  createTransaction = async (
    creditedAccountId: number,
    debitedAccountId: number,
    value: number,
    t: Transaction,
  ): Promise<ITransaction | null> => {
    const transactions = await TransactionM
      .create({ creditedAccountId, debitedAccountId, value }, { transaction: t });
    return transactions;
  };

  filterTransaction = async (params: string, type: string): Promise<ITransaction[] | null> => {
    switch (type) {
      case 'debitedAccountId':
        return TransactionM.findAll({ where: { debitedAccountId: params } });
      case 'creditedAccountId':
        return TransactionM.findAll({ where: { creditedAccountId: params } });
      case 'createdAt':
        return TransactionM.findAll({ where: { createdAt: params } });
      default:
        break;
    }
    return null;
  };
}
