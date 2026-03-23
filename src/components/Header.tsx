'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Search, Menu, User, Heart, LogOut } from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import CartDrawer from './CartDrawer';
import WishlistDrawer from './WishlistDrawer';
import AuthModal from './AuthModal';
import { logout as serverLogout } from '@/app/auth-actions';

const Header = () => {
  const { cartCount, wishlist, user, logout } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const wishlistCount = wishlist.length;

  const handleLogout = async () => {
    await serverLogout();
    logout();
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-700">
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <WishlistDrawer isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      {/* Top Banner Prestige */}
      <div className="bg-gradient-to-r from-khaya-dark via-[#1a253a] to-khaya-dark text-[11px] tracking-[0.4em] uppercase py-3 text-center text-khaya-secondary font-black border-b border-khaya-secondary/20 shadow-lg">
        L'Excellence Ivoirienne — Livraison Prestige Offerte
      </div>

      <nav className="bg-white/95 backdrop-blur-2xl border-b-2 border-khaya-secondary/10 shadow-sm">
        <div className="container mx-auto px-6 h-16 lg:h-20 flex items-center justify-between">
          
          {/* Menu Mobile Button */}
          <button className="lg:hidden p-3 hover:bg-khaya-secondary/10 rounded-xl transition-all active:scale-90">
            <Menu size={24} strokeWidth={1.5} className="text-khaya-dark" />
          </button>

          {/* Desktop Nav Gauche */}
          <div className="hidden lg:flex items-center space-x-12">
            <Link href="/homme" className="nav-link-premium">Homme</Link>
            <Link href="/femme" className="nav-link-premium">Femme</Link>
          </div>

          {/* Logo Central Magnétique */}
          <Link href="/" className="group flex flex-col items-center justify-center transition-all duration-700 hover:scale-110">
            <div className="relative">
              <span className="font-playfair text-2xl lg:text-4xl font-black tracking-tighter text-khaya-dark leading-none uppercase">
                KHAYA <span className="text-khaya-secondary inline-block group-hover:rotate-12 transition-transform duration-500">PRIME</span>
              </span>
              <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-khaya-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center" />
            </div>
          </Link>

          {/* Desktop Nav Droite + Icons */}
          <div className="flex items-center space-x-4 lg:space-x-8">
            <div className="hidden lg:flex items-center space-x-12 mr-6">
              <Link href="/nouveautes" className="nav-link-premium !text-khaya-secondary border-b-2 border-khaya-secondary/30">Exclusivités</Link>
              <Link href="/contact" className="nav-link-premium">La Maison</Link>
            </div>
            
            <div className="flex items-center gap-1 lg:gap-3">
              <div className="hidden sm:flex items-center">
                {user ? (
                  <div className="flex items-center gap-3 bg-khaya-dark/5 px-4 py-2 rounded-full border border-khaya-secondary/20">
                    <span className="text-[10px] uppercase tracking-widest font-black text-khaya-dark">
                      {user.name.split(' ')[0]}
                    </span>
                    <button 
                      onClick={handleLogout}
                      className="text-khaya-gray hover:text-red-500 transition-colors"
                      title="Déconnexion"
                    >
                      <LogOut size={16} />
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => setIsAuthOpen(true)}
                    className="p-3 text-khaya-dark hover:text-khaya-secondary hover:bg-khaya-secondary/5 rounded-full transition-all duration-500"
                    aria-label="Mon Compte"
                  >
                    <User size={22} strokeWidth={1.5} />
                  </button>
                )}
              </div>
              <button className="p-3 text-khaya-dark hover:text-khaya-secondary hover:bg-khaya-secondary/5 rounded-full transition-all duration-500" aria-label="Recherche">
                <Search size={22} strokeWidth={1.5} />
              </button>
              <button 
                onClick={() => setIsWishlistOpen(true)}
                className="p-3 text-khaya-dark hover:text-khaya-secondary hover:bg-khaya-secondary/5 rounded-full transition-all duration-500 relative hidden sm:block" 
                aria-label="Favoris"
              >
                <Heart size={22} strokeWidth={1.5} />
                {wishlistCount > 0 && (
                  <span className="absolute top-2 right-2 w-5 h-5 bg-khaya-secondary text-khaya-dark text-[10px] flex items-center justify-center rounded-full font-black shadow-gold-glow border border-khaya-dark/10">
                    {wishlistCount}
                  </span>
                )}
              </button>
              <button 
                onClick={() => setIsCartOpen(true)}
                className="p-3 text-khaya-dark hover:text-khaya-secondary hover:bg-khaya-secondary/5 rounded-full transition-all duration-500 relative" 
                aria-label="Panier"
              >
                <ShoppingCart size={22} strokeWidth={1.5} />
                <span className="absolute top-2 right-2 w-5 h-5 bg-khaya-dark text-khaya-secondary text-[10px] flex items-center justify-center rounded-full font-black shadow-gold-glow border border-khaya-secondary/30">
                  {cartCount}
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
