import React, { ReactNode, useState } from 'react';
import { IAllTransactions } from '../interface/IAllTransactions';
import NgContext, { ContextInterface } from './ngContext';

interface Props {
  children: ReactNode;
}

function Provider({ children }: Props) {
  const [balance, setBalance] = useState({
    id:'',
    balance:''
  });
  const [transactions, setTransactions] = useState([] as IAllTransactions[])
  const value: ContextInterface = {
    balance,
    setBalance,
    transactions,
    setTransactions
  };

  return (
    <NgContext.Provider value={ value }>
      {children}
    </NgContext.Provider>
  );
}

export default Provider;