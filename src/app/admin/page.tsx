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
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Gestion des Produits</h1>
          <Link href="/admin/add" className="bg-khaya-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-khaya-secondary transition-colors flex items-center space-x-2">
            <PlusCircle size={20} />
            <span>Ajouter un produit</span>
          </Link>
        </div>
        <AdminProductList products={products} />
      </div>
    </div>
  );
}
