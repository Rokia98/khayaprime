import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Contactez-nous</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Nous sommes à votre disposition pour toute question ou demande d'information.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <div>
            <h3 className="border-l border-khaya-primary pl-6 font-semibold text-gray-900">Adresse</h3>
            <address className="border-l border-gray-200 pl-6 pt-2 not-italic text-gray-600">
              <p>123 Rue de la Mode</p>
              <p>Dakar, 12345, Sénégal</p>
            </address>
          </div>
          <div>
            <h3 className="border-l border-khaya-primary pl-6 font-semibold text-gray-900">Téléphone</h3>
            <div className="border-l border-gray-200 pl-6 pt-2 text-gray-600">
              <p>+221 77 123 45 67</p>
              <p>Lundi - Vendredi, 9h - 18h</p>
            </div>
          </div>
          <div>
            <h3 className="border-l border-khaya-primary pl-6 font-semibold text-gray-900">Email</h3>
            <div className="border-l border-gray-200 pl-6 pt-2 text-gray-600">
              <p>
                <a href="mailto:contact@khayaprime.com" className="hover:text-khaya-primary">
                  contact@khayaprime.com
                </a>
              </p>
              <p>Nous répondons sous 24h</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
