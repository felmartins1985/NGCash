import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
import Account from './AccountModel';
class Users extends Model {
  id!: number;
  username!: string;
  password!: string;
  accountId!: number;
}

Users.init({
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  username: {
    type: STRING(100),
    allowNull: false,
  },
  password: {
    type: STRING(100),
    allowNull: false,
  },
  accountId: {
    type: INTEGER,
    allowNull: false,
    references:{
      model: 'accounts',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  }
}, {
  sequelize: db,
  timestamps: false,
  modelName: 'users',
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// Users.hasOne(Account, { foreignKey: 'accountId', as: 'accounts' });


export default Users;
