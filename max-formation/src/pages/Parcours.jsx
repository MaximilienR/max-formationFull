import React, { useEffect, useState } from "react";
import { getUserProgressions } from "../api/progression.api";

export default function Parcours() {
  const [finishedCourses, setFinishedCourses] = useState([]);
  const [currentCourses, setCurrentCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Remplace par la vraie récupération de ton token (context, localStorage...)
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setError("Utilisateur non connecté");
      setLoading(false);
      return;
    }

    async function fetchProgressions() {
      try {
        setLoading(true);
        const progressions = await getUserProgressions(token);

        const finished = progressions
          .filter((p) => p.etat === "terminé")
          .map((p) =>
            p.coursId && p.coursId.name ? p.coursId.name : "Cours supprimé"
          );

        const current = progressions
          .filter((p) => p.etat !== "terminé")
          .map((p) =>
            p.coursId && p.coursId.name ? p.coursId.name : "Cours supprimé"
          );

        setFinishedCourses(finished);
        setCurrentCourses(current);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Erreur lors du chargement des progressions");
        setLoading(false);
      }
    }

    fetchProgressions();
  }, [token]);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="text-red-600">Erreur : {error}</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto p-4 bg-sky-900 rounded-2xl">
        <main className="flex-1 flex items-center justify-center">
          <div className="container mx-auto p-4 bg-[#8ccf64] rounded-2xl">
            <div className="w-full p-2 text-center text-white font-bold rounded">
              Cours terminés
            </div>
          </div>
        </main>

        {finishedCourses.length > 0 ? (
          finishedCourses.map((coursId, index) => (
            <div
              key={index}
              className="mx-auto mt-4 w-40 p-2 text-center text-black bg-amber-50 font-semibold rounded shadow"
            >
              {coursId}
            </div>
          ))
        ) : (
          <div className="mx-auto mt-4 w-40 p-2 text-center text-gray-300 bg-gray-100 font-semibold rounded shadow">
            Aucun cours terminé
          </div>
        )}

        <div className="container mx-auto p-4 bg-yellow-400 rounded-2xl mt-4">
          <div className="w-full p-2 text-center text-white font-bold rounded">
            En cours
          </div>
        </div>

        {currentCourses.length > 0 ? (
          currentCourses.map((coursId, index) => (
            <div
              key={index}
              className="mx-auto mt-4 w-40 p-2 text-center text-black bg-amber-50 font-semibold rounded shadow mb-2"
            >
              {coursId}
            </div>
          ))
        ) : (
          <div className="mx-auto mt-4 w-40 p-2 text-center text-gray-300 bg-gray-100 font-semibold rounded shadow mb-2">
            Aucun cours en cours
          </div>
        )}
      </div>
    </div>
  );
}
