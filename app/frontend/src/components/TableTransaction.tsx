import React, { useEffect, useContext, useState } from 'react';
import { requestGetAllTransactions, requestGetUsers } from '../services/request';
import NgContext, { ContextInterface } from '../context/ngContext';
import moment from '../services/moment';

function TableTransactions() {
  const { transactions, setTransactions } = useContext(NgContext) as ContextInterface;
  const [users, setUsers] = useState([] as any);
  const Thead = [ 'Credito', 'Debito', 'Valor', 'Data' ];

  const getAllTransactions = async () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const transactionsResult = await requestGetAllTransactions(user.account, user.token);
    setTransactions(transactionsResult);
    const users = await requestGetUsers();
    setUsers(users);
  };

  useEffect(() => {
    if (transactions.length === 0) {
      getAllTransactions();
    }
  },[]);

  return (
    <table>
      <thead>
        <tr>
        {Thead.map((item) => <th key={item}>{item}</th>)}
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr key={transaction.id}>
            <td>{ users.find((user: any) => user.accountId === transaction.creditedAccountId ).username }</td>
            <td>
            { users.find((user: any) => user.accountId === transaction.debitedAccountId ).username }
            </td>
            <td>{transaction.value}</td>
            <td>{ moment(transaction.createdAt) }</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableTransactions;