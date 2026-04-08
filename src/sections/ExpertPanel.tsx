import { Quote } from 'lucide-react';
import { FadeIn } from '@/components/ui/FadeIn';

const experts = [
  {
    name: 'Dr. Rajesh Kumar',
    credentials: 'Ph.D. Sports Nutrition',
    experience: '18+',
    image: '/images/expert-1.png',
    quote: 'Personalized nutrition is the future of sports supplementation. AYN\'s approach of targeting specific needs while addressing potential concerns is exactly what the industry needs.',
    color: 'teal',
    bgColor: 'bg-ayn-teal',
    arcColor: 'from-ayn-teal to-ayn-teal/60',
  },
  {
    name: 'Dr. Priya Sharma',
    credentials: 'M.D. Clinical Nutrition',
    experience: '15+',
    image: '/images/expert-2.png',
    quote: 'The Hair Safe formula is a breakthrough. Finally, athletes concerned about hair health can benefit from creatine without compromise. The science behind the DHT-blocking ingredients is solid.',
    color: 'coral',
    bgColor: 'bg-ayn-coral',
    arcColor: 'from-ayn-coral to-ayn-coral/60',
  },
  {
    name: 'Coach Vikram Patel',
    credentials: 'ISSA Certified Strength Coach',
    experience: '22+',
    image: '/images/expert-3.png',
    quote: 'I recommend AYN to all my athletes. The Junior Safe formula gives parents peace of mind, while the Pro Athlete blend delivers the performance my competitive clients demand.',
    color: 'sand',
    bgColor: 'bg-amber-400',
    arcColor: 'from-amber-400 to-amber-400/60',
  },
];

export default function ExpertPanel() {
  return (
    <section id="experts" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="w-full section-padding">
        {/* Section Header */}
        <FadeIn delay={0.1}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-ayn-teal font-semibold text-sm tracking-wider uppercase mb-4 block">
              Our Advisory Board
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-ayn-dark mb-6">
              Backed by <span className="text-gradient">Experts</span>
            </h2>
            <p className="text-lg text-ayn-text-light">
              Our formulations are developed in collaboration with leading sports nutritionists, doctors, and strength coaches.
            </p>
          </div>
        </FadeIn>

        {/* Experts Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {experts.map((expert, index) => (
            <FadeIn key={index} delay={0.2 + (index * 0.15)} className="h-full">
              <div className="relative group h-full flex flex-col z-0">
              {/* Curved Background */}
              <div className={`absolute top-0 left-0 right-0 h-48 bg-gradient-to-b ${expert.arcColor} rounded-t-[100px] rounded-b-3xl z-0`}></div>
              
              {/* Content Card */}
              <div className="pt-10 px-6 pb-6 flex-1 flex flex-col relative z-10">
                {/* Image */}
                <div className="relative w-32 h-32 mx-auto mb-10">
                  <div className={`absolute inset-0 ${expert.bgColor} rounded-full blur-xl opacity-50 group-hover:opacity-70 transition-opacity`}></div>
                  <img
                    src={expert.image}
                    alt={`${expert.name} — ${expert.credentials} and AYN Nutrition Expert Advisor`}
                    className="relative w-full h-full object-cover rounded-full border-4 border-white shadow-lg grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  {/* Experience Badge */}
                  <div className="absolute -bottom-2 -right-2 bg-white rounded-full px-3 py-1 shadow-lg">
                    <span className="text-xs font-bold text-ayn-dark">{expert.experience} yrs</span>
                  </div>
                </div>

                {/* Info */}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-ayn-dark mb-1">{expert.name}</h3>
                  <p className={`text-sm font-medium ${expert.color === 'teal' ? 'text-ayn-teal' : expert.color === 'coral' ? 'text-ayn-coral' : 'text-amber-500'}`}>
                    {expert.credentials}
                  </p>
                </div>

                {/* Quote */}
                <div className="bg-white rounded-2xl p-5 shadow-sm relative mt-auto">
                  <Quote className={`absolute -top-3 -left-3 w-6 h-6 ${expert.bgColor} text-white rounded-full p-1`} />
                  <p className="text-sm text-ayn-text-light italic leading-relaxed">
                    "{expert.quote}"
                  </p>
                </div>
              </div>
            </div>
            </FadeIn>
          ))}
        </div>

        {/* Bottom Stats */}
        <FadeIn delay={0.5}>
          <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-8 bg-white rounded-2xl px-8 py-4 shadow-lg">
            <div className="text-center">
              <span className="text-3xl font-black text-ayn-teal block">40+</span>
              <span className="text-sm text-ayn-text-light">Combined Years</span>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div className="text-center">
              <span className="text-3xl font-black text-ayn-coral block">3</span>
              <span className="text-sm text-ayn-text-light">Expert Advisors</span>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div className="text-center">
              <span className="text-3xl font-black text-ayn-blue block">100%</span>
              <span className="text-sm text-ayn-text-light">Science-Backed</span>
            </div>
          </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
