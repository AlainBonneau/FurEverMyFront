import { createAction } from '@reduxjs/toolkit';
import type { ConnectedUser } from '@/src/@types/auth';

export const actionChangeCredential = createAction<{
  name: 'email' | 'password';
  value: string;
}>('auth/CHANGE_CREDENTIAL');

export const actionRememberMe = createAction<boolean>('auth/REMEMBER_ME');

export const actionSetToken = createAction<string | undefined>(
  'auth/SET_TOKEN'
);

export const actionSetConnectedUser = createAction<ConnectedUser>(
  'auth/SET_CONNECTED_USER'
);

export const actionLogOut = createAction('auth/LOG_OUT');
