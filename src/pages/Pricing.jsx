import { useState } from 'react';
import FadeUp from '../components/ui/FadeUp';
import Button from '../components/ui/Button';
import { Check, X } from 'lucide-react';

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const plans = [
    {
      name: "Basic",
      price: "₹7,999",
      desc: "Perfect for a simple, professional single-page presence.",
      features: [
        "Landing Page", 
        "Mobile responsive", 
        "Services, Contact, Location", 
        "Basic SEO, Optimised",
        "3-5 Days Delivery"
      ],
      highlight: false
    },
    {
      name: "Professional",
      price: "₹14,999",
      desc: "Best for growing businesses needing a strong multi-page presence.",
      features: [
        "Up to 6-7 pages", 
        "Premium Design", 
        "Custom design & animations", 
        "Mobile responsive & SEO",
        "Fast Delivery"
      ],
      highlight: true
    },
    {
      name: "Enterprise",
      price: "₹34,999",
      desc: "Ideal for businesses that want a fully loaded digital experience.",
      features: [
        "Everything in Professional",
        "Chatbot Integration", 
        "CMS setup for Blogs", 
        "Advanced SEO & Analytics",
        "Priority Support"
      ],
      highlight: false
    },
    {
      name: "Custom",
      price: "Custom",
      desc: "Send a request and our team will contact you for further enquiries.",
      features: [
        "Fully tailored architecture", 
        "Advanced Integrations", 
        "Dedicated Team", 
        "E-commerce capabilities",
        "Ongoing Maintenance"
      ],
      highlight: false
    }
  ];

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setIsSubmitted(false);
    setError(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
        setSelectedPlan(null);
        setIsSubmitted(false);
    }, 300); // Wait for transition
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(false);
    
    const form = e.target;
    // Inject the selected plan into the form data before submission
    const formData = new FormData(form);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      selected_plan: selectedPlan.name,
      plan_price: selectedPlan.price,
      project_requirements: formData.get("project_requirements") || "N/A",
      _subject: `New Plan Request: ${selectedPlan?.name}`,
      _captcha: "false"
    };
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/hubthreefold@gmail.com", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setIsSubmitted(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto text-center">
        <FadeUp>
          <h1 className="text-5xl md:text-7xl font-heading font-medium tracking-tight mb-8">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 font-light max-w-2xl mx-auto leading-relaxed mb-4">
            Premium quality websites without the enterprise price tag.
          </p>
          <p className="text-sm font-medium text-accent">
            * Domain (Charges applicable) + Add-ons apply to all plans.
          </p>
        </FadeUp>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, idx) => (
             <FadeUp key={idx} delay={idx * 0.1}>
                <div className={`h-full relative rounded-[2.5rem] p-10 flex flex-col border hover-lift transition-all duration-500 ${
                  plan.highlight 
                  ? 'bg-primary text-surface border-primary shadow-2xl scale-105 z-10' 
                  : 'bg-surface text-primary border-primary/10'
                }`}>
                  {plan.highlight && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-surface px-4 py-1 text-sm font-medium rounded-full">
                      Recommended
                    </div>
                  )}
                  
                  <div className="mb-8">
                    <h3 className={`text-2xl font-heading font-medium mb-4 ${plan.highlight ? 'text-surface' : 'text-primary'}`}>{plan.name}</h3>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-4xl font-heading font-semibold">{plan.price}</span>
                    </div>
                    <p className={`text-sm leading-relaxed ${plan.highlight ? 'text-surface/70' : 'text-primary/60'}`}>
                      {plan.desc}
                    </p>
                  </div>

                  <div className="grow mb-10">
                    <ul className="flex flex-col gap-4">
                      {plan.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-3 text-sm">
                          <Check className={`w-5 h-5 shrink-0 ${plan.highlight ? 'text-surface/80' : 'text-primary/70'}`} />
                          <span className={plan.highlight ? 'text-surface/80' : 'text-primary/80'}>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button 
                    onClick={() => handleSelectPlan(plan)} 
                    variant={plan.highlight ? "accent" : "secondary"} 
                    className="w-full"
                  >
                    Select
                  </Button>
                </div>
             </FadeUp>
          ))}
        </div>
      </section>

      {/* Pop-up Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <div 
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={closeModal}
            ></div>
            
            <div className="relative w-full max-w-md bg-surface rounded-4xl p-8 shadow-2xl z-10 animate-in zoom-in-95 duration-300">
                <button 
                  onClick={closeModal}
                  className="absolute top-6 right-6 text-gray-400 hover:text-primary transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                {isSubmitted ? (
                    <div className="flex flex-col items-center justify-center py-10 text-center animate-in fade-in duration-500">
                      <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-md">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h4 className="text-2xl font-heading font-medium mb-3 text-primary">Request Sent!</h4>
                      <p className="text-gray-500 font-light text-sm max-w-[250px]">
                        We've received your request for the <strong className="font-semibold text-primary">{selectedPlan?.name} Plan</strong>. We'll be in touch shortly.
                      </p>
                      <Button onClick={closeModal} className="mt-8 w-full">Close</Button>
                    </div>
                ) : (
                    <>
                        <div className="mb-8">
                            <h3 className="text-2xl font-heading font-medium text-primary mb-2">Request Plan</h3>
                            <p className="text-gray-500 text-sm">
                                You selected the <strong className="text-primary">{selectedPlan?.name}</strong> at {selectedPlan?.price}. Provide your details below.
                            </p>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            {/* Honeypot */}
                            <input type="text" name="_honey" style={{ display: 'none' }} />
                            {/* Disable captcha */}
                            <input type="hidden" name="_captcha" value="false" />
                            {/* Keep subject pristine */}
                            <input type="hidden" name="_subject" value={`New Plan Request: ${selectedPlan?.name}`} />
                            
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-600">Full Name</label>
                                <input 
                                    type="text" 
                                    name="name"
                                    required
                                    className="w-full bg-bg-base border border-transparent focus:border-primary/20 focus:bg-surface rounded-xl px-4 py-3 outline-none transition-all"
                                    placeholder="Your Name"
                                />
                            </div>
                            
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-600">Email Address</label>
                                <input 
                                    type="email" 
                                    name="email"
                                    required
                                    className="w-full bg-bg-base border border-transparent focus:border-primary/20 focus:bg-surface rounded-xl px-4 py-3 outline-none transition-all"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-600">Phone Number</label>
                                <input 
                                    type="tel" 
                                    name="phone"
                                    required
                                    className="w-full bg-bg-base border border-transparent focus:border-primary/20 focus:bg-surface rounded-xl px-4 py-3 outline-none transition-all"
                                    placeholder="+91 98765 43210"
                                />
                            </div>

                            {selectedPlan?.name === "Custom" && (
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-gray-600">Project Requirements</label>
                                    <textarea 
                                        name="project_requirements"
                                        required
                                        rows={3}
                                        className="w-full bg-bg-base border border-transparent focus:border-primary/20 focus:bg-surface rounded-xl px-4 py-3 outline-none transition-all resize-none"
                                        placeholder="Tell us exactly what you're looking to build..."
                                    />
                                </div>
                            )}

                            {error && (
                                <div className="text-red-500 text-xs mt-1">
                                    An error occurred while sending your request. Please try again.
                                </div>
                            )}

                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="w-full mt-2 px-6 py-4 bg-primary text-surface text-sm font-medium rounded-full hover:bg-primary/90 transition-colors disabled:opacity-70 flex justify-center items-center"
                            >
                                {isSubmitting ? 'Sending Request...' : 'Submit Request'}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
      )}
    </div>
  );
};

export default Pricing;
