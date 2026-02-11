import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getProfile } from '../api/healthApi';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('firebaseToken'));
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('userProfile');
    return stored ? JSON.parse(stored) : null;
  });
  const [initializing, setInitializing] = useState(Boolean(token));

  useEffect(() => {
    const syncUser = async () => {
      if (!token) {
        setInitializing(false);
        return;
      }
      try {
        const profile = await getProfile();
        setUser(profile);
        localStorage.setItem('userProfile', JSON.stringify(profile));
      } catch {
        setToken(null);
        setUser(null);
        localStorage.removeItem('firebaseToken');
        localStorage.removeItem('userProfile');
      } finally {
        setInitializing(false);
      }
    };

    syncUser();
  }, [token]);

  const loginWithToken = async (firebaseToken) => {
    localStorage.setItem('firebaseToken', firebaseToken);
    setToken(firebaseToken);
    const profile = await getProfile();
    setUser(profile);
    localStorage.setItem('userProfile', JSON.stringify(profile));
    return profile;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('firebaseToken');
    localStorage.removeItem('userProfile');
  };

  const value = useMemo(
    () => ({ token, user, initializing, isAuthenticated: Boolean(token), loginWithToken, logout }),
    [token, user, initializing]
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
