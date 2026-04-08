import { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '@/data/products';
import { legalData } from '@/data/legal';
import { FileText } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const searchResults = query.trim() === '' ? [] : products.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) || 
    p.description.toLowerCase().includes(query.toLowerCase()) ||
    p.longDescription.toLowerCase().includes(query.toLowerCase()) ||
    p.benefits.some(b => b.toLowerCase().includes(query.toLowerCase()))
  );

  const legalResults = query.trim() === '' ? [] : Object.entries(legalData)
    .filter(([_, data]) => 
      data.title.toLowerCase().includes(query.toLowerCase()) || 
      data.content.toLowerCase().includes(query.toLowerCase())
    )
    .map(([slug, data]) => ({ slug, ...data }));

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-ayn-dark/40 backdrop-blur-sm z-[100]"
          />
          
          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
            className="fixed top-0 left-0 right-0 z-[101] p-4 md:p-8 flex justify-center pointer-events-none"
          >
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 w-full max-w-3xl overflow-hidden pointer-events-auto">
              {/* Search Header */}
              <div className="flex items-center px-6 py-5 border-b border-gray-100 relative">
                <Search className="w-7 h-7 text-ayn-light stroke-[3]" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search for supplements, formulas, or goals..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 ml-4 text-xl md:text-2xl outline-none placeholder:text-gray-300 text-ayn-dark font-medium bg-transparent"
                />
                
                {query && (
                  <button 
                    onClick={() => setQuery('')} 
                    className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors text-gray-400 mr-2"
                    title="Clear search"
                  >
                    <X className="w-4 h-4 text-ayn-dark" />
                  </button>
                )}
                
                <button 
                  onClick={onClose} 
                  className="p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors text-gray-400 hover:text-ayn-dark"
                  title="Close search"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Results Area */}
              {query && (
                <div className="max-h-[60vh] overflow-y-auto p-4 md:p-6 bg-gray-50/50">
                  {searchResults.length > 0 || legalResults.length > 0 ? (
                    <div className="space-y-6">
                      {searchResults.length > 0 && (
                        <div className="space-y-4">
                          <span className="text-xs font-bold text-ayn-text-light tracking-wider uppercase ml-2">
                            Products ({searchResults.length})
                          </span>
                          {searchResults.map((product) => (
                            <button
                              key={product.id}
                              onClick={() => {
                                onClose();
                                navigate(`/products/${product.slug}`);
                              }}
                              className="w-full text-left bg-white p-4 rounded-2xl flex items-center md:items-start gap-4 md:gap-6 shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-ayn-teal/30 group"
                            >
                              <div className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl ${product.bgColor} border border-gray-100 flex items-center justify-center flex-shrink-0`}>
                                <img src={product.image} alt={`${product.name} - India's First Personalized Creatine`} className="w-12 h-12 md:w-16 md:h-16 object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                              </div>
                              
                              <div className="flex-1 pt-1">
                                <h4 className="font-bold text-ayn-dark text-lg md:text-xl group-hover:text-ayn-teal transition-colors">{product.name}</h4>
                                <p className="text-sm text-ayn-text-light line-clamp-1 mt-1 mb-2">{product.description}</p>
                                <div className="flex flex-wrap gap-2">
                                  {product.benefits.slice(0, 2).map((b, i) => (
                                    <span key={i} className="text-[10px] uppercase font-bold text-ayn-text-light bg-gray-100 px-2 py-1 rounded-md">
                                      {b}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              
                              <div className="text-right flex flex-col items-end gap-2 pt-1 h-full">
                                <span className="font-black text-ayn-dark text-lg md:text-xl">₹{product.variants[0].price}</span>
                                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-ayn-teal text-gray-400 group-hover:text-white transition-colors mt-auto md:mt-2">
                                  <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}

                      {legalResults.length > 0 && (
                        <div className="space-y-4 border-t border-gray-200 pt-6">
                          <span className="text-xs font-bold text-ayn-text-light tracking-wider uppercase ml-2">
                            Help & Policies ({legalResults.length})
                          </span>
                          <div className="grid md:grid-cols-2 gap-4">
                            {legalResults.map((doc) => (
                              <button
                                key={doc.slug}
                                onClick={() => {
                                  onClose();
                                  navigate(`/legal/${doc.slug}`);
                                }}
                                className="w-full text-left bg-white p-4 rounded-xl flex items-center gap-4 shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-ayn-teal/30 group"
                              >
                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 group-hover:bg-ayn-teal/10 transition-colors">
                                  <FileText className="w-5 h-5 text-gray-400 group-hover:text-ayn-teal transition-colors" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-bold text-ayn-dark group-hover:text-ayn-teal transition-colors">{doc.title}</h4>
                                </div>
                                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-ayn-teal transition-colors group-hover:translate-x-1" />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="py-16 text-center text-ayn-text-light flex flex-col items-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <Search className="w-8 h-8 text-gray-300" />
                      </div>
                      <p className="text-xl font-semibold text-ayn-dark mb-2">No results found</p>
                      <p className="text-sm">We couldn't find anything matching "{query}".</p>
                      <p className="text-sm mt-1">Try searching for terms like "junior", "shipping", or "refund".</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
