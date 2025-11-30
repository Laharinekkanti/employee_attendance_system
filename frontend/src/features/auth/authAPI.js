import api from "../../api/axiosInstance";

export const loginAPI = (data) => api.post("/auth/login", data);
export const registerAPI = (data) => api.post("/auth/register", data);
export const meAPI = () => api.get("/auth/me");
export const getTotalMembersAPI = () => api.get("/auth/members/count");
