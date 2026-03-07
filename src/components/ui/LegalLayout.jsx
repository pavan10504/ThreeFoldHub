import { useEffect, useState } from 'react';
import FadeUp from './FadeUp';

const LegalLayout = ({ title, date, sections }) => {
  const [activeSection, setActiveSection] = useState('');

  // Handle scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(s => document.getElementById(s.id));
      
      let currentActive = '';
      for (const el of sectionElements) {
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        // If the top of the section is somewhat near the top of viewport
        if (rect.top <= 150) {
          currentActive = el.id;
        }
      }
      
      if (currentActive) {
        setActiveSection(currentActive);
      } else if (sections.length > 0 && window.scrollY < 100) {
        setActiveSection(sections[0].id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // init
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100; // offset for nav
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-(--color-bg-base) min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-16 relative">
        
        {/* Sidebar Table of Contents */}
        <aside className="lg:w-1/4 shrink-0">
          <div className="sticky top-32 bg-white p-8 rounded-3xl border border-black/5 shadow-sm">
            <h3 className="font-heading font-medium text-lg mb-6">Table of Contents</h3>
            <ul className="flex flex-col gap-3">
              {sections.map(section => (
                <li key={section.id}>
                  <a 
                    href={`#${section.id}`}
                    onClick={(e) => scrollToSection(e, section.id)}
                    className={`block text-sm transition-colors duration-300 ${
                      activeSection === section.id 
                      ? 'text-accent font-medium translate-x-1' 
                      : 'text-gray-500 hover:text-primary hover:translate-x-1'
                    }`}
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <div className="lg:w-3/4 max-w-3xl">
          <FadeUp>
            <h1 className="text-5xl md:text-6xl font-heading font-medium tracking-tight mb-4">
              {title}
            </h1>
            {date && <p className="text-gray-500 font-light mb-16">Last Updated: {date}</p>}
          </FadeUp>

          <div className="flex flex-col gap-12 md:gap-16">
            {sections.map((section) => (
              <FadeUp key={section.id} delay={0.1}>
                <section id={section.id} className="scroll-mt-32">
                  <h2 className="text-2xl md:text-3xl font-heading font-medium mb-6 text-primary">
                    {section.title}
                  </h2>
                  <div className="prose prose-lg prose-gray max-w-none text-gray-600 leading-relaxed marker:text-accent">
                    {section.content}
                  </div>
                </section>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalLayout;
