'use client';

import { useState } from 'react';
import Link from 'next/link';

import {
  Book,
  Calendar,
  Database,
  Home,
  LogOut,
  Menu,
  Send,
  User,
  Users,
  X,
} from 'react-feather';
import { Button } from '@nextui-org/react';

import { useAppDispatch, useAppSelector } from '@/src/lib/hooks';
import { actionLogOut } from '@/src/lib/actions/auth.action';

import './NavBar.scss';
import { actionModifyNav } from '@/src/lib/actions/home.action';

function NavBar() {
  const dispatch = useAppDispatch();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const nav = useAppSelector((state) => state.home.nav);

  const avatar = useAppSelector((state) => state.auth.connectedUser.avatar);
  const firstname = useAppSelector(
    (state) => state.auth.connectedUser.firstname
  );
  const lastname = useAppSelector((state) => state.auth.connectedUser.lastname);
  const role = useAppSelector((state) => state.auth.connectedUser.role);

  const pseudo = firstname + ' ' + lastname.toLocaleUpperCase();

  return (
    <nav className="navbar">
      <div className="navbar--pannel">
        <img className="navbar--pannel--logo" src="/logonav.png" alt="Logo" />
        <h1 className="navbar--pannel--title">FurEverHome</h1>
      </div>

      <ul className="navbar--navigation">
        <Link
          className={
            nav === 'Accueil'
              ? 'navbar--navigation--link active'
              : 'navbar--navigation--link'
          }
          href="/"
          title="Accueil"
          onClick={() => {
            dispatch(actionModifyNav('Accueil'));
          }}
        >
          <Home />
        </Link>
        <Link
          className={
            nav === 'Liste des animaux'
              ? 'navbar--navigation--link active'
              : 'navbar--navigation--link'
          }
          href="/liste-des-animaux"
          title="Liste des animaux"
          onClick={() => {
            dispatch(actionModifyNav('Liste des animaux'));
          }}
        >
          <Book />
        </Link>
        <Link
          className={
            nav === 'Contact'
              ? 'navbar--navigation--link active'
              : 'navbar--navigation--link'
          }
          href="/contact"
          title="Contact"
          onClick={() => {
            dispatch(actionModifyNav('Contact'));
          }}
        >
          <Send />
        </Link>
        {role && (
          <Link
            className={
              nav === 'Planning'
                ? 'navbar--navigation--link active'
                : 'navbar--navigation--link'
            }
            href="/"
            title="Planning"
            onClick={() => {
              dispatch(actionModifyNav('Planning'));
            }}
          >
            <Calendar />
          </Link>
        )}
        {(role === 'Employé' || role === 'Admin') && (
          <Link
            className={
              nav === 'Gestion des animaux'
                ? 'navbar--navigation--link active'
                : 'navbar--navigation--link'
            }
            href="/gestion-des-animaux"
            title="Gestion des animaux"
            onClick={() => {
              dispatch(actionModifyNav('Gestion des animaux'));
            }}
          >
            <Database />
          </Link>
        )}

        {role === 'Admin' && (
          <Link
            className={
              nav === 'Gestion des employés'
                ? 'navbar--navigation--link active'
                : 'navbar--navigation--link'
            }
            href="/gestion-des-employes"
            title="Gestion des employés"
            onClick={() => {
              dispatch(actionModifyNav('Gestion des employés'));
            }}
          >
            <Users />
          </Link>
        )}
      </ul>

      <ul className="navbar--navigation">
        {role ? (
          <div className="navbar--navigation--connected">
            <button onClick={() => setUserMenuOpen(!userMenuOpen)}>
              <img
                src={avatar ? avatar : 'users/profile-default.svg'}
                alt="Icon utilisateur"
                className="navbar--navigation--connected--usericon"
              />
            </button>
            {userMenuOpen && (
              <div className="usermenuopen">
                <h1>{pseudo}</h1>
                <Link
                  className={
                    nav === 'Compte'
                      ? 'usermenuopen--link active'
                      : 'usermenuopen--link'
                  }
                  href="/compte"
                  title="Compte"
                  onClick={() => {
                    dispatch(actionModifyNav('Compte'));
                  }}
                >
                  Compte
                </Link>
                <Link href="/">
                  <Button
                    size="md"
                    color="primary"
                    variant="ghost"
                    className="navbar--navigation--button"
                    onClick={() => {
                      dispatch(actionLogOut());
                    }}
                  >
                    Se deconnecter <LogOut size="20px" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        ) : (
          <Link href="/connexion">
            <Button
              size="md"
              color="primary"
              variant="ghost"
              className="navbar--navigation--button"
            >
              Connexion
            </Button>
          </Link>
        )}
      </ul>

      {isMenuOpen ? (
        <div className="mobilemenu">
          <div className="mobilemenu--navbar">
            <div className="navbar--pannel">
              <img
                className="navbar--pannel--logo"
                src="/logonav.png"
                alt="Logo"
              />
              <h1 className="navbar--pannel--title">FurEverHome</h1>
            </div>
            <button
              className="mobilemenu--navbar--mobilenav"
              onClick={() => setIsMenuOpen(false)}
            >
              <X size="40px" />
            </button>
          </div>

          <div className="mobilemenu--navigation">
            {role && (
              <div className="mobilemenu--navigation--user">
                <img
                  src={avatar ? avatar : 'users/profile-default.svg'}
                  alt="Icon utilisateur"
                  className="mobilemenu--navigation--user--icon"
                />
                <h1 className="mobilemenu--navigation--user--name">{pseudo}</h1>
              </div>
            )}
            <ul className="mobilemenu--navigation--links">
              <Link
                className={
                  nav === 'Accueil'
                    ? 'mobilemenu--navigation--link active'
                    : 'mobilemenu--navigation--link'
                }
                href="/"
                onClick={() => {
                  dispatch(actionModifyNav('Accueil'));
                  setIsMenuOpen(false);
                }}
              >
                <Home size="40px" />
                <h1>Accueil</h1>
              </Link>
              {role && (
                <Link
                  className={
                    nav === 'Compte'
                      ? 'mobilemenu--navigation--link active'
                      : 'mobilemenu--navigation--link'
                  }
                  href="/compte"
                  onClick={() => {
                    dispatch(actionModifyNav('Compte'));
                    setIsMenuOpen(false);
                  }}
                >
                  <User size="40px" />
                  <h1>Compte</h1>
                </Link>
              )}
              <Link
                className={
                  nav === 'Liste des animaux'
                    ? 'mobilemenu--navigation--link active'
                    : 'mobilemenu--navigation--link'
                }
                href="/liste-des-animaux"
                onClick={() => {
                  dispatch(actionModifyNav('Liste des animaux'));
                  setIsMenuOpen(false);
                }}
              >
                <Book size="40px" />
                <h1>Liste des animaux</h1>
              </Link>
              <Link
                className={
                  nav === 'Contact'
                    ? 'mobilemenu--navigation--link active'
                    : 'mobilemenu--navigation--link'
                }
                href="/contact"
                onClick={() => {
                  dispatch(actionModifyNav('Contact'));
                  setIsMenuOpen(false);
                }}
              >
                <Send size="40px" />
                <h1>Contact</h1>
              </Link>
              {role && (
                <Link
                  className={
                    nav === 'Planning'
                      ? 'mobilemenu--navigation--link active'
                      : 'mobilemenu--navigation--link'
                  }
                  href="/"
                  onClick={() => {
                    dispatch(actionModifyNav('Planning'));
                    setIsMenuOpen(false);
                  }}
                >
                  <Calendar size="40px" />
                  <h1>Planning</h1>
                </Link>
              )}
              {(role === 'Employé' || role === 'Admin') && (
                <Link
                  className={
                    nav === 'Gestion des animaux'
                      ? 'mobilemenu--navigation--link active'
                      : 'mobilemenu--navigation--link'
                  }
                  href="/gestion-des-animaux"
                  onClick={() => {
                    dispatch(actionModifyNav('Gestion des animaux'));
                    setIsMenuOpen(false);
                  }}
                >
                  <Database size="40px" />
                  <h1>Gestion des animaux</h1>
                </Link>
              )}

              {role === 'Admin' && (
                <Link
                  className={
                    nav === 'Gestion des employés'
                      ? 'mobilemenu--navigation--link active'
                      : 'mobilemenu--navigation--link'
                  }
                  href="/gestion-des-employes"
                  onClick={() => {
                    dispatch(actionModifyNav('Gestion des employés'));
                    setIsMenuOpen(false);
                  }}
                >
                  <Users size="40px" />
                  <h1>Gestion des employés</h1>
                </Link>
              )}
            </ul>
            {role ? (
              <>
                <Link href="/">
                  <Button
                    className="mobilemenu--navigation--disconnect"
                    size="lg"
                    color="primary"
                    variant="ghost"
                    onClick={() => {
                      dispatch(actionLogOut());
                    }}
                  >
                    <h1 className="mobilemenu--navigation--disconnect--title">
                      Se deconnecter
                    </h1>{' '}
                    <LogOut size="40px" />
                  </Button>
                </Link>
              </>
            ) : (
              <Link href="/connexion">
                <Button
                  className="mobilemenu--navigation--disconnect"
                  size="md"
                  color="primary"
                  variant="ghost"
                >
                  <h1 className="mobilemenu--navigation--disconnect--title">
                    Connexion
                  </h1>
                </Button>
              </Link>
            )}
          </div>
        </div>
      ) : (
        <button
          className="navbar--mobilenav"
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu size="40px" />
        </button>
      )}
    </nav>
  );
}
export default NavBar;
