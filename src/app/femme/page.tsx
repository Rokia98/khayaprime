import ProductCard from "@/components/ProductCard";
import { getConnection } from "@/lib/db";
import { Product } from "@/types/Product";

async function getFemmeProducts(): Promise<Product[]> {
  let connection;
  try {
    connection = await getConnection();
    const [rows] = await connection.execute(
      `SELECT id, name, price, imageUrl, category, gender FROM Product WHERE gender = 'femme' ORDER BY createdAt DESC`
    );
    return rows as Product[];
  } catch (error) {
    console.error("Impossible de récupérer les produits pour femme:", error);
    return [];
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

export default async function FemmePage() {
  const products = await getFemmeProducts();
  const categories = [...new Set(products.map(p => p.category))];

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Collection Femme</h1>
        <p className="mt-4 text-xl text-gray-500">
          Sublimez votre garde-robe avec nos pièces uniques et tendances.
        </p>

        {categories.map(category => (
          <section key={category} className="py-12">
            <h2 className="text-2xl font-bold tracking-tight text-gray-800 capitalize">{category}</h2>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {products.filter(p => p.category === category).map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  category={product.category}
                  price={product.price}
                  imageUrl={product.imageUrl}
                />
              ))}
            </div>
          </section>
        ))}

        {products.length === 0 && (
          <p className="mt-12 text-center text-gray-500">Aucun produit pour femme disponible pour le moment.</p>
        )}
      </div>
    </div>
  );
}
