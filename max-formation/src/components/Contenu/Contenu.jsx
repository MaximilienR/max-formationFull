import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCoursById } from "../../api/cours.api";
import videoDefault from "../../Assets/video/html_base.mp4";

function CoursHTMLCSS() {
  const { id } = useParams();
  const [cours, setCours] = useState(null);
  const [isColored, setIsColored] = useState(false); // 🔴 Ajout de l'état

  useEffect(() => {
    async function fetchCours() {
      try {
        const data = await getCoursById(id);
        setCours(data);
      } catch (error) {
        console.error("Erreur de chargement :", error);
      }
    }
    fetchCours();
  }, [id]);

  const handleColorToggle = () => {
    setIsColored((prev) => !prev); // 🔄 Change l'état au clic
  };

  if (!cours) {
    return <div className="text-center text-white">Chargement...</div>;
  }

  const isYoutubeEmbed =
    cours.video && cours.video.includes("youtube.com/embed");
  const isDriveEmbed =
    cours.video && cours.video.includes("drive.google.com/file/d");

  return (
    <div className="container mx-auto p-6 bg-sky-900 rounded-2xl font-['Josefin_Sans'] text-[#dfe4ea] overflow-hidden">
      <h1 className="mt-4 text-3xl font-bold text-center">
        {cours.name || "Cours HTML & CSS"}
      </h1>

      <section className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold text-yellow-400">Explication</h2>

          <button
            onClick={handleColorToggle}
            className="rounded bg-yellow-300 px-4 py-2 text-black font-bold hover:bg-yellow-400"
          >
            changer mode
          </button>
        </div>

        <p
          className={`
      text-lg whitespace-pre-line font-medium tracking-wide 
      border border-red-400 rounded-lg p-4 shadow-lg 
      transition duration-300 ease-in-out max-w-full w-full box-border break-words max-h-200 overflow-y-auto
      font-[Inter]
      ${isColored ? "bg-black text-white" : "bg-gray-100 text-black"}
    `}
        >
          {cours.explication || "Aucune explication fournie."}
        </p>
      </section>

      <section className="mt-8 text-center">
        {isYoutubeEmbed || isDriveEmbed ? (
          <iframe
            width="560"
            height="315"
            src={cours.video}
            title="Video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="mx-auto rounded-lg shadow-lg"
          />
        ) : (
          <video
            width="560"
            height="315"
            controls
            className="mx-auto rounded-lg shadow-lg"
          >
            <source src={cours.video || videoDefault} type="video/mp4" />
            Votre navigateur ne supporte pas la lecture de vidéos HTML5.
          </video>
        )}
      </section>

      <div className="mt-8 text-center">
        <Link to={`/quizz/${cours._id}`}>
          <button className="rounded-md bg-yellow-400 px-6 py-3 text-sm font-semibold text-black shadow hover:bg-[#8ccf64] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">
            Passer au Quizz
          </button>
        </Link>
      </div>
    </div>
  );
}

export default CoursHTMLCSS;
