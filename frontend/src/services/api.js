// API service for hackathon data
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('authToken');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Hackathon API endpoints
export const hackathonAPI = {
  // Get all hackathons
  getAllHackathons: async () => {
    try {
      const response = await api.get('/hackathons');
      return response.data;
    } catch (error) {
      console.error('Error fetching hackathons:', error);
      throw error;
    }
  },

  // Get hackathon by ID
  getHackathonById: async (id) => {
    try {
      const response = await api.get(`/hackathons/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching hackathon ${id}:`, error);
      throw error;
    }
  },

  // Create new hackathon (protected)
  createHackathon: async (hackathonData) => {
    try {
      const response = await api.post('/hackathons', hackathonData);
      return response.data;
    } catch (error) {
      console.error('Error creating hackathon:', error);
      throw error;
    }
  },

  // Search hackathons
  searchHackathons: async (query, technology = '') => {
    try {
      const params = new URLSearchParams();
      if (query) params.append('q', query);
      if (technology) params.append('tech', technology);
      
      const response = await api.get(`/hackathons/search?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error searching hackathons:', error);
      throw error;
    }
  },
};

// Technology API endpoints
export const technologyAPI = {
  // Get all technologies
  getAllTechnologies: async () => {
    try {
      const response = await api.get('/technologies');
      return response.data;
    } catch (error) {
      console.error('Error fetching technologies:', error);
      throw error;
    }
  },

  // Get popular technologies
  getPopularTechnologies: async (limit = 10) => {
    try {
      const response = await api.get(`/technologies?popular=true&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching popular technologies:', error);
      throw error;
    }
  },
};

// Auth API endpoints
export const authAPI = {
  // Register user
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      if (response.data.success && response.data.token) {
        localStorage.setItem('authToken', response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('authToken');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },

  // Get current user profile
  getProfile: async () => {
    try {
      const response = await api.get('/auth/profile');
      return response.data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  },
};

// Contact API endpoints
export const contactAPI = {
  // Send contact message
  sendMessage: async (messageData) => {
    try {
      const response = await api.post('/contact', messageData);
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },
};

// Chatbot API endpoints
export const chatbotAPI = {
  // Send message to chatbot
  sendMessage: async (message) => {
    try {
      const response = await api.post('/chatbot', { message });
      return response.data;
    } catch (error) {
      console.error('Error sending chatbot message:', error);
      throw error;
    }
  },
};

// Resume API endpoints
export const resumeAPI = {
  // Get resume data
  getResume: async () => {
    try {
      const response = await api.get('/resume');
      return response.data;
    } catch (error) {
      console.error('Error fetching resume:', error);
      throw error;
    }
  },
};

// Work Experience API endpoints
export const workExperienceAPI = {
  // Get all work experiences
  getAllWorkExperiences: async () => {
    try {
      const response = await api.get('/work-experience');
      return response.data;
    } catch (error) {
      console.error('Error fetching work experiences:', error);
      throw error;
    }
  },

  // Get work experience by ID
  getWorkExperienceById: async (id) => {
    try {
      const response = await api.get(`/work-experience/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching work experience ${id}:`, error);
      throw error;
    }
  },

  // Create new work experience (protected)
  createWorkExperience: async (workExpData) => {
    try {
      const response = await api.post('/work-experience', workExpData);
      return response.data;
    } catch (error) {
      console.error('Error creating work experience:', error);
      throw error;
    }
  },
};

// Education API endpoints
export const educationAPI = {
  // Get all education records
  getAllEducation: async () => {
    try {
      const response = await api.get('/education');
      return response.data;
    } catch (error) {
      console.error('Error fetching education:', error);
      throw error;
    }
  },
};

// Skills API endpoints
export const skillsAPI = {
  // Get all skills
  getAllSkills: async (categorized = false) => {
    try {
      const params = categorized ? '?categorized=true' : '';
      const response = await api.get(`/skills${params}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching skills:', error);
      throw error;
    }
  },
};

export default api;
