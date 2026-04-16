'use client';

import React, { useState } from 'react';

import { actionSetAnimal } from '@/src/lib/actions/animal.action';
import {
  actionSetConfirmPassword,
  actionSetUser,
} from '@/src/lib/actions/user.action';
import { useAppDispatch } from '@/src/lib/hooks';
import { actionThunkAddAnimal } from '@/src/lib/thunks/animal.thunk';
import { thunkActionRegister } from '@/src/lib/thunks/auth.thunk';

interface AddAccountModalProps {
  closeModal: () => void;
  form: 'employe' | 'animal';
}

const fieldClassName =
  'w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[#00a292] focus:ring-2 focus:ring-[#00a292]/30';

function AddAccountModal({ closeModal, form }: AddAccountModalProps) {
  const dispatch = useAppDispatch();

  const roles = [
    { key: 'Bénévole', label: 'Bénévole' },
    { key: 'Employé', label: 'Employé' },
    { key: 'Admin', label: 'Admin' },
  ];

  const genders = [
    { key: 'male', label: 'Mâle' },
    { key: 'female', label: 'Femelle' },
  ];

  const [email, setEmail] = useState('');
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [leavingDate, setLeavingDate] = useState('');
  const [role, setRole] = useState('');

  const [nameValue, setNameValue] = useState('');
  const [genderValue, setGenderValue] = useState('');
  const [diseaseValue, setDiseaseValue] = useState('');
  const [textAreaValue, setTextAreaValue] = useState('');

  return (
    <div className="w-full bg-white px-4 py-6">
      <form
        action="get"
        className="mx-auto flex w-full max-w-3xl flex-col items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:p-8"
        onSubmit={async (e) => {
          e.preventDefault();

          if (form === 'employe') {
            dispatch(actionSetUser({ name: 'lastname', value: lastname }));
            dispatch(actionSetUser({ name: 'firstname', value: firstname }));
            dispatch(actionSetUser({ name: 'birthdate', value: birthdate }));
            dispatch(actionSetUser({ name: 'email', value: email }));
            dispatch(actionSetUser({ name: 'password', value: password }));
            dispatch(actionSetConfirmPassword(confirmPassword));
            dispatch(
              actionSetUser({ name: 'arrival_date', value: arrivalDate })
            );
            dispatch(
              actionSetUser({ name: 'leaving_date', value: leavingDate })
            );
            dispatch(actionSetUser({ name: 'role', value: role }));

            await dispatch(thunkActionRegister());
          }

          if (form === 'animal') {
            dispatch(actionSetAnimal({ name: 'name', value: nameValue }));
            dispatch(actionSetAnimal({ name: 'birthdate', value: birthdate }));
            dispatch(actionSetAnimal({ name: 'gender', value: genderValue }));
            dispatch(actionSetAnimal({ name: 'health', value: diseaseValue }));
            dispatch(
              actionSetAnimal({ name: 'arrival_date', value: arrivalDate })
            );
            dispatch(
              actionSetAnimal({ name: 'leaving_date', value: leavingDate })
            );
            dispatch(actionSetAnimal({ name: 'about', value: textAreaValue }));

            await dispatch(actionThunkAddAnimal());
          }

          closeModal();
        }}
      >
        <h1 className="mb-2 text-center text-2xl font-bold md:text-3xl">
          {form === 'employe' ? 'Ajouter un employé' : 'Ajouter un animal'}
        </h1>

        {form === 'employe' ? (
          <>
            <div className="w-full">
              <label
                className="mb-1 block text-sm font-medium text-slate-600"
                htmlFor="lastname-form"
              >
                Nom de famille
              </label>
              <input
                required
                placeholder="Nom de famille"
                type="text"
                className={fieldClassName}
                id="lastname-form"
                name="lastname"
                aria-label="lastname"
                value={lastname}
                onChange={(e) => {
                  setLastname(e.target.value);
                }}
              />
            </div>

            <div className="w-full">
              <label
                className="mb-1 block text-sm font-medium text-slate-600"
                htmlFor="firstname-form"
              >
                Prénom
              </label>
              <input
                required
                placeholder="Prénom"
                type="text"
                className={fieldClassName}
                id="firstname-form"
                name="firstname"
                aria-label="firstname"
                value={firstname}
                onChange={(e) => {
                  setFirstname(e.target.value);
                }}
              />
            </div>
          </>
        ) : (
          <div className="w-full">
            <label
              className="mb-1 block text-sm font-medium text-slate-600"
              htmlFor="name-profil-form"
            >
              Nom
            </label>
            <input
              required
              placeholder="Nom"
              type="text"
              className={fieldClassName}
              id="name-profil-form"
              name="name"
              aria-label="name"
              value={nameValue}
              onChange={(e) => {
                setNameValue(e.target.value);
              }}
            />
          </div>
        )}

        <div className="w-full">
          <label
            className="mb-1 block text-sm font-medium text-slate-600"
            htmlFor="birthdate-form"
          >
            Date de naissance
          </label>
          <input
            required
            className={fieldClassName}
            type="date"
            id="birthdate-form"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
          />
        </div>

        {form === 'employe' ? (
          <>
            <div className="w-full">
              <label
                className="mb-1 block text-sm font-medium text-slate-600"
                htmlFor="email-form"
              >
                Email
              </label>
              <input
                required
                placeholder="Email"
                type="email"
                className={fieldClassName}
                id="email-form"
                name="email"
                aria-label="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            <div className="w-full">
              <label
                className="mb-1 block text-sm font-medium text-slate-600"
                htmlFor="password-form"
              >
                Mot de passe
              </label>
              <input
                required
                placeholder="Mot de passe"
                type="password"
                className={fieldClassName}
                id="password-form"
                name="password"
                aria-label="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            <div className="w-full">
              <label
                className="mb-1 block text-sm font-medium text-slate-600"
                htmlFor="confirmPassword-form"
              >
                Confirmation mot de passe
              </label>
              <input
                required
                placeholder="Confirmation mot de passe"
                type="password"
                className={fieldClassName}
                id="confirmPassword-form"
                name="confirmPassword"
                aria-label="confirmPassword"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </div>
          </>
        ) : (
          <>
            <div className="w-full">
              <label
                className="mb-1 block text-sm font-medium text-slate-600"
                htmlFor="gender-form"
              >
                Genre
              </label>
              <select
                required
                id="gender-form"
                className={fieldClassName}
                value={genderValue}
                onChange={(e) => {
                  setGenderValue(e.target.value);
                }}
              >
                <option value="">Sélectionner un genre</option>
                {genders.map((gender) => (
                  <option key={gender.key} value={gender.key}>
                    {gender.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full">
              <label
                className="mb-1 block text-sm font-medium text-slate-600"
                htmlFor="disease-profil-form"
              >
                Pathologie
              </label>
              <input
                placeholder="Pathologie"
                type="text"
                className={fieldClassName}
                id="disease-profil-form"
                name="disease"
                aria-label="disease"
                value={diseaseValue}
                onChange={(e) => {
                  setDiseaseValue(e.target.value);
                }}
              />
            </div>
          </>
        )}

        <div className="w-full">
          <label
            className="mb-1 block text-sm font-medium text-slate-600"
            htmlFor="arrival-date"
          >
            Date d&apos;arrivée
          </label>
          <input
            type="date"
            id="arrival-date"
            name="arrival-date"
            value={arrivalDate}
            onChange={(e) => setArrivalDate(e.target.value)}
            className={fieldClassName}
          />
        </div>

        <div className="w-full">
          <label
            className="mb-1 block text-sm font-medium text-slate-600"
            htmlFor="leaving-date"
          >
            Date de sortie
          </label>
          <input
            type="date"
            id="leaving-date"
            name="leaving-date"
            value={leavingDate}
            onChange={(e) => setLeavingDate(e.target.value)}
            className={fieldClassName}
          />
        </div>

        {form === 'employe' ? (
          <div className="w-full">
            <label
              className="mb-1 block text-sm font-medium text-slate-600"
              htmlFor="role-form"
            >
              Rôle
            </label>
            <select
              required
              id="role-form"
              className={fieldClassName}
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
              }}
            >
              <option value="">Sélectionner un rôle</option>
              {roles.map((roleItem) => (
                <option key={roleItem.key} value={roleItem.key}>
                  {roleItem.label}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="w-full">
            <label
              className="mb-1 block text-sm font-medium text-slate-600"
              htmlFor="about-profil-form"
            >
              À propos
            </label>
            <textarea
              required
              placeholder="À propos"
              className={`${fieldClassName} min-h-28`}
              id="about-profil-form"
              name="about"
              aria-label="about"
              value={textAreaValue}
              onChange={(e) => {
                setTextAreaValue(e.target.value);
              }}
            />
          </div>
        )}

        <button
          type="submit"
          className="mt-2 rounded-lg border border-[#00a292] px-8 py-2 text-lg font-semibold text-[#006f64] transition hover:bg-[#00a292] hover:text-white"
        >
          Ajouter
        </button>
      </form>
    </div>
  );
}

export default AddAccountModal;
