import React, { useState, useEffect } from "react";
import Aside from "../components/Profil/aside";
import {
  createCours,
  getCours,
  deleteCours,
  updateCours,
} from "../api/cours.api";

export default function Admin() {
  const [showModal, setShowModal] = useState(false);
  const [coursName, setCoursName] = useState("");
  const [description, setDescription] = useState("");
  const [explication, setExplication] = useState("");
  const [video, setVideo] = useState("");
  const [image, setImage] = useState("");
  const [niveau, setNiveau] = useState(1);
  const [cours, setCours] = useState([]);
  const [editingCoursId, setEditingCoursId] = useState(null);

  const [quiz, setQuiz] = useState([
    {
      question: "",
      answers: ["", "", "", ""],
      correctAnswerIndex: 0,
    },
  ]);

  const openAddModal = () => {
    setEditingCoursId(null);
    setCoursName("");
    setDescription("");
    setExplication("");
    setVideo("");
    setImage("");
    setNiveau(1);
    setQuiz([
      {
        question: "",
        answers: ["", "", "", ""],
        correctAnswerIndex: 0,
      },
    ]);
    setShowModal(true);
  };

  const openEditModal = async (cours) => {
    setEditingCoursId(cours._id);
    setCoursName(cours.name);
    setDescription(cours.description);
    setExplication(cours.explication || "");
    setVideo(cours.video || "");
    setImage(cours.image || "");
    setNiveau(cours.niveau || 1);

    // 🔴 Appel API pour récupérer le quiz du cours
    try {
      const response = await getQuizzByCoursId(cours._id);
      setQuiz(
        response || [
          {
            question: "",
            answers: ["", "", "", ""],
            correctAnswerIndex: 0,
          },
        ]
      );
    } catch (err) {
      console.error("Erreur lors de la récupération du quiz :", err);
      setQuiz([
        {
          question: "",
          answers: ["", "", "", ""],
          correctAnswerIndex: 0,
        },
      ]);
    }

    setShowModal(true);
  };

  const duplicateQuiz = (index) => {
    const questionToDuplicate = quiz[index];
    const newQuiz = [...quiz, { ...questionToDuplicate }];
    setQuiz(newQuiz);
  };

  const handleSave = async () => {
    if (!coursName.trim()) {
      alert("Le nom du cours est obligatoire.");
      return;
    }

    const body = {
      name: coursName,
      description,
      explication,
      video: video.trim() !== "" ? video : undefined,
      image: image.trim(),
      niveau: Number(niveau),
      quiz,
    };

    try {
      if (editingCoursId) {
        const updated = await updateCours(editingCoursId, body);
        setCours((prev) =>
          prev.map((c) => (c._id === editingCoursId ? updated : c))
        );
      } else {
        const newCours = await createCours(body);
        setCours((prev) => [...prev, newCours]);
      }

      setCoursName("");
      setDescription("");
      setExplication("");
      setVideo("");
      setImage("");
      setNiveau(1);
      setQuiz([
        {
          question: "",
          answers: ["", "", "", ""],
          correctAnswerIndex: 0,
        },
      ]);
      setEditingCoursId(null);
      setShowModal(false);
    } catch (error) {
      alert("Erreur : " + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce cours ?")) {
      try {
        await deleteCours(id);
        setCours((prev) => prev.filter((cours) => cours._id !== id));
      } catch (error) {
        alert("Erreur lors de la suppression du cours : " + error.message);
      }
    }
  };

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

  return (
    <div className="flex min-h-screen">
      <Aside className="min-w-[200px] bg-yellow-400 p-4" />

      <div className="flex-1 p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-sky-900">Panel Admin</h1>
          <button
            onClick={openAddModal}
            className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-4 py-2 rounded"
          >
            Ajouter un cours
          </button>
        </div>

        <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead>
            <tr className="bg-sky-900 text-white">
              <th className="border border-gray-300 px-4 py-2">Nom du cours</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {cours.length === 0 ? (
              <tr>
                <td
                  className="border border-gray-300 px-4 py-4 text-center text-gray-500"
                  colSpan={2}
                >
                  Aucun élément à afficher
                </td>
              </tr>
            ) : (
              cours.map((cours) => (
                <tr key={cours._id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">
                    {cours.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      onClick={() => openEditModal(cours)}
                      className="bg-yellow-400 text-white font-semibold px-3 py-1 rounded mr-2 hover:bg-yellow-500"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(cours._id)}
                      className="bg-red-600 text-white font-semibold px-3 py-1 rounded hover:bg-red-700"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {showModal && (
          <div className="fixed inset-0 bg-sky-900 text-[#dfe4ea] z-50 overflow-auto font-['Josefin_Sans']">
            <div className="max-w-4xl mx-auto p-8">
              <h1 className="text-4xl text-center font-bold mb-6">
                {editingCoursId
                  ? "Modifier le cours"
                  : "Ajouter un nouveau cours"}
              </h1>

              <p className="text-lg text-center mb-10 max-w-2xl mx-auto">
                Remplis les champs ci-dessous pour créer ou modifier un cours
                dans ta plateforme.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave();
                }}
                className="space-y-6 bg-gray-300 p-8 rounded-2xl shadow-xl"
              >
                {/* Nom, description, explication, video, image, niveau */}
                <div>
                  <label className="block text-xl font-semibold mb-2 text-sky-900">
                    Nom du cours
                  </label>
                  <input
                    type="text"
                    value={coursName}
                    onChange={(e) => setCoursName(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-white text-black"
                    placeholder="Ex : HTML & CSS - Débutant"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xl font-semibold mb-2 text-sky-900">
                    Description du cours
                  </label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-white text-black"
                    placeholder="Décris le contenu du cours"
                  />
                </div>

                <div>
                  <label className="block text-xl font-semibold mb-2 text-sky-900">
                    Explication du cours
                  </label>
                  <textarea
                    rows={4}
                    value={explication}
                    onChange={(e) => setExplication(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-white text-black"
                    placeholder="Ajoute une explication supplémentaire"
                  />
                </div>

                <div>
                  <label className="block text-xl font-semibold mb-2 text-sky-900">
                    Lien du cours (optionnel)
                  </label>
                  <input
                    type="url"
                    value={video}
                    onChange={(e) => setVideo(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-white text-black"
                    placeholder="https://exemple.com/video"
                  />
                </div>

                <div>
                  <label className="block text-xl font-semibold mb-2 text-sky-900">
                    Image d’illustration
                  </label>
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-white text-black"
                    placeholder="https://exemple.com/image.jpg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xl font-semibold mb-2 text-sky-900">
                    Niveau du cours (1 à 5)
                  </label>
                  <select
                    value={niveau}
                    onChange={(e) => setNiveau(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-white text-black"
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        Niveau {n}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Gestion du quiz */}
                {quiz.map((q, index) => (
                  <div
                    key={index}
                    className="border-2 border-sky-900 p-4 rounded-xl mb-6 bg-gray-200"
                  >
                    <h3 className="text-xl font-bold mb-4">
                      Question {index + 1}
                    </h3>

                    <div>
                      <label className="block text-lg font-semibold mb-2 text-sky-900">
                        Question du Quiz
                      </label>
                      <input
                        type="text"
                        value={q.question}
                        onChange={(e) => {
                          const updatedQuiz = [...quiz];
                          updatedQuiz[index].question = e.target.value;
                          setQuiz(updatedQuiz);
                        }}
                        className="w-full px-4 py-2 rounded-lg bg-white text-black"
                        placeholder="Ex: Quelle balise permet de créer un lien ?"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      {q.answers.map((answer, i) => (
                        <div key={i}>
                          <label className="block text-lg font-semibold mb-2 text-sky-900">
                            Réponse {i + 1}
                          </label>
                          <input
                            type="text"
                            value={answer}
                            onChange={(e) => {
                              const updatedQuiz = [...quiz];
                              updatedQuiz[index].answers[i] = e.target.value;
                              setQuiz(updatedQuiz);
                            }}
                            className="w-full px-3 py-2 rounded-lg bg-white text-black"
                            placeholder={`Réponse ${i + 1}`}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="mt-4">
                      <label className="block text-lg font-semibold mb-2 text-sky-900">
                        Numéro de la bonne réponse (1 à 4)
                      </label>
                      <select
                        value={q.correctAnswerIndex}
                        onChange={(e) => {
                          const updatedQuiz = [...quiz];
                          updatedQuiz[index].correctAnswerIndex = Number(
                            e.target.value
                          );
                          setQuiz(updatedQuiz);
                        }}
                        className="w-full px-4 py-2 rounded-lg bg-white text-black"
                      >
                        {[0, 1, 2, 3].map((i) => (
                          <option key={i} value={i}>
                            Réponse {i + 1}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mt-4 flex justify-end">
                      <button
                        type="button"
                        onClick={() => duplicateQuiz(index)}
                        className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-500"
                      >
                        Dupliquer cette question
                      </button>
                    </div>
                  </div>
                ))}

                <div className="flex justify-center mt-6">
                  <button
                    type="button"
                    onClick={() =>
                      setQuiz([
                        ...quiz,
                        {
                          question: "",
                          answers: ["", "", "", ""],
                          correctAnswerIndex: 0,
                        },
                      ])
                    }
                    className="bg-green-500 text-white font-semibold px-6 py-2 rounded hover:bg-green-600"
                  >
                    Ajouter une nouvelle question
                  </button>
                </div>

                <div className="flex justify-center gap-6 pt-6">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-6 py-2 bg-gray-300 text-black font-semibold rounded hover:bg-gray-400"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-yellow-400 text-black font-semibold rounded hover:bg-yellow-500"
                  >
                    {editingCoursId
                      ? "Enregistrer les modifications"
                      : "Créer le cours"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
