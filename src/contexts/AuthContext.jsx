import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

// Mock user database in localStorage
const getUsers = () => {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
};

const setUsers = (users) => {
  localStorage.setItem('users', JSON.stringify(users));
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // In a real app, you'd verify the token with a backend.
      // Here, we'll just find the user associated with the token (email).
      const users = getUsers();
      const loggedInUser = users.find(u => u.email === token);
      if (loggedInUser) {
        setUser(loggedInUser);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const users = getUsers();
    const foundUser = users.find(u => u.email === email);

    if (foundUser && foundUser.password === password) {
      // In a real app, the token would be a JWT from the server.
      // Here, we'll use the email as a simple token.
      localStorage.setItem('token', foundUser.email);
      setUser(foundUser);
      return { success: true };
    }

    return {
      success: false,
      error: 'Credenciais inválidas. Verifique seu email e senha.'
    };
  };

  const register = async (name, email, password) => {
    const users = getUsers();
    const existingUser = users.find(u => u.email === email);

    if (existingUser) {
      return { 
        success: false, 
        error: 'Este email já está em uso.'
      };
    }

    const newUser = { name, email, password };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);

    // Automatically log in the user after registration
    localStorage.setItem('token', newUser.email);
    setUser(newUser);

    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};