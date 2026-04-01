import { useEffect, useRef, useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';

const faqs = [
  {
    question: 'Is creatine safe for teenagers?',
    answer: 'Our AYN Junior Safe Creatine is specifically formulated for athletes aged 16 and above. It contains a lower dose (2-3g) of creatine monohydrate combined with bone-supporting nutrients like Calcium, Magnesium, and Vitamin D3. However, we always recommend consulting with a healthcare provider before starting any supplement regimen for teenagers.',
    category: 'Safety',
  },
  {
    question: 'Will creatine cause hair loss?',
    answer: 'Standard creatine may increase DHT levels in some individuals, which can contribute to hair loss in those genetically predisposed. Our Hair Safe Creatine is specifically designed with DHT-blocking ingredients like Saw Palmetto, along with hair-supporting nutrients like Biotin and Zinc, allowing you to enjoy creatine benefits while protecting your hair.',
    category: 'Hair Safe',
  },
  {
    question: 'What\'s the difference between the three formulas?',
    answer: 'Each formula is designed for specific needs: Junior Safe (ages 16+) focuses on gentle dosing with bone support; Hair Safe provides maximum creatine benefits with DHT protection and hair nutrients; Pro Athletes features a triple-blend creatine complex for elite performance, power, and endurance.',
    category: 'Products',
  },
  {
    question: 'How do I choose between 30 and 60 servings?',
    answer: 'Choose 30 servings if you\'re trying AYN for the first time or want to test a flavor. The 60-serving option offers better value (typically 15-20% savings) and is ideal if you\'re already familiar with the product. Both options maintain the same quality and effectiveness.',
    category: 'Ordering',
  },
  {
    question: 'Do I need to do a loading phase?',
    answer: 'Loading phase is optional. Our formulas are designed to work effectively with or without loading. If you choose to load, take 20g per day (divided into 4 doses) for 5-7 days, then switch to maintenance dose. Without loading, simply take the recommended daily dose and results will appear within 2-4 weeks.',
    category: 'Usage',
  },
  {
    question: 'When will I see results?',
    answer: 'Most users report noticeable strength gains within 2-4 weeks of consistent use. Muscle volumization (fuller muscles) may be visible within the first week due to increased water retention in muscles. Maximum benefits typically occur after 4-8 weeks of regular supplementation combined with proper training and nutrition.',
    category: 'Results',
  },
  {
    question: 'Can I mix creatine with other supplements?',
    answer: 'Yes, creatine can be safely combined with most supplements including protein powder, BCAAs, pre-workouts, and multivitamins. Our formulas already include complementary ingredients. Avoid mixing with caffeine immediately post-workout as it may slightly reduce creatine uptake.',
    category: 'Usage',
  },
  {
    question: 'What are your shipping and return policies?',
    answer: 'We offer free shipping on all orders above ₹999. Orders are typically delivered within 3-5 business days across India. We have a 30-day money-back guarantee — if you\'re not satisfied with your purchase, contact us for a full refund, no questions asked.',
    category: 'Shipping',
  },
  {
    question: 'Do you offer subscriptions?',
    answer: 'Yes! Our Subscribe & Save program gives you 15% off every order plus free shipping. You can choose delivery frequency (every 30, 45, or 60 days) and easily pause, skip, or cancel anytime from your account dashboard.',
    category: 'Subscriptions',
  },
  {
    question: 'Are your products FSSAI approved?',
    answer: 'Absolutely. All AYN Nutrition products are manufactured in FSSAI-registered facilities and comply with all Indian food safety regulations. We also conduct third-party testing on every batch to ensure purity and potency.',
    category: 'Safety',
  },
];

const categories = ['All', ...Array.from(new Set(faqs.map((f) => f.category)))];

export default function FAQ() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const filteredFaqs = selectedCategory === 'All' 
    ? faqs 
    : faqs.filter((f) => f.category === selectedCategory);

  return (
    <section id="faq" ref={sectionRef} className="py-20 lg:py-32 relative overflow-hidden">
      <div className="w-full section-padding">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-ayn-teal font-semibold text-sm tracking-wider uppercase mb-4 block">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-ayn-dark mb-6">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-lg text-ayn-text-light">
            Everything you need to know about AYN Nutrition and our products.
          </p>
        </div>

        {/* Category Filter */}
        <div className={`flex flex-wrap justify-center gap-2 mb-10 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-ayn-teal text-white'
                  : 'bg-white text-ayn-dark hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className={`max-w-3xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-ayn-teal bg-ayn-teal/10 px-2 py-1 rounded">
                      {faq.category}
                    </span>
                    <span className="font-semibold text-ayn-dark pr-4">{faq.question}</span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-ayn-teal flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-5 pb-5 pt-0">
                    <div className="border-t border-gray-100 pt-4">
                      <p className="text-ayn-text-light leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className={`mt-12 text-center transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-gradient-to-r from-ayn-teal/10 to-ayn-coral/10 rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="w-14 h-14 bg-ayn-teal rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-ayn-dark mb-2">
              Still have questions?
            </h3>
            <p className="text-ayn-text-light mb-6">
              Our nutrition experts are here to help. Reach out and we'll get back to you within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:support@aynnutrition.in" 
                className="btn-primary inline-flex items-center justify-center gap-2"
              >
                Email Us
              </a>
              <a 
                href="https://wa.me/919999999999" 
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline inline-flex items-center justify-center gap-2"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
