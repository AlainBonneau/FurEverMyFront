'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Edit, Trash } from 'react-feather';

import { IAnimal } from '@/src/@types/animal';
import {
  actionSetAnimal,
  actionSetAnimalActive,
  actionSetAnimalId,
} from '@/src/lib/actions/animal.action';
import { useAppDispatch, useAppSelector } from '@/src/lib/hooks';
import { actionThunkAnimalById, actionThunkUpdateAnimal } from '@/src/lib/thunks/animal.thunk';

import Loader from '../../components/Loader/Loader';

const inputClassName =
  'w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[#00a292] focus:ring-2 focus:ring-[#00a292]/30';

function formatDateForInput(dateString: string | number | Date) {
  if (!dateString) return '';
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function DetailAnimal() {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const animalId = Number(id);
  const animal: IAnimal = useAppSelector((state) => state.animal.animal);
  const role = useAppSelector((state) => state.auth.connectedUser.role);
  const isEdited = useAppSelector((state) => state.animal.isEdited);
  const isLoading = useAppSelector((state) => state.animal.isloading);

  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [health, setHealth] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [leavingDate, setLeavingDate] = useState('');
  const [description, setDescription] = useState('');
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isActiv, setIsActiv] = useState(true);

  useEffect(() => {
    dispatch(actionSetAnimalId(animalId));
    dispatch(actionThunkAnimalById());
  }, [animalId, dispatch, isEdited]);

  useEffect(() => {
    setName(animal.name || '');
    setBirthdate(formatDateForInput(animal.birthdate) || '');
    setHealth(animal.health || '');
    setArrivalDate(formatDateForInput(animal.arrival_date) || '');
    setLeavingDate(formatDateForInput(animal.leaving_date) || '');
    setDescription(animal.about || '');
    setIsActiv(animal.is_active ?? true);
  }, [animal]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <form
      className="flex flex-col"
      onSubmit={async (e) => {
        e.preventDefault();

        dispatch(actionSetAnimal({ name: 'name', value: name }));
        dispatch(actionSetAnimal({ name: 'birthdate', value: birthdate }));
        dispatch(actionSetAnimal({ name: 'gender', value: animal.gender }));
        dispatch(actionSetAnimal({ name: 'health', value: health }));
        dispatch(actionSetAnimal({ name: 'arrival_date', value: arrivalDate }));
        dispatch(actionSetAnimal({ name: 'leaving_date', value: leavingDate }));
        dispatch(actionSetAnimal({ name: 'about', value: description }));
        dispatch(actionSetAnimalActive(isActiv));

        await dispatch(actionThunkUpdateAnimal());

        setIsReadOnly(true);
        setIsEditing(false);
      }}
    >
      <div className="bg-[#07a397] px-4 py-4 text-center text-white">
        <h1 className="text-2xl font-bold">Fiche détaillée de {animal.name}</h1>
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-8 px-4 py-6 md:flex-row md:items-start md:justify-center">
        <div className="w-full max-w-[360px] overflow-hidden rounded-xl shadow-md">
          <img
            src={`/${animal.avatar}`}
            alt={animal.name}
            className="h-auto w-full object-cover"
          />
        </div>

        <div className="grid w-full max-w-4xl gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <label className="text-sm font-medium text-slate-600" htmlFor="animal-name">
              Nom
            </label>
            <input
              id="animal-name"
              readOnly={isReadOnly}
              type="text"
              name="name"
              value={isReadOnly ? animal.name : name}
              onChange={(e) => setName(e.target.value)}
              className={inputClassName}
            />

            <label className="text-sm font-medium text-slate-600" htmlFor="animal-gender">
              Genre
            </label>
            <input
              id="animal-gender"
              readOnly
              type="text"
              name="gender"
              value={animal.gender}
              className={inputClassName}
            />

            <label className="text-sm font-medium text-slate-600" htmlFor="animal-birthdate">
              Naissance
            </label>
            <input
              id="animal-birthdate"
              readOnly={isReadOnly}
              type="date"
              name="birthdate"
              value={isReadOnly ? formatDateForInput(animal.birthdate) : birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              className={inputClassName}
            />
          </div>

          <div className="flex flex-col gap-4">
            <label className="text-sm font-medium text-slate-600" htmlFor="animal-health">
              Santé
            </label>
            <input
              id="animal-health"
              readOnly={isReadOnly}
              type="text"
              name="health"
              value={isReadOnly ? animal.health : health}
              onChange={(e) => setHealth(e.target.value)}
              className={inputClassName}
            />

            <label className="text-sm font-medium text-slate-600" htmlFor="animal-arrival">
              Date d&apos;arrivée
            </label>
            <input
              id="animal-arrival"
              readOnly={isReadOnly}
              type="date"
              name="arrival-date"
              value={isReadOnly ? formatDateForInput(animal.arrival_date) : arrivalDate}
              onChange={(e) => setArrivalDate(e.target.value)}
              className={inputClassName}
            />

            <label className="text-sm font-medium text-slate-600" htmlFor="animal-leaving">
              Date de sortie
            </label>
            <input
              id="animal-leaving"
              readOnly={isReadOnly}
              type="date"
              name="leaving-date"
              value={isReadOnly ? formatDateForInput(animal.leaving_date) : leavingDate}
              onChange={(e) => setLeavingDate(e.target.value)}
              className={inputClassName}
            />

            <label className="text-sm font-medium text-slate-600" htmlFor="animal-about">
              À propos
            </label>
            <textarea
              id="animal-about"
              readOnly={isReadOnly}
              name="propos"
              value={isReadOnly ? animal.about : description}
              onChange={(e) => setDescription(e.target.value)}
              className={`${inputClassName} min-h-28`}
            />

            {(role === 'Employé' || role === 'Admin') && (
              <label className="inline-flex items-center gap-3 text-sm font-medium text-slate-700" htmlFor="animal-active">
                <input
                  id="animal-active"
                  type="checkbox"
                  disabled={isReadOnly}
                  checked={isReadOnly ? animal.is_active : isActiv}
                  onChange={(e) => setIsActiv(e.target.checked)}
                  className="h-5 w-5 rounded border-slate-300 text-[#00a292] focus:ring-[#00a292]"
                />
                Est actif ?
              </label>
            )}
          </div>
        </div>
      </div>

      {(role === 'Employé' || role === 'Admin') && (
        <div className="mb-8 flex flex-wrap justify-center gap-4 px-4 md:justify-end md:pr-12">
          {isEditing ? (
            <button
              type="submit"
              className="rounded-lg bg-emerald-500 px-5 py-2 font-semibold text-white transition hover:bg-emerald-600"
            >
              Enregistrer
            </button>
          ) : (
            <>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-5 py-2 font-semibold text-white transition hover:bg-amber-600"
                onClick={() => {
                  setIsReadOnly(false);
                  setIsEditing(true);
                }}
              >
                Modifier <Edit size={16} />
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg bg-rose-500 px-5 py-2 font-semibold text-white transition hover:bg-rose-600"
              >
                Désactiver <Trash size={16} />
              </button>
            </>
          )}
        </div>
      )}
    </form>
  );
}
