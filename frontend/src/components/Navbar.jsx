import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user } = useSelector((s) => s.auth);
  const dispatch = useDispatch();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-links">
          <Link to="/" className="nav-link">
            {user?.role === "manager" ? "👨‍💼 Dashboard" : "🏠 Home"}
          </Link>

          {user?.role === "employee" && (
            <>
              {" | "}
              <Link to="/history" className="nav-link">
                📋 My History
              </Link>
            </>
          )}

          {user?.role === "manager" && (
            <>
              {" | "}
              <Link to="/manager" className="nav-link">
                👥 Detailed Attendance
              </Link>
            </>
          )}
        </div>

        <div className="nav-user-info">
          {user && (
            <span className="user-badge">
              👤 {user.name} <small>({user.role})</small>
            </span>
          )}
          <button onClick={() => dispatch(logout())} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
