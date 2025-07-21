import React from "react";
import video from "../Assets/video/cours_git.mp4";

export default function Coaching() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-8 lg:px-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        À Propos de Notre Coaching
      </h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Notre Mission
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Notre mission est de vous accompagner de manière personnalisée et
          efficace dans l’apprentissage de l’informatique, quel que soit votre
          niveau de départ. Nous vous aidons à développer des compétences
          numériques solides, pratiques et valorisables, pour atteindre vos
          objectifs personnels, scolaires ou professionnels.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Ce que Nous Vous Offrons
        </h2>
        <ul className="list-disc list-inside text-gray-700 leading-relaxed">
          <li>
            **Bilan de Compétences Personnalisé :** Identification de vos points
            forts, de vos compétences transférables et de vos axes
            d'amélioration.
          </li>
          <li>
            **Définition d'Objectifs Professionnels Clairs :** Clarification de
            vos aspirations et élaboration d'un plan d'action concret.
          </li>
          <li>
            **Optimisation de Votre Recherche d'Emploi :**
            <ul className="list-disc list-inside ml-6 mt-2">
              <li>Création d'un portfolio professionnel.</li>
              <li>
                Préparation aux entretiens d'embauche (simulations, techniques
                de communication).
              </li>
              <li>Stratégies de réseautage efficaces.</li>
              <li>
                Utilisation des plateformes et outils de recherche d'emploi.
              </li>
            </ul>
          </li>
          <li>
            **Développement de Vos Soft Skills :** Amélioration de vos
            compétences comportementales essentielles (communication, travail
            d'équipe, gestion du temps, etc.).
          </li>
          <li>
            **Renforcement de la Confiance en Soi :** Surmonter les doutes et
            valoriser votre potentiel.
          </li>
          <li>
            **Accompagnement Personnalisé :** Des séances de coaching
            individuelles adaptées à votre rythme et à vos besoins spécifiques.
          </li>
          <li>
            **Soutien et Motivation :** Un partenaire de confiance pour vous
            encourager et vous soutenir tout au long de votre parcours.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Pour Qui ?</h2>
        <p className="text-gray-700 leading-relaxed">
          Notre coaching s'adresse à toute personne se trouvant dans une phase
          de transition professionnelle, notamment :
        </p>
        <ul className="list-disc list-inside text-gray-700 leading-relaxed">
          <li>Les jeunes diplômés à la recherche de leur premier emploi.</li>
          <li>
            Les personnes en reconversion professionnelle souhaitant explorer de
            nouvelles voies.
          </li>
          <li>
            Les demandeurs d'emploi de longue durée ayant besoin d'un
            accompagnement renforcé.
          </li>
          <li>Les personnes souhaitant évoluer dans leur carrière actuelle.</li>
          <li>
            Toute personne désirant prendre en main son avenir professionnel
            avec un soutien expert.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Ils nous ont fait confiance
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Nous adoptons une approche holistique et centrée sur la personne. Nous
          prenons le temps de comprendre votre parcours, vos aspirations et vos
          contraintes pour vous proposer un accompagnement sur mesure. Notre
          méthode combine des outils concrets, des techniques de coaching
          éprouvées et un soutien humain chaleureux et motivant.
        </p>
      </section>

      <section className="mt-8 text-center">
        <video
          width="560"
          height="315"
          controls
          className="mx-auto rounded-lg shadow-lg"
        >
          <source src={video} type="video/mp4" />
          Votre navigateur ne supporte pas la lecture de vidéos HTML5.
        </video>
      </section>

      <section className="text-center">
        <p className="text-gray-700 mb-4">
          Prêt(e) à donner un nouvel élan à votre carrière ?
        </p>
        <a
          href="/contact"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full"
        >
          Contactez-nous pour une première consultation gratuite !
        </a>
      </section>
    </div>
  );
}
