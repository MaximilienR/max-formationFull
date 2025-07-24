import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import confetti from "canvas-confetti";
import { createCertificat } from "../api/certificat.api";
import { getQuizzByCoursId } from "../api/cours.api";
import { updateProgression, getUserProgressions } from "../api/progression.api";
import Certificat from "./Certificat";
import { getCoursById } from "../api/cours.api";

export default function Quizz() {
  const { coursId } = useParams();
  const [quizz, setQuizz] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [pseudo, setPseudo] = useState("");

  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [alreadyFinished, setAlreadyFinished] = useState(false);

  const token = localStorage.getItem("token");
  const [cours, setCours] = useState(null);

  // Vérifie si le cours est déjà terminé
  useEffect(() => {
    async function checkProgression() {
      if (!token) {
        setError("Utilisateur non connecté");
        setLoading(false);
        return;
      }
      try {
        const progressions = await getUserProgressions(token);
        const progressionForThisCourse = progressions.find(
          (p) => p.coursId?._id === coursId && p.etat === "terminé"
        );
        if (progressionForThisCourse) {
          setAlreadyFinished(true);
        }
      } catch (err) {
        setError("Erreur lors de la vérification de la progression.");
      }
    }
    checkProgression();
  }, [coursId, token]);

  // Récupération des questions du quiz
  useEffect(() => {
    async function fetchQuizz() {
      try {
        setLoading(true);
        const data = await getQuizzByCoursId(coursId);
        setQuizz(data);
      } catch (err) {
        setError("Erreur lors du chargement du quiz.");
      } finally {
        setLoading(false);
      }
    }
    fetchQuizz();
  }, [coursId]);

  // Récupération du pseudo depuis le localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.pseudo) setPseudo(user.pseudo);
    }
  }, []);

  // Récupération des infos du cours
  useEffect(() => {
    async function fetchCours() {
      try {
        const data = await getCoursById(coursId);
        setCours(data);
      } catch (err) {
        console.error("Erreur récupération cours :", err);
      }
    }
    fetchCours();
  }, [coursId]);

  // Gère la fin du quiz : confetti, certificat, progression
  useEffect(() => {
    if (finished && score === quizz.length && quizz.length > 0) {
      const duration = 2000;
      const animationEnd = Date.now() + duration;

      const frame = () => {
        confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 } });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });
        if (Date.now() < animationEnd) requestAnimationFrame(frame);
      };
      frame();

      if (pseudo && token && cours) {
        console.log("Cours avant création certificat :", cours);
        console.log("cours.title =", cours.title);

        createCertificat(
          {
            name: pseudo,
            date: new Date().toISOString(),
            courseName: cours.name, // <-- au lieu de cours.title
          },
          token
        ).catch((err) => console.error("Erreur création certificat :", err));
      }
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?._id;

      if (token && userId) {
        updateProgression({ userId, coursId, etat: "terminé" })
          .then(() => console.log("Progression mise à jour"))
          .catch((err) =>
            console.error("Erreur mise à jour progression :", err)
          );
      }
    }
  }, [finished, score, pseudo, quizz.length, coursId, token, cours]);

  if (loading) return <p>Chargement du quiz...</p>;
  if (error) return <p>{error}</p>;
  if (alreadyFinished)
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-bold text-green-600">
          Ce cours a déjà été terminé.
        </h2>
        <p className="mt-4">Vous ne pouvez pas repasser le quiz.</p>
        <Certificat />
      </div>
    );
  if (!quizz || quizz.length === 0)
    return <p>Aucune question disponible pour ce quiz.</p>;

  const currentQuestion = quizz[currentQuestionIndex];

  const handleAnswerClick = (index) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    if (index === currentQuestion.reponseCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizz.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      setFinished(true);
    }
  };

  return (
    <div className="flex flex-col items-center px-12">
      {finished && score === quizz.length ? (
        <Certificat />
      ) : (
        <div className="container mx-auto p-4 bg-sky-900 rounded-2xl font-['Josefin_Sans'] text-[#dfe4ea] mt-30 mb-30">
          <h1 className="mt-4 text-3xl font-bold text-center text-yellow-400">
            Quizz
          </h1>
          <p className="mt-1 text-sm text-center text-amber-50">
            Question {currentQuestionIndex + 1} sur {quizz.length}
          </p>

          <h2 className="text-2xl font-bold text-[#ffa502] text-center mt-10 mb-8">
            {currentQuestion.question}
          </h2>

          <div className="flex flex-wrap justify-center max-w-xl gap-10 mx-auto">
            {currentQuestion.reponse.map((reponse, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === currentQuestion.reponseCorrect;
              let bgColor = "bg-[#dfe4ea] text-black hover:bg-[#ffa502]";
              if (selectedAnswer !== null) {
                if (isSelected && !isCorrect) bgColor = "bg-red-400 text-white";
                else if (isCorrect) bgColor = "bg-green-400 text-black";
                else bgColor = "bg-[#dfe4ea] text-black";
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(index)}
                  disabled={selectedAnswer !== null}
                  className={`flex-1 basis-[45%] min-w-[140px] h-60 rounded px-6 py-4 font-semibold text-lg transition duration-500 active:scale-90 ${bgColor}`}
                >
                  {reponse}
                </button>
              );
            })}
          </div>

          {selectedAnswer !== null && !finished && (
            <div className="flex justify-center mt-8">
              <button
                onClick={handleNext}
                className="rounded-md bg-yellow-400 px-4 py-2 text-sm font-semibold text-black shadow hover:bg-[#8ccf64] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
              >
                {currentQuestionIndex < quizz.length - 1
                  ? "Question suivante"
                  : "Terminer"}
              </button>
            </div>
          )}

          {finished && (
            <div className="mt-8 text-center">
              <h3 className="text-2xl font-bold">
                Quiz terminé ! Score : {score} / {quizz.length}
              </h3>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
