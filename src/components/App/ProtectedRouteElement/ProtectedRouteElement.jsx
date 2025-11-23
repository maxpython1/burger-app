import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export function ProtectedRouteElement({ children, forAuthorized }) {
  const location = useLocation();
  const { user, isLoading } = useSelector((state) => state.auth);

  if (isLoading) {
    return null;
  }

  if (forAuthorized && !user) {
    return <Navigate to={"/login"} replace state={{ from: location }} />;
  }

  if (!forAuthorized && user) {
    const from = location.state?.from?.pathname || "/";
    return <Navigate to={from} replace />;
  }

  return children;
}
