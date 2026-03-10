import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import CookieBanner from './CookieBanner';

const Layout = ({ children }) => {
  const location = useLocation();
  const isDemoPage = location.pathname.startsWith('/demo/');

  return (
    <div className="flex flex-col min-h-screen relative">
      {!isDemoPage && <Navbar />}
      <main className={`grow ${!isDemoPage ? 'pt-24 pb-12' : ''}`}>
        {children}
      </main>
      {!isDemoPage && <CookieBanner />}
      {!isDemoPage && <Footer />}
    </div>
  );
};

export default Layout;
