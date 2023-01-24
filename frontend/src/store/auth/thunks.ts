import { AnyAction, ThunkAction } from '@reduxjs/toolkit';
import { pharmaryLogin,pharmaryCheckAuth } from '../../helpers/auth';
import { RootState } from '../store';
import { AuthInitialState, checkingCredentials, login, logout } from './authSlice';

interface LoginProps {
  username:string,
  password:string
}

export const startLogin = ({ username,password }:LoginProps):ThunkAction<void,RootState,unknown,AnyAction> => {
  return async (dispatch,getState) => {
    dispatch(checkingCredentials())
    const data = await pharmaryLogin({ username,password })
    if(!data?.ok) return dispatch(logout({  errorMessage : `${data?.statusMsg} : ${data?.error}` } as AuthInitialState ))
    console.log(data)
    const fullname = `${data?.firstname} ${data?.lastname[0]}.`
    dispatch(login( { ...data,fullname, } as AuthInitialState ))
  }
}

export const startCheckingAuthentication = ():ThunkAction<void,RootState,unknown,AnyAction> => {
  return async (dispatch,getState) => {
    if( !localStorage.getItem("token") ) return dispatch(logout({ } as AuthInitialState ))
    const data = await pharmaryCheckAuth(localStorage.getItem("token") as string)
    if(!data?.ok) return dispatch(logout({  errorMessage : `${data?.statusMsg} : ${data?.error}` } as AuthInitialState ))
    const fullname = `${data?.firstname} ${data?.lastname[0]}.`
    dispatch(login( { ...data,fullname } as AuthInitialState ))
  }
}

export const startLogout = ():ThunkAction<void,RootState,unknown,AnyAction> => {
  return async (dispatch,getState) => {
    dispatch(checkingCredentials())
    localStorage.removeItem("token");
    dispatch(logout({ } as AuthInitialState ))
  }
}