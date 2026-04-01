import { useEffect, useRef, useState } from 'react';
import { Users, Microscope, Target, ArrowRight } from 'lucide-react';

const cards = [
  {
    icon: Users,
    title: 'The Problem',
    subtitle: 'One-Size-Fits-All Doesn\'t Work',
    description: 'Generic supplements ignore your age, goals, and unique biology. What works for a 25-year-old bodybuilder may not be right for a 16-year-old athlete or someone concerned about hair health.',
    color: 'bg-ayn-coral/10',
    iconColor: 'text-ayn-coral',
    borderColor: 'border-ayn-coral/20',
  },
  {
    icon: Microscope,
    title: 'The Science',
    subtitle: 'Different Bodies, Different Needs',
    description: 'Research shows that different bodies need different support systems — from bone health for growing athletes to DHT management for hair care to explosive power for elite performers.',
    color: 'bg-ayn-blue/10',
    iconColor: 'text-ayn-blue',
    borderColor: 'border-ayn-blue/20',
  },
  {
    icon: Target,
    title: 'The Solution',
    subtitle: 'Precision Nutrition by AYN',
    description: 'AYN formulations target your specific needs with precision ingredients. Each formula is scientifically designed to support your unique goals without compromising other aspects of your health.',
    color: 'bg-ayn-teal/10',
    iconColor: 'text-ayn-teal',
    borderColor: 'border-ayn-teal/20',
  },
];

export default function ProblemSolution() {
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
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ayn-dark/10 to-transparent"></div>
      
      <div className="w-full section-padding">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-ayn-teal font-semibold text-sm tracking-wider uppercase mb-4 block">
            Why AYN is Different
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-ayn-dark mb-6">
            Why Generic Creatine{' '}
            <span className="text-ayn-coral">Isn't Enough</span>
          </h2>
          <p className="text-lg text-ayn-text-light">
            The supplement industry has been selling the same creatine to everyone. 
            We're here to change that with personalized formulations.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`group relative bg-white rounded-2xl p-6 lg:p-8 border-2 ${card.borderColor} 
                hover:shadow-xl hover:shadow-${card.iconColor.split('-')[1]}-500/10 
                transition-all duration-500 hover:-translate-y-2
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Icon */}
              <div className={`w-14 h-14 ${card.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <card.icon className={`w-7 h-7 ${card.iconColor}`} />
              </div>

              {/* Content */}
              <span className={`text-sm font-bold ${card.iconColor} uppercase tracking-wider mb-2 block`}>
                {card.title}
              </span>
              <h3 className="text-xl lg:text-2xl font-bold text-ayn-dark mb-4">
                {card.subtitle}
              </h3>
              <p className="text-ayn-text-light leading-relaxed mb-6">
                {card.description}
              </p>

              {/* Learn More Link */}
              <button className={`flex items-center gap-2 text-sm font-semibold ${card.iconColor} group/link`}>
                Learn More
                <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </button>

              {/* Decorative corner */}
              <div className={`absolute top-0 right-0 w-20 h-20 ${card.color} rounded-bl-full opacity-50 -z-10 group-hover:scale-150 transition-transform duration-500`}></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-12 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-ayn-text-light mb-4">
            Ready to find your perfect formula?
          </p>
          <a 
            href="#quiz" 
            className="inline-flex items-center gap-2 text-ayn-teal font-semibold hover:underline"
          >
            Take the 60-Second Quiz
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
