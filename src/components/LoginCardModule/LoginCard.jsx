import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios"; // ✅ axios instance
import "./LoginCard.css";

function LoginCard() {
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");

    if (!role || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await api.post("/auth/login", { role, password });

      if (res.data.role === "admin") {
        navigate("/users", { replace: true });
      } else {
        navigate("/signup",{ replace: true });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-card">
      <h2 className="login-title">Log in to account</h2>

      <div className="field">
        <label>Role</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </div>

      <div className="field">
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {error && <span className="field-error center">{error}</span>}

      <button className="verify-btn" onClick={handleLogin}>
        Verify
      </button>
    </div>
  );
}

export default LoginCard;
