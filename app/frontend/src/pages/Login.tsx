import React  from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {requestLoginUser} from '../services/request';
import {ILogin} from '../interface/ILogin';
function LoginPage() {
  const { register, handleSubmit } = useForm<ILogin>();
  const navigate = useNavigate();
  const loginUser= async (data: ILogin)=>  {
    const user = await requestLoginUser(data);
    localStorage.setItem('user', JSON.stringify(user.data));
    navigate(`/homepage/${user.data.id}`);
  }

  return (
    <div className='flex justify-center items-center w-full h-screen'>
      <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={handleSubmit(loginUser)}>
      <h1 className='mb-4'> Digite o seu Usuario e Password </h1>
        <div className="mb-4">
        <label className='block text-gray-700 text-sm font-bold mb-2 w-60' htmlFor="name">
          <input placeholder='Username' type="text" id="name" className=' w-75 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' {...register('username')} />
        </label>
        </div>
        <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2 w-60" htmlFor="password">
          <input className=' w-75 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder=' digite a sua senha' type="password" id="password"  {...register('password')} />
        </label>
        </div>
        <div className="flex items-center justify-between">
        <input className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" value="Logar" />
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
