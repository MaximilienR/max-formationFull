import React from "react";

export default function Authorized() {
  return (
    <div className="text-center p-8">
      <h1 className="text-2xl font-bold text-red-600">Accès refusé</h1>
      <p>Vous devez être administrateur pour accéder à cette page.</p>
    </div>
  );
}
