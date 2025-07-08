import React from "react";

export default function Footer() {
  return (
    <div>
      <footer className="bg-yellow-400 text-white py-4 mt-3 rounded-t-2xl   left-0 w-full">
        <div className="container mx-auto p-4">
          <div className="flex flex-wrap justify-center">
            <div className="w-full md:w-1/3 xl:w-1/3 p-4">
              <h4 className="text-lg font-bold mb-2">Conditions Générales</h4>
              <ul>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Utilisation des données personnelles
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Propriété intellectuelle
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Responsabilité
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Litiges
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/3 xl:w-1/3 p-4">
              <h4 className="text-lg font-bold mb-2">Mentions Légales</h4>
              <ul>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Identité du propriétaire du site
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Adresse du propriétaire du site
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Numéro de téléphone du propriétaire du site
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Adresse e-mail du propriétaire du site
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/3 xl:w-1/3 p-4">
              <h4 className="text-lg font-bold mb-2">Liens Utiles</h4>
              <ul>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Plan du site
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
