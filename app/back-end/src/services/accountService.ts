import { IAccount } from '../interfaces/IAccount';
import AccountModel from '../model/AccountModel';

export default class AccountService {
  constructor(private accountModel = new AccountModel()) {}

  public async findOneAccount(id:number): Promise<IAccount | null> {
    const account = await this.accountModel.findOneAccount(id);
    return account;
  }
}
