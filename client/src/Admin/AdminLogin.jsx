import React, { useState } from 'react';
import { Mail, Lock, LogIn } from 'lucide-react';
import logo from '../assets/logo.png';

const AdminLogin = () => {
  const [emailOrMobile, setEmailOrMobile] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login
    setTimeout(() => {
      console.log('Login with:', { emailOrMobile, password });
      alert('Login functionality - To be implemented');
      setIsLoading(false);
    }, 1000);
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
    alert('Google Login - To be implemented');
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        
        {/* Left Side - Company Info */}
        <div className="hidden lg:flex flex-col justify-center space-y-6 animate-fadeIn">
          {/* Logo */}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center shadow-lg p-3">
              <img src={logo} alt="Company Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-maroon">Client Project Tracker</h1>
              <p className="text-darkBrown text-sm">Manage. Track. Deliver.</p>
            </div>
          </div>

          {/* Company Description */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-darkBrown">
              Streamline Your Project Management
            </h2>
            <p className="text-darkBrown text-lg leading-relaxed">
              Effortlessly manage clients, track projects, and monitor progress all in one place. 
              Our platform helps you stay organized and deliver exceptional results.
            </p>
            
            {/* Features */}
            <div className="space-y-3 mt-6">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-maroon rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-darkBrown">Real-time Project Tracking</h3>
                  <p className="text-sm text-gray-600">Monitor project progress and deadlines instantly</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-maroon rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-darkBrown">Client Management</h3>
                  <p className="text-sm text-gray-600">Organize and maintain client relationships</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-maroon rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-darkBrown">Collaborative Workspace</h3>
                  <p className="text-sm text-gray-600">Work together seamlessly with your team</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md mx-auto animate-slideUp">
          {/* Mobile Logo */}
          <div className="lg:hidden flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-lg p-2 mb-3">
              <img src={logo} alt="Company Logo" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-2xl font-bold text-maroon text-center">Client Project Tracker</h1>
            <p className="text-darkBrown text-sm">Admin Portal</p>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-maroon-20">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-darkBrown mb-2">Welcome Back</h2>
              <p className="text-gray-600">Sign in to access your admin dashboard</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email or Mobile Input */}
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
                    className="w-full pl-12 pr-4 py-3 border-2 border-maroon-20 rounded-lg focus:outline-none focus:border-maroon transition-all duration-300 text-darkBrown placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Password Input */}
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
                    className="w-full pl-12 pr-4 py-3 border-2 border-maroon-20 rounded-lg focus:outline-none focus:border-maroon transition-all duration-300 text-darkBrown placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm text-maroon hover:text-darkMaroon font-medium transition-colors duration-200"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-maroon text-cream py-3 rounded-lg font-semibold hover:bg-darkMaroon transition-all duration-300 transform hover:scale-105 shadow-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-maroon-20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              {/* Google Login Button */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full bg-white border-2 border-maroon-20 text-darkBrown py-3 rounded-lg font-semibold hover:bg-lightPink transition-all duration-300 transform hover:scale-105 shadow-md flex items-center justify-center gap-3"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign in with Google
              </button>
            </form>

            {/* Footer Note */}
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