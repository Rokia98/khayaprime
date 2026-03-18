'use client';

import { deleteProduct } from "./actions";
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";
import { Product } from "@/types/Product";

interface AdminProductListProps {
  products: Product[];
}

export default function AdminProductList({ products }: AdminProductListProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = (productId: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      startTransition(async () => {
        await deleteProduct(productId);
      });
    }
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700">Aucun produit trouvé</h2>
        <p className="mt-2 text-gray-500">Commencez par ajouter votre premier produit !</p>
      </div>
    )
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Image
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Produit
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Genre
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Catégorie
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Prix
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className={`hover:bg-gray-50 ${isPending ? 'opacity-50' : ''}`}>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-cover rounded"/>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{product.name}</p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap capitalize">{product.gender}</p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap capitalize">{product.category}</p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{product.price.toLocaleString('fr-FR')} CFA</p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                <div className="flex justify-end space-x-2">
                  <Link href={`/admin/edit/${product.id}`} className="text-blue-600 hover:text-blue-900">
                    <Edit size={20} />
                  </Link>
                  <button 
                    onClick={() => handleDelete(product.id)}
                    disabled={isPending}
                    className="text-red-600 hover:text-red-900 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
