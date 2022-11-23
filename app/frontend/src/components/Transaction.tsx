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
    // <div >
      <form  className='w-[80%] rounded-2xl  mb-24 gap-8 bg-gray-100 px-10 py-6 flex flex-row items-center justify-evenly' onSubmit={handleSubmit(transaction)}>
        <div>
        <label className='block text-gray-700 text-sm font-bold mb-2 w-60' htmlFor="name">
          Nome:
          <input type="text" id="name" {...register('userCredited')} className=' w-75 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
        </label>
        </div>
        <div>
        <label className="block text-gray-700 text-sm font-bold mb-2 w-60" htmlFor="password">
          Valor:
          <input type="number" id="value"  {...register('value')} className=' w-75 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
        </label>
        </div>
        <div className="flex items-center justify-between">
        <input type="submit" value="Transferir" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none mt-2 focus:shadow-outline"/>
        </div>
      </form>

    // </div>
    );
}

export default Transaction;
