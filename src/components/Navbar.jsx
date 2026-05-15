import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = ['About','Skills','Projects','Experience','Achievements','Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

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

  return (
    <motion.nav initial={{y:-80,opacity:0}} animate={{y:0,opacity:1}}
      transition={{duration:0.85,ease:[0.22,1,0.36,1]}}
      style={{ position:'fixed',top:0,left:0,right:0,zIndex:200,
        background: scrolled?'rgba(1,3,6,0.95)':'transparent',
        backdropFilter: scrolled?'blur(22px)':'none',
        borderBottom: scrolled?'1px solid rgba(0,245,255,0.07)':'1px solid transparent',
        boxShadow: scrolled?'0 4px 40px rgba(0,0,0,0.5)':'none',
        transition:'all 0.35s ease' }}>

      <div className="wrap" style={{ display:'flex',alignItems:'center',justifyContent:'space-between',height:62 }}>
        {/* Logo */}
        <button onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}
          style={{ display:'flex',alignItems:'center',gap:'0.6rem',background:'none',border:'none',cursor:'pointer',padding:0 }}>
          <svg viewBox="0 0 36 36" style={{ width:30,height:30,flexShrink:0 }}>
            <rect x="5" y="5" width="26" height="26" rx="4" fill="none" stroke="#00f5ff" strokeWidth="1.2" opacity="0.7"/>
            <rect x="10" y="10" width="16" height="16" rx="2.5" fill="rgba(0,245,255,0.06)" stroke="#0080ff" strokeWidth="0.8"/>
            <circle cx="18" cy="18" r="2.6" fill="#00f5ff"/>
            {[14,22].flatMap(v=>[
              <line key={`l${v}`} x1="5" y1={v} x2="1" y2={v} stroke="#00f5ff" strokeWidth="0.8"/>,
              <line key={`r${v}`} x1="31" y1={v} x2="35" y2={v} stroke="#00f5ff" strokeWidth="0.8"/>,
              <line key={`t${v}`} x1={v} y1="5" x2={v} y2="1" stroke="#00f5ff" strokeWidth="0.8"/>,
              <line key={`b${v}`} x1={v} y1="31" x2={v} y2="35" stroke="#00f5ff" strokeWidth="0.8"/>,
            ])}
          </svg>
          <div>
            <div className="font-disp" style={{ fontWeight:700,fontSize:'0.95rem',color:'#00f5ff',letterSpacing:'0.06em',lineHeight:1 }}>Prashant Kushwaha</div>
            <div className="font-mono" style={{ fontSize:'0.52rem',color:'#1f3d52',letterSpacing:'0.08em',marginTop:1 }}>ECE_PORTFOLIO_v2.1</div>
          </div>
        </button>

        {/* Desktop links */}
        <div style={{ display:'flex',alignItems:'center',gap:'1.8rem' }} className="hide-mobile">
          {links.map(l=>(
            <button key={l} className={`nav-a ${active===l.toLowerCase()?'active':''}`}
              onClick={()=>go(l)}>{l}</button>
          ))}
          <button className="btn btn-c" style={{ padding:'0.5rem 1.3rem',fontSize:'0.7rem' }}
            onClick={()=>window.open('https://drive.google.com/file/d/1lN_0OSwsZyHz0C1BstkjI0Lrw8h7KJCk/view?usp=sharing','_blank')}>↓ Resume</button>
        </div>

        {/* Hamburger */}
        <button onClick={()=>setOpen(!open)} style={{ background:'none',border:'none',cursor:'pointer',padding:6,display:'flex',flexDirection:'column',gap:5 }}
          className="hide-desktop">
          {[0,1,2].map(i=>(
            <span key={i} style={{ display:'block',width:20,height:1.5,background:'#00f5ff',borderRadius:2,transition:'all 0.28s',
              opacity:open&&i===1?0:1, transform:open?(i===0?'rotate(45deg) translate(4.5px,4.5px)':i===2?'rotate(-45deg) translate(4.5px,-4.5px)':''):'', }}/>
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}}
            style={{ background:'rgba(1,3,6,0.97)',borderTop:'1px solid rgba(0,245,255,0.07)',overflow:'hidden' }}>
            <div className="wrap" style={{ paddingBlock:'1rem 1.5rem',display:'flex',flexDirection:'column',gap:0 }}>
              {links.map(l=>(
                <button key={l} className="nav-a" onClick={()=>go(l)}
                  style={{ textAlign:'left',padding:'0.7rem 0',borderBottom:'1px solid rgba(0,245,255,0.06)',fontSize:'0.95rem' }}>
                  {l}
                </button>
              ))}
              <button className="btn btn-c" style={{ marginTop:'1rem',justifyContent:'center' }}
                onClick={()=>window.open('https://drive.google.com/file/d/1lN_0OSwsZyHz0C1BstkjI0Lrw8h7KJCk/view?usp=sharing','_blank')}>↓ Download Resume</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <style>{`.hide-desktop{display:flex}@media(min-width:768px){.hide-desktop{display:none}}`}</style>
    </motion.nav>
  );
}
