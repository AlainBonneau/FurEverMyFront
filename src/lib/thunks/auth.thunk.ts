import { createAsyncThunk } from '@reduxjs/toolkit';

import { addToLocalStorage } from '@/src/localstorage/localStorage';
import { addToSessionStorage } from '@/src/sessionStorage/sessionStorage';

import axiosInstance, { addTokenJwtToAxiosInstance } from '../axios/axios';
import type { RootState } from '../types/redux.types';

type LoginResponse = {
  tokenJWT: string;
  refreshTokenJWT: string;
};

export const thunkActionLogin = createAsyncThunk<
  string,
  void,
  { state: RootState }
>('login/LOGIN_CHECK', async (_, thunkAPI) => {
  const state = thunkAPI.getState();

  const response = await axiosInstance.post<LoginResponse>('/auth/login', {
    email: state.auth.credentials.email,
    password: state.auth.credentials.password,
  });

  const { tokenJWT, refreshTokenJWT } = response.data;

  addTokenJwtToAxiosInstance(tokenJWT);

  if (state.auth.remember) {
    addToLocalStorage(refreshTokenJWT);
  }

  addToSessionStorage(tokenJWT);

  return tokenJWT;
});

export const thunkActionRegister = createAsyncThunk<
  string,
  void,
  { state: RootState }
>('login/REGISTER', async (_, thunkAPI) => {
  const state = thunkAPI.getState();

  await axiosInstance.post('/auth/register', {
    email: state.user.user.email,
    lastname: state.user.user.lastname,
    firstname: state.user.user.firstname,
    birthdate: state.user.user.birthdate,
    password: state.user.user.password,
    confirmPassword: state.user.confirmPassword,
    arrival_date: state.user.user.arrival_date,
    leaving_date: state.user.user.leaving_date,
    role: state.user.user.role,
    is_active: state.user.user.is_active,
  });

  return 'success';
});
