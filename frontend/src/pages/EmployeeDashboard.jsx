import { useDispatch, useSelector } from "react-redux";
import { checkIn, checkOut, getMyHistory } from "../features/attendance/attendanceSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function EmployeeDashboard() {
  const dispatch = useDispatch();
  const { today, loading, error } = useSelector((state) => state.attendance);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMyHistory());
  }, [dispatch]);

  return (
    <div className="dashboard-container">
      <h1>Employee Dashboard</h1>
      <p>Welcome, <strong>{user?.name}</strong> ({user?.role})</p>

      {user?.role === "manager" && (
        <div style={{
          backgroundColor: '#dbeafe',
          color: '#1e40af',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '1rem',
          borderLeft: '4px solid #3b82f6'
        }}>
          <strong>ℹ️ Manager Access:</strong> Click on <strong>"👥 Detailed Attendance"</strong> in the navigation to view and manage team attendance.
        </div>
      )}

      {error && (
        <div style={{
          backgroundColor: '#fee2e2',
          color: '#991b1b',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '1rem',
          borderLeft: '4px solid #dc2626'
        }}>
          <strong>⚠️ Error:</strong> {error}
        </div>
      )}

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <button onClick={() => dispatch(checkIn())} disabled={loading || (today?.checkIn)}>
          {loading ? "Marking..." : (today?.checkIn ? "✓ Checked In" : "Mark Check-In")}
        </button>
        <button onClick={() => dispatch(checkOut())} disabled={loading || !today?.checkIn || today?.checkOut}>
          {loading ? "Processing..." : (today?.checkOut ? "✓ Checked Out" : "Mark Check-Out")}
        </button>
      </div>

      {today && (
        <div className="dashboard-info">
          <h3>📅 Today's Status</h3>
          <p><strong>Date:</strong> {new Date(today.date).toLocaleDateString()}</p>
          <p><strong>Status:</strong> {today.status.toUpperCase()}</p>
          <p><strong>Check-In:</strong> {today.checkIn || 'Not yet'}</p>
          <p><strong>Check-Out:</strong> {today.checkOut || 'Not yet'}</p>
        </div>
      )}

      <Link to="/history">View My Attendance History →</Link>
    </div>
  );
}