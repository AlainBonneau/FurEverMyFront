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

import { actionModifyNav } from '@/src/lib/actions/home.action';
import { useAppDispatch, useAppSelector } from '@/src/lib/hooks';
import { thunkActionLogout } from '@/src/lib/thunks/auth.thunk';

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

  const pseudo = `${firstname || ''} ${(lastname || '').toUpperCase()}`.trim();

  const desktopLinkClass = (isActive: boolean) =>
    `rounded-md p-1 transition hover:text-[#00a292] ${isActive ? 'text-[#00a292]' : 'text-slate-700'}`;

  const mobileLinkClass = (isActive: boolean) =>
    `flex items-center gap-2 text-2xl font-semibold transition hover:text-[#00a292] ${isActive ? 'text-[#00a292]' : 'text-slate-800'}`;

  const actionButtonClass =
    'inline-flex items-center justify-center rounded-lg border border-[#00a292] px-4 py-2 text-sm font-semibold text-[#006f64] transition hover:bg-[#00a292] hover:text-white';

  return (
    <nav className="fixed top-0 z-20 flex h-[54px] w-full items-center justify-between bg-white px-3 shadow-md sm:px-5">
      <div className="flex h-[54px] items-center overflow-hidden">
        <img className="relative z-0 h-[110px]" src="/logonav.png" alt="Logo" />
        <h1
          className="-translate-x-16 text-2xl font-bold sm:text-3xl"
          style={{ fontFamily: 'Merriweather, serif' }}
        >
          FurEverHome
        </h1>
      </div>

      <ul className="hidden items-center gap-5 md:flex lg:gap-8">
        <li>
          <Link
            className={desktopLinkClass(nav === 'Accueil')}
            href="/"
            title="Accueil"
            onClick={() => dispatch(actionModifyNav('Accueil'))}
          >
            <Home />
          </Link>
        </li>
        <li>
          <Link
            className={desktopLinkClass(nav === 'Liste des animaux')}
            href="/liste-des-animaux"
            title="Liste des animaux"
            onClick={() => dispatch(actionModifyNav('Liste des animaux'))}
          >
            <Book />
          </Link>
        </li>
        <li>
          <Link
            className={desktopLinkClass(nav === 'Contact')}
            href="/contact"
            title="Contact"
            onClick={() => dispatch(actionModifyNav('Contact'))}
          >
            <Send />
          </Link>
        </li>
        {role && (
          <li>
            <Link
              className={desktopLinkClass(nav === 'Planning')}
              href="/"
              title="Planning"
              onClick={() => dispatch(actionModifyNav('Planning'))}
            >
              <Calendar />
            </Link>
          </li>
        )}
        {(role === 'Employé' || role === 'Admin') && (
          <li>
            <Link
              className={desktopLinkClass(nav === 'Gestion des animaux')}
              href="/gestion-des-animaux"
              title="Gestion des animaux"
              onClick={() => dispatch(actionModifyNav('Gestion des animaux'))}
            >
              <Database />
            </Link>
          </li>
        )}
        {role === 'Admin' && (
          <li>
            <Link
              className={desktopLinkClass(nav === 'Gestion des employés')}
              href="/gestion-des-employes"
              title="Gestion des employés"
              onClick={() => dispatch(actionModifyNav('Gestion des employés'))}
            >
              <Users />
            </Link>
          </li>
        )}
      </ul>

      <div className="hidden md:flex md:items-center">
        {role ? (
          <div className="relative flex items-center">
            <button
              type="button"
              onClick={() => setUserMenuOpen((prev) => !prev)}
              className="rounded-full"
            >
              <img
                src={avatar ? `/${avatar}` : '/users/profile-default.svg'}
                alt="Icon utilisateur"
                className="h-10 w-10 rounded-full border-2 border-[#003f3e] object-cover transition hover:border-[#00a292]"
              />
            </button>
            {userMenuOpen && (
              <div className="absolute right-0 top-14 z-30 flex w-56 flex-col items-center gap-3 rounded-lg bg-white p-4 shadow-lg">
                <h1 className="text-center text-sm font-semibold text-slate-700">
                  {pseudo}
                </h1>
                <Link
                  className={`text-sm transition hover:text-[#00a292] ${nav === 'Compte' ? 'text-[#00a292]' : 'text-slate-700'}`}
                  href="/compte"
                  title="Compte"
                  onClick={() => dispatch(actionModifyNav('Compte'))}
                >
                  Compte
                </Link>
                <Link
                  href="/"
                  className={`${actionButtonClass} inline-flex items-center gap-2`}
                  onClick={() => {
                    dispatch(thunkActionLogout());
                    setUserMenuOpen(false);
                  }}
                >
                  Se déconnecter <LogOut size={18} />
                </Link>
              </div>
            )}
          </div>
        ) : (
          <Link href="/connexion" className={actionButtonClass}>
            Connexion
          </Link>
        )}
      </div>

      <button
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-md text-slate-700 md:hidden"
        onClick={() => setIsMenuOpen(true)}
        aria-label="Ouvrir le menu"
      >
        <Menu size={28} />
      </button>

      {isMenuOpen && (
        <div className="fixed inset-0 z-40 flex h-screen w-full flex-col bg-white">
          <div className="flex h-[54px] items-center justify-between px-3 shadow-md sm:px-5">
            <div className="flex h-[54px] items-center overflow-hidden">
              <img
                className="relative z-0 h-[110px]"
                src="/logonav.png"
                alt="Logo"
              />
              <h1
                className="-translate-x-16 text-2xl font-bold"
                style={{ fontFamily: 'Merriweather, serif' }}
              >
                FurEverHome
              </h1>
            </div>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-slate-700"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Fermer le menu"
            >
              <X size={32} />
            </button>
          </div>

          <div className="flex flex-1 flex-col items-center justify-between py-8">
            <div className="flex w-full max-w-md flex-col items-center gap-6">
              {role && (
                <div className="mb-4 flex flex-col items-center gap-3">
                  <img
                    src={avatar ? `/${avatar}` : '/users/profile-default.svg'}
                    alt="Icon utilisateur"
                    className="h-24 w-24 rounded-full border-2 border-[#003f3e] object-cover"
                  />
                  <h1 className="text-2xl font-bold text-[#00a292]">
                    {pseudo}
                  </h1>
                </div>
              )}

              <Link
                className={mobileLinkClass(nav === 'Accueil')}
                href="/"
                onClick={() => {
                  dispatch(actionModifyNav('Accueil'));
                  setIsMenuOpen(false);
                }}
              >
                <Home size={30} />
                <span>Accueil</span>
              </Link>

              {role && (
                <Link
                  className={mobileLinkClass(nav === 'Compte')}
                  href="/compte"
                  onClick={() => {
                    dispatch(actionModifyNav('Compte'));
                    setIsMenuOpen(false);
                  }}
                >
                  <User size={30} />
                  <span>Compte</span>
                </Link>
              )}

              <Link
                className={mobileLinkClass(nav === 'Liste des animaux')}
                href="/liste-des-animaux"
                onClick={() => {
                  dispatch(actionModifyNav('Liste des animaux'));
                  setIsMenuOpen(false);
                }}
              >
                <Book size={30} />
                <span>Liste des animaux</span>
              </Link>

              <Link
                className={mobileLinkClass(nav === 'Contact')}
                href="/contact"
                onClick={() => {
                  dispatch(actionModifyNav('Contact'));
                  setIsMenuOpen(false);
                }}
              >
                <Send size={30} />
                <span>Contact</span>
              </Link>

              {role && (
                <Link
                  className={mobileLinkClass(nav === 'Planning')}
                  href="/"
                  onClick={() => {
                    dispatch(actionModifyNav('Planning'));
                    setIsMenuOpen(false);
                  }}
                >
                  <Calendar size={30} />
                  <span>Planning</span>
                </Link>
              )}

              {(role === 'Employé' || role === 'Admin') && (
                <Link
                  className={mobileLinkClass(nav === 'Gestion des animaux')}
                  href="/gestion-des-animaux"
                  onClick={() => {
                    dispatch(actionModifyNav('Gestion des animaux'));
                    setIsMenuOpen(false);
                  }}
                >
                  <Database size={30} />
                  <span>Gestion des animaux</span>
                </Link>
              )}

              {role === 'Admin' && (
                <Link
                  className={mobileLinkClass(nav === 'Gestion des employés')}
                  href="/gestion-des-employes"
                  onClick={() => {
                    dispatch(actionModifyNav('Gestion des employés'));
                    setIsMenuOpen(false);
                  }}
                >
                  <Users size={30} />
                  <span>Gestion des employés</span>
                </Link>
              )}
            </div>

            {role ? (
              <Link
                href="/"
                className="mb-8 inline-flex items-center gap-3 rounded-lg border border-[#00a292] px-6 py-3 text-xl font-semibold text-[#006f64] transition hover:bg-[#00a292] hover:text-white"
                onClick={() => {
                  dispatch(thunkActionLogout());
                  setIsMenuOpen(false);
                }}
              >
                Se déconnecter <LogOut size={28} />
              </Link>
            ) : (
              <Link
                href="/connexion"
                className="mb-8 rounded-lg border border-[#00a292] px-6 py-3 text-xl font-semibold text-[#006f64] transition hover:bg-[#00a292] hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Connexion
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
