import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LayoutDashboard, Users, Briefcase, Lock } from 'lucide-react';
import logo from '../assets/logo.svg';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Clients', path: '/client', icon: Users },
    { name: 'Projects', path: '/project', icon: Briefcase },
    { name: 'Admin', path: '/admin-login', icon: Lock }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = () => {
    setIsMobileMenuOpen(false); // Close menu on mobile after clicking
  };

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Check if the current path matches the nav item path
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-cream border-b-2 border-maroon-20 shadow-custom fixed top-0 left-0 right-0 z-50 py-8 sm:py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo - Left Side with 150px width */}
          <div className="flex items-center">
            <div className="w-[150px] h-12 md:h-14 bg-white rounded-lg flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-300 p-2">
              <img src={logo} alt="Logo" className="w-full h-full object-contain" />
            </div>
          </div>

          {/* Desktop - Center Title */}
          <div className="hidden md:flex items-center justify-center flex-1 mx-8">
            <h1 className="text-2xl lg:text-3xl font-bold text-maroon tracking-wide">
              Client Project Tracking
            </h1>
          </div>

          {/* Mobile - Center Title (Full Name) */}
          <div className="md:hidden flex-1 flex justify-center px-2">
            <h1 className="text-xs font-bold text-maroon tracking-wide text-center leading-tight">
              Client Project Tracking
            </h1>
          </div>

          {/* Desktop Navigation - Right Side */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-4 lg:px-6 py-2 rounded-lg font-medium text-sm lg:text-base transition-all duration-300 transform hover:scale-105 ${
                  isActive(item.path)
                    ? 'bg-maroon text-cream shadow-md'
                    : 'text-darkBrown hover:bg-lightPink hover:text-maroon'
                }`}
              >
                {item.name}
              </Link>
            ))}
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
        className={`md:hidden fixed top-16 right-0 h-[calc(100vh-4rem)] w-64 bg-cream shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } border-l-2 border-maroon-20`}
      >
        {/* Mobile Navigation with Icons (No Logo/Title) */}
        <nav className="flex flex-col p-6 space-y-3">
          {navItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={handleNavClick}
                style={{ animationDelay: `${index * 50}ms` }}
                className={`px-6 py-3 rounded-lg font-medium text-base transition-all duration-300 text-left transform hover:scale-105 flex items-center gap-3 ${
                  isMobileMenuOpen ? 'animate-slideUp' : ''
                } ${
                  isActive(item.path)
                    ? 'bg-maroon text-cream shadow-md'
                    : 'text-darkBrown hover:bg-lightPink hover:text-maroon'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
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