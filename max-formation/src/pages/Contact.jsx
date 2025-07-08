import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { FaCheckCircle } from "react-icons/fa"; // Importe l'icône de succès

import { contact } from "../api/contact.api";

const schema = yup
  .object({
    subject: yup.string().required("Le champ est obligatoire"),
    message: yup.string().required("Le champ est obligatoire"),
    email: yup
      .string()
      .email("Format email non valide")
      .required("Le champ est obligatoire"),
    rgpd: yup
      .boolean()
      .oneOf(
        [true],
        "Vous devez accepter les conditions d'utilisation et la politique de confidentialité"
      ),
  })
  .required();

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      subject: "",
      message: "",
      email: "",
    },
  });

  async function submit(values) {
    console.log(values);

    try {
      // Appel à l'API avec les données du formulaire, en passant 'values'
      const feedback = await contact(values);

      if (feedback && feedback.success) {
        console.log("message envoye");
        toast.success(
          "Email envoyé avec succès ! Veuillez vérifier votre boîte de réception."
        );
      } else if (feedback && feedback.error) {
        toast.error(feedback.error);
      } else {
        toast.error("Une erreur inconnue s'est produite.");
      }
    } catch (error) {
      console.error("Erreur lors de l'appel à l'API message:", error);
      toast.error("Échec de l'envoi du message. Veuillez réessayer.");
    }
  }

  return (
    <div className="flex justify-center px-12">
      <form
        onSubmit={handleSubmit(submit)}
        className="container p-12 mx-auto bg-sky-900 rounded-2xl"
      >
        <div className="pb-12 space-y-12 border-b border-gray-900/10">
          <h1 className="mt-4 text-3xl font-bold text-center text-yellow-400">
            Nous contacter
          </h1>
          <p className="mt-1 text-sm/6 text-amber-50">
            Une question ? veuillez remplir le formulaire ci dessous
          </p>

          <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <input
                type="text"
                name="subject"
                id="subject"
                placeholder="Sujet"
                className="w-full p-2 bg-gray-100 border rounded"
                {...register("subject")}
              />
              {errors.subject && (
                <p className="text-orange-300">{errors.subject.message}</p>
              )}
            </div>
            <div className="sm:col-span-3">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="w-full p-2 bg-gray-100 border rounded"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-orange-300">{errors.email.message}</p>
              )}
            </div>
            <div className="sm:col-span-6">
              <div className="mt-2">
                <textarea
                  name="message"
                  id="message"
                  placeholder="Votre message"
                  className="block w-full rounded-md bg-gray-200 px-3 py-1.5 text-white text-center outline-1 -outline-offset-1  focus:outline-2 focus:-outline-offset-2  sm:text-sm/6 mt-4 h-80"
                  {...register("message")}
                />
                {errors.message && (
                  <p className="text-orange-300">{errors.message.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="rgpd"
            className="block mb-2 text-sm font-bold cursor-pointer text-amber-50"
          >
            <input
              type="checkbox"
              id="rgpd"
              {...register("rgpd")}
              className="mr-2 leading-tight text-amber-50"
            />
            J'accepte les conditions d'utilisation et la politique de
            confidentialité
          </label>
          {errors.rgpd && (
            <p className="mt-1 text-xs text-orange-300">
              {errors.rgpd.message}
            </p>
          )}
        </div>

        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="rounded-md bg-yellow-400  px-4 py-2 text-sm font-semibold text-white shadow hover:bg-[#8ccf64] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
          >
            Envoyer
          </button>
        </div>
      </form>
    </div>
  );
}
