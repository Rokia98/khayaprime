import { Facebook, Instagram, Twitter, Send, MapPin, Phone, Mail, Shield, Truck, RotateCcw } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-khaya-primary to-khaya-dark text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div className="col-span-1">
            <div className="mb-6">
              <h3 className="font-playfair text-3xl font-bold bg-gradient-to-r from-khaya-secondary to-khaya-gold bg-clip-text text-transparent mb-3">
                KHAYA PRIME
              </h3>
              <p className="text-khaya-gray leading-relaxed mb-6">
                Votre destination de luxe pour la mode africaine contemporaine. Nous célébrons l'élégance et l'authenticité à travers des créations uniques.
              </p>
              <div className="flex space-x-3">
                <a href="#" className="w-10 h-10 bg-khaya-dark/50 border border-khaya-secondary/20 rounded-full flex items-center justify-center hover:bg-khaya-secondary hover:border-khaya-secondary transition-all duration-300 group">
                  <Facebook size={18} className="group-hover:text-khaya-primary" />
                </a>
                <a href="#" className="w-10 h-10 bg-khaya-dark/50 border border-khaya-secondary/20 rounded-full flex items-center justify-center hover:bg-khaya-secondary hover:border-khaya-secondary transition-all duration-300 group">
                  <Instagram size={18} className="group-hover:text-khaya-primary" />
                </a>
                <a href="#" className="w-10 h-10 bg-khaya-dark/50 border border-khaya-secondary/20 rounded-full flex items-center justify-center hover:bg-khaya-secondary hover:border-khaya-secondary transition-all duration-300 group">
                  <Twitter size={18} className="group-hover:text-khaya-primary" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-playfair text-xl text-khaya-secondary mb-6">Navigation</h4>
            <ul className="space-y-3">
              {['Accueil', 'Collection Homme', 'Collection Femme', 'Nouveautés', 'À Propos'].map((item, index) => (
                <li key={index}>
                  <Link href={`/${item.toLowerCase().replace(/\s+/g, '-')}`} 
                    className="text-khaya-gray hover:text-khaya-secondary transition-all duration-300 flex items-center group">
                    <span className="w-0 group-hover:w-2 h-px bg-khaya-secondary transition-all duration-300 mr-0 group-hover:mr-2"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-playfair text-xl text-khaya-secondary mb-6">Services</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-khaya-secondary/10 rounded-full flex items-center justify-center">
                  <Truck size={14} className="text-khaya-secondary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Livraison Express</p>
                  <p className="text-xs text-khaya-gray">24-48h à Abidjan</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-khaya-secondary/10 rounded-full flex items-center justify-center">
                  <RotateCcw size={14} className="text-khaya-secondary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Retours Gratuits</p>
                  <p className="text-xs text-khaya-gray">Sous 30 jours</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-khaya-secondary/10 rounded-full flex items-center justify-center">
                  <Shield size={14} className="text-khaya-secondary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Paiement Sécurisé</p>
                  <p className="text-xs text-khaya-gray">100% protégé</p>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter & Contact */}
          <div>
            <h4 className="font-playfair text-xl text-khaya-secondary mb-6">Restons connectés</h4>
            <p className="text-khaya-gray mb-4 text-sm">Inscrivez-vous pour recevoir nos dernières collections et offres exclusives.</p>
            
            {/* Newsletter */}
            <form className="mb-6">
              <div className="flex rounded-lg overflow-hidden border border-khaya-secondary/20 bg-khaya-dark/30">
                <input 
                  type="email" 
                  placeholder="Votre email" 
                  className="flex-grow bg-transparent text-white placeholder-khaya-gray px-4 py-3 text-sm focus:outline-none"
                />
                <button type="submit" className="bg-khaya-secondary text-khaya-primary px-4 py-3 hover:bg-khaya-gold transition-all duration-300">
                  <Send size={16} />
                </button>
              </div>
            </form>

            {/* Contact Info */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin size={14} className="text-khaya-secondary" />
                <span className="text-khaya-gray">Abidjan, Côte d'Ivoire</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={14} className="text-khaya-secondary" />
                <span className="text-khaya-gray">0100533949</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={14} className="text-khaya-secondary" />
                <span className="text-khaya-gray">hello@khayaprime.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-khaya-secondary/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-khaya-gray">
              <p>&copy; {new Date().getFullYear()} KHAYA PRIME. Tous droits réservés. Fait avec ❤️ en Côte d'Ivoire.</p>
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-khaya-gray hover:text-khaya-secondary transition-colors">Politique de confidentialité</Link>
              <Link href="/terms" className="text-khaya-gray hover:text-khaya-secondary transition-colors">Conditions d'utilisation</Link>
              <Link href="/sitemap" className="text-khaya-gray hover:text-khaya-secondary transition-colors">Plan du site</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
