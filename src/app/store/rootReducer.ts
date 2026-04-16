import { combineReducers } from '@reduxjs/toolkit';
import animalReducer from '@/src/lib/reducers/animal.reducer';

export const rootReducer = combineReducers({
  animal: animalReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
