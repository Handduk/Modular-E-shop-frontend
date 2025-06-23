import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export const ProtectedRoute = ({
  children,
  role,
}: {
  children: JSX.Element;
  role?: "ADMIN" | "USER";
}) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }
  return children;
};
