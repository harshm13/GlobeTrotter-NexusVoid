// frontend/js/api.js
const API_BASE_URL = "https://globetrotter-nexusvoid.onrender.com";

const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem("globeTrotterToken");

  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  // If we have a token, automatically attach it to EVERY request
  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  if (!response.ok) {
    // Attempt to parse the error message from FastAPI
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || "API Request Failed");
  }

  return response.json();
};
