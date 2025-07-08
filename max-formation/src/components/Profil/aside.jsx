import React from "react";
import { Link } from "react-router-dom";

export default function Aside() {
  return (
    <aside className="w-64 p-4 bg-yellow-400">
      <Link to="/profil" className="block">
        <button className="w-full px-4 py-2 mt-4 font-bold text-left text-white bg-yellow-400 rounded hover:bg-yellow-500">
          Mes informations
        </button>
      </Link>
      <Link to="/achat" className="block">
        <button className="w-full px-4 py-2 mt-4 font-bold text-left text-white bg-yellow-400 rounded hover:bg-yellow-500">
          Mes achats
        </button>
      </Link>
      <Link to="/parcours" className="block">
        <button className="w-full px-4 py-2 mt-4 font-bold text-left text-white bg-yellow-400 rounded hover:bg-yellow-500">
          Mon parcours
        </button>
      </Link>
    </aside>
  );
}
