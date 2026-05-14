import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Projects from './components/Projects';
import Contact from './components/Contact';
import GlobalBackground from './components/GlobalBackground';

function App() {
  return (
    <div className="min-h-screen relative">
      <GlobalBackground />
      <div className="relative z-10">
        <Header />
        <Hero />
        <About />
        <Experience />
        <Education />
        <Skills />
        <Projects />
        <Contact />
      </div>
    </div>
  );
}

export default App;