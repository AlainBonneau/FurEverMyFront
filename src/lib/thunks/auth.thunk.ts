import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ConnectedUser } from '@/src/@types/auth';

import axiosInstance from '../axios/axios';
import type { RootState } from '../types/redux.types';

type ApiUserShape = Partial<ConnectedUser> & {
  id?: number;
  userId?: number;
  firstname?: string;
  lastname?: string;
  role?: ConnectedUser['role'];
  avatar?: string;
};

type LoginPayload = {
  email: string;
  password: string;
  remember?: boolean;
};

const emptyConnectedUser: ConnectedUser = {
  avatar: '',
  userId: 0,
  lastname: '',
  firstname: '',
  role: undefined,
};

const decodeJwtUser = (token: string): ConnectedUser => {
  try {
    const arrayToken = token.split('.');

    if (arrayToken.length < 2) {
      return emptyConnectedUser;
    }

    const decoded = JSON.parse(atob(arrayToken[1])) as Partial<ConnectedUser>;

    return {
      avatar: decoded.avatar ?? '',
      userId: decoded.userId ?? 0,
      lastname: decoded.lastname ?? '',
      firstname: decoded.firstname ?? '',
      role: decoded.role,
    };
  } catch (error) {
    return emptyConnectedUser;
  }
};

const mapApiUserToConnectedUser = (payload: unknown): ConnectedUser => {
  // Compatibilité avec l'ancien backend qui renvoyait un JWT.
  if (typeof payload === 'string') {
    return decodeJwtUser(payload);
  }

  if (!payload || typeof payload !== 'object') {
    return emptyConnectedUser;
  }

  const root = payload as Record<string, unknown>;

  const rawUser =
    root.user && typeof root.user === 'object'
      ? (root.user as ApiUserShape)
      : (root as ApiUserShape);

  return {
    avatar: rawUser.avatar ?? '',
    userId: Number(rawUser.userId ?? rawUser.id ?? 0),
    lastname: rawUser.lastname ?? '',
    firstname: rawUser.firstname ?? '',
    role: rawUser.role,
  };
};

const fetchConnectedUserFromCookie = async (): Promise<ConnectedUser> => {
  const response = await axiosInstance.get('/user');
  return mapApiUserToConnectedUser(response.data);
};

export const thunkActionLogin = createAsyncThunk<
  ConnectedUser,
  void,
  { state: RootState }
>('login/LOGIN_CHECK', async (_, thunkAPI) => {
  const state = thunkAPI.getState();

  try {
    const payload: LoginPayload = {
      email: state.auth.credentials.email,
      password: state.auth.credentials.password,
    };

    await axiosInstance.post('/auth/login', payload);

    return await fetchConnectedUserFromCookie();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw error instanceof Error && error.message
      ? new Error(error.message)
      : new Error('Une erreur est survenue lors de la connexion.');
  }
});

export const thunkActionRestoreSession = createAsyncThunk<ConnectedUser>(
  'auth/RESTORE_SESSION',
  async () => fetchConnectedUserFromCookie()
);

export const thunkActionLogout = createAsyncThunk('auth/LOGOUT', async () => {
  try {
    await axiosInstance.post('/auth/logout');
  } catch (error) {
    // Nettoyage local même si l'API de logout échoue.
  }
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
