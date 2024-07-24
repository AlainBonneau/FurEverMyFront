import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../axios/axios';
import { RootState } from '../store';

// action pour afficher la liste des animaux
const actionThunkAnimalList = createAsyncThunk(
  'animal/GET_ANIMALS',
  async () => {
    const response = await axiosInstance.get('/animals');
    return response.data;
  }
);

const actionThunkAnimalById = createAsyncThunk(
  'animal/GET_ANIMAL_BY_ID',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const response = await axiosInstance.get(
      `/animals/${state.animal.animal.id}`
    );
    console.log(response.data);

    return response.data;
  }
);

// action pour ajouter un animal
const actionThunkAddAnimal = createAsyncThunk(
  'animal/ADD_ANIMAL',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    await axiosInstance.post('/animals', {
      name: state.animal.animal.name,
      birthdate: state.animal.animal.birthdate,
      gender: state.animal.animal.gender,
      health: state.animal.animal.health,
      arrival_date: state.animal.animal.arrival_date,
      leaving_date: state.animal.animal.leaving_date,
      about: state.animal.animal.about,
      is_active: true,
    });
    return 'add succesfull';
  }
);

// action pour modifier un animal
const actionThunkUpdateAnimal = createAsyncThunk(
  'animal/UPDATE_ANIMAL',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const response = await axiosInstance.patch(
      `/animals/${state.animal.animal.id}`,
      {
        name: state.animal.animal.name,
        birthdate: state.animal.animal.birthdate,
        gender: state.animal.animal.gender,
        health: state.animal.animal.health,
        arrival_date: state.animal.animal.arrival_date,
        leaving_date: state.animal.animal.leaving_date,
        about: state.animal.animal.about,
        is_active: state.animal.animal.is_active,
      }
    );
    console.log(response.data);
    return response.data;
  }
);

const actionThunkSoftDeleteAnimal = createAsyncThunk(
  'animal/SOFTDELETE_ANIMAL',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const response = await axiosInstance.patch(
      `/animals/${state.animal.animal.id}`,
      { is_active: false }
    );
    console.log(response.data);
    return response.data;
  }
);

export {
  actionThunkAnimalList,
  actionThunkAddAnimal,
  actionThunkUpdateAnimal,
  actionThunkAnimalById,
  actionThunkSoftDeleteAnimal,
};
