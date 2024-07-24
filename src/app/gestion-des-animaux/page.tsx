'use client';

import React, { useEffect, useState } from 'react';
import { Link as FeatherLink, Loader, Plus, Settings, X } from 'react-feather';
import Link from 'next/link';

import { useAppDispatch, useAppSelector } from '@/src/lib/hooks';
import {
  actionThunkAnimalList,
  actionThunkSoftDeleteAnimal,
} from '@/src/lib/thunks/animal.thunk';
import { actionLogIn } from '@/src/lib/actions/auth.action';
import { addTokenJwtToAxiosInstance } from '@/src/lib/axios/axios';

import AddAccountModal from '../components/AddAccountModal/AddAccountModal';

import './page.scss';
import { actionModifyNav } from '@/src/lib/actions/home.action';
import { actionSetAnimalId } from '@/src/lib/actions/animal.action';

function AnimalEdit() {
  const dispatch = useAppDispatch();

  useEffect(() => {}, []);

  const deleted = useAppSelector((state) => state.animal.deleted);
  const added = useAppSelector((state) => state.animal.isAdded);

  useEffect(() => {
    dispatch(actionThunkAnimalList());
  }, [deleted, added]);

  const animaux = useAppSelector((state) => state.animal.animalList);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const isLoading = useAppSelector((state) => state.animal.isloading);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="animal-edit-container">
      <div className="animal-edit-title">
        <h1 className="main-title">Gestion des animaux</h1>
        <button
          className="add-animal-button"
          onClick={() => {
            setIsModalOpen(!isModalOpen); // si isModalOpen était vrai, après avoir cliqué sur le bouton, il deviendra faux, et inversment
          }}
        >
          {isModalOpen ? 'Fermer la modal' : 'Ajouter un animal'}
          {isModalOpen ? <X /> : <Plus />}
        </button>
      </div>
      {isModalOpen ? (
        <AddAccountModal closeModal={closeModal} form={'animal'} />
      ) : (
        <div className="animal-block">
          {animaux.map((animal) => (
            <div key={animal.id} className="animal-card">
              <h2>
                {animal.name}, {animal.birthdate}
              </h2>
              <div className="buttons-container">
                <Link
                  className="animal-block-button"
                  onClick={() => {
                    dispatch(actionModifyNav('Liste des animaux'));
                  }}
                  href={`/liste-des-animaux/${animal.id}`}
                >
                  <Settings />
                </Link>
                <button
                  className="animal-block-button"
                  onClick={async () => {
                    dispatch(actionSetAnimalId(animal.id));
                    await dispatch(actionThunkSoftDeleteAnimal());
                  }}
                >
                  <X />
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
