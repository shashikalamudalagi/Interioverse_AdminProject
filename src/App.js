import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "./pages/Login";
import Users from "./pages/Users";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const isAuth = useSelector((state) => state.auth.isAuth);

  return (
    <BrowserRouter>
      <Routes>
        {/* LOGIN PAGE */}
        <Route
          path="/"
          element={
            isAuth ? <Navigate to="/users" replace /> : <Login />
          }
        />

        {/* PROTECTED USERS PAGE */}
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
