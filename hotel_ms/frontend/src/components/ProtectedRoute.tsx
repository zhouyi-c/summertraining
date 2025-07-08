import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface Props {
  roleRequired: "admin" | "user";
  element: JSX.Element;
}

export default function ProtectedRoute({ roleRequired, element }: Props) {
  const { role } = useAuth();
  if (role !== roleRequired) {
    return <Navigate to="/login" replace />;
  }
  return element;
}
