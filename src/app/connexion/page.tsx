'use client';

import LoginForm from '../components/LoginForm/LoginForm';

function LoginModalPage() {
  return (
    <div className="flex w-full flex-col items-center justify-center px-4 py-10">
      <h1 className="w-full max-w-3xl px-4 text-center text-2xl font-light sm:text-3xl">
        Rejoignez la communauté
        <br />
        <span className="text-3xl font-bold sm:text-4xl">FurEverHome</span>
      </h1>
      <div className="mt-8 flex w-full justify-center">
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginModalPage;
