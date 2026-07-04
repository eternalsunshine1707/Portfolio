import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import Experience from './components/Experience';
import Education from './components/Education';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import GlobalBackground from './components/GlobalBackground';
import CurtainOverlay from './components/CurtainOverlay';
import NavTransitionOverlay from './components/NavTransitionOverlay';

function App() {
  return (
    <div className="min-h-screen relative">
      <GlobalBackground />
      <CurtainOverlay />
      <NavTransitionOverlay />
      <div className="relative z-10">
        <Header />
        <Hero />
        <Dashboard />
        <Projects />
        <Experience />
        <Education />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

export default App;