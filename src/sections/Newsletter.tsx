import { useState, useEffect, useRef } from 'react';
import { Mail, ArrowRight, Gift, BookOpen, Bell } from 'lucide-react';
import { toast } from 'sonner';

const benefits = [
  { icon: Gift, text: '15% off your first order' },
  { icon: BookOpen, text: 'Exclusive training tips' },
  { icon: Bell, text: 'Early access to new products' },
];

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast.success('Welcome to the AYN Insider Club! Check your email for your discount code.');
    setEmail('');
    setIsSubmitting(false);
  };

  return (
    <section ref={sectionRef} className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-ayn-teal/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-ayn-coral/10 rounded-full blur-3xl"></div>
        {/* Geometric patterns */}
        <div className="absolute top-10 left-10 w-20 h-20 border border-ayn-teal/10 rotate-45 hidden lg:block"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 border border-ayn-coral/10 rounded-full hidden lg:block"></div>
      </div>

      <div className="w-full section-padding relative z-10">
        <div className={`max-w-4xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-ayn-teal/20 to-transparent rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-ayn-coral/20 to-transparent rounded-tr-full"></div>

            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-ayn-teal to-ayn-coral rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-3 hover:rotate-6 transition-transform">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-ayn-dark mb-4">
                  Join the AYN <span className="text-gradient">Insider Club</span>
                </h2>
                <p className="text-lg text-ayn-text-light max-w-xl mx-auto">
                  Subscribe for exclusive offers, expert training tips, and be the first to know about new products.
                </p>
              </div>

              {/* Benefits */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-ayn-sand px-4 py-2 rounded-full"
                  >
                    <benefit.icon className="w-4 h-4 text-ayn-teal" />
                    <span className="text-sm font-medium text-ayn-dark">{benefit.text}</span>
                  </div>
                ))}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ayn-text-light" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-ayn-teal focus:outline-none transition-colors text-ayn-dark"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Subscribe
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-ayn-text-light text-center mt-4">
                  By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
                </p>
              </form>

              {/* Trust indicators */}
              <div className="flex flex-wrap justify-center gap-6 mt-8 pt-8 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-ayn-text-light">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  No spam, ever
                </div>
                <div className="flex items-center gap-2 text-sm text-ayn-text-light">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Unsubscribe anytime
                </div>
                <div className="flex items-center gap-2 text-sm text-ayn-text-light">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  50,000+ subscribers
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
