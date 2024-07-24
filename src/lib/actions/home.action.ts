/* eslint-disable import/prefer-default-export */
import { createAction } from '@reduxjs/toolkit';

export const actionModifyNav = createAction<string>(
  'home/MODIFY_NAV'
);
