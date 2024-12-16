import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/forms";

const apiService = {
  getForms: async () => {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  },
  saveForm: async (formData) => {
    const response = await axios.post(API_BASE_URL, formData);
    return response.data;
  },
  getSingleForm: async (id) => {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  },
  updateForm: async (id, formData) => {
    const response = await axios.put(`${API_BASE_URL}/${id}`, formData);
    return response.data;
  },
  deleteForm: async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  },
};

export default apiService;
