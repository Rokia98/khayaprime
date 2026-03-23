import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        playfair: ['"Playfair Display"', 'serif'],
      },
      colors: {
        'khaya-primary': '#0F172A',      // Slate 900
        'khaya-secondary': '#D4AF37',    // Métal Doré (Gold) - Plus luxe
        'khaya-accent': '#10B981',       
        'khaya-light': '#FDFCFB',        // Papier texturé léger
        'khaya-gray': '#94a3b8',         
        'khaya-dark': '#050810',         // Noir profond
        'khaya-gold': '#B8860B',         // Dark Goldenrod
        'khaya-rose': '#F471B6',
      },
      backgroundImage: {
        "luxury-gradient": "linear-gradient(135deg, #0F172A 0%, #050810 100%)",
        "gold-gradient": "linear-gradient(90deg, #D4AF37 0%, #FBBF24 50%, #D4AF37 100%)",
      },
      boxShadow: {
        'luxury': '0 10px 30px -10px rgba(0, 0, 0, 0.3)',
        'gold-glow': '0 0 15px rgba(212, 175, 55, 0.3)',
        'premium-card': '0 20px 40px -15px rgba(0, 0, 0, 0.5)',
      },
      letterSpacing: {
        'luxury': '0.3em',
        'super-tight': '-0.05em',
      },
      borderWidth: {
        '3': '3px',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
