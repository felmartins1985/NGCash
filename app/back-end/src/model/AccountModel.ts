import Account from '../database/models/AccountModel';
import { IAccount } from '../interfaces/IAccount';
import { Transaction } from 'sequelize/types';
export default class AccountModel {
  protected _account: Account;

  public async createAccount(balance=100, t: any): Promise<IAccount> {
    const account = await Account.create({balance},{transaction: t});
    return account;
  }
  public async findOneAccount(id:number): Promise<IAccount | null> {
    const account = await Account.findOne({ where: { id } });
    return account;
  }

  public async newBalance(id:number, balance:number, t: Transaction): Promise<any> {
    const account = await Account.update({balance},{ where: { id }, transaction: t});
    return account;
  }
} 
