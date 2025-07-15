import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCours } from "../../api/cours.api";

function Tableau() {
  const [cours, setCours] = useState([]);
  const [hoveredCourse, setHoveredCourse] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const coursParPage = 6;

  useEffect(() => {
    async function fetchCours() {
      try {
        const data = await getCours();
        setCours(data);
      } catch (error) {
        alert("Erreur lors du chargement des cours : " + error.message);
      }
    }

    fetchCours();
  }, []);

  // Calcul pour pagination
  const indexOfLastCours = currentPage * coursParPage;
  const indexOfFirstCours = indexOfLastCours - coursParPage;
  const currentCours = cours.slice(indexOfFirstCours, indexOfLastCours);

  const totalPages = Math.ceil(cours.length / coursParPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex items-center justify-center">
        <div className="container mx-auto p-4 bg-sky-900 rounded-2xl">
          <h1 className="text-3xl text-center mt-4 font-bold text-yellow-400">
            Nos formations
          </h1>

          <div className="flex flex-wrap justify-center gap-6 mt-6">
            {currentCours.length === 0 ? (
              <p className="text-white text-center w-full">
                Aucun cours disponible pour le moment.
              </p>
            ) : (
              currentCours.map((cours) => (
                <div
                  key={cours._id}
                  className="relative w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 flex flex-col items-center text-center"
                >
                  <div
                    className="relative w-full h-48 overflow-hidden rounded-lg shadow-lg cursor-pointer flex items-center justify-center p-4 bg-amber-50 text-black text-sm transition-all duration-300"
                    onMouseEnter={() => setHoveredCourse(cours._id)}
                    onMouseLeave={() => setHoveredCourse(null)}
                  >
                    {hoveredCourse === cours._id ? (
                      <div className="relative z-10 flex flex-col items-center bg-amber-50">
                        <p className="mb-2 overflow-auto max-h-24">
                          {cours.description || "Aucune description."}
                        </p>
                        <div className="text-yellow-400 text-xl select-none flex items-center gap-2">
                          <h2 className="text-base font-semibold text-black m-0">
                            Niveau :
                          </h2>
                          <span>
                            {"★".repeat(cours.niveau || 3)}
                            {"☆".repeat(5 - (cours.niveau || 3))}
                          </span>
                        </div>
                        <div className="text-yellow-400 text-xl select-none flex items-center gap-2">
                          <h2 className="text-base font-semibold text-black m-0">
                            Prix :
                          </h2>
                          <span>GRATUIT</span>
                        </div>
                      </div>
                    ) : cours.image ? (
                      <img
                        src={cours.image}
                        alt={cours.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 relative z-10"
                      />
                    ) : (
                      <div className="text-center text-black">Aucune image</div>
                    )}
                  </div>

                  <h2 className="mt-3 text-lg font-semibold text-yellow-400">
                    {cours.name}
                  </h2>
                  <Link to={`/cours/${cours._id}`}>
                    <button
                      onClick={() =>
                        localStorage.setItem("selectedCourseName", cours.name)
                      }
                      className="rounded-md bg-yellow-400 px-4 py-2 text-sm font-semibold text-black shadow hover:bg-[#8ccf64] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                    >
                      En savoir +
                    </button>
                  </Link>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === index + 1
                      ? "bg-gray-200 text-black font-bold"
                      : "bg-yellow-400 text-gray-700"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Tableau;
