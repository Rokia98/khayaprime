'use client';

import { useCart } from "@/lib/CartContext";
import { X, Heart, ShoppingBag, Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Product } from "@/types/Product";

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WishlistDrawer({ isOpen, onClose }: WishlistDrawerProps) {
  const { wishlist, toggleWishlist, addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && wishlist.length > 0) {
      setLoading(true);
      fetch(`/api/products/wishlist?ids=${wishlist.join(',')}`)
        .then(res => res.json())
        .then(data => {
          setProducts(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [isOpen, wishlist]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] overflow-hidden">
      <div className="absolute inset-0 bg-khaya-dark/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl animate-slide-in-right">
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="px-8 py-10 bg-khaya-secondary text-khaya-dark flex items-center justify-between">
              <div>
                <h2 className="font-playfair text-3xl font-black uppercase tracking-tighter italic">Coup de Cœur</h2>
                <p className="text-[10px] tracking-[0.4em] text-khaya-dark/60 uppercase mt-2 font-bold">{wishlist.length} ARTICLE(S) FAVORIS</p>
              </div>
              <button 
                onClick={onClose}
                className="p-3 hover:bg-khaya-dark/10 rounded-full transition-colors border border-khaya-dark/10"
              >
                <X size={24} />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 py-6 overflow-y-auto px-8 custom-scrollbar">
              {wishlist.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-8">
                  <div className="w-24 h-24 bg-khaya-light rounded-full flex items-center justify-center">
                    <Heart size={40} className="text-khaya-gray/30" />
                  </div>
                  <p className="font-playfair text-xl italic text-khaya-gray">Aucun coup de cœur n'a encore été décelé.</p>
                </div>
              ) : (
                <div className="space-y-8 pb-12">
                  {products.filter(p => wishlist.includes(p.id)).map((product) => (
                    <div key={product.id} className="flex gap-6 group relative">
                      <div className="relative w-24 aspect-[3/4] bg-khaya-light rounded-xl overflow-hidden shrink-0 shadow-sm border border-khaya-secondary/10">
                        <Image 
                          src={product.imageUrl.startsWith('/') ? product.imageUrl : `/${product.imageUrl}`} 
                          alt={product.name} 
                          fill 
                          className="object-cover group-hover:scale-110 transition-transform duration-700 font-bold"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="font-playfair text-lg font-bold text-khaya-dark leading-tight group-hover:text-khaya-secondary transition-colors uppercase tracking-tight">
                              {product.name}
                            </h3>
                            <button 
                                onClick={() => toggleWishlist(product.id)}
                                className="text-khaya-rose"
                            >
                                <Heart size={16} fill="currentColor" />
                            </button>
                          </div>
                          <p className="text-xs uppercase tracking-widest text-khaya-gray font-bold mt-1">{product.category}</p>
                          <p className="text-sm font-black text-khaya-dark mt-3">
                            {product.price.toLocaleString('fr-FR')} <span className="text-[10px] text-khaya-secondary">FCFA</span>
                          </p>
                        </div>
                        <div className="flex gap-3 mt-4">
                           <Link 
                             href={`/produit/${product.id}`}
                             onClick={onClose}
                             className="flex-1 h-10 border border-khaya-dark text-[9px] uppercase tracking-widest font-black flex items-center justify-center hover:bg-khaya-dark hover:text-white transition-all duration-300 rounded-lg"
                           >
                             Détails
                           </Link>
                           <button 
                             onClick={() => {
                               addToCart(product);
                               alert('Ajouté au panier !');
                             }}
                             className="h-10 px-4 bg-khaya-secondary text-khaya-dark flex items-center justify-center hover:bg-khaya-dark hover:text-white transition-all duration-300 rounded-lg"
                           >
                             <ShoppingBag size={14} />
                           </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
