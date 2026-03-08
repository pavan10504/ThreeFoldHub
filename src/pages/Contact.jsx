import { useState } from 'react';
import FadeUp from '../components/ui/FadeUp';
import Button from '../components/ui/Button';
import { Mail, Phone, MessageCircle } from 'lucide-react';

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(false);
    
    const form = e.target;
    const formData = new FormData(form);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
      _subject: "New Contact Message",
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
      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          
          <div className="flex flex-col justify-center">
            <FadeUp>
              <h1 className="text-5xl md:text-7xl font-heading font-medium tracking-tight mb-8">
                Let's start<br />a conversation.
              </h1>
              <p className="text-xl md:text-2xl text-gray-500 font-light max-w-md leading-relaxed mb-12">
                Ready to build a premium website for your local business? We'd love to hear from you.
              </p>
            </FadeUp>

            <FadeUp delay={0.2} className="flex flex-col gap-8">
              <a href="mailto:hubthreefold@gmail.com" className="flex items-center gap-4 group">
                 <div className="w-12 h-12 bg-surface rounded-full flex items-center justify-center border border-primary/10 group-hover:bg-primary group-hover:border-primary transition-colors shrink-0">
                    <Mail className="w-5 h-5 text-primary group-hover:text-surface transition-colors" />
                 </div>
                 <span className="text-lg font-medium group-hover:text-accent transition-colors">hubthreefold@gmail.com</span>
              </a>
              <a href="tel:+91 9980157156" className="flex items-center gap-4 group">
                 <div className="w-12 h-12 bg-surface rounded-full flex items-center justify-center border border-primary/10 group-hover:bg-primary group-hover:border-primary transition-colors shrink-0">
                    <Phone className="w-5 h-5 text-primary group-hover:text-surface transition-colors" />
                 </div>
                 <span className="text-lg font-medium group-hover:text-accent transition-colors">+91 99801 57156</span>
              </a>
              <a href="https://wa.me/919980157156" target="_blank" rel="noreferrer" className="flex items-center gap-4 group">
                 <div className="w-12 h-12 bg-surface rounded-full flex items-center justify-center border border-primary/10 group-hover:bg-[#25D366] group-hover:border-[#25D366] transition-colors shrink-0">
                    <MessageCircle className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                 </div>
                 <span className="text-lg font-medium group-hover:text-[#25D366] transition-colors">WhatsApp Us</span>
              </a>
            </FadeUp>
          </div>

          <div className="bg-surface p-8 md:p-12 rounded-[2.5rem] border border-primary/5 shadow-xl shadow-primary/2">
            <FadeUp delay={0.3}>
              <h3 className="text-2xl font-heading font-medium mb-8">Send us a message</h3>
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center h-[400px] animate-in fade-in duration-500">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-8 border-4 border-white shadow-lg">
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-3xl font-heading font-medium mb-4 text-primary">Message Sent!</h4>
                  <p className="text-gray-500 font-light max-w-sm text-lg">
                    Thank you for reaching out safely. Our team will get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  {/* Honeypot to prevent spam */}
                  <input type="text" name="_honey" style={{ display: 'none' }} />
                  
                  {/* Disable captcha for seamless experience (optional, but requested by some) */}
                  <input type="hidden" name="_captcha" value="false" />

                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-600">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name"
                      required
                      className="w-full bg-bg-base border border-transparent focus:border-primary/20 focus:bg-surface rounded-xl px-4 py-4 outline-none transition-all"
                      placeholder="Name"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-600">Email</label>
                    <input 
                      type="email" 
                      id="email"
                      name="email" 
                      required
                      className="w-full bg-bg-base border border-transparent focus:border-primary/20 focus:bg-surface rounded-xl px-4 py-4 outline-none transition-all"
                      placeholder="example@email.com"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="text-sm font-medium text-gray-600">Phone</label>
                    <input 
                      type="tel" 
                      id="phone"
                      name="phone" 
                      required
                      className="w-full bg-bg-base border border-transparent focus:border-primary/20 focus:bg-surface rounded-xl px-4 py-4 outline-none transition-all"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-sm font-medium text-gray-600">Message</label>
                    <textarea 
                      id="message" 
                      name="message"
                      required
                      rows={4}
                      className="w-full bg-bg-base border border-transparent focus:border-primary/20 focus:bg-surface rounded-xl px-4 py-4 outline-none transition-all resize-none"
                      placeholder="Tell us about your business..."
                    />
                  </div>
                  
                  {error && (
                    <div className="text-red-500 text-sm mt-2">
                      An error occurred while sending your message. Please try again.
                    </div>
                  )}

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full mt-4 px-6 py-4 bg-primary text-surface text-sm font-medium rounded-full hover:bg-primary/90 transition-colors hover-lift disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </FadeUp>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Contact;
