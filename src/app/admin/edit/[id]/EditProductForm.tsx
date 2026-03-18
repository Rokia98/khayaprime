'use client';

import { useFormState, useFormStatus } from 'react-dom';
import Link from 'next/link';
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
      className="w-full bg-khaya-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-khaya-secondary transition-colors disabled:bg-gray-400"
    >
      {pending ? 'Mise à jour en cours...' : 'Mettre à jour le produit'}
    </button>
  );
}

export default function EditProductForm({ product }: EditProductFormProps) {
  const initialState = { error: null };
  const updateProductWithId = updateProduct.bind(null, product.id);
  const [state, formAction] = useFormState(updateProductWithId, initialState);

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nom du produit
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          defaultValue={product.name}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-khaya-primary focus:border-khaya-primary sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          required
          defaultValue={product.description || ''}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-khaya-primary focus:border-khaya-primary sm:text-sm"
        ></textarea>
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          Prix (en FCFA)
        </label>
        <input
          type="number"
          id="price"
          name="price"
          required
          defaultValue={product.price}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-khaya-primary focus:border-khaya-primary sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
          Genre
        </label>
        <select
          id="gender"
          name="gender"
          required
          defaultValue={product.gender}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-khaya-primary focus:border-khaya-primary sm:text-sm"
        >
          <option value="homme">Homme</option>
          <option value="femme">Femme</option>
        </select>
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Catégorie
        </label>
        <input
          type="text"
          id="category"
          name="category"
          required
          defaultValue={product.category}
          placeholder="Ex: Chemise, Robe, Ensemble..."
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-khaya-primary focus:border-khaya-primary sm:text-sm"
        />
      </div>

      <input type="hidden" name="currentImageUrl" value={product.imageUrl} />
      <div>
        <label className="block text-sm font-medium text-gray-700">Image actuelle</label>
        <img src={product.imageUrl} alt={product.name} className="mt-2 w-32 h-32 object-cover rounded-md" />
      </div>
      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
          Changer l'image (optionnel)
        </label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          className="mt-1 block w-full text-sm text-gray-500
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-khaya-primary file:text-white
                     hover:file:bg-khaya-secondary"
        />
      </div>

      {state?.error && (
        <p className="text-sm text-red-500">{state.error}</p>
      )}

      <div className="flex items-center justify-between pt-4">
        <Link href="/admin" className="text-sm text-gray-600 hover:text-gray-900">
          Annuler
        </Link>
        <SubmitButton />
      </div>
    </form>
  );
}
