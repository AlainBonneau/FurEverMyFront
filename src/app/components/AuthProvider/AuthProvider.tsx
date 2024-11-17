// components/AuthProvider.tsx

'use client';

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/lib/hooks';
import {
  actionSetToken,
  actionSetConnectedUser,
} from '@/src/lib/actions/auth.action';
import { getFromLocalStorage } from '@/src/localstorage/localStorage';
import { addTokenJwtToAxiosInstance } from '@/src/lib/axios/axios';
import { getFromSessionStorage } from '@/src/sessionStorage/sessionStorage';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);

  useEffect(() => {
    if (!token) {
      const storedToken = getFromSessionStorage() || getFromLocalStorage();
      if (storedToken) {
        addTokenJwtToAxiosInstance(storedToken);
        dispatch(actionSetToken(storedToken));

        // Extraire et définir les données utilisateur
        const tokenPayload = JSON.parse(atob(storedToken.split('.')[1]));
        dispatch(actionSetConnectedUser(tokenPayload));
      }
    }
  }, [dispatch, token]);

  return <>{children}</>;
}
