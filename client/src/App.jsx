import './App.css'
import React, { Suspense, lazy, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { AuthProvider } from './context/AuthContext';

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);  // Scroll to top when the route changes
  }, [location]);
  return null;
}

const Header = lazy(() => import('./components/Header'));
const Footer = lazy(() => import('./components/Footer'));

const Dashboard = lazy(() => import('./Pages/Dashboard'));
const Clients = lazy(() => import('./Pages/Clients'));
const Projects = lazy(() => import('./Pages/Projects'));
const AdminLogin = lazy(() => import('./Admin/AdminLogin'));

function App() {

  return (
    <AuthProvider>
      <Router>
        <div >
          <ScrollToTop /> {/* Scroll to top on route change */}
          <Header />
          <Suspense fallback={<div className="text-center p-4"></div>}>
            <Routes>
              <Route exact path='/' element={<Dashboard />} />
              <Route exact path='/client' element={<Clients />} />
              <Route exact path='/project' element={<Projects />} />
              <Route exact path='/admin-login' element={<AdminLogin />} />
            </Routes>
            
          </Suspense>
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  )
}

export default App