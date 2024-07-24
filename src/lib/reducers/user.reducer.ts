import { IUser } from '@/src/@types/user';
import { createReducer } from '@reduxjs/toolkit';
import {
  actionThunkUserById,
  actionThunkUserList,
  actionUserSoftDelete,
} from '../thunks/user.thunk';
import {
  actionSetConfirmPassword,
  actionSetUser,
  actionSetUserId,
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

const initialState: InitialState = {
  users: [],
  deletedUsers: [],
  user: {
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
  },
  confirmPassword: '',
  isloading: true,
  error: null,
  remove: false,
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
    .addCase(actionThunkUserList.rejected, (state, action) => {
      state.isloading = false;
    })
    .addCase(actionThunkUserById.pending, (state) => {
      state.isloading = true;
    })
    .addCase(actionThunkUserById.fulfilled, (state, action) => {
      state.isloading = false;
      const token = action.payload;
      const arrayToken = token.split('.');
      const tokenPayload = JSON.parse(atob(arrayToken[1]));
      state.user = tokenPayload;
    })
    .addCase(actionThunkUserById.rejected, (state, action) => {
      state.isloading = false;
    })
    .addCase(actionUserSoftDelete.fulfilled, (state, action) => {
      state.remove = true;
      state.user = {
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
    });
});

export default userReducer;
