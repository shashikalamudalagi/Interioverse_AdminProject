import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isAuth = useSelector((state) => state.auth.isAuth);

  if (!isAuth) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
