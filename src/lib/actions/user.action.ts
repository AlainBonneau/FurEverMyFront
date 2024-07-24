import { createAction } from '@reduxjs/toolkit';

export const actionSetUser = createAction<{
  name:
    | 'email'
    | 'lastname'
    | 'firstname'
    | 'birthdate'
    | 'password'
    | 'arrival_date'
    | 'leaving_date'
    | 'role';
  value: string;
}>('user/SET_USER');

export const actionSetUserId = createAction<number>('user/SET_USER_ID');

export const actionSetConfirmPassword = createAction<string>(
  'user/SET_CONFIRM_PASSWORD'
);
