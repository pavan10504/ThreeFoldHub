import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-black/5 pt-20 pb-10">
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
            <ul className="flex flex-col gap-4 text-sm text-gray-500">
              <li><Link to="/contact" className="hover:text-primary transition-colors leading-relaxed block">How long does a website take to build?</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors leading-relaxed block">Do you provide domains?</Link></li>
              <li><Link to="/pricing" className="hover:text-primary transition-colors leading-relaxed block">What is your pricing structure?</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors leading-relaxed block">Can you redesign an old site?</Link></li>
            </ul>
          </div>

        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-black/5 text-xs text-gray-400">
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
