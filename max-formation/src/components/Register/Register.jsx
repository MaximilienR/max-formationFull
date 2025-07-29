import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { signup } from "../../api/auth.api";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register() {
  // Schéma de validation avec Yup
  const schema = yup
    .object({
      pseudo: yup.string().required("Le pseudo est obligatoire"),
      email: yup
        .string()
        .email("Format d'e-mail non valide")
        .required("L'e-mail est obligatoire"),

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
        .required("La confirmation du mot de passe est obligatoire")
        .oneOf([yup.ref("password")], "Les mots de passe ne correspondent pas"),
      rgpd: yup
        .boolean()
        .oneOf(
          [true],
          "Vous devez accepter les conditions d'utilisation et la politique de confidentialité"
        ),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      pseudo: "",
      email: "",
      password: "",
      confirmPassword: "",

      rgpd: false,
    },
  });

  // États pour la visibilité des mots de passe
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Fonctions pour basculer la visibilité
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  async function submit(values) {
    console.log("Valeurs du formulaire soumises :", values);
    try {
      const response = await signup(values);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erreur API lors de l'inscription :", errorData);
        toast.error(
          errorData.message || "Une erreur est survenue lors de l'inscription."
        );
        return;
      }

      const successData = await response.json();
      console.log("Succès API inscription :", successData);
      toast.success(
        successData.messageOk ||
          "Inscription réussie ! Veuillez vérifier vos e-mails."
      );
      //vide les champs après inscription
      reset();
    } catch (error) {
      console.error("Erreur lors de l'appel API pour l'inscription :", error);
      toast.error(
        "Échec de l'inscription. Problème de connexion ou de serveur."
      );
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(submit)}
        className="container mx-auto p-12 bg-sky-900 rounded-2xl"
      >
        <div className="border-b border-gray-900/10 pb-12 space-y-12">
          <h1 className="text-3xl text-center mt-4 font-bold text-yellow-400">
            Créer un compte
          </h1>
          <p className="mt-1 text-sm/6 text-amber-50 text-center">
            Remplissez les champs ci-dessous pour vous inscrire
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* Pseudo */}
            <div className="sm:col-span-6">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-bold text-amber-50"
              >
                Pseudo
              </label>
              <input
                {...register("pseudo")}
                type="text"
                id="pseudo"
                placeholder="Votre pseudo"
                className="w-full p-2 bg-gray-100 border rounded"
              />
              {errors.pseudo && (
                <p className="text-orange-200">{errors.pseudo.message}</p>
              )}
            </div>

            {/* E-mail */}
            <div className="sm:col-span-6">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-bold text-amber-50"
              >
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                id="email"
                placeholder="votre@email.com"
                className="w-full p-2 bg-gray-100 border rounded"
              />
              {errors.email && (
                <p className="text-orange-200">{errors.email.message}</p>
              )}
            </div>

            {/* Mot de passe */}
            <div className="relative sm:col-span-6">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-bold text-amber-50"
              >
                Mot de passe
              </label>
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Mot de passe"
                className="w-full p-2 bg-gray-100 border rounded"
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-white cursor-pointer top-6"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              {errors.password && (
                <p className="text-orange-200">{errors.password.message}</p>
              )}
            </div>

            {/* Confirmation mot de passe */}
            <div className="relative sm:col-span-6">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-bold text-amber-50"
              >
                ConfirmerMot de passe
              </label>
              <input
                {...register("confirmPassword")}
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
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
                <p className="text-orange-200">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* RGPD */}
        <div className="mb-6">
          <label
            htmlFor="rgpd"
            className="block mb-2 text-sm font-bold text-amber-50 cursor-pointer"
          >
            <input
              type="checkbox"
              id="rgpd"
              {...register("rgpd")}
              className="mr-2 leading-tight"
            />
            J'accepte les conditions d'utilisation et la politique de
            confidentialité
          </label>
          {errors.rgpd && (
            <p className="mt-1 text-xs text-orange-200">
              {errors.rgpd.message}
            </p>
          )}
        </div>

        <div className="flex justify-center mt-4">
          <button className="rounded-md bg-yellow-400  px-4 py-2 text-sm font-semibold text-white shadow hover:bg-[#8ccf64] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">
            Envoyer
          </button>
        </div>
      </form>
    </>
  );
}
