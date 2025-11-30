import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAttendance } from "../features/attendance/attendanceSlice";
import { getTotalMembers } from "../features/auth/authSlice";
import { Link } from "react-router-dom";
import { AttendancePieChart, AttendanceBarChart } from "../components/AttendanceChart";

export default function ManagerHome() {
  const dispatch = useDispatch();
  const { all } = useSelector((state) => state.attendance);
  const { membersBreakdown } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllAttendance());
    dispatch(getTotalMembers());
  }, [dispatch]);

  // Calculate today's attendance status per employee using useMemo
  const employeeStatus = useMemo(() => {
    if (Array.isArray(all) && all.length > 0) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Group by employee and get today's record
      const employeeMap = {};
      
      all.forEach((record) => {
        const recordDate = new Date(record.date);
        recordDate.setHours(0, 0, 0, 0);

        if (recordDate.getTime() === today.getTime()) {
          const userId = record.user?._id || record.user;
          if (!employeeMap[userId]) {
            employeeMap[userId] = record;
          }
        }
      });

      // Convert to array and sort
      return Object.values(employeeMap).sort((a, b) => {
        return (b.checkIn ? 1 : 0) - (a.checkIn ? 1 : 0);
      });
    }
    return [];
  }, [all]);

  const presentToday = employeeStatus.filter(e => e.checkIn).length;
  const absentToday = employeeStatus.filter(e => !e.checkIn).length;

  // Calculate attendance data for each employee
  const chartData = useMemo(() => {
    if (!Array.isArray(all) || all.length === 0) return [];
    
    const employeeStats = {};
    
    all.forEach((record) => {
      const empId = record.user?._id || record.user;
      const empName = record.user?.name || "Unknown";
      
      if (!employeeStats[empId]) {
        employeeStats[empId] = {
          name: empName,
          presentDays: 0,
          absentDays: 0,
        };
      }
      
      if (record.checkIn) {
        employeeStats[empId].presentDays++;
      } else {
        employeeStats[empId].absentDays++;
      }
    });
    
    return Object.values(employeeStats);
  }, [all]);

  return (
    <div className="dashboard-container">
      <h1>👨‍💼 Manager Home Dashboard</h1>
      <p>Welcome back, <strong>{user?.name}</strong></p>

      {/* Quick Stats */}
      <div className="quick-stats">
        <div className="stat-card stat-total">
          <h3>Total Team Members</h3>
          <p className="stat-number">{membersBreakdown?.employees ?? 0}</p>
        </div>

        <div className="stat-card stat-present">
          <h3>Present Today</h3>
          <p className="stat-number" style={{ color: '#10b981' }}>{presentToday}</p>
          <p className="stat-percent">{employeeStatus.length > 0 ? Math.round((presentToday / employeeStatus.length) * 100) : 0}%</p>
        </div>

        <div className="stat-card stat-absent">
          <h3>Absent Today</h3>
          <p className="stat-number" style={{ color: '#ef4444' }}>{absentToday}</p>
          <p className="stat-percent">{employeeStatus.length > 0 ? Math.round((absentToday / employeeStatus.length) * 100) : 0}%</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <Link to="/manager" className="action-button">
          <span className="action-icon">📊</span>
          <span>Detailed Attendance Report</span>
        </Link>
        <button className="action-button" onClick={() => window.location.href = '/manager'}>
          <span className="action-icon">🔍</span>
          <span>Search & Filter</span>
        </button>
      </div>

      {/* Employee Status List */}
      <h2>🏢 Team Status - Today</h2>
      <div className="employee-status-list">
        {employeeStatus.length > 0 ? (
          employeeStatus.map((emp) => (
            <div key={emp._id} className={`employee-card ${emp.checkIn ? 'checked-in' : 'absent'}`}>
              <div className="employee-header">
                <h3>{emp.user?.name || "Unknown Employee"}</h3>
                <span className={`status-indicator ${emp.checkIn ? 'present' : 'absent'}`}>
                  {emp.checkIn ? "✓ Present" : "✗ Absent"}
                </span>
              </div>
              <div className="employee-times">
                {emp.checkIn ? (
                  <>
                    <p><strong>Check-In:</strong> {emp.checkIn}</p>
                    <p><strong>Check-Out:</strong> {emp.checkOut || "Not yet"}</p>
                  </>
                ) : (
                  <p className="absent-text">No attendance recorded</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>No attendance records for today yet.</p>
          </div>
        )}
      </div>

      {/* Team Overview */}
      <h2>📈 Team Overview</h2>
      <div className="team-overview">
        <div className="overview-item">
          <span className="overview-label">✓ Checked In:</span>
          <span className="overview-value present">{presentToday}</span>
        </div>
        <div className="overview-item">
          <span className="overview-label">✗ Absent:</span>
          <span className="overview-value absent">{absentToday}</span>
        </div>
        <div className="overview-item">
          <span className="overview-label">Total:</span>
          <span className="overview-value">{membersBreakdown?.employees ?? 0}</span>
        </div>
      </div>

      {/* Attendance Charts */}
      <h2>📊 Attendance Analytics</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <AttendancePieChart presentCount={presentToday} absentCount={absentToday} />
        </div>
        {chartData.length > 0 && (
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <AttendanceBarChart 
              attendanceData={chartData} 
              employeeNames={chartData.map(emp => emp.name)} 
            />
          </div>
        )}
      </div>
    </div>
  );
}
