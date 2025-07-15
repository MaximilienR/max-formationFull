import { UserProvider } from "./components/Context/userContext";
import React from "react";
import ReactDOM from "react-dom/client";
import UserNotConnected from "./components/secure/UserNotConnected";
import UserConnected from "./components/secure/UserConnected";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Contact from "./pages/Contact";
import Error from "./pages/Error";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Login from "./pages/Login";
import Cours from "./components/Cours/Cours";
import Password from "./pages/Password";
import Detail from "./pages/details";
import Contenu from "./components/Contenu/Contenu";
import Coaching from "./pages/Coatching";
import Profil from "./pages/Profil";
import Quizz from "./pages/Quizz";
import Achat from "./pages/Achat";
import Certificat from "./pages/Certificat";
import Admin from "./pages/Admin";
import "./index.css";
import UserIsAdmin from "./components/secure/UserIsAdmin";
import Authorized from "./pages/Authorized";
import Reset from "./pages/Reset";
import Parcours from "./pages/Parcours";
import Mention from "./pages/Mention";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "admin",
        element: (
          <UserIsAdmin>
            <Admin />
          </UserIsAdmin>
        ),
      },

      {
        path: "contenu",
        element: (
          <UserConnected>
            <Contenu />
          </UserConnected>
        ),
      },
      { path: "contact", element: <Contact /> },

      { index: true, element: <Home /> },

      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "cours", element: <Cours /> },
      { path: "cours/:id", element: <Detail /> }, // ✅ vers page détail
      { path: "password", element: <Password /> },

      {
        path: "contenu/:id",
        element: (
          <UserConnected>
            <Contenu />
          </UserConnected>
        ),
      },
      { path: "Coatch", element: <Coaching /> },
      { path: "reset", element: <Reset /> },
      {
        path: "profil",
        element: (
          <UserConnected>
            <Profil />
          </UserConnected>
        ),
      },
      {
        path: "parcours",
        element: (
          <UserConnected>
            <Parcours />
          </UserConnected>
        ),
      },
      { path: "achat", element: <Achat /> },
      {
        path: "quizz/:coursId",
        element: (
          <UserConnected>
            <Quizz />
          </UserConnected>
        ),
      },

      { path: "certificat/:id", element: <Certificat /> },
      { path: "mention", element: <Mention /> },
      { path: "Authorized", element: <Authorized /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
