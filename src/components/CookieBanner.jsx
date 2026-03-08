import { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Delay showing the banner slightly for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-10 z-100 max-w-sm bg-surface text-primary border border-primary/10 shadow-2xl rounded-2xl overflow-hidden"
        >
          <div className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <Cookie className="text-accent w-5 h-5" />
                <h3 className="font-heading font-semibold text-lg">We use cookies</h3>
              </div>
              <button onClick={declineCookies} className="text-gray-400 hover:text-primary transition-colors">
                <X size={18} />
              </button>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed mb-5">
              ThreeFoldHub uses basic cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.
            </p>
            <div className="flex items-center gap-3">
              <button 
                onClick={declineCookies}
                className="flex-1 px-4 py-2 border border-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/5 transition-colors"
              >
                Decline
              </button>
              <button 
                onClick={acceptCookies}
                className="flex-1 px-4 py-2 bg-primary text-surface rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
