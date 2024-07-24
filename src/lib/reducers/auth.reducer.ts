import { createReducer } from '@reduxjs/toolkit';

import {
  actionChangeCredential,
  actionLogIn,
  actionLogOut,
  actionRememberMe,
} from '../actions/auth.action';
import { thunkActionLogin, thunkActionRegister } from '../thunks/auth.thunk';
import { clearLocalStorage } from '@/src/localstorage/localStorage';
import { clearSessionStorage } from '@/src/sessionStorage/sessionStorage';

// -- LE STATE INITIAL et son interface
interface InitialState {
  credentials: {
    email: string;
    password: string;
  };
  connectedUser: {
    avatar: string;
    userId: number;
    lastname: string;
    firstname: string;
    role?: 'Bénévole' | 'Employé' | 'Admin';
  };
  remember: boolean;
  isloading: boolean;
  message: string;
  modified: boolean;
}

const initialState: InitialState = {
  credentials: {
    email: '',
    password: '',
  },
  connectedUser: {
    avatar: '',
    userId: 0,
    lastname: '',
    firstname: '',
    role: undefined,
  },
  remember: false,
  isloading: false,
  message: '',
  modified: false,
};

const loginReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actionChangeCredential, (state, action) => {
      state.credentials[action.payload.name] = action.payload.value;
    })
    .addCase(actionRememberMe, (state, action) => {
      state.remember = action.payload;
    })
    .addCase(actionLogOut, (state) => {
      state.connectedUser = {
        avatar: '',
        userId: 0,
        lastname: '',
        firstname: '',
        role: undefined,
      };
      clearSessionStorage();
      clearLocalStorage();
    })
    .addCase(thunkActionRegister.pending, (state) => {
      state.isloading = true;
    })
    .addCase(thunkActionRegister.fulfilled, (state) => {
      state.isloading = false;
      state.message = 'Utilisateur ajouter avec succes';
      state.modified = true;
    })
    .addCase(thunkActionRegister.rejected, (state) => {
      state.isloading = false;
      state.message = 'Erreur ...';
    })
    .addCase(thunkActionLogin.pending, (state) => {
      state.isloading = true;
    })
    .addCase(thunkActionLogin.fulfilled, (state, action) => {
      state.isloading = false;
      const token: string = action.payload;
      const arrayToken = token.split('.');
      const tokenPayload = JSON.parse(atob(arrayToken[1]));
      state.connectedUser = tokenPayload;
    })
    .addCase(thunkActionLogin.rejected, (state) => {
      state.isloading = false;
      state.message = 'erreur de connexion';
    });
});

export default loginReducer;
