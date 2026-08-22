import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


function Profile() {
  const { user, logout } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="profile-page">
        <div className="profile-login-card">
          <div className="profile-login-icon">👤</div>

          <h2>Login Required</h2>

          <p>
            Please login to view your profile and account information.
          </p>

          <Link to="/login" className="profile-login-btn">
            Login
          </Link>
        </div>
      </div>
    );
  }

  const firstName = user.first_name || "";
  const lastName = user.last_name || "";

  const fullName =
    `${firstName} ${lastName}`.trim() ||
    user.username ||
    "User";

  const firstLetter =
    fullName.charAt(0).toUpperCase();

  return (
    <div className="profile-page">

      <div className="profile-container">

        {/* ================= HEADER ================= */}

        <div className="profile-header">

          <Link
            to="/"
            className="profile-back-link"
          >
            ← Back to Home
          </Link>

          <div className="profile-heading">
            <span>MY ACCOUNT</span>
            <h1>Profile</h1>
            <p>
              Manage your account and view your information.
            </p>
          </div>

        </div>


        {/* ================= PROFILE CARD ================= */}

        <div className="profile-main-card">

          {/* Profile Top */}

          <div className="profile-top">

            <div className="profile-avatar">
              {firstLetter}
            </div>

            <div className="profile-user-info">

              <h2>{fullName}</h2>

              <p>
                @{user.username || "user"}
              </p>

              <span className="profile-status">
                ● Active Account
              </span>

            </div>

          </div>


          {/* ================= DETAILS ================= */}

          <div className="profile-details">

            <div className="profile-section-title">
              <h3>Personal Information</h3>
              <p>
                Your registered account details.
              </p>
            </div>


            <div className="profile-info-grid">

              {/* First Name */}

              <div className="profile-info-item">

                <span className="profile-info-label">
                  First Name
                </span>

                <strong>
                  {user.first_name || "Not provided"}
                </strong>

              </div>


              {/* Last Name */}

              <div className="profile-info-item">

                <span className="profile-info-label">
                  Last Name
                </span>

                <strong>
                  {user.last_name || "Not provided"}
                </strong>

              </div>


              {/* Username */}

              <div className="profile-info-item">

                <span className="profile-info-label">
                  Username
                </span>

                <strong>
                  {user.username || "Not provided"}
                </strong>

              </div>


              {/* Email */}

              <div className="profile-info-item">

                <span className="profile-info-label">
                  Email Address
                </span>

                <strong>
                  {user.email || "Not provided"}
                </strong>

              </div>

            </div>

          </div>


          {/* ================= QUICK ACTIONS ================= */}

          <div className="profile-actions-section">

            <div className="profile-section-title">
              <h3>Quick Actions</h3>
              <p>
                Quickly access your shopping activities.
              </p>
            </div>


            <div className="profile-actions">

              <Link
                to="/orders"
                className="profile-action-card"
              >

                <div className="profile-action-icon">
                  📦
                </div>

                <div>
                  <h4>My Orders</h4>
                  <p>
                    View your order history
                  </p>
                </div>

                <span>→</span>

              </Link>


              <Link
                to="/cart"
                className="profile-action-card"
              >

                <div className="profile-action-icon">
                  🛒
                </div>

                <div>
                  <h4>Shopping Cart</h4>
                  <p>
                    View items in your cart
                  </p>
                </div>

                <span>→</span>

              </Link>


              <Link
                to="/products"
                className="profile-action-card"
              >

                <div className="profile-action-icon">
                  🛍️
                </div>

                <div>
                  <h4>Continue Shopping</h4>
                  <p>
                    Explore our products
                  </p>
                </div>

                <span>→</span>

              </Link>

            </div>

          </div>


          {/* ================= LOGOUT ================= */}

          <div className="profile-logout-section">

            <button
              type="button"
              className="profile-logout-btn"
              onClick={logout}
            >
              Logout
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;