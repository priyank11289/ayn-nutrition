import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { legalData } from '@/data/legal';

export default function LegalPage() {
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    // Instant scroll to top
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    setTimeout(() => {
      document.documentElement.style.scrollBehavior = 'smooth';
    }, 50);
  }, [slug]);

  const page = slug ? legalData[slug] : null;

  if (!page) {
    return (
      <div className="min-h-screen pt-32 pb-16 px-6 text-center bg-ayn-sand animation-fade-in">
        <h1 className="text-4xl font-black text-ayn-dark mb-4">Page Not Found</h1>
        <p className="text-ayn-text-light mb-8">The document you are looking for does not exist.</p>
        <Link to="/" className="btn-primary">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-32 lg:pt-40 pb-20 animation-fade-in">
      <div className="container mx-auto px-6 max-w-3xl">
        <h1 className="text-3xl lg:text-5xl font-black text-ayn-dark mb-12 pb-6 border-b border-gray-100">
          {page.title}
        </h1>
        
        <div 
          className="text-ayn-text-light leading-relaxed 
                     [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-ayn-dark [&>h2]:mt-10 [&>h2]:mb-4
                     [&>p]:mb-6"
          dangerouslySetInnerHTML={{ __html: page.content }} 
        />
        
        <div className="mt-16 pt-8 border-t border-gray-100 text-center text-sm text-gray-400">
          Last updated: April 2026
        </div>
      </div>
    </div>
  );
}
