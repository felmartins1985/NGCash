import { ITransaction } from '../interfaces/ITransasction';
import sequelize from '../database/models';
import UserModel from '../model/UserModel'
import AccountModel from '../model/AccountModel';
export default class TransactionService {
  constructor(private userModel = new UserModel(),
  private accountModel= new AccountModel(),
  ) {}
  public async createTransaction(userCredited: string, userDebited: string, value: number){
    if(userCredited===userDebited){
      return {code: 400, message: 'You cant credit yourself'};
    }
    const userCreditedExists = await this.userModel.findOne(userCredited);
    const userDebitedExists = await this.userModel.findOne(userDebited);

    if(!userCreditedExists || !userDebitedExists){
      return { code: 400, message: 'User not found' };
    }
    const accountCredited = await this.accountModel.findOneAccount(userCreditedExists.accountId);
    const accountDebited = await this.accountModel.findOneAccount(userDebitedExists.accountId);
    if(!accountCredited || !accountDebited){
      return { code: 400, message: 'Account not found' };
    }
    if(Number(accountDebited.balance) < value || value < 0){
      return { code: 400, message: 'Insufficient funds' };
    }
    const newAddBalance = Number(accountCredited.balance) + value;
    const newSubBalance = Number(accountDebited.balance) - value;
    const t = await sequelize.transaction();
    try{
      await this.accountModel.newBalance(accountCredited.id, newAddBalance, t);
      await this.accountModel.newBalance(accountDebited.id, newSubBalance, t);
      await t.commit();
      return { code: 200, message: 'Transaction created' };
    }
    catch (error){
      await t.rollback();
      return { code: 500, message: 'Internal server error' };
    }
  }
  // public async findOneTransaction(string: string) { return this.transactionModel.findOneTransaction(string); }
}
