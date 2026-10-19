import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminUser {
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  adminUser: AdminUser | null;
  login: (password: string, email?: string) => { success: boolean; error?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'fkf_admin_session';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY) || sessionStorage.getItem(AUTH_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const isAuthenticated = !!adminUser;

  const login = (password: string, email = 'founder@forsterkwartengfoundation.org') => {
    // Single authorized admin password
    const validPasswords = ['fkf2026'];
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      return { success: false, error: 'Please enter your admin email address.' };
    }

    if (!password) {
      return { success: false, error: 'Please enter your password.' };
    }

    if (validPasswords.includes(password.trim())) {
      const isFounder = cleanEmail.startsWith('founder');
      const user: AdminUser = {
        email: cleanEmail,
        name: isFounder ? 'Founder (Mr. Forster Kwarteng)' : 'FKF Administrator',
        role: 'Founder & Super Admin',
      };
      setAdminUser(user);
      try {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      } catch (err) {
        console.error('Failed to save session', err);
      }
      return { success: true };
    }

    return {
      success: false,
      error: 'Invalid password. Please verify your credentials or contact the founder.',
    };
  };

  const logout = () => {
    setAdminUser(null);
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (err) {
      console.error('Failed to clear session', err);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, adminUser, login, logout }}>
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
