import { useRef } from 'react';
import { ArrowRight, Shield, FlaskConical, Award, ChevronDown } from 'lucide-react';
import { HeroCarousel } from '../components/HeroCarousel';
import { FadeIn } from '../components/ui/FadeIn';

const trustBadges = [
  { icon: Shield, text: 'Made in India' },
  { icon: FlaskConical, text: 'FSSAI Approved' },
  { icon: Award, text: '3rd Party Tested' },
];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  const scrollToProducts = () => {
    const element = document.querySelector('#products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToQuiz = () => {
    const element = document.querySelector('#quiz');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={heroRef}
      className="relative min-h-[calc(100vh-80px)] flex items-center pt-2 md:pt-4 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-ayn-teal/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-ayn-coral/5 to-transparent rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
        {/* Geometric patterns */}
        <div className="absolute top-1/4 left-10 w-20 h-20 border border-ayn-teal/20 rotate-45 hidden lg:block"></div>
        <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-ayn-teal/30 rounded-full hidden lg:block"></div>
      </div>
      <div className="w-full section-padding relative z-10 pt-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Content Side */}
          <div className="flex flex-col justify-center order-2 lg:order-1">
            {/* Badge */}
            <FadeIn delay={0}>
              <div className="inline-flex items-center gap-2 bg-ayn-teal/10 text-ayn-teal px-4 py-2 rounded-full w-fit mb-6">
                <span className="w-2 h-2 bg-ayn-teal rounded-full animate-pulse"></span>
                <span className="text-sm font-semibold">India's First Personalized Creatine</span>
              </div>
            </FadeIn>

            {/* Headline */}
            <FadeIn delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-ayn-dark leading-[1.1] mb-6">
                India's First{' '}
                <span className="text-gradient">Personalized</span>{' '}
                Creatine Formulations
              </h1>
            </FadeIn>

            {/* Subheadline */}
            <FadeIn delay={0.2}>
              <p className="text-lg lg:text-xl text-ayn-text-light max-w-xl mb-8">
                Science-backed, goal-specific nutrition designed for your unique performance needs. From teen athletes to pro bodybuilders — find your perfect formula.
              </p>
            </FadeIn>

            {/* CTA Buttons */}
            <FadeIn delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <button 
                  onClick={scrollToQuiz}
                  className="btn-primary flex items-center justify-center gap-2 group text-lg"
                >
                  Find Your Formula
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={scrollToProducts}
                  className="btn-outline flex items-center justify-center text-lg"
                >
                  Shop Creatine
                </button>
              </div>
            </FadeIn>

            {/* Trust Badges */}
            <FadeIn delay={0.4}>
              <div className="flex flex-wrap gap-4">
                {trustBadges.map((badge, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full"
                  >
                    <badge.icon className="w-4 h-4 text-ayn-teal" />
                    <span className="text-sm font-medium text-ayn-dark">{badge.text}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Image Side */}
          <FadeIn direction="left" delay={0.2} className="flex items-center justify-center order-1 lg:order-2 relative">
            <div className="relative w-full max-w-lg lg:max-w-xl xl:max-w-2xl">
              {/* Glow effect behind products */}
              <div className="absolute inset-0 bg-gradient-to-br from-ayn-teal/20 via-ayn-coral/10 to-ayn-blue/20 rounded-full blur-3xl scale-110"></div>
              
              {/* Product Image Carousel */}
              <div className="relative z-10 w-full aspect-square md:aspect-auto md:h-[450px] lg:h-[550px]">
                <HeroCarousel />
              </div>
            </div>
          </FadeIn>
        </div>

      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce z-20">
        <span className="text-[10px] md:text-xs text-ayn-text-light font-medium uppercase tracking-widest opacity-70">Explore</span>
        <ChevronDown className="w-5 h-5 text-ayn-teal" />
      </div>
    </section>
  );
}
