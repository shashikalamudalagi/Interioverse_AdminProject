import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice";
import "./Header.css";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const handleLogoutConfirm = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <div className="top-header">
        {/* LEFT */}
        <div className="header-left">
          <span className="header-page">Users</span>
        </div>

        {/* RIGHT */}
        <div className="header-right">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="profile"
            className="avatar"
          />

          <button
            className="logout-btn"
            onClick={() => setShowLogoutPopup(true)}
          >
            Logout
          </button>
        </div>
      </div>

      {/* LOGOUT CONFIRM MODAL */}
      {showLogoutPopup && (
        <div className="modal-overlay">
          <div className="modal-box">
            <p>Are you sure you want to logout?</p>

            <div className="modal-actions">
              <button
                className="btn cancel"
                onClick={() => setShowLogoutPopup(false)}
              >
                Cancel
              </button>

              <button
                className="btn confirm"
                onClick={handleLogoutConfirm}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
