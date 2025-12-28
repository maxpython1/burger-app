import { ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../../hooks/redux";

type ProtectedRouteElementProps = {
  children: ReactElement;
  forAuthorized: boolean;
};

export function ProtectedRouteElement({
  children,
  forAuthorized
}: ProtectedRouteElementProps) {
  const location = useLocation();
  const { user, isLoading } = useAppSelector((state) => state.auth);

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
