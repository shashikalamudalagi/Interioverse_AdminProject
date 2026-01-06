import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import "./LoginCard.css";

function LoginCard() {
  const [username, setUsername] = useState("shashi");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ADMIN_USERNAME = "shashi";
  const ADMIN_PASSWORD = "4321";

  const handleLogin = () => {
    const newErrors = {};

    if (!username.trim()) newErrors.username = "Username is required*";
    if (!password.trim()) newErrors.password = "Password is required*";

    if (
      username &&
      password &&
      (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD)
    ) {
      newErrors.common = "Invalid admin credentials";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      dispatch(login());
      navigate("/users");
    }
  };

  return (
    <div className="login-card">
      <h2 className="login-title">Log in to account</h2>

      <div className="field">
        <label>User Name</label>
        <input
          type="text"
          placeholder="Type here"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setErrors((prev) => ({ ...prev, username: "", common: "" }));
          }}
        />
        {errors.username && (
          <span className="field-error">{errors.username}</span>
        )}
      </div>

      <div className="field">
        <label>Password</label>
        <input
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrors((prev) => ({ ...prev, password: "", common: "" }));
          }}
        />
        {errors.password && (
          <span className="field-error">{errors.password}</span>
        )}
      </div>

      {errors.common && (
        <span className="field-error center">{errors.common}</span>
      )}

      <button className="verify-btn" onClick={handleLogin}>
        Verify
      </button>
    </div>
  );
}

export default LoginCard;
