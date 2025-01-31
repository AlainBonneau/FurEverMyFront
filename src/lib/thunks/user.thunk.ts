import { createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../axios/axios';
import { RootState } from '../store';

// action pour afficher la liste des employés
const actionThunkUserList = createAsyncThunk('user/GET_USERS', async () => {
  const response = await axiosInstance.get('/users');
  return response.data;
});

// action pour afficher un employé par son id
const actionThunkUserById = createAsyncThunk(
  'user/GET_USERS_BY_ID',
  async () => {
    const response = await axiosInstance.get('/user');
    return response.data;
  }
);

// action pour ajouter un employé
const actionUserAdd = createAsyncThunk('user/ADD', async () => {
  await axiosInstance.post('/user/add');
  return 'succesful add';
});

// action pour supprimer un employé
const actionUserSoftDelete = createAsyncThunk(
  'user/DELETE',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    await axiosInstance.post('/user/delete', {
      email: state.user.user.email,
    });
    return 'succesful delete';
  }
);

export { actionThunkUserList, actionThunkUserById, actionUserSoftDelete, actionUserAdd };
