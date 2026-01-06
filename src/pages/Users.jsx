import { useState, useEffect } from "react";
import Header from "../components/HeaderModule/Header";
import Sidebar from "../components/SidebarModule/Sidebar";
import UsersTable from "../components/UsersTableModule/UsersTable";
import UserDetails from "../components/UserDetailsModule/UserDetails";
import ProjectsPanel from "../components/ProjectsPanelModule/ProjectsPanel";

import AuditLog from "../components/AuditLogModule/AuditLog";

import usersData from "../data/users";



const USERS_KEY = "usersData";
const SELECTED_USER_KEY = "selectedUserId";

function Users() {
  // ================= USERS (PERSISTED) =================
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem(USERS_KEY);
    return saved ? JSON.parse(saved) : usersData;
  });

  const [selectedUser, setSelectedUser] = useState(() => {
    const savedUsers = localStorage.getItem(USERS_KEY);
    const savedId = localStorage.getItem(SELECTED_USER_KEY);

    const list = savedUsers ? JSON.parse(savedUsers) : usersData;
    return list.find((u) => u.id === savedId) || list[0] || null;
  });

  // ================= DELETE CONFIRM =================
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // ================= AUDIT LOG =================
  const [auditLogs, setAuditLogs] = useState([]);

  

  const addAuditLog = (action, user) => {
    setAuditLogs((prev) => [
      {
        id: Date.now(),
        action,
        userName: user.name,
        time: new Date().toLocaleString(),
      },
      ...prev,
    ]);
  };

  // ================= PERSIST USERS =================
  useEffect(() => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }, [users]);

  // ================= PERSIST SELECTED USER =================
  useEffect(() => {
    if (selectedUser) {
      localStorage.setItem(SELECTED_USER_KEY, selectedUser.id);
    }
  }, [selectedUser]);

  // ================= DELETE =================
  const requestDelete = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    const user = users.find((u) => u.id === deleteId);
    if (user) addAuditLog("User Deleted", user);

    const updated = users.filter((u) => u.id !== deleteId);
    setUsers(updated);

    if (selectedUser?.id === deleteId) {
      setSelectedUser(updated[0] || null);
    }

    setShowConfirm(false);
    setDeleteId(null);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setDeleteId(null);
  };

  // ================= VERIFY / UNVERIFY =================
  const handleStatusToggle = (id) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          const newStatus =
            u.status === "Verified" ? "Not Verified" : "Verified";

          addAuditLog(
            newStatus === "Verified"
              ? "User Verified"
              : "User Unverified",
            u
          );

          return { ...u, status: newStatus };
        }
        return u;
      })
    );
  };

  // 🔹 NEW: UPDATE USER FROM EDIT POPUP
  const handleUpdateUser = (updatedUser) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === updatedUser.id ? updatedUser : u
      )
    );

    setSelectedUser(updatedUser);
    addAuditLog("User Updated", updatedUser);
  };

  return (
    <div className="dashboard-wrapper">
      <Sidebar />

      <div className="content-area">
        <Header />

        <div className="content-grid">
          <UsersTable
            users={users}
            onSelect={(user) => setSelectedUser(user)}
            onDelete={requestDelete}
            onToggleStatus={handleStatusToggle}
          />

          <div className="right-widgets two-column">
            <UserDetails
              user={selectedUser}
              onDelete={requestDelete}
              
            />

            {selectedUser && (
              <ProjectsPanel projects={selectedUser.projects} />
            )}
          </div>
        </div>
      </div>

      {/* DELETE CONFIRM POPUP */}
      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal-box">
            <p>Are you sure you want to delete this user?</p>
            <div className="modal-actions">
              <button className="btn cancel" onClick={cancelDelete}>
                Cancel
              </button>
              <button className="btn confirm" onClick={confirmDelete}>
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}


     

    </div>
  );
}

export default Users;
