'use client';

import { useEffect } from 'react';
import { Loader, Search } from 'react-feather';
import { Input } from '@nextui-org/react';

import { IAnimal } from '@/src/@types/animal';
import { actionThunkAnimalList } from '@/src/lib/thunks/animal.thunk';
import { actionLogIn } from '@/src/lib/actions/auth.action';
import { addTokenJwtToAxiosInstance } from '@/src/lib/axios/axios';

import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import {
  actionInputFilter,
  actionInputSearch,
} from '../../lib/actions/animal.action';

import CardAnimal from '../components/CardAnimal/CardAnimal';

import './page.scss';

export default function AnimalsListPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {}, []);

  useEffect(() => {
    dispatch(actionThunkAnimalList());
  }, []);

  const inputSearch = useAppSelector((state) => state.animal.inputSearch);
  const inputFilter = useAppSelector((state) => state.animal.inputFilter);

  const animals: IAnimal[] = useAppSelector((state) => state.animal.animalList);

  const isLoading = useAppSelector((state) => state.animal.isloading);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="list-animals">
      <div className="list-animals-header">
        <h1 className="list-animals-title">Liste des pensionnaires</h1>
        <div className="list-animals-input">
          <Input
            type="search"
            variant="bordered"
            placeholder="Rechercher un animal"
            defaultValue="Saisir un animal"
            className="max-w-xs text-white"
            endContent={
              <Search className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
            }
            value={inputSearch}
            onChange={(event) => {
              dispatch(actionInputSearch(event.target.value));
            }}
          />
          <Input
            type="search"
            variant="bordered"
            placeholder="Filtrer la recherche"
            defaultValue="filtrer par nom, âge, etc."
            className="max-w-xs text-white"
            value={inputFilter}
            onChange={(event) => {
              dispatch(actionInputFilter(event.target.value));
            }}
          />
        </div>
      </div>
      <div className="list-animals-card">
        {animals.map((animal) => {
          return <CardAnimal key={animal.id} animal={animal} />;
        })}
      </div>
    </div>
  );
}
