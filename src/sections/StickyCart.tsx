import { ShoppingCart, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { toast } from 'sonner';
import { trackBeginCheckout, trackPurchase } from '@/lib/analytics';

export default function StickyCart() {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart, isCartOpen, setIsCartOpen } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    
    setIsCheckingOut(true);

    // Track begin checkout
    trackBeginCheckout(items, totalPrice);
    
    // Simulate Shopify connection sequence
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsCheckingOut(false);
    
    // For demo purposes, we'll track a purchase event here
    trackPurchase(items, totalPrice, `MOCK-${Date.now()}`);
    
    toast.success('Shopify checkout flow will mount here!', { duration: 4000 });
  };

  return (
    <>
      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent side="right" className="w-full sm:w-[400px] bg-white z-50">
          <SheetHeader>
            <SheetTitle className="text-xl font-bold text-ayn-dark flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Your Cart ({totalItems})
            </SheetTitle>
          </SheetHeader>
          
          <div className="flex flex-col h-[calc(100vh-100px)] px-6 py-4">
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <ShoppingCart className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-ayn-dark mb-2">Your cart is empty</h3>
                <p className="text-sm text-ayn-text-light mb-4">
                  Add some products to get started
                </p>
                <button 
                  onClick={() => {
                    setIsCartOpen(false);
                    if (location.pathname !== '/') {
                      navigate('/#products');
                    } else {
                      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }} 
                  className="btn-primary"
                >
                  Browse Products
                </button>
              </div>
            ) : (
              <>
                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto space-y-4 pr-2 -mr-2">
                  {items.map((item) => (
                    <div
                      key={`${item.id}-${item.servings}`}
                      className="flex gap-4 bg-gray-50 p-4 rounded-xl"
                    >
                      <img
                        src={item.image}
                        alt={`${item.name} - India's First Personalized Creatine`}
                        className="w-20 h-20 object-contain bg-white rounded-lg mix-blend-multiply"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-ayn-dark text-sm">{item.name}</h4>
                        <p className="text-xs text-ayn-text-light">
                          {item.variant} • {item.servings} servings
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.variant, item.servings, item.quantity - 1)}
                              className="w-6 h-6 bg-white rounded flex items-center justify-center hover:bg-gray-200 transition-colors shadow-xs border border-gray-100"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm font-medium w-6 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.variant, item.servings, item.quantity + 1)}
                              className="w-6 h-6 bg-white rounded flex items-center justify-center hover:bg-gray-200 transition-colors shadow-xs border border-gray-100"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="font-bold text-ayn-dark">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id, item.variant, item.servings)}
                        className="text-gray-400 hover:text-ayn-coral transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Cart Summary */}
                <div className="border-t border-gray-200 pt-6 mt-4">
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-ayn-text-light">Subtotal</span>
                      <span className="font-medium">₹{totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-ayn-text-light">Shipping</span>
                      <span className="font-medium text-green-600">
                        {totalPrice >= 999 ? 'Free' : '₹99'}
                      </span>
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-3">
                      <span>Total</span>
                      <span>₹{(totalPrice >= 999 ? totalPrice : totalPrice + 99).toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-75"
                  >
                    {isCheckingOut ? (
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Proceed to Checkout
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                  
                  <p className="text-xs text-ayn-text-light text-center mt-4">
                    Free shipping on orders above ₹999
                  </p>
                </div>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
