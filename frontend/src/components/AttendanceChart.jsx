import { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar, Pie, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export function AttendanceBarChart({ attendanceData, employeeNames }) {
  const data = useMemo(() => {
    return {
      labels: employeeNames,
      datasets: [
        {
          label: "Present Days",
          data: attendanceData.map((emp) => emp.presentDays),
          backgroundColor: "rgba(16, 185, 129, 0.8)",
          borderColor: "rgba(16, 185, 129, 1)",
          borderWidth: 1,
        },
        {
          label: "Absent Days",
          data: attendanceData.map((emp) => emp.absentDays),
          backgroundColor: "rgba(239, 68, 68, 0.8)",
          borderColor: "rgba(239, 68, 68, 1)",
          borderWidth: 1,
        },
      ],
    };
  }, [attendanceData, employeeNames]);

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#333",
          font: { size: 12, weight: "bold" },
        },
      },
      title: {
        display: true,
        text: "Employee Attendance Summary",
        color: "#333",
        font: { size: 16, weight: "bold" },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: "#666" },
        grid: { color: "rgba(0, 0, 0, 0.1)" },
      },
      x: {
        ticks: { color: "#666" },
        grid: { color: "rgba(0, 0, 0, 0.05)" },
      },
    },
  };

  return <Bar data={data} options={options} height={300} />;
}

export function AttendancePieChart({ presentCount, absentCount }) {
  const data = useMemo(() => {
    return {
      labels: ["Present Today", "Absent Today"],
      datasets: [
        {
          data: [presentCount, absentCount],
          backgroundColor: ["rgba(16, 185, 129, 0.8)", "rgba(239, 68, 68, 0.8)"],
          borderColor: ["rgba(16, 185, 129, 1)", "rgba(239, 68, 68, 1)"],
          borderWidth: 2,
        },
      ],
    };
  }, [presentCount, absentCount]);

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: "#333",
          font: { size: 12, weight: "bold" },
        },
      },
      title: {
        display: true,
        text: "Today's Attendance Overview",
        color: "#333",
        font: { size: 16, weight: "bold" },
      },
    },
  };

  return <Pie data={data} options={options} height={250} />;
}

export function AttendanceTrendChart({ weekData }) {
  const data = useMemo(() => {
    return {
      labels: weekData.map((d) => d.date),
      datasets: [
        {
          label: "Present",
          data: weekData.map((d) => d.present),
          borderColor: "rgba(16, 185, 129, 1)",
          backgroundColor: "rgba(16, 185, 129, 0.1)",
          tension: 0.4,
          fill: true,
          borderWidth: 2,
          pointRadius: 5,
          pointBackgroundColor: "rgba(16, 185, 129, 1)",
        },
        {
          label: "Absent",
          data: weekData.map((d) => d.absent),
          borderColor: "rgba(239, 68, 68, 1)",
          backgroundColor: "rgba(239, 68, 68, 0.1)",
          tension: 0.4,
          fill: true,
          borderWidth: 2,
          pointRadius: 5,
          pointBackgroundColor: "rgba(239, 68, 68, 1)",
        },
      ],
    };
  }, [weekData]);

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#333",
          font: { size: 12, weight: "bold" },
        },
      },
      title: {
        display: true,
        text: "Weekly Attendance Trend",
        color: "#333",
        font: { size: 16, weight: "bold" },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: "#666" },
        grid: { color: "rgba(0, 0, 0, 0.1)" },
      },
      x: {
        ticks: { color: "#666" },
        grid: { color: "rgba(0, 0, 0, 0.05)" },
      },
    },
  };

  return <Line data={data} options={options} height={300} />;
}
