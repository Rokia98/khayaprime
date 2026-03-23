'use client';

import { useState } from 'react';
import { MessageCircle, User, Phone, MapPin, ShoppingBag, Heart } from 'lucide-react'; 
import { useCart } from '@/lib/CartContext';

interface ProductOrderFormProps {
  productId: number;
  productName: string;
  productPrice: number;
  productImage: string;
}

const ProductOrderForm = ({ productId, productName, productPrice, productImage }: ProductOrderFormProps) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [address, setAddress] = useState('');
  const [contactName, setContactName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const handleOrder = () => {
    if (!address || !contactName || !phoneNumber) {
      setError('Veuillez remplir tous les champs de livraison.');
      return;
    }
    setError('');

    const whatsappMessage = `🛍️ *NOUVELLE COMMANDE KHAYA PRIME*

*Produit :* ${productName}
*Prix :* ${productPrice.toLocaleString('fr-FR')} FCFA

📋 *Informations client :*
• *Nom :* ${contactName}
• *Téléphone :* ${phoneNumber}
• *Adresse de livraison :* ${address}

Merci de confirmer ma commande ! ✨`;

    const whatsappUrl = `https://wa.me/2250100533949?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  const addToCartAction = () => {
    addToCart({ id: productId, name: productName, price: productPrice, imageUrl: productImage });
  };

  return (
    <div className="mt-8 bg-khaya-light/50 p-8 border-2 border-khaya-secondary/20 shadow-premium-card relative overflow-hidden group rounded-3xl animate-fade-in-up">
      {/* Decorative Gold Line */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-khaya-secondary/50 via-khaya-secondary to-khaya-secondary/50 shadow-gold-glow" />
      
      <div className="text-center mb-8">
        <p className="text-xs tracking-luxury uppercase text-khaya-secondary font-black mb-3">Expérience Exclusive</p>
        <h3 className="font-playfair text-3xl font-black text-khaya-dark mb-2 tracking-tighter"> 
          Finaliser mon Acquisition
        </h3>
        <p className="text-sm text-khaya-gray font-light italic pb-5 border-b border-khaya-secondary/20 inline-block">
          Commande sécurisée & Livraison personnalisée
        </p>
      </div>

      <div className="space-y-8">
        <div className="flex gap-4">
           <button 
             onClick={addToCartAction}
             className="flex-1 border-2 border-khaya-dark py-4 text-xs uppercase tracking-widest font-black hover:bg-khaya-dark hover:text-white transition-all duration-500 rounded-xl flex items-center justify-center gap-3 shadow-sm"
           >
             <ShoppingBag size={18} strokeWidth={1.5} />
             <span>Panier</span>
           </button>
           <button 
             onClick={() => toggleWishlist(productId)}
             className={`p-4 border-2 transition-all duration-500 rounded-xl flex items-center justify-center ${isInWishlist(productId) ? 'bg-khaya-rose text-white border-khaya-rose shadow-md scale-105' : 'border-khaya-dark/10 hover:border-khaya-secondary text-khaya-dark'}`}
           >
             <Heart size={20} className={isInWishlist(productId) ? 'fill-current' : ''} strokeWidth={1.5} />
           </button>
        </div>

        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t-2 border-khaya-secondary/10"></div>
          <span className="flex-shrink mx-4 text-xs tracking-[0.2em] uppercase text-khaya-gray font-bold">Ou via WhatsApp</span>
          <div className="flex-grow border-t-2 border-khaya-secondary/10"></div>
        </div>

        {/* Nom du contact */}
        <div className="relative space-y-3">
          <label htmlFor="contactName" className="flex items-center gap-2 text-sm tracking-wide font-black text-khaya-dark">
            <User size={14} className="text-khaya-secondary" />
            VOTRE NOM COMPLET <span className="text-khaya-secondary">*</span>
          </label>
          <input
            type="text"
            id="contactName"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            className="input-luxury"
            placeholder="Ex: SEIGNEUR KOUASSI"
          />
        </div>

        {/* Numéro de téléphone */}
        <div className="relative space-y-3">
          <label htmlFor="phoneNumber" className="flex items-center gap-2 text-sm tracking-wide font-black text-khaya-dark">
            <Phone size={14} className="text-khaya-secondary" />
            LIGNE DE CONTACT <span className="text-khaya-secondary">*</span>
          </label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="input-luxury"
            placeholder="+225 07 XX XX XX XX"
          />
        </div>

        {/* Adresse de livraison */}
        <div className="relative space-y-3">
          <label htmlFor="address" className="flex items-center gap-2 text-sm tracking-wide font-black text-khaya-dark">
            <MapPin size={14} className="text-khaya-secondary" />
            DESTINATION <span className="text-khaya-secondary">*</span>
          </label>
          <textarea
            id="address"
            rows={2}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="input-luxury resize-none"
            placeholder="Ex: Riviera 3, Abidjan"
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 p-4 rounded-xl animate-pulse">
            <p className="text-xs text-red-600 tracking-widest uppercase font-black text-center">
              {error}
            </p>
          </div>
        )}

        <button
          onClick={handleOrder}
          disabled={!address || !contactName || !phoneNumber}
          className="w-full py-6 bg-khaya-secondary text-khaya-dark hover:bg-khaya-dark hover:text-white flex items-center justify-center gap-4 group/btn text-sm uppercase tracking-luxury font-black transition-all duration-700 shadow-gold-glow hover:shadow-premium-card rounded-2xl disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed"
        >
          <MessageCircle className="w-6 h-6 group-hover/btn:scale-125 transition-transform duration-500" strokeWidth={1.5} />
          <span>Finter sur WhatsApp</span>
        </button>

        <p className="text-[8px] text-center text-khaya-gray tracking-[0.2em] font-light uppercase">
          Traitement prioritaire par nos conseillers
        </p>
      </div>
    </div>
  );
};

export default ProductOrderForm;
