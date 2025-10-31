import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import { adminAPI } from '../utils/apiService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  //  Check authentication using cookies
  const checkAuth = async () => {
    try {
      const token = Cookies.get('adminToken');
      const adminData = Cookies.get('adminData');

      if (token && adminData) {
        setAdmin(JSON.parse(adminData));
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  //  Login - save tokens to cookies instead of localStorage
  const login = async (email, password) => {
    try {
      const response = await adminAPI.login(email, password);
      
      if (response.success) {
        const { token, ...adminData } = response.data;

        // Store token & user data securely in cookies
        Cookies.set('adminToken', token, {
          expires: 1,          // 1 day expiry
          secure: true,        // only sent over HTTPS
          sameSite: 'Strict',  // prevent CSRF
        });

        Cookies.set('adminData', JSON.stringify(adminData), {
          expires: 1,
          secure: true,
          sameSite: 'Strict',
        });

        setAdmin(adminData);
        setIsAuthenticated(true);
        return { success: true };
      }

      return { success: false, message: response.message };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed. Please try again.',
      };
    }
  };

  //  Logout - clear cookies
  const logout = () => {
    Cookies.remove('adminToken');
    Cookies.remove('adminData');
    setAdmin(null);
    setIsAuthenticated(false);
  };

  const value = {
    admin,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
