import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useSearchParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/url";

// Schéma yup pour validation du mot de passe et confirmation
const schema = yup.object().shape({
  password: yup
    .string()
    .required("Le mot de passe est obligatoire")
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .max(64, "Le mot de passe ne peut pas dépasser 64 caractères")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,64}$/,
      "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial."
    ),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "Les mots de passe ne correspondent pas"
    )
    .required("Confirmation requise"),
});

export default function Reset() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const submit = async (data) => {
    const token = searchParams.get("token");

    if (!token) {
      toast.error("Lien invalide ou expiré");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/user/resetPassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          newPassword: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Erreur lors de la réinitialisation");
      }

      toast.success("Mot de passe réinitialisé avec succès !");
      navigate("/login"); // redirige vers la page de connexion
    } catch (error) {
      toast.error(error.message || "Échec de la réinitialisation");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <form
        onSubmit={handleSubmit(submit)}
        className="container mx-auto p-12 bg-sky-900 rounded-2xl"
      >
        <div className="border-b border-gray-900/10 pb-12 space-y-12">
          <h1 className="text-3xl text-center mt-4 font-bold text-yellow-400">
            Nouveau mot de passe
          </h1>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* Mot de passe */}
            <div className="relative sm:col-span-6">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-bold text-amber-50"
              >
                Mot de passe
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Mot de passe"
                className="w-full p-2 bg-gray-100 border rounded"
                {...register("password")}
                disabled={isSubmitting}
                aria-invalid={errors.password ? "true" : "false"}
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-white cursor-pointer top-6"
                role="button"
                tabIndex={0}
                aria-label={
                  showPassword
                    ? "Masquer le mot de passe"
                    : "Afficher le mot de passe"
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    togglePasswordVisibility();
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              {errors.password && (
                <p className="text-orange-200 mt-1" role="alert">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirmation mot de passe */}
            <div className="relative sm:col-span-6">
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-bold text-amber-50"
              >
                Confirmer mot de passe
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Confirmez le mot de passe"
                className="w-full p-2 bg-gray-100 border rounded"
                {...register("confirmPassword")}
                disabled={isSubmitting}
                aria-invalid={errors.confirmPassword ? "true" : "false"}
              />
              <span
                onClick={toggleConfirmPasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-white cursor-pointer top-6"
                role="button"
                tabIndex={0}
                aria-label={
                  showConfirmPassword
                    ? "Masquer le mot de passe"
                    : "Afficher le mot de passe"
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    toggleConfirmPasswordVisibility();
                }}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              {errors.confirmPassword && (
                <p className="text-orange-200 mt-1" role="alert">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md bg-yellow-400 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-[#8ccf64] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 disabled:opacity-50"
          >
            {isSubmitting ? "Envoi..." : "Envoyer"}
          </button>
        </div>
      </form>
    </div>
  );
}
