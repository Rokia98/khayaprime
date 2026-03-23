'use client';

import { useCart } from "@/lib/CartContext";
import { X, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, removeFromCart, cartTotal, cartCount } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div 
        className="absolute inset-0 bg-khaya-dark/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl animate-slide-in-right">
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="px-8 py-10 bg-khaya-dark text-white flex items-center justify-between">
              <div>
                <h2 className="font-playfair text-3xl font-black uppercase tracking-tighter italic">Vôtre Panier</h2>
                <p className="text-[10px] tracking-[0.4em] text-khaya-secondary uppercase mt-2 font-bold">{cartCount} PIÈCE(S) SÉLECTIONNÉE(S)</p>
              </div>
              <button 
                onClick={onClose}
                className="p-3 hover:bg-white/10 rounded-full transition-colors border border-white/10"
              >
                <X size={24} />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 py-6 overflow-y-auto px-8 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-8">
                  <div className="w-24 h-24 bg-khaya-light rounded-full flex items-center justify-center">
                    <ShoppingBag size={40} className="text-khaya-gray/30" />
                  </div>
                  <p className="font-playfair text-xl italic text-khaya-gray">Votre panier est encore vierge de toute élégance.</p>
                  <button 
                    onClick={onClose}
                    className="btn-premium"
                  >
                    Explorer la collection
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-6 group">
                      <div className="relative w-24 aspect-[3/4] bg-khaya-light rounded-xl overflow-hidden shrink-0 shadow-sm">
                        <Image 
                          src={item.imageUrl.startsWith('/') ? item.imageUrl : `/${item.imageUrl}`} 
                          alt={item.name} 
                          fill 
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <Link href={`/produit/${item.id}`} onClick={onClose}>
                            <h3 className="font-playfair text-lg font-bold text-khaya-dark leading-tight group-hover:text-khaya-secondary transition-colors uppercase tracking-tight">
                              {item.name}
                            </h3>
                          </Link>
                          <p className="text-sm font-black text-khaya-dark mt-2">
                            {item.price.toLocaleString('fr-FR')} <span className="text-[10px] text-khaya-secondary">FCFA</span>
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-[10px] text-khaya-gray uppercase font-bold tracking-widest">Qté: {item.quantity}</p>
                            <Link 
                              href={`/produit/${item.id}`} 
                              onClick={onClose}
                              className="text-[9px] bg-khaya-dark text-white px-2 py-1 rounded-md hover:bg-khaya-secondary hover:text-khaya-dark transition-colors uppercase font-black"
                            >
                              Détails
                            </Link>
                          </div>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-[10px] text-red-500 uppercase tracking-widest font-black hover:text-red-700 transition-colors text-left flex items-center gap-2 mt-2"
                        >
                          <X size={12} /> RETIRER
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t border-khaya-light p-8 bg-khaya-light/30">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xs tracking-[0.4em] uppercase font-black text-khaya-gray">Total Estimé</span>
                  <span className="text-2xl font-black text-khaya-dark tracking-tighter">
                    {cartTotal.toLocaleString('fr-FR')} <span className="text-xs text-khaya-secondary">FCFA</span>
                  </span>
                </div>
                <Link 
                  href="/checkout"
                  onClick={onClose}
                  className="w-full btn-premium py-6 rounded-2xl flex items-center justify-center gap-4 group"
                >
                  <span>Finaliser la Commande</span>
                  <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </Link>
                <p className="text-[9px] text-center text-khaya-gray mt-6 uppercase tracking-[0.2em] font-medium leading-relaxed">
                  Vérifiez votre sélection et<br/>finalisez votre commande
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
