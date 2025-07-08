import React, { useEffect, useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import logo from "../Assets/M.png";
import signature from "../Assets/mysign.png";

export default function Certificat() {
  const [certificateId, setCertificateId] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [coursName, setCoursName] = useState("");

  const certificateRef = useRef(null);
  const bwCertificateRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setPseudo(parsedUser.pseudo || "Utilisateur inconnu");
      } catch (error) {
        console.error("Erreur lors de la lecture du pseudo :", error);
      }
    }

    const uniqueId = crypto.randomUUID();
    setCertificateId(uniqueId);

    const storedCoursName = localStorage.getItem("selectedCourseName");
    if (storedCoursName) {
      setCoursName(storedCoursName);
    }
  }, []);
  useEffect(() => {
    const storedCoursName = localStorage.getItem("selectedCourseName");
    if (storedCoursName) {
      setCoursName(storedCoursName);

      // 🔑 Mettre à jour la liste des cours terminés
      const finishedCourses = JSON.parse(
        localStorage.getItem("finishedCourses") || "[]"
      );
      if (!finishedCourses.includes(storedCoursName)) {
        finishedCourses.push(storedCoursName);
        localStorage.setItem(
          "finishedCourses",
          JSON.stringify(finishedCourses)
        );
      }
    }
  }, []);
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    setCurrentDate(formattedDate);
  }, []);

  const downloadPDF = () => {
    if (!bwCertificateRef.current) return;

    setIsDownloading(true);

    setTimeout(() => {
      html2canvas(bwCertificateRef.current, {
        scale: 2,
        useCORS: true,
      }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`certificat-${pseudo}.pdf`);
        setIsDownloading(false);
      });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      {/* Version couleur visible */}
      <div
        ref={certificateRef}
        className={`bg-sky-900 rounded-2xl shadow-xl p-10 max-w-3xl w-full text-center border-8 border-yellow-400 ${
          isDownloading ? "filter grayscale" : ""
        }`}
      >
        <h1 className="text-4xl font-extrabold text-yellow-500 mb-6 uppercase">
          Certificat de Réussite
        </h1>

        <p className="text-lg mb-8 text-amber-50">
          Ce certificat est décerné à
        </p>

        <h2 className="text-3xl font-bold text-sky-900 mb-4 underline bg-yellow-200 inline-block px-4 py-1 rounded">
          {pseudo}
        </h2>

        <p className="text-amber-50 text-lg mb-10">
          Pour avoir complété avec succès la formation{" "}
          <span className="font-semibold text-orange-500">
            {coursName || "[Nom de la formation]"}
          </span>
          , démontrant engagement et excellence.
        </p>

        <p className="text-sm text-amber-100 mt-4">
          <strong>Numéro du certificat :</strong> {certificateId}
        </p>

        <div className="flex justify-between items-center mt-8 px-6 text-sm">
          <div className="text-orange-500 text-base">
            <p>
              <span className="font-medium">Fait le :</span> {currentDate}
            </p>
            <img
              src={signature}
              alt="Signature"
              className="h-20 mx-auto mb-6"
            />
          </div>
          <div className="text-right text-gray-600">
            <div className="w-32 h-0.5 bg-gray-400 mx-auto mt-2"></div>
            <img src={logo} alt="Logo" className="h-20 mx-auto mb-6" />
          </div>
        </div>
      </div>

      {/* Version noir et blanc cachée, uniquement pour le PDF */}
      <div
        ref={bwCertificateRef}
        style={{
          position: "fixed",
          top: -10000,
          left: -10000,
          backgroundColor: "white",
          color: "black",
          padding: "2rem",
          width: "800px",
          fontFamily: "Arial, sans-serif",
          border: "4px solid black",
          borderRadius: "16px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontWeight: "900",
            fontSize: "2.5rem",
            marginBottom: "1rem",
            textTransform: "uppercase",
          }}
        >
          Certificat de Réussite
        </h1>

        <p style={{ fontSize: "1.25rem", marginBottom: "2rem" }}>
          Ce certificat est décerné à
        </p>

        <h2
          style={{
            fontWeight: "700",
            fontSize: "2rem",
            marginBottom: "1rem",
            textDecoration: "underline",
            display: "inline-block",
            padding: "0.25rem 1rem",
            borderRadius: "8px",
            backgroundColor: "#eee",
            color: "black",
          }}
        >
          {pseudo}
        </h2>

        <p style={{ fontSize: "1.25rem", marginBottom: "2rem" }}>
          Pour avoir complété avec succès la formation{" "}
          <span style={{ fontWeight: "600" }}>
            {coursName || "[Nom de la formation]"}
          </span>
          , démontrant engagement et excellence.
        </p>

        <p style={{ fontSize: "0.9rem", marginBottom: "2rem" }}>
          <strong>Numéro du certificat :</strong> {certificateId}
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "1rem",
            padding: "0 2rem",
          }}
        >
          <div>
            <p style={{ marginBottom: "1rem" }}>
              <span style={{ fontWeight: "500" }}>Fait le :</span> {currentDate}
            </p>
            {/* Signature en noir et blanc ou en simple image */}
            <img
              src={signature}
              alt="Signature"
              style={{
                height: "80px",
                filter: "grayscale(100%)",
                display: "block",
                margin: "0 auto",
              }}
            />
          </div>
          <div style={{ textAlign: "right" }}>
            <div
              style={{
                width: "120px",
                height: "2px",
                backgroundColor: "black",
                margin: "1rem auto 1rem 0",
              }}
            ></div>
            <img
              src={logo}
              alt="Logo"
              style={{
                height: "80px",
                filter: "grayscale(100%)",
                display: "block",
                margin: "0 auto",
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-6 w-full max-w-3xl">
        <button
          onClick={downloadPDF}
          className="rounded-md bg-yellow-400 px-6 py-3 text-sm font-semibold text-black shadow hover:bg-[#8ccf64] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
          disabled={isDownloading}
        >
          {isDownloading ? "Téléchargement..." : "Télécharger"}
        </button>
      </div>
    </div>
  );
}
