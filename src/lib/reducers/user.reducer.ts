import { createReducer } from '@reduxjs/toolkit';
import { IUser } from '@/src/@types/user';
import {
  actionThunkUserById,
  actionThunkUserList,
  actionUserSoftDelete,
} from '../thunks/user.thunk';
import {
  actionSetConfirmPassword,
  actionSetUser,
} from '../actions/user.action';

interface InitialState {
  users: IUser[];
  deletedUsers: IUser[];
  user: IUser;
  confirmPassword: string;
  isloading: boolean;
  error: string | null;
  remove: boolean;
}

const emptyUser: IUser = {
  id: 0,
  email: '',
  lastname: '',
  firstname: '',
  birthdate: '',
  password: '',
  arrival_date: '',
  leaving_date: '',
  role: '',
  is_active: true,
};

const initialState: InitialState = {
  users: [],
  deletedUsers: [],
  user: emptyUser,
  confirmPassword: '',
  isloading: true,
  error: null,
  remove: false,
};

const mapUserPayload = (payload: unknown): IUser => {
  if (typeof payload === 'string') {
    try {
      const arrayToken = payload.split('.');
      if (arrayToken.length > 1) {
        const tokenPayload = JSON.parse(atob(arrayToken[1])) as Partial<IUser>;
        return {
          ...emptyUser,
          ...tokenPayload,
          id: Number(tokenPayload.id ?? 0),
          is_active: tokenPayload.is_active ?? true,
        };
      }
    } catch (error) {
      return emptyUser;
    }
  }

  if (!payload || typeof payload !== 'object') {
    return emptyUser;
  }

  const root = payload as Record<string, unknown>;
  const raw =
    root.user && typeof root.user === 'object'
      ? (root.user as Partial<IUser>)
      : (root as Partial<IUser>);

  return {
    ...emptyUser,
    ...raw,
    id: Number(raw.id ?? 0),
    email: raw.email ?? '',
    lastname: raw.lastname ?? '',
    firstname: raw.firstname ?? '',
    birthdate: raw.birthdate ?? '',
    password: raw.password ?? '',
    arrival_date: raw.arrival_date ?? '',
    leaving_date: raw.leaving_date ?? '',
    role: raw.role ?? '',
    is_active: raw.is_active ?? true,
  };
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actionSetUser, (state, action) => {
      state.user[action.payload.name] = action.payload.value;
    })
    .addCase(actionSetConfirmPassword, (state, action) => {
      state.confirmPassword = action.payload;
    })
    // Get user list
    .addCase(actionThunkUserList.pending, (state) => {
      state.isloading = true;
    })
    .addCase(actionThunkUserList.fulfilled, (state, action) => {
      state.isloading = false;
      state.deletedUsers = action.payload.filter(
        (user: IUser) => user.is_active === false
      );
      state.users = action.payload.filter(
        (user: IUser) => user.is_active === true
      );
    })
    .addCase(actionThunkUserList.rejected, (state) => {
      state.isloading = false;
    })
    .addCase(actionThunkUserById.pending, (state) => {
      state.isloading = true;
    })
    .addCase(actionThunkUserById.fulfilled, (state, action) => {
      state.isloading = false;
      state.user = mapUserPayload(action.payload);
    })
    .addCase(actionThunkUserById.rejected, (state) => {
      state.isloading = false;
    })
    .addCase(actionUserSoftDelete.fulfilled, (state) => {
      state.remove = true;
      state.user = emptyUser;
    });
});

export default userReducer;
