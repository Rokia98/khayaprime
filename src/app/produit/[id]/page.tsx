import { getConnection } from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductOrderForm from "@/components/ProductOrderForm"; // Importer le nouveau composant
import { Share2, Star, Truck, Package } from "lucide-react";
import AddReviewForm from "@/components/AddReviewForm";

type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string | null;
  category: string;
  gender: 'homme' | 'femme';
};

type Review = {
  id: number;
  rating: number;
  author: string;
  comment: string | null;
  createdAt: string;
};

async function getProductById(id: number): Promise<Product | null> {
  let connection;
  try {
    connection = await getConnection();
    const [rows] = await connection.execute(
      `SELECT id, name, price, imageUrl, description, category, gender 
       FROM Product 
       WHERE id = ?`,
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
      // Ne pas fermer la connexion ici si on l'utilise plus bas
    }
  }
}

async function getReviewsByProductId(productId: number): Promise<Review[]> {
  let connection;
  try {
    connection = await getConnection();
    const [rows] = await connection.execute(
      `SELECT id, rating, author, comment, createdAt 
       FROM Reviews 
       WHERE productId = ? 
       ORDER BY createdAt DESC`,
      [productId]
    );
    return (rows as any[]).map(row => ({
      ...row,
      createdAt: new Date(row.createdAt).toLocaleDateString('fr-FR', {
        day: 'numeric', month: 'long', year: 'numeric'
      })
    }));
  } catch (error) {
    console.error('Impossible de récupérer les avis:', error);
    return [];
  } finally {
    if (connection) {
      // Ne pas fermer la connexion ici
    }
  }
}

async function getSimilarProducts(productId: number, category: string, gender: 'homme' | 'femme'): Promise<Product[]> {
  let connection;
  try {
    connection = await getConnection();
    const [rows] = await connection.execute(
      `SELECT id, name, price, imageUrl, category, gender
       FROM Product
       WHERE category = ? AND gender = ? AND id != ?
       LIMIT 4`,
      [category, gender, productId]
    );
    return rows as Product[];
  } catch (error) {
    console.error('Impossible de récupérer les produits similaires:', error);
    return [];
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}


export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(Number(params.id));

  if (!product) {
    notFound();
  }

  const reviews = await getReviewsByProductId(Number(params.id));
  const similarProducts = await getSimilarProducts(product.id, product.category, product.gender);
  
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0 
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews 
    : 0;
  
  const breadcrumbItems = [
    { label: 'Accueil', href: '/' },
    { label: product.gender === 'homme' ? 'Homme' : 'Femme', href: `/${product.gender}` },
    { label: product.category, href: `/${product.gender}?category=${product.category}` },
    { label: product.name, href: `/produit/${product.id}` }
  ];

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mt-6">
          {/* --- COLONNE DE GAUCHE : IMAGE --- */}
          <div className="w-full h-[600px] relative rounded-lg overflow-hidden border">
            <Image
              src={product.imageUrl.startsWith('/') ? product.imageUrl : `/${product.imageUrl.replace(/^\/+/, '')}`}
              alt={product.name}
              fill
              className="w-full h-full object-contain"
            />
          </div>

          {/* --- COLONNE DE DROITE : INFORMATIONS --- */}
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{product.name}</h1>
            
            <div className="flex items-center mt-2">
              {totalReviews > 0 ? (
                <>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-5 w-5 ${i < Math.round(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">({totalReviews} avis)</span>
                </>
              ) : (
                <span className="text-sm text-gray-500">Aucun avis pour le moment</span>
              )}
            </div>

            <div className="mt-4">
              <p className="text-3xl font-bold text-gray-900">{product.price.toLocaleString('fr-FR')} FCFA</p>
              {/* Possibilité d'ajouter un ancien prix barré ici */}
            </div>

            {/* Le formulaire de commande remplace l'ancien bouton WhatsApp */}
            <ProductOrderForm productName={product.name} productPrice={product.price} />

            <div className="mt-6 border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Partager ce produit</h3>
              <div className="flex items-center space-x-4">
                 <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition">
                   <Share2 className="h-5 w-5 text-gray-700" />
                 </button>
              </div>
            </div>

            <div className="mt-6 border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Options de livraison</h3>
              <div className="space-y-4 text-sm text-gray-600">
                <div className="flex items-start">
                  <Truck className="h-5 w-5 mr-3 mt-1 text-khaya-primary flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-800">Livraison à Dakar</p>
                    <p>Recevez votre commande en 24h-48h. Frais : 1 500 FCFA.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Package className="h-5 w-5 mr-3 mt-1 text-khaya-primary flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-800">Livraison autres régions</p>
                    <p>Expédition via services postaux. Frais à partir de 2 500 FCFA.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* --- SECTIONS INFÉRIEURES : DESCRIPTION & PRODUITS SIMILAIRES --- */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <div className="border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 pb-4">Description du produit</h3>
            </div>
            <div
                className="mt-6 text-base text-gray-700 space-y-6 prose max-w-none"
                dangerouslySetInnerHTML={{ __html: product.description || 'Aucune description disponible.' }}
            />
          </div>

          {/* Section Avis des clients */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Avis des clients</h3>
            {totalReviews > 0 ? (
              <div className="mt-6 space-y-6">
                {reviews.map(review => (
                  <div key={review.id} className="border-b pb-4">
                    <div className="flex items-center mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <p className="font-bold text-gray-800">{review.author}</p>
                    <p className="text-sm text-gray-500 mb-2">{review.createdAt}</p>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-6 text-sm text-gray-500">Soyez le premier à laisser un avis !</p>
            )}

            <div className="mt-8">
              <AddReviewForm productId={product.id} />
            </div>
          </div>
        </div>

        {similarProducts.length > 0 && (
          <div className="mt-24">
            <h2 className="font-playfair text-3xl font-bold text-center text-gray-900">Vous aimerez aussi</h2>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
              {similarProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  id={p.id}
                  name={p.name}
                  category={p.category}
                  price={p.price}
                  imageUrl={p.imageUrl}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
