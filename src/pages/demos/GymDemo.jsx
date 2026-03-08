import FadeUp from '../../components/ui/FadeUp';
import Button from '../../components/ui/Button';
import { Dumbbell, HeartPulse, Flame, Timer, MapPin, Phone, Mail, CheckCircle2 } from 'lucide-react';

const GymDemo = () => {
  return (
    <div className="w-full bg-zinc-950 text-surface min-h-screen font-sans">
      {/* Navigation */}
      <nav className="p-6 border-b border-white/5 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-heading font-black tracking-tighter uppercase flex items-center gap-2">
            <span className="text-red-500">
              <Dumbbell className="w-8 h-8" />
            </span>
            IronPulse <span className="text-red-500">Fitness.</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-bold uppercase text-zinc-400 tracking-wider">
            <a href="#classes" className="hover:text-surface transition-colors">Classes</a>
            <a href="#trainers" className="hover:text-surface transition-colors">Trainers</a>
            <a href="#plans" className="hover:text-surface transition-colors">Plans</a>
            <a href="#contact" className="hover:text-surface transition-colors">Contact</a>
          </div>
          <Button className="bg-red-600 text-surface hover:bg-red-700 uppercase font-black tracking-wider text-xs hidden md:inline-flex">
            Join Now
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-linear-to-r from-stone-900 to-stone-950">
        {/* Background Image Setup */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Gym background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-zinc-950 via-zinc-950/90 to-zinc-950/40" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <FadeUp>
             <h1 className="text-5xl md:text-[7rem] font-heading font-black uppercase leading-[0.9] tracking-tighter text-surface mb-6">
               Train Hard.<br/><span className="text-transparent bg-clip-text bg-linear-to-tr from-red-600 to-orange-500">Get Strong.</span>
             </h1>
             <p className="text-lg md:text-2xl text-zinc-400 max-w-2xl font-medium mb-12 border-l-4 border-red-600 pl-6">
               State-of-the-art gym with world-class trainers and modern equipment. Build the best version of yourself today.
             </p>
             <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Button className="bg-red-600 text-surface hover:bg-red-700 py-6 px-10 text-lg uppercase font-black">
                  Join Now
                </Button>
                <Button className="bg-transparent border border-white text-surface hover:bg-surface hover:text-primary py-6 px-10 text-lg uppercase font-black">
                  View Classes
                </Button>
             </div>
          </FadeUp>
        </div>
      </section>

      {/* Classes Section */}
      <section id="classes" className="py-24 bg-zinc-900 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
           <FadeUp>
              <div className="text-red-500 font-bold tracking-widest uppercase mb-2">Our Programs</div>
              <h2 className="text-4xl md:text-5xl font-heading font-black uppercase mb-16">Premium Classes</h2>
           </FadeUp>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Strength", desc: "Build muscle mass with heavy compound lifts.", icon: Dumbbell },
                { title: "HIIT", desc: "High intensity intervals for maximum fat burn.", icon: Flame },
                { title: "Crossfit", desc: "Functional fitness to prepare you for anything.", icon: Timer },
                { title: "Cardio", desc: "Improve endurance and cardiovascular health.", icon: HeartPulse }
              ].map((cls, idx) => (
                 <FadeUp key={idx} delay={idx * 0.1}>
                    <div className="bg-zinc-950 p-8 border border-white/5 hover:border-red-600/50 hover:-translate-y-2 transition-all duration-300 group rounded-xl">
                       <cls.icon className="w-12 h-12 text-zinc-600 group-hover:text-red-500 mb-6 transition-colors" />
                       <h3 className="text-2xl font-black uppercase mb-3">{cls.title}</h3>
                       <p className="text-zinc-400 text-sm leading-relaxed">{cls.desc}</p>
                    </div>
                 </FadeUp>
              ))}
           </div>
        </div>
      </section>

      {/* Trainers Section */}
      <section id="trainers" className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
           <FadeUp className="text-center mb-16">
              <div className="text-red-500 font-bold tracking-widest uppercase mb-2">The Experts</div>
              <h2 className="text-4xl md:text-5xl font-heading font-black uppercase">World Class Trainers</h2>
           </FadeUp>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Alex Carter", role: "Strength Coach", img: "https://images.unsplash.com/photo-1581009137042-c552e485697a?ixlib=rb-4.1.0&&auto=format&fit=crop&w=800&q=80" },
                { name: "Emma Brooks", role: "HIIT Trainer", img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
                { name: "Alex Carter", role: "Functional Fitness", img: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }
              ].map((trainer, idx) => (
                 <FadeUp key={idx} delay={idx * 0.1}>
                    <div className="group overflow-hidden rounded-xl bg-zinc-900">
                       <div className="h-80 overflow-hidden relative">
                          <img 
                            src={trainer.img} 
                            alt={trainer.name} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 blur-0 grayscale group-hover:grayscale-0"
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-stone-950 via-stone-950/20 to-transparent flex flex-col justify-end p-8 translate-y-8 group-hover:translate-y-0 transition-transform duration-500" />
                       </div>
                       <div className="p-6 relative z-10 -mt-10 bg-zinc-900/90 backdrop-blur border-t border-white/5 mx-4 mb-4 rounded-lg">
                          <h3 className="text-xl font-black uppercase">{trainer.name}</h3>
                          <div className="text-red-500 text-sm font-bold tracking-widest uppercase">{trainer.role}</div>
                       </div>
                    </div>
                 </FadeUp>
              ))}
           </div>
        </div>
      </section>

      {/* Membership Plans */}
      <section id="plans" className="py-24 bg-zinc-900 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-zinc-800 via-zinc-900 to-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
           <FadeUp className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-heading font-black uppercase">Membership Plans</h2>
           </FadeUp>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { name: "Basic", price: "$49", features: ["Access to main gym floor", "Locker room access", "1 free personal training session"] },
                { name: "Pro", price: "$79", features: ["Everything in Basic", "Unlimited group classes", "Sauna & Spa access"], highlight: true },
                { name: "Elite", price: "$129", features: ["Everything in Pro", "Unlimited personal training", "Guest passes", "Nutrition planning"] }
              ].map((plan, idx) => (
                 <FadeUp key={idx} delay={idx * 0.1}>
                    <div className={`p-8 rounded-2xl border flex flex-col h-full ${
                      plan.highlight 
                      ? 'bg-red-600 border-red-500 scale-105 shadow-[0_0_40px_rgba(220,38,38,0.3)] z-10' 
                      : 'bg-zinc-950 border-white/10'
                    }`}>
                       <h3 className="text-2xl font-black uppercase mb-2">{plan.name}</h3>
                       <div className="flex items-end gap-1 mb-8">
                          <span className="text-5xl font-black">{plan.price}</span>
                          <span className={plan.highlight ? 'text-surface/80' : 'text-zinc-500'}>/mo</span>
                       </div>
                       <ul className="space-y-4 mb-10 grow">
                          {plan.features.map((feat, i) => (
                            <li key={i} className="flex items-center gap-3 text-stone-400 font-medium">
                               <CheckCircle2 className={`w-5 h-5 ${plan.highlight ? 'text-surface' : 'text-red-500'}`} />
                               {feat}
                            </li>
                          ))}
                       </ul>
                       <button className={`w-full py-4 rounded-full font-black uppercase tracking-wider transition-all duration-300 ${plan.highlight ? 'bg-surface text-red-600 hover:bg-zinc-100 shadow-[0_0_20px_rgba(255,255,255,0.3)]' : 'bg-zinc-800 text-surface hover:bg-zinc-700'}`}>
                          Select Plan
                       </button>
                    </div>
                 </FadeUp>
              ))}
           </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
           <FadeUp className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-heading font-black uppercase">Member Success</h2>
           </FadeUp>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { text: "Best gym I've ever been to. The equipment is top-tier and the trainers actually care about your progress.", author: "Mike T." },
                { text: "Lost 20lbs in 3 months doing the HIIT classes. The atmosphere pushes you to go harder.", author: "Sarah W." },
                { text: "The community here is unmatched. It's more than just a place to workout, it's a lifestyle.", author: "James L." }
              ].map((review, idx) => (
                 <FadeUp key={idx} delay={idx * 0.1}>
                    <div className="bg-zinc-900 border border-white/5 p-8 rounded-xl h-full">
                       <div className="flex gap-1 text-red-500 mb-6">
                         {[1,2,3,4,5].map(star => <span key={star}>★</span>)}
                       </div>
                       <p className="text-zinc-300 italic mb-6">"{review.text}"</p>
                       <div className="font-bold uppercase tracking-widest text-sm">— {review.author}</div>
                    </div>
                 </FadeUp>
              ))}
           </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-zinc-900 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16">
           <FadeUp>
              <h2 className="text-4xl font-heading font-black uppercase mb-8">Get In Touch</h2>
              <div className="space-y-6 mb-12">
                 <div className="flex items-start gap-4">
                    <MapPin className="text-red-500 w-6 h-6 mt-1" />
                    <div>
                       <div className="font-bold uppercase tracking-wider mb-1">Location</div>
                       <div className="text-zinc-400">123 Iron Forge Blvd<br/>Fitness City, FC 90210</div>
                    </div>
                 </div>
                 <div className="flex items-start gap-4">
                    <Phone className="text-red-500 w-6 h-6 mt-1" />
                    <div>
                       <div className="font-bold uppercase tracking-wider mb-1">Phone</div>
                       <div className="text-zinc-400">(555) 123-4567</div>
                    </div>
                 </div>
                 <div className="flex items-start gap-4">
                    <Mail className="text-red-500 w-6 h-6 mt-1" />
                    <div>
                       <div className="font-bold uppercase tracking-wider mb-1">Email</div>
                       <div className="text-zinc-400">join@ironpulse.com</div>
                    </div>
                 </div>
              </div>
           </FadeUp>

           <FadeUp delay={0.2}>
              <form className="bg-zinc-950 p-8 rounded-xl border border-white/5" onSubmit={e => e.preventDefault()}>
                 <div className="mb-6">
                    <input type="text" placeholder="YOUR NAME" className="w-full bg-zinc-900 border border-white/10 rounded tracking-widest uppercase text-sm p-4 text-surface focus:outline-none focus:border-red-500 transition-colors" />
                 </div>
                 <div className="mb-6">
                    <input type="email" placeholder="YOUR EMAIL" className="w-full bg-zinc-900 border border-white/10 rounded tracking-widest uppercase text-sm p-4 text-surface focus:outline-none focus:border-red-500 transition-colors" />
                 </div>
                 <div className="mb-6">
                    <textarea placeholder="MESSAGE" rows="4" className="w-full bg-zinc-900 border border-white/10 rounded tracking-widest uppercase text-sm p-4 text-surface focus:outline-none focus:border-red-500 transition-colors resize-none"></textarea>
                 </div>
                 <Button className="w-full bg-red-600 hover:bg-red-700 uppercase font-black tracking-widest py-4">
                    Send Message
                 </Button>
              </form>
           </FadeUp>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-zinc-950 text-center py-8 border-t border-white/10">
        <div className="text-zinc-600 text-sm font-bold tracking-widest uppercase">
          &copy; {new Date().getFullYear()} IronPulse Fitness. Demo Project by ThreeFoldHub.
        </div>
      </footer>
    </div>
  );
};

export default GymDemo;
