import { Transaction } from 'sequelize/types';
import Account from '../database/models/AccountModel';
import { IAccount } from '../interfaces/IAccount';

export default class AccountModel {
  createAccount = async (t: any, balance = 100): Promise<IAccount> => {
    const account = await Account.create({ balance }, { transaction: t });
    return account;
  };

  findOneAccount = async (id:number): Promise<IAccount | null> => {
    const account = await Account.findOne({ where: { id } });
    return account;
  };

  newBalance = async (id:number, balance:number, t: Transaction): Promise<any> => {
    const account = await Account.update({ balance }, { where: { id }, transaction: t });
    return account;
  };
}
