'use client';

import React, { useEffect, useState } from 'react';
import { Button, Image, Input, Switch, Textarea } from '@nextui-org/react';
import { Edit, Trash } from 'react-feather';
import { useParams } from 'next/navigation';

import { IAnimal } from '@/src/@types/animal';

import './page.scss';
import { useAppDispatch, useAppSelector } from '@/src/lib/hooks';
import {
  actionSetAnimal,
  actionSetAnimalActive,
  actionSetAnimalId,
} from '@/src/lib/actions/animal.action';
import {
  actionThunkAnimalById,
  actionThunkUpdateAnimal,
} from '@/src/lib/thunks/animal.thunk';
import { actionLogIn } from '@/src/lib/actions/auth.action';
import { addTokenJwtToAxiosInstance } from '@/src/lib/axios/axios';
import Loader from '../../components/Loader/Loader';

export default function DetailAnimal() {
  const dispatch = useAppDispatch();

  useEffect(() => {}, []);

  const { id } = useParams();

  const animalId = Number(id);
  const isEdited = useAppSelector((state) => state.animal.isEdited);

  useEffect(() => {
    dispatch(actionSetAnimalId(animalId));
    getAnimalById();
    if (!animal) {
      dispatch(actionThunkAnimalById());
    }
  }, [isEdited]);

  async function getAnimalById() {
    await dispatch(actionThunkAnimalById());
  }

  const animal: IAnimal = useAppSelector((state) => state.animal.animal);
  const role = useAppSelector((state) => state.auth.connectedUser.role);

  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [health, setHealth] = useState('');
  /* const [species, setSpecies] = useState('');
  const [breed, setBreed] = useState(''); */
  const [arrivalDate, setArrivalDate] = useState('');
  const [leavingDate, setleavingDate] = useState('');
  const [description, setDescription] = useState('');
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isActiv, setIsActiv] = useState(true);

  const btnEditClick = () => {
    setIsReadOnly(false);
    setIsEditing(true);
  };

  const btnSaveClick = () => {
    setIsReadOnly(true);
    setIsEditing(false);
  };

  const isLoading = useAppSelector((state) => state.animal.isloading);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <form
      className="detail-animal"
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
      }}
    >
      {animal ? (
        <>
          <div className="detail-animal-header">
            <h1 className="detail-animal-title">
              Fiche détaillée de {animal.name}
            </h1>
          </div>
          <div className="detail-animal-content">
            <div className="detail-animal-image">
              <Image
                isZoomed
                width={360}
                alt={animal.name}
                src={`/${animal.avatar}`}
              />
            </div>
            <div className="detail-animal-description">
              <div className="detail-left">
                <Input
                  isReadOnly={isReadOnly}
                  type="text"
                  label="Nom"
                  labelPlacement="outside"
                  placeholder={isReadOnly ? '' : animal.name}
                  name="name"
                  value={isReadOnly ? animal.name : name}
                  onChange={(e) => setName(e.target.value)}
                  className="user-input"
                />
                <Input
                  isReadOnly
                  type="text"
                  label="Genre"
                  labelPlacement="outside"
                  placeholder={animal.gender}
                  name="gender"
                  className="user-input"
                />
                <Input
                  isReadOnly={isReadOnly}
                  type="date"
                  label="Naissance"
                  labelPlacement="outside"
                  placeholder={isReadOnly ? '' : animal.birthdate}
                  name="birthdate"
                  value={isReadOnly ? animal.birthdate : birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                  className="user-input"
                />
                {/* <Input
                  isReadOnly={isReadOnly}
                  type="text"
                  label="Race"
                  name="breed"
                  value={breed}
                  onChange={(e) => setBreed(e.target.value)}
                  className="user-input"
                />

                <Input
                  isReadOnly={isReadOnly}
                  type="text"
                  label="Espèce"
                  name="species"
                  value={species}
                  onChange={(e) => setSpecies(e.target.value)}
                  className="user-input"
                /> */}
              </div>
              <div className="detail-right">
                <Input
                  isReadOnly={isReadOnly}
                  type="text"
                  label="Santé"
                  labelPlacement="outside"
                  placeholder={isReadOnly ? '' : animal.health}
                  name="health"
                  value={isReadOnly ? animal.health : health}
                  onChange={(e) => setHealth(e.target.value)}
                  className="user-input"
                />
                <Input
                  isReadOnly={isReadOnly}
                  type="date"
                  label="Date d'arrivée"
                  labelPlacement="outside"
                  placeholder={isReadOnly ? '' : animal.arrival_date}
                  name="arrival-date"
                  value={isReadOnly ? animal.arrival_date : arrivalDate}
                  onChange={(e) => setArrivalDate(e.target.value)}
                  className="user-input"
                />
                <Input
                  isReadOnly={isReadOnly}
                  type="date"
                  label="Date de sortie"
                  labelPlacement="outside"
                  placeholder={isReadOnly ? '' : animal.leaving_date}
                  name="leaving-date"
                  value={isReadOnly ? animal.leaving_date : leavingDate}
                  onChange={(e) => setleavingDate(e.target.value)}
                  className="user-input"
                />
                <Textarea
                  isReadOnly={isReadOnly}
                  type="text"
                  label="A propos"
                  labelPlacement="outside"
                  placeholder={isReadOnly ? '' : animal.about}
                  name="propos"
                  value={isReadOnly ? animal.about : description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="user-input"
                />
                {(role === 'Employé' || role === 'Admin') && (
                  <Switch
                    isReadOnly={isReadOnly}
                    isSelected={isReadOnly ? animal.is_active : isActiv}
                    onValueChange={setIsActiv}
                  >
                    Est Actif ?
                  </Switch>
                )}
              </div>
            </div>
          </div>
          {(role === 'Employé' || role === 'Admin') && (
            <div className="btn-edit">
              {isEditing ? (
                <Button type="submit" className="btn-only" color="success">
                  Enregistrer
                </Button>
              ) : (
                <>
                  <Button
                    className="btn-only"
                    color="warning"
                    onClick={btnEditClick}
                  >
                    Modifier <Edit />
                  </Button>
                  <Button className="btn-only" color="danger">
                    Désactiver <Trash />
                  </Button>
                </>
              )}
            </div>
          )}
        </>
      ) : (
        'Loading'
      )}
    </form>
  );
}
