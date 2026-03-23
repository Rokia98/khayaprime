import { Mail, MapPin, Phone, Crown, Instagram, Facebook } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="bg-white pt-32 pb-24">
      <div className="container mx-auto px-8">
        {/* Header Section Editorial */}
        <header className="mb-32 text-center">
          <p className="text-[10px] tracking-[0.5em] uppercase text-khaya-secondary font-bold mb-6">Maison Khaya</p>
          <h1 className="font-playfair text-5xl md:text-8xl font-black text-khaya-dark mb-8">Conciergerie<br/><span className="italic font-medium text-khaya-secondary">& Relation Client</span></h1>
          <div className="w-24 h-[1px] bg-khaya-secondary mx-auto mb-10"></div>
          <p className="text-sm md:text-base text-khaya-gray max-w-2xl mx-auto font-light leading-relaxed tracking-wide">
            Pour une demande de sur-mesure, une question sur une pièce exclusive ou un suivi de commande, 
            notre équipe est à votre entière disposition pour vous offrir une expérience d'exception.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          {/* Informations de contact Style Luxe */}
          <div className="space-y-16">
            <section className="group">
              <div className="flex items-center space-x-6 mb-6">
                <div className="w-12 h-12 rounded-full border border-khaya-secondary/20 flex items-center justify-center text-khaya-secondary group-hover:bg-khaya-secondary group-hover:text-white transition-all duration-500">
                  <MapPin size={20} strokeWidth={1.5} />
                </div>
                <h3 className="text-[11px] tracking-[0.4em] uppercase font-bold text-khaya-dark">L'Atelier Principal</h3>
              </div>
              <p className="text-sm text-khaya-gray font-light leading-loose pl-18 ml-18 border-l border-khaya-secondary/10">
                123 Boulevard de la Haute Couture<br/>
                Abidjan, Côte d'Ivoire<br/>
                <span className="text-xs italic text-khaya-secondary mt-2 block">Sur rendez-vous uniquement</span>
              </p>
            </section>

            <section className="group">
              <div className="flex items-center space-x-6 mb-6">
                <div className="w-12 h-12 rounded-full border border-khaya-secondary/20 flex items-center justify-center text-khaya-secondary group-hover:bg-khaya-secondary group-hover:text-white transition-all duration-500">
                  <Phone size={20} strokeWidth={1.5} />
                </div>
                <h3 className="text-[11px] tracking-[0.4em] uppercase font-bold text-khaya-dark">Ligne Prestige</h3>
              </div>
              <p className="text-sm text-khaya-gray font-light leading-loose pl-18 ml-18 border-l border-khaya-secondary/10">
                01 00 53 39 49<br/>
                Boutique en ligne - Disponible de 9:00 à 19:00
              </p>
            </section>

            <section className="group">
              <div className="flex items-center space-x-6 mb-6">
                <div className="w-12 h-12 rounded-full border border-khaya-secondary/20 flex items-center justify-center text-khaya-secondary group-hover:bg-khaya-secondary group-hover:text-white transition-all duration-500">
                  <Mail size={20} strokeWidth={1.5} />
                </div>
                <h3 className="text-[11px] tracking-[0.4em] uppercase font-bold text-khaya-dark">Correspondance</h3>
              </div>
              <p className="text-sm text-khaya-gray font-light leading-loose pl-18 ml-18 border-l border-khaya-secondary/10 hover:text-khaya-secondary transition-colors">
                <a href="mailto:contact@khayaprime.com">contact@khayaprime.com</a>
              </p>
            </section>

            <div className="pt-12 flex space-x-8">
               <a href="#" className="text-khaya-dark hover:text-khaya-secondary transition-colors"><Instagram size={20} strokeWidth={1.5} /></a>
               <a href="#" className="text-khaya-dark hover:text-khaya-secondary transition-colors"><Facebook size={20} strokeWidth={1.5} /></a>
            </div>
          </div>

          {/* Formulaire de contact Minimaliste */}
          <div className="bg-khaya-light/50 p-12 border border-khaya-secondary/5">
            <h3 className="font-playfair text-2xl font-bold text-khaya-dark mb-12">Nous Écrire</h3>
            <form className="space-y-10">
              <div className="relative">
                <input type="text" id="name" className="peer w-full bg-transparent border-b border-khaya-secondary/20 py-4 outline-none focus:border-khaya-secondary transition-colors uppercase text-[10px] tracking-widest font-bold" placeholder=" " />
                <label htmlFor="name" className="absolute left-0 top-4 text-[10px] tracking-widest text-khaya-gray uppercase transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-4 peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-khaya-secondary">Nom Complet</label>
              </div>
              <div className="relative">
                <input type="email" id="email" className="peer w-full bg-transparent border-b border-khaya-secondary/20 py-4 outline-none focus:border-khaya-secondary transition-colors uppercase text-[10px] tracking-widest font-bold" placeholder=" " />
                <label htmlFor="email" className="absolute left-0 top-4 text-[10px] tracking-widest text-khaya-gray uppercase transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-4 peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-khaya-secondary">Adresse Email</label>
              </div>
              <div className="relative">
                <textarea id="message" rows={4} className="peer w-full bg-transparent border-b border-khaya-secondary/20 py-4 outline-none focus:border-khaya-secondary transition-colors uppercase text-[10px] tracking-widest font-bold resize-none" placeholder=" "></textarea>
                <label htmlFor="message" className="absolute left-0 top-4 text-[10px] tracking-widest text-khaya-gray uppercase transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-4 peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-khaya-secondary">Votre Message</label>
              </div>
              <button type="submit" className="btn-luxury bg-khaya-dark text-white hover:bg-khaya-secondary w-full text-center">Envoyer la Demande</button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
