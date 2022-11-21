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
    <div>
      <h1> Digite o seu Usuario e Password </h1>
      <form onSubmit={handleSubmit(loginUser)}>
        <label htmlFor="name">
          Nome:
          <input type="text" id="name" {...register('username')} />
        </label>
        <label htmlFor="password">
          Password:
          <input type="password" id="password"  {...register('password')} />
        </label>
        <input type="submit" value="Logar" />
      </form>
    </div>
  );
}

export default LoginPage;
