import axios from "axios";

export const api = axios.create({
  baseURL: "/api",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
  },
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      error.userMessage = "You are not authorized to view this data.";
    }
    return Promise.reject(error);
  }
);
