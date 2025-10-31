import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Search, Plus, X, Trash2, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { projectAPI, clientAPI } from '../utils/apiService';
import { useAuth } from '../context/AuthContext';

const ProjectListCard = lazy(() => import('../components/ProjectListCard'));
const ProjectDetailsModal = lazy(() => import('../components/ProjectDetailsModal'));
const LoadingBar = lazy(() => import('../components/LoadingBar'));

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // Alert Modal State
  const [alertModal, setAlertModal] = useState({
    show: false,
    type: 'success', // 'success', 'error', 'warning', 'confirm'
    title: '',
    message: '',
    onConfirm: null,
  });

  const { isAuthenticated } = useAuth();

  // Form state with all required fields
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    client: '',
    status: 'Pending',
    progress: 0,
    deadline: '',
    tasks: [],
  });
  const [currentTask, setCurrentTask] = useState('');
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const tabs = ['All', 'In Progress', 'Completed', 'Pending'];

  // Show Alert Modal Helper
  const showAlert = (type, title, message, onConfirm = null) => {
    setAlertModal({
      show: true,
      type,
      title,
      message,
      onConfirm,
    });
  };

  const closeAlert = () => {
    setAlertModal({
      show: false,
      type: 'success',
      title: '',
      message: '',
      onConfirm: null,
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterProjects();
  }, [projects, activeTab, searchTerm]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      const [projectsResponse, clientsResponse] = await Promise.all([
        projectAPI.getAll(),
        clientAPI.getAll(),
      ]);

      if (projectsResponse.success && clientsResponse.success) {
        const fetchedProjects = projectsResponse.data;
        const fetchedClients = clientsResponse.data;
        
        // Create a map of client IDs to client objects for quick lookup
        const clientMap = {};
        fetchedClients.forEach(client => {
          clientMap[client._id] = client;
        });
        
        // Manually populate client data if not already populated
        const populatedProjects = fetchedProjects.map(project => {
          // If client is just an ID string, replace it with the full client object
          if (typeof project.client === 'string') {
            return {
              ...project,
              client: clientMap[project.client] || { name: 'Unknown Client' }
            };
          }
          // If client is already an object but might be missing data
          if (project.client && !project.client.name && clientMap[project.client._id]) {
            return {
              ...project,
              client: clientMap[project.client._id]
            };
          }
          return project;
        });
        
        setProjects(populatedProjects);
        setClients(fetchedClients);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const filterProjects = () => {
    let filtered = projects;

    // Filter by status tab
    if (activeTab !== 'All') {
      filtered = filtered.filter((project) => project.status === activeTab);
    }

    // Filter by search term
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(
        (project) =>
          project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.client?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProjects(filtered);
  };

  const handleViewDetails = async (project) => {
    try {
      const response = await projectAPI.getById(project._id);
      if (response.success) {
        setSelectedProject(response.data);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error('Error fetching project details:', error);
      showAlert('error', 'Error', 'Failed to load project details');
    }
  };

  const handleAddProject = () => {
    if (!isAuthenticated) {
      showAlert('warning', 'Authentication Required', 'Please login to add projects');
      return;
    }
    if (clients.length === 0) {
      showAlert('warning', 'No Clients Available', 'Please add at least one client first!');
      return;
    }
    setFormData({
      name: '',
      description: '',
      client: '',
      status: 'Pending',
      progress: 0,
      deadline: '',
      tasks: [],
    });
    setCurrentTask('');
    setFormError('');
    setIsEditMode(false);
    setIsFormModalOpen(true);
  };

  const handleEditProject = (project) => {
    if (!isAuthenticated) {
      showAlert('warning', 'Authentication Required', 'Please login to edit projects');
      return;
    }
    
    // Get client ID - handle both populated and non-populated cases
    let clientId = '';
    if (project.client) {
      // If client is an object (populated)
      if (typeof project.client === 'object' && project.client._id) {
        clientId = project.client._id;
      }
      // If client is already just an ID string
      else if (typeof project.client === 'string') {
        clientId = project.client;
      }
    }
    
    setFormData({
      name: project.name || '',
      description: project.description || '',
      client: clientId,
      status: project.status || 'Pending',
      progress: project.progress || 0,
      deadline: project.deadline ? project.deadline.split('T')[0] : '',
      tasks: project.tasks || [],
    });
    setSelectedProject(project);
    setCurrentTask('');
    setFormError('');
    setIsEditMode(true);
    setIsFormModalOpen(true);
  };

  const handleDeleteProject = async (projectId) => {
    if (!isAuthenticated) {
      showAlert('warning', 'Authentication Required', 'Please login to delete projects');
      return;
    }

    showAlert(
      'confirm',
      'Delete Project',
      'Are you sure you want to delete this project? This action cannot be undone.',
      async () => {
        try {
          const response = await projectAPI.delete(projectId);
          if (response.success) {
            setProjects(projects.filter(p => p._id !== projectId));
            showAlert('success', 'Success!', 'Project deleted successfully!');
          }
        } catch (error) {
          console.error('Error deleting project:', error);
          showAlert('error', 'Delete Failed', error.response?.data?.message || 'Failed to delete project.');
        }
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError('');

    // Validation
    if (!formData.name.trim()) {
      setFormError('Project name is required');
      setIsSubmitting(false);
      return;
    }
    if (!formData.description.trim()) {
      setFormError('Project description is required');
      setIsSubmitting(false);
      return;
    }
    if (!formData.client) {
      setFormError('Please select a client');
      setIsSubmitting(false);
      return;
    }
    if (!formData.deadline) {
      setFormError('Deadline is required');
      setIsSubmitting(false);
      return;
    }

    try {
      let response;
      if (isEditMode) {
        response = await projectAPI.update(selectedProject._id, formData);
      } else {
        response = await projectAPI.create(formData);
      }

      if (response.success) {
        setIsFormModalOpen(false);
        await fetchData();
        showAlert(
          'success',
          'Success!',
          isEditMode ? 'Project updated successfully!' : 'Project created successfully!'
        );
      } else {
        setFormError(response.message || 'Failed to save project');
      }
    } catch (error) {
      console.error('Error saving project:', error);
      setFormError(error.response?.data?.message || 'Failed to save project.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Handle status change with automatic progress
    if (name === 'status') {
      let newProgress = formData.progress;
      
      if (value === 'Completed') {
        newProgress = 100;
      } else if (value === 'Pending') {
        newProgress = 0;
      }
      // For 'In Progress', keep current progress (user can adjust manually)
      
      setFormData({
        ...formData,
        status: value,
        progress: newProgress,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    
    setFormError('');
  };

  const handleAddTask = () => {
    if (!currentTask.trim()) return;
    
    setFormData({
      ...formData,
      tasks: [
        ...formData.tasks,
        { name: currentTask, completed: false }
      ],
    });
    setCurrentTask('');
  };

  const handleRemoveTask = (index) => {
    setFormData({
      ...formData,
      tasks: formData.tasks.filter((_, i) => i !== index),
    });
  };

  const handleToggleTask = (index) => {
    const newTasks = [...formData.tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setFormData({
      ...formData,
      tasks: newTasks,
    });
  };

  if (isLoading) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <LoadingBar text="Projects" />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-cream pt-16 md:pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 animate-fadeIn">
          <h1 className="text-4xl font-bold text-darkBrown mb-2">Projects</h1>
          <p className="text-darkBrown text-lg">Track and manage all your projects</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
            <p className="text-red-700 font-medium">{error}</p>
            <button
              onClick={fetchData}
              className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
            >
              Try again
            </button>
          </div>
        )}

        {/* Search and Add Section */}
        <div className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-darkBrown w-5 h-5" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-maroon-20 rounded-xl focus:outline-none focus:border-maroon transition-all duration-300"
            />
          </div>

          {/* Add Project Button - Only for logged-in admin */}
          {isAuthenticated && (
            <button
              onClick={handleAddProject}
              className="w-full md:w-auto bg-maroon text-cream px-6 py-3 rounded-xl font-semibold hover:bg-darkMaroon transition-all duration-300 transform hover:scale-105 shadow-md flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add New Project
            </button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-maroon text-cream shadow-md'
                  : 'bg-white text-darkBrown hover:bg-lightPink'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="bg-white rounded-xl shadow-custom p-12 text-center border border-maroon-20">
            <h3 className="text-xl font-semibold text-darkBrown mb-2">
              {searchTerm ? 'No projects found' : 'No projects yet'}
            </h3>
            <p className="text-gray-600">
              {searchTerm ? 'Try a different search term' : 'Start by adding your first project!'}
            </p>
          </div>
        ) : (
          <Suspense fallback={<div>Loading projects...</div>}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredProjects.map((project, index) => (
                <div key={project._id} style={{ animationDelay: `${index * 50}ms` }}>
                  <ProjectListCard
                    projectName={project.name}
                    clientName={project.client?.name || 'Unknown Client'}
                    status={project.status}
                    progress={project.progress}
                    deadline={project.deadline}
                    onViewDetails={() => handleViewDetails(project)}
                    onEdit={() => handleEditProject(project)}
                    onDelete={() => handleDeleteProject(project._id)}
                    isAdmin={isAuthenticated}
                  />
                </div>
              ))}
            </div>
          </Suspense>
        )}

        {/* Project Details Modal */}
        {isModalOpen && selectedProject && (
          <Suspense fallback={null}>
            <ProjectDetailsModal
              project={selectedProject}
              onClose={() => setIsModalOpen(false)}
            />
          </Suspense>
        )}

        {/* Add/Edit Project Form Modal */}
        {isFormModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-slideUp">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b-2 border-maroon-20 p-6 flex items-center justify-between z-10">
                <h2 className="text-2xl font-bold text-darkBrown">
                  {isEditMode ? 'Edit Project' : 'Add New Project'}
                </h2>
                <button
                  onClick={() => setIsFormModalOpen(false)}
                  className="text-gray-500 hover:text-maroon transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* Error Message */}
                {formError && (
                  <div className="p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                    <p className="text-red-700 text-sm font-medium">{formError}</p>
                  </div>
                )}

                {/* Project Name */}
                <div>
                  <label className="block text-sm font-medium text-darkBrown mb-2">
                    Project Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="E.g., Website Redesign"
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border-2 border-maroon-20 rounded-lg focus:outline-none focus:border-maroon transition-all duration-300 disabled:bg-gray-100"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-darkBrown mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe the project..."
                    required
                    rows={3}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border-2 border-maroon-20 rounded-lg focus:outline-none focus:border-maroon transition-all duration-300 disabled:bg-gray-100 resize-none"
                  />
                </div>

                {/* Client Selection */}
                <div>
                  <label className="block text-sm font-medium text-darkBrown mb-2">
                    Client <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="client"
                    value={formData.client}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border-2 border-maroon-20 rounded-lg focus:outline-none focus:border-maroon transition-all duration-300 disabled:bg-gray-100"
                  >
                    <option value="">Select a client</option>
                    {clients.map((client) => (
                      <option key={client._id} value={client._id}>
                        {client.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status and Progress Row */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Status */}
                  <div>
                    <label className="block text-sm font-medium text-darkBrown mb-2">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border-2 border-maroon-20 rounded-lg focus:outline-none focus:border-maroon transition-all duration-300 disabled:bg-gray-100"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                      {formData.status === 'Completed' && ' Progress auto-set to 100%'}
                      {formData.status === 'Pending' && ' Progress auto-set to 0%'}
                      {formData.status === 'In Progress' && ' Adjust progress manually'}
                    </p>
                  </div>

                  {/* Progress */}
                  <div>
                    <label className="block text-sm font-medium text-darkBrown mb-2">
                      Progress: {formData.progress}%
                    </label>
                    <input
                      type="range"
                      name="progress"
                      value={formData.progress}
                      onChange={handleInputChange}
                      min="0"
                      max="100"
                      step="5"
                      disabled={isSubmitting || formData.status === 'Completed' || formData.status === 'Pending'}
                      className="w-full h-10"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {(formData.status === 'Completed' || formData.status === 'Pending') 
                        ? '🔒 Auto-controlled by status' 
                        : '🎚️ Drag to adjust'}
                    </p>
                  </div>
                </div>

                {/* Deadline */}
                <div>
                  <label className="block text-sm font-medium text-darkBrown mb-2">
                    Deadline <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border-2 border-maroon-20 rounded-lg focus:outline-none focus:border-maroon transition-all duration-300 disabled:bg-gray-100"
                  />
                </div>

                {/* Tasks Section */}
                <div>
                  <label className="block text-sm font-medium text-darkBrown mb-2">
                    Tasks (Optional)
                  </label>
                  
                  {/* Add Task Input */}
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={currentTask}
                      onChange={(e) => setCurrentTask(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTask())}
                      placeholder="Enter task name"
                      disabled={isSubmitting}
                      className="flex-1 px-4 py-2 border-2 border-maroon-20 rounded-lg focus:outline-none focus:border-maroon transition-all duration-300"
                    />
                    <button
                      type="button"
                      onClick={handleAddTask}
                      disabled={isSubmitting}
                      className="px-4 py-2 bg-maroon text-cream rounded-lg hover:bg-darkMaroon transition-all duration-300"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Task List */}
                  {formData.tasks.length > 0 && (
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {formData.tasks.map((task, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg"
                        >
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => handleToggleTask(index)}
                            disabled={isSubmitting}
                            className="w-4 h-4"
                          />
                          <span className={`flex-1 text-sm ${task.completed ? 'line-through text-gray-500' : ''}`}>
                            {task.name}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveTask(index)}
                            disabled={isSubmitting}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsFormModalOpen(false)}
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 border-2 border-maroon-20 text-darkBrown rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 bg-maroon text-cream rounded-lg font-semibold hover:bg-darkMaroon transition-all duration-300 transform hover:scale-105 shadow-md disabled:opacity-50 disabled:transform-none"
                  >
                    {isSubmitting ? 'Saving...' : (isEditMode ? 'Update Project' : 'Create Project')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Alert Modal */}
        {alertModal.show && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4 animate-fadeIn">
            <div className="bg-cream rounded-2xl shadow-2xl border-2 border-maroon overflow-hidden max-w-md w-full animate-zoomIn">
              {/* Header with Icon */}
              <div className={`p-6 text-center ${
                alertModal.type === 'success' ? 'bg-gradient-to-r from-maroon to-darkMaroon' :
                alertModal.type === 'error' ? 'bg-gradient-to-r from-red-600 to-red-800' :
                alertModal.type === 'warning' ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
                'bg-gradient-to-r from-maroon to-darkMaroon'
              }`}>
                <div className="w-16 h-16 bg-cream rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                  {alertModal.type === 'success' && <CheckCircle className="w-10 h-10 text-maroon" />}
                  {alertModal.type === 'error' && <XCircle className="w-10 h-10 text-red-600" />}
                  {alertModal.type === 'warning' && <AlertTriangle className="w-10 h-10 text-yellow-600" />}
                  {alertModal.type === 'confirm' && <AlertTriangle className="w-10 h-10 text-maroon" />}
                </div>
                <h3 className="text-2xl font-bold text-cream">{alertModal.title}</h3>
              </div>

              {/* Body */}
              <div className="p-6 text-center">
                <p className="text-darkBrown mb-6">{alertModal.message}</p>

                {/* Buttons */}
                {alertModal.type === 'confirm' ? (
                  <div className="flex gap-3">
                    <button
                      onClick={closeAlert}
                      className="flex-1 px-6 py-3 border-2 border-maroon-20 text-darkBrown rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (alertModal.onConfirm) alertModal.onConfirm();
                        closeAlert();
                      }}
                      className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-md"
                    >
                      Delete
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={closeAlert}
                    className="w-full px-6 py-3 bg-maroon text-cream rounded-lg font-semibold hover:bg-darkMaroon transition-all duration-300 transform hover:scale-105 shadow-md"
                  >
                    OK
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;