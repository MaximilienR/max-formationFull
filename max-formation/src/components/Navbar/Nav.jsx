import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { UserAuth } from "../Context/userContext";

const Header = () => {
  const { user, setUser } = UserAuth();
  const isLoggedIn = !!user;
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setMenuOpen(false);
    navigate("/login");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="relative py-4 mb-3 text-white bg-yellow-400 rounded-b-2xl">
      <div className="container px-4 mx-auto flex items-center justify-center md:justify-center">
        {/* Menu central (toujours visible) */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link to="/" className="text-white hover:text-gray-300">
              Accueil
            </Link>
          </li>
          <li>
            <Link to="/cours" className="text-white hover:text-gray-300">
              Formation
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-white hover:text-gray-300">
              Contact
            </Link>
          </li>
        </ul>

        {/* --- Version desktop : icône utilisateur visible uniquement md et plus */}
        <div className="hidden md:block md:absolute md:top-1/2 md:right-4 md:-translate-y-1/2">
          <button
            onClick={toggleMenu}
            className="text-3xl text-white focus:outline-none"
          >
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

        {/* --- Version mobile : menu burger visible uniquement en dessous de md */}
        <div className="md:hidden ml-auto">
          <button
            onClick={toggleMenu}
            className="text-3xl text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Menu mobile complet (visible uniquement sur mobile) */}
      {menuOpen && (
        <div className="md:hidden bg-yellow-400 text-white px-4 py-6">
          <ul className="space-y-4">
            <li>
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="block hover:text-gray-300"
              >
                Accueil
              </Link>
            </li>
            <li>
              <Link
                to="/cours"
                onClick={() => setMenuOpen(false)}
                className="block hover:text-gray-300"
              >
                Formation
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="block hover:text-gray-300"
              >
                Contact
              </Link>
            </li>

            {isLoggedIn ? (
              <>
                <li>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      navigate("/profil");
                    }}
                    className="block w-full text-left hover:text-gray-300"
                  >
                    Profil
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleLogout();
                    }}
                    className="block w-full text-left hover:text-gray-300"
                  >
                    Déconnexion
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/register"
                    onClick={() => setMenuOpen(false)}
                    className="block hover:text-gray-300"
                  >
                    Inscription
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="block hover:text-gray-300"
                  >
                    Connexion
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Header;
