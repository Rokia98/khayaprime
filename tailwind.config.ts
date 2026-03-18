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
        'khaya-primary': '#0F172A',      // Slate 900 - Plus élégant
        'khaya-secondary': '#F59E0B',    // Amber 500 - Moderne et chaud  
        'khaya-accent': '#10B981',       // Emerald 500 - Frais et moderne
        'khaya-light': '#F8FAFC',        // Slate 50 - Backgrounds clairs
        'khaya-gray': '#64748B',         // Slate 500 - Texte secondaire
        'khaya-dark': '#1E293B',         // Slate 800 - Sections sombres
        'khaya-gold': '#FBBF24',         // Amber 400 - Accents dorés
        'khaya-rose': '#F472B6',         // Pink 400 - Accents féminins
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
