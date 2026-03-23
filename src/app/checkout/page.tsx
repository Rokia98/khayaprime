'use client';

import { useCart } from "@/lib/CartContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, User, Phone, MapPin, ArrowLeft, ShoppingBag, Trash2 } from 'lucide-react';
import Breadcrumbs from "@/components/Breadcrumbs";

export default function CheckoutPage() {
  const { cart, removeFromCart, cartTotal } = useCart();
  const router = useRouter();
  const [contactName, setContactName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && cart.length === 0) {
      router.push('/');
    }
  }, [cart, mounted, router]);

  const handleFinalOrder = () => {
    if (!contactName || !phoneNumber || !address) {
      setError('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    setError('');

    // Construire le message WhatsApp avec tous les articles
    let message = "🛍️ *COMMANDE KHAYA PRIME*\n\n";
    message += "*Articles commandés :*\n";
    
    cart.forEach((item, index) => {
      message += `\n${index + 1}. *${item.name}*\n`;
      message += `   • Quantité : ${item.quantity}\n`;
      message += `   • Prix unitaire : ${item.price.toLocaleString('fr-FR')} FCFA\n`;
      message += `   • Sous-total : ${(item.price * item.quantity).toLocaleString('fr-FR')} FCFA\n`;
    });
    
    message += `\n━━━━━━━━━━━━━━━━━━━\n`;
    message += `*TOTAL : ${cartTotal.toLocaleString('fr-FR')} FCFA*\n`;
    message += `━━━━━━━━━━━━━━━━━━━\n\n`;
    
    message += `📋 *Informations client :*\n`;
    message += `• *Nom :* ${contactName}\n`;
    message += `• *Téléphone :* ${phoneNumber}\n`;
    message += `• *Adresse de livraison :* ${address}\n\n`;
    
    message += "Je souhaite finaliser cette commande. Merci ✨";

    const whatsappUrl = `https://wa.me/2250100533949?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!mounted) {
    return null;
  }

  return (
    <main className="bg-white pt-40 pb-32 min-h-screen">
      <div className="container mx-auto px-8 max-w-6xl">
        <Breadcrumbs 
          items={[
            { label: 'Accueil', href: '/' },
            { label: 'Finaliser la Commande', href: '/checkout' }
          ]}
        />

        {/* Header */}
        <header className="mb-16 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Link 
              href="/"
              className="p-3 hover:bg-khaya-secondary/10 rounded-full transition-all border border-khaya-secondary/20"
            >
              <ArrowLeft size={20} className="text-khaya-dark" />
            </Link>
            <h1 className="font-playfair text-5xl md:text-6xl font-black text-khaya-dark uppercase tracking-tighter italic">
              Récapitulatif
            </h1>
          </div>
          <div className="w-24 h-1 bg-khaya-secondary mx-auto mb-8 shadow-gold-glow"></div>
          <p className="text-lg text-khaya-gray max-w-2xl mx-auto font-light leading-relaxed">
            Vérifiez votre sélection et finalisez votre acquisition de luxe
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Liste des articles */}
          <div className="space-y-8">
            <div className="bg-khaya-light/50 p-8 rounded-3xl border-2 border-khaya-secondary/20">
              <div className="flex items-center gap-3 mb-8 pb-6 border-b-2 border-khaya-secondary/20">
                <ShoppingBag className="text-khaya-secondary" size={28} strokeWidth={1.5} />
                <h2 className="font-playfair text-3xl font-black text-khaya-dark uppercase tracking-tight">
                  Votre Sélection
                </h2>
              </div>

              <div className="space-y-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-6 group bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition-all">
                    <div className="relative w-24 aspect-[3/4] bg-khaya-light rounded-xl overflow-hidden shrink-0">
                      <Image 
                        src={item.imageUrl.startsWith('/') ? item.imageUrl : `/${item.imageUrl}`} 
                        alt={item.name} 
                        fill 
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-playfair text-lg font-bold text-khaya-dark leading-tight uppercase tracking-tight">
                          {item.name}
                        </h3>
                        <div className="flex items-center justify-between mt-3">
                          <div>
                            <p className="text-sm font-black text-khaya-dark">
                              {item.price.toLocaleString('fr-FR')} <span className="text-[10px] text-khaya-secondary">FCFA</span>
                            </p>
                            <p className="text-[10px] text-khaya-gray uppercase font-bold tracking-widest mt-1">
                              Quantité: {item.quantity}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-khaya-gray uppercase tracking-widest font-bold mb-1">Sous-total</p>
                            <p className="text-lg font-black text-khaya-secondary">
                              {(item.price * item.quantity).toLocaleString('fr-FR')}
                            </p>
                          </div>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-[10px] text-red-500 uppercase tracking-widest font-black hover:text-red-700 transition-colors text-left flex items-center gap-2 mt-3"
                      >
                        <Trash2 size={12} /> RETIRER
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="mt-8 pt-8 border-t-2 border-khaya-secondary/20">
                <div className="flex items-center justify-between">
                  <span className="text-sm tracking-[0.4em] uppercase font-black text-khaya-gray">Total Global</span>
                  <span className="text-4xl font-black text-khaya-dark tracking-tighter">
                    {cartTotal.toLocaleString('fr-FR')} <span className="text-sm text-khaya-secondary">FCFA</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Formulaire de commande */}
          <div className="bg-khaya-light/50 p-8 rounded-3xl border-2 border-khaya-secondary/20 sticky top-32 h-fit">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-khaya-secondary/50 via-khaya-secondary to-khaya-secondary/50 shadow-gold-glow rounded-t-3xl" />
            
            <div className="text-center mb-8 pt-4">
              <p className="text-xs tracking-luxury uppercase text-khaya-secondary font-black mb-3">Livraison Personnalisée</p>
              <h3 className="font-playfair text-3xl font-black text-khaya-dark mb-2 tracking-tighter"> 
                Vos Coordonnées
              </h3>
            </div>

            <div className="space-y-6">
              {/* Nom du contact */}
              <div className="relative space-y-3">
                <label htmlFor="contactName" className="flex items-center gap-2 text-sm tracking-wide font-black text-khaya-dark">
                  <User size={14} className="text-khaya-secondary" />
                  NOM COMPLET <span className="text-khaya-secondary">*</span>
                </label>
                <input
                  type="text"
                  id="contactName"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full px-6 py-4 border-2 border-khaya-dark/10 rounded-xl focus:border-khaya-secondary focus:ring-2 focus:ring-khaya-secondary/20 transition-all outline-none bg-white placeholder:text-khaya-gray/50 text-khaya-dark font-medium"
                  placeholder="Ex: Jean Kouassi"
                />
              </div>

              {/* Numéro de téléphone */}
              <div className="relative space-y-3">
                <label htmlFor="phoneNumber" className="flex items-center gap-2 text-sm tracking-wide font-black text-khaya-dark">
                  <Phone size={14} className="text-khaya-secondary" />
                  TÉLÉPHONE <span className="text-khaya-secondary">*</span>
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-6 py-4 border-2 border-khaya-dark/10 rounded-xl focus:border-khaya-secondary focus:ring-2 focus:ring-khaya-secondary/20 transition-all outline-none bg-white placeholder:text-khaya-gray/50 text-khaya-dark font-medium"
                  placeholder="+225 07 XX XX XX XX"
                />
              </div>

              {/* Adresse de livraison */}
              <div className="relative space-y-3">
                <label htmlFor="address" className="flex items-center gap-2 text-sm tracking-wide font-black text-khaya-dark">
                  <MapPin size={14} className="text-khaya-secondary" />
                  ADRESSE DE LIVRAISON <span className="text-khaya-secondary">*</span>
                </label>
                <textarea
                  id="address"
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-6 py-4 border-2 border-khaya-dark/10 rounded-xl focus:border-khaya-secondary focus:ring-2 focus:ring-khaya-secondary/20 transition-all outline-none bg-white placeholder:text-khaya-gray/50 text-khaya-dark font-medium resize-none"
                  placeholder="Ex: Riviera 3, Abidjan"
                />
              </div>

              {error && (
                <div className="bg-red-50 border-2 border-red-200 p-4 rounded-xl animate-pulse">
                  <p className="text-xs text-red-600 tracking-widest uppercase font-black text-center">
                    {error}
                  </p>
                </div>
              )}

              <button
                onClick={handleFinalOrder}
                disabled={!address || !contactName || !phoneNumber}
                className="w-full py-6 bg-khaya-secondary text-khaya-dark hover:bg-khaya-dark hover:text-white flex items-center justify-center gap-4 group/btn text-sm uppercase tracking-luxury font-black transition-all duration-700 shadow-gold-glow hover:shadow-premium-card rounded-2xl disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed"
              >
                <MessageCircle className="w-6 h-6 group-hover/btn:scale-125 transition-transform duration-500" strokeWidth={1.5} />
                <span>Finaliser sur WhatsApp</span>
              </button>

              <p className="text-[9px] text-center text-khaya-gray uppercase tracking-[0.2em] font-medium leading-relaxed mt-4">
                Votre commande sera confirmée<br/>via WhatsApp Business
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
