import React, {useState}  from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import requestCreateUser from '../services/request';
import {IRegister} from '../interface/IRegister';
 
function RegisterPage() {
  const { register, handleSubmit } = useForm<IRegister>();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  
  const registerUser= async (data: IRegister)=>{
    const response= await requestCreateUser(data);
    if(response.data){
      setErrorMessage(response.data.message);
      return null;
    }
    console.log(response)
    localStorage.setItem('user', JSON.stringify(response));
    navigate(`/homepage/${response.id}`);
  }

  return (
    <div className='flex justify-center items-center w-full h-screen'>
      <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={handleSubmit(registerUser)}>
      <h1 className='mb-4'> Registre o seu Usuario </h1>
      <div className="mb-4">
        <label className='block text-gray-700 text-sm font-bold mb-2 w-60' htmlFor="name">
          <input placeholder='Username' className=' shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="text" id="name"  {...register('username')} />
        </label>
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2 w-60" htmlFor="password" >
          <input className=' w-75 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="password" id="password" placeholder=' digite a sua senha' {...register('password')} />
        </label>
      </div>
      <div className="flex items-center justify-between">
      <input className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" value="Registrar" />
      <button className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" type="button" onClick={() => navigate('/login')}>Ja sou usuario</button>
      </div>
      {errorMessage!=='' && <p className="text-center text-red-700 text-xs mt-4">{errorMessage}</p>}
      </form>
    </div>
  );
}

export default RegisterPage;
