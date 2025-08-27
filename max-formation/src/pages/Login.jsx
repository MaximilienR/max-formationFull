import React, { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import * as yup from "yup";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { UserContext } from "../components/Context/userContext";
import { login } from "../api/auth.api";

// Schéma de validation
const schema = yup.object({
  email: yup
    .string()
    .email("Format email non valide")
    .required("Le champ est obligatoire"),
  password: yup.string().required("Le mot de passe est obligatoire"),
});

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/profil";

  const [isLocked, setIsLocked] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0); // en ms

  // Décompte dynamique (optionnel mais utile)
  useEffect(() => {
    if (!isLocked || remainingTime <= 0) return;

    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1000) {
          setIsLocked(false);
          clearInterval(interval);
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isLocked, remainingTime]);

const submit = async (data) => {
  try {
    const result = await login(data);

    setUser(result.user);
    toast.success("Connexion réussie !");
    navigate(from);

  } catch (error) {
    // error contient maintenant { msg, remainingTime, lockedUntil }
    if (error.remainingTime) {
      setIsLocked(true);
      setRemainingTime(error.remainingTime);
      toast.error(error.msg || "Compte bloqué temporairement.");
      return;
    }

    toast.error(error.msg || "Erreur inconnue");
  }
};

  return (
    <div className="container flex items-center justify-center p-4 mx-auto bg-sky-900 rounded-2xl mt-50 mb-50">
      <div className="w-full p-4 md:w-1/2 xl:w-1/3">
        <h1 className="mt-4 text-3xl font-bold text-center text-yellow-400">
          Connexion
        </h1>
        <form className="flex flex-col" onSubmit={handleSubmit(submit)}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-bold text-amber-50"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 bg-gray-100 border rounded"
              {...register("email")}
              placeholder="veuillez saisir votre email"
              disabled={isLocked}
            />
            {errors.email && (
              <p className="text-orange-200">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-bold text-amber-50"
            >
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 bg-gray-100 border rounded"
              placeholder="veuillez saisir votre mot de passe"
              {...register("password")}
              disabled={isLocked}
            />
            {errors.password && (
              <p className="text-orange-200">{errors.password.message}</p>
            )}
          </div>

          <label className="text-gray-100">
            Mot de passe oublié ?{" "}
            <NavLink className="mr-4" to="/Password">
              <span className="text-yellow-400">Ici</span>
            </NavLink>
          </label>

          {isLocked && (
            <p className="mt-2 text-center text-red-200">
              Compte bloqué. Veuillez réessayer dans{" "}
              <strong>{Math.ceil(remainingTime / 60000)} min</strong>.
            </p>
          )}

          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="rounded-md bg-yellow-400 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-[#8ccf64] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 disabled:opacity-50"
              disabled={isLocked}
            >
              {isLocked
                ? `Bloqué (${Math.ceil(remainingTime / 1000)}s)`
                : "Me connecter"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}