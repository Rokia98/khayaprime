'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Search, Menu, User, Heart, LogOut, X, ChevronRight } from 'lucide-react';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
      
      {/* Menu Mobile - Overlay & Panel */}
      <div className={`fixed inset-0 z-[100] transition-all duration-700 ${isMobileMenuOpen ? 'visible' : 'invisible'}`}>
        {/* Overlay flouté */}
        <div 
          className={`absolute inset-0 bg-khaya-dark/60 backdrop-blur-md transition-opacity duration-700 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Panneau de menu */}
        <div className={`absolute left-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-700 ease-luxury ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex flex-col h-full">
            {/* Header Menu Mobile */}
            <div className="p-6 border-b border-khaya-secondary/10 flex items-center justify-between bg-khaya-dark">
              <span className="font-playfair text-xl font-black text-white italic">
                Menu <span className="text-khaya-secondary">Khaya</span>
              </span>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 bg-white/10 text-white rounded-full hover:bg-khaya-secondary hover:text-khaya-dark transition-all duration-500"
              >
                <X size={20} />
              </button>
            </div>

            {/* Liens de navigation */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8 mt-4">
              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-khaya-secondary border-b border-khaya-secondary/20 pb-2">Collections</p>
                <Link 
                  href="/homme" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between text-2xl font-playfair font-black text-khaya-dark hover:text-khaya-secondary transition-colors"
                >
                  Homme <ChevronRight size={18} className="text-khaya-secondary/50" />
                </Link>
                <Link 
                  href="/femme" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between text-2xl font-playfair font-black text-khaya-dark hover:text-khaya-secondary transition-colors"
                >
                  Femme <ChevronRight size={18} className="text-khaya-secondary/50" />
                </Link>
                <Link 
                  href="/nouveautes" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between text-2xl font-playfair font-black text-khaya-secondary hover:text-khaya-dark transition-colors"
                >
                  Exclusivités <ChevronRight size={18} className="opacity-50" />
                </Link>
              </div>

              <div className="space-y-4 pt-8">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-khaya-secondary border-b border-khaya-secondary/20 pb-2">Information</p>
                <Link 
                  href="/contact" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between text-xl font-playfair italic text-khaya-dark/70 hover:text-khaya-dark transition-colors"
                >
                  La Maison <ChevronRight size={16} />
                </Link>
                {user && (
                    <button 
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-3 text-red-500 font-bold pt-4"
                    >
                      <LogOut size={18} /> Déconnexion
                    </button>
                )}
              </div>
            </div>

            {/* Footer Menu Mobile */}
            <div className="p-8 border-t border-khaya-secondary/10 bg-khaya-light/30">
              <div className="flex flex-col gap-4 text-center">
                <p className="text-[10px] tracking-[0.2em] uppercase font-bold text-khaya-gray">Expertise & Prestige local</p>
                <div className="flex justify-center gap-6">
                  <button onClick={() => { setIsWishlistOpen(true); setIsMobileMenuOpen(false); }} className="p-3 bg-white shadow-luxury rounded-full relative">
                    <Heart size={20} className="text-khaya-dark" />
                    {wishlistCount > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-khaya-secondary text-khaya-dark text-[10px] flex items-center justify-center rounded-full font-black">{wishlistCount}</span>}
                  </button>
                  {!user && (
                    <button onClick={() => { setIsAuthOpen(true); setIsMobileMenuOpen(false); }} className="p-3 bg-white shadow-luxury rounded-full">
                      <User size={20} className="text-khaya-dark" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Banner Prestige */}
      <div className="bg-gradient-to-r from-khaya-dark via-[#1a253a] to-khaya-dark text-[11px] tracking-[0.4em] uppercase py-3 text-center text-khaya-secondary font-black border-b border-khaya-secondary/20 shadow-lg">
        L'Excellence Ivoirienne — Livraison Prestige Offerte
      </div>

      <nav className="bg-white/95 backdrop-blur-2xl border-b-2 border-khaya-secondary/10 shadow-sm">
        <div className="container mx-auto px-6 h-16 lg:h-20 flex items-center justify-between">
          
          {/* Menu Mobile Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-3 hover:bg-khaya-secondary/10 rounded-xl transition-all active:scale-90"
          >
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
