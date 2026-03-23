import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/prisma";

// Définir un type pour nos produits
type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
};

async function getAllProducts(): Promise<Product[]> {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        price: true,
        imageUrl: true,
        category: true
      }
    });
    return products as Product[];
  } catch (error) {
    console.error(`Impossible de récupérer tous les produits:`, error);
    return [];
  }
}

export default async function NouveautesPage() {
  const products = await getAllProducts();

  return (
    <main className="bg-white pt-32 pb-24">
      <div className="container mx-auto px-8">
        <header className="mb-20 text-center">
          <p className="text-[10px] tracking-[0.5em] uppercase text-khaya-secondary font-bold mb-4">Nouveaux Arrivages</p>
          <h1 className="font-playfair text-5xl md:text-7xl font-black text-khaya-dark mb-6">Exclusivités</h1>
          <div className="w-20 h-[1px] bg-khaya-secondary mx-auto mb-8"></div>
          <p className="text-sm text-khaya-gray max-w-2xl mx-auto font-light leading-relaxed">
            Découvrez nos dernières créations fraîchement sorties de nos ateliers de couture.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-x-12 gap-y-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-2 sm:px-0">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                category={product.category}
                price={product.price}
                imageUrl={product.imageUrl}
              />
            ))
          ) : (
            <div className="col-span-full py-40 text-center">
               <p className="font-playfair text-xl text-khaya-gray italic">Bientôt de nouvelles pièces exclusives...</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
