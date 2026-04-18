'use client';

import React, { useEffect } from 'react';

import { useAppDispatch } from '@/src/lib/hooks';
import { thunkActionRestoreSession } from '@/src/lib/thunks/auth.thunk';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(thunkActionRestoreSession());
  }, [dispatch]);

  return children;
}
