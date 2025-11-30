import api from "../../api/axiosInstance";

export const markAttendanceAPI = () => api.post("/attendance/mark");
export const checkoutAttendanceAPI = () => api.post("/attendance/checkout");
export const getAttendanceAPI = () => api.get("/attendance");
export const getAllAttendanceAPI = () => api.get("/attendance/all-records");

// Legacy aliases for backward compatibility
export const checkInAPI = markAttendanceAPI;
export const checkOutAPI = checkoutAttendanceAPI;
export const myHistoryAPI = getAttendanceAPI;
export const allAttendanceAPI = getAllAttendanceAPI;
export const exportCSV_API = () => api.get("/attendance/export");
