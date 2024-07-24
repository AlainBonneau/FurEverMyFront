import { createReducer } from '@reduxjs/toolkit';
import { actionModifyNav } from '../actions/home.action';

interface InitialState {
  nav: string;
}

const initialState: InitialState = {
  nav: 'Accueil',
};

const homeReducer = createReducer(initialState, (builder) => {
  builder.addCase(actionModifyNav, (state, action) => {
    state.nav = action.payload;
  });
});

export default homeReducer;
