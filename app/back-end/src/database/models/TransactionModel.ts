import { Model, INTEGER, DATE } from 'sequelize';
import db from '.';

class Transaction extends Model {
  id!: number;
  debitedAccountId!: number;
  creditedAccountId!:number;
  value!: number;
  createdAt!: Date;
}

Transaction.init({
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  debitedAccountId: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: 'accounts',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  creditedAccountId: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: 'accounts',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  createdAt: {
    type: DATE,
    allowNull: false,
  }
  }, {
  sequelize: db,
  modelName: 'transactions',
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */



export default Transaction;
