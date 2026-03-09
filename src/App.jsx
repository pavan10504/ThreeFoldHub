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

const seoConfig = {
  '/': { title: 'ThreeFoldHub | Premium Web Design Agency', description: 'ThreeFoldHub is a premium web design agency specializing in modern, high-performance websites.' },
  '/about': { title: 'About Us | ThreeFoldHub', description: 'Learn more about ThreeFoldHub, our mission, and the team behind our premium web design services.' },
  '/works': { title: 'Our Work | ThreeFoldHub', description: 'Explore our portfolio of cutting-edge websites and digital experiences.' },
  '/pricing': { title: 'Pricing | ThreeFoldHub', description: 'Clear and transparent pricing for our premium web design and development packages.' },
  '/contact': { title: 'Contact Us | ThreeFoldHub', description: 'Get in touch with ThreeFoldHub to start your next web design project.' },
  '/privacy': { title: 'Privacy Policy | ThreeFoldHub', description: 'Read our privacy policy and learn how we protect your data.' },
  '/terms': { title: 'Terms of Service | ThreeFoldHub', description: 'Read our terms of service and conditions.' },
  '/demo/gym': { title: 'Gym Demo | ThreeFoldHub', description: 'Experience our high-performance gym website template.' },
  '/demo/cafe': { title: 'Cafe Demo | ThreeFoldHub', description: 'Experience our beautiful cafe & restaurant website template.' },
  '/demo/salon': { title: 'Salon Demo | ThreeFoldHub', description: 'Experience our elegant salon & spa website template.' },
  '/demo/clinic': { title: 'Clinic Demo | ThreeFoldHub', description: 'Experience our professional clinic & healthcare website template.' },
};

function DynamicSEO() {
  const { pathname } = useLocation();

  useEffect(() => {
    const defaultSEO = { title: 'ThreeFoldHub | Premium Web Design', description: 'Expert web design and development services using modern technologies.' };
    const { title, description } = seoConfig[pathname] || defaultSEO;

    document.title = title;

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = description;
  }, [pathname]);

  return null;
}

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
      <DynamicSEO />
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
