import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';

// Lazy load components
const ClientCard = lazy(() => import('../components/ClientCard'));
const ClientDetailsModal = lazy(() => import('../components/ClientDetailsModal'));
const LoadingBar = lazy(() => import('../components/LoadingBar'));

const Clients = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState(null);
  const [clients, setClients] = useState([]);

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      // Sample clients data
      setClients([
        {
          id: 1,
          name: 'TechCorp Inc.',
          email: 'contact@techcorp.com',
          phone: '+1 234 567 890',
          projectCount: 5,
          projects: [
            {
              id: 1,
              name: 'E-commerce Redesign',
              description: 'Complete redesign of the e-commerce platform',
              status: 'In Progress',
              progress: 65
            },
            {
              id: 2,
              name: 'Mobile App',
              description: 'iOS and Android mobile application',
              status: 'In Progress',
              progress: 45
            },
            {
              id: 3,
              name: 'Website Migration',
              description: 'Migrate to new hosting platform',
              status: 'Completed',
              progress: 100
            },
            {
              id: 4,
              name: 'SEO Optimization',
              description: 'Improve search engine rankings',
              status: 'Pending',
              progress: 20
            },
            {
              id: 5,
              name: 'API Development',
              description: 'RESTful API for third-party integrations',
              status: 'In Progress',
              progress: 75
            }
          ]
        },
        {
          id: 2,
          name: 'StartUp XYZ',
          email: 'hello@startupxyz.com',
          phone: '+1 234 567 891',
          projectCount: 3,
          projects: [
            {
              id: 6,
              name: 'Brand Identity',
              description: 'Logo and brand guidelines',
              status: 'Completed',
              progress: 100
            },
            {
              id: 7,
              name: 'Web Portal',
              description: 'Customer management portal',
              status: 'In Progress',
              progress: 55
            },
            {
              id: 8,
              name: 'Marketing Campaign',
              description: 'Digital marketing strategy',
              status: 'Pending',
              progress: 10
            }
          ]
        },
        {
          id: 3,
          name: 'Global Solutions',
          email: 'info@globalsolutions.com',
          phone: '+1 234 567 892',
          projectCount: 2,
          projects: [
            {
              id: 9,
              name: 'CRM Integration',
              description: 'Salesforce integration',
              status: 'Completed',
              progress: 100
            },
            {
              id: 10,
              name: 'Data Analytics',
              description: 'Business intelligence dashboard',
              status: 'In Progress',
              progress: 80
            }
          ]
        },
        {
          id: 4,
          name: 'Creative Agency',
          email: 'contact@creativeagency.com',
          phone: '+1 234 567 893',
          projectCount: 1,
          projects: [
            {
              id: 11,
              name: 'Portfolio Website',
              description: 'Showcase creative work',
              status: 'Pending',
              progress: 15
            }
          ]
        }
      ]);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Filter clients based on search term
  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (client) => {
    setSelectedClient(client);
  };

  const handleCloseModal = () => {
    setSelectedClient(null);
  };

  const handleAddClient = () => {
    alert('Add Client functionality - To be implemented');
  };

  const handleEditClient = (client) => {
    alert(`Edit Client: ${client.name} - To be implemented`);
    setSelectedClient(null);
  };

  const handleDeleteClient = (clientId) => {
    setClients(clients.filter(c => c.id !== clientId));
    alert('Client deleted successfully!');
  };

  if (isLoading) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <LoadingBar text="Clients" />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4 animate-fadeIn">
          <div>
            <h1 className="text-4xl font-bold text-darkBrown mb-2">Clients</h1>
            <p className="text-darkBrown text-lg">Manage your client relationships</p>
          </div>
          <button
            onClick={handleAddClient}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-md w-fit"
          >
            <Plus className="w-5 h-5" />
            Add Client
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-8 animate-fadeIn">
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search clients by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-maroon-20 rounded-xl focus:outline-none focus:border-maroon transition-all duration-300 text-darkBrown placeholder-gray-400 bg-white shadow-custom"
            />
          </div>
        </div>

        {/* Clients Grid */}
        <Suspense fallback={<div className="text-center">Loading clients...</div>}>
          {filteredClients.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-darkBrown text-xl">
                {searchTerm ? 'No clients found matching your search.' : 'No clients yet. Add your first client!'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClients.map((client, index) => (
                <div
                  key={client.id}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ClientCard
                    client={client}
                    onViewDetails={handleViewDetails}
                  />
                </div>
              ))}
            </div>
          )}
        </Suspense>

        {/* Client Details Modal */}
        {selectedClient && (
          <Suspense fallback={null}>
            <ClientDetailsModal
              client={selectedClient}
              onClose={handleCloseModal}
              onEdit={handleEditClient}
              onDelete={handleDeleteClient}
            />
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default Clients;