import { useState, useEffect } from 'react';
import { Search, User, ShoppingCart, Menu } from 'lucide-react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useCart } from '@/context/CartContext';
import SearchModal from '@/components/SearchModal';

const navLinks = [
  { name: 'Shop Products', href: '#products' },
  { name: 'Formula Finder', href: '#quiz' },
  { name: 'The Science', href: '#science' },
  { name: 'Our Experts', href: '#experts' },
  { name: 'FAQ', href: '#faq' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);

    if (location.pathname !== '/') {
      navigate('/' + href);
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'glass-effect shadow-lg py-2'
          : 'bg-transparent py-3'
      }`}
    >
      <div className="w-full section-padding">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" onClick={() => window.scrollTo(0,0)} className="flex flex-col items-start group">
            <span className="text-2xl md:text-3xl font-black tracking-tight text-ayn-dark">
              AY<span className="text-ayn-teal relative">
                N
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-ayn-teal rounded-full"></span>
              </span>
            </span>
            <span className="text-[10px] md:text-xs tracking-[0.3em] text-ayn-dark/70 font-medium -mt-1">
              NUTRITION
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="text-sm font-medium text-ayn-dark/80 hover:text-ayn-teal transition-colors duration-300 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-ayn-teal transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center gap-3 md:gap-5">
            <button onClick={() => setIsSearchOpen(true)} className="p-2 hover:bg-ayn-dark/5 rounded-full transition-colors duration-300">
              <Search className="w-5 h-5 text-ayn-dark" />
            </button>
            <a 
              href="https://ayn-nutrition.myshopify.com/account/login"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-ayn-dark/5 rounded-full transition-colors duration-300 hidden sm:block"
            >
              <User className="w-5 h-5 text-ayn-dark" />
            </a>
            <button onClick={() => setIsCartOpen(true)} className="p-2 hover:bg-ayn-dark/5 rounded-full transition-colors duration-300 relative">
              <ShoppingCart className="w-5 h-5 text-ayn-dark" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-ayn-coral text-white text-xs font-bold rounded-full flex items-center justify-center animate-bounce">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <button className="p-2 hover:bg-ayn-dark/5 rounded-full transition-colors duration-300 lg:hidden">
                  <Menu className="w-6 h-6 text-ayn-dark" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-ayn-sand border-l border-ayn-dark/10">
                <div className="flex flex-col h-full pt-8">
                  <div className="flex flex-col items-start mb-8">
                    <span className="text-3xl font-black tracking-tight text-ayn-dark">
                      AY<span className="text-ayn-teal">N</span>
                    </span>
                    <span className="text-xs tracking-[0.3em] text-ayn-dark/70 font-medium">
                      NUTRITION
                    </span>
                  </div>
                  <nav className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                      <button
                        key={link.name}
                        onClick={() => scrollToSection(link.href)}
                        className="text-lg font-medium text-ayn-dark/80 hover:text-ayn-teal transition-colors duration-300 text-left py-2 border-b border-ayn-dark/10"
                      >
                        {link.name}
                      </button>
                    ))}
                  </nav>
                  <div className="mt-auto pb-8">
                    <p className="text-sm text-ayn-text-light">
                      Your Body. Your Formula. Your Best.
                    </p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}
