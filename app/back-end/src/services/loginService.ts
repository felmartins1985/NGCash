import * as md5 from 'md5';
import { ILogin } from '../interfaces/ILogin';
import createToken from './utils/createToken';
import UserModel from '../model/UserModel';
import AccountModel from '../model/AccountModel';
import sequelize from '../database/models';

export default class LoginService {
  constructor(
    private userModel = new UserModel(),
    private accountModel = new AccountModel(),
  ) {}

  static verifyPassword(password: string) {
    const regexPassword = /^(?=.*\d)(?=.*[A-Z])[0-9a-zA-Z$*&@#]{8,}$/;
    if (!regexPassword.test(password)) {
      return false;
    }
    return true;
  }

  public async createUser(user: ILogin) {
    if (user.username.length < 3) {
      return { code: 400, message: 'Username must be at least 3 characters long' };
    }
    const verifyPassword = LoginService.verifyPassword(user.password);
    if (verifyPassword !== true) { return { code: 400, message: 'Password invalid' }; }
    const foundUser = await this.userModel.findOne(user.username);
    if (foundUser) { return { code: 409, message: 'USER already registered' }; }
    const t = await sequelize.transaction();
    try {
      const account = await this.accountModel.createAccount(t, 100);
      const newUser = await this.userModel.createUser(user.username, md5(user.password), account.id, t);
      await t.commit();
      const token = createToken(user.username);
      const allInformations = {
        id: newUser.id, username: newUser.username, token, account: newUser.accountId,
      };
      return { code: 200, data: allInformations };
    } catch (error) {
      await t.rollback();
      return { code: 500, message: 'Something went wrong' };
    }
  }

  public async login(user: ILogin) {
    const foundUser = await this.userModel.findOne(user.username);
    if (!foundUser) {
      return { code: 401, message: 'User not exist' };
    }
    if (foundUser.password !== md5(user.password)) {
      return { code: 401, message: 'Incorrect email or password' };
    }
    const token = createToken(user.username);
    const allInformations = {
      id: foundUser.id,
      username: foundUser.username,
      token,
      account: foundUser.accountId,
    };
    return { code: 200, data: allInformations };
  }

  public async findAll() {
    const users = await this.userModel.findAll();
    if (!users) return { code: 404, message: 'Users not found' };
    return { code: 200, data: users };
  }

  public async findUser(username: string) { return this.userModel.findOne(username); }
}
