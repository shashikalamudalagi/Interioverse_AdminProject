import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios"; //  axios instance

import Header from "../components/HeaderModule/Header";
import Sidebar from "../components/SidebarModule/Sidebar";
import UsersTable from "../components/UsersTableModule/UsersTable";
import UserDetails from "../components/UserDetailsModule/UserDetails";
import ProjectsPanel from "../components/ProjectsPanelModule/ProjectsPanel";

function Users() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  // HARD LOCK BACK BUTTON
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);

    const blockBack = () => {
      window.history.pushState(null, "", window.location.href);
    };

    window.addEventListener("popstate", blockBack);
    return () => window.removeEventListener("popstate", blockBack);
  }, []);

  // ADMIN AUTH CHECK + FETCH USERS
  useEffect(() => {
    api.get("/admin/users")
      .then((res) => {
        setUsers(res.data);
        setSelectedUser(res.data[0] || null);
      })
      .catch(() => {
        navigate("/", { replace: true });
      });
  }, [navigate]);

  // DELETE CONFIRM
  const confirmDelete = async () => {
    try {
      await api.delete(`/admin/delete-user/${deleteUser._id}`);

      setUsers((prevUsers) => {
        const updatedUsers = prevUsers.filter(
          (u) => u._id !== deleteUser._id
        );

        // AUTO SELECT NEXT USER
        if (updatedUsers.length > 0) {
          setSelectedUser(updatedUsers[0]);
        } else {
          setSelectedUser(null);
        }

        return updatedUsers;
      });
    } catch (err) {
      console.error("Delete failed", err);
    } finally {
      setDeleteUser(null);
      setShowConfirm(false);
    }
  };

  // VERIFY USER
  const handleVerify = async (id) => {
    try {
      const res = await api.put(`/admin/verify-user/${id}`);

      const updatedUser = res.data;

      setUsers((prev) =>
        prev.map((u) => (u._id === updatedUser._id ? updatedUser : u))
      );

      setSelectedUser(updatedUser);
    } catch (err) {
      console.error("Verify failed", err);
    }
  };

  return (
    <div className="dashboard-wrapper">
      <Sidebar />

      <div className="content-area">
        <Header />

        <div className="content-grid">
          <UsersTable
            users={users}
            onSelect={setSelectedUser}
            onDelete={(user) => {
              setDeleteUser(user);
              setShowConfirm(true);
            }}
            onToggleStatus={handleVerify}
          />

          <div className="right-widgets two-column">
            <UserDetails
              user={selectedUser}
              onDelete={(user) => {
                setDeleteUser(user);
                setShowConfirm(true);
              }}
            />

            {selectedUser?.projects && (
              <ProjectsPanel projects={selectedUser.projects} />
            )}
          </div>
        </div>
      </div>

      {/* DELETE CONFIRM MODAL */}
      {showConfirm && deleteUser && (
        <div className="modal-overlay">
          <div className="modal-box delete-modal">
            <p>
              Are you sure you want to delete user{" "}
              <b>{deleteUser.name}</b>?
            </p>

            <div className="modal-actions">
              <button
                className="btn cancel"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>

              <button className="btn confirm" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
