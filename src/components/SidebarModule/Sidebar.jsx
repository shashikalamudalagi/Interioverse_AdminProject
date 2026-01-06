import { NavLink } from "react-router-dom";
import logo from "../../assets/login-bg.jpeg";
import "./Sidebar.css";

const sidebarItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Properties", path: "/properties" },
  { name: "Models", path: "/models" },
  { name: "Users", path: "/users" },
  { name: "Settings", path: "/settings" },
];

function Sidebar() {
  return (
    <div className="sidebar">
      {/* LOGO */}
      <img src={logo} alt="Interioverse" className="sidebar-logo" />

      <div className="sidebar-title">
  <span>Quick Actions</span>
  <i className="ri-menu-line sidebar-menu-icon"></i>
</div>


      <ul>
        {sidebarItems.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive ? "sidebar-item active" : "sidebar-item"
              }
            >
              <span className="plus">+</span>
              <span>{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
