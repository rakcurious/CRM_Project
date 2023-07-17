import { Outlet, Navigate, useLocation } from "react-router-dom";

function RequireAuth({ secureUser }) {
  const location = useLocation();
  return localStorage.getItem("userTypes") === secureUser[0] ? (
    <Outlet />
  ) : localStorage.getItem("userTypes") ? (
    <Navigate to="/unauthorised" state={{ from: location }} replace />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
}

export default RequireAuth;
