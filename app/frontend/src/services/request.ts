import axios from 'axios';
import { ILogin } from '../interface/ILogin';
import { IRegister } from '../interface/IRegister';
import { ITransaction } from '../interface/ITransaction';

const requestCreateUser= async (user: IRegister) =>{
  try {
    const URL = 'http://localhost:3001/register';
    const response = await axios.post(URL, user);
    return response.data;
  } catch (error: any) {
    console.log(error)
    return error.response;
  }
}

export const requestLoginUser= async (user: ILogin) =>{
  try {
    const URL = 'http://localhost:3001/login';
    const response = await axios.post(URL, user);
    return response.data;
  } catch (error: any) {
    return error.response;
  }
}

export const requestFindAccount = async (id: string, token: string) => {
  try {
    const URL = `http://localhost:3001/account/${id}`;
    const response = await axios.get(URL, {
      headers: {
        Authorization: `${token}`,
      }
    });
    return response.data;
  } catch (error: any) {
    return error.response;
  }
};
export const requestCreateTransaction = async (transaction:ITransaction, token:string) => {
  try {
    const URL = `http://localhost:3001/transaction/`;
    const response = await axios.post(URL, transaction, {
      headers: {
        Authorization: token,
      }
    });
    return response.data;
  } catch (error: any) {
    return error.response;
  }
};

export const requestGetAllTransactions = async (id: string, token: string) => {
  try { 
    const URL = `http://localhost:3001/transaction/${id}`;
    const response = await axios.get(
      URL,
      {
      headers: {
        Authorization: token,
      }
    });
    return response.data;
  } catch (error: any) {  
    return error.response;
  }
};

export const requestGetUsers = async () => {
  try {
    const URL = 'http://localhost:3001/users';
    const response = await axios.get(URL);
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    return error.response;
  }
};
export default requestCreateUser;