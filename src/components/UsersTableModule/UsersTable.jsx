
import { useState, useMemo } from "react";
import { IoIosSearch } from "react-icons/io";
import "./UsersTable.css";

function UsersTable({ users, onSelect, onDelete, onToggleStatus }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [statusPopupUser, setStatusPopupUser] = useState(null);

  const displayUsers = useMemo(() => {
    let result = [...users];

    if (search.trim()) {
      result = result.filter((u) =>
        u.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filter !== "all") {
      result = result.filter(
        (u) => u.type?.toLowerCase() === filter.toLowerCase()
      );
    }

    return result;
  }, [users, search, filter]);

  return (
    <div className="users-card">
      {/* SEARCH */}
      <div className="search-row">
        <div className="search-wrapper">
          <IoIosSearch className="search-icon" />
          <input
            className="search"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="xyz-btn">+ XYZ</button>
      </div>

      {/* FILTERS */}
      <div className="filters-row">
        {["all", "Designer", "Agent", "User"].map((f) => (
          <button
            key={f}
            className={filter === f ? "active" : ""}
            onClick={() => {
              setFilter(f);
              setSearch("");
            }}
          >
            {f === "all" ? "Show all" : f}
          </button>
        ))}
      </div>

      {/* TABLE */}
      <div className="users-table-wrapper">
        <table>
          <thead>
            <tr>
              <th>User Profile ID</th>
              <th>Name</th>
              <th>Email ID</th>
              <th>Date</th>
              <th>Projects</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {displayUsers.map((u) => (
              <tr key={u._id} onClick={() => onSelect(u)}>
                <td className="profile-id-cell">
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/009/749/643/original/woman-profile-mascot-illustration-female-avatar-character-icon-cartoon-girl-head-face-business-user-logo-free-vector.jpg"
                    alt="profile"
                    className="profile-avatar"
                  />
                  <span className="profile-id-text">{u.profileId}</span>
                </td>

                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                      {u.createdAt
                      ? new Date(u.createdAt).toLocaleDateString("en-IN")
                    : "-"}
                    </td>

                <td>{u.projectsCount}</td>

                {/* STATUS BADGE */}
                <td>
                  <span
                    className={`badge ${
                      u.status === "Verified" ? "verified" : "pending"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setStatusPopupUser(u); //  ALWAYS clickable
                    }}
                  >
                    {u.status}
                  </span>
                </td>

                {/* DELETE */}
                <td>
                  <span
                    className="delete-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(u);
                    }}
                  >
                    🗑
                  </span>
                </td>
              </tr>
            ))}

            {displayUsers.length === 0 && (
              <tr>
                <td colSpan="7" className="no-users">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* STATUS CONFIRM MODAL */}
      {statusPopupUser && (
        <div className="modal-overlay">
          <div className="modal-box verify-modal">
            <p>
              Are you sure you want to{" "}
              <b>
                {statusPopupUser.status === "Verified"
                  ? "Not verify"
                  : "Verify"}
              </b>{" "}
              user <b>{statusPopupUser.name}</b>?
            </p>

            <div className="modal-actions">
              <button
                className="btn cancel"
                onClick={() => setStatusPopupUser(null)}
              >
                Cancel
              </button>

              <button
                className="btn confirm"
                onClick={() => {
                  onToggleStatus(statusPopupUser._id);
                  setStatusPopupUser(null);
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UsersTable;
