import Link from 'next/link';
import { ShoppingCart, Search, Menu, User, Heart } from 'lucide-react';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-khaya-light">
      {/* Top Bar */}
      <div className="bg-khaya-primary text-white py-2">
        <div className="container mx-auto px-6">
          <div className="flex justify-center items-center text-sm">
            <span>✨ Livraison gratuite à partir de 50 000 FCFA • Retours gratuits sous 30 jours</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="text-center">
            <h1 className="font-playfair text-3xl font-bold bg-gradient-to-r from-khaya-primary to-khaya-secondary bg-clip-text text-transparent">
              <Link href="/">KHAYA PRIME</Link>
            </h1>
            <p className="text-xs text-khaya-secondary italic tracking-wide">ÉLÉGANCE & RAFFINEMENT</p>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="relative group py-2 px-1">
              <span className="text-khaya-primary font-medium group-hover:text-khaya-secondary transition-all duration-300">Accueil</span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-khaya-secondary to-khaya-accent group-hover:w-full transition-all duration-300"></div>
            </Link>
            <Link href="/homme" className="relative group py-2 px-1">
              <span className="text-khaya-primary font-medium group-hover:text-khaya-secondary transition-all duration-300">Homme</span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-khaya-secondary to-khaya-accent group-hover:w-full transition-all duration-300"></div>
            </Link>
            <Link href="/femme" className="relative group py-2 px-1">
              <span className="text-khaya-primary font-medium group-hover:text-khaya-secondary transition-all duration-300">Femme</span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-khaya-secondary to-khaya-accent group-hover:w-full transition-all duration-300"></div>
            </Link>
            <Link href="/nouveautes" className="relative group py-2 px-1">
              <span className="text-khaya-primary font-medium group-hover:text-khaya-secondary transition-all duration-300">Nouveautés</span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-khaya-secondary to-khaya-accent group-hover:w-full transition-all duration-300"></div>
            </Link>
            <Link href="/contact" className="relative group py-2 px-1">
              <span className="text-khaya-primary font-medium group-hover:text-khaya-secondary transition-all duration-300">Contact</span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-khaya-secondary to-khaya-accent group-hover:w-full transition-all duration-300"></div>
            </Link>
          </div>

          {/* Actions Menu */}
          <div className="flex items-center space-x-4">
            <button className="hidden md:block p-2 text-khaya-primary hover:text-khaya-secondary hover:bg-khaya-light rounded-full transition-all duration-300">
              <Search size={20} />
            </button>
            <button className="hidden md:block p-2 text-khaya-primary hover:text-khaya-secondary hover:bg-khaya-light rounded-full transition-all duration-300">
              <User size={20} />
            </button>
            <button className="hidden md:block p-2 text-khaya-primary hover:text-khaya-secondary hover:bg-khaya-light rounded-full transition-all duration-300">
              <Heart size={20} />
            </button>
            <button className="relative p-2 text-khaya-primary hover:text-khaya-secondary hover:bg-khaya-light rounded-full transition-all duration-300">
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-khaya-secondary to-khaya-gold text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg">
                0
              </span>
            </button>
            <button className="lg:hidden p-2 text-khaya-primary hover:text-khaya-secondary hover:bg-khaya-light rounded-full transition-all duration-300">
              <Menu size={22} />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
