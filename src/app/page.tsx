import ProductCard from "@/components/ProductCard";
import { supabase } from "@/lib/supabase";
import { ChevronRight, Mail, MapPin, Phone, Star, Truck, Shield, RotateCcw, Sparkles, Crown, Gift } from "lucide-react";
import Link from "next/link";
import { Product } from "@/types/Product";

async function getLatestProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('Product')
      .select('id, name, price, imageUrl, category, gender, description, createdAt, updatedAt')
      .order('createdAt', { ascending: false })
      .limit(4);

    if (error) throw error;
    return (data || []) as Product[];
  } catch (error) {
    console.error("Impossible de récupérer les produits:", error);
    return []; // Retourner un tableau vide en cas d'erreur
  }
}

export default async function Home() {
  const latestProducts = await getLatestProducts();

  return (
    <main className="bg-white overflow-hidden">
      {/* Immersive Hero Section - EXCELLENCE & PRESTIGE */}
      <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-khaya-dark">
        {/* Dynamic Background */}
        <div className="absolute inset-0 z-0">
           <div className="absolute inset-0 bg-gradient-to-b from-khaya-dark/20 via-khaya-dark/60 to-khaya-dark z-10" />
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center scale-105 animate-slow-zoom opacity-40" />
        </div>
        
        {/* Floating Narrative Content */}
        <div className="relative z-10 container mx-auto px-8 flex flex-col items-center text-center">
          <div className="animate-reveal opacity-0" style={{ animationDelay: '200ms' }}>
            <span className="inline-block px-6 py-2 border border-khaya-secondary/30 rounded-full text-[12px] tracking-[0.4em] uppercase text-khaya-secondary font-bold mb-8 backdrop-blur-sm">
              Collection Privée 2026
            </span>
          </div>
          
          <h1 className="animate-reveal font-playfair text-7xl md:text-[140px] font-black text-white leading-[0.8] mb-8 opacity-0 uppercase tracking-tighter" style={{ animationDelay: '400ms' }}>
            KHAYA<br/>
            <span className="italic font-medium text-khaya-secondary/90 tracking-[-0.05em]">PRIME</span>
          </h1>
          
          <p className="animate-reveal text-lg md:text-xl text-khaya-gray/80 max-w-2xl mb-12 leading-relaxed font-sans font-light tracking-wide opacity-0" style={{ animationDelay: '600ms' }}>
            Découvrez l'élégance absolue. Une fusion magistrale entre l'héritage ivoirien et la haute couture contemporaine.
          </p>

          <div className="animate-reveal flex flex-col sm:flex-row gap-6 opacity-0" style={{ animationDelay: '800ms' }}>
            <Link href="/nouveautes" className="btn-premium group">
               <span>Explorer la Collection</span>
               <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Cinematic Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-6 z-20">
          <span className="text-[10px] tracking-[0.5em] uppercase text-khaya-secondary/60 animate-pulse">Découvrir l'univers</span>
          <div className="w-[1px] h-24 bg-gradient-to-b from-khaya-secondary to-transparent"></div>
        </div>
      </section>

      {/* Prestige Pillars Section */}
      <section className="py-32 bg-khaya-dark border-t border-white/5">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
             <div className="text-center md:text-left group cursor-default">
               <div className="text-khaya-secondary font-playfair text-4xl italic mb-4 transition-all group-hover:scale-110 group-hover:text-white origin-left duration-500">01.</div>
               <h3 className="text-white text-xs tracking-[0.3em] uppercase font-bold mb-3">Matières Nobles</h3>
               <p className="text-khaya-gray/60 text-sm leading-relaxed font-light uppercase tracking-widest">Sourcing exclusif & éthique</p>
             </div>
             <div className="text-center md:text-left group cursor-default">
               <div className="text-khaya-secondary font-playfair text-4xl italic mb-4 transition-all group-hover:scale-110 group-hover:text-white origin-left duration-500">02.</div>
               <h3 className="text-white text-xs tracking-[0.3em] uppercase font-bold mb-3">Main de Maître</h3>
               <p className="text-khaya-gray/60 text-sm leading-relaxed font-light uppercase tracking-widest">Savoir-faire artisanal ancestral</p>
             </div>
             <div className="text-center md:text-left group cursor-default">
               <div className="text-khaya-secondary font-playfair text-4xl italic mb-4 transition-all group-hover:scale-110 group-hover:text-white origin-left duration-500">03.</div>
               <h3 className="text-white text-xs tracking-[0.3em] uppercase font-bold mb-3">Vision Pan-Africaine</h3>
               <p className="text-khaya-gray/60 text-sm leading-relaxed font-light uppercase tracking-widest">Le luxe redéfini par Abidjan</p>
             </div>
             <div className="text-center md:text-left group cursor-default">
               <div className="text-khaya-secondary font-playfair text-4xl italic mb-4 transition-all group-hover:scale-110 group-hover:text-white origin-left duration-500">04.</div>
               <h3 className="text-white text-xs tracking-[0.3em] uppercase font-bold mb-3">Service Concierge</h3>
               <p className="text-khaya-gray/60 text-sm leading-relaxed font-light uppercase tracking-widest">L'exclusivité sur-mesure</p>
             </div>
          </div>
        </div>
      </section>

      
      {/* Curated Spotlight - Latest Items */}
      <section className="py-40 bg-khaya-light/50 relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-khaya-dark/5 -z-10" />
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {latestProducts.length > 0 ? (
              latestProducts.map((product) => (
                <div key={product.id} className="animate-reveal opacity-0" style={{ animationDelay: '100ms' }}>
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    category={product.category}
                    price={product.price}
                    imageUrl={product.imageUrl}
                  />
                </div>
              ))
            ) : (
              <div className="col-span-full py-24 text-center border-2 border-dashed border-khaya-secondary/20 rounded-[2rem]">
                <p className="text-khaya-gray font-playfair text-2xl italic">Curation en cours...</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter / Circle Privé Invitation */}
      <section className="py-56 bg-khaya-dark relative overflow-hidden">
        <div className="container mx-auto px-8 text-center max-w-4xl">
           <Crown size={40} strokeWidth={1} className="text-khaya-secondary mx-auto mb-12 opacity-50" />
           <h2 className="font-playfair text-4xl md:text-5xl text-white mb-8">Rejoindre la Maison Khaya</h2>
           <p className="text-khaya-gray text-sm tracking-widest leading-loose mb-16 uppercase italic">
             Soyez les premiers informés des ventes privées et des lancements de collections.
           </p>
           <form className="flex flex-col md:flex-row gap-4 border-b border-khaya-secondary/30 pb-4">
              <input 
                type="email" 
                placeholder="VOTRE ADRESSE E-MAIL" 
                className="bg-transparent text-white text-xs tracking-[0.3em] font-light flex-1 outline-none px-4 py-4 uppercase"
              />
              <button className="btn-luxury text-khaya-secondary border-none hover:text-white transition-colors">S'inscrire</button>
           </form>
        </div>
      </section>
    </main>
  );
}
     