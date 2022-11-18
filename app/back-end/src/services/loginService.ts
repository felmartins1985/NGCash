import BcryptService from './utils/BcryptService';
import { ILogin } from '../interfaces/ILogin';
import createToken from './utils/createToken';
import UserModel from '../model/UserModel';
import AccountModel from '../model/AccountModel';
import sequelize from '../database/models';
const md5 = require('md5');
export default class LoginService {
  constructor(private userModel = new UserModel(),
  private accountModel= new AccountModel(),
  ) {}

  public async createUser(user: ILogin){
    if(user.username.length<3){
      return {code:400, message:'Username must be at least 3 characters long'}
    }
    const regexPassword=/^(?=.*\d)(?=.*[A-Z])[0-9a-zA-Z$*&@#]{8,}$/
    if(!regexPassword.test(user.password)){
      return {code:400,
        message:'Password must contain at least one uppercase letter, one number and at least 8 characters'}
    }
    const foundUser = await this.userModel.findOne(user.username);
    if (foundUser) {
      return { code: 409, message: 'USER already registered' };
    }
    const t = await sequelize.transaction();
    try{
      const account = await this.accountModel.createAccount(100, t);
      await this.userModel.createUser(user.username, md5(user.password), account.id, t);
      await t.commit();
      const token= createToken(user.username);
      return { code: 201, token };
    }
    catch (error){
      await t.rollback();
      return {code: 500, message: 'Something went wrong'}
    }    
  }

  public async login(user: ILogin) {
    const foundUser = await this.userModel.findOne(user.username);
    if (!foundUser) {
      return { code: 401, message: 'User not exist' };
    }
    console.log(foundUser)
    if (foundUser.password !== md5(user.password)) {
      return { code: 401, message: 'Incorrect email or password' };
    }
    const token = createToken(user.username);
    return { code: 200, token };
  }

  public async findUser(username: string) { return this.userModel.findOne(username); }
}
