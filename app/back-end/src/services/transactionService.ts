import { IUser } from '../interfaces/IUser';
import sequelize from '../database/models';
import UserModel from '../model/UserModel';
import AccountModel from '../model/AccountModel';
import TransactionModel from '../model/TransactionModel';

export default class TransactionService {
  constructor(
    private userModel = new UserModel(),
    private accountModel = new AccountModel(),
    private transactionModel = new TransactionModel(),
  ) {}

  verifyUser = async (userCredited: string, userDebited: string): Promise<any> => {
    if (userCredited === userDebited) {
      return { code: 400, message: 'You cannot transfer to yourself' };
    }
    const userDeb = await this.userModel.findOne(userDebited);
    const userCre = await this.userModel.findOne(userCredited);
    if (!userDeb || !userCre) return { code: 401, message: 'User not exists' };
    return { userCre, userDeb };
  };

  verifyBalance = async (userCredited: IUser, userDebited: IUser, value: number): Promise<any> => {
    const balanceDebited = await this.accountModel.findOneAccount(userDebited.accountId);
    const balanceCredited = await this.accountModel.findOneAccount(userCredited.accountId);
    if (!balanceCredited || !balanceDebited) {
      return { code: 401, message: 'Incorrect email or password' };
    }
    if (Number(balanceDebited.balance) < value || value < 0) {
      return { code: 400, message: 'Insufficient funds' };
    }
    const newBalanceDebited = Number(balanceDebited.balance) - value;
    const newBalanceCredited = Number(balanceCredited.balance) + value;
    return { newBalanceCredited, newBalanceDebited };
  };

  createTransaction = async (userCredited: string, userDebited: string, value: number) => {
    const { userCre, userDeb } = await this.verifyUser(userCredited, userDebited);
    const { newBalanceDebited, newBalanceCredited } = await this
      .verifyBalance(userCre, userDeb, value);
    const t = await sequelize.transaction();
    try {
      await this.accountModel.newBalance(userCre.id, newBalanceCredited, t);
      await this.accountModel.newBalance(userDeb.id, newBalanceDebited, t);
      await this.transactionModel.createTransaction(userCre.id, userDeb.id, value, t);
      await t.commit();
      return { code: 200, message: 'Transaction created' };
    } catch (error) {
      await t.rollback();
      return { code: 500, message: 'Internal server error' };
    }
  };

  public async filterTransaction(params: string, type: string) {
    const filter = await this.transactionModel.filterTransaction(params, type);
    return filter;
  }
}
