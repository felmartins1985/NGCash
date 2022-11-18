import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
import User from './UserModel';
import Transaction from './TransactionModel';
class Accounts extends Model {
  id!: number;
  balance!: number;
}

Accounts.init({
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  balance: {
    type: INTEGER,
    allowNull: false
  }
}, {
  sequelize: db,
  timestamps: false,
  modelName: 'accounts',
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */


Transaction.belongsTo(Accounts, { foreignKey: 'id', as: 'accounts' });
Accounts.hasMany(Transaction, { foreignKey: 'debitedAccountId', as: 'debitedAccount' });
Accounts.hasMany(Transaction, { foreignKey: 'creditedAccountId', as: 'creditedAccount' });
Accounts.belongsTo(User, { foreignKey: 'id', as: 'users' });

export default Accounts;
