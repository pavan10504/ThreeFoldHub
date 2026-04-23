import { Link } from 'react-router-dom';
import { Menu, X, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-bg-base flex flex-col">
      <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-primary/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 text-xl font-heading font-semibold tracking-tight">
            {!isHome && <ArrowLeft className="w-5 h-5" />}
            ThreeFoldHub<span className="text-accent">.</span>
            <span className="text-xs font-mono text-primary/40 bg-bg-tert px-2 py-0.5 rounded">Tools</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium text-gray-500 hover:text-primary transition-colors">
              All Tools
            </Link>
            <a 
              href="https://threefoldhub.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-500 hover:text-primary transition-colors"
            >
              Main Site →
            </a>
          </nav>

          <button
            className="md:hidden p-2 text-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t border-primary/5 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center text-sm text-primary/40">
          <p>ThreeFoldHub Tools — Professional documents for web design agencies</p>
          <p className="mt-1">© {new Date().getFullYear()} ThreeFoldHub. All rights reserved.</p>
        </div>
      </footer>

      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 bg-surface z-40 md:hidden">
          <div className="flex flex-col p-6 gap-6">
            <Link to="/" className="text-2xl font-heading font-medium text-primary">
              All Tools
            </Link>
            <a 
              href="https://threefoldhub.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-2xl font-heading font-medium text-gray-500"
            >
              Main Site →
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;