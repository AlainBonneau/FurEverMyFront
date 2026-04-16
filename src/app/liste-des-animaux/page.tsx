'use client';

import { useEffect } from 'react';
import { Search } from 'react-feather';

import { IAnimal } from '@/src/@types/animal';
import {
  actionInputFilter,
  actionInputSearch,
} from '@/src/lib/actions/animal.action';
import { useAppDispatch, useAppSelector } from '@/src/lib/hooks';
import { actionThunkAnimalList } from '@/src/lib/thunks/animal.thunk';

import CardAnimal from '../components/CardAnimal/CardAnimal';
import Loader from '../components/Loader/Loader';

export default function AnimalsListPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(actionThunkAnimalList());
  }, [dispatch]);

  const inputSearch = useAppSelector((state) => state.animal.inputSearch);
  const inputFilter = useAppSelector((state) => state.animal.inputFilter);
  const animals: IAnimal[] = useAppSelector((state) => state.animal.animalList);
  const isLoading = useAppSelector((state) => state.animal.isloading);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="flex flex-col">
      <div className="bg-[#07a397] px-4 py-4 text-center text-white">
        <h1 className="mb-3 text-2xl font-bold">Liste des pensionnaires</h1>

        <div className="mx-auto flex w-full max-w-4xl flex-col justify-center gap-3 md:flex-row">
          <label className="relative w-full max-w-xs">
            <span className="sr-only">Rechercher un animal</span>
            <input
              type="search"
              placeholder="Rechercher un animal"
              className="w-full rounded-lg border border-white/50 bg-white px-4 py-2 pr-10 text-slate-900 outline-none transition focus:border-white focus:ring-2 focus:ring-white/60"
              value={inputSearch}
              onChange={(event) => {
                dispatch(actionInputSearch(event.target.value));
              }}
            />
            <Search
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
            />
          </label>

          <label className="w-full max-w-xs">
            <span className="sr-only">Filtrer la recherche</span>
            <input
              type="search"
              placeholder="Filtrer la recherche"
              className="w-full rounded-lg border border-white/50 bg-white px-4 py-2 text-slate-900 outline-none transition focus:border-white focus:ring-2 focus:ring-white/60"
              value={inputFilter}
              onChange={(event) => {
                dispatch(actionInputFilter(event.target.value));
              }}
            />
          </label>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-wrap justify-center gap-5 px-4 py-6">
        {animals.map((animal) => (
          <CardAnimal key={animal.id} animal={animal} />
        ))}
      </div>
    </section>
  );
}
