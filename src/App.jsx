import { useState, useEffect, createContext, useContext } from 'react';
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

export const ThemeContext = createContext({ theme: 'light', toggle: () => {} });
export const useTheme = () => useContext(ThemeContext);

export default function App() {
  const [booted, setBooted] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('pk-theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('pk-theme', theme);
  }, [theme]);

  // SEO: Dynamic document title based on visible section
  useEffect(() => {
    if (!booted) return;
    const BASE_TITLE = 'Prashant Kushwaha | ECE Portfolio';
    const sections = ['about','skills','projects','experience','achievements','contact'];
    const sectionTitles = {
      about: 'About Me',
      skills: 'Technical Skills',
      projects: 'Projects',
      experience: 'Experience',
      achievements: 'Certifications',
      contact: 'Contact'
    };
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
          const id = entry.target.id;
          if (id && sectionTitles[id]) {
            document.title = `${sectionTitles[id]} — ${BASE_TITLE}`;
          }
        }
      }
    }, { threshold: 0.3 });

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Reset title when at top
    const handleScroll = () => {
      if (window.scrollY < 200) document.title = BASE_TITLE;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [booted]);

  const toggle = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      <Cursor />
      <Bootloader onDone={() => setBooted(true)} />
      {booted && (
        <>
          {/* Skip to content link for accessibility */}
          <a href="#about" className="skip-to-content" aria-label="Skip to main content">
            Skip to content
          </a>
          <Navbar />
          <main id="main-content" role="main">
            <Hero />
            <div className="divider" role="separator" aria-hidden="true" />
            <About />
            <div className="divider" role="separator" aria-hidden="true" />
            <Skills />
            <div className="divider" role="separator" aria-hidden="true" />
            <Projects />
            <div className="divider" role="separator" aria-hidden="true" />
            <Experience />
            <div className="divider" role="separator" aria-hidden="true" />
            <Achievements />
            <div className="divider" role="separator" aria-hidden="true" />
            <Contact />
          </main>
        </>
      )}
    </ThemeContext.Provider>
  );
}
