import React from 'react';
import AnimatedBackground from '../components/landing/AnimatedBackground';
import DashboardNavbar from '../components/dashboard/DashboardNavbar';
import TaskCreationCard from '../components/dashboard/TaskCreationCard';
import RecentTasksSection from '../components/dashboard/RecentTasksSection';
import AITeamSection from '../components/dashboard/AITeamSection';

export default function DashboardPage() {
  return (
    <div className="min-h-screen relative flex flex-col selection:bg-purple-500/30 selection:text-purple-200">
      <AnimatedBackground />
      <DashboardNavbar />
      <main className="flex-1 max-w-7xl mx-auto px-6 py-10 w-full">
        <TaskCreationCard />
        <RecentTasksSection />
        <AITeamSection />
      </main>
    </div>
  );
}
