import FadeUp from '../../components/ui/FadeUp';
import Button from '../../components/ui/Button';
import { Scissors, Sparkles, HeartHandshake, Check } from 'lucide-react';

const SalonDemo = () => {
  return (
    <div className="w-full bg-stone-50 text-stone-900 min-h-screen">
      {/* Navigation */}
      <nav className="p-6 md:p-8 max-w-7xl mx-auto flex justify-between items-center text-stone-600 bg-stone-50/90 backdrop-blur-md sticky top-0 z-50">
        <div className="text-2xl font-serif tracking-widest uppercase font-light text-stone-800">
          Luxe<span className="font-medium text-amber-700/80">Glow</span>
        </div>
        <div className="hidden md:flex gap-10 text-xs tracking-[0.2em] uppercase font-medium">
          <a href="#services" className="hover:text-amber-700 transition-colors">Services</a>
          <a href="#gallery" className="hover:text-amber-700 transition-colors">Gallery</a>
          <a href="#stylists" className="hover:text-amber-700 transition-colors">Stylists</a>
        </div>
        <Button className="bg-stone-900 text-stone-50 hover:bg-stone-800 rounded-none px-8 py-3 text-xs tracking-widest uppercase font-light">
          Book Appt
        </Button>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center pt-20">
        <div className="max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row items-center gap-16">
           <div className="md:w-1/2 relative z-10 w-full">
              <FadeUp>
                 <div className="inline-flex items-center gap-2 text-amber-700/80 uppercase tracking-widest text-xs font-semibold mb-6">
                   <Sparkles className="w-4 h-4" /> Premium Beauty Studio
                 </div>
                 <h1 className="text-5xl md:text-7xl font-sans font-light tracking-tight mb-8 leading-[1.05] text-stone-900">
                   Refined elegance.<br/>Effortless <span className="text-amber-700/60 italic font-serif">beauty.</span>
                 </h1>
                 <p className="text-lg md:text-xl text-stone-500 font-light max-w-lg leading-relaxed mb-10">
                   A modern sanctuary for high-end haircare, advanced skincare, and bespoke styling in the heart of the city.
                 </p>
                 <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <Button className="bg-stone-900 text-stone-50 hover:bg-stone-800 rounded-none px-8 py-4 font-light tracking-widest uppercase text-sm">
                      Book Appointment
                    </Button>
                    <Button 
                      variant="secondary"
                      className="bg-surface/90 backdrop-blur border border-stone-200 text-stone-900 hover:bg-surface rounded-none px-8 py-4 tracking-widest uppercase text-sm font-medium shadow-sm"
                    >
                      View Services
                    </Button>
                 </div>
              </FadeUp>
           </div>
           <div className="md:w-1/2 w-full h-[600px] relative">
              <FadeUp delay={0.2} className="w-full h-full">
                 <div className="absolute inset-0 bg-amber-100/20 rounded-4xl transform translate-y-6 -translate-x-6 z-0" />
                 <img 
                    src="https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                    alt="Elegant hair salon interior"
                    className="w-full h-full object-cover rounded-4xl relative z-10 shadow-2xl shadow-stone-200/50"
                 />
              </FadeUp>
           </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-surface border-y border-stone-200/50">
        <div className="max-w-7xl mx-auto px-6">
           <FadeUp className="text-center mb-16">
              <h2 className="text-4xl font-serif tracking-tight text-stone-900 mb-4">Our Services</h2>
              <p className="text-stone-500 font-light text-lg">Indulge in our tailored selection of premium treatments.</p>
           </FadeUp>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "Hair Styling", desc: "Precision cuts and bespoke styling tailored to your face shape and lifestyle.", price: "from $65", img: "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
                { title: "Coloring", desc: "Expert balayage, highlights, and full color transformations.", price: "from $120", img: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
                { title: "Facial Treatments", desc: "Rejuvenating custom facials using premium organic skincare.", price: "from $95", img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
                { title: "Bridal Makeup", desc: "Flawless, long-lasting wedding makeup for your special day.", price: "from $150", img: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }
              ].map((service, idx) => (
                 <FadeUp key={idx} delay={idx * 0.1}>
                    <div className="group cursor-pointer">
                       <div className="h-64 mb-6 overflow-hidden relative">
                          <img src={service.img} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" />
                       </div>
                       <div className="flex justify-between items-baseline mb-3">
                          <h3 className="text-2xl font-serif text-stone-800">{service.title}</h3>
                          <span className="text-stone-500 text-sm font-medium">{service.price}</span>
                       </div>
                       <p className="text-stone-600 font-light leading-relaxed mb-4">{service.desc}</p>
                       <div className="w-8 h-px bg-stone-300 group-hover:w-full transition-all duration-500" />
                    </div>
                 </FadeUp>
              ))}
           </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 bg-stone-100">
         <div className="max-w-7xl mx-auto px-6">
            <FadeUp className="mb-12">
               <h2 className="text-4xl font-serif tracking-tight text-stone-900 mb-2">Our Aesthetic</h2>
               <p className="text-stone-500 font-light">A glimpse into our luxurious space and transformations.</p>
            </FadeUp>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {[
                  "https://images.unsplash.com/photo-1522337660859-02fbefca4702?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                  "https://images.unsplash.com/photo-1595475884562-073c30d45670?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                  "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                  
                ].map((img, idx) => (
                   <FadeUp key={idx} delay={idx * 0.1} className="h-full w-full">
                       <div className="aspect-square overflow-hidden group rounded-sm shadow-stone-200 shadow-xl border border-stone-200">
                           <img src={img} alt="Gallery image" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                       </div>
                   </FadeUp>
               ))}
            </div>
         </div>
      </section>

      {/* Stylists */}
      <section id="stylists" className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6 text-center">
           <FadeUp className="mb-16">
              <h2 className="text-4xl font-serif tracking-tight text-stone-900 mb-4">Meet The Artists</h2>
              <div className="w-12 h-px bg-stone-300 mx-auto"></div>
           </FadeUp>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
              {[
                { name: "Elena Rossi", role: "Master Colorist", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
                { name: "Julian Pierce", role: "Senior Stylist", img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
                { name: "Mia Chen", role: "Skincare Specialist", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }
              ].map((stylist, idx) => (
                 <FadeUp key={idx} delay={idx * 0.1}>
                    <div className="group text-center">
                       <div className="aspect-4/5 overflow-hidden mb-6 rounded-t-full rounded-b-xl border border-stone-200">
                          <img src={stylist.img} alt={stylist.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                       </div>
                       <h3 className="text-xl font-serif text-stone-800 mb-1">{stylist.name}</h3>
                       <div className="text-amber-700/80 uppercase tracking-widest text-xs">{stylist.role}</div>
                    </div>
                 </FadeUp>
              ))}
           </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-24 bg-stone-900 border-t border-stone-800">
        <div className="max-w-4xl mx-auto px-6">
           <FadeUp className="bg-stone-50 p-10 md:p-16 rounded-sm text-center relative overflow-hidden">
              <div className="relative z-10">
                 <h2 className="text-3xl font-serif tracking-tight text-stone-900 mb-2">Reserve Your Time</h2>
                 <p className="text-stone-500 font-light mb-10">Secure your appointment instantly.</p>
                 
                 <form className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left" onSubmit={e => e.preventDefault()}>
                    <div>
                       <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Name</label>
                       <input type="text" className="w-full bg-stone-100 border-none p-4 rounded-sm outline-none focus:ring-1 focus:ring-amber-700/50" placeholder="Jane Doe" />
                    </div>
                    <div>
                       <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Phone</label>
                       <input type="tel" className="w-full bg-stone-100 border-none p-4 rounded-sm outline-none focus:ring-1 focus:ring-amber-700/50" placeholder="(555) 123-4567" />
                    </div>
                    <div>
                       <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Service</label>
                       <select className="w-full bg-stone-100 border-none p-4 rounded-sm outline-none focus:ring-1 focus:ring-amber-700/50 text-stone-700">
                          <option>Hair Styling</option>
                          <option>Coloring</option>
                          <option>Facial</option>
                          <option>Bridal</option>
                       </select>
                    </div>
                    <div>
                       <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Date</label>
                       <input type="date" className="w-full bg-stone-100 border-none p-4 rounded-sm outline-none focus:ring-1 focus:ring-amber-700/50 text-stone-700" />
                    </div>
                    <div className="md:col-span-2 pt-4">
                       <Button className="w-full bg-stone-900 hover:bg-stone-800 text-stone-50 py-5 rounded-none tracking-widest uppercase text-sm font-light">
                          Confirm Reservation
                       </Button>
                    </div>
                 </form>
              </div>
           </FadeUp>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-950 text-stone-400 py-12 text-center border-t border-stone-800">
        <div className="text-xs font-light tracking-widest uppercase px-6">
          &copy; {new Date().getFullYear()} LuxeGlow Salon. All rights reserved. Demo Project by ThreeFoldHub.
        </div>
      </footer>
    </div>
  );
};

export default SalonDemo;
