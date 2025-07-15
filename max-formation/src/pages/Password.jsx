import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { forgot } from "../api/auth.api";

const schema = yup.object({
  email: yup
    .string()
    .email("Format email non valide")
    .required("Le champ est obligatoire"),
});

export default function Password() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  async function submit(values) {
    setLoading(true);
    try {
      const result = await forgot({ email: values.email });
      if (result.ok) {
        toast.success("Email de réinitialisation envoyé !");
      } else {
        toast.error(result.data.message || "Erreur lors de l’envoi");
      }
    } catch (error) {
      toast.error("Erreur réseau ou serveur");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center  ">
      <div className="container flex items-center justify-center p-4 bg-sky-900 rounded-2xl">
        <div className="w-full p-4 md:w-1/2 xl:w-1/3">
          <h1 className="text-3xl text-center mt-4 font-bold text-yellow-400">
            Mot de passe oublié
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
                placeholder="Veuillez saisir votre email"
                disabled={loading}
              />
              {errors.email && (
                <p className="text-orange-200">{errors.email.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="rounded-md bg-yellow-400 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-[#8ccf64] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Envoi..." : "Envoyer"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
