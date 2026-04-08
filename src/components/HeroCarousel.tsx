import { useState, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const images = [
  {
    id: 1,
    url: '/images/hero-products.png',
    alt: "AYN Nutrition Specialized Creatine Range — India's First Personalized Creatine for Athletes",
  },
  {
    id: 2,
    url: '/images/Hair-Safe.png',
    alt: "AYN Hair Safe Creatine — Advanced DHT-Protection Formula for Hair-Conscious Gym-Goers",
  },
  {
    id: 3,
    url: '/images/Junior-Safe.png',
    alt: "AYN Junior Safe Creatine — Bone-Safe Supplement Formulated for Teen & Young Athletes",
  },
  {
    id: 4,
    url: '/images/Athletes.png',
    alt: "AYN Pro Athletes Creatine — High-Performance Triple-Blend Formula for Elite Muscle Gains",
  },
];

export function HeroCarousel() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
    const autoplay = emblaApi.plugins().autoplay;
    if (autoplay) autoplay.reset();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
    const autoplay = emblaApi.plugins().autoplay;
    if (autoplay) autoplay.reset();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
      const autoplay = emblaApi.plugins().autoplay;
      if (autoplay) autoplay.reset();
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative group overflow-hidden w-full h-full drop-shadow-2xl">
      <div className="w-full h-full overflow-hidden" ref={emblaRef}>
        <div className="flex h-full items-center">
          {images.map((image) => (
            <div key={image.id} className="relative flex-[0_0_100%] min-w-0 h-full flex items-center justify-center p-4 lg:p-6">
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-auto object-contain max-h-full drop-shadow-2xl"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/40 backdrop-blur-md text-ayn-dark shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/70"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/40 backdrop-blur-md text-ayn-dark shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/70"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Navigation Dots */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2 z-20 mb-4 pb-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === selectedIndex
                ? 'bg-ayn-teal w-6'
                : 'bg-ayn-teal/30 hover:bg-ayn-teal/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
