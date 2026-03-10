import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  const isDemoPage = location.pathname.startsWith('/demo/');

  useEffect(() => {
    if (isDemoPage) {
      document.documentElement.classList.remove('dark');
    } else {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }
  }, [isDarkMode, isDemoPage]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileMenuOpen(false);
   
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Works', path: '/works' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-4 bg-surface/80 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.03)] border-b border-primary/5'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="relative z-50 text-2xl font-heading font-semibold tracking-tight">
          ThreeFoldHub<span className="text-(--color-accent)">.</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-medium tracking-wide transition-colors relative group ${
                location.pathname === link.path ? 'text-primary' : 'text-gray-500 hover:text-primary'
              }`}
            >
              {link.name}
              <span
                className={`absolute -bottom-1 left-0 w-full h-[1.5px] bg-primary origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100 ${
                  location.pathname === link.path ? 'scale-x-100' : ''
                }`}
              />
            </Link>
          ))}
          {!isDemoPage && (
            <button 
              onClick={toggleTheme} 
              className="text-gray-500 hover:text-primary transition-colors hover-lift ml-2"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          )}
          <Link
            to="/contact"
            className="ml-4 px-6 py-2.5 bg-primary text-surface text-sm font-medium rounded-full hover:bg-primary/90 transition-colors hover-lift"
          >
            Get a Website
          </Link>
        </nav>

        {/* Mobile Nav Toggle & Theme */}
        <div className="md:hidden flex items-center gap-4 relative z-50">
          {!isDemoPage && (
            <button 
              onClick={toggleTheme} 
              className="text-gray-500 hover:text-primary transition-colors"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          )}
          <button
            className="p-2 -mr-2 text-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute top-full left-0 w-full bg-surface border-b border-primary/5 shadow-2xl md:hidden overflow-hidden"
          >
            <div className="flex flex-col px-6 py-6 pb-8 gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-2xl font-heading font-medium ${
                    location.pathname === link.path ? 'text-primary' : 'text-gray-500'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 mt-2 border-t border-primary/5">
                <Link
                  to="/contact"
                  className="inline-flex w-full justify-center px-6 py-4 bg-primary text-surface text-base font-medium rounded-full"
                >
                  Get a Website
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
