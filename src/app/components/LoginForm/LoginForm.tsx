'use client';

import React, { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';

import {
  actionChangeCredential,
  actionRememberMe,
} from '@/src/lib/actions/auth.action';
import { useAppDispatch, useAppSelector } from '@/src/lib/hooks';
import { thunkActionLogin } from '@/src/lib/thunks/auth.thunk';

const inputClassName =
  'w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[#00a292] focus:ring-2 focus:ring-[#00a292]/30';

function LoginForm() {
  const dispatch = useAppDispatch();
  const role = useAppSelector((state) => state.auth.connectedUser.role);

  useEffect(() => {
    if (role) {
      redirect('/');
    }
  }, [role]);

  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [checkboxInput, setCheckboxInput] = useState(false);

  return (
    <form
      className="flex w-full max-w-xl flex-col items-center gap-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm xl:w-1/2 xl:gap-8"
      onSubmit={async (e) => {
        e.preventDefault();
        dispatch(actionChangeCredential({ name: 'email', value: emailInput }));
        dispatch(
          actionChangeCredential({ name: 'password', value: passwordInput })
        );
        dispatch(actionRememberMe(checkboxInput));

        await dispatch(thunkActionLogin());
        setEmailInput('');
        setPasswordInput('');
        setCheckboxInput(false);
      }}
    >
      <h1 className="text-center text-4xl font-extrabold">Connexion</h1>

      <div className="w-full">
        <label
          className="mb-2 block text-sm font-medium text-slate-600"
          htmlFor="email-login-form"
        >
          Email
        </label>
        <input
          required
          placeholder="Email"
          type="email"
          className={inputClassName}
          id="email-login-form"
          name="email"
          aria-label="Email"
          value={emailInput}
          onChange={(e) => {
            setEmailInput(e.target.value);
          }}
        />
      </div>

      <div className="w-full">
        <label
          className="mb-2 block text-sm font-medium text-slate-600"
          htmlFor="password-login-form"
        >
          Mot de passe
        </label>
        <input
          required
          placeholder="Mot de passe"
          type="password"
          className={inputClassName}
          id="password-login-form"
          name="password"
          aria-label="Password"
          value={passwordInput}
          onChange={(e) => {
            setPasswordInput(e.target.value);
          }}
        />
      </div>

      <div className="flex w-full items-center justify-start">
        <label
          htmlFor="checkbox-login-form"
          className="inline-flex cursor-pointer items-center gap-2 text-sm text-slate-700"
        >
          <input
            type="checkbox"
            id="checkbox-login-form"
            checked={checkboxInput}
            onChange={() => {
              setCheckboxInput(!checkboxInput);
            }}
            className="h-4 w-4 rounded border-slate-300 text-[#00a292] focus:ring-[#00a292]"
          />
          Restez connecté
        </label>
      </div>

      <div className="flex w-full items-center justify-center">
        <button
          type="submit"
          className="rounded-lg border border-[#00a292] px-8 py-2 text-lg font-semibold text-[#006f64] transition hover:bg-[#00a292] hover:text-white"
        >
          Se connecter
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
