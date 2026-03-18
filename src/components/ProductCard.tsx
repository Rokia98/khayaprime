import Image from 'next/image';
import Link from 'next/link';
import { Heart, Eye, ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  id: number;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
}

const ProductCard = ({ id, name, category, price, imageUrl }: ProductCardProps) => {
  // Assurer un chemin d'image valide
  const validImageUrl = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl.replace(/^\/+/, '')}`;

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-khaya-light">
      {/* Image Container */}
      <div className="relative h-80 overflow-hidden rounded-t-2xl">
        <Image
          src={validImageUrl}
          alt={name}
          fill
          style={{objectFit: "cover"}}
          className="transition-transform duration-700 ease-out group-hover:scale-110"
        />
        
        {/* Overlay au hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Actions flottantes */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2 transform translate-x-12 group-hover:translate-x-0 transition-transform duration-500">
          <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-300">
            <Heart size={16} className="text-khaya-gray hover:text-khaya-rose" />
          </button>
          <Link href={`/produit/${id}`} className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-300">
            <Eye size={16} className="text-khaya-gray hover:text-khaya-primary" />
          </Link>
        </div>

        {/* Badge catégorie */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-khaya-secondary/90 backdrop-blur-sm text-khaya-primary text-xs font-semibold uppercase tracking-wide rounded-full">
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <Link href={`/produit/${id}`}>
          <h3 className="font-playfair text-lg font-semibold text-khaya-primary group-hover:text-khaya-secondary transition-colors duration-300 mb-2 line-clamp-2">
            {name}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-khaya-gray text-sm uppercase tracking-wide mb-1">{category}</p>
            <p className="text-xl font-bold text-khaya-primary">{price.toLocaleString('fr-FR')} <span className="text-sm font-normal text-khaya-gray">FCFA</span></p>
          </div>
          
          {/* Bouton d'achat rapide */}
          <button className="w-12 h-12 bg-gradient-to-r from-khaya-secondary to-khaya-gold rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 opacity-0 group-hover:opacity-100">
            <ShoppingCart size={18} className="text-white" />
          </button>
        </div>
      </div>

      {/* Barre de progression au hover */}
      <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-khaya-secondary to-khaya-gold group-hover:w-full transition-all duration-700"></div>
    </div>
  );
};

export default ProductCard;
