import axios from "axios";

export const api = axios.create({
  baseURL: "https://user-task-manager-backend-app2.onrender.com",
});
