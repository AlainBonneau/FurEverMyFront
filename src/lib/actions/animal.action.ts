/* eslint-disable import/prefer-default-export */
import { createAction } from '@reduxjs/toolkit';
// actions pour créer un animal
export const actionInputSearch = createAction<string>('animal/SEARCH_INPUT');
// actions pour modifier un animal
export const actionInputFilter = createAction<string>('animal/FILTER_INPUT');

export const actionSetAnimalId = createAction<number>('animal/SET_ANIMAL_ID');

export const actionSetAnimal = createAction<{
  name:
    | 'avatar'
    | 'name'
    | 'birthdate'
    | 'gender'
    | 'health'
    | 'arrival_date'
    | 'leaving_date'
    | 'about';
  value: string;
}>('animal/SET_ANIMAL');

export const actionSetAnimalActive = createAction<boolean>(
  'animal/SET_ANIMAL_ACTIVE'
);
