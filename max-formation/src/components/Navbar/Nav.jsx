import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { UserAuth } from "../Context/userContext";

const Header = () => {
  const { user, setUser } = UserAuth(); // ← utilise le contexte
  const isLoggedIn = !!user;
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null); // ← mets à jour le contexte
    setMenuOpen(false);
    navigate("/login");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="relative py-4 mb-3 text-white bg-yellow-400 rounded-b-2xl">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-center">
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="text-white hover:text-gray-300">Accueil</Link>
            </li>
            <li>
              <Link to="/cours" className="text-white hover:text-gray-300">Formation</Link>
            </li>
            <li>
              <Link to="/contact" className="text-white hover:text-gray-300">Contact</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="absolute -translate-y-1/2 top-1/2 right-4">
        <button onClick={toggleMenu} className="text-3xl text-white focus:outline-none">
          <FaUserCircle />
        </button>

        {menuOpen && (
          <div className="absolute right-0 z-50 w-40 mt-4 text-gray-800 bg-white rounded-md shadow-lg">
            <ul>
              {isLoggedIn ? (
                <>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-left hover:bg-yellow-400 hover:text-white"
                    >
                      Déconnexion
                    </button>
                  </li>

                  <li>
                    <button
                      onClick={() => navigate("/profil")}
                      className="block w-full px-4 py-2 text-left hover:bg-yellow-400 hover:text-white"
                    >
                      Profil
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/register"
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-2 hover:bg-yellow-400 hover:text-white"
                    >
                      Inscription
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/login"
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-2 hover:bg-yellow-400 hover:text-white"
                    >
                      Connexion
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
