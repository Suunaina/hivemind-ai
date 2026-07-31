import React from 'react';
import Navbar from '../components/layout/Navbar';
import AnimatedBackground from '../components/landing/AnimatedBackground';
import HeroSection from '../components/landing/HeroSection';
import FeaturesSection from '../components/landing/FeaturesSection';

export default function LandingPage() {
  return (
    <div className="min-h-screen relative flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
      <AnimatedBackground />
      <Navbar />
      <main className="flex-1 flex flex-col justify-center">
        <HeroSection />
        <FeaturesSection />
      </main>
    </div>
  );
}
