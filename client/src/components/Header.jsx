import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LayoutDashboard, Users, Briefcase, Lock, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout, admin } = useAuth();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Clients', path: '/client', icon: Users },
    { name: 'Projects', path: '/project', icon: Briefcase },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    navigate('/admin-login');
  };

  const handleAdminClick = () => {
    setIsMobileMenuOpen(false);
    navigate('/admin-login');
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const isActive = (path) => {
    // Exact match for paths
    return location.pathname === path;
  };

  const isAdminPageActive = () => {
    return location.pathname === '/admin-login';
  };

  return (
    <header className="bg-cream border-b-2 border-maroon-20 shadow-custom fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <div className="flex items-center">
            <Link to="/">
              <div className="w-[100px] md:w-[220px] h-10 md:h-16 rounded-lg flex items-center justify-center duration-300 p-2">
                <img
                  src="assets/logo.svg"
                  alt="Logo"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<span class="text-maroon font-bold text-xl">LOGO</span>';
                  }}
                />
              </div>
            </Link>
          </div>

          {/* Desktop - Center Title */}
          <div className="hidden md:flex items-center justify-center flex-1 mx-8">
            <Link to="/">
              <h1 className="text-2xl lg:text-3xl font-bold text-maroon tracking-wide">
                Client Project Tracking
              </h1>
            </Link>
          </div>

          {/* Mobile - Center Title - BIGGER FONT */}
          <div className="md:hidden flex-1 flex justify-center px-2">
            <h1 className="text-[14px] font-bold text-maroon tracking-wide text-center leading-tight">
              Client Project Tracking
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-4 lg:px-6 py-2 rounded-lg font-medium text-sm lg:text-base transition-all duration-300 transform hover:scale-105 ${isActive(item.path)
                    ? 'bg-maroon text-cream shadow-md'
                    : 'text-darkBrown hover:bg-lightPink hover:text-maroon'
                  }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Admin/Logout Button - Desktop */}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="px-4 lg:px-6 py-2 rounded-lg font-medium text-sm lg:text-base transition-all duration-300 transform hover:scale-105 text-red-600 hover:bg-red-50 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            ) : (
              <button
                onClick={handleAdminClick}
                className={`px-4 lg:px-6 py-2 rounded-lg font-medium text-sm lg:text-base transition-all duration-300 transform hover:scale-105 flex items-center gap-2  ${isAdminPageActive()
                   ? 'bg-maroon text-cream shadow-md'
                    : 'text-darkBrown hover:bg-lightPink hover:text-maroon'
                  }`}
              >
                Admin
              </button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-lightPink transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-maroon" />
            ) : (
              <Menu className="w-6 h-6 text-maroon" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Sliding Menu */}
      <div
        className={`md:hidden fixed top-16 right-0 h-[calc(100vh-4rem)] w-64 bg-cream shadow-2xl transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } border-l-2 border-maroon-20`}
      >

        {/* Mobile Navigation */}
        <nav className="flex flex-col p-6 space-y-3">
          {navItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={handleNavClick}
                style={{ animationDelay: `${index * 50}ms` }}
                className={`px-6 py-3 rounded-lg font-medium text-base transition-all duration-300 text-left transform hover:scale-105 flex items-center gap-3 ${isMobileMenuOpen ? 'animate-slideUp' : ''
                  } ${isActive(item.path)
                    ? 'bg-maroon text-cream shadow-md'
                    : 'text-darkBrown hover:bg-lightPink hover:text-maroon'
                  }`}
              >
                <IconComponent className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}

          {/* Admin/Logout Button - Mobile */}
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="px-6 py-3 rounded-lg font-medium text-base transition-all duration-300 text-left transform hover:scale-105 flex items-center gap-3 text-red-600 hover:bg-red-50 border-t-2 border-maroon-20 mt-4 pt-6"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          ) : (
            <button
              onClick={handleAdminClick}
              className={`px-6 py-3 rounded-lg font-medium text-base transition-all duration-300 text-left transform hover:scale-105 flex items-center gap-3 ${isAdminPageActive()
                  ? 'bg-maroon text-cream shadow-md'
                  : 'text-darkBrown hover:bg-lightPink hover:text-maroon'
                }`}
            >
              <Lock className="w-5 h-5" />
              Admin Login
            </button>
          )}
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          onClick={toggleMobileMenu}
          className="md:hidden fixed inset-0 bg-darkBrown bg-opacity-20 backdrop-blur-sm z-[-1]"
          style={{ top: '4rem' }}
        />
      )}
    </header>
  );
};

export default Header;