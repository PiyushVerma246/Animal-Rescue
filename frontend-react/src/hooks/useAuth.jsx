import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Load from localStorage on mount
    const storedToken = localStorage.getItem('anicure_token');
    const storedUser = localStorage.getItem('anicure_user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user from local storage", e);
      }
    }
  }, []);

  const login = (newToken, newUser) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('anicure_token', newToken);
    localStorage.setItem('anicure_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('anicure_token');
    localStorage.removeItem('anicure_user');
  };

  const isNGO = () => {
    return user && ['ngo', 'vet', 'shelter', 'admin'].includes(user.role);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isNGO, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
