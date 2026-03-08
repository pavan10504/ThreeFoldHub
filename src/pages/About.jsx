import FadeUp from '../components/ui/FadeUp';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="w-full">
      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <FadeUp>
          <h1 className="text-5xl md:text-7xl font-heading font-medium tracking-tight mb-8">
            About Us
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 font-light max-w-3xl leading-relaxed">
            We are a small, dedicated team passionate about bringing high-end web design to local businesses.
          </p>
        </FadeUp>
      </section>

      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <h2 className="text-3xl md:text-4xl font-heading font-medium mb-6">Our Mission</h2>
              <p className="text-gray-500 text-lg leading-relaxed">
                ThreeFoldHub helps small businesses establish a strong online presence through thoughtful design and modern web development. We believe that a beautiful, functional website shouldn't just be for massive tech companies.
              </p>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="aspect-square bg-gray-100 rounded-[3rem] relative overflow-hidden flex items-center justify-center p-12">
                 <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-full h-full border border-primary/10 rounded-full flex items-center justify-center relative"
                 >
                    <div className="w-2/3 h-2/3 border border-primary/10 rounded-full absolute" />
                    <div className="w-1/3 h-1/3 border border-primary/10 rounded-full absolute" />
                    <div className="w-6 h-6 bg-accent rounded-full absolute top-[10%]" />
                 </motion.div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <h2 className="text-3xl md:text-5xl font-heading font-medium tracking-tight mb-16 text-center">
              Why Small Businesses Choose Us
            </h2>
          </FadeUp>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              "Modern, clean design",
              "Fast loading websites",
              "Mobile optimized",
              "Affordable pricing",
              "Built for real businesses",
              "Premium handcrafted feel"
            ].map((reason, idx) => (
              <FadeUp key={idx} delay={idx * 0.1}>
                <div className="p-8 bg-surface border border-primary/5 rounded-2xl hover-lift">
                  <div className="w-10 h-10 bg-black/5 flex items-center justify-center rounded-xl mb-6 text-primary font-medium">
                    0{idx + 1}
                  </div>
                  <h3 className="text-xl font-heading font-medium">{reason}</h3>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-primary text-surface rounded-[3rem] mx-4 md:mx-12 my-12 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <FadeUp>
             <h2 className="text-4xl md:text-6xl font-heading font-medium tracking-tight mb-10 leading-tight">
               "We believe even small businesses deserve beautiful, high quality websites that build trust and convert customers."
             </h2>
             <div className="w-12 h-1 bg-accent mx-auto" />
          </FadeUp>
        </div>
      </section>
    </div>
  );
};

export default About;
