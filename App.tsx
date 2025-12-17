import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StarField from './components/StarField';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import ProjectsPage from './pages/ProjectsPage';
import CertificationsPage from './pages/CertificationsPage';
import Contact from './pages/Contact';

import SpaceGame from './pages/SpaceGame';
import CustomCursor from './components/CustomCursor';

const App: React.FC = () => {
  return (
    <main className="min-h-screen relative text-slate-200 selection:bg-cyan-500/30 cursor-none">
      {/* Background Layer */}
      <div className="fixed inset-0 bg-slate-950 -z-20" />
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 -z-10 pointer-events-none" />

      {/* Dynamic Stars */}
      <StarField />

      {/* Navigation */}
      <Navigation />

      {/* Page Routes */}
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/certifications" element={<CertificationsPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/space-game" element={<SpaceGame />} />
        </Routes>
      </div>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-600 text-sm relative z-10 border-t border-white/5 bg-slate-950">
        <p>© {new Date().getFullYear()} Ayush Kumar. Built for the stars.</p>
      </footer>

      {/* Custom Cursor */}
      <CustomCursor />
    </main>
  );
};

export default App;