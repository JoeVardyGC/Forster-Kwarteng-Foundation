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
  changePassword: (
    currentPassword: string,
    newPassword: string
  ) => { success: boolean; error?: string };
  resetPasswordToDefault: () => { success: boolean };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'fkf_admin_session';
const AUTH_PASSWORD_KEY = 'fkf_admin_custom_pwd';
const DEFAULT_PASSWORD = 'fkf2026';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    try {
      const stored =
        localStorage.getItem(AUTH_STORAGE_KEY) || sessionStorage.getItem(AUTH_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [activePassword, setActivePassword] = useState<string>(() => {
    try {
      return localStorage.getItem(AUTH_PASSWORD_KEY) || DEFAULT_PASSWORD;
    } catch {
      return DEFAULT_PASSWORD;
    }
  });

  const isAuthenticated = !!adminUser;

  const login = (password: string, email = 'founder@forsterkwartengfoundation.org') => {
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      return { success: false, error: 'Please enter your admin email address.' };
    }

    if (!password) {
      return { success: false, error: 'Please enter your password.' };
    }

    if (password.trim() === activePassword.trim()) {
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

  const changePassword = (currentPassword: string, newPassword: string) => {
    if (!currentPassword) {
      return { success: false, error: 'Please enter your current password.' };
    }
    if (currentPassword.trim() !== activePassword.trim()) {
      return { success: false, error: 'Current password does not match. Please verify and try again.' };
    }
    if (!newPassword || newPassword.trim().length < 6) {
      return { success: false, error: 'New password must be at least 6 characters long.' };
    }
    if (newPassword.trim() === currentPassword.trim()) {
      return { success: false, error: 'New password cannot be the same as your current password.' };
    }

    const updated = newPassword.trim();
    setActivePassword(updated);
    try {
      localStorage.setItem(AUTH_PASSWORD_KEY, updated);
    } catch (err) {
      console.error('Failed to save updated password', err);
    }
    return { success: true };
  };

  const resetPasswordToDefault = () => {
    setActivePassword(DEFAULT_PASSWORD);
    try {
      localStorage.removeItem(AUTH_PASSWORD_KEY);
    } catch (err) {
      console.error('Failed to reset password', err);
    }
    return { success: true };
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
    <AuthContext.Provider
      value={{
        isAuthenticated,
        adminUser,
        login,
        logout,
        changePassword,
        resetPasswordToDefault,
      }}
    >
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
