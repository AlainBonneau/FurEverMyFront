'use client';

import React, { useState } from 'react';

import { Input } from '@nextui-org/input';

import { Select, SelectItem, Textarea } from '@nextui-org/react';

import './AddAccountModal.scss';
import { useAppDispatch } from '@/src/lib/hooks';
import {
  actionSetConfirmPassword,
  actionSetUser,
} from '@/src/lib/actions/user.action';
import { thunkActionRegister } from '@/src/lib/thunks/auth.thunk';
import { actionSetAnimal } from '@/src/lib/actions/animal.action';
import { actionThunkAddAnimal } from '@/src/lib/thunks/animal.thunk';

interface AddAccountModalProps {
  closeModal: () => void;
  form: 'employe' | 'animal';
}

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
    <div className="overlay">
      <form
        action="get"
        className="add-profile-form"
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
        <h1 className="add-profile-title">
          {form === 'employe' ? 'Ajouter un employé' : 'ajouter un animal'}
        </h1>
        {form === 'employe' ? (
          <>
            <Input
              isRequired
              labelPlacement="outside"
              placeholder="Nom de famille"
              label="Nom de famille"
              type="text"
              className="input-field"
              id="lastname-form"
              name="lastname"
              aria-label="lastname"
              value={lastname}
              onChange={(e) => {
                setLastname(e.target.value);
              }}
            />
            <Input
              isRequired
              labelPlacement="outside"
              placeholder="Prénom"
              label="Prénom"
              type="text"
              className="input-field"
              id="firstname-form"
              name="firstname"
              aria-label="firstname"
              value={firstname}
              onChange={(e) => {
                setFirstname(e.target.value);
              }}
            />
          </>
        ) : (
          <Input
            isRequired
            labelPlacement="outside"
            placeholder="Nom"
            label="Nom"
            type="text"
            className="input-field"
            id="name-profil-form"
            name="name"
            aria-label="name"
            value={nameValue}
            onChange={(e) => {
              setNameValue(e.target.value);
            }}
          />
        )}
        <Input
          isReadOnly={false}
          className="h-[72px] input-field"
          type="date"
          labelPlacement="outside"
          isRequired
          label="Date de naissance"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
        />
        {form === 'employe' ? (
          <>
            <Input
              isRequired
              labelPlacement="outside"
              placeholder="Email"
              label="Email"
              type="email"
              className="input-field"
              id="email-form"
              name="email"
              aria-label="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Input
              isRequired
              labelPlacement="outside"
              placeholder="Mot de passe"
              label="Mot de passe"
              type="password"
              className="input-field"
              id="password-form"
              name="password"
              aria-label="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Input
              isRequired
              labelPlacement="outside"
              placeholder="Confirmation mot de passe"
              label="Confirmation mot de passe"
              type="password"
              className="input-field"
              id="confirmPassword-form"
              name="confirmPassword"
              aria-label="confirmPassword"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </>
        ) : (
          <>
            <Select
              isRequired
              labelPlacement="outside"
              items={genders}
              label="Genre"
              placeholder="Selectionner un genre"
              className="input-field"
              value={genderValue}
              onChange={(e) => {
                setGenderValue(e.target.value);
              }}
            >
              {(gender) => (
                <SelectItem key={gender.key}>{gender.label}</SelectItem>
              )}
            </Select>
            <Input
              labelPlacement="outside"
              placeholder="Pathologie"
              label="Pathologie"
              type="select"
              className="input-field"
              id="disease-profil-form"
              name="disease"
              aria-label="disease"
              value={diseaseValue}
              onChange={(e) => {
                setDiseaseValue(e.target.value);
              }}
            />
          </>
        )}
        <Input
          isReadOnly={false}
          type="date"
          labelPlacement="outside"
          label="Date d'arrivée"
          name="arrival-date"
          value={arrivalDate}
          onChange={(e) => setArrivalDate(e.target.value)}
          className="h-[72px] input-field"
        />
        <Input
          isReadOnly={false}
          type="date"
          labelPlacement="outside"
          label="Date de sortie"
          name="leaving-date"
          value={leavingDate}
          onChange={(e) => setLeavingDate(e.target.value)}
          className="h-[72px] input-field"
        />
        {form === 'employe' ? (
          <Select
            isRequired
            labelPlacement="outside"
            items={roles}
            label="Rôle"
            placeholder="Selectionner un rôle"
            className="input-field"
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
            }}
          >
            {(role) => <SelectItem key={role.key}>{role.label}</SelectItem>}
          </Select>
        ) : (
          <>
            <Textarea
              isRequired
              labelPlacement="outside"
              placeholder="Â propos"
              label="Â propos"
              type="text"
              className=" about-field"
              id="about-profil-form"
              name="about"
              aria-label="about"
              value={textAreaValue}
              onChange={(e) => {
                setTextAreaValue(e.target.value);
              }}
            />
          </>
        )}

        <button type="submit" className="login-button">
          Ajouter
        </button>
      </form>
    </div>
  );
}

export default AddAccountModal;
