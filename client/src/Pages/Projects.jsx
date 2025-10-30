import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Plus } from 'lucide-react';

// Lazy load components
const ProjectListCard = lazy(() => import('../components/ProjectListCard'));
const ProjectDetailsModal = lazy(() => import('../components/ProjectDetailsModal'));
const LoadingBar = lazy(() => import('../components/LoadingBar'));

const Projects = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);

  // Filter options
  const filters = ['All', 'In Progress', 'Completed', 'Pending'];

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      // Sample projects data
      setProjects([
        {
          id: 1,
          name: 'E-commerce Redesign',
          client: 'TechCorp Inc.',
          clientEmail: 'contact@techcorp.com',
          clientPhone: '+1 234 567 890',
          description: 'Complete redesign of the e-commerce platform with modern UI/UX, improved performance, and mobile responsiveness.',
          deadline: '11/15/2025',
          progress: 65,
          status: 'In Progress',
          tasks: [
            { name: 'Design mockups', completed: true },
            { name: 'Frontend development', completed: true },
            { name: 'Backend integration', completed: false },
            { name: 'Testing', completed: false }
          ]
        },
        {
          id: 2,
          name: 'Mobile App Development',
          client: 'StartUp XYZ',
          clientEmail: 'hello@startupxyz.com',
          clientPhone: '+1 234 567 891',
          description: 'Native iOS and Android mobile application for customer engagement and product showcase.',
          deadline: '12/1/2025',
          progress: 40,
          status: 'In Progress',
          tasks: [
            { name: 'Requirements gathering', completed: true },
            { name: 'UI/UX design', completed: true },
            { name: 'Development', completed: false },
            { name: 'App store submission', completed: false }
          ]
        },
        {
          id: 3,
          name: 'Website Migration',
          client: 'Global Solutions',
          clientEmail: 'info@globalsolutions.com',
          clientPhone: '+1 234 567 892',
          description: 'Migrate existing website to new hosting platform with improved security and performance.',
          deadline: '10/30/2025',
          progress: 100,
          status: 'Completed',
          tasks: [
            { name: 'Backup existing site', completed: true },
            { name: 'Set up new hosting', completed: true },
            { name: 'Migration', completed: true },
            { name: 'Testing & DNS update', completed: true }
          ]
        },
        {
          id: 4,
          name: 'Brand Identity',
          client: 'Creative Agency',
          clientEmail: 'contact@creativeagency.com',
          clientPhone: '+1 234 567 893',
          description: 'Develop comprehensive brand identity including logo, color palette, typography, and brand guidelines.',
          deadline: '11/30/2025',
          progress: 15,
          status: 'Pending',
          tasks: [
            { name: 'Initial consultation', completed: true },
            { name: 'Concept development', completed: false },
            { name: 'Design refinement', completed: false },
            { name: 'Final delivery', completed: false }
          ]
        },
        {
          id: 5,
          name: 'CRM Integration',
          client: 'Digital Nexus',
          clientEmail: 'info@digitalnexus.com',
          clientPhone: '+1 234 567 894',
          description: 'Integrate Salesforce CRM with existing business systems for streamlined operations.',
          deadline: '12/15/2025',
          progress: 10,
          status: 'Pending',
          tasks: [
            { name: 'System analysis', completed: true },
            { name: 'Integration planning', completed: false },
            { name: 'Implementation', completed: false },
            { name: 'Training', completed: false }
          ]
        },
        {
          id: 6,
          name: 'SEO Optimization',
          client: 'TechCorp Inc.',
          clientEmail: 'contact@techcorp.com',
          clientPhone: '+1 234 567 890',
          description: 'Comprehensive SEO audit and optimization to improve search engine rankings and organic traffic.',
          deadline: '11/20/2025',
          progress: 55,
          status: 'In Progress',
          tasks: [
            { name: 'SEO audit', completed: true },
            { name: 'Keyword research', completed: true },
            { name: 'On-page optimization', completed: false },
            { name: 'Performance tracking', completed: false }
          ]
        },
        {
          id: 7,
          name: 'API Development',
          client: 'Global Solutions',
          clientEmail: 'info@globalsolutions.com',
          clientPhone: '+1 234 567 892',
          description: 'RESTful API development for third-party integrations and mobile app backend.',
          deadline: '10/25/2025',
          progress: 100,
          status: 'Completed',
          tasks: [
            { name: 'API design', completed: true },
            { name: 'Development', completed: true },
            { name: 'Documentation', completed: true },
            { name: 'Testing', completed: true }
          ]
        }
      ]);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Filter projects based on active filter
  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'All') return true;
    return project.status === activeFilter;
  });

  const handleViewDetails = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const handleNewProject = () => {
    alert('New Project functionality - To be implemented');
  };

  const handleEditProject = (project) => {
    alert(`Edit Project: ${project.name} - To be implemented`);
    setSelectedProject(null);
  };

  const handleDeleteProject = (projectId) => {
    setProjects(projects.filter(p => p.id !== projectId));
    alert('Project deleted successfully!');
  };

  if (isLoading) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <LoadingBar text="Projects" />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4 animate-fadeIn">
          <div>
            <h1 className="text-4xl font-bold text-darkBrown mb-2">Projects</h1>
            <p className="text-darkBrown text-lg">Track and manage all your projects</p>
          </div>
          <button
            onClick={handleNewProject}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-md w-fit"
          >
            <Plus className="w-5 h-5" />
            New Project
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="mb-8 animate-fadeIn">
          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                  activeFilter === filter
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-white text-darkBrown border-2 border-maroon-20 hover:bg-lightPink'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <Suspense fallback={<div className="text-center">Loading projects...</div>}>
          {filteredProjects.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-darkBrown text-xl">
                No {activeFilter !== 'All' ? activeFilter.toLowerCase() : ''} projects found.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ProjectListCard
                    project={project}
                    onViewDetails={handleViewDetails}
                  />
                </div>
              ))}
            </div>
          )}
        </Suspense>

        {/* Project Details Modal */}
        {selectedProject && (
          <Suspense fallback={null}>
            <ProjectDetailsModal
              project={selectedProject}
              onClose={handleCloseModal}
              onEdit={handleEditProject}
              onDelete={handleDeleteProject}
            />
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default Projects;