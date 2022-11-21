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
    <div>
      <h1> Registre o seu Usuario </h1>
      <form onSubmit={handleSubmit(registerUser)}>
        <label htmlFor="name">
          Nome:
          <input type="text" id="name"  {...register('username')} />
        </label>
        <label htmlFor="password">
          Password:
          <input type="password" id="password" {...register('password')} />
        </label>
        <input type="submit" value="Registrar" />
        <button type="button" onClick={() => navigate('/login')}>Ja sou usuario</button>
      </form>
      {errorMessage!=='' && <p>{errorMessage}</p>}
    </div>
  );
}

export default RegisterPage;
