import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Users, Briefcase, CheckCircle } from 'lucide-react';
import { clientAPI, projectAPI } from '../utils/apiService';

// Lazy load components
const StatCard = lazy(() => import('../components/StatCard'));
const ProjectCard = lazy(() => import('../components/ProjectCard'));
const LoadingBar = lazy(() => import('../components/LoadingBar'));

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalClients: 0,
    activeProjects: 0,
    completedProjects: 0,
  });
  const [recentProjects, setRecentProjects] = useState([]);
  const [error, setError] = useState('');

  // Fetch data from backend
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      setError('');

      // Fetch clients and projects in parallel
      const [clientsResponse, projectsResponse] = await Promise.all([
        clientAPI.getAll(),
        projectAPI.getAll(),
      ]);

      if (clientsResponse.success && projectsResponse.success) {
        const clients = clientsResponse.data;
        const projects = projectsResponse.data;

        // Calculate stats
        const totalClients = clients.length;
        const activeProjects = projects.filter(
          (p) => p.status === 'In Progress'
        ).length;
        const completedProjects = projects.filter(
          (p) => p.status === 'Completed'
        ).length;

        setStats({
          totalClients,
          activeProjects,
          completedProjects,
        });

        // Get recent projects (latest 4)
        const recent = projects
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 4)
          .map((project) => ({
            id: project._id,
            projectName: project.name,
            clientName: project.client?.name || 'Unknown Client',
            progress: project.progress,
            status: project.status,
          }));

        setRecentProjects(recent);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Static stat card configurations
  const statCards = [
    {
      id: 1,
      title: 'Total Clients',
      value: stats.totalClients.toString(),
      percentage: '+12%',
      icon: Users,
      iconBgColor: 'bg-blue-500',
      iconColor: 'text-white',
    },
    {
      id: 2,
      title: 'Active Projects',
      value: stats.activeProjects.toString(),
      percentage: '+8%',
      icon: Briefcase,
      iconBgColor: 'bg-purple-500',
      iconColor: 'text-white',
    },
    {
      id: 3,
      title: 'Completed',
      value: stats.completedProjects.toString(),
      percentage: '+23%',
      icon: CheckCircle,
      iconBgColor: 'bg-green-500',
      iconColor: 'text-white',
    },
  ];

  if (isLoading) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <LoadingBar text="Dashboard" />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8 animate-fadeIn">
          <h1 className="text-4xl font-bold text-darkBrown mb-2">Dashboard</h1>
          <p className="text-darkBrown text-lg">
            Welcome back! Here's your project overview.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl animate-slideUp">
            <p className="text-red-700 font-medium">{error}</p>
            <button
              onClick={fetchDashboardData}
              className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
            >
              Try again
            </button>
          </div>
        )}

        {/* Statistics Cards */}
        <Suspense fallback={<div className="text-center">Loading stats...</div>}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {statCards.map((stat, index) => (
              <div key={stat.id} style={{ animationDelay: `${index * 100}ms` }}>
                <StatCard
                  title={stat.title}
                  value={stat.value}
                  percentage={stat.percentage}
                  icon={stat.icon}
                  iconBgColor={stat.iconBgColor}
                  iconColor={stat.iconColor}
                />
              </div>
            ))}
          </div>
        </Suspense>

        {/* Recent Projects Section */}
        <Suspense fallback={<div className="text-center">Loading projects...</div>}>
          <div className="animate-fadeIn">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-darkBrown">Recent Projects</h2>
              <button
                onClick={fetchDashboardData}
                className="text-sm text-maroon hover:text-darkMaroon font-medium transition-colors"
              >
                Refresh
              </button>
            </div>

            {recentProjects.length === 0 ? (
              <div className="bg-white rounded-xl shadow-custom p-12 text-center border border-maroon-20">
                <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-darkBrown mb-2">
                  No Projects Yet
                </h3>
                <p className="text-gray-600 mb-4">
                  Start by adding your first project!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {recentProjects.map((project, index) => (
                  <div
                    key={project.id}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <ProjectCard
                      projectName={project.projectName}
                      clientName={project.clientName}
                      progress={project.progress}
                      status={project.status}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default Dashboard;