import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="container flex items-center justify-center p-4 mx-auto bg-sky-900 rounded-2xl shadow-lg h-screen">
      <div className="w-full p-4 md:w-1/2 xl:w-1/3 text-center">
        <h1 className="text-9xl font-bold text-red-300 mb-4">ERROR 404</h1>
        <p className="text-lg text-amber-50">
          La page que vous cherchez n'existe pas.
        </p>
        <p className="text-lg text-amber-50">
          Veuillez vérifier l'URL ou revenir à la page d'accueil.
        </p>
        <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded mt-4">
          <Link to="/"> Revenir à la page d'accueil</Link>
        </button>
      </div>
    </div>
  );
}

export default Error;
