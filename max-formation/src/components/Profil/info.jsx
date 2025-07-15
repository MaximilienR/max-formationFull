import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { deleteAccount, updateUser } from "../../api/auth.api";

export default function Info() {
  const [email, setEmail] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.pseudo) setPseudo(user.pseudo);
      if (user.email) setEmail(user.email);
    }
  }, []);

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Es-tu sûr de vouloir supprimer ton compte ?")) return;

    try {
      const { ok, data } = await deleteAccount();
      if (ok) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.href = "/login";
      } else {
        alert(data.msg || "Erreur lors de la suppression.");
      }
    } catch (error) {
      alert("Erreur serveur, réessaye plus tard.");
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    // Vérification que mot de passe et confirmation correspondent
    if (motDePasse !== confirmPassword) {
      setErrors({ confirmPassword: "Les mots de passe ne correspondent pas." });
      return;
    } else {
      setErrors({});
    }

    try {
      const updatedData = {
        pseudo,
        email,
      };

      // On ajoute motDePasse seulement s'il est rempli
      if (motDePasse) {
        updatedData.password = motDePasse;
      }

      const { ok, data } = await updateUser(updatedData);

      if (ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Profil mis à jour !");
        // On vide les champs mot de passe après mise à jour
        setMotDePasse("");
        setConfirmPassword("");
      } else {
        alert(data.msg || "Erreur lors de la mise à jour.");
      }
    } catch (error) {
      alert("Erreur serveur.");
      console.error("Update error:", error);
    }
  };

  return (
    <div>
      <main className="w-full p-4 bg-sky-900">
        <h1 className="mb-4 text-2xl font-bold text-center text-amber-50">
          Profil
        </h1>
        <form onSubmit={handleUpdateProfile}>
          <div>
            <label
              htmlFor="pseudo"
              className="block mb-2 text-sm font-bold text-amber-50"
            >
              Pseudo:
            </label>
            <input
              type="text"
              id="pseudo"
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
              className="w-full p-2 bg-gray-100 border rounded"
              placeholder="Votre pseudo"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-bold text-amber-50"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 bg-gray-100 border rounded"
              placeholder="Votre email"
            />
          </div>

          <div>
            <label
              htmlFor="motDePasse"
              className="block mb-2 text-sm font-bold text-amber-50"
            >
              Mot de passe:
            </label>
            <input
              type="password"
              id="motDePasse"
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              className="w-full p-2 bg-gray-100 border rounded"
              placeholder="Votre mot de passe"
            />
          </div>

          <div className="relative">
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-sm font-bold text-amber-50"
            >
              Confirmer le mot de passe
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirmez le mot de passe"
              className="w-full p-2 bg-gray-100 border rounded"
            />
            <span
              onClick={toggleConfirmPasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-white cursor-pointer top-6"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-orange-200">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <button
              type="submit"
              className="rounded-md bg-yellow-400 px-4 py-2 text-sm font-semibold text-black shadow hover:bg-[#8ccf64] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
            >
              Enregistrer les modifications
            </button>

            <button
              type="button"
              className="px-4 py-2 text-sm font-semibold text-black bg-red-400 rounded-md shadow hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
              onClick={handleDeleteAccount}
            >
              Supprimer le compte
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
