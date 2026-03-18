import ProductCard from "@/components/ProductCard";
import { getConnection } from "@/lib/db";
import { ChevronRight, Mail, MapPin, Phone, Star, Truck, Shield, RotateCcw, Sparkles, Crown, Gift } from "lucide-react";
import { Product } from "@/types/Product";

async function getLatestProducts(): Promise<Product[]> {
  let connection;
  try {
    connection = await getConnection();
    const [rows] = await connection.execute(
      `SELECT id, name, price, imageUrl, category, gender 
       FROM Product 
       ORDER BY createdAt DESC 
       LIMIT 4`
    );
    return rows as Product[];
  } catch (error) {
    console.error("Impossible de récupérer les produits:", error);
    return []; // Retourner un tableau vide en cas d'erreur
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

export default async function Home() {
  const latestProducts = await getLatestProducts();

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background avec gradient animé */}
        <div className="absolute inset-0 bg-gradient-to-br from-khaya-primary via-khaya-dark to-khaya-primary"></div>
        <div className="absolute inset-0 bg-[url('/images/hero-pattern.svg')] opacity-10"></div>
        
        {/* Éléments géométriques flottants */}
        <div className="absolute top-20 left-10 w-20 h-20 border border-khaya-secondary/30 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-16 h-16 bg-khaya-secondary/10 rounded-lg rotate-45 animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-gradient-to-r from-khaya-secondary to-khaya-gold rounded-full animate-pulse delay-200"></div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          {/* Badge "Nouvelle Collection" */}
          <div className="inline-flex items-center px-6 py-2 bg-khaya-secondary/10 backdrop-blur-sm border border-khaya-secondary/20 rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-khaya-secondary mr-2" />
            <span className="text-khaya-secondary font-semibold text-sm uppercase tracking-wide">Nouvelle Collection 2024</span>
          </div>

          <h1 className="font-playfair text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
            Mode Africaine
            <span className="block bg-gradient-to-r from-khaya-secondary via-khaya-gold to-khaya-secondary bg-clip-text text-transparent">
              Contemporaine
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-khaya-gray mb-12 max-w-3xl mx-auto leading-relaxed">
            Découvrez l'élégance ivoirienne réinventée. Des pièces uniques qui célèbrent 
            <span className="text-khaya-secondary font-semibold"> l'héritage africain</span> avec une touche moderne exceptionnelle.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a href="/femme" className="group relative px-10 py-4 bg-gradient-to-r from-khaya-secondary to-khaya-gold rounded-full font-bold uppercase tracking-wide text-khaya-primary transition-all duration-300 hover:shadow-2xl hover:scale-105">
              <span className="relative z-10">Collection Femme</span>
              <div className="absolute inset-0 bg-white rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </a>
            <a href="/homme" className="group relative px-10 py-4 border-2 border-khaya-secondary text-khaya-secondary rounded-full font-bold uppercase tracking-wide transition-all duration-300 hover:bg-khaya-secondary hover:text-khaya-primary hover:shadow-2xl hover:scale-105">
              Collection Homme
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-khaya-secondary rounded-full flex justify-center">
            <div className="w-1 h-3 bg-khaya-secondary rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-r from-khaya-secondary to-khaya-gold rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-playfair text-xl font-bold text-khaya-primary mb-2">Livraison Express</h3>
              <p className="text-khaya-gray">Livraison gratuite dès 50 000 FCFA partout en Côte d'Ivoire</p>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-r from-khaya-accent to-khaya-secondary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-playfair text-xl font-bold text-khaya-primary mb-2">Qualité Garantie</h3>
              <p className="text-khaya-gray">Matériaux premium et artisanat traditionnel ivoirien</p>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-r from-khaya-rose to-khaya-secondary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <RotateCcw className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-playfair text-xl font-bold text-khaya-primary mb-2">Retours Faciles</h3>
              <p className="text-khaya-gray">30 jours pour changer d'avis, retours gratuits</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-24 bg-gradient-to-b from-khaya-light to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-khaya-secondary/10 rounded-full mb-6">
              <Crown className="w-4 h-4 text-khaya-secondary mr-2" />
              <span className="text-khaya-secondary font-semibold text-sm uppercase tracking-wide">Nos Collections</span>
            </div>
            <h2 className="font-playfair text-5xl font-bold text-khaya-primary mb-6">
              L'Élégance à la
              <span className="block text-khaya-secondary">Ivoirienne</span>
            </h2>
            <p className="text-xl text-khaya-gray max-w-3xl mx-auto">
              Plongez dans un univers où tradition et modernité se rencontrent pour créer des pièces d'exception
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="relative group cursor-pointer overflow-hidden rounded-3xl">
              <div className="absolute inset-0 bg-gradient-to-br from-khaya-primary/80 to-khaya-secondary/20 z-10"></div>
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
                style={{ backgroundImage: "url('/images/homme-category.jpg')" }}></div>
              <div className="relative z-20 h-96 flex flex-col justify-center items-center text-white p-8">
                <div className="w-16 h-16 border-2 border-white/30 rounded-full flex items-center justify-center mb-6 group-hover:border-khaya-secondary group-hover:bg-khaya-secondary/20 transition-all duration-300">
                  <Crown className="w-8 h-8" />
                </div>
                <h3 className="font-playfair text-4xl font-bold mb-3">Collection Homme</h3>
                <p className="text-center mb-6 text-lg opacity-90">Style sophistiqué et raffinement africain</p>
                <a href="/homme" className="inline-flex items-center px-8 py-3 border-2 border-white rounded-full font-semibold uppercase tracking-wide hover:bg-white hover:text-khaya-primary transition-all duration-300 group">
                  Découvrir
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
            </div>
            
            <div className="relative group cursor-pointer overflow-hidden rounded-3xl">
              <div className="absolute inset-0 bg-gradient-to-br from-khaya-rose/80 to-khaya-secondary/20 z-10"></div>
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
                style={{ backgroundImage: "url('/images/femme-category.jpg')" }}></div>
              <div className="relative z-20 h-96 flex flex-col justify-center items-center text-white p-8">
                <div className="w-16 h-16 border-2 border-white/30 rounded-full flex items-center justify-center mb-6 group-hover:border-khaya-rose group-hover:bg-khaya-rose/20 transition-all duration-300">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="font-playfair text-4xl font-bold mb-3">Collection Femme</h3>
                <p className="text-center mb-6 text-lg opacity-90">Élégance moderne et beauté authentique</p>
                <a href="/femme" className="inline-flex items-center px-8 py-3 border-2 border-white rounded-full font-semibold uppercase tracking-wide hover:bg-white hover:text-khaya-primary transition-all duration-300 group">
                  Découvrir
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Products Section */}
      <section id="nouveautes" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-khaya-accent/10 rounded-full mb-6">
              <Gift className="w-4 h-4 text-khaya-accent mr-2" />
              <span className="text-khaya-accent font-semibold text-sm uppercase tracking-wide">Tendances</span>
            </div>
            <h2 className="font-playfair text-5xl font-bold text-khaya-primary mb-6">Nos Dernières Créations</h2>
            <p className="text-xl text-khaya-gray max-w-2xl mx-auto">
              Découvrez les pièces qui font sensation dans notre nouvelle collection
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {latestProducts.map(product => (
              <ProductCard 
                key={product.id}
                id={product.id}
                name={product.name}
                category={product.category.name}
                price={product.price}
                imageUrl={product.imageUrl}
              />
            ))}
          </div>
          
          <div className="text-center">
            <a href="/nouveautes" className="inline-flex items-center px-10 py-4 bg-gradient-to-r from-khaya-primary to-khaya-dark text-white rounded-full font-bold uppercase tracking-wide hover:shadow-2xl hover:scale-105 transition-all duration-300">
              Voir toute la collection
              <ChevronRight className="w-5 h-5 ml-2" />
            </a>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gradient-to-b from-khaya-light to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-5xl font-bold text-khaya-primary mb-6">Parlons Mode</h2>
            <p className="text-xl text-khaya-gray max-w-2xl mx-auto">
              Une question, un conseil style ou un projet sur mesure ? Notre équipe est à votre écoute
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-start space-x-6 group">
                <div className="w-14 h-14 bg-gradient-to-r from-khaya-secondary to-khaya-gold rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-playfair text-2xl font-bold text-khaya-primary mb-2">Notre Atelier</h3>
                  <p className="text-khaya-gray text-lg">Cocody, Abidjan<br/>Côte d'Ivoire</p>
                  <p className="text-sm text-khaya-gray mt-2">Ouvert du lundi au samedi, 9h-18h</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-6 group">
                <div className="w-14 h-14 bg-gradient-to-r from-khaya-accent to-khaya-secondary rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-playfair text-2xl font-bold text-khaya-primary mb-2">Appelez-nous</h3>
                  <p className="text-khaya-gray text-lg">+225 XX XX XX XX</p>
                  <p className="text-sm text-khaya-gray mt-2">Service client disponible 7j/7</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-6 group">
                <div className="w-14 h-14 bg-gradient-to-r from-khaya-rose to-khaya-gold rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-playfair text-2xl font-bold text-khaya-primary mb-2">Écrivez-nous</h3>
                  <p className="text-khaya-gray text-lg">hello@khayaprime.com</p>
                  <p className="text-sm text-khaya-gray mt-2">Réponse sous 24h garantie</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-10 rounded-3xl shadow-2xl border border-khaya-light">
              <h3 className="font-playfair text-2xl font-bold text-khaya-primary mb-8 text-center">Contactez-nous</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input 
                    type="text" 
                    placeholder="Votre prénom" 
                    className="w-full px-6 py-4 border-2 border-khaya-light rounded-2xl focus:border-khaya-secondary focus:outline-none transition-colors duration-300" 
                  />
                  <input 
                    type="text" 
                    placeholder="Votre nom" 
                    className="w-full px-6 py-4 border-2 border-khaya-light rounded-2xl focus:border-khaya-secondary focus:outline-none transition-colors duration-300" 
                  />
                </div>
                <input 
                  type="email" 
                  placeholder="Votre adresse email" 
                  className="w-full px-6 py-4 border-2 border-khaya-light rounded-2xl focus:border-khaya-secondary focus:outline-none transition-colors duration-300" 
                />
                <textarea 
                  placeholder="Votre message..." 
                  rows={5} 
                  className="w-full px-6 py-4 border-2 border-khaya-light rounded-2xl focus:border-khaya-secondary focus:outline-none transition-colors duration-300 resize-none"
                ></textarea>
                <button 
                  type="submit" 
                  className="w-full px-8 py-4 bg-gradient-to-r from-khaya-secondary to-khaya-gold text-white font-bold uppercase tracking-wide rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  Envoyer le Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
