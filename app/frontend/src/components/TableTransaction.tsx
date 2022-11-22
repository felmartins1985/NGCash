import React, { useEffect, useContext, useState } from 'react';
import { requestGetAllTransactions, requestGetUsers, requestFilterTransactions } from '../services/request';
import NgContext, { ContextInterface } from '../context/ngContext';
import newMoment from '../services/moment';

function TableTransactions() {
  const { transactions, setTransactions } = useContext(NgContext) as ContextInterface;
  const [users, setUsers] = useState([] as any);
  const [date, setDate] = useState('');
  const Thead = [ 'Credito', 'Debito', 'Valor', 'Data' ];
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const getAllTransactions = async () => {
    const transactionsResult = await requestGetAllTransactions(user.account, user.token);
    const users = await requestGetUsers();
    setTransactions(transactionsResult);
    setUsers(users);
  };

  useEffect(() => {
    if (transactions.length === 0) {
      getAllTransactions();
    }
  },[]);

  const handleChange = async ({target: {value}}: any) => {
  const response= await  requestFilterTransactions(user.account, value, user.token)
  console.log(response);
  if(response.length === 0) {
    alert('Nenhuma transação encontrada');
    return null;
  }  
  setTransactions(response);  
  }
  const handleDate = ({target: {value}}: any)=>{
    setDate(value);
  }
  const onSubmit = async (data: any) => {
    const transactionsDate = await requestFilterTransactions(user.accountId, 'createdAt', user.token);
    const filter = transactionsDate.filter((transaction: any) => transaction.createdAt.includes(date));
    if (filter.length === 0) {
      alert('Não existem transações nesta data');
      return null;
    }   
    setTransactions(filter);    
  };
  
  return (
    <div>
      
   <label htmlFor="cash">Selecione</label>
      <select name="cash" id="cash" onChange={handleChange}>
        <option value="createdAt">Todas</option>
        <option value="creditedAccountId">Cash-in</option>
        <option value="debitedAccountId">Cash-out</option>
      </select>
      <label htmlFor='date'>
      <input type="date" id='date' onChange={handleDate} />
      </label>
      <button type='button' onClick={onSubmit}> Filtrar por Data</button>
      <table>
      <thead>
        <tr>
        {Thead.map((item) => <th key={item}>{item}</th>)}
        </tr>
      </thead>
      <tbody>
        {!transactions? null :(transactions.map((transaction, index) => (
          <tr key={index}>
            <td>{ users.find((user: any) => user.accountId === transaction.creditedAccountId ).username }</td>
            <td>
            { users.find((user: any) => user.accountId === transaction.debitedAccountId ).username }
            </td>
            <td>{transaction.value}</td>
            <td>{ newMoment(transaction.createdAt) }</td>
          </tr>
        )))}
      </tbody>
      
    </table>
    </div>
  );
}

export default TableTransactions;