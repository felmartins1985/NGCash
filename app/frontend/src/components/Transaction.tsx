/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { useForm } from 'react-hook-form';
import {ITransactionForm } from '../interface/ITransaction';
import {requestCreateTransaction} from '../services/request';
function Transaction() {
  const { register, handleSubmit } = useForm<ITransactionForm>();
  const transaction= async (data: ITransactionForm)=>  {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const transaction={
      userDebited: user.username,
      userCredited: data.userCredited,
      value: data.value,
    }
    const response = await requestCreateTransaction(transaction, user.token);
    if (response.data) {
      alert(response.data.message);
      return null;
    }
    alert(response.message);
    window.location.reload();
  }
  return (
    <div>
      <form onSubmit={handleSubmit(transaction)}>
        <label htmlFor="name">
          Nome:
          <input type="text" id="name" {...register('userCredited')} />
        </label>
        <label htmlFor="password">
          Valor:
          <input type="number" id="value"  {...register('value')} />
        </label>
        <input type="submit" value="Transferir" />
      </form>

    </div>
    );
}

export default Transaction;
