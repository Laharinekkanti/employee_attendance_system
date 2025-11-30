import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "employee" });
  const [formError, setFormError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const submit = async (e) => {
    e.preventDefault();
    setFormError("");
    
    if (!form.name || !form.email || !form.password) {
      setFormError("All fields are required");
      return;
    }

    const res = await dispatch(registerUser(form));
    if (res.meta.requestStatus === "fulfilled") {
      navigate("/login");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-form-section">
          <h1>Create Account</h1>
          <div className="underline"></div>

          {(formError || error) && (
            <div className="error-message">
              {formError || error}
            </div>
          )}

          <form onSubmit={submit}>
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text"
                placeholder="Enter your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input 
                type="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Role</label>
              <select 
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              >
                <option value="employee">Employee</option>
                <option value="manager">Manager</option>
              </select>
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Creating Account..." : "Register"}
            </button>
          </form>

          <div className="auth-footer">
            Already have an account? <Link to="/login">Login here</Link>
          </div>
        </div>

        <div className="auth-illustration-section">
          <div className="illustration-content">
            <h2>Join Us!</h2>
            <p>Register to track your attendance and manage your time effectively.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
