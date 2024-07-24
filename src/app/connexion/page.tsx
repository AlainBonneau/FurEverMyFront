'use client';

import { useEffect } from 'react';

import { useAppDispatch } from '@/src/lib/hooks';

import LoginForm from '../components/LoginForm/LoginForm';

import './page.scss';

function LoginModalPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {}, []);

  return (
    <div className="LoginPage">
      <h1 className="main-title">
        Rejoignez la communauté <br />
        <span className="main-title-span">FurEverHome</span>
      </h1>
      <LoginForm />
    </div>
  );
}

export default LoginModalPage;
