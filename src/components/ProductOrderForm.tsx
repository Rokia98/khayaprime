'use client';

import { useState } from 'react';
import { MessageCircle, User, Phone, MapPin, ShoppingBag } from 'lucide-react';

interface ProductOrderFormProps {
  productName: string;
  productPrice: number;
}

const ProductOrderForm = ({ productName, productPrice }: ProductOrderFormProps) => {
  const [address, setAddress] = useState('');
  const [contactName, setContactName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleOrder = () => {
    if (!address || !contactName || !phoneNumber) {
      alert('Veuillez remplir tous les champs de livraison.');
      return;
    }

    const whatsappMessage = `🛍️ *NOUVELLE COMMANDE KHAYA PRIME*

*Produit :* ${productName}
*Prix :* ${productPrice.toLocaleString('fr-FR')} FCFA

📋 *Informations client :*
• *Nom :* ${contactName}
• *Téléphone :* ${phoneNumber}
• *Adresse de livraison :* ${address}

Merci de confirmer ma commande ! ✨`;

    const whatsappUrl = `https://wa.me/221771234567?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="mt-8 bg-gradient-to-br from-khaya-light to-white p-8 rounded-3xl shadow-xl border border-khaya-secondary/10">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-khaya-secondary to-khaya-gold rounded-full flex items-center justify-center mx-auto mb-4">
          <ShoppingBag className="w-8 h-8 text-white" />
        </div>
        <h3 className="font-playfair text-2xl font-bold text-khaya-primary mb-2">
          Finaliser ma commande
        </h3>
        <p className="text-khaya-gray">
          Remplissez vos informations pour recevoir votre commande
        </p>
      </div>
      
      <div className="space-y-6">
        {/* Nom du contact */}
        <div className="relative">
          <label htmlFor="contactName" className="block font-semibold text-khaya-primary mb-2">
            <User className="w-4 h-4 inline mr-2" />
            Nom complet <span className="text-khaya-secondary">*</span>
          </label>
          <input
            type="text"
            id="contactName"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            className="w-full px-4 py-3 pl-12 border-2 border-khaya-light rounded-2xl focus:border-khaya-secondary focus:outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm"
            placeholder="Ex: Marie Kouassi"
          />
          <User className="absolute left-4 top-12 w-5 h-5 text-khaya-gray" />
        </div>

        {/* Numéro de téléphone */}
        <div className="relative">
          <label htmlFor="phoneNumber" className="block font-semibold text-khaya-primary mb-2">
            <Phone className="w-4 h-4 inline mr-2" />
            Téléphone <span className="text-khaya-secondary">*</span>
          </label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full px-4 py-3 pl-12 border-2 border-khaya-light rounded-2xl focus:border-khaya-secondary focus:outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm"
            placeholder="Ex: +225 XX XX XX XX"
          />
          <Phone className="absolute left-4 top-12 w-5 h-5 text-khaya-gray" />
        </div>

        {/* Adresse de livraison */}
        <div className="relative">
          <label htmlFor="address" className="block font-semibold text-khaya-primary mb-2">
            <MapPin className="w-4 h-4 inline mr-2" />
            Adresse de livraison <span className="text-khaya-secondary">*</span>
          </label>
          <textarea
            id="address"
            rows={3}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-3 pl-12 border-2 border-khaya-light rounded-2xl focus:border-khaya-secondary focus:outline-none transition-all duration-300 resize-none bg-white/80 backdrop-blur-sm"
            placeholder="Ex: Cocody, Riviera 3, Villa 45, Abidjan"
          />
          <MapPin className="absolute left-4 top-12 w-5 h-5 text-khaya-gray" />
          <p className="text-xs text-khaya-gray mt-2">
            Incluez tous les détails : quartier, rue, numéro, points de repère
          </p>
        </div>
      </div>

      {/* Récapitulatif */}
      <div className="mt-8 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-khaya-secondary/20">
        <h4 className="font-semibold text-khaya-primary mb-3">Récapitulatif de commande</h4>
        <div className="flex justify-between items-center">
          <span className="text-khaya-gray">{productName}</span>
          <span className="font-bold text-khaya-primary text-lg">
            {productPrice.toLocaleString('fr-FR')} FCFA
          </span>
        </div>
        <div className="border-t border-khaya-light mt-3 pt-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-khaya-gray">Livraison</span>
            <span className="text-khaya-accent font-semibold">Gratuite dès 50 000 FCFA</span>
          </div>
        </div>
      </div>

      {/* Bouton de commande */}
      <div className="mt-8">
        <button
          onClick={handleOrder}
          disabled={!address || !contactName || !phoneNumber}
          className="w-full bg-gradient-to-r from-khaya-accent to-khaya-secondary text-white font-bold py-4 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none flex items-center justify-center space-x-3"
        >
          <MessageCircle size={20} />
          <span>Commander sur WhatsApp</span>
        </button>
        
        {(!address || !contactName || !phoneNumber) && (
          <p className="text-sm text-khaya-rose text-center mt-3">
            Veuillez remplir tous les champs requis
          </p>
        )}
        
        <p className="text-xs text-khaya-gray text-center mt-3">
          Vous serez redirigé vers WhatsApp pour finaliser votre commande
        </p>
      </div>
    </div>
  );
};

export default ProductOrderForm;
