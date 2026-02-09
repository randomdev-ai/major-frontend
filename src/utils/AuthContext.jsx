import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { clearSession, getSession, setSession } from './auth.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [session, setSessionState] = useState(() => getSession());

  useEffect(() => {
    if (session) {
      setSession(session);
    }
  }, [session]);

  const login = (payload) => {
    const sessionPayload = {
      user: payload,
      loggedInAt: new Date().toISOString(),
    };
    setSessionState(sessionPayload);
    setSession(sessionPayload);
  };

  const logout = () => {
    clearSession();
    setSessionState(null);
  };

  const value = useMemo(
    () => ({
      session,
      isAuthenticated: Boolean(session),
      login,
      logout,
    }),
    [session]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
