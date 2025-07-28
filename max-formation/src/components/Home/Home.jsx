import { Link } from "react-router-dom";
import devImage from "../../Assets/dev.jpg";

function Home() {
  return (
    <div className="container p-4 mx-auto">
      <header>
        <h1 className="mb-4 text-5xl font-bold text-center">
          L'aventure commence ici
        </h1>

        <img
          src={devImage}
          alt="Image"
          className="object-cover w-full mb-4 h-1/4"
        />
      </header>
      <main>
        <div className="flex flex-wrap justify-center">
          <section className="w-full p-4 md:w-1/2 xl:w-1/2">
            <h2 className="mb-2 text-3xl font-bold">Cours gratuit</h2>
            <Link to="/cours">
              <button className="px-4 py-2 font-bold text-white bg-yellow-400 rounded hover:bg-yellow-500">
                Découvrir les cours
              </button>
            </Link>
            <ul>
              <li>Accès à des cours en ligne gratuits</li>
              <li>Apprendre à votre propre rythme</li>
              <li>Accès à des ressources supplémentaires</li>
            </ul>
          </section>
          <section className="w-full p-4 md:w-1/2 xl:w-1/2">
            <h2 className="mb-2 text-3xl font-bold">Coatching personnalisé</h2>
            <Link to="/Coatch">
              <button className="px-4 py-2 font-bold text-white bg-yellow-400 rounded hover:bg-yellow-500">
                Découvrir le coaching
              </button>
            </Link>
            <ul>
              <li>Accès à un coach personnel</li>
              <li>Un plan de coaching personnalisé</li>
              <li>Accès à des outils et ressources exclusifs</li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Home;
