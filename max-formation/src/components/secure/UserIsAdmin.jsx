import { useContext } from "react";
import { UserContext } from "../Context/userContext";
import { Navigate } from "react-router-dom";

export default function UserIsAdmin({ children }) {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}
