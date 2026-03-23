'use client';

import { useState } from 'react';
import { useCart } from '@/lib/CartContext';
import { loginOrRegister } from '@/app/auth-actions';
import { User, Phone, X, Loader2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { login } = useCart();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('phoneNumber', phone);

    const result = await loginOrRegister(formData);

    if (result.success) {
      login(result.user);
      onClose();
    } else {
      setError(result.error || 'Une erreur est survenue');
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="relative p-8">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-khaya-gray hover:text-khaya-dark transition-colors"
          >
            <X size={24} />
          </button>

          <header className="text-center mb-8 pt-4">
            <h2 className="font-playfair text-3xl font-black text-khaya-dark mb-2">Bienvenue</h2>
            <p className="text-khaya-gray text-sm">Identifiez-vous pour sauvegarder vos favoris et votre panier à vie.</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-khaya-secondary ml-1">Nom Complet</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-khaya-gray" size={18} />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Jean Dupont"
                  className="w-full pl-12 pr-4 py-4 bg-khaya-dark/5 border-none rounded-2xl focus:ring-2 focus:ring-khaya-secondary/50 outline-none transition-all placeholder:text-khaya-gray/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-khaya-secondary ml-1">Numéro de Téléphone</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-khaya-gray" size={18} />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Ex: 0123456789"
                  className="w-full pl-12 pr-4 py-4 bg-khaya-dark/5 border-none rounded-2xl focus:ring-2 focus:ring-khaya-secondary/50 outline-none transition-all placeholder:text-khaya-gray/50"
                />
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-xs text-center font-medium bg-red-50 py-2 rounded-lg">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-khaya-dark text-white py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-khaya-secondary transition-all shadow-lg hover:shadow-khaya-secondary/20 flex items-center justify-center gap-3 disabled:opacity-70"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : 'Continuer'}
            </button>
          </form>

          <p className="mt-8 text-center text-[10px] text-khaya-gray/60 uppercase tracking-tighter">
            Maison Khaya Prime • Confidentialité Garantie
          </p>
        </div>
      </div>
    </div>
  );
}
