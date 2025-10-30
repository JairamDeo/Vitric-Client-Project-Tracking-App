import api from './api';

/**
 * Admin Authentication APIs
 */
export const adminAPI = {
  // Login admin
  login: async (email, password) => {
    const response = await api.post('/admin/login', { email, password });
    return response.data;
  },

  // Get admin profile
  getProfile: async () => {
    const response = await api.get('/admin/profile');
    return response.data;
  },
};

/**
 * Client APIs
 */
export const clientAPI = {
  // Get all clients
  getAll: async () => {
    const response = await api.get('/clients');
    return response.data;
  },

  // Get single client by ID
  getById: async (id) => {
    const response = await api.get(`/clients/${id}`);
    return response.data;
  },

  // Create new client (requires auth)
  create: async (clientData) => {
    const response = await api.post('/clients', clientData);
    return response.data;
  },

  // Update client (requires auth)
  update: async (id, clientData) => {
    const response = await api.put(`/clients/${id}`, clientData);
    return response.data;
  },

  // Delete client (requires auth)
  delete: async (id) => {
    const response = await api.delete(`/clients/${id}`);
    return response.data;
  },
};

/**
 * Project APIs
 */
export const projectAPI = {
  // Get all projects
  getAll: async () => {
    const response = await api.get('/projects');
    return response.data;
  },

  // Get single project by ID
  getById: async (id) => {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },

  // Get projects by client ID
  getByClient: async (clientId) => {
    const response = await api.get(`/projects/client/${clientId}`);
    return response.data;
  },

  // Create new project (requires auth)
  create: async (projectData) => {
    const response = await api.post('/projects', projectData);
    return response.data;
  },

  // Update project (requires auth)
  update: async (id, projectData) => {
    const response = await api.put(`/projects/${id}`, projectData);
    return response.data;
  },

  // Delete project (requires auth)
  delete: async (id) => {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  },
};