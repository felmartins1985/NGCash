import React, { useEffect, useContext, useState }  from 'react';
import {requestFindAccount} from '../services/request';
import NgContext, {ContextInterface} from '../context/ngContext';
import Transaction from '../components/Transaction';
import TableTransactions from '../components/TableTransaction';
import { useNavigate } from 'react-router-dom';
function HomePage() {
  const navigate = useNavigate();
  // const [doTransaction, setDoTransaction] = useState(true);
  const {balance, setBalance} = useContext(NgContext) as ContextInterface;
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  useEffect(() => {
    const findAccount= async ()=>  {
      const account = await requestFindAccount(user.account, user.token);
      setBalance(account);
    }
    findAccount();
  }, [setBalance, user.account, user.token]);
  const clickLogout = () => {
    localStorage.clear();
    navigate('/');
  }
  return (
    <div>
      <header className='bg-black text-white text-2xl flex items-center justify-between p-5 mb-10'>
      <p className='pl-10 w-[33%]'> Bem-vindo, {user.username}. </p>
      <p>Seu saldo é: {balance.balance}</p>
      <button className='flex justify-end hover:text-blue-300 pr-10 w-[33%]' type='button' onClick={clickLogout}>Sair</button>
      </header>
        <div className='flex flex-col items-center justify-between w-full p-4 '>
          <Transaction/>
          <TableTransactions/>
        </div>
    </div>
  );
}

export default HomePage;
