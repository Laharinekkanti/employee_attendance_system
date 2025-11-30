import { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAttendance } from "../features/attendance/attendanceSlice";
import { getTotalMembers } from "../features/auth/authSlice";
import api from "../api/axiosInstance";

export default function ManagerDashboard() {
  const dispatch = useDispatch();
  const { all } = useSelector((state) => state.attendance);
  const { totalMembers, membersBreakdown } = useSelector((state) => state.auth);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // FIX: Added 'dispatch' to the dependency array.
  useEffect(() => {
    dispatch(getAllAttendance());
    dispatch(getTotalMembers());
  }, [dispatch]); // <-- FIX APPLIED HERE

  // Filter and search logic with memoization
  const filteredRecords = useMemo(() => {
    return Array.isArray(all) ? all.filter((r) => {
      const nameMatch = r.user?.name?.toLowerCase().includes(searchTerm.toLowerCase());
      const dateMatch = filterDate ? new Date(r.date).toLocaleDateString() === new Date(filterDate).toLocaleDateString() : true;
      const statusMatch = filterStatus ? r.status === filterStatus : true;
      return nameMatch && dateMatch && statusMatch;
    }) : [];
  }, [all, searchTerm, filterDate, filterStatus]);

  // Get today's attendance stats with memoization
  const todayStats = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayRecords = filteredRecords.filter(r => {
      const recordDate = new Date(r.date);
      recordDate.setHours(0, 0, 0, 0);
      return recordDate.getTime() === today.getTime();
    });
    
    const presentToday = todayRecords.filter(r => r.checkIn).length;
    const absentToday = todayRecords.filter(r => !r.checkIn).length;
    
    return { presentToday, absentToday };
  }, [filteredRecords]);

  const exportCSV = useCallback(async () => {
    const res = await api.get("/attendance/export", { responseType: "blob" });
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.download = "attendance.csv";
    link.click();
  }, []);

  return (
    <div className="dashboard-container">
      <h1>👥 Manager Dashboard - Team Attendance</h1>

      {/* Members Summary */}
      <div className="members-summary">
        <div className="summary-card">
          <h3>Total Members</h3>
          <p className="big-number">{totalMembers}</p>
        </div>
        <div className="summary-card">
          <h3>Employees</h3>
          <p className="big-number">{membersBreakdown.employees}</p>
        </div>
        <div className="summary-card">
          <h3>Present Today</h3>
          <p className="big-number" style={{ color: '#10b981' }}>{todayStats.presentToday}</p>
        </div>
        <div className="summary-card">
          <h3>Absent Today</h3>
          <p className="big-number" style={{ color: '#ef4444' }}>{todayStats.absentToday}</p>
        </div>
      </div>

      <div className="manager-controls">
        <button onClick={exportCSV} className="btn-export">📥 Export CSV Report</button>
      </div>

      <h3>🔍 Search & Filter Team Attendance</h3>
      <div className="filter-section">
        <div className="filter-group">
          <label>Search Employee Name:</label>
          <input
            type="text"
            placeholder="Enter employee name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="filter-input"
          />
        </div>

        <div className="filter-group">
          <label>Filter by Date:</label>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="filter-input"
          />
        </div>

        <div className="filter-group">
          <label>Filter by Status:</label>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="filter-input">
            <option value="">All Status</option>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
            <option value="late">Late</option>
          </select>
        </div>

        <button 
          onClick={() => {
            setSearchTerm("");
            setFilterDate("");
            setFilterStatus("");
          }}
          className="btn-reset"
        >
          Reset Filters
        </button>
      </div>

      <h3>📋 All Attendance Records ({filteredRecords.length})</h3>
      <table border="1" cellPadding="8" className="attendance-table">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Date</th>
            <th>Check-In Time</th>
            <th>Check-Out Time</th>
            <th>Status</th>
            <th>Hours Worked</th>
          </tr>
        </thead>
        <tbody>
          {filteredRecords.length > 0 ? (
            filteredRecords.map((r) => {
              // Calculate hours worked
              let hoursWorked = "N/A";
              if (r.checkIn && r.checkOut) {
                try {
                  const checkInTime = new Date(`2000-01-01 ${r.checkIn}`);
                  const checkOutTime = new Date(`2000-01-01 ${r.checkOut}`);
                  const diff = (checkOutTime - checkInTime) / (1000 * 60 * 60);
                  hoursWorked = diff.toFixed(2) + " hrs";
                } catch {
                  hoursWorked = "Invalid";
                }
              }

              return (
                <tr key={r._id} className={r.status === "present" ? "row-present" : "row-absent"}>
                  <td><strong>{r.user?.name || "Unknown"}</strong></td>
                  <td>{new Date(r.date).toLocaleDateString()}</td>
                  <td>{r.checkIn || "—"}</td>
                  <td>{r.checkOut || "—"}</td>
                  <td>
                    <span className={`status-badge status-${r.status}`}>
                      {r.status.toUpperCase()}
                    </span>
                  </td>
                  <td>{hoursWorked}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", color: "#999" }}>
                No attendance records found matching your filters
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}