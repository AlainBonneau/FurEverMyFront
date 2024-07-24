import { createAsyncThunk } from '@reduxjs/toolkit';

import { addToLocalStorage } from '@/src/localstorage/localStorage';

import axiosInstance, { addTokenJwtToAxiosInstance } from '../axios/axios';
import { RootState } from '../store';
import { addToSessionStorage } from '@/src/sessionStorage/sessionStorage';

const thunkActionLogin = createAsyncThunk(
  'login/LOGIN_CHECK',
  async (_, thunkAPI) => {
    //Récupération du state dans notre thunk
    const state = thunkAPI.getState() as RootState;
    //Appel de l'api via axios
    const response = await axiosInstance.post('/auth/login', {
      email: state.auth.credentials.email,
      password: state.auth.credentials.password,
    });
    const { tokenJWT, refreshTokenJWT } = response.data;
    //Gestion du token et refreshToken dans leur storage respectif 
    addTokenJwtToAxiosInstance(tokenJWT);
    if (state.auth.remember) {
      addToLocalStorage(refreshTokenJWT);
    }
    addToSessionStorage(tokenJWT);
    //Renvoie uniquement le token au reducer pour recupérer les données de l'utilisateur
    return tokenJWT;
  }
);

const thunkActionRegister = createAsyncThunk(
  'login/REGISTER',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
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
    return 'succes';
  }
);

export { thunkActionLogin, thunkActionRegister };
