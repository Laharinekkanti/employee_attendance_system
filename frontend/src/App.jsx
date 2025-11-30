import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import ManagerHome from "./pages/ManagerHome";
import ManagerDashboard from "./pages/ManagerDashboard";
import MyHistory from "./pages/MyHistory";
import Navbar from "./components/Navbar";
import "./App.css";

function PrivateRoute({ children }) {
  const { token } = useSelector((s) => s.auth);
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  const { user } = useSelector((s) => s.auth);

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              {user?.role === "manager" ? <ManagerHome /> : <EmployeeDashboard />}
            </PrivateRoute>
          }
        />

        <Route
          path="/manager"
          element={
            <PrivateRoute>
              <ManagerDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/history"
          element={
            <PrivateRoute>
              <MyHistory />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
