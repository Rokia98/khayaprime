import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: '--font-montserrat',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "KHAYA PRIME - Élégance & Style",
  description: "Boutique en ligne de vêtements pour homme et femme. Élégance et style inspirés de la Côte d'Ivoire.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${montserrat.variable} ${playfair.variable}`}>
      <body className="font-sans bg-gradient-to-br from-khaya-light via-white to-khaya-light text-khaya-primary antialiased min-h-screen">
        <Header />
        <main className="min-h-screen relative">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
