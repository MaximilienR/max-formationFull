import { createContext, useState, useEffect, useContext } from "react";

// Création du contexte
export const UserContext = createContext(null);

// Provider pour englober l'application
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  if (loading) {
    // Affiche un loader ou rien pendant le chargement initial
    return <div>Chargement...</div>;
  }

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook personnalisé pour consommer le contexte
export const UserAuth = () => useContext(UserContext);
