'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, Eye, ShoppingCart } from 'lucide-react';
import { useCart } from '@/lib/CartContext';

interface ProductCardProps {
  id: number;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
}

const ProductCard = ({ id, name, category, price, imageUrl }: ProductCardProps) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const validImageUrl = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl.replace(/^\/+/, '')}`;

  return (
    <div className="group relative flex flex-col bg-white overflow-hidden transition-all duration-700">
      {/* Container Image avec Link global sur l'image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-khaya-light flex items-center justify-center">
        <Link href={`/produit/${id}`} className="absolute inset-0 z-10">
          <span className="sr-only">Voir {name}</span>
        </Link>
        <Image
          src={validImageUrl}
          alt={name}
          fill
          style={{ objectFit: "cover" }}
          className="transition-transform duration-1000 ease-out group-hover:scale-110"
        />
        
        {/* Luxury Overlay */}
        <div className="absolute inset-0 bg-khaya-dark/0 group-hover:bg-khaya-dark/5 transition-colors duration-500" />

        {/* Action Menu minimaliste en bas */}
        <div className="absolute bottom-6 left-0 w-full px-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex justify-center space-x-2 z-30">
          <button 
            onClick={() => addToCart({ id, name, price, imageUrl })}
            className="flex-1 bg-khaya-dark text-white text-[9px] uppercase tracking-widest font-bold py-3 hover:bg-khaya-secondary transition-colors duration-300 flex items-center justify-center gap-2"
          >
            <ShoppingCart size={12} />
            Commander
          </button>
          <button 
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(id);
            }}
            className={`p-3 transition-colors duration-300 ${isInWishlist(id) ? 'bg-khaya-secondary text-khaya-dark' : 'bg-white text-khaya-dark hover:text-khaya-secondary'}`}
          >
            <Heart size={14} className={isInWishlist(id) ? 'fill-current' : ''} />
          </button>
        </div>
      </div>

      {/* Product Info - Minimalist & Centered */}
      <div className="pt-6 pb-2 text-center flex flex-col items-center">
        <span className="text-[9px] uppercase tracking-[0.3em] text-khaya-gray mb-2 font-medium">{category}</span>
        <h3 className="font-playfair text-lg text-khaya-dark group-hover:text-khaya-secondary transition-colors duration-300 mb-2">
          <Link href={`/produit/${id}`}>{name}</Link>
        </h3>
        <p className="font-sans text-sm font-light tracking-wide text-khaya-dark/80">
          {new Intl.NumberFormat('fr-FR').format(price)} <span className="text-[10px] text-khaya-secondary font-bold">FCFA</span>
        </p>
      </div>

      {/* Hover Line Decorative */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-khaya-secondary group-hover:w-1/2 transition-all duration-700" />
    </div>
  );
};

export default ProductCard;
