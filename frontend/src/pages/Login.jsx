import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ email: "", password: "" });

  const submit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser(form));
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        {/* Form Section */}
        <div className="auth-form-section">
          <h1>Login</h1>
          <div className="underline"></div>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={submit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                id="email"
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input 
                id="password"
                type="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "LOGIN"}
            </button>
          </form>
          <div className="auth-footer">
            Don't have an account? <a href="/register">Sign up</a>
          </div>
        </div>

        {/* Illustration Section */}
        <div className="auth-illustration-section">
          <div className="illustration-content">
            <div className="illustration-graphic"></div>
            <h2>Welcome Back!</h2>
            <p>Sign in to your account to track your attendance and manage your work schedule efficiently.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
