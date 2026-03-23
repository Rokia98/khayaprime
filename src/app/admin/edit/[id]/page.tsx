import { prisma } from "@/lib/prisma";
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
    try {
      const product = await prisma.product.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          imageUrl: true,
          gender: true,
          category: true
        }
      });
      return product as Product | null;
    } catch (error) {
      console.error(`Impossible de récupérer le produit avec l'ID ${id}:`, error);
      return null;
    }
  }

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-[#050810] min-h-screen pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-12 text-center animate-reveal">
          <span className="text-khaya-secondary tracking-[0.3em] text-xs uppercase mb-2 block">Édition</span>
          <h1 className="text-4xl md:text-5xl font-serif text-white italic">Retouche du <span className="text-khaya-secondary">Modèle</span></h1>
        </div>
        <div className="animate-reveal" style={{ animationDelay: '0.2s' }}>
          <EditProductForm product={product} />
        </div>
      </div>
    </div>
  );
}
