import ProductForm from "./ProductForm";

export default async function AddProductPage() {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="container max-w-2xl mx-auto px-6 py-12">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Ajouter un nouveau produit</h1>
          <ProductForm />
        </div>
      </div>
    </div>
  );
}
