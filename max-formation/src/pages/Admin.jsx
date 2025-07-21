import React, { useState, useEffect } from "react";
import Aside from "../components/Profil/aside";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import {
  createCours,
  getCours,
  deleteCours,
  updateCours,
} from "../api/cours.api";
import { convertToEmbedUrl } from "../utils/helper";

const schema = yup.object().shape({
  name: yup.string().required("Le nom du cours est obligatoire."),
  description: yup.string().required("La description est obligatoire."),
  explication: yup.string(),
  video: yup.string().url("URL invalide pour la vidéo.").nullable(),
  image: yup.string().required("L'image est obligatoire."),
  niveau: yup.number().min(1).max(5).required("Le niveau est obligatoire."),
});

export default function Admin() {
  const [showModal, setShowModal] = useState(false);
  const [cours, setCours] = useState([]);
  const [editingCoursId, setEditingCoursId] = useState(null);
  const [quiz, setQuiz] = useState([
    {
      question: "",
      answers: ["", "", "", ""],
      correctAnswerIndex: 0,
    },
  ]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      explication: "",
      video: "",
      image: "",
      niveau: 1,
    },
  });

  useEffect(() => {
    async function fetchCours() {
      try {
        const data = await getCours();
        setCours(data);
      } catch (error) {
        toast.error("Erreur lors du chargement des cours : " + error.message);
      }
    }
    fetchCours();
  }, []);

  const openEditModal = (coursItem) => {
    setEditingCoursId(coursItem._id);
    setValue("name", coursItem.name);
    setValue("description", coursItem.description);
    setValue("explication", coursItem.explication || "");
    setValue("video", coursItem.video || "");
    setValue("image", coursItem.image || "");
    setValue("niveau", coursItem.niveau || 1);
    setQuiz(
      coursItem.quiz || [
        {
          question: "",
          answers: ["", "", "", ""],
          correctAnswerIndex: 0,
        },
      ]
    );
    setShowModal(true);
  };

  const openAddModal = () => {
    setEditingCoursId(null);
    reset({
      name: "",
      description: "",
      explication: "",
      video: "",
      image: "",
      niveau: 1,
    });
    setQuiz([
      {
        question: "",
        answers: ["", "", "", ""],
        correctAnswerIndex: 0,
      },
    ]);
    setShowModal(true);
  };

  const handleSave = async (data) => {
    const embedVideoUrl = convertToEmbedUrl(data.video);

    const body = {
      ...data,
      video: embedVideoUrl,
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

      reset();
      setQuiz([
        {
          question: "",
          answers: ["", "", "", ""],
          correctAnswerIndex: 0,
        },
      ]);
      setEditingCoursId(null);
      setShowModal(false);
      toast.success("Cours enregistré avec succès !");
    } catch (error) {
      toast.error("Erreur : " + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce cours ?")) {
      try {
        await deleteCours(id);
        setCours((prev) => prev.filter((cours) => cours._id !== id));
        toast.success("Cours supprimé.");
      } catch (error) {
        toast.error("Erreur lors de la suppression : " + error.message);
      }
    }
  };

  const duplicateQuiz = (index) => {
    const questionToDuplicate = quiz[index];
    setQuiz([...quiz, { ...questionToDuplicate }]);
  };

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
              cours.map((coursItem) => (
                <tr key={coursItem._id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">
                    {coursItem.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      onClick={() => openEditModal(coursItem)}
                      className="bg-yellow-400 text-white font-semibold px-3 py-1 rounded mr-2 hover:bg-yellow-500"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(coursItem._id)}
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

              <form
                onSubmit={handleSubmit(handleSave)}
                className="space-y-6 bg-gray-300 p-8 rounded-2xl shadow-xl"
              >
                {/* Nom du cours */}
                <div>
                  <label className="block text-xl font-semibold mb-2 text-sky-900">
                    Nom du cours
                  </label>
                  <input
                    {...register("name")}
                    className="w-full px-4 py-2 rounded-lg bg-white text-black"
                  />
                  {errors.name && (
                    <p className="text-red-600">{errors.name.message}</p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xl font-semibold mb-2 text-sky-900">
                    Description du cours
                  </label>
                  <textarea
                    {...register("description")}
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg bg-white text-black"
                  />
                  {errors.description && (
                    <p className="text-red-600">{errors.description.message}</p>
                  )}
                </div>

                {/* Explication */}
                <div>
                  <label className="block text-xl font-semibold mb-2 text-sky-900">
                    Explication
                  </label>
                  <textarea
                    {...register("explication")}
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg bg-white text-black"
                  />
                  {errors.explication && (
                    <p className="text-red-600">{errors.explication.message}</p>
                  )}
                </div>

                {/* Video */}
                <div>
                  <label className="block text-xl font-semibold mb-2 text-sky-900">
                    Lien vidéo
                  </label>
                  <input
                    {...register("video")}
                    className="w-full px-4 py-2 rounded-lg bg-white text-black"
                  />
                  {errors.video && (
                    <p className="text-red-600">{errors.video.message}</p>
                  )}
                </div>

                {/* Image */}
                <div>
                  <label className="block text-xl font-semibold mb-2 text-sky-900">
                    Image d’illustration
                  </label>
                  <input
                    {...register("image")}
                    className="w-full px-4 py-2 rounded-lg bg-white text-black"
                  />
                  {errors.image && (
                    <p className="text-red-600">{errors.image.message}</p>
                  )}
                </div>

                {/* Niveau */}
                <div>
                  <label className="block text-xl font-semibold mb-2 text-sky-900">
                    Niveau
                  </label>
                  <select
                    {...register("niveau")}
                    className="w-full px-4 py-2 rounded-lg bg-white text-black"
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        Niveau {n}
                      </option>
                    ))}
                  </select>
                  {errors.niveau && (
                    <p className="text-red-600">{errors.niveau.message}</p>
                  )}
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
