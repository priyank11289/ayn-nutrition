import { Mail, Phone, MapPin, CreditCard, Wallet } from 'lucide-react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';

const FacebookColor = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="#1877F2">
    <path d="M24 12.071C24 5.405 18.627 0 12 0S0 5.405 0 12.071C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.492h3.047V9.418c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.492h-2.796V24C19.612 23.094 24 18.1 24 12.071z" />
  </svg>
);

const InstagramColor = () => (
  <svg viewBox="0 0 24 24" width="24" height="24">
    <defs>
      <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#ffb13b" />
        <stop offset="25%" stopColor="#FFDC80" />
        <stop offset="50%" stopColor="#C13584" />
        <stop offset="100%" stopColor="#405DE6" />
      </linearGradient>
    </defs>
    <path fill="url(#ig-grad)" d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85s.01-3.58.07-4.85c.15-3.23 1.66-4.77 4.92-4.92C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.7.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.63 6.78 6.98 6.98 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c4.35-.2 6.78-2.63 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.63-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zm0 10.16A4 4 0 1 1 16 12a4 4 0 0 1-4 4zm6.41-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z" />
  </svg>
);

const XColor = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="#FFFFFF">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

const YouTubeColor = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="#FF0000">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const footerLinks = {
  shop: [
    { name: 'Junior Safe Creatine', href: '/products/junior-safe' },
    { name: 'Hair Safe Creatine', href: '/products/hair-safe' },
    { name: 'Pro Athletes Creatine', href: '/products/pro-athlete' },
    { name: 'Complete Stack', href: '/category/creatine' },
    { name: 'Subscriptions', href: '/#faq' },
  ],
  learn: [
    { name: 'The Science', href: '#science' },
    { name: 'Our Experts', href: '#experts' },
    { name: 'Blog', href: '#' },
    { name: 'FAQs', href: '#faq' },
    { name: 'Contact Us', href: '/legal/contact-us' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/legal/privacy-policy' },
    { name: 'Terms & Conditions', href: '/legal/terms-and-conditions' },
    { name: 'Shipping Policy', href: '/legal/shipping-policy' },
    { name: 'Return Policy', href: '/legal/refund-policy' },
    { name: 'Cookie Policy', href: '/legal/cookie-policy' },
  ],
};

const socialLinks = [
  { name: 'Instagram', icon: InstagramColor, href: 'https://instagram.com/aynnutrition' },
  { name: 'Facebook', icon: FacebookColor, href: 'https://facebook.com/aynnutrition' },
  { name: 'Twitter', icon: XColor, href: 'https://twitter.com/aynnutrition' },
  { name: 'YouTube', icon: YouTubeColor, href: 'https://youtube.com/aynnutrition' },
];

const paymentMethods = [
  { name: 'Razorpay', icon: CreditCard },
  { name: 'UPI', icon: Wallet },
  { name: 'Cards', icon: CreditCard },
];

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (href: string) => {
    if (href === '#') {
      toast.info('This page is coming soon!');
      return;
    }

    if (!href.startsWith('#')) {
      navigate(href);
      return;
    }

    if (location.pathname !== '/') {
      navigate('/' + href);
      return;
    }

    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-ayn-dark text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-ayn-teal/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-ayn-coral/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

      <div className="w-full section-padding relative z-10">
        {/* Main Footer Content */}
        <div className="pt-8 pb-4 lg:pt-10 lg:pb-6">
          <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-12 gap-4 lg:gap-6">
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-6 lg:col-span-4 lg:pr-12">
              <Link to="/" onClick={() => window.scrollTo(0, 0)} className="flex flex-col items-start mb-2">
                <span className="text-3xl font-black tracking-tight text-white">
                  AY<span className="text-ayn-teal">N</span>
                </span>
                <span className="text-xs tracking-[0.3em] text-white/60 font-medium -mt-1">
                  NUTRITION
                </span>
              </Link>
              <p className="text-white/60 text-sm mb-4 max-w-xs">
                India's first personalized creatine formulations. Science-backed, goal-specific nutrition for every athlete.
              </p>

              {/* Social Links */}
              <div className="flex gap-4 mt-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-110 transition-transform duration-300 transform"
                    aria-label={social.name}
                  >
                    <social.icon />
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Column */}
            <div className="col-span-2 md:col-span-2 lg:col-span-2">
              <h4 className="font-bold text-white mb-2">Contact Us</h4>
              <div className="space-y-3">
                <a href="mailto:support@aynnutrition.in" className="flex items-center gap-3 text-sm text-white/60 hover:text-ayn-teal transition-colors">
                  <Mail className="w-4 h-4" />
                  support@aynnutrition.in
                </a>
                <a href="tel:+919999999999" className="flex items-center gap-3 text-sm text-white/60 hover:text-ayn-teal transition-colors">
                  <Phone className="w-4 h-4" />
                  +91 99999 99999
                </a>
                <div className="flex items-start gap-3 text-sm text-white/60">
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  Mumbai, Maharashtra, India
                </div>
              </div>
            </div>

            {/* Shop Links */}
            <div className="col-span-1 md:col-span-1 lg:col-span-2">
              <h4 className="font-bold text-white mb-2">Shop</h4>
              <ul className="space-y-1">
                {footerLinks.shop.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-sm text-white/60 hover:text-ayn-teal transition-colors"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Learn Links */}
            <div className="col-span-1 md:col-span-1 lg:col-span-2">
              <h4 className="font-bold text-white mb-2">Learn</h4>
              <ul className="space-y-1">
                {footerLinks.learn.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-sm text-white/60 hover:text-ayn-teal transition-colors"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div className="col-span-2 md:col-span-2 lg:col-span-2">
              <h4 className="font-bold text-white mb-2">Legal</h4>
              <ul className="space-y-1">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-sm text-white/60 hover:text-ayn-teal transition-colors"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Regulatory Info */}
        <div className="border-t border-white/10 py-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-[10px] uppercase tracking-widest text-white/40 font-bold">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-ayn-teal"></span>
              FSSAI LIC NO: 100XXXXXXXXXXX
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-ayn-teal"></span>
              ISO 22000 CERTIFIED
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-ayn-teal"></span>
              GMP COMPLIANT FACILITY
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-3">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2">
            {/* Copyright */}
            <p className="text-sm text-white/40 text-center md:text-left">
              © 2026 AYN Nutrition (As You Need Nutrition). All rights reserved.
            </p>

            {/* Payment Methods */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-white/40">We accept:</span>
              <div className="flex gap-3">
                {paymentMethods.map((method) => (
                  <div
                    key={method.name}
                    className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded text-xs"
                    title={method.name}
                  >
                    <method.icon className="w-3.5 h-3.5" />
                    {method.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-white/10 py-2">
          <p className="text-[10px] text-white/30 text-center max-w-4xl mx-auto">
            These statements have not been evaluated by the Food Safety and Standards Authority of India.
            This product is not intended to diagnose, treat, cure, or prevent any disease.
            Results may vary from person to person. Consult your healthcare provider before starting any supplement regimen.
          </p>
        </div>
      </div>
    </footer>
  );
}
