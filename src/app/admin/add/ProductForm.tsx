'use client';

import { useFormState, useFormStatus } from 'react-dom';
import Link from 'next/link';
import { addProduct } from '../actions';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button 
      type="submit" 
      disabled={pending}
      className="w-full bg-khaya-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-khaya-secondary transition-colors disabled:bg-gray-400"
    >
      {pending ? 'Ajout en cours...' : 'Ajouter le produit'}
    </button>
  );
}

export default function ProductForm() {
  const initialState = { error: null };
  const [state, formAction] = useFormState(addProduct, initialState);

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
          className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-khaya-primary focus:border-khaya-primary sm:text-sm"
        >
          <option value="">Sélectionnez un genre</option>
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
          placeholder="Ex: Chemise, Robe, Ensemble..."
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-khaya-primary focus:border-khaya-primary sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
          Image du produit
        </label>
        <input
          type="file"
          id="image"
          name="image"
          required
          accept="image/*"
          className="mt-1 block w-full text-sm text-gray-500
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-khaya-primary file:text-white
                     hover:file:bg-khaya-secondary"
        />
      </div>

      <div className="flex items-center justify-between">
        <Link href="/admin" className="text-gray-600 hover:text-gray-900">
          Annuler
        </Link>
        <SubmitButton />
      </div>

      {state?.error && (
        <p className="text-sm text-red-600">{state.error}</p>
      )}
    </form>
  );
}
