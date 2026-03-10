import FadeUp from '../../components/ui/FadeUp';
import Button from '../../components/ui/Button';
import { Coffee, MapPin, Clock } from 'lucide-react';

const CafeDemo = () => {
   return (
      <div className="w-full bg-[#FAFAF8] text-[#3E2723] min-h-screen font-sans">
         {/* Navigation */}
         <nav className="p-6 border-b border-[#D7CCC8] bg-[#FAFAF8]/90 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
               <div className="text-2xl font-serif italic tracking-widest text-[#5D4037] flex items-center gap-2">
                  <Coffee className="w-6 h-6" />
                  Velvet Brew
               </div>
               <div className="hidden md:flex gap-10 text-xs tracking-[0.2em] uppercase font-medium text-[#795548]">
                  <a href="#menu" className="hover:text-[#3E2723] transition-colors">Menu</a>
                  <a href="#about" className="hover:text-[#3E2723] transition-colors">About</a>
                  <a href="#locations" className="hover:text-[#3E2723] transition-colors">Location</a>
               </div>
               <Button className="bg-[#5D4037] hover:bg-[#3E2723] text-[#EFEBE9] uppercase tracking-widest text-xs px-6 py-2.5 rounded-none border border-[#5D4037]">
                  Order Online
               </Button>
            </div>
         </nav>

         {/* Hero */}
         <section className="relative min-h-[85vh] flex items-center">
            <div className="absolute inset-0 z-0">
               <img
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                  alt="Cafe interior"
                  className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-linear-to-t from-[#FAFAF8] via-[#FAFAF8]/80 to-[#FAFAF8]/40 z-10" />
            </div>

            <div className="max-w-6xl mx-auto px-6 relative z-10 w-full pt-20">
               <FadeUp className="max-w-2xl">
                  <div className="w-20 h-20 border border-[#8D6E63] rounded-t-full mb-8 flex items-center justify-center p-3">
                     <div className="w-full h-full bg-[#D7CCC8] rounded-t-full rounded-b-sm opacity-50" />
                  </div>
                  <h1 className="text-5xl md:text-7xl tracking-tighter mb-6 font-serif text-[#3E2723] leading-tight text-balance">
                     Crafted Coffee.<br /><span className="italic text-[#8D6E63] font-light">Cozy Moments.</span>
                  </h1>
                  <p className="text-lg md:text-xl text-[#5D4037] font-light leading-relaxed mb-10 text-balance border-l border-[#8D6E63] pl-6">
                     A neighborhood café serving artisan coffee, single-origin roasts, and freshly baked pastries in a warm, welcoming atmosphere.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                     <Button className="bg-[#3E2723] hover:bg-[#1f1311] text-[#EFEBE9] px-8 py-4 rounded-none border border-[#3E2723] transition-all">
                        View Menu
                     </Button>
                     <Button
                        variant="secondary"
                        className="bg-[#FAFAF8] hover:bg-[#EFEBE9] text-[#3E2723] px-8 py-4 rounded-none border border-[#D7CCC8] transition-all"
                     >
                        Visit Us
                     </Button>
                  </div>
               </FadeUp>
            </div>
         </section>

         {/* Featured Menu */}
         <section id="menu" className="py-24 bg-[#FAFAF8]">
            <div className="max-w-6xl mx-auto px-6">
               <FadeUp className="text-center mb-16">
                  <h2 className="text-4xl text-[#3E2723] font-serif italic mb-4">Our Favorites</h2>
                  <div className="w-16 h-px bg-[#D7CCC8] mx-auto"></div>
               </FadeUp>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                     { name: "Espresso", desc: "Rich, full-bodied single origin shot.", price: "$3.50", img: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
                     { name: "Caramel Latte", desc: "Espresso with steamed milk and house caramel.", price: "$5.00", img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
                     { name: "Blueberry Muffin", desc: "Freshly baked daily with wild blueberries.", price: "$4.00", img: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
                     { name: "Cappuccino", desc: "Classic proportion of espresso, milk, and foam.", price: "$4.50", img: "https://images.unsplash.com/photo-1534778101976-62847782c213?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
                     { name: "Almond Croissant", desc: "Flaky pastry filled with almond frangipane.", price: "$4.75", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
                     { name: "Pour Over", desc: "Hand-brewed filter coffee, rotating beans.", price: "$5.50", img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" }
                  ].map((item, idx) => (
                     <FadeUp key={idx} delay={idx * 0.1}>
                        <div className="bg-surface border border-[#EFEBE9] p-4 flex gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                           <img src={item.img} alt={item.name} className="w-24 h-24 object-cover" />
                           <div className="flex flex-col grow justify-center">
                              <div className="flex justify-between items-baseline mb-1">
                                 <h3 className="font-serif text-lg">{item.name}</h3>
                                 <span className="text-[#8D6E63] font-medium">{item.price}</span>
                              </div>
                              <div className="h-px w-full bg-stone-300 mx-4 opacity-50 relative top-3" />
                              <p className="text-sm text-[#795548] font-light leading-snug">{item.desc}</p>
                           </div>
                        </div>
                     </FadeUp>
                  ))}
               </div>
            </div>
         </section>

         {/* About Section */}
         <section id="about" className="py-24 bg-[#EFEBE9]">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
               <FadeUp>
                  <img
                     src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                     alt="Barista brewing coffee"
                     className="w-full h-[500px] object-cover shadow-2xl"
                  />
               </FadeUp>
               <FadeUp delay={0.2}>
                  <h2 className="text-4xl text-[#3E2723] font-serif italic mb-6">Our Story</h2>
                  <p className="text-[#5D4037] text-lg leading-relaxed font-light mb-6">
                     Velvet Brew Café was created to bring people together through the love of coffee. What started as a small roastery has grown into a community cornerstone.
                  </p>
                  <p className="text-[#5D4037] text-lg leading-relaxed font-light mb-8">
                     We ethically source our beans from sustainable farms and meticulously roast them to highlight their unique flavor profiles. Every cup is crafted with intention and care.
                  </p>
                  <div className="text-4xl text-[#3E2723] opacity-60 mt-4" style={{ fontFamily: "'Dancing Script', 'Brush Script MT', cursive" }}>Velvet Brew</div>
               </FadeUp>
            </div>
         </section>

         {/* Reviews */}
         <section className="py-24 bg-[#FAFAF8]">
            <div className="max-w-6xl mx-auto px-6">
               <FadeUp className="text-center mb-16">
                  <h2 className="text-3xl text-[#3E2723] font-serif italic">What locals say</h2>
               </FadeUp>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                     { text: "Absolute best coffee in town. The atmosphere is so cozy and the almond croissants are to die for.", author: "Jessica M." },
                     { text: "My favorite spot to read and relax. The baristas really know their craft and are always so welcoming.", author: "David P." },
                     { text: "A hidden gem. The pour-over selection rotates often and it's always an incredible experience.", author: "Sophie T." }
                  ].map((review, idx) => (
                     <FadeUp key={idx} delay={idx * 0.1}>
                        <div className="text-center px-6">
                           <p className="text-[#5D4037] font-serif italic text-lg leading-relaxed mb-4">"{review.text}"</p>
                           <p className="text-[#8D6E63] text-sm uppercase tracking-widest">— {review.author}</p>
                        </div>
                     </FadeUp>
                  ))}
               </div>
            </div>
         </section>

         {/* Location */}
         <section id="locations" className="py-24 bg-[#3E2723] text-[#EFEBE9]">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 text-center md:text-left">
               <FadeUp>
                  <h2 className="text-4xl font-serif italic mb-8 border-b border-[#5D4037] pb-8">Visit Us</h2>
                  <div className="flex flex-col gap-8 md:items-start">
                     <div className="flex gap-4 items-start text-left">
                        <MapPin className="text-[#D7CCC8] shrink-0 mt-1" />
                        <div>
                           <div className="font-medium tracking-widest uppercase mb-2 text-sm text-[#D7CCC8]">Address</div>
                           <div className="font-light text-lg">45 Roasters Street<br />Brewville, CO 80204</div>
                        </div>
                     </div>
                     <div className="flex gap-4 items-start text-left">
                        <Clock className="text-[#D7CCC8] shrink-0 mt-1" />
                        <div>
                           <div className="font-medium tracking-widest uppercase mb-2 text-sm text-[#D7CCC8]">Hours</div>
                           <ul className="font-light text-lg">
                              <li>Mon-Fri: 7:00 AM - 5:00 PM</li>
                              <li>Sat-Sun: 8:00 AM - 6:00 PM</li>
                           </ul>
                        </div>
                     </div>
                  </div>
               </FadeUp>
               <FadeUp delay={0.2} className="h-[400px] md:h-full w-full">
                  <iframe
                     src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d102046.22123284562!2d-105.08865487739506!3d39.75628469502931!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x876b80aa231f17cf%3A0x118ef4f8278a36d6!2sDenver%2C%20CO!5e0!3m2!1sen!2sus!4v1709819779339!5m2!1sen!2sus"
                     className="w-full h-full border-0 grayscale opacity-80 rounded-md"
                     allowFullScreen=""
                     loading="lazy"
                     referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
               </FadeUp>
            </div>
         </section>

         <footer className="bg-[#2a1a17] text-center py-8">
            <div className="text-[#8D6E63] text-xs font-light tracking-widest uppercase">
               &copy; {new Date().getFullYear()} Velvet Brew Café. Demo Project by ThreeFoldHub.
            </div>
         </footer>
      </div>
   );
};

export default CafeDemo;
