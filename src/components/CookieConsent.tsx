import { useState, useEffect } from 'react';
import { initGA } from '@/lib/analytics';
import { ShieldCheck, X } from 'lucide-react';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('ayn_consent');
    if (consent === 'granted') {
      initGA();
    } else if (!consent) {
      // Small delay before showing banner for better UX
      const timer = setTimeout(() => setShowBanner(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (status: 'granted' | 'denied') => {
    localStorage.setItem('ayn_consent', status);
    setShowBanner(false);
    if (status === 'granted') {
      initGA();
    }
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:w-[400px] z-[9999] animation-slide-up">
      <div className="bg-white rounded-3xl shadow-2xl border-2 border-ayn-teal/20 p-6 md:p-8 relative overflow-hidden group">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-ayn-teal/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-700"></div>
        
        <button 
          onClick={() => setShowBanner(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-ayn-dark transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-ayn-teal/10 rounded-2xl flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-6 h-6 text-ayn-teal" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-ayn-dark mb-1">Privacy & Cookies</h3>
            <p className="text-xs text-ayn-text-light leading-relaxed">
              We use analytics to improve your experience. Choosing "Accept" helps us refine our personalized formulas. 
              <a href="/legal/privacy-policy" className="text-ayn-teal ml-1 hover:underline">Learn more</a>
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => handleConsent('granted')}
            className="flex-1 bg-ayn-teal text-white font-bold py-3 rounded-xl shadow-lg shadow-ayn-teal/20 hover:bg-ayn-teal/90 transition-all active:scale-95"
          >
            Accept
          </button>
          <button
            onClick={() => handleConsent('denied')}
            className="flex-1 bg-gray-50 text-ayn-dark font-bold py-3 rounded-xl hover:bg-gray-100 transition-all active:scale-95"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
