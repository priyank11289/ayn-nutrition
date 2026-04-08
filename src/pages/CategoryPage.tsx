import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { products, categories } from '../data/products';
import { SEO } from '../components/SEO';
import { FadeIn } from '../components/ui/FadeIn';
import { Check, ChevronRight } from 'lucide-react';

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const category = categories.find(c => c.slug === slug);
  const categoryProducts = products.filter(p => p.categoryId === category?.id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ayn-sand pt-32 animation-fade-in">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-ayn-dark mb-4">Category Not Found</h1>
          <Link to="/" className="btn-primary">Return Home</Link>
        </div>
      </div>
    );
  }

  const categoryUrl = `https://ayn-nutrition.vercel.app/category/${category.slug}`;

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
        "name": category.name,
        "item": categoryUrl
      }
    ]
  };

  return (
    <div className="bg-white min-h-screen pt-24 lg:pt-32 animation-fade-in">
      <SEO 
        title={`${category.name} — Specialized Performance Blends | AYN Nutrition`}
        description={category.description}
        url={categoryUrl}
        jsonLd={breadcrumbJsonLd}
      />

      <div className="container mx-auto px-6 max-w-7xl mb-12">
        <nav className="flex items-center gap-2 text-sm text-ayn-text-light font-medium mb-8">
          <Link to="/" className="hover:text-ayn-teal transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-ayn-dark">{category.name}</span>
        </nav>

        <header className="mb-16">
          <h1 className="text-4xl sm:text-5xl font-black text-ayn-dark mb-6">
            {category.name}
          </h1>
          <p className="text-xl text-ayn-text-light max-w-3xl leading-relaxed">
            {category.description}
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoryProducts.map((product, index) => (
            <FadeIn key={product.id} delay={index * 0.1}>
              <Link 
                to={`/products/${product.slug}`}
                className={`group block bg-white rounded-3xl overflow-hidden border-2 ${product.borderColor} hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col`}
              >
                <div className={`${product.bgColor} p-8 aspect-square flex items-center justify-center`}>
                  <img 
                    src={product.image} 
                    alt={`${product.name} - India's First Personalized Creatine`} 
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" 
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className={`text-xs font-bold ${product.textColor} mb-2 uppercase tracking-wider`}>
                    {product.badge}
                  </div>
                  <h3 className="text-2xl font-black text-ayn-dark mb-3 group-hover:text-ayn-teal transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-ayn-text-light text-sm mb-6 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="mt-auto space-y-2 mb-6">
                    {product.benefits.slice(0, 3).map((benefit, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Check className={`w-4 h-4 ${product.textColor}`} />
                        <span className="text-xs text-ayn-dark font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-xl font-black text-ayn-dark">
                      From ₹{product.variants[0].price}
                    </span>
                    <span className="text-sm font-bold text-ayn-teal flex items-center gap-1">
                      View Details <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
