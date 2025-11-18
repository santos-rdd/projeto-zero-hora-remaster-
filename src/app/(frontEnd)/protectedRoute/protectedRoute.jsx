import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isLogged = localStorage.getItem("userLogged");

  if (!isLogged) {
    return <Navigate to="/login" />;
  }

  return children;
}
