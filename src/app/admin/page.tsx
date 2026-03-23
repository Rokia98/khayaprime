import { getConnection } from "@/lib/db";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import AdminProductList from "./ProductList";
import { Product } from "@/types/Product";


async function getAllProducts(): Promise<Product[]> {
  let connection;
  try {
    connection = await getConnection();
    const [rows] = await connection.execute(
      `SELECT id, name, price, imageUrl, gender, category 
       FROM Product 
       ORDER BY createdAt DESC`
    );
    return rows as Product[];
  } catch (error) {
    console.error(`Impossible de récupérer tous les produits:`, error);
    return [];
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

export default async function AdminPage() {
  const products = await getAllProducts();

  return (
    <div className="bg-[#050810] min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b border-white/10 pb-8">
          <div>
            <span className="text-khaya-secondary tracking-[0.3em] text-xs uppercase mb-2 block animate-reveal">Tableau de Bord</span>
            <h1 className="text-4xl md:text-5xl font-serif text-white animate-reveal italic">Gestion des <span className="text-khaya-secondary">Collections</span></h1>
          </div>
          <Link href="/admin/add" className="btn-luxury group flex items-center space-x-3">
            <PlusCircle size={18} className="group-hover:rotate-90 transition-transform duration-500" />
            <span>AJOUTER UN PRODUIT</span>
          </Link>
        </div>
        
        <div className="animate-reveal" style={{ animationDelay: '0.2s' }}>
          <AdminProductList products={products} />
        </div>
      </div>
    </div>
  );
}
