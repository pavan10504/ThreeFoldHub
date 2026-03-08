import { Link } from 'react-router-dom';
import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: "How long does a website take?",
      a: "Typically 1 to 2 weeks depending on the complexity of the project."
    },
    {
      q: "Do you provide domains?",
      a: "Yes, we can help you secure the right domain and reliable hosting."
    },
    {
      q: "What is your pricing structure?",
      a: "We offer clear, one-time tier pricing based on your project scope."
    },
    {
      q: "Can you redesign an old site?",
      a: "Absolutely! We specialize in modernizing outdated legacy websites."
    }
  ];

  const handleToggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <footer className="bg-surface border-t border-primary/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-3xl font-heading font-semibold tracking-tight mb-6 block">
              ThreeFoldHub<span className="text-(--color-accent)">.</span>
            </Link>
            <p className="text-gray-500 max-w-sm mb-8 text-balance leading-relaxed">
              We design premium, handcrafted websites for small businesses and local shops that want to stand out online.
            </p>
            <div className="flex flex-col gap-2 text-sm font-medium">
              <a href="mailto:hubthreefold@gmail.com" className="text-primary hover:text-accent transition-colors">
                hubthreefold@gmail.com
              </a>
              <a href="tel:+919980157156" className="text-primary hover:text-accent transition-colors">
                +91 99801 57156
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-heading font-medium text-lg mb-6">Quick Links</h4>
            <ul className="flex flex-col gap-4 text-sm text-gray-500">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/works" className="hover:text-primary transition-colors">Works</Link></li>
              <li><Link to="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-medium text-lg mb-6">FAQs</h4>
            <div className="flex flex-col gap-3">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-primary/5 last:border-0 pb-2 border-dashed">
                  <button 
                    onClick={() => handleToggleFaq(index)}
                    className="flex justify-between items-center w-full text-left text-sm text-gray-600 hover:text-primary transition-colors"
                  >
                    <span className="pr-2">{faq.q}</span>
                    <motion.div
                      animate={{ rotate: openFaq === index ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-primary/5 text-xs text-gray-400">
          <p>&copy; {currentYear} ThreeFoldHub. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
