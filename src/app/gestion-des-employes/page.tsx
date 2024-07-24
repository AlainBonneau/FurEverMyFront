'use client';
import { useEffect, useState } from 'react';

import { Plus, Settings, X } from 'react-feather';

import AddAccountModal from '../components/AddAccountModal/AddAccountModal';

import './page.scss';
import { useAppDispatch, useAppSelector } from '@/src/lib/hooks';
import {
  actionThunkUserList,
  actionUserSoftDelete,
} from '@/src/lib/thunks/user.thunk';
import { actionSetUser } from '@/src/lib/actions/user.action';
import Link from 'next/link';
import Loader from '../components/Loader/Loader';

function UserEdit() {
  const dispatch = useAppDispatch();

  useEffect(() => {}, []);

  const modified = useAppSelector((state) => state.auth.modified);
  const removed = useAppSelector((state) => state.user.remove);

  useEffect(() => {
    dispatch(actionThunkUserList());
  }, [modified, removed]);

  const users = useAppSelector((state) => state.user.users);
  const user = useAppSelector((state) => state.user.user);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const isLoading = useAppSelector((state) => state.user.isloading);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="user-edit-container">
      <div className="user-edit-title">
        <h1 className="main-title">Gestion des employés</h1>
        <button
          className="add-user-button"
          onClick={() => {
            setIsModalOpen(!isModalOpen);
          }}
        >
          {isModalOpen ? 'Fermer la modal' : 'Ajouter un employé'}

          {isModalOpen ? <X /> : <Plus />}
        </button>
      </div>

      {isModalOpen ? (
        <AddAccountModal closeModal={closeModal} form={'employe'} />
      ) : (
        <div className="user-block">
          {users.map((user) => (
            <div key={user.email} className="user-card">
              <h2>
                {user.lastname}, {user.firstname}, {user.email}
              </h2>
              <div className="buttons-container">
                <Link href={'/compte/' + user.id}>
                  <button className="user-block-button">
                    <Settings className="settings-icon" />
                  </button>
                </Link>

                <button
                  className="user-block-button"
                  onClick={async (e) => {
                    dispatch(
                      actionSetUser({ name: 'email', value: user.email })
                    );
                    await dispatch(actionUserSoftDelete());
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
export default UserEdit;
