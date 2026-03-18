import { getConnection } from "@/lib/db";
import EditProductForm from "./EditProductForm";
import { notFound } from "next/navigation";

type Product = {
    id: number;
    name: string;
    description: string | null;
    price: number;
    imageUrl: string;
    gender: 'homme' | 'femme';
    category: string;
};

async function getProductById(id: number): Promise<Product | null> {
    let connection;
    try {
      connection = await getConnection();
      const [rows] = await connection.execute(
        `SELECT id, name, description, price, imageUrl, gender, category FROM Product WHERE id = ?`,
        [id]
      );
  
      const productRows = rows as any[];
      if (productRows.length === 0) {
        return null;
      }
      return productRows[0] as Product;
    } catch (error) {
      console.error(`Impossible de récupérer le produit avec l'ID ${id}:`, error);
      return null;
    } finally {
      if (connection) {
        await connection.end();
      }
    }
  }

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="container max-w-2xl mx-auto px-6 py-12">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Modifier le produit</h1>
          <EditProductForm product={product} />
        </div>
      </div>
    </div>
  );
}
