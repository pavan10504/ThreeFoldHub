import FadeUp from '../components/ui/FadeUp';
import Button from '../components/ui/Button';

const works = [
  {
    title: "Gym & Fitness",
    desc: "Bold and energetic design for a local gym.",
    path: "/demo/gym",
    color: "bg-zinc-900",
    textColor: "text-surface"
  },
  {
    title: "Artisan Café",
    desc: "Warm and cozy aesthetic for a local coffee shop.",
    path: "/demo/cafe",
    color: "bg-[#D4A373]",
    textColor: "text-[#FEFAE0]"
  },
  {
    title: "Beauty Salon",
    desc: "Elegant and clean design for a high-end salon.",
    path: "/demo/salon",
    color: "bg-rose-100",
    textColor: "text-stone-800"
  },
  {
    title: "Medical Clinic",
    desc: "Trustworthy and professional medical design.",
    path: "/demo/clinic",
    color: "bg-blue-50",
    textColor: "text-slate-800"
  }
];

const Works = () => {
  return (
    <div className="w-full">
      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto text-center">
        <FadeUp>
          <h1 className="text-5xl md:text-7xl font-heading font-medium tracking-tight mb-8 text-balance">
            Our Work & Demos
          </h1>
          <p className="text-xl md:text-2xl text-primary/60 font-light max-w-2xl mx-auto leading-relaxed text-balance">
            Explore our handcrafted designed specifically for growing local businesses.
          </p>
        </FadeUp>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {works.map((item, idx) => (
             <FadeUp key={idx} delay={idx * 0.1}>
                <div className="group p-8 rounded-4xl border border-primary/5 hover:border-primary/10 hover-lift bg-surface relative overflow-hidden transition-all duration-300">
                   {/* Preview Image / Placeholder */}
                   <div className={`h-64 w-full flex items-center justify-center relative overflow-hidden rounded-2xl mb-6`}>
                      <img 
                        src={
                          item.title === "Gym & Fitness" ? "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" :
                          item.title === "Artisan Café" ? "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" :
                          item.title === "Beauty Salon" ? "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" :
                          "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                        } 
                        alt={`${item.title} Preview`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                   </div>
                   {/* Card Content */}
                   <div className="flex flex-col justify-between bg-surface relative z-10">
                      <div>
                         <h3 className="text-2xl font-heading font-medium mb-2">{item.title}</h3>
                         <p className="text-primary/60">{item.desc}</p>
                      </div>
                      <div className="pt-6">
                         <Button to={item.path} variant="secondary" className="w-full">
                            View Demo
                         </Button>
                      </div>
                   </div>
                </div>
             </FadeUp>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Works;
