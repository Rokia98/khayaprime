import ProductCard from "@/components/ProductCard";
import { supabase } from "@/lib/supabase";
import { Product } from "@/types/Product";

async function getHommeProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('Product')
      .select('id, name, price, imageUrl, category, gender')
      .eq('gender', 'homme')
      .order('createdAt', { ascending: false });

    if (error) throw error;
    return (data || []) as Product[];
  } catch (error) {
    console.error("Impossible de récupérer les produits pour homme:", error);
    return [];
  }
}

export default async function HommePage() {
  const products = await getHommeProducts();
  const categories = [...new Set(products.map(p => p.category))];

  return (
    <main className="bg-white pt-40 pb-32">
      <div className="container mx-auto px-8">
        {/* Prestige Category Header */}
        <header className="mb-32 text-center relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-20 opacity-5 select-none pointer-events-none">
            <h2 className="font-playfair text-[180px] font-black uppercase leading-none tracking-tighter">HOMME</h2>
          </div>
          <span className="text-xs tracking-[0.8em] uppercase text-khaya-secondary font-bold mb-8 block">Maison Khaya Prime</span>
          <h1 className="font-playfair text-6xl md:text-[100px] font-black text-khaya-dark mb-12 uppercase tracking-tighter italic">L'Audace Masculine</h1>
          <div className="w-24 h-1 bg-khaya-secondary mx-auto mb-12 shadow-gold-glow"></div>  
          <p className="text-lg text-khaya-gray max-w-2xl mx-auto font-light leading-relaxed">
            Allure architecturale et matières d'exception. Une collection pensée pour l'homme moderne qui allie force, prestige et vision.
          </p>
        </header>

        {categories.map(category => (
          <section key={category} className="mb-40">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-khaya-secondary/20 pb-8 gap-6">
              <div>
                <span className="text-[10px] tracking-[0.4em] uppercase text-khaya-secondary font-bold mb-2 block">Curation</span>
                <h2 className="font-playfair text-5xl text-khaya-dark capitalize italic font-black tracking-tight">{category}</h2>
              </div>
              <span className="text-xs tracking-[0.3em] uppercase text-khaya-gray font-medium bg-khaya-dark/5 px-4 py-2 rounded-full">
                {products.filter(p => p.category === category).length} Pièces Uniques
              </span>
            </div>
            
            <div className="grid grid-cols-1 gap-x-12 gap-y-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-2 sm:px-0">
              {products.filter(p => p.category === category).map((product) => (
                <div key={product.id} className="animate-reveal opacity-0" style={{ animationDelay: '100ms' }}>
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    category={product.category}
                    price={product.price}
                    imageUrl={product.imageUrl}
                  />
                </div>
              ))}
            </div>
          </section>
        ))}

        {products.length === 0 && (
          <div className="py-56 text-center border-2 border-dashed border-khaya-secondary/10 rounded-[3rem]">
            <p className="font-playfair text-4xl text-khaya-gray italic opacity-40">L'artisanat prend son temps. Revenez bientôt pour la collection...</p>
          </div>
        )}
      </div>
    </main>
  );
}
