import ProductCard from "@/components/ProductCard";
import { getConnection } from "@/lib/db";

// Définir un type pour nos produits
type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
};

async function getAllProducts(): Promise<Product[]> {
  let connection;
  try {
    connection = await getConnection();
    const [rows] = await connection.execute(
      `SELECT id, name, price, imageUrl, category 
       FROM Product 
       ORDER BY createdAt DESC`
    );

    // Pas besoin de mapper si les noms de colonnes correspondent déjà
    return rows as Product[];
  } catch (error) {
    console.error(`Impossible de récupérer tous les produits:`, error);
    return []; // Retourner un tableau vide en cas d'erreur
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

export default async function NouveautesPage() {
  const products = await getAllProducts();

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Toutes nos nouveautés</h2>
        <p className="mt-4 text-base text-gray-500">Parcourez l'ensemble de nos collections.</p>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                category={product.category.name}
                price={product.price}
                imageUrl={product.imageUrl}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">Aucun produit trouvé pour le moment.</p>
          )}
        </div>
      </div>
    </div>
  );
}
