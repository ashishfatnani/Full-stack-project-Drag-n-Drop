import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

// Create an Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor: Attach token to all requests (except login/register)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // Skip attaching token for login/register
    if (!config.url.includes("/login") && !config.url.includes("/register")) {
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle Unauthorized errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized! Logging out...");
      localStorage.removeItem("token");
      window.location.href = "/login"; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

const apiService = {
  // CRUD for Forms
  getForms: async () => {
    const response = await api.get("/api/forms");
    return response.data;
  },

  saveForm: async (formData) => {
    const response = await api.post("/api/forms", formData);
    return response.data;
  },

  getSingleForm: async (id) => {
    const response = await api.get(`/api/forms/${id}`);
    return response.data;
  },

  updateForm: async (id, formData) => {
    const response = await api.put(`/api/forms/${id}`, formData);
    return response.data;
  },

  deleteForm: async (id) => {
    const response = await api.delete(`/api/forms/${id}`);
    return response.data;
  },

  // Auth APIs
  login: async (email, password) => {
    const response = await api.post("/login", { email, password });
    return response.data; // Returns token
  },

  register: async (username, email, password) => {
    const response = await api.post("/register", { username, email, password });
    return response.data;
  },

  // Decode token to get current user
  getCurrentUser: () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        return JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
    return null;
  },

  // Logout User
  logout: () => {
    localStorage.removeItem("token");
  },
};

export default apiService;
