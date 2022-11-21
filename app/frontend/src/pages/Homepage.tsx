import React, { useEffect, useContext, useState }  from 'react';
import {requestFindAccount} from '../services/request';
import NgContext, {ContextInterface} from '../context/ngContext';
import Transaction from '../components/Transaction';
import TableTransactions from '../components/TableTransaction';
function HomePage() {
  const [doTransaction, setDoTransaction] = useState(true);
  const {balance, setBalance} = useContext(NgContext) as ContextInterface;
  const findAccount= async ()=>  {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const account = await requestFindAccount(user.account, user.token);
    setBalance(account);
  }
  useEffect(() => {
    findAccount();
  }, []);
  return (
    <div>
      <h1> Home Page </h1>
      <p>Seu saldo é: {balance.balance}</p>
      <button onClick={() => setDoTransaction(false)}>Fazer transação</button>
      {doTransaction ? null : <Transaction/>}
      {doTransaction ? null : <TableTransactions/>}
    </div>
  );
}

export default HomePage;
