// import { useEffect } from "react";
// import api from "../api/axios"; // ✅ axios instance

// import LoginCard from "../components/LoginCardModule/LoginCard";
// import "../styles/login.css";
// import logo from "../assets/login-bg.jpeg";

// function Login() {
//   useEffect(() => {
//     // FORCE LOGOUT when visiting login page
//     api.post("/auth/logout");
//   }, []);

//   return (
//     <>
//       <div className="login-header">
//         <img src={logo} alt="Interioverse" className="login-logo" />
//       </div>

//       <div className="login-wrapper">
//         <div className="image-container">
//           <LoginCard />
//         </div>
//       </div>
//     </>
//   );
// }

// export default Login;
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

import LoginCard from "../components/LoginCardModule/LoginCard";
import "../styles/login.css";
import logo from "../assets/login-bg.jpeg";

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/auth/current-user")
      .then((res) => {
        if (res.data.role === "admin") {
          navigate("/users", { replace: true });
        } else if (res.data.role === "user") {
          navigate("/signup", { replace: true });
        }
      })
      .catch(() => {
        // Not logged in → stay on login
      });
  }, [navigate]);

  return (
    <>
      <div className="login-header">
        <img src={logo} alt="Interioverse" className="login-logo" />
      </div>

      <div className="login-wrapper">
        <div className="image-container">
          <LoginCard />
        </div>
      </div>
    </>
  );
}

export default Login;

