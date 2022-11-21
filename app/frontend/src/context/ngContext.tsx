import { createContext, Dispatch } from 'react';
import { IBalance } from '../interface/IBalance';
import { IAllTransactions } from '../interface/IAllTransactions';
export interface ContextInterface {
  balance: IBalance;
  setBalance: Dispatch<IBalance>;
  transactions: IAllTransactions[];
  setTransactions: Dispatch<IAllTransactions[]>;
}

const NgContext = createContext<ContextInterface | null>(null);

export default NgContext;
