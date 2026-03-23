'use client';

import { useFormState, useFormStatus } from 'react-dom';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
import { updateProduct } from '../../actions';

type Product = {
    id: number;
    name: string;
    description: string | null;
    price: number;
    imageUrl: string;
    gender: 'homme' | 'femme';
    category: string;
};

interface EditProductFormProps {
  product: Product;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button 
      type="submit" 
      disabled={pending}
      className="btn-luxury w-full disabled:opacity-50 disabled:cursor-not-allowed group"
    >
      <span className="relative z-10">{pending ? 'MISE À JOUR...' : 'SAUVEGARDER LES CHANGEMENTS'}</span>
    </button>
  );
}

export default function EditProductForm({ product }: EditProductFormProps) {
  const initialState = { error: "" };
  const updateProductWithId = updateProduct.bind(null, product.id);
  const [state, formAction] = useFormState(updateProductWithId, initialState);

  return (
    <form action={formAction} className="space-y-8 bg-white/5 p-8 border border-white/10 backdrop-blur-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-[10px] font-bold text-khaya-secondary uppercase tracking-[0.2em] mb-2">
              Nom du modèle
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              defaultValue={product.name}
              className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:border-khaya-secondary outline-none transition-colors font-serif italic text-lg"
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-[10px] font-bold text-khaya-secondary uppercase tracking-[0.2em] mb-2">
              Valeur (en FCFA)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              required
              defaultValue={product.price}
              className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:border-khaya-secondary outline-none transition-colors tracking-widest"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="gender" className="block text-[10px] font-bold text-khaya-secondary uppercase tracking-[0.2em] mb-2">
                Univers
              </label>
              <select
                id="gender"
                name="gender"
                required
                defaultValue={product.gender}
                className="w-full bg-black border-b border-white/20 py-2 text-white focus:border-khaya-secondary outline-none transition-colors appearance-none"
              >
                <option value="homme">Homme</option>
                <option value="femme">Femme</option>
              </select>
            </div>

            <div>
              <label htmlFor="category" className="block text-[10px] font-bold text-khaya-secondary uppercase tracking-[0.2em] mb-2">
                Type
              </label>
              <input
                type="text"
                id="category"
                name="category"
                required
                defaultValue={product.category}
                className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:border-khaya-secondary outline-none transition-colors"
              />
            </div>
          </div>

          <div>
             <label htmlFor="description" className="block text-[10px] font-bold text-khaya-secondary uppercase tracking-[0.2em] mb-2">
              L'histoire du produit
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              required
              defaultValue={product.description || ''}
              className="w-full bg-transparent border border-white/10 p-4 text-white/80 focus:border-khaya-secondary outline-none transition-colors text-sm leading-relaxed"
            ></textarea>
          </div>
        </div>

        <div className="space-y-6">
          <input type="hidden" name="currentImageUrl" value={product.imageUrl} />
          <div>
            <label className="block text-[10px] font-bold text-khaya-secondary uppercase tracking-[0.2em] mb-4">Aperçu Actuel</label>
            <div className="h-48 w-full overflow-hidden border border-white/10">
              <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover grayscale" />
            </div>
          </div>
          <div>
            <label htmlFor="image" className="block text-[10px] font-bold text-khaya-secondary uppercase tracking-[0.2em] mb-2">
              Modifier le visuel (optionnel)
            </label>
            <div className="relative border-2 border-dashed border-white/10 p-6 flex flex-col items-center justify-center hover:border-khaya-secondary/50 transition-colors group cursor-pointer">
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <PlusCircle className="text-white/20 group-hover:text-khaya-secondary transition-colors mb-2" size={32} />
              <p className="text-[10px] text-white/40 uppercase tracking-widest text-center">Déposer ou cliquer pour changer d'image</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/10 mt-8">
        <Link href="/admin" className="text-[10px] font-bold text-white/40 hover:text-white uppercase tracking-[0.3em] transition-colors">
          Annuler
        </Link>
        <div className="w-full md:w-64">
          <SubmitButton />
        </div>
      </div>

      {state?.error && (
        <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-xs tracking-widest uppercase text-center">
          {state.error}
        </div>
      )}
    </form>
  );
}
