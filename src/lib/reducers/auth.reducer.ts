import { createReducer } from '@reduxjs/toolkit';

import {
  actionChangeCredential,
  actionLogOut,
  actionRememberMe,
  actionSetConnectedUser,
  actionSetToken,
} from '../actions/auth.action';
import { thunkActionLogin, thunkActionRegister } from '../thunks/auth.thunk';
import { clearLocalStorage } from '@/src/localstorage/localStorage';
import { clearSessionStorage } from '@/src/sessionStorage/sessionStorage';
import type { ConnectedUser } from '@/src/@types/auth';

interface InitialState {
  credentials: {
    email: string;
    password: string;
  };
  connectedUser: ConnectedUser;
  token?: string;
  remember: boolean;
  isloading: boolean;
  message: string;
  modified: boolean;
}

const emptyConnectedUser: ConnectedUser = {
  avatar: '',
  userId: 0,
  lastname: '',
  firstname: '',
  role: undefined,
};

const initialState: InitialState = {
  credentials: {
    email: '',
    password: '',
  },
  connectedUser: emptyConnectedUser,
  token: undefined,
  remember: false,
  isloading: false,
  message: '',
  modified: false,
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

const loginReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actionChangeCredential, (state, action) => {
      state.credentials[action.payload.name] = action.payload.value;
    })
    .addCase(actionRememberMe, (state, action) => {
      state.remember = action.payload;
    })
    .addCase(actionSetToken, (state, action) => {
      state.token = action.payload;
    })
    .addCase(actionSetConnectedUser, (state, action) => {
      state.connectedUser = action.payload;
    })
    .addCase(actionLogOut, (state) => {
      state.token = undefined;
      state.connectedUser = emptyConnectedUser;
      state.message = '';
      state.modified = false;

      clearSessionStorage();
      clearLocalStorage();
    })

    .addCase(thunkActionRegister.pending, (state) => {
      state.isloading = true;
      state.message = '';
      state.modified = false;
    })
    .addCase(thunkActionRegister.fulfilled, (state) => {
      state.isloading = false;
      state.message = 'Utilisateur ajouté avec succès';
      state.modified = true;
    })
    .addCase(thunkActionRegister.rejected, (state) => {
      state.isloading = false;
      state.message = 'Erreur lors de l’inscription';
      state.modified = false;
    })

    .addCase(thunkActionLogin.pending, (state) => {
      state.isloading = true;
      state.message = '';
    })
    .addCase(thunkActionLogin.fulfilled, (state, action) => {
      state.isloading = false;
      state.token = action.payload;
      state.connectedUser = decodeJwtUser(action.payload);
      state.message = 'Connexion réussie';
    })
    .addCase(thunkActionLogin.rejected, (state) => {
      state.isloading = false;
      state.message = 'Erreur de connexion';
      state.token = undefined;
      state.connectedUser = emptyConnectedUser;
    });
});

export default loginReducer;
