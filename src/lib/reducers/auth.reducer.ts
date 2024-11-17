import { createReducer } from '@reduxjs/toolkit';

import {
  actionChangeCredential,
  actionLogIn,
  actionLogOut,
  actionRememberMe,
  actionSetConnectedUser,
  actionSetToken,
} from '../actions/auth.action';
import { thunkActionLogin, thunkActionRegister } from '../thunks/auth.thunk';
import {
  addToLocalStorage,
  clearLocalStorage,
} from '@/src/localstorage/localStorage';
import {
  addToSessionStorage,
  clearSessionStorage,
} from '@/src/sessionStorage/sessionStorage';

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
  token?: string;
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
  token: undefined,
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
      console.log('Token updated in state:', state.token); // Vérifiez que le state est mis à jour avec le token
    })
    .addCase(actionSetToken, (state, action) => {
      state.token = action.payload;
    })
    .addCase(actionSetConnectedUser, (state, action) => {
      state.connectedUser = action.payload;
    })
    .addCase(actionLogOut, (state) => {
      state.token = undefined;
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

      // Parse le token pour extraire les données de l'utilisateur
      const arrayToken = token.split('.');
      const tokenPayload = JSON.parse(atob(arrayToken[1]));
      state.connectedUser = tokenPayload;
      state.token = token;

      // Stocker le token dans le stockage local ou session
      addToSessionStorage(token);
      addToLocalStorage(token); // uniquement si le "remember me" est coché
    })

    .addCase(thunkActionLogin.rejected, (state) => {
      state.isloading = false;
      state.message = 'erreur de connexion';
    });
});

export default loginReducer;
