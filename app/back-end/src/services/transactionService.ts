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
    if (Number(balanceDebited.balance) < Number(value) || Number(value) < 0) {
      return { code: 400, message: 'Insufficient funds' };
    }
    const newBalanceDebited = Number(balanceDebited.balance) - Number(value);
    const newBalanceCredited = Number(balanceCredited.balance) + Number(value);
    return { newBalanceCredited, newBalanceDebited };
  };

  createTransaction = async (userCredited: string, userDebited: string, value: number) => {
    const getUser = await this.verifyUser(userCredited, userDebited);
    if (getUser.code) return getUser;
    const getBalance = await this.verifyBalance(getUser.userCre, getUser.userDeb, value);
    if (getBalance.code) return getBalance;
    const t = await sequelize.transaction();
    try {
      await this.accountModel.newBalance(getUser.userCre.id, getBalance.newBalanceCredited, t);
      await this.accountModel.newBalance(getUser.userDeb.id, getBalance.newBalanceDebited, t);
      await this.transactionModel
        .createTransaction(getUser.userCre.id, getUser.userDeb.id, value, t);
      await t.commit();
      return { code: 200, message: 'Transaction created' };
    } catch (error) {
      await t.rollback();
      return { code: 500, message: 'Internal server error' };
    }
  };

  public async findTransactionsUser(id: number) {
    const transactions = await this.transactionModel.findTransactionsUser(id);
    if (!transactions) return { code: 404, message: 'Transactions not found' };
    return { code: 200, message: 'Transaction found', transactions };
  }

  public async filterTransaction(params: string, type: string) {
    const filter = await this.transactionModel.filterTransaction(params, type);

    if (!filter) return { code: 404, message: 'Transactions not found' };

    return filter;
  }
}
