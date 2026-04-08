
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './sections/Header';
import Footer from './sections/Footer';
import StickyCart from './sections/StickyCart';
import { CartProvider } from './context/CartContext';
import { Toaster } from '@/components/ui/sonner';
import CookieConsent from './components/CookieConsent';
import { Home, ProductPage, CategoryPage, LegalPage } from './pages';

import AnnouncementBar from './components/AnnouncementBar';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="min-h-screen bg-ayn-sand flex flex-col">
          <AnnouncementBar />
          <StickyCart />
          <CookieConsent />
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products/:slug" element={<ProductPage />} />
              <Route path="/category/:slug" element={<CategoryPage />} />
              <Route path="/legal/:slug" element={<LegalPage />} />
            </Routes>
          </main>
          <Footer />
          <StickyCart />
          <Toaster 
            position="bottom-center" 
            richColors 
            toastOptions={{
              className: 'font-bold bg-white border-2 border-ayn-teal shadow-2xl scale-110 opacity-100',
              style: { opacity: 1, background: 'white' }
            }}
          />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
