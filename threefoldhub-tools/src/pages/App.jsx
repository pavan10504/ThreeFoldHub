import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Layout from '../components/Layout';
import ToolsHome from './ToolsHome';
import OnboardingTool from './tools/OnboardingTool';
import AgreementTool from './tools/AgreementTool';
import AdvancePaymentTool from './tools/AdvancePaymentTool';
import ScopeOfWorkTool from './tools/ScopeOfWorkTool';
import KillFeeTool from './tools/KillFeeTool';
import InvoiceTool from './tools/InvoiceTool';
import FileDeliveryTool from './tools/FileDeliveryTool';

const seoConfig = {
  '/': { title: 'ThreeFoldHub Tools | Agency Document Generator' },
  '/onboarding': { title: 'Client Onboarding | ThreeFoldHub Tools' },
  '/agreement': { title: 'Basic Agreement | ThreeFoldHub Tools' },
  '/advance-payment': { title: 'Advance Payment Policy | ThreeFoldHub Tools' },
  '/scope-of-work': { title: 'Scope of Work | ThreeFoldHub Tools' },
  '/kill-fee': { title: 'Kill Fee Policy | ThreeFoldHub Tools' },
  '/invoice': { title: 'Invoice Template | ThreeFoldHub Tools' },
  '/file-delivery': { title: 'File Delivery Policy | ThreeFoldHub Tools' },
};

function DynamicSEO() {
  const { pathname } = useLocation();

  useEffect(() => {
    const { title } = seoConfig[pathname] || seoConfig['/'];
    document.title = title;

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = "Professional document generators for web design agencies.";
  }, [pathname]);

  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, [pathname]);

  return null;
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
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
          <Route path="/" element={<ToolsHome />} />
          <Route path="/onboarding" element={<OnboardingTool />} />
          <Route path="/agreement" element={<AgreementTool />} />
          <Route path="/advance-payment" element={<AdvancePaymentTool />} />
          <Route path="/scope-of-work" element={<ScopeOfWorkTool />} />
          <Route path="/kill-fee" element={<KillFeeTool />} />
          <Route path="/invoice" element={<InvoiceTool />} />
          <Route path="/file-delivery" element={<FileDeliveryTool />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;