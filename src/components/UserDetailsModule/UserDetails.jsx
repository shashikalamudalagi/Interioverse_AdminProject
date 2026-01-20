import "./UserDetails.css";

function UserDetails({ user, onDelete }) {
  const isVerified = user?.status === "Verified";

  return (
    <div className="widget user-details">
      <div className="user-header">
        {isVerified && <span className="verified-icon">✔</span>}
        <h4>{user?.name || "Select a user"}</h4>
      </div>

      {user && <div className="user-role">{user.type}</div>}

      <div className="user-details-list">
        {user ? (
          <>
            <div className="detail-row"><span>Profile ID</span><b>{user.profileId}</b></div>
            <div className="detail-row"><span>Email ID</span><b>{user.email}</b></div>
            <div className="detail-row"><span>Phone Number</span><b>{user.phone}</b></div>
            <div className="detail-row"><span>User Type</span><b>{user.type}</b></div>
            <div className="detail-row"><span>Address</span><b>{user.address}</b></div>
            <div className="detail-row"><span>Pin Code</span><b>{user.pinCode || "-"}</b></div>
            <div className="detail-row"><span>Location</span><b>{user.location}</b></div>
            <div className="detail-row"><span>Instagram</span><b>{user.instagram || "-"}</b></div>
            <div className="detail-row"><span>LinkedIn</span><b>{user.linkedin || "-"}</b></div>
            <div className="detail-row"><span>Referral Count</span><b>{user.referralCount || 0}</b></div>
            <div className="detail-row"><span>Specialization</span><b>{user.specialization}</b></div>
            <div className="detail-row"><span>Experience</span><b>{user.experience}</b></div>
            <div className="detail-row"><span>Project Volume</span><b>{user.projectsCount}</b></div>
            <div className="detail-row"><span>Brand Name</span><b>{user.brand}</b></div>
            <div className="detail-row"><span>Registered Name</span><b>{user.registeredName}</b></div>
            <div className="detail-row"><span>Tag Line</span><b>{user.tagLine}</b></div>
            <div className="detail-row">
                      <span>Signup Date</span>
                   <b>
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString("en-IN")
                 : "-"}
                  </b>
                </div>

          </>
        ) : (
          <div className="no-user">No user selected</div>
        )}
      </div>

      <div className="user-actions">
        <button
            className="btn delete-btn"
            disabled={!user}
           onClick={() => onDelete(user)}
            >
    Delete User
</button>

      </div>
    </div>
  );
}

export default UserDetails;
