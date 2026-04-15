'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { Edit, Trash } from 'react-feather';
import { redirect } from 'next/navigation';

import { IUser } from '@/src/@types/user';
import axiosInstance from '@/src/lib/axios/axios';
import { useAppDispatch, useAppSelector } from '@/src/lib/hooks';
import { actionThunkUserById } from '@/src/lib/thunks/user.thunk';

interface UpdateUserPayload {
  email: string;
  lastname: string;
  firstname: string;
  birthdate: string;
  password: string;
  leaving_date: string;
  is_active: boolean;
}

const inputClassName =
  'w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[#00a292] focus:ring-2 focus:ring-[#00a292]/30';

function AccountPage() {
  const dispatch = useAppDispatch();

  const userRole = useAppSelector((state) => state.auth.connectedUser.role);
  const user = useAppSelector((state) => state.user.user) as IUser;

  const [email, setEmail] = useState('');
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [password, setPassword] = useState('');
  const [leavingDate, setLeavingDate] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!userRole) {
      redirect('/');
    } else {
      dispatch(actionThunkUserById());
    }
  }, [userRole, dispatch]);

  useEffect(() => {
    setEmail(user.email || '');
    setLastname(user.lastname || '');
    setFirstname(user.firstname || '');
    setBirthdate(user.birthdate || '');
    setPassword(user.password || '');
    setLeavingDate(user.leaving_date || '');
    setIsActive(user.is_active ?? true);
  }, [user]);

  async function updateUser(data: UpdateUserPayload) {
    try {
      const response = await axiosInstance.put('/users/patch', data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // eslint-disable-next-line no-console
        console.error('Erreur API :', error.response?.data || error.message);
      } else {
        // eslint-disable-next-line no-console
        console.error('Erreur inconnue :', error);
      }
      throw error;
    }
  }

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedData: UpdateUserPayload = {
      email,
      lastname,
      firstname,
      birthdate,
      password,
      leaving_date: leavingDate,
      is_active: isActive,
    };

    try {
      await updateUser(updatedData);
      setIsEditing(false);
      setIsReadOnly(true);
      dispatch(actionThunkUserById());
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to save changes:', error);
      alert('Une erreur est survenue lors de la sauvegarde.');
    }
  };

  return (
    <form className="flex flex-col items-center px-4 py-6 md:px-8 md:py-10" onSubmit={handleSave}>
      <h1 className="pb-6 text-4xl font-extrabold md:pb-10 md:text-5xl">Profil</h1>

      <div className="flex w-full max-w-6xl flex-col items-center gap-6 md:flex-row md:items-start md:justify-center">
        <div className="relative h-[220px] w-[220px] overflow-hidden rounded-full border-4 border-white shadow-md md:h-[300px] md:w-[300px]">
          <Image
            src={user.avatar ? `/${user.avatar}` : '/users/profile-default.svg'}
            alt={user.firstname || 'Avatar utilisateur'}
            fill
            sizes="(max-width: 768px) 220px, 300px"
            className="object-cover"
          />
        </div>

        <div className="grid w-full gap-4 md:grid-cols-3">
          <div className="flex flex-col gap-4">
            <label className="text-sm font-medium text-slate-600" htmlFor="account-email">
              Email
            </label>
            <input
              id="account-email"
              readOnly={isReadOnly}
              className={inputClassName}
              type="email"
              name="email"
              value={isReadOnly ? user.email : email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="text-sm font-medium text-slate-600" htmlFor="account-firstname">
              Prénom
            </label>
            <input
              id="account-firstname"
              readOnly={isReadOnly}
              className={inputClassName}
              type="text"
              name="firstname"
              value={isReadOnly ? user.firstname : firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />

            <label className="text-sm font-medium text-slate-600" htmlFor="account-lastname">
              Nom
            </label>
            <input
              id="account-lastname"
              readOnly={isReadOnly}
              className={inputClassName}
              type="text"
              name="lastname"
              value={isReadOnly ? user.lastname : lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-4">
            <label className="text-sm font-medium text-slate-600" htmlFor="account-birthdate">
              Naissance
            </label>
            <input
              id="account-birthdate"
              readOnly={isReadOnly}
              className={inputClassName}
              type="date"
              name="birthdate"
              value={isReadOnly ? user.birthdate : birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
            />

            <label className="text-sm font-medium text-slate-600" htmlFor="account-password">
              Mot de passe
            </label>
            <input
              id="account-password"
              readOnly
              className={inputClassName}
              type={isReadOnly ? 'password' : 'text'}
              name="password"
              value={isReadOnly ? user.password : password}
            />

            {userRole === 'Admin' && (
              <>
                <label className="text-sm font-medium text-slate-600" htmlFor="account-arrival-date">
                  Création du compte
                </label>
                <input
                  id="account-arrival-date"
                  readOnly
                  className={inputClassName}
                  type="text"
                  name="arrival_date"
                  value={user.arrival_date}
                />
              </>
            )}
          </div>

          {userRole === 'Admin' && (
            <div className="flex flex-col gap-4">
              <label className="text-sm font-medium text-slate-600" htmlFor="account-leaving-date">
                Désactivation
              </label>
              <input
                id="account-leaving-date"
                readOnly
                className={inputClassName}
                type="text"
                name="leaving_date"
                value={user.leaving_date || ''}
              />

              <label className="text-sm font-medium text-slate-600" htmlFor="account-role">
                Rôle
              </label>
              <input
                id="account-role"
                readOnly
                className={inputClassName}
                type="text"
                name="role"
                value={user.role || ''}
              />

              <label className="inline-flex items-center gap-3 pt-3 text-sm font-medium text-slate-700" htmlFor="account-active">
                <input
                  id="account-active"
                  type="checkbox"
                  disabled={isReadOnly}
                  checked={isReadOnly ? user.is_active : isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="h-5 w-5 rounded border-slate-300 text-[#00a292] focus:ring-[#00a292]"
                />
                Est actif ?
              </label>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
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
    </form>
  );
}

export default AccountPage;
