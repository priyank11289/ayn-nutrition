import { useEffect, useRef, useState } from 'react';
import { ClipboardList, Package, Settings, TrendingUp, ArrowRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Assess',
    description: 'Take our quick quiz or browse our formulations to understand your unique needs and goals.',
    icon: ClipboardList,
    color: 'bg-ayn-teal',
    textColor: 'text-ayn-teal',
  },
  {
    number: '02',
    title: 'Select',
    description: 'Choose the formula that matches your profile and pick your favorite flavor.',
    icon: Package,
    color: 'bg-ayn-coral',
    textColor: 'text-ayn-coral',
  },
  {
    number: '03',
    title: 'Customize',
    description: 'Select your serving size — 30 servings for trial or 60 for the best value.',
    icon: Settings,
    color: 'bg-ayn-blue',
    textColor: 'text-ayn-blue',
  },
  {
    number: '04',
    title: 'Optimize',
    description: 'Receive monthly deliveries or subscribe & save for continuous performance gains.',
    icon: TrendingUp,
    color: 'bg-purple-500',
    textColor: 'text-purple-500',
  },
];

export default function HowItWorks() {
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

  return (
    <section ref={sectionRef} className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ayn-teal/5 to-transparent"></div>
      
      <div className="w-full section-padding relative z-10">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-ayn-teal font-semibold text-sm tracking-wider uppercase mb-4 block">
            Simple Process
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-ayn-dark mb-6">
            Your Personalized{' '}
            <span className="text-gradient">Nutrition Journey</span>
          </h2>
          <p className="text-lg text-ayn-text-light">
            Getting started with AYN is simple. Four easy steps to your perfect formula.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting Line - Desktop */}
          <div className="hidden lg:block absolute top-24 left-[12.5%] right-[12.5%] h-1 bg-gradient-to-r from-ayn-teal via-ayn-coral to-purple-500 rounded-full"></div>

          {/* Steps Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Step Card */}
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full">
                  {/* Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className={`text-4xl font-black ${step.textColor} opacity-30`}>
                      {step.number}
                    </span>
                    <div className={`w-14 h-14 ${step.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                      <step.icon className="w-7 h-7 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-ayn-dark mb-3">
                    {step.title}
                  </h3>
                  <p className="text-ayn-text-light text-sm leading-relaxed">
                    {step.description}
                  </p>

                  {/* Arrow - Mobile */}
                  {index < steps.length - 1 && (
                    <div className="flex justify-center mt-4 lg:hidden">
                      <ArrowRight className="w-5 h-5 text-ayn-text-light" />
                    </div>
                  )}
                </div>

                {/* Dot on line - Desktop */}
                <div className={`hidden lg:block absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 ${step.color} rounded-full border-4 border-white shadow-md z-10`}></div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className={`text-center mt-16 transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-ayn-text-light mb-6">
            Ready to start your journey?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#quiz" className="btn-primary inline-flex items-center justify-center gap-2">
              Take the Quiz
              <ArrowRight className="w-5 h-5" />
            </a>
            <a href="#products" className="btn-outline inline-flex items-center justify-center">
              Browse Products
            </a>
          </div>
        </div>

        {/* Features */}
        <div className={`mt-16 grid sm:grid-cols-3 gap-6 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white rounded-xl p-6 text-center shadow-sm">
            <div className="w-12 h-12 bg-ayn-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🚚</span>
            </div>
            <h4 className="font-bold text-ayn-dark mb-2">Free Shipping</h4>
            <p className="text-sm text-ayn-text-light">On all orders above ₹999</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-sm">
            <div className="w-12 h-12 bg-ayn-coral/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">↩️</span>
            </div>
            <h4 className="font-bold text-ayn-dark mb-2">Easy Returns</h4>
            <p className="text-sm text-ayn-text-light">30-day money-back guarantee</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-sm">
            <div className="w-12 h-12 bg-ayn-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💬</span>
            </div>
            <h4 className="font-bold text-ayn-dark mb-2">Expert Support</h4>
            <p className="text-sm text-ayn-text-light">Chat with our nutritionists</p>
          </div>
        </div>
      </div>
    </section>
  );
}
