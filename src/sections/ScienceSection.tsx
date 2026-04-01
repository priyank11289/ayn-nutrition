import { Check, FileText, FlaskConical, Shield, Award, Microscope } from 'lucide-react';
import { FadeIn } from '@/components/ui/FadeIn';

const transparencyPoints = [
  {
    icon: FileText,
    title: 'Full Label Disclosure',
    description: 'Every ingredient and its exact dosage is clearly listed. No proprietary blends, no hidden formulas.',
  },
  {
    icon: FlaskConical,
    title: 'Research-Backed Dosages',
    description: 'All ingredients are included at clinically effective doses based on peer-reviewed studies.',
  },
  {
    icon: Shield,
    title: '3rd Party Tested',
    description: 'Every batch is independently tested for purity, potency, and safety by certified laboratories.',
  },
  {
    icon: Award,
    title: 'FSSAI Compliant',
    description: 'All products meet or exceed Food Safety and Standards Authority of India regulations.',
  },
];

const certifications = [
  { name: 'GMP Certified', icon: Shield },
  { name: 'ISO 22000', icon: Award },
  { name: 'HACCP', icon: Check },
  { name: 'FSSAI', icon: FileText },
];

export default function ScienceSection() {
  return (
    <section id="science" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="w-full section-padding">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Side */}
          <FadeIn direction="right" className="relative">
            <div className="relative rounded-3xl overflow-hidden">
              <img
                src="/images/science-lab.png"
                alt="AYN Nutrition Laboratory"
                className="w-full h-auto object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-ayn-dark/60 via-transparent to-transparent"></div>
              
              {/* Floating stats */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 text-center">
                    <span className="text-2xl font-black text-ayn-teal block">40+</span>
                    <span className="text-xs text-ayn-text-light">Years Experience</span>
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 text-center">
                    <span className="text-2xl font-black text-ayn-coral block">100%</span>
                    <span className="text-xs text-ayn-text-light">Transparency</span>
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 text-center">
                    <span className="text-2xl font-black text-ayn-blue block">50K+</span>
                    <span className="text-xs text-ayn-text-light">Happy Athletes</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-ayn-teal/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-ayn-coral/20 rounded-full blur-2xl"></div>
          </FadeIn>

          {/* Content Side */}
          <FadeIn direction="left" delay={0.2}>
            <span className="text-ayn-teal font-semibold text-sm tracking-wider uppercase mb-4 block">
              Science & Transparency
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-ayn-dark mb-6">
              Formulated With{' '}
              <span className="text-gradient">Purpose</span>
            </h2>
            <p className="text-lg text-ayn-text-light mb-8">
              Every AYN product is the result of rigorous research, quality testing, and a commitment to transparency. We believe you deserve to know exactly what you're putting in your body.
            </p>

            {/* Transparency Points */}
            <div className="space-y-4 mb-8">
              {transparencyPoints.map((point, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 bg-ayn-teal/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <point.icon className="w-5 h-5 text-ayn-teal" />
                  </div>
                  <div>
                    <h4 className="font-bold text-ayn-dark mb-1">{point.title}</h4>
                    <p className="text-sm text-ayn-text-light">{point.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div>
              <p className="text-sm font-semibold text-ayn-dark mb-3">Certifications:</p>
              <div className="flex flex-wrap gap-3">
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-ayn-dark text-white px-4 py-2 rounded-full text-sm font-medium"
                  >
                    <cert.icon className="w-4 h-4" />
                    {cert.name}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Trust Banner */}
        <FadeIn delay={0.4}>
          <div className="mt-16 bg-gradient-to-r from-ayn-teal to-ayn-teal/80 rounded-2xl p-8 text-white relative">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                <Microscope className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-xl font-bold">Every Batch Tested</h4>
                <p className="text-white/80">Full label disclosure • Made in GMP facility</p>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-center">
                <span className="text-3xl font-black">0</span>
                <span className="block text-sm text-white/80">Banned Substances</span>
              </div>
              <div className="text-center">
                <span className="text-3xl font-black">100%</span>
                <span className="block text-sm text-white/80">Traceability</span>
              </div>
              <div className="text-center">
                <span className="text-3xl font-black">24h</span>
                <span className="block text-sm text-white/80">Quality Check</span>
              </div>
            </div>
          </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
