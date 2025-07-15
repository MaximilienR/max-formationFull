export default function Mention() {
  return (
    <div className="max-w-3xl px-4 py-8 mx-auto">
      <h1 className="mb-4 text-3xl font-bold">Mentions Légales</h1>

      <p>
        <strong>Dernière mise à jour :</strong> mardi 11 février 2025
      </p>

      <p>
        La micro-entreprise <strong>Mcompagny</strong> est enregistrée sous le
        numéro SIRET [*] et est domiciliée au [*] .
      </p>

      <p>
        Mcompagny est représentée par M. Maximilien Roussel, son responsable.
      </p>

      <p>
        Mcompagny propose ses services via une plateforme en ligne de
        [prestations de services numériques, vente de produits artisanaux selon
        ton objet réel].
      </p>

      <h2 className="mt-6 mb-2 text-2xl font-semibold">
        Directeur de la publication et responsable de la micro-entreprise
      </h2>

      <p>M. Maximilien Roussel</p>

      <h2 className="mt-6 mb-2 text-2xl font-semibold">Hébergement du site</h2>

      <p>
        Le site est hébergé par [render]
        <br />
        Adresse : [adresse complète de l’hébergeur, trouvable sur leurs mentions
        légales]
        <br />
        Téléphone : [numéro de l’hébergeur si disponible]
      </p>

      <h2 className="mt-6 mb-2 text-2xl font-semibold">Nous contacter</h2>

      <p>
        Par téléphone : <br />
        Par email :{" "}
        <a
          href="mailto:maxilienr.freelance@gmail.com"
          className="text-blue-600 underline"
        >
          maxilienr.freelance@gmail.com
        </a>
        <br />
        Par courrier : Mcompagny,
      </p>

      <h2 className="mt-6 mb-2 text-2xl font-semibold">Données personnelles</h2>

      <p>
        Vous bénéficiez d’un droit d’accès, de rectification et de suppression
        des informations vous concernant, que vous pouvez exercer par email à
        l’adresse maximilenr.freelance@gmail.com ou par courrier à l'adresse
        suivante : Mcompagny – Protection des données, [*]. Vous pouvez
        également, pour des motifs légitimes, vous opposer au traitement des
        données vous concernant.
      </p>

      <p>
        Pour plus d’informations sur vos droits, vous pouvez consulter notre{" "}
        <a
          href="[lien vers la Politique de Protection des Données Personnelles]"
          className="text-blue-600 underline"
        >
          Politique de Protection des Données Personnelles
        </a>
        .
      </p>
    </div>
  );
}
