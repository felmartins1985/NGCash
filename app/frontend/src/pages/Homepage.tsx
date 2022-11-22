import React, { useEffect, useContext, useState }  from 'react';
import {requestFindAccount} from '../services/request';
import NgContext, {ContextInterface} from '../context/ngContext';
import Transaction from '../components/Transaction';
import TableTransactions from '../components/TableTransaction';
import { useNavigate } from 'react-router-dom';
function HomePage() {
  const navigate = useNavigate();
  const [doTransaction, setDoTransaction] = useState(true);
  const {balance, setBalance} = useContext(NgContext) as ContextInterface;
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const findAccount= async ()=>  {
    const account = await requestFindAccount(user.account, user.token);
    setBalance(account);
  }
  useEffect(() => {
    findAccount();
  }, []);
  const clickLogout = () => {
    localStorage.clear();
    navigate('/');
  }
  return (
    <div>
      <h1> Home Page </h1>
      <p> Bem-vindo, {user.username}. </p>
      <p>Seu saldo é: {balance.balance}</p>
      <button onClick={() => setDoTransaction(false)}>Fazer transação</button>
      <button type='button' onClick={clickLogout}>Sair</button>
      {doTransaction ? null : <Transaction/>}
      {doTransaction ? null : <TableTransactions/>}
    </div>
  );
}

export default HomePage;
