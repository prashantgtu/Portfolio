import { useState } from 'react';
import './index.css';
import Bootloader from './components/Bootloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Cursor from './components/Cursor';

export default function App() {
  const [booted, setBooted] = useState(false);

  return (
    <>
      <Cursor />
      <Bootloader onDone={() => setBooted(true)} />
      {booted && (
        <>
          <Navbar />
          <main>
            <Hero />
            <div className="divider" />
            <About />
            <div className="divider" />
            <Skills />
            <div className="divider" />
            <Projects />
            <div className="divider" />
            <Experience />
            <div className="divider" />
            <Achievements />
            <div className="divider" />
            <Contact />
          </main>
        </>
      )}
    </>
  );
}
