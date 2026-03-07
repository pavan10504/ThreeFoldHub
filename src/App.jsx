import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

// Components
import Layout from './components/Layout';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Works from './pages/Works';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

// Demos
import GymDemo from './pages/demos/GymDemo';
import CafeDemo from './pages/demos/CafeDemo';
import SalonDemo from './pages/demos/SalonDemo';
import ClinicDemo from './pages/demos/ClinicDemo';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/works" element={<Works />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          
          {/* Demo Routes */}
          <Route path="/demo/gym" element={<GymDemo />} />
          <Route path="/demo/cafe" element={<CafeDemo />} />
          <Route path="/demo/salon" element={<SalonDemo />} />
          <Route path="/demo/clinic" element={<ClinicDemo />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
