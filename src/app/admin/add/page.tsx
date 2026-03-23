import ProductForm from "./ProductForm";

export default async function AddProductPage() {
  return (
    <div className="bg-[#050810] min-h-screen pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-12 text-center animate-reveal">
          <span className="text-khaya-secondary tracking-[0.3em] text-xs uppercase mb-2 block">Nouveau Modèle</span>
          <h1 className="text-4xl md:text-5xl font-serif text-white italic">Création de la <span className="text-khaya-secondary">Pièce</span></h1>
        </div>
        <div className="animate-reveal" style={{ animationDelay: '0.2s' }}>
          <ProductForm />
        </div>
      </div>
    </div>
  );
}
