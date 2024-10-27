import { createAction } from '@reduxjs/toolkit';

export const actionChangeCredential = createAction<{
  name: 'email' | 'password';
  value: string;
}>('auth/CHANGE_CREDENTIAL');

export const actionLogOut = createAction('auth/LOGOUT');

export const actionLogIn = createAction<{
  jwt: string;
  pseudo: string;
  role: string;
  avatar: string;
}>('auth/LOGIN');

export const actionSetConnectedUser = createAction<any>(
  'auth/SET_CONNECTED_USER'
);
export const actionRememberMe = createAction<boolean>('auth/REMEMBER_ME');
export const actionSetToken = createAction<string>('auth/SET_TOKEN');
