import User from '../database/models/UserModel';
import { IUser } from '../interfaces/IUser';

interface IUserModel {
  findOne(username: string): Promise<IUser | null>;

}
export default class UserModel implements IUserModel {
  protected _user: User;

  findOne = async (username:string): Promise<IUser | null> => {
    const user = await User.findOne({ where: { username } });
    return user;
  };

  findAll = async (): Promise<IUser[]> => {
    const users = await User.findAll();
    return users;
  };
  

  createUser = async (
    username:string,
    password:string,
    accountId: number,
    t: any,
  ): Promise<IUser> => {
    const user = await User.create({ username, password, accountId }, { transaction: t });
    return user;
  };
}
