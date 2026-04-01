import { useEffect, useRef, useState, useCallback } from 'react';
import { Star, Verified, ChevronLeft, ChevronRight, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const reviews = [
  {
    name: 'Arjun Mehta',
    age: 19,
    product: 'Junior Safe Creatine',
    rating: 5,
    verified: true,
    text: 'Finally a creatine I can take without worrying about my growth plates. My coach recommended Junior Safe and I\'ve seen great strength gains in just 4 weeks!',
    image: 'AM',
    color: 'bg-blue-500',
  },
  {
    name: 'Rahul Sharma',
    age: 28,
    product: 'Hair Safe Creatine',
    rating: 5,
    verified: true,
    text: 'Hair loss runs in my family so I was hesitant about creatine. Hair Safe is a game-changer — getting stronger without the worry. Highly recommend!',
    image: 'RS',
    color: 'bg-purple-500',
  },
  {
    name: 'Vikram Singh',
    age: 32,
    product: 'Pro Athletes Creatine',
    rating: 5,
    verified: true,
    text: 'As a competitive powerlifter, I need the best. The triple blend in Pro Athletes gives me explosive power and the pumps are insane. Best creatine I\'ve used.',
    image: 'VS',
    color: 'bg-ayn-teal',
  },
  {
    name: 'Karan Patel',
    age: 24,
    product: 'Hair Safe Creatine',
    rating: 5,
    verified: true,
    text: 'The mango flavor is delicious and I love that it has biotin and saw palmetto. No more choosing between gains and hair!',
    image: 'KP',
    color: 'bg-purple-500',
  },
  {
    name: 'Aditya Kumar',
    age: 17,
    product: 'Junior Safe Creatine',
    rating: 5,
    verified: true,
    text: 'My parents were skeptical but after reading about the bone support ingredients, they approved. Feeling stronger every day!',
    image: 'AK',
    color: 'bg-blue-500',
  },
];

const instagramPosts = [
  { id: 1, likes: 234, user: '@fitness_arjun' },
  { id: 2, likes: 189, user: '@gym_rat_rahul' },
  { id: 3, likes: 312, user: '@powerlifter_vik' },
  { id: 4, likes: 156, user: '@healthy_karan' },
  { id: 5, likes: 278, user: '@teen_athlete_adi' },
  { id: 6, likes: 201, user: '@wellness_priya' },
];

export default function SocialProof() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentReview, setCurrentReview] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);

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

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
      emblaApi.plugins().autoplay?.reset();
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
      emblaApi.plugins().autoplay?.reset();
    }
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) {
      emblaApi.scrollTo(index);
      emblaApi.plugins().autoplay?.reset();
    }
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentReview(emblaApi.selectedScrollSnap());
  }, [emblaApi, setCurrentReview]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section ref={sectionRef} className="py-20 lg:py-32 relative overflow-hidden">
      <div className="w-full section-padding">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-ayn-teal font-semibold text-sm tracking-wider uppercase mb-4 block">
            Community
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-ayn-dark mb-6">
            Join the <span className="text-gradient">AYN Family</span>
          </h2>
          <p className="text-lg text-ayn-text-light">
            Thousands of athletes across India are already experiencing the AYN difference.
          </p>
        </div>

        {/* Stats Bar */}
        <div className={`flex flex-wrap justify-center gap-8 lg:gap-16 mb-16 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center">
            <span className="text-4xl lg:text-5xl font-black text-ayn-teal block">50,000+</span>
            <span className="text-ayn-text-light">Happy Customers</span>
          </div>
          <div className="text-center">
            <span className="text-4xl lg:text-5xl font-black text-ayn-coral block">4.9</span>
            <span className="text-ayn-text-light">Average Rating</span>
          </div>
          <div className="text-center">
            <span className="text-4xl lg:text-5xl font-black text-ayn-blue block">25,000+</span>
            <span className="text-ayn-text-light">Instagram Followers</span>
          </div>
        </div>

        {/* Reviews Carousel */}
        <div className={`mb-16 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-10 max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-ayn-dark">What Our Customers Say</h3>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={scrollPrev}
                  className="rounded-full"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={scrollNext}
                  className="rounded-full"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Review Card */}
            <div className="relative overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
              <div className="flex">
                {reviews.map((review, index) => (
                  <div
                    key={index}
                    className="flex-[0_0_100%] min-w-0 px-2"
                  >
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Avatar */}
                      <div className="flex-shrink-0">
                        <div className={`w-16 h-16 ${review.color} rounded-full flex items-center justify-center text-white text-xl font-bold`}>
                          {review.image}
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-bold text-ayn-dark">{review.name}</h4>
                          <span className="text-sm text-ayn-text-light">({review.age})</span>
                          {review.verified && (
                            <span className="flex items-center gap-1 text-xs bg-ayn-teal/10 text-ayn-teal px-2 py-0.5 rounded-full">
                              <Verified className="w-3 h-3" />
                              Verified
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-1 mb-3">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                          ))}
                          <span className="text-sm text-ayn-text-light ml-2">{review.product}</span>
                        </div>
                        
                        <p className="text-ayn-dark leading-relaxed">
                          "{review.text}"
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    currentReview === index ? 'bg-ayn-teal w-6' : 'bg-gray-200 hover:bg-ayn-teal/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Instagram Feed */}
        <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Instagram className="w-6 h-6 text-ayn-teal" />
              <h3 className="text-xl font-bold text-ayn-dark">@aynnutrition</h3>
            </div>
            <a 
              href="https://instagram.com/aynnutrition" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-ayn-teal font-semibold hover:underline"
            >
              Follow Us
            </a>
          </div>

          <div className="grid grid-cols-3 lg:grid-cols-6 gap-4">
            {instagramPosts.map((post) => (
              <div
                key={post.id}
                className="relative aspect-square bg-gradient-to-br from-ayn-teal/20 to-ayn-coral/20 rounded-xl overflow-hidden group cursor-pointer"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl">💪</span>
                </div>
                <div className="absolute inset-0 bg-ayn-dark/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="text-white text-center">
                    <span className="text-lg font-bold">{post.likes}</span>
                    <span className="block text-xs">likes</span>
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 right-2">
                  <span className="text-xs text-white/80 bg-ayn-dark/50 px-2 py-0.5 rounded">
                    {post.user}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-6">
            <p className="text-ayn-text-light text-sm">
              Share your AYN journey with <span className="text-ayn-teal font-semibold">#AYNNutrition</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
