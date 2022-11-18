import User from '../database/models/UserModel';
import { IUser } from '../interfaces/IUser';
export default class UserModel {
  protected _user: User;

  public async findOne(username:string): Promise<IUser | null> {
    const user = await User.findOne({ where: { username } });
    return user;
  }

  public async findAll(): Promise<IUser[]> {
    const users = await User.findAll();
    return users;
  }
  
  public async createUser(username:string, password:string, accountId: number, t: any): Promise<IUser> {
    const user = await User.create({ username, password, accountId },{transaction: t});
    return user;
  }
}
