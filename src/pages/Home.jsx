import { useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Monitor, Smartphone, Zap } from 'lucide-react';
import FadeUp from '../components/ui/FadeUp';
import Button from '../components/ui/Button';

const Home = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const mockupY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  
  const services = [
    {
      title: "Business Websites",
      desc: "Clean, modern websites tailored to your local business needs and goals.",
      icon: <Monitor className="w-8 h-8 text-primary group-hover:text-accent transition-colors" />
    },
    {
      title: "Website Redesign",
      desc: "Modernize your outdated website with a fresh, professional look and feel.",
      icon: <Smartphone className="w-8 h-8 text-primary group-hover:text-accent transition-colors" />
    },
    {
      title: "Landing Pages",
      desc: "High-converting pages designed specifically for your marketing promotions.",
      icon: <Zap className="w-8 h-8 text-primary group-hover:text-accent transition-colors" />
    }
  ];

  const process = [
    {
      num: "01",
      title: "Discovery",
      desc: "We dive deep into your business goals, target audience, and unique value proposition."
    },
    {
      num: "02",
      title: "Design",
      desc: "Crafting a bespoke visual identity and layout that resonates with your brand."
    },
    {
      num: "03",
      title: "Development",
      desc: "Building a lightning-fast, responsive website using modern web technologies."
    },
    {
      num: "04",
      title: "Launch",
      desc: "Deploying your site with precision and ensuring everything is optimized for success."
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Subtle Background Elements with Parallax */}
        <motion.div style={{ y: bgY }} className="absolute inset-0 z-0">
          <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px]" />
          <div className="absolute bottom-[10%] left-[5%] w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px]" />
        </motion.div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10 pt-28 pb-20 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 max-w-2xl">
            <FadeUp>
              <h1 className="text-6xl md:text-8xl font-heading font-semibold tracking-tight leading-[1.05] text-balance mb-8">
                Websites That Help Local Businesses <span className="text-gray-400 italic font-medium relative inline-block">Grow.
                <motion.span 
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
                  className="absolute bottom-1 left-0 h-[4px] bg-accent"
                /></span>
              </h1>
            </FadeUp>
            
            <FadeUp delay={0.2}>
              <p className="text-xl md:text-2xl text-primary/60 font-light max-w-2xl leading-relaxed mb-12 text-balance">
                Your business deserves a digital experience as premium as the services you offer. We build stunning, high-performance websites that capture attention and drive real growth.
              </p>
            </FadeUp>

            <FadeUp delay={0.4} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button to="/works">View Our Work</Button>
              <Button to="/contact" variant="secondary">Get a Website</Button>
            </FadeUp>
          </div>

          <div className="hidden md:flex md:w-1/2 justify-center relative">
            <FadeUp delay={0.3} className="relative w-full max-w-lg aspect-square flex items-center justify-center">
              {/* Premium Layered UI Mockup with Parallax scrolling */}
              <motion.div style={{ y: mockupY, perspective: '1200px' }} className="relative w-full h-[85%] mx-auto">
                {/* 1. Main Browser Window */}
                <motion.div 
                  initial={{ opacity: 0, rotateY: 15, rotateX: 5, z: -100 }}
                  animate={{ opacity: 1, rotateY: 0, rotateX: 0, z: 0 }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                  className="absolute inset-0 right-12 bottom-12 bg-surface rounded-3xl overflow-hidden border border-primary/5 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] flex flex-col"
                >
                  {/* Browser Header / Frame */}
                  <div className="h-12 bg-[#f8f7f4] border-b border-primary/5 flex items-center px-4 gap-2 shrink-0">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                    <div className="ml-4 grow mr-12 h-5 bg-surface rounded-md border border-primary/5 flex items-center px-3">
                        <div className="w-2/3 h-1.5 bg-gray-100 rounded-full" />
                    </div>
                  </div>
                  
                  {/* Browser Content */}
                  <div className="p-8 flex flex-col gap-6 h-full bg-surface relative overflow-hidden">
                    {/* Background Grid Accent */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none" />
                    
                    <div className="w-24 h-4 bg-accent/20 rounded-full relative z-10" />
                    <div className="w-[80%] h-14 bg-primary rounded-xl relative z-10" />
                    <div className="w-[60%] h-4 bg-gray-100 rounded-full relative z-10" />
                    
                    <div className="flex gap-4 mt-2 relative z-10">
                      <div className="w-28 h-10 bg-accent rounded-full" />
                      <div className="w-28 h-10 bg-[#f8f7f4] rounded-full border border-primary/5 shadow-sm" />
                    </div>

                    <div className="mt-auto grid grid-cols-2 gap-4 relative z-10">
                      <div className="h-28 bg-[#f8f7f4] rounded-2xl border border-primary/5 shadow-sm" />
                      <div className="h-28 bg-[#f8f7f4] rounded-2xl border border-primary/5 shadow-sm" />
                    </div>
                  </div>
                </motion.div>

                {/* 2. Floating Card: Performance/Stats */}
                <motion.div
                  initial={{ opacity: 0, x: -50, y: 30 }}
                  animate={{ opacity: 1, x: -20, y: [40, 30, 40] }}
                  transition={{ 
                    opacity: { duration: 0.8, delay: 0.5 },
                    x: { duration: 0.8, delay: 0.5, ease: "easeOut" },
                    y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 } 
                  }}
                  className="absolute bottom-16 left-0 bg-surface p-4 rounded-2xl shadow-xl border border-primary/5 flex items-center gap-4 z-20 w-56"
                >
                  <div className="w-12 h-12 rounded-full bg-accent text-surface flex items-center justify-center shrink-0 shadow-md">
                    <Zap className="w-6 h-6 fill-white stroke-transparent" />
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <div className="w-3/4 h-2.5 bg-gray-200 rounded-full" />
                    <div className="w-1/2 h-2.5 bg-gray-100 rounded-full" />
                  </div>
                </motion.div>

                {/* 3. Floating Graphic: Premium Image/Component */}
                <motion.div
                  initial={{ opacity: 0, y: -40, x: 20 }}
                  animate={{ opacity: 1, y: [-20, -10, -20], x: 40 }}
                  transition={{ 
                    opacity: { duration: 0.8, delay: 0.7 },
                    x: { duration: 0.8, delay: 0.7, ease: "easeOut" },
                    y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.7 } 
                  }}
                  className="absolute top-10 right-0 bg-primary p-4 rounded-2xl shadow-2xl shadow-primary/20 border border-[#222] z-30 w-36 aspect-square flex flex-col justify-between"
                >
                  <div className="flex justify-between items-start">
                    <div className="w-8 h-8 rounded-full bg-surface/10 flex items-center justify-center">
                      <Monitor className="w-4 h-4 text-surface/50" />
                    </div>
                    <div className="flex gap-1.5 mt-1 relative z-10">
                      <div className="w-1.5 h-1.5 rounded-full bg-surface/20" />
                      <div className="w-1.5 h-1.5 rounded-full bg-surface/20" />
                    </div>
                  </div>
                  <div className="space-y-2 mt-auto">
                    <div className="w-full h-2 bg-surface/10 rounded-full" />
                    <div className="w-2/3 h-2 bg-surface/10 rounded-full" />
                  </div>
                  
                  {/* Checked Badge overlaps bottom-left */}
                  <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-surface rounded-xl shadow-xl border border-primary/5 flex items-center justify-center">
                    <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center shadow-inner">
                      <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3 text-surface">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
                
                {/* 4. Small decorative element */}
                 <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1, y: [0, 10, 0] }}
                  transition={{ 
                    opacity: { duration: 0.5, delay: 1 },
                    scale: { duration: 0.5, type: "spring", delay: 1 },
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 } 
                  }}
                  className="absolute top-[40%] -right-2 w-14 h-14 bg-surface rounded-full shadow-xl border border-primary/5 flex items-center justify-center z-10"
                >
                    <Smartphone className="w-6 h-6 text-accent" />
                </motion.div>
                
              </motion.div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-32 bg-surface relative">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <h2 className="text-4xl md:text-5xl font-heading font-medium tracking-tight mb-16">
              What We Offer
            </h2>
          </FadeUp>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <FadeUp key={idx} delay={idx * 0.1}>
                <div className="group p-10 h-full rounded-4xl bg-bg-base border border-primary/5 hover:border-primary/10 hover-lift relative overflow-hidden transition-colors">
                  <div className="bg-surface w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500 ease-out">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-heading font-medium mb-4">{service.title}</h3>
                  <p className="text-primary/60 leading-relaxed group-hover:text-primary/80 transition-colors">{service.desc}</p>
                  
                  {/* Subtle animated background shape */}
                  <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-black/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors duration-500" />
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16 md:gap-24">
            <div className="md:w-1/3">
              <div className="sticky top-32">
                <FadeUp>
                  <h2 className="text-4xl md:text-5xl font-heading font-medium tracking-tight mb-6">
                    How We Work
                  </h2>
                  <p className="text-primary/60 text-lg leading-relaxed text-balance">
                    A streamlined, transparent process designed to get your business online quickly and beautifully.
                  </p>
                </FadeUp>
              </div>
            </div>
            
            <div className="md:w-2/3 flex flex-col gap-12">
              {process.map((step, idx) => (
                <FadeUp key={idx} delay={idx * 0.1}>
                  <div className="flex gap-8 group">
                    <div className="text-2xl font-mono text-gray-300 font-medium group-hover:text-accent transition-colors pt-1">
                      {step.num}
                    </div>
                    <div className="pb-12 border-b border-primary/10 group-hover:border-primary/20 transition-colors grow">
                      <h3 className="text-3xl font-heading font-medium mb-4 tracking-tight group-hover:translate-x-2 transition-transform duration-500 ease-out">
                        {step.title}
                      </h3>
                      <p className="text-primary/60 text-lg max-w-xl leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Ready CTA */}
      <section className="py-32 bg-primary text-surface rounded-[3rem] mx-4 md:mx-12 my-12 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[500px] bg-accent/20 blur-[150px] rounded-full pointer-events-none" />
        </div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <FadeUp>
            <h2 className="text-5xl md:text-7xl font-heading font-medium tracking-tight mb-8">
              Ready to elevate your business?
            </h2>
            <p className="text-xl text-surface/70 font-light mb-12">
              Let's create a digital experience that converts visitors into loyal customers.
            </p>
            <Button to="/contact" variant="secondary" className="border-none mt-4 hover:shadow-2xl">
              Start Your Project <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </FadeUp>
        </div>
      </section>
    </div>
  );
};

export default Home;
