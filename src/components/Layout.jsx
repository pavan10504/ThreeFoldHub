import Navbar from './Navbar';
import Footer from './Footer';
import CookieBanner from './CookieBanner';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen relative">
      <Navbar />
      <main className="grow pt-24 pb-12">
        {children}
      </main>
      <CookieBanner />
      <Footer />
    </div>
  );
};

export default Layout;
