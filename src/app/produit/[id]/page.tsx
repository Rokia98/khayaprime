import React from "react";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductOrderForm from "@/components/ProductOrderForm"; // Importer le nouveau composant
import { Share2, Star, Truck, Package, Shield, ChevronRight, Phone } from "lucide-react";
import AddReviewForm from "@/components/AddReviewForm";

type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string | null;
  category: string;
  gender: 'homme' | 'femme';
};

type Review = {
  id: number;
  rating: number;
  author: string;
  comment: string | null;
  createdAt: string;
};

async function getProductById(id: number): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from('Product')
      .select('id, name, price, imageUrl, description, category, gender')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as Product | null;
  } catch (error) {
    console.error(`Impossible de récupérer le produit avec l'ID ${id}:`, error);
    return null;
  }
}

async function getReviewsByProductId(productId: number): Promise<Review[]> {
  try {
    const { data, error } = await supabase
      .from('Review')
      .select('id, rating, author, comment, createdAt')
      .eq('productId', productId)
      .order('createdAt', { ascending: false });

    if (error) throw error;

    return (data || []).map((review: any): Review => ({
      ...review,
      createdAt: new Date(review.createdAt).toLocaleDateString('fr-FR', {
        day: 'numeric', month: 'long', year: 'numeric'
      })
    }));
  } catch (error) {
    console.error('Impossible de récupérer les avis:', error);
    return [];
  }
}

async function getSimilarProducts(productId: number, category: string, gender: 'homme' | 'femme'): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('Product')
      .select('id, name, price, imageUrl, category, gender')
      .eq('category', category)
      .eq('gender', gender)
      .neq('id', productId)
      .limit(4);

    if (error) throw error;
    return (data || []) as Product[];
  } catch (error) {
    console.error('Impossible de récupérer les produits similaires:', error);
    return [];
  }
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const productId = parseInt(resolvedParams.id);
  
  if (isNaN(productId)) {
    notFound();
  }

  const product = await getProductById(productId);

  if (!product) {
    notFound();
  }

  const reviews = await getReviewsByProductId(productId);
  const similarProducts = await getSimilarProducts(product.id, product.category, product.gender);
  
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0 
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews 
    : 0;
  
  const breadcrumbItems = [
    { label: 'Accueil', href: '/' },
    { label: product.gender === 'homme' ? 'Homme' : 'Femme', href: `/${product.gender}` },
    { label: product.category, href: `/${product.gender}?category=${product.category}` },
    { label: product.name, href: `/produit/${product.id}` }
  ];

  return (
    <main className="bg-white pt-24 pb-20 animate-fade-in-up">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-10 overflow-hidden">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start">
          {/* --- COLONNE IMAGE : GALERIE IMMERSIVE --- */}
          <div className="relative group aspect-[1/1.2] w-full bg-khaya-dark/5 overflow-hidden rounded-[2rem] shadow-premium-card">
            <Image
              src={product.imageUrl.startsWith('/') ? product.imageUrl : `/${product.imageUrl.replace(/^\/+/, '')}`}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1"
            />
            <div className="absolute top-8 left-8">
              <span className="bg-khaya-dark/90 backdrop-blur-md text-khaya-secondary text-xs tracking-luxury font-black uppercase px-6 py-2.5 rounded-full border border-khaya-secondary/30 shadow-gold-glow">
                PIÈCE MAITRESSE
              </span>
            </div>
            {/* Overlay Gradient pour le prestige */}
            <div className="absolute inset-0 bg-gradient-to-t from-khaya-dark/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          </div>

          {/* --- COLONNE INFOS : HAUTE COUTURE UI --- */}
          <div className="flex flex-col">
            <div className="border-b-3 border-khaya-dark pb-8 mb-8 relative">
              <p className="text-sm tracking-luxury uppercase text-khaya-secondary font-black mb-4 flex items-center gap-3">
                <span className="w-12 h-[2px] bg-khaya-secondary"></span>
                {product.category}
              </p>
              <h1 className="font-playfair text-5xl lg:text-7xl font-black text-khaya-dark mb-6 leading-[0.9] uppercase tracking-tighter italic">
                {product.name}
              </h1>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className={`${i < Math.round(averageRating) ? 'text-khaya-secondary fill-current' : 'text-khaya-gray/20'}`} />
                    ))}
                  </div>
                  <span className="text-xs tracking-widest uppercase text-khaya-gray font-bold border-l-2 border-khaya-secondary/20 pl-6">
                    {totalReviews > 0 ? `${totalReviews} Témoignages` : 'Nouveauté Absolue'}
                  </span>
                </div>
                
                <p className="font-sans text-4xl font-black text-khaya-dark tracking-tighter">
                  {product.price.toLocaleString('fr-FR')} <span className="text-sm font-bold text-khaya-secondary uppercase align-top mt-2 inline-block">FCFA</span>
                </p>
              </div>

              {/* Share float button */}
              <button className="absolute -top-4 -right-4 p-4 bg-white shadow-luxury rounded-full text-khaya-dark hover:bg-khaya-dark hover:text-white transition-all duration-500 hover:rotate-12 border border-khaya-secondary/10">
                <Share2 size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Formulaire de commande MAJESTUEUX */}
            <div className="luxe-order-container relative">
              <div className="absolute -left-6 top-0 h-full w-1 bg-gradient-to-b from-khaya-secondary via-transparent to-transparent opacity-30"></div>
              <ProductOrderForm 
                productId={product.id} 
                productName={product.name} 
                productPrice={product.price}
                productImage={product.imageUrl}
              />
            </div>

            {/* Trust Signals modernisés */}
            <div className="grid grid-cols-2 gap-6 mt-12 py-10 border-t-2 border-khaya-dark/5 bg-khaya-light/30 rounded-3xl px-8">
               <div className="flex items-center space-x-5 group/icon">
                 <div className="p-4 bg-white rounded-2xl shadow-sm group-hover/icon:shadow-gold-glow transition-all duration-500 -rotate-3 group-hover/icon:rotate-0">
                    <Truck size={24} className="text-khaya-secondary" />
                 </div>
                 <div>
                   <span className="block text-xs uppercase tracking-luxury text-khaya-dark font-black">Livraison Sans Faille</span>
                   <span className="text-[10px] text-khaya-gray font-medium uppercase">Prestige sous 24h</span>
                 </div>
               </div>
               <div className="flex items-center space-x-5 group/icon">
                 <div className="p-4 bg-white rounded-2xl shadow-sm group-hover/icon:shadow-gold-glow transition-all duration-500 rotate-6 group-hover/icon:rotate-0">
                    <Phone size={24} className="text-khaya-secondary" />
                 </div>
                 <div>
                   <span className="block text-xs uppercase tracking-luxury text-khaya-dark font-black">Conciergerie Dédiée</span>
                   <span className="text-[10px] text-khaya-gray font-medium uppercase">01 00 53 39 49</span>
                 </div>
               </div>
            </div>
          </div>
        </div>

        {/* --- PRODUITS SIMILAIRES : CARROUSEL PRESTIGE --- */}
        {similarProducts.length > 0 && (
          <div className="mt-40 border-t-2 border-khaya-dark/5 pt-32">
            <div className="flex flex-col items-center mb-24 text-center space-y-6">
               <div className="w-24 h-1 bg-khaya-secondary mx-auto shadow-gold-glow"></div>
              <span className="text-xs tracking-[0.5em] uppercase text-khaya-secondary font-black">L'Univers Khaya Prime</span>
              <h2 className="font-playfair text-5xl md:text-[80px] font-black text-khaya-dark uppercase italic tracking-tighter leading-none">Compléments d'Allure</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-24">
              {similarProducts.map((p) => (
                <div key={p.id} className="animate-reveal opacity-0" style={{ animationDelay: '100ms' }}>
                  <ProductCard
                    id={p.id}
                    name={p.name}
                    category={p.category}
                    price={p.price}
                    imageUrl={p.imageUrl}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- SECTION AVIS : CERCLE PRIVÉ --- */}
        <div className="mt-48">
          <div className="lg:col-span-12 bg-khaya-dark p-8 md:p-16 rounded-[3rem] shadow-premium-card relative overflow-hidden group/avis">
            <div className="absolute top-0 right-0 w-64 h-64 bg-khaya-secondary/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover/avis:bg-khaya-secondary/10 transition-colors duration-1000"></div>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 relative z-10 gap-8">
              <h3 className="font-playfair text-4xl font-black text-white uppercase tracking-tighter leading-none">
                Cercle Privé <span className="text-khaya-secondary italic text-2xl block md:inline md:ml-4">Avis Clients</span>
              </h3>
              <div className="flex items-center gap-6 bg-white/5 px-8 py-4 rounded-[2rem] border border-white/10 backdrop-blur-sm">
                <span className="text-4xl font-black text-khaya-secondary leading-none">{averageRating.toFixed(1)}</span>
                <div className="h-10 w-[1px] bg-white/10 mx-2"></div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-bold">Prestige Score</span>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={8} className="text-khaya-secondary fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start relative z-10">
              {/* Liste des avis condensée */}
              <div className="space-y-8 max-h-[500px] overflow-y-auto pr-6 custom-scrollbar">
                {totalReviews > 0 ? (
                  reviews.slice(0, 4).map((review) => (
                    <div key={review.id} className="bg-white/5 p-8 rounded-3xl border border-white/5 hover:border-khaya-secondary/30 transition-all duration-700 hover:-translate-y-1">
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-xs text-khaya-secondary font-black tracking-[0.2em] uppercase">{review.author}</p>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={10} className={`${i < review.rating ? 'text-khaya-secondary fill-current' : 'text-white/10'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-white/80 text-lg font-light leading-relaxed italic">"{review.comment}"</p>
                      <p className="text-[10px] text-white/20 uppercase tracking-[0.4em] font-medium mt-6">{review.createdAt}</p>
                    </div>
                  ))
                ) : (
                  <div className="py-24 text-center border border-white/5 rounded-3xl">
                    <p className="text-lg text-white/30 italic font-light">Soyez le premier à rejoindre le cercle de nos ambassadeurs.</p>
                  </div>
                )}
              </div>

              {/* Formulaire compacté avec design rehaussé */}
              <div className="bg-white/5 p-10 rounded-[2.5rem] border border-white/10 backdrop-blur-md relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Share2 size={40} className="text-white" />
                 </div>
                 <p className="text-sm text-white/80 uppercase tracking-[0.4em] mb-10 font-black text-center border-b border-white/10 pb-6">Partager votre expérience</p>
                 <AddReviewForm productId={product.id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
    
    


