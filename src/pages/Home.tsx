
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../sections/Hero';
import ProblemSolution from '../sections/ProblemSolution';
import ProductShowcase from '../sections/ProductShowcase';
import QuizWidget from '../sections/QuizWidget';
import ScienceSection from '../sections/ScienceSection';
import ExpertPanel from '../sections/ExpertPanel';
import HowItWorks from '../sections/HowItWorks';
import SocialProof from '../sections/SocialProof';
import FAQ from '../sections/FAQ';
import Newsletter from '../sections/Newsletter';

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }, 100);
    }
  }, [location]);

  return (
    <>
      <Hero />
      <ProblemSolution />
      <ProductShowcase />
      <QuizWidget />
      <ScienceSection />
      <ExpertPanel />
      <HowItWorks />
      <SocialProof />
      <FAQ />
      <Newsletter />
    </>
  );
}
