import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../api/axios"; //  axios instance

function ProtectedRoute({ children, allowedRole }) {
  const [loading, setLoading] = useState(true);   // prevents rendering before auth check
  const [allowed, setAllowed] = useState(false); // whether user has required role

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/auth/current-user"); // ✅ no hard-coded URL

        setAllowed(res.data.role === allowedRole);
      } catch {
        setAllowed(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [allowedRole]);

  if (loading) return null;

  if (!allowed) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
