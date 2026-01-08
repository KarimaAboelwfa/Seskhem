import { Navigate } from "react-router-dom";

export default function AuthGuard({ children }) {
  const token = localStorage.getItem("access");
  if (!token) return <Navigate to="/login" />;
  return children;
}
