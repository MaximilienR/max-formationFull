import React, { useEffect, useState } from "react";
import Aside from "../components/Profil/aside";

function Achat() {
  const [achats, setAchats] = useState([]);
  
  // Récupérer user connecté
  const user = JSON.parse(localStorage.getItem("user"));
  const email = user?.email;

  useEffect(() => {
    if (email) {
      const allAchats = JSON.parse(localStorage.getItem("achats")) || [];
      // Filtrer uniquement les achats de l'utilisateur connecté
      const userAchats = allAchats.filter((achat) => achat.email === email);
      setAchats(userAchats);
    }
  }, [email]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <Aside className="w-1/6 p-4 bg-yellow-400" />
        <div className="flex-1">
          <table className="w-full border border-collapse border-gray-300 table-auto">
            <thead>
              <tr className="text-white bg-sky-900">
                <th className="px-4 py-2 border border-gray-300">Nom de l'article</th>
                <th className="px-4 py-2 border border-gray-300">Date</th>
                <th className="px-4 py-2 border border-gray-300">Lien</th>
              </tr>
            </thead>
            <tbody>
              {achats.length === 0 ? (
                <tr>
                  <td colSpan="3" className="p-4 text-center text-gray-500">
                    Vous n'avez encore aucun achat.
                  </td>
                </tr>
              ) : (
                achats.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border border-gray-300">{item.nom}</td>
                    <td className="px-4 py-2 border border-gray-300">{item.date}</td>
                    <td className="px-4 py-2 border border-gray-300">
{/*   A METTRE PLUS TARD <a href={item.lien} target="_blank" rel="noopener noreferrer">*/}
<a href="/contenu" target="_blank" rel="noopener noreferrer">
                        Voir
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Achat;
