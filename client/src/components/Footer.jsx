import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    quickLinks: [
      { name: 'Dashboard', path: '/' },
      { name: 'Clients', path: '/client' },
      { name: 'Projects', path: '/project' },
      { name: 'Admin Login', path: '/admin-login' },
    ],
    contact: [
      { icon: Mail, text: 'jairamdeo2002@gmail.com', href: 'mailto:jairamdeo2002@gmail.com' },
      { icon: Phone, text: '+91 8830973046', href: 'tel:+91 8830973046' },
      { icon: MapPin, text: 'Nagpur, India', href: '#' },
    ],
    social: [
      { icon: Github, href: 'https://github.com/JairamDeo/Vitric-Client-Project-Tracking-App', label: 'GitHub' },
      { icon: Linkedin, href: 'https://www.linkedin.com/in/jairamdeo/', label: 'LinkedIn' },
      { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    ],
  };

  return (
    <footer className="bg-gradient-to-r from-maroon to-darkMaroon text-cream mt-auto">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div data-aos="fade-up" data-aos-duration="800">
            <h3 className="text-2xl font-bold mb-4">Vitric</h3>
            <p className="text-cream/80 text-sm mb-4">
              Professional client and project tracking solution. Manage your projects efficiently and keep your clients happy.
            </p>
            <div className="flex gap-3 mt-4">
              {footerLinks.social.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 bg-cream/10 rounded-lg flex items-center justify-center hover:bg-cream/20 transition-all duration-300 transform hover:scale-110"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="100">
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-cream/80 text-sm hover:text-cream transition-colors duration-300 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-cream/50 rounded-full"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
            <h4 className="text-lg font-bold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              {footerLinks.contact.map((contact, index) => (
                <li key={index}>
                  <a
                    href={contact.href}
                    className="text-cream/80 text-sm hover:text-cream transition-colors duration-300 flex items-center gap-3"
                  >
                    <contact.icon className="w-4 h-4 flex-shrink-0" />
                    <span>{contact.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="300">
            <h4 className="text-lg font-bold mb-4">Stay Updated</h4>
            <p className="text-cream/80 text-sm mb-4">
              Subscribe to our newsletter for updates and tips.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 rounded-lg bg-cream/10 border border-cream/20 text-cream placeholder-cream/50 focus:outline-none focus:border-cream/40 transition-colors duration-300"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-cream text-maroon rounded-lg font-semibold hover:bg-cream/90 transition-all duration-300 transform hover:scale-105"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-cream/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-cream/80 text-sm text-center md:text-left">
              © {currentYear} Vitric. All rights reserved.
            </p>

            {/* Made with Love */}
            <p className="text-cream/80 text-sm flex items-center gap-2">
              Made with <Heart className="w-4 h-4 text-red-400 fill-current animate-pulse" /> by Vitric Team
            </p>

            {/* Legal Links */}
            <div className="flex gap-4">
              <a
                href="#"
                className="text-cream/80 text-sm hover:text-cream transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <span className="text-cream/40">|</span>
              <a
                href="#"
                className="text-cream/80 text-sm hover:text-cream transition-colors duration-300"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;