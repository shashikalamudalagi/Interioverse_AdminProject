
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Users from "./pages/Users";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC LOGIN */}
        <Route path="/" element={<Login />} />

        {/* USER ONLY – SIGNUP */}
        <Route
          path="/signup"
          element={
            <ProtectedRoute allowedRole="user">
              <Signup />
            </ProtectedRoute>
          }
        />

        {/* ADMIN ONLY – USERS */}
        <Route
          path="/users"
          element={
            <ProtectedRoute allowedRole="admin">
              <Users />
            </ProtectedRoute>
          }
        />

        {/* This route catches all unknown or invalid URLs and 
        redirects the user back to the login page */}
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
