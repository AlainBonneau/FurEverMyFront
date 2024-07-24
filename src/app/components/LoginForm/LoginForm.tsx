'use client';
import React, { useEffect, useState } from 'react';
import { Input, Checkbox, Button } from '@nextui-org/react';

import { useAppDispatch, useAppSelector } from '@/src/lib/hooks';

import './LoginForm.scss';
import {
  actionChangeCredential,
  actionRememberMe,
} from '@/src/lib/actions/auth.action';
import { thunkActionLogin } from '@/src/lib/thunks/auth.thunk';
import { redirect } from 'next/navigation';

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
      className="login-form"
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
      <h1 className="login-form-title">Connexion</h1>
      <Input
        isRequired
        labelPlacement="outside"
        placeholder="Email"
        label="Email"
        type="text"
        className="input-field"
        id="email-login-form"
        name="email"
        aria-label="Email"
        value={emailInput}
        onChange={(e) => {
          setEmailInput(e.target.value);
        }}
      />
      <Input
        isRequired
        labelPlacement="outside"
        placeholder="Mot de passe"
        label="Mot de passe"
        type="password"
        className="input-field"
        id="password-login-form"
        name="password"
        aria-label="Password"
        value={passwordInput}
        onChange={(e) => {
          setPasswordInput(e.target.value);
        }}
      />

      <div className="login-options">
        <div className="form-group-checkbox">
          <Checkbox
            type="checkbox"
            className="checkbox-input"
            id="checkbox-login-form"
            checked={checkboxInput}
            onChange={() => {
              setCheckboxInput(!checkboxInput);
            }}
          />
          <label htmlFor="checkbox-login-form" className="checkbox-label">
            Restez connecté
          </label>
        </div>
        {/* <Link href="/forgottenPassword" className="password-link-login-form">
          Mot de passe oublié?
        </Link> */}
      </div>
      <div className="button-login">
        <Button
          type="submit"
          variant="ghost"
          color="primary"
          size="lg"
          className="login-button"
        >
          Se connecter
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;
