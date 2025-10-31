// src/components/RedirectIfAuthenticated.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RedirectIfAuthenticated = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null; // or show a loader while checking

  return isAuthenticated ? <Navigate to="/" replace /> : children;
};

export default RedirectIfAuthenticated;
