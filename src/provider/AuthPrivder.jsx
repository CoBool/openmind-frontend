import { useState, useEffect, createContext, useContext } from 'react';

const USER_KEY = 'SPRINT_21_4_USER';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem(USER_KEY);
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setIsAuthLoading(false);
  }, []);

  const onLogin = userData => {
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
    setCurrentUser(userData);
  };

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    isAuthLoading,
    onLogin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
