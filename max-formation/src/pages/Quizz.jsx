import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import confetti from "canvas-confetti";
import { createCertificat } from "../api/certificat.api";
import { getQuizzByCoursId } from "../api/cours.api";
import { updateProgression } from "../api/progression.api";
import Certificat from "./Certificat";

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

  const certificateRef = useRef(null);

  // Récupération des questions du quiz
  useEffect(() => {
    async function fetchQuizz() {
      try {
        setLoading(true);
        const data = await getQuizzByCoursId(coursId);
        setQuizz(data);
        setLoading(false);
      } catch (err) {
        setError("Erreur lors du chargement du quiz.");
        setLoading(false);
      }
    }
    fetchQuizz();
  }, [coursId]);

  // Récupération du pseudo
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.pseudo) setPseudo(user.pseudo);
    }
  }, []);

  // Gère la fin du quiz : confetti, certificat, progression
  useEffect(() => {
    if (finished && score === quizz.length) {
      const duration = 2000;
      const animationEnd = Date.now() + duration;

      const frame = () => {
        confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 } });
        confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 } });

        if (Date.now() < animationEnd) requestAnimationFrame(frame);
      };

      frame();

      // Création du certificat
      createCertificat({
        name: pseudo,
        date: new Date().toISOString(),
      }).catch((err) => {
        console.error("Erreur création certificat :", err);
      });

      // Mise à jour de la progression
      const token = localStorage.getItem("token");
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
  }, [finished, score, pseudo, quizz.length, coursId]);

  if (loading) return <p>Chargement du quiz...</p>;
  if (error) return <p>{error}</p>;
  if (!quizz || quizz.length === 0)
    return <p>Aucune question disponible pour ce quiz.</p>;

  const currentQuestion = quizz[currentQuestionIndex];

  const handleAnswerClick = (index) => {
    setSelectedAnswer(index);
    if (index === currentQuestion.reponseCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizz.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
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
            {currentQuestion.reponse.map((reponse, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(index)}
                disabled={selectedAnswer !== null}
                className={`flex-1 basis-[45%] min-w-[140px] h-60 rounded px-6 py-4 font-semibold text-lg transition duration-500 active:scale-90
                  ${
                    selectedAnswer !== null
                      ? index === selectedAnswer &&
                        index !== currentQuestion.reponseCorrect
                        ? "bg-red-400 text-white"
                        : index === currentQuestion.reponseCorrect
                        ? "bg-green-400 text-black"
                        : "bg-[#dfe4ea] text-black"
                      : "bg-[#dfe4ea] text-black hover:bg-[#ffa502]"
                  }
                `}
              >
                {reponse}
              </button>
            ))}
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
