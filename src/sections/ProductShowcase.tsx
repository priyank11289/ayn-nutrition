import { useState } from 'react';
import { Check, Info, ShoppingCart, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';
import { FadeIn } from '@/components/ui/FadeIn';


export default function ProductShowcase() {
  const navigate = useNavigate();
  const [selectedVariants, setSelectedVariants] = useState<Record<string, number>>({
    'junior-safe': 30,
    'hair-safe': 30,
    'pro-athlete': 30,
  });
  const { addToCart } = useCart();

  const handleVariantChange = (productId: string, servings: number) => {
    setSelectedVariants((prev) => ({ ...prev, [productId]: servings }));
  };

  const handleAddToCart = (product: typeof products[0]) => {
    const servings = selectedVariants[product.id];
    const variant = product.variants.find((v) => v.servings === servings);
    if (variant) {
      addToCart({
        id: product.id,
        name: product.name,
        variant: product.flavors[0],
        servings: variant.servings,
        price: variant.price,
        image: product.image,
      });
    }
  };

  return (
    <section id="products" className="py-20 lg:py-32 relative">
      <div className="w-full section-padding">
        {/* Section Header */}
        <FadeIn delay={0.1}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-ayn-teal font-semibold text-sm tracking-wider uppercase mb-4 block">
              Our Formulations
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-ayn-dark mb-6">
              Choose Your <span className="text-gradient">Advantage</span>
            </h2>
            <p className="text-lg text-ayn-text-light">
              Three scientifically-formulated creatine products, each designed for specific needs and goals.
            </p>
          </div>
        </FadeIn>

        {/* Products Grid */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {products.map((product, index) => (
            <FadeIn key={product.id} delay={0.1 + (index * 0.15)} className="h-full">
              <div
                onClick={() => navigate(`/product/${product.id}`)}
                className={`group relative bg-white rounded-3xl overflow-hidden border-2 cursor-pointer ${product.borderColor} 
                  hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col`}
              >
              {/* Badge */}
              <div className={`absolute top-4 left-4 z-10 ${product.accentColor} text-white text-xs font-bold px-3 py-1.5 rounded-full`}>
                {product.badge}
              </div>

              {/* Product Image */}
              <div className={`relative ${product.bgColor} p-8 flex items-center justify-center h-64`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-auto object-contain group-hover:scale-110 transition-transform duration-500"
                />
                {/* Quick ingredient preview on hover */}
                <div className="absolute inset-0 bg-ayn-dark/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6">
                  <div className="text-white text-center">
                    <p className="text-sm font-semibold mb-3">Key Ingredients</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {product.ingredients.slice(0, 4).map((ing, i) => (
                        <span key={i} className="text-xs bg-white/20 px-2 py-1 rounded">
                          {ing.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  {(() => {
                    const Icon = product.icon;
                    return <Icon className={`w-5 h-5 ${product.textColor}`} />;
                  })()}
                  <span className={`text-sm font-semibold ${product.textColor}`}>
                    {product.color === 'blue' ? 'Junior Formula' : product.color === 'emerald' ? 'Hair Protection' : 'Elite Performance'}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-ayn-dark mb-2">
                  {product.name}
                </h3>
                <p className="text-sm text-ayn-text-light mb-4">
                  {product.description}
                </p>

                {/* Benefits */}
                <div className="space-y-2 mb-6">
                  {product.benefits.slice(0, 3).map((benefit, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className={`w-4 h-4 ${product.textColor}`} />
                      <span className="text-sm text-ayn-dark">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Variant Selector */}
                <div className="mb-4">
                  <span className="text-sm text-ayn-text-light mb-2 block">Select Servings:</span>
                  <div className="flex gap-2">
                    {product.variants.map((variant) => (
                      <button
                        key={variant.servings}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleVariantChange(product.id, variant.servings);
                        }}
                        className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-all ${
                          selectedVariants[product.id] === variant.servings
                            ? `${product.accentColor} text-white`
                            : 'bg-gray-100 text-ayn-dark hover:bg-gray-200'
                        }`}
                      >
                        {variant.servings} Serv
                        <span className="block text-xs opacity-80">₹{variant.price}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between mt-auto pt-4">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-ayn-dark">
                        ₹{product.variants.find((v) => v.servings === selectedVariants[product.id])?.price}
                      </span>
                      <span className="text-sm text-gray-400 font-medium line-through">
                        ₹{product.variants.find((v) => v.servings === selectedVariants[product.id])?.originalPrice}
                      </span>
                    </div>
                    <span className="text-[10px] text-ayn-text-light font-bold uppercase block mt-0.5">
                      Incl. of all taxes
                    </span>
                    <span className="text-sm text-ayn-text-light block mt-0.5">
                      / {selectedVariants[product.id]} serv
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/product/${product.id}`);
                      }}
                      className="p-2 border-2 border-gray-200 rounded-lg hover:border-ayn-dark transition-colors flex items-center"
                    >
                      <Info className="w-5 h-5 text-ayn-dark" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                      className={`${product.accentColor} text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity`}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
            </FadeIn>
          ))}
        </div>

        {/* Bundle Card */}
        <FadeIn delay={0.3}>
          <div className="bg-gradient-to-r from-ayn-dark to-ayn-dark/90 rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-ayn-teal/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-ayn-coral/20 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-ayn-coral text-white text-sm font-bold px-4 py-1.5 rounded-full mb-4">
                  <Star className="w-4 h-4" />
                  Save 20%
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold mb-2">The Complete Stack</h3>
                <p className="text-white/70 max-w-md">
                  Get all three formulations and save. Perfect for households with multiple athletes or those who want to cycle between formulas.
                </p>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <span className="text-3xl font-black">₹4,999</span>
                  <span className="block text-sm text-white/60 line-through">₹6,197</span>
                </div>
                <button 
                  onClick={() => {
                    products.forEach((p) => handleAddToCart(p));
                  }}
                  className="btn-coral text-lg"
                >
                  Add Bundle
                </button>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
