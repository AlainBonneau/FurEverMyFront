'use client';

import NextImage from 'next/image';
import { Button, Image, Input, Switch } from '@nextui-org/react';
import { Edit, Trash } from 'react-feather';
import './page.scss';

function AccountPage() {
  // Données fictives
  const user = {
    email: 'alain.bonneau@oclock.school',
    firstname: 'Alain',
    lastname: 'Bonneau',
    birthdate: '1997-01-28',
    password: 'password123',
    avatar: 'users/alain.jpg',
    arrival_date: '2023-01-01',
    leaving_date: null,
    role: 'Admin',
    is_active: true,
  };

  const userRole = 'Admin';

  const isReadOnly = true;
  const isEditing = false;

  return (
    <form className="account-page">
      <h1 className="header">Profil</h1>
      <div className="input-field">
        <Image
          as={NextImage}
          width={300}
          height={300}
          radius="full"
          alt={user.firstname}
          src={'/' + user.avatar}
        />
        <div className="input-field--div">
          <Input
            isReadOnly={isReadOnly}
            size="lg"
            type="email"
            label="Email"
            labelPlacement="outside"
            placeholder={user.email}
            name="email"
            value={user.email}
          />
          <Input
            isReadOnly={isReadOnly}
            size="lg"
            type="text"
            label="Prénom"
            labelPlacement="outside"
            placeholder={user.firstname}
            name="firstname"
            value={user.firstname}
          />
          <Input
            isReadOnly={isReadOnly}
            size="lg"
            type="text"
            label="Nom"
            labelPlacement="outside"
            placeholder={user.lastname}
            name="lastname"
            value={user.lastname}
          />
        </div>
        <div className="input-field--div">
          <Input
            isReadOnly={isReadOnly}
            size="lg"
            type="date"
            label="Naissance"
            labelPlacement="outside"
            placeholder={user.birthdate}
            name="birthdate"
            value={user.birthdate}
          />
          <Input
            isReadOnly={isReadOnly}
            size="lg"
            type="password"
            label="Mot de passe"
            labelPlacement="outside"
            placeholder={user.password}
            name="password"
            value={user.password}
          />

          {userRole === 'Admin' && (
            <Input
              isReadOnly
              size="lg"
              type="text"
              label="Création du compte"
              labelPlacement="outside"
              placeholder={user.arrival_date}
              name="arrival_date"
              value={user.arrival_date}
            />
          )}
        </div>
        <div className="input-field--div">
          {userRole === 'Admin' && (
            <>
              <Input
                isReadOnly
                size="lg"
                type="text"
                label="Désactivation"
                labelPlacement="outside"
                placeholder={user.leaving_date ?? ' '}
                name="leaving_date"
                value={user.leaving_date ?? ''}
              />
              <Input
                isReadOnly={isReadOnly}
                size="lg"
                type="text"
                label="Role"
                labelPlacement="outside"
                placeholder={user.role}
                name="role"
                value={user.role}
              />
              <Switch
                isReadOnly={isReadOnly}
                size="lg"
                isSelected={user.is_active}
              >
                Est Actif ?
              </Switch>
            </>
          )}
        </div>
      </div>
      <div>
        <Button className="btn-only" color="warning">
          Modifier <Edit />
        </Button>
        <Button className="btn-only" color="danger">
          Désactiver <Trash />
        </Button>
      </div>
    </form>
  );
}

export default AccountPage;
