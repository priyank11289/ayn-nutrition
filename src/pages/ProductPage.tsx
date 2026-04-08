import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Check, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { SEO } from '../components/SEO';
import { trackProductView } from '../lib/analytics';

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = products.find(p => p.slug === slug);
  const { addToCart } = useCart();

  const [currentSlug, setCurrentSlug] = useState(slug);
  const [selectedServings, setSelectedServings] = useState<number>(() => {
    if (!product) return 30;
    return product.variants.some(v => v.servings === 30) ? 30 : product.variants[0].servings;
  });
  const [selectedFlavor, setSelectedFlavor] = useState<string>(() => {
    if (!product) return 'Unflavored';
    return product.flavors.includes('Unflavored') ? 'Unflavored' : product.flavors[0];
  });

  // Derived state to quickly reset on navigation without firing an effect after mount
  if (slug !== currentSlug) {
    setCurrentSlug(slug);
    if (product) {
      setSelectedServings(product.variants.some(v => v.servings === 30) ? 30 : product.variants[0].servings);
      setSelectedFlavor(product.flavors.includes('Unflavored') ? 'Unflavored' : product.flavors[0]);
    }
  }

  useEffect(() => {
    if (product) trackProductView(product);
    window.scrollTo(0, 0);
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ayn-sand pt-32 animation-fade-in">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-ayn-dark mb-4">Product Not Found</h1>
          <Link to="/" className="btn-primary">Return Home</Link>
        </div>
      </div>
    );
  }

  const currentVariant = product.variants.find(v => v.servings === selectedServings) || product.variants[0];

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      variant: selectedFlavor,
      servings: selectedServings,
      price: currentVariant.price,
      image: product.image,
    });
  };

  const productUrl = `https://ayn-nutrition.vercel.app/products/${product.slug}`;

  const productJsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": `https://ayn-nutrition.vercel.app${product.image}`,
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": "AYN Nutrition"
    },
    "offers": {
      "@type": "Offer",
      "url": productUrl,
      "priceCurrency": "INR",
      "price": currentVariant.price,
      "availability": "https://schema.org/InStock"
    }
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org/",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://ayn-nutrition.vercel.app/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Creatine",
        "item": "https://ayn-nutrition.vercel.app/category/creatine"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": product.name,
        "item": productUrl
      }
    ]
  };

  return (
    <div className="bg-white min-h-screen pt-24 lg:pt-32 animation-fade-in">
      <SEO 
        title={`${product.name} — ${product.badge} | AYN Nutrition`}
        description={product.longDescription.slice(0, 155)}
        image={`https://ayn-nutrition.vercel.app${product.image}`}
        url={productUrl}
        jsonLd={[productJsonLd, breadcrumbJsonLd]}
      />
      {/* Breadcrumb */}
      <div className="container mx-auto px-6 max-w-7xl mb-8">
        <nav className="flex items-center gap-2 text-sm text-ayn-text-light font-medium">
          <Link to="/" className="hover:text-ayn-teal transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-ayn-dark">{product.name}</span>
        </nav>
      </div>

      {/* Product Hero Section */}
      <section className="container mx-auto px-6 max-w-7xl mb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Image Side */}
          <div className="relative">
            <div className={`aspect-square sm:aspect-[4/3] lg:aspect-square flex items-center justify-center rounded-[2rem] p-12 ${product.bgColor} border-2 ${product.borderColor} sticky top-32`}>
              {/* Floating Element */}
              <div className={`absolute top-6 left-6 ${product.accentColor} text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg`}>
                {product.badge}
              </div>
              <img 
                src={product.image} 
                alt={`${product.name} - India's First Personalized Creatine`} 
                className="w-full h-full object-contain drop-shadow-2xl mix-blend-multiply" 
              />
            </div>
          </div>

          {/* Configuration Side */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl sm:text-5xl font-black text-ayn-dark mb-4 leading-tight">
              {product.name}
            </h1>
            <p className="text-xl text-ayn-teal font-medium mb-6">
              {product.description}
            </p>
            <p className="text-base text-ayn-text-light leading-relaxed mb-8">
              {product.longDescription}
            </p>

            {/* Flavors */}
            <div className="mb-8 border-t border-gray-100 pt-8">
              <span className="text-xs font-bold text-ayn-text-light tracking-wider uppercase block mb-4">
                Select Flavor
              </span>
              <div className="flex flex-wrap gap-3">
                {product.flavors.map(flavor => (
                  <button
                    key={flavor}
                    onClick={() => setSelectedFlavor(flavor)}
                    className={`px-5 py-3 rounded-xl border-2 font-bold text-sm transition-all ${
                      selectedFlavor === flavor 
                        ? `${product.accentColor} text-white shadow-md border-transparent` 
                        : 'border-transparent bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {flavor}
                  </button>
                ))}
              </div>
            </div>

            {/* Servings/Sizes */}
            <div className="mb-8 border-t border-gray-100 pt-8">
              <span className="text-xs font-bold text-ayn-text-light tracking-wider uppercase block mb-4">
                Select Size
              </span>
              <div className="flex flex-wrap gap-4">
                {product.variants.map(variant => (
                  <button
                    key={variant.servings}
                    onClick={() => setSelectedServings(variant.servings)}
                    className={`flex-1 min-w-[140px] px-6 py-4 rounded-xl border-2 text-left transition-all relative overflow-hidden ${
                      selectedServings === variant.servings 
                        ? `${product.accentColor} text-white shadow-md border-transparent` 
                        : 'border-transparent bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    {selectedServings === variant.servings && (
                      <div className={`absolute top-0 right-0 w-8 h-8 ${product.accentColor} rounded-bl-xl flex items-center justify-center`}>
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div className={`font-bold text-lg mb-1 ${selectedServings === variant.servings ? 'text-white' : 'text-gray-800'}`}>
                      {variant.servings} Servings
                    </div>
                    <div className={`text-xs font-medium ${selectedServings === variant.servings ? 'text-white/80' : 'text-gray-500'}`}>
                      ₹{variant.perServing.toFixed(2)} / serving
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Price & Add to Cart */}
            <div className="flex flex-col sm:flex-row items-center gap-6 mt-4">
              <div className="w-full sm:w-56 flex-shrink-0">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-black text-ayn-dark">
                    ₹{currentVariant.price.toLocaleString()}
                  </span>
                  {currentVariant.originalPrice && (
                    <span className="text-xl md:text-2xl text-gray-400 font-medium line-through">
                      ₹{currentVariant.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-ayn-text-light font-bold uppercase mt-1">
                  Incl. of all taxes
                </p>
              </div>
              <button
                onClick={handleAddToCart}
                className={`w-full flex-1 ${product.accentColor} text-white text-lg font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-3 hover:opacity-90 transition-all shadow-xl hover:-translate-y-1`}
              >
                <ShoppingCart className="w-6 h-6" />
                Add to Cart
              </button>
            </div>
            
            {/* Micro Trust Badges */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-100">
              <div className="text-center">
                <div className="text-2xl mb-2">🔬</div>
                <div className="text-xs font-semibold text-ayn-dark">Lab Tested</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🚚</div>
                <div className="text-xs font-semibold text-ayn-dark">Free Ship ₹999+</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🌿</div>
                <div className="text-xs font-semibold text-ayn-dark">100% Transparent</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits Grid */}
      <section className="bg-gray-50 py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-black text-ayn-dark">Key Benefits</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {product.benefits.map((benefit, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
                <div className={`w-16 h-16 mx-auto ${product.bgColor} ${product.textColor} flex items-center justify-center rounded-2xl mb-6 shadow-sm`}>
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-ayn-dark text-lg">{benefit}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supplement Facts */}
      <section className="py-24 border-b border-gray-100">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-black text-ayn-dark mb-4">Supplement Facts</h2>
            <p className="text-ayn-text-light">Serving Size: 1 Scoop | Servings Per Container: {selectedServings}</p>
          </div>
          
          <div className="border-[3px] border-ayn-dark p-6 lg:p-10 rounded-2xl bg-white shadow-xl">
            <h3 className="text-2xl font-black text-ayn-dark tracking-wide uppercase mb-2 border-b-4 border-ayn-dark pb-2">
              {product.name}
            </h3>
            
            <div className="flex justify-between font-bold text-sm border-b-2 border-ayn-dark py-2">
              <span>Amount Per Serving</span>
              <span>% Daily Value</span>
            </div>
            
            <div className="divide-y divide-gray-200">
              {product.ingredients.map((ing, i) => (
                <div key={i} className="flex justify-between py-3 text-sm lg:text-base">
                  <span className="font-semibold text-ayn-dark">{ing.name}</span>
                  <div className="text-right">
                    <span className="font-bold block">{ing.amount}</span>
                    <span className="text-xs text-ayn-text-light">{ing.benefit}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t-[3px] border-ayn-dark text-xs text-ayn-text-light">
              † Daily Value not established. Percent Daily Values are based on a 2,000 calorie diet.
            </div>
            <div className="mt-4 flex items-center justify-center gap-2 border-t border-gray-100 pt-4">
              <span className="text-[10px] font-bold text-ayn-dark uppercase tracking-widest border border-ayn-dark px-2 py-0.5 rounded">FSSAI</span>
              <span className="text-[10px] font-bold text-ayn-text-light">LIC NO: 100XXXXXXXXXXX</span>
            </div>
          </div>
        </div>
      </section>

      {/* Who is this for */}
      <section className="bg-ayn-dark text-white py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-black">Who is this for?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {product.whoIsThisFor?.map((who, i) => (
              <div key={i} className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                <div className="text-4xl mb-6">{who.icon}</div>
                <h3 className="text-lg font-bold mb-4 tracking-wider uppercase text-ayn-coral">{who.title}</h3>
                <p className="text-white/70 leading-relaxed text-sm lg:text-base">{who.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Science & How to use */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-16">
            
            <div className="lg:col-span-8 space-y-12">
              <h2 className="text-3xl lg:text-4xl font-black text-ayn-dark mb-8">The Science</h2>
              <div className="space-y-10">
                {product.science?.map((sci, i) => (
                  <div key={i} className="group">
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-3 border-b border-gray-100 pb-3">
                      <h3 className={`text-xl font-bold ${product.textColor}`}>{sci.name}</h3>
                      <span className="text-xs font-bold text-ayn-text-light tracking-widest uppercase">{sci.dose}</span>
                    </div>
                    <p className="text-ayn-text-light leading-relaxed mb-4">
                      {sci.mechanism}
                    </p>
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-sm italic text-gray-600">
                      <strong>Research:</strong> {sci.research}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 lg:pl-12 lg:border-l border-gray-100">
              <div className="sticky top-32">
                <h2 className="text-2xl font-black text-ayn-dark mb-8">How to Use</h2>
                <div className="space-y-8">
                  {product.howToUse?.map((step, i) => (
                    <div key={i} className="flex gap-6">
                      <div className={`text-3xl font-black ${product.textColor} opacity-20`}>{step.step}</div>
                      <div>
                        <h4 className="font-bold text-ayn-dark mb-2">{step.title}</h4>
                        <p className="text-sm text-ayn-text-light leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Explore Other Formulations */}
      <section className="bg-gray-50 py-24 border-t border-gray-100">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-black text-ayn-dark mb-4">Explore Other Formulations</h2>
            <p className="text-ayn-text-light">Discover the full purpose-built creatine range.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {products.filter(p => p.id !== product.id).map((otherProduct) => (
              <Link 
                key={otherProduct.id}
                to={`/products/${otherProduct.slug}`}
                className={`group flex items-center bg-white rounded-3xl overflow-hidden border-2 ${otherProduct.borderColor} hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              >
                <div className={`w-1/3 aspect-square ${otherProduct.bgColor} p-4 flex items-center justify-center`}>
                  <img 
                    src={otherProduct.image} 
                    alt={`${otherProduct.name} - India's First Personalized Creatine`} 
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" 
                  />
                </div>
                <div className="w-2/3 p-6">
                  <div className={`text-xs font-bold ${otherProduct.textColor} mb-2 uppercase tracking-wider`}>
                    {otherProduct.color === 'blue' ? 'Junior Formula' : otherProduct.color === 'emerald' ? 'Hair Protection' : 'Elite Performance'}
                  </div>
                  <h3 className="text-xl font-black text-ayn-dark mb-2 group-hover:text-ayn-teal transition-colors">
                    {otherProduct.name}
                  </h3>
                  <p className="text-sm text-ayn-text-light line-clamp-2 mb-4">
                    {otherProduct.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-bold text-ayn-dark">
                    View Details <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
