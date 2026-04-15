'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Settings, X } from 'react-feather';

import { actionSetAnimalId } from '@/src/lib/actions/animal.action';
import { actionModifyNav } from '@/src/lib/actions/home.action';
import { useAppDispatch, useAppSelector } from '@/src/lib/hooks';
import {
  actionThunkAnimalList,
  actionThunkSoftDeleteAnimal,
} from '@/src/lib/thunks/animal.thunk';

import AddAccountModal from '../components/AddAccountModal/AddAccountModal';
import Loader from '../components/Loader/Loader';

function AnimalEdit() {
  const dispatch = useAppDispatch();

  const deleted = useAppSelector((state) => state.animal.deleted);
  const added = useAppSelector((state) => state.animal.isAdded);
  const animaux = useAppSelector((state) => state.animal.animalList);
  const isLoading = useAppSelector((state) => state.animal.isloading);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(actionThunkAnimalList());
  }, [deleted, added, dispatch]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="mx-auto flex w-[92%] max-w-6xl flex-col py-6">
      <div className="mb-4 flex min-h-16 items-center justify-between gap-4 rounded-lg bg-white px-4 py-3 shadow-sm">
        <h1 className="text-lg font-bold sm:text-2xl">Gestion des animaux</h1>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg border border-[#00a292] px-3 py-2 text-sm font-semibold text-[#006f64] transition hover:bg-[#00a292] hover:text-white sm:text-base"
          onClick={() => {
            setIsModalOpen(!isModalOpen);
          }}
        >
          {isModalOpen ? 'Fermer la modal' : 'Ajouter un animal'}
          {isModalOpen ? <X size={16} /> : <Plus size={16} />}
        </button>
      </div>

      {isModalOpen ? (
        <AddAccountModal closeModal={closeModal} form="animal" />
      ) : (
        <div className="flex w-full flex-col gap-3 rounded-lg bg-white p-3 shadow-sm">
          {animaux.map((animal) => (
            <div
              key={animal.id}
              className="flex min-h-16 flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-100 px-4 py-3"
            >
              <h2 className="text-sm font-semibold text-slate-800 sm:text-base">
                {animal.name}, {animal.birthdate}
              </h2>

              <div className="flex items-center gap-2">
                <Link
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-slate-700 text-white transition hover:bg-slate-800"
                  onClick={() => {
                    dispatch(actionModifyNav('Liste des animaux'));
                  }}
                  href={`/liste-des-animaux/${animal.id}`}
                >
                  <Settings size={16} />
                </Link>

                <button
                  type="button"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-slate-700 text-white transition hover:bg-rose-600"
                  onClick={async () => {
                    dispatch(actionSetAnimalId(animal.id));
                    await dispatch(actionThunkSoftDeleteAnimal());
                  }}
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default AnimalEdit;
