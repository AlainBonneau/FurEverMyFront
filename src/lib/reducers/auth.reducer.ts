import { createReducer } from '@reduxjs/toolkit';
import type { ConnectedUser } from '@/src/@types/auth';

import {
  actionChangeCredential,
  actionLogOut,
  actionRememberMe,
  actionSetConnectedUser,
} from '../actions/auth.action';
import {
  thunkActionLogin,
  thunkActionLogout,
  thunkActionRegister,
  thunkActionRestoreSession,
} from '../thunks/auth.thunk';

interface InitialState {
  credentials: {
    email: string;
    password: string;
  };
  connectedUser: ConnectedUser;
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
  remember: false,
  isloading: false,
  message: '',
  modified: false,
};

const resetAuthState = (state: InitialState) => {
  state.connectedUser = emptyConnectedUser;
  state.message = '';
  state.modified = false;
};

const loginReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actionChangeCredential, (state, action) => {
      state.credentials[action.payload.name] = action.payload.value;
    })
    .addCase(actionRememberMe, (state, action) => {
      state.remember = action.payload;
    })
    .addCase(actionSetConnectedUser, (state, action) => {
      state.connectedUser = action.payload;
    })
    .addCase(actionLogOut, (state) => {
      resetAuthState(state);
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
      state.connectedUser = action.payload;
      state.message = 'Connexion réussie';
    })
    .addCase(thunkActionLogin.rejected, (state) => {
      state.isloading = false;
      state.message = 'Erreur de connexion';
      resetAuthState(state);
    })
    .addCase(thunkActionRestoreSession.pending, (state) => {
      state.isloading = true;
    })
    .addCase(thunkActionRestoreSession.fulfilled, (state, action) => {
      state.isloading = false;
      state.connectedUser = action.payload;
    })
    .addCase(thunkActionRestoreSession.rejected, (state) => {
      state.isloading = false;
      resetAuthState(state);
    })
    .addCase(thunkActionLogout.pending, (state) => {
      state.isloading = true;
    })
    .addCase(thunkActionLogout.fulfilled, (state) => {
      state.isloading = false;
      resetAuthState(state);
    })
    .addCase(thunkActionLogout.rejected, (state) => {
      state.isloading = false;
      resetAuthState(state);
    });
});

export default loginReducer;
