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
    <div className='w-[80%]'>
    <div className=' flex justify-evenly items-center'>
    <label  className='px-3 flex items-center gap-3' htmlFor="cash">Selecione
      <select name="cash" id="cash" onChange={handleChange} className=' w-[200px] shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
        <option value="createdAt">Todas</option>
        <option value="creditedAccountId">Cash-in</option>
        <option value="debitedAccountId">Cash-out</option>
      </select>
    </label>
      <label htmlFor='date'>
      <input type="date" id='date' onChange={handleDate} className=' w-[200px] shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
      </label>
      <button type='button' 
      onClick={onSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"> Filtrar por Data</button>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8" >
            <div className="overflow-hidden" >
      <table className="min-w-full text-center ">
      <thead className="border-b bg-gray-800">
        <tr>
        {Thead.map((item) => <th className="text-sm font-medium text-white px-6 py-4" key={item}>{item}</th>)}
        </tr>
      </thead >
      <tbody>
        {!transactions? null :(transactions.map((transaction, index) => (
          <tr className="bg-white border-b" key={index}>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{ users.find((user: any) => user.accountId === transaction.creditedAccountId ).username }</td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            { users.find((user: any) => user.accountId === transaction.debitedAccountId ).username }
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{transaction.value}</td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{ newMoment(transaction.createdAt) }</td>
          </tr>
        )))}
      </tbody>
      
    </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableTransactions;