import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Users, Briefcase, CheckCircle } from 'lucide-react';

// Lazy load components
const StatCard = lazy(() => import('../components/StatCard'));
const ProjectCard = lazy(() => import('../components/ProjectCard'));
const LoadingBar = lazy(() => import('../components/LoadingBar'));

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Statistics data
  const stats = [
    {
      id: 1,
      title: 'Total Clients',
      value: '24',
      percentage: '+12%',
      icon: Users,
      iconBgColor: 'bg-blue-500',
      iconColor: 'text-white'
    },
    {
      id: 2,
      title: 'Active Projects',
      value: '18',
      percentage: '+8%',
      icon: Briefcase,
      iconBgColor: 'bg-purple-500',
      iconColor: 'text-white'
    },
    {
      id: 3,
      title: 'Completed',
      value: '42',
      percentage: '+23%',
      icon: CheckCircle,
      iconBgColor: 'bg-green-500',
      iconColor: 'text-white'
    }
  ];

  // Recent projects data
  const recentProjects = [
    {
      id: 1,
      projectName: 'E-commerce Redesign',
      clientName: 'TechCorp Inc.',
      progress: 65,
      status: 'In Progress'
    },
    {
      id: 2,
      projectName: 'Mobile App Development',
      clientName: 'StartUp XYZ',
      progress: 40,
      status: 'In Progress'
    },
    {
      id: 3,
      projectName: 'Website Migration',
      clientName: 'Global Solutions',
      progress: 100,
      status: 'Completed'
    },
    {
      id: 4,
      projectName: 'Brand Identity',
      clientName: 'Creative Agency',
      progress: 15,
      status: 'Pending'
    }
  ];

  if (isLoading) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <LoadingBar />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8 animate-fadeIn">
          <h1 className="text-4xl font-bold text-darkBrown mb-2">Dashboard</h1>
          <p className="text-darkBrown text-lg">Welcome back! Here's your project overview.</p>
        </div>

        {/* Statistics Cards */}
        <Suspense fallback={<div className="text-center">Loading stats...</div>}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div 
                key={stat.id} 
                style={{ animationDelay: `${index * 100}ms` }}
              >
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
            <h2 className="text-2xl font-bold text-darkBrown mb-6">Recent Projects</h2>
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
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default Dashboard;