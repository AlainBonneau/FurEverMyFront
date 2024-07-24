import { createReducer } from '@reduxjs/toolkit';

import { IAnimal } from '../../@types/animal';
import {
  actionInputFilter,
  actionInputSearch,
  actionSetAnimal,
  actionSetAnimalActive,
  actionSetAnimalId,
} from '../actions/animal.action';
import {
  actionThunkAddAnimal,
  actionThunkAnimalById,
  actionThunkAnimalList,
  actionThunkSoftDeleteAnimal,
  actionThunkUpdateAnimal,
} from '../thunks/animal.thunk';
import { stat } from 'fs';

// -- LE STATE INITIAL
interface InitialState {
  animalList: IAnimal[];
  animalSoftDeletedList: IAnimal[];
  animal: IAnimal;
  inputSearch: string;
  inputFilter: string;
  isloading: boolean;
  error: string | null;
  deleted: boolean;
  isAdded: boolean;
  isEdited: boolean;
}

const initialState: InitialState = {
  animalList: [],
  animalSoftDeletedList: [],
  animal: {
    id: 0,
    avatar: '',
    name: '',
    birthdate: '',
    gender: '',
    health: '',
    arrival_date: '',
    leaving_date: '',
    about: '',
    is_active: true,
  },
  inputSearch: '',
  inputFilter: '',
  isloading: true,
  error: null,
  deleted: false,
  isAdded: false,
  isEdited: false,
};

const animalReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actionSetAnimal, (state, action) => {
      state.animal[action.payload.name] = action.payload.value;
    })
    .addCase(actionSetAnimalActive, (state, action) => {
      state.animal.is_active = action.payload;
    })
    // Get animal list
    .addCase(actionThunkAnimalList.pending, (state) => {
      state.isloading = true;
    })
    .addCase(actionThunkAnimalList.fulfilled, (state, action) => {
      state.isloading = false;
      state.animalSoftDeletedList = action.payload.filter(
        (animal: IAnimal) => animal.is_active === false
      );
      state.animalList = action.payload.filter(
        (animal: IAnimal) => animal.is_active === true
      );
    })
    .addCase(actionThunkAnimalList.rejected, (state) => {
      state.isloading = false;
    })
    // Get animal by id
    .addCase(actionSetAnimalId, (state, action) => {
      state.animal.id = action.payload;
    })
    .addCase(actionThunkAnimalById.pending, (state) => {
      state.isloading = true;
    })
    .addCase(actionThunkAnimalById.fulfilled, (state, action) => {
      state.isloading = false;
      state.animal = action.payload;
    })
    .addCase(actionThunkAnimalById.rejected, (state) => {
      state.isloading = false;
    })
    // Input management
    .addCase(actionInputSearch, (state, action) => {
      state.inputSearch = action.payload;
    })
    .addCase(actionInputFilter, (state, action) => {
      state.inputFilter = action.payload;
    })
    // Add animal
    .addCase(actionThunkAddAnimal.pending, (state) => {
      state.isloading = true;
    })
    .addCase(actionThunkAddAnimal.fulfilled, (state) => {
      state.isloading = false;
      state.isAdded = true;
      state.animal = {
        id: 0,
        avatar: '',
        name: '',
        birthdate: '',
        gender: '',
        health: '',
        arrival_date: '',
        leaving_date: '',
        about: '',
        is_active: true,
      };
    })
    .addCase(actionThunkAddAnimal.rejected, (state) => {
      state.isloading = false;
    })
    // Update animal
    .addCase(actionThunkUpdateAnimal.pending, (state) => {
      state.isloading = true;
    })
    .addCase(actionThunkUpdateAnimal.fulfilled, (state, action) => {
      state.isloading = false;
      state.isEdited = true;
      state.animal = {
        id: 0,
        avatar: '',
        name: '',
        birthdate: '',
        gender: '',
        health: '',
        arrival_date: '',
        leaving_date: '',
        about: '',
        is_active: true,
      };
    })
    .addCase(actionThunkUpdateAnimal.rejected, (state) => {
      state.isloading = false;
      state.error = 'Erreur update';
    })
    .addCase(actionThunkSoftDeleteAnimal.fulfilled, (state) => {
      state.isloading = false;
      state.deleted = true;
    })
    .addCase(actionThunkSoftDeleteAnimal.pending, (state) => {
      state.isloading = true;
    })
    .addCase(actionThunkSoftDeleteAnimal.rejected, (state) => {
      state.error = 'Erreur';
    });
});

export default animalReducer;
