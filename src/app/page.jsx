import Link from 'next/link';
import Button from '@/components/Button';
import FeaturedProducts from '@/components/FeaturedProducts';
import { products } from '@/constants/products';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Featured Category Grid (Moved to Top) */}
      <section className="py-24 bg-white border-b border-gray-100 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Pickles</h2>
              <p className="text-gray-500 text-lg">Explore our entire signature collection.</p>
            </div>
          </div>

          <FeaturedProducts />


        </div>
      </section>

      {/* Hero Section (Moved Down) */}
      <section className="relative flex flex-col items-center justify-center bg-white overflow-hidden py-24 border-b border-gray-100">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at top right, var(--primary) 0%, transparent 70%)' }}></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at bottom left, var(--accent) 0%, transparent 70%)' }}></div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
          <div className="inline-block px-4 py-1.5 rounded-full bg-red-50 text-primary font-semibold text-sm mb-8 border border-red-100 uppercase tracking-widest shadow-sm">
            Premium Homemade Quality
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-foreground tracking-tight leading-tight mb-8">
            Authentic Taste.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">Uncompromised Quality.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto font-light leading-relaxed">
            Discover our premium range of artisanal pickles. Crafted with traditional recipes, authentic spices, and 100% hygiene.
          </p>
        </div>
      </section>

      {/* Why Us Section (Footerish) */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-b from-amber-50/80 to-white text-foreground border-t border-amber-100/50">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-300 opacity-15 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary opacity-5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-sm font-bold tracking-widest text-amber-600 uppercase mb-3">Our Promise</h2>
            <h3 className="text-4xl md:text-5xl font-black mb-6 text-gray-900">Why Choose Us?</h3>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-amber-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Feature 1 */}
            <div className="group relative p-1 rounded-3xl bg-gradient-to-b from-amber-100 to-white hover:from-primary/30 hover:to-amber-200 transition-all duration-500 shadow-sm hover:shadow-xl">
              <div className="h-full w-full bg-white/90 backdrop-blur-sm rounded-[1.4rem] p-10 flex flex-col items-center text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 opacity-50 rounded-full blur-2xl group-hover:bg-primary/10 transition-all duration-500"></div>
                <div className="w-20 h-20 bg-gradient-to-br from-white to-amber-50 rounded-2xl flex items-center justify-center mb-8 shadow-[0_4px_20px_rgb(251,191,36,0.15)] border border-amber-100 group-hover:border-primary/40 transition-colors">
                  <span className="text-4xl">🛡️</span>
                </div>
                <h4 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-primary transition-colors">100% Hygiene</h4>
                <p className="text-gray-500 leading-relaxed font-light">Prepared in a strictly sterile environment ensuring the highest health and safety protocols.</p>
              </div>
            </div>

            {/* Feature 2 (The featured yellow card) */}
            <div className="group relative p-1 rounded-3xl bg-gradient-to-b from-amber-300 to-amber-100 hover:from-amber-400 hover:to-amber-500 transition-all duration-500 transform md:-translate-y-4 shadow-md hover:shadow-2xl hover:shadow-amber-500/30 cursor-pointer">
              <div className="h-full w-full bg-white/95 backdrop-blur-sm rounded-[1.4rem] p-10 flex flex-col items-center text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100 opacity-50 rounded-full blur-2xl group-hover:bg-amber-400/20 transition-all duration-500"></div>
                <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl flex items-center justify-center mb-8 shadow-[0_8px_30px_rgb(251,191,36,0.3)] border border-amber-300 group-hover:border-amber-400 transition-colors">
                  <span className="text-4xl">⭐</span>
                </div>
                <h4 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-amber-700 transition-colors">Premium Quality</h4>
                <p className="text-gray-600 leading-relaxed font-light">We source only the freshest, luxury-grade ingredients to craft our authentic, heritage recipes.</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative p-1 rounded-3xl bg-gradient-to-b from-amber-100 to-white hover:from-rose-200 hover:to-rose-300 transition-all duration-500 shadow-sm hover:shadow-xl">
              <div className="h-full w-full bg-white/90 backdrop-blur-sm rounded-[1.4rem] p-10 flex flex-col items-center text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 opacity-50 rounded-full blur-2xl group-hover:bg-rose-100 transition-all duration-500"></div>
                <div className="w-20 h-20 bg-gradient-to-br from-white to-amber-50 rounded-2xl flex items-center justify-center mb-8 shadow-[0_4px_20px_rgb(251,191,36,0.15)] border border-amber-100 group-hover:border-rose-300 transition-colors">
                  <span className="text-4xl">❤️</span>
                </div>
                <h4 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-rose-500 transition-colors">Crafted with Love</h4>
                <p className="text-gray-500 leading-relaxed font-light">Every jar is made with painstaking passion, bringing the nostalgic, familiar taste of home right to your table.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
