// import LoginCard from "../components/LoginCard";
// import "../styles/login.css";

// function Login() {
//   return (
//     <div className="login-wrapper">
//       <div className="image-container">
//         <LoginCard />
//       </div>
//     </div>
//   );
// }
// export default Login;

import LoginCard from "../components/LoginCardModule/LoginCard";
import "../styles/login.css";
import logo from "../assets/login-bg.jpeg";

function Login() {
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

