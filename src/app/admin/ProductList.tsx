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
      <div className="text-center py-20 bg-white/5 border border-white/10 backdrop-blur-sm">
        <h2 className="text-2xl font-serif text-white italic mb-2">Aucun produit trouvé</h2>
        <p className="text-white/40 tracking-widest uppercase text-xs">Votre catalogue est actuellement vide</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto border border-white/10">
      <table className="min-w-full divide-y divide-white/10">
        <thead>
          <tr className="bg-white/[0.02]">
            <th className="px-6 py-4 text-left text-[10px] font-bold text-khaya-secondary uppercase tracking-[0.3em]">
              Aperçu
            </th>
            <th className="px-6 py-4 text-left text-[10px] font-bold text-khaya-secondary uppercase tracking-[0.3em]">
              Produit
            </th>
            <th className="px-6 py-4 text-left text-[10px] font-bold text-khaya-secondary uppercase tracking-[0.3em]">
              Genre
            </th>
            <th className="px-6 py-4 text-left text-[10px] font-bold text-khaya-secondary uppercase tracking-[0.3em]">
              Catégorie
            </th>
            <th className="px-6 py-4 text-left text-[10px] font-bold text-khaya-secondary uppercase tracking-[0.3em]">
              Prix
            </th>
            <th className="px-6 py-4 text-right text-[10px] font-bold text-khaya-secondary uppercase tracking-[0.3em]">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5 bg-transparent">
          {products.map((product) => (
            <tr key={product.id} className={`hover:bg-white/[0.03] transition-colors duration-300 ${isPending ? 'opacity-30' : ''}`}>
              <td className="px-6 py-6 whitespace-nowrap">
                <div className="h-20 w-16 overflow-hidden border border-white/10">
                  <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"/>
                </div>
              </td>
              <td className="px-6 py-6 whitespace-nowrap">
                <p className="text-white font-serif italic text-lg">{product.name}</p>
              </td>
              <td className="px-6 py-6 whitespace-nowrap">
                <p className="text-white/60 tracking-widest text-[10px] uppercase border border-white/10 px-2 py-1 inline-block">{product.gender}</p>
              </td>
              <td className="px-6 py-6 whitespace-nowrap">
                <p className="text-white/60 tracking-widest text-[10px] uppercase">{product.category}</p>
              </td>
              <td className="px-6 py-6 whitespace-nowrap">
                <p className="text-khaya-secondary font-medium tracking-widest">{product.price.toLocaleString('fr-FR')} CFA</p>
              </td>
              <td className="px-6 py-6 whitespace-nowrap text-right">
                <div className="flex justify-end space-x-6">
                  <Link href={`/admin/edit/${product.id}`} className="text-white hover:text-khaya-secondary transition-colors duration-300">
                    <Edit size={18} />
                  </Link>
                  <button 
                    onClick={() => handleDelete(product.id)}
                    disabled={isPending}
                    className="text-white/30 hover:text-red-500 transition-colors duration-300 disabled:opacity-50"
                  >
                    <Trash2 size={18} />
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
