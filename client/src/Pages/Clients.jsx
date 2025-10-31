import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Search, Plus, X, CheckCircle, AlertTriangle, XCircle, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { clientAPI, projectAPI } from '../utils/apiService';
import { useAuth } from '../context/AuthContext';

const ClientCard = lazy(() => import('../components/ClientCard'));
const ClientDetailsModal = lazy(() => import('../components/ClientDetailsModal'));
const LoadingBar = lazy(() => import('../components/LoadingBar'));

const Clients = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedClient, setSelectedClient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  
  // Alert Modal State
  const [alertModal, setAlertModal] = useState({
    show: false,
    type: 'success',
    title: '',
    message: '',
    onConfirm: null,
  });

  const { isAuthenticated } = useAuth();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleLoginRedirect = () => {
    closeAlert();
    navigate('/admin-login');
  };

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredClients(clients);
    } else {
      const filtered = clients.filter((client) =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.phone.includes(searchTerm)
      );
      setFilteredClients(filtered);
    }
  }, [searchTerm, clients]);

  const fetchClients = async () => {
    try {
      setIsLoading(true);
      setError('');
      const response = await clientAPI.getAll();
      
      if (response.success) {
        setClients(response.data);
        setFilteredClients(response.data);
      }
    } catch (error) {
      console.error('Error fetching clients:', error);
      setError('Failed to load clients. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetails = async (client) => {
    try {
      const response = await clientAPI.getById(client._id);
      if (response.success) {
        setSelectedClient(response.data);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error('Error fetching client details:', error);
      showAlert('error', 'Error', 'Failed to load client details');
    }
  };

  const handleAddClient = () => {
    if (!isAuthenticated) {
      showAlert('login', 'Login Required', 'Please login as admin to add new clients');
      return;
    }
    setFormData({ name: '', email: '', phone: '' });
    setFormError('');
    setIsEditMode(false);
    setIsFormModalOpen(true);
  };

  const handleEditClient = (client) => {
    if (!isAuthenticated) {
      showAlert('login', 'Login Required', 'Please login as admin to edit clients');
      return;
    }
    setFormData({
      name: client.name,
      email: client.email,
      phone: client.phone,
    });
    setSelectedClient(client);
    setFormError('');
    setIsEditMode(true);
    setIsFormModalOpen(true);
  };

  const handleDeleteClient = async (clientId) => {
    if (!isAuthenticated) {
      showAlert('login', 'Login Required', 'Please login as admin to delete clients');
      return;
    }

    showAlert(
      'confirm',
      'Delete Client',
      'Are you sure you want to delete this client? This will also delete ALL projects associated with this client! This action cannot be undone.',
      async () => {
        try {
          const response = await clientAPI.delete(clientId);
          if (response.success) {
            setClients(clients.filter(c => c._id !== clientId));
            showAlert('success', 'Success!', 'Client deleted successfully!');
          }
        } catch (error) {
          console.error('Error deleting client:', error);
          showAlert('error', 'Delete Failed', error.response?.data?.message || 'Failed to delete client. Please try again.');
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
      setFormError('Client name is required');
      setIsSubmitting(false);
      return;
    }
    if (!formData.email.trim()) {
      setFormError('Email is required');
      setIsSubmitting(false);
      return;
    }
    if (!formData.phone.trim()) {
      setFormError('Phone number is required');
      setIsSubmitting(false);
      return;
    }

    try {
      let response;
      if (isEditMode) {
        response = await clientAPI.update(selectedClient._id, formData);
      } else {
        response = await clientAPI.create(formData);
      }

      if (response.success) {
        setIsFormModalOpen(false);
        fetchClients();
        showAlert(
          'success',
          'Success!',
          isEditMode ? 'Client updated successfully!' : 'Client created successfully!'
        );
      }
    } catch (error) {
      console.error('Error saving client:', error);
      setFormError(error.response?.data?.message || 'Failed to save client. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setFormError('');
  };

  if (isLoading) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <LoadingBar text="Clients" />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-cream pt-16 md:pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 animate-fadeIn">
          <h1 className="text-4xl font-bold text-darkBrown mb-2">Clients</h1>
          <p className="text-darkBrown text-lg">Manage your client relationships</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl animate-slideUp">
            <p className="text-red-700 font-medium">{error}</p>
            <button
              onClick={fetchClients}
              className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
            >
              Try again
            </button>
          </div>
        )}

        {/* Search and Add Section */}
        <div className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between animate-slideUp">
          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-darkBrown w-5 h-5" />
            <input
              type="text"
              placeholder="Search clients by their name, mobile, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-maroon-20 rounded-xl focus:outline-none focus:border-maroon transition-all duration-300"
            />
          </div>

          {/* Add Client Button - ALWAYS VISIBLE */}
          <button
            onClick={handleAddClient}
            className="w-full md:w-auto bg-maroon text-cream px-6 py-3 rounded-xl font-semibold hover:bg-darkMaroon transition-all duration-300 transform hover:scale-105 shadow-md flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add New Client
          </button>
        </div>

        {/* Clients Grid */}
        {filteredClients.length === 0 ? (
          <div className="bg-white rounded-xl shadow-custom p-12 text-center border border-maroon-20">
            <h3 className="text-xl font-semibold text-darkBrown mb-2">
              {searchTerm ? 'No clients found' : 'No clients yet'}
            </h3>
            <p className="text-gray-600">
              {searchTerm ? 'Try a different search term' : 'Start by adding your first client!'}
            </p>
          </div>
        ) : (
          <Suspense fallback={<div>Loading clients...</div>}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClients.map((client, index) => (
                <div key={client._id} style={{ animationDelay: `${index * 50}ms` }}>
                  <ClientCard
                    name={client.name}
                    email={client.email}
                    phone={client.phone}
                    projectCount={client.projects?.length || 0}
                    onViewDetails={() => handleViewDetails(client)}
                    onEdit={() => handleEditClient(client)}
                    onDelete={() => handleDeleteClient(client._id)}
                    isAdmin={isAuthenticated}
                  />
                </div>
              ))}
            </div>
          </Suspense>
        )}

        {/* Client Details Modal */}
        {isModalOpen && selectedClient && (
          <Suspense fallback={null}>
            <ClientDetailsModal
              client={selectedClient}
              onClose={() => setIsModalOpen(false)}
            />
          </Suspense>
        )}

        {/* Add/Edit Client Form Modal */}
        {isFormModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-slideUp">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b-2 border-maroon-20 p-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-darkBrown">
                  {isEditMode ? 'Edit Client' : 'Add New Client'}
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

                {/* Client Name */}
                <div>
                  <label className="block text-sm font-medium text-darkBrown mb-2">
                    Client Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter client name"
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border-2 border-maroon-20 rounded-lg focus:outline-none focus:border-maroon transition-all duration-300 disabled:bg-gray-100"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-darkBrown mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="client@example.com"
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border-2 border-maroon-20 rounded-lg focus:outline-none focus:border-maroon transition-all duration-300 disabled:bg-gray-100"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-darkBrown mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border-2 border-maroon-20 rounded-lg focus:outline-none focus:border-maroon transition-all duration-300 disabled:bg-gray-100"
                  />
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
                    {isSubmitting ? 'Saving...' : (isEditMode ? 'Update Client' : 'Add Client')}
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
                alertModal.type === 'login' ? 'bg-gradient-to-r from-blue-600 to-blue-800' :
                'bg-gradient-to-r from-maroon to-darkMaroon'
              }`}>
                <div className="w-16 h-16 bg-cream rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                  {alertModal.type === 'success' && <CheckCircle className="w-10 h-10 text-maroon" />}
                  {alertModal.type === 'error' && <XCircle className="w-10 h-10 text-red-600" />}
                  {alertModal.type === 'warning' && <AlertTriangle className="w-10 h-10 text-yellow-600" />}
                  {alertModal.type === 'login' && <LogIn className="w-10 h-10 text-blue-600" />}
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
                ) : alertModal.type === 'login' ? (
                  <div className="flex gap-3">
                    <button
                      onClick={closeAlert}
                      className="flex-1 px-6 py-3 border-2 border-maroon-20 text-darkBrown rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleLoginRedirect}
                      className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-md flex items-center justify-center gap-2"
                    >
                      <LogIn className="w-5 h-5" />
                      Go to Login
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

export default Clients;