import { useContext } from "react";
import { UserContext } from "../Context/userContext";
import { Navigate } from "react-router-dom";

export default function UserConnected({ children }) {
  const { user } = useContext(UserContext);
  return user ? children : <Navigate to="/login" />;
}
