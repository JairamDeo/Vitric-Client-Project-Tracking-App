import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';

const AdminLogin = () => {
  const [emailOrMobile, setEmailOrMobile] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const result = await login(emailOrMobile, password);
      
      if (result.success) {
        // Redirect to dashboard on successful login
        navigate('/');
      } else {
        setError(result.message || 'Invalid email or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        
        {/* Left Side - Company Info */}
        <div className="hidden lg:flex flex-col justify-center space-y-6 animate-fadeIn">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center shadow-lg p-3">
              <img src={logo} alt="Company Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-maroon">Client Project Tracker</h1>
              <p className="text-darkBrown text-sm">Manage. Track. Deliver.</p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-darkBrown">
              Streamline Your Project Management
            </h2>
            <p className="text-darkBrown text-lg leading-relaxed">
              Effortlessly manage clients, track projects, and monitor progress all in one place.
            </p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md mx-auto animate-slideUp">
          <div className="lg:hidden flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-lg p-2 mb-3">
              <img src={logo} alt="Company Logo" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-2xl font-bold text-maroon text-center">Client Project Tracker</h1>
            <p className="text-darkBrown text-sm">Admin Portal</p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-maroon-20">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-darkBrown mb-2">Welcome Back</h2>
              <p className="text-gray-600">Sign in to access your admin dashboard</p>
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-50 border-2 border-red-200 rounded-lg animate-slideUp">
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-darkBrown mb-2">
                  Email or Mobile Number
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-maroon w-5 h-5" />
                  <input
                    type="text"
                    value={emailOrMobile}
                    onChange={(e) => setEmailOrMobile(e.target.value)}
                    placeholder="Enter email or mobile number"
                    required
                    disabled={isLoading}
                    className="w-full pl-12 pr-4 py-3 border-2 border-maroon-20 rounded-lg focus:outline-none focus:border-maroon transition-all duration-300 text-darkBrown placeholder-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-darkBrown mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-maroon w-5 h-5" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    disabled={isLoading}
                    className="w-full pl-12 pr-4 py-3 border-2 border-maroon-20 rounded-lg focus:outline-none focus:border-maroon transition-all duration-300 text-darkBrown placeholder-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-maroon text-cream py-3 rounded-lg font-semibold hover:bg-darkMaroon transition-all duration-300 transform hover:scale-105 shadow-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-cream border-t-transparent rounded-full animate-spin"></div>
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    Sign In
                  </>
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-500">
              Secure admin access. Your credentials are encrypted.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;