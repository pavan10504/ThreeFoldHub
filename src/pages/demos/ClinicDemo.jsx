import FadeUp from '../../components/ui/FadeUp';
import Button from '../../components/ui/Button';
import { Sparkles, ArrowRight, Phone, MapPin } from 'lucide-react';

const ClinicDemo = () => {
  return (
    <div className="w-full bg-[#f8f7f4] text-[#2c3e45] min-h-screen">
      {/* Navigation */}
      <nav className="p-6 md:p-8 max-w-7xl mx-auto flex justify-between items-center text-[#2c3e45] bg-[#f8f7f4]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="text-2xl font-serif tracking-widest text-[#1a2b32]">
          AURA
        </div>
        <div className="hidden md:flex gap-10 text-xs tracking-[0.2em] uppercase font-medium text-[#4a646c]">
          <a href="#approach" className="hover:text-[#1a2b32] transition-colors">Approach</a>
          <a href="#services" className="hover:text-[#1a2b32] transition-colors">Services</a>
          <a href="#physicians" className="hover:text-[#1a2b32] transition-colors">Physicians</a>
        </div>
        <Button className="bg-[#1a2b32] text-surface hover:bg-[#2c3e45] rounded-none px-8 py-3 text-xs tracking-widest uppercase font-light">
          Consultation
        </Button>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
           <div className="relative z-10 w-full flex flex-col justify-center">
              <FadeUp>
                 <div className="inline-flex items-center gap-2 text-[#4a646c] uppercase tracking-widest text-xs font-semibold mb-8">
                   <Sparkles className="w-3 h-3" /> Private Healing Sanctuary
                 </div>
                 <h1 className="text-6xl md:text-[5.5rem] font-serif font-light tracking-tight mb-8 leading-[1.05] text-[#1a2b32] text-balance">
                   The Art of<br/><span className="italic text-[#6b8b96]">Modern</span> Healing.
                 </h1>
                 <p className="text-lg md:text-xl text-[#4a646c] font-light max-w-lg leading-relaxed mb-12 border-l border-[#b5c7cd] pl-6">
                   Experience a new standard of personalized, luxury medical care in a tranquil environment designed for your holistic well-being.
                 </p>
                 <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <Button className="bg-[#1a2b32] text-surface hover:bg-[#2c3e45] rounded-none px-8 py-4 font-light tracking-widest uppercase text-sm">
                      Book Appointment
                    </Button>
                    <button className="bg-transparent border border-[#d6e0e3] text-[#1a2b32] hover:bg-[#eaf0f2] transition-colors rounded-none px-8 py-4 tracking-widest uppercase text-sm font-medium">
                      Our Clinic
                    </button>
                 </div>
              </FadeUp>
           </div>
           
           <div className="relative w-full h-[600px] md:h-[700px] flex items-center justify-center">
              <FadeUp delay={0.2} className="relative w-full h-full">
                 <div className="absolute inset-0 bg-[#eaf0f2] rounded-t-full transform translate-x-12 -translate-y-8 z-0"></div>
                 <img 
                    src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                    alt="Abstract Luxury Clinic Architecture" 
                    className="w-full h-full object-cover rounded-t-full relative z-10 shadow-2xl shadow-[#1a2b32]/20"
                 />
                 <div className="absolute bottom-10 -left-10 bg-surface p-8 shadow-xl z-20 max-w-xs border border-[#eaf0f2]">
                    <div className="text-2xl font-serif text-[#1a2b32] mb-2">Holistic Care</div>
                    <p className="text-[#4a646c] font-light text-sm">Integrating advanced medicine with profound tranquility.</p>
                 </div>
              </FadeUp>
           </div>
        </div>
      </section>

      {/* Our Distinctive Approach */}
      <section id="approach" className="py-32 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
           <FadeUp className="mb-20 text-center max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-serif text-[#1a2b32] mb-6">Our Distinctive Approach</h2>
              <p className="text-[#4a646c] font-light text-lg">We seamlessly blend cutting-edge medical technology with holistic, patient-centered care in an environment that prioritizes your comfort.</p>
           </FadeUp>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { title: "Bespoke Treatments", desc: "Tailored medical plans designed uniquely for your physical and emotional needs, ensuring optimal outcomes." },
                { title: "Renowned Specialists", desc: "Our physicians are global leaders in their respective fields, offering world-class expertise and compassionate care." },
                { title: "Holistic Environment", desc: "A sanctuary designed to promote tranquility, privacy, and optimal healing away from the clinical feel of traditional hospitals." }
              ].map((item, idx) => (
                 <FadeUp key={idx} delay={idx * 0.1}>
                    <div className="p-10 border border-[#eaf0f2] bg-[#fbfdfd] hover:bg-[#eaf0f2] transition-colors duration-500 h-full group">
                       <h3 className="text-2xl font-serif text-[#1a2b32] mb-4">{item.title}</h3>
                       <p className="text-[#4a646c] font-light leading-relaxed">{item.desc}</p>
                       <div className="w-10 h-px bg-[#1a2b32] mt-8 opacity-20 group-hover:w-full transition-all duration-700"></div>
                    </div>
                 </FadeUp>
              ))}
           </div>
        </div>
      </section>

      {/* Elevated Services */}
      <section id="services" className="py-32 bg-[#1a2b32] text-[#f8f7f4]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-16 items-center">
           <div className="md:w-1/2">
              <FadeUp>
                 <img 
                    src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                    alt="Aesthetic medical tools" 
                    className="w-full aspect-4/5 object-cover rounded-sm grayscale opacity-90 hover:grayscale-0 transition-all duration-700"
                 />
              </FadeUp>
           </div>
           <div className="md:w-1/2">
              <FadeUp delay={0.2}>
                 <h2 className="text-4xl md:text-6xl font-serif font-light mb-12">Elevated Services</h2>
                 <div className="flex flex-col gap-8 border-t border-[#4a646c] pt-8">
                    {["Aesthetic Medicine", "Preventative Health", "Wellness & Longevity", "Concierge Medicine"].map((service, idx) => (
                       <div key={idx} className="flex justify-between items-center group cursor-pointer pb-8 border-b border-[#324951]">
                          <span className="text-2xl md:text-3xl font-serif text-[#b5c7cd] group-hover:text-surface transition-colors">{service}</span>
                          <ArrowRight className="text-[#4a646c] group-hover:text-surface group-hover:translate-x-2 transition-all" />
                       </div>
                    ))}
                 </div>
                 <Button className="mt-12 bg-transparent border border-[#4a646c] text-[#f8f7f4] hover:bg-surface hover:text-[#1a2b32] rounded-none px-8 py-4 tracking-widest uppercase text-xs font-medium transition-all">
                    View All Services
                 </Button>
              </FadeUp>
           </div>
        </div>
      </section>

      {/* Booking Form Overlay Style */}
      <section className="py-32 bg-[#eaf0f2]">
        <div className="max-w-5xl mx-auto px-6">
           <FadeUp className="bg-surface p-12 md:p-20 shadow-2xl shadow-[#1a2b32]/5 rounded-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#f8f7f4] rounded-bl-full z-0"></div>
              
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                 <div>
                    <h2 className="text-4xl font-serif text-[#1a2b32] mb-6">Schedule a Consultation</h2>
                    <p className="text-[#4a646c] font-light max-w-sm mb-12">
                       Begin your journey to optimal health and aesthetics. Our concierge team will reach out to confirm your timing.
                    </p>
                    <div className="flex flex-col gap-6 text-sm tracking-widest uppercase text-[#4a646c] font-medium">
                       <div className="flex items-center gap-4"><Phone className="w-4 h-4" /> +1 (800) 123-AURA</div>
                       <div className="flex items-center gap-4"><MapPin className="w-4 h-4" /> 100 Wellness Avenue, NY</div>
                    </div>
                 </div>
                 
                 <form className="flex flex-col gap-6" onSubmit={e => e.preventDefault()}>
                    <input type="text" placeholder="Full Name" className="w-full bg-transparent border-b border-[#b5c7cd] p-4 text-[#1a2b32] placeholder:text-[#4a646c]/50 focus:outline-none focus:border-[#1a2b32] transition-colors" />
                    <input type="email" placeholder="Email Address" className="w-full bg-transparent border-b border-[#b5c7cd] p-4 text-[#1a2b32] placeholder:text-[#4a646c]/50 focus:outline-none focus:border-[#1a2b32] transition-colors" />
                    <select className="w-full bg-transparent border-b border-[#b5c7cd] p-4 text-[#1a2b32] placeholder:text-[#4a646c]/50 focus:outline-none focus:border-[#1a2b32] transition-colors appearance-none">
                       <option value="" disabled selected>Select Area of Interest</option>
                       <option>Aesthetic Medicine</option>
                       <option>Preventative Health</option>
                       <option>Concierge Medicine</option>
                    </select>
                    <Button className="mt-6 bg-[#1a2b32] hover:bg-[#2c3e45] text-surface py-5 rounded-none tracking-widest uppercase text-xs">
                       Submit Request
                    </Button>
                 </form>
              </div>
           </FadeUp>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a2b32] text-center py-16 border-t border-[#324951]">
        <div className="text-2xl font-serif tracking-widest text-[#f8f7f4] mb-8">
          AURA
        </div>
        <div className="text-[#6b8b96] text-xs font-light tracking-widest uppercase px-6">
          &copy; {new Date().getFullYear()} Aura Medical Clinic. All rights reserved. Demo Project by ThreeFoldHub.
        </div>
      </footer>
    </div>
  );
};

export default ClinicDemo;

