import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../App';

const links = ['About','Skills','Projects','Experience','Achievements','Contact'];

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 50);
      for (const id of [...links].reverse()) {
        const el = document.getElementById(id.toLowerCase());
        if (el && window.scrollY >= el.offsetTop - 130) { setActive(id.toLowerCase()); break; }
      }
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const go = (id) => { document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior:'smooth' }); setOpen(false); };

  const navBg = theme === 'dark'
    ? scrolled ? 'rgba(10,10,10,0.96)' : 'transparent'
    : scrolled ? 'rgba(250,246,238,0.96)' : 'transparent';

  const borderB = scrolled
    ? `1px solid var(--border)`
    : '1px solid transparent';

  return (
    <motion.nav initial={{y:-80,opacity:0}} animate={{y:0,opacity:1}}
      transition={{duration:0.85,ease:[0.22,1,0.36,1]}}
      style={{ position:'fixed',top:0,left:0,right:0,zIndex:200,
        background: navBg,
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: borderB,
        boxShadow: scrolled ? '0 4px 32px var(--shadow)' : 'none',
        transition:'all 0.35s ease' }}>

      <div className="wrap" style={{ display:'flex',alignItems:'center',justifyContent:'space-between',height:64 }}>

        {/* Logo */}
        <button onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}
          style={{ display:'flex',alignItems:'center',gap:'0.7rem',background:'none',border:'none',cursor:'pointer',padding:0 }}>
          {/* Elegant monogram logo */}
          <div style={{
            width:34, height:34, borderRadius:8,
            background:`linear-gradient(135deg, var(--gold-dim), var(--gold))`,
            display:'flex', alignItems:'center', justifyContent:'center',
            boxShadow:'0 2px 12px var(--accent-glow)',
            flexShrink:0
          }}>
            <span className="font-disp" style={{
              color: theme === 'dark' ? '#0a0805' : '#fff8ee',
              fontSize:'1rem', fontWeight:700, lineHeight:1, userSelect:'none'
            }}>P</span>
          </div>
          <div>
            <div className="font-disp" style={{ fontWeight:700,fontSize:'0.95rem',color:'var(--t1)',letterSpacing:'0.01em',lineHeight:1 }}>Prashant Kushwaha</div>
            <div className="font-mono" style={{ fontSize:'0.52rem',color:'var(--t4)',letterSpacing:'0.08em',marginTop:2 }}>ECE · CLASS OF 2027</div>
          </div>
        </button>

        {/* Desktop links */}
        <div style={{ display:'flex',alignItems:'center',gap:'1.8rem' }} className="hide-mobile">
          {links.map(l=>(
            <button key={l} className={`nav-a ${active===l.toLowerCase()?'active':''}`}
              onClick={()=>go(l)}>{l}</button>
          ))}

          {/* Theme toggle */}
          <button className="theme-toggle" onClick={toggle} title={`Switch to ${theme==='dark'?'light':'dark'} theme`}>
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>

          <button className="btn btn-c" style={{ padding:'0.5rem 1.3rem',fontSize:'0.7rem' }}
            onClick={()=>window.open('https://drive.google.com/file/d/1f-kH1l7rTMkBI8WvqLy3bTShKiDN-Q5n/view?usp=drive_link','_blank')}>↓ Resume</button>
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div style={{display:'flex',alignItems:'center',gap:'0.6rem'}} className="hide-desktop">
          <button className="theme-toggle" onClick={toggle} title="Toggle theme">
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
          <button onClick={()=>setOpen(!open)} style={{ background:'none',border:'none',cursor:'pointer',padding:6,display:'flex',flexDirection:'column',gap:5 }}>
            {[0,1,2].map(i=>(
              <span key={i} style={{ display:'block',width:20,height:1.5,background:'var(--gold)',borderRadius:2,transition:'all 0.28s',
                opacity:open&&i===1?0:1, transform:open?(i===0?'rotate(45deg) translate(4.5px,4.5px)':i===2?'rotate(-45deg) translate(4.5px,-4.5px)':''):'', }}/>
            ))}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}}
            style={{ background: theme==='dark'?'rgba(10,10,10,0.98)':'rgba(250,246,238,0.98)', borderTop:'1px solid var(--border)',overflow:'hidden' }}>
            <div className="wrap" style={{ paddingBlock:'1rem 1.5rem',display:'flex',flexDirection:'column',gap:0 }}>
              {links.map(l=>(
                <button key={l} className="nav-a" onClick={()=>go(l)}
                  style={{ textAlign:'left',padding:'0.7rem 0',borderBottom:'1px solid var(--border)',fontSize:'0.9rem' }}>
                  {l}
                </button>
              ))}
              <button className="btn btn-c" style={{ marginTop:'1rem',justifyContent:'center' }}
                onClick={()=>window.open('https://drive.google.com/file/d/1lN_0OSwsZyHz0C1BstkjI0Lrw8h7KJCk/view?usp=sharing','_blank')}>↓ Download Resume</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
