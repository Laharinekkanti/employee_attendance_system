import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyHistory } from "../features/attendance/attendanceSlice";

export default function MyHistory() {
  const dispatch = useDispatch();
  const { history } = useSelector((state) => state.attendance);
  const { user } = useSelector((state) => state.auth);

  // FIX: Added 'dispatch' to the dependency array.
  useEffect(() => {
    dispatch(getMyHistory());
  }, [dispatch]); // <-- FIX APPLIED HERE

  return (
    <div className="dashboard-container">
      <h1>My Attendance History</h1>
      <p>Viewing records for: <strong>{user?.name}</strong></p>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Check-In</th>
            <th>Check-Out</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {/* Added a safety check to ensure 'history' is an array before mapping */}
          {Array.isArray(history) && history.length > 0 ? (
            history.map((h) => (
              <tr key={h._id}>
                <td>{h.user?.name || user?.name || 'Unknown'}</td>
                <td>{new Date(h.date).toLocaleDateString()}</td>
                <td>{h.checkIn || 'N/A'}</td>
                <td>{h.checkOut || 'N/A'}</td>
                <td><strong>{h.status.toUpperCase()}</strong></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', color: '#999' }}>No attendance records found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}