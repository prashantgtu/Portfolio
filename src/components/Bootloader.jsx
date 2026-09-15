import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOOT_LINES = [
  { text: 'Prashant Kushwaha — ECE Portfolio v2.0', delay: 0,    color: '#c9a84c' },
  { text: '[  OK  ] Initialising interface modules...', delay: 280,  color: '#7a9e7e' },
  { text: '[  OK  ] Loading typography & design system', delay: 520,  color: '#7a9e7e' },
  { text: '[  OK  ] Mounting project data from storage', delay: 760,  color: '#7a9e7e' },
  { text: '[  OK  ] Calibrating animation timings', delay: 980,  color: '#7a9e7e' },
  { text: '[  OK  ] Connecting to GitHub API', delay: 1180, color: '#7a9e7e' },
  { text: '[  OK  ] Importing skills & certifications', delay: 1360, color: '#7a9e7e' },
  { text: '[  OK  ] Building responsive layout engine', delay: 1520, color: '#7a9e7e' },
  { text: '[ NOTE ] Applying premium theme & typography', delay: 1680, color: '#d4853a' },
  { text: '[  OK  ] Dark & light themes ready', delay: 1840, color: '#7a9e7e' },
  { text: '[  OK  ] All assets loaded successfully', delay: 1980, color: '#7a9e7e' },
  { text: '[  OK  ] Portfolio integrity checks passed', delay: 2100, color: '#7a9e7e' },
  { text: '────────────────────────────────────────────────', delay: 2260, color: '#3d3730' },
  { text: 'READY — Welcome to Prashant\'s Portfolio ✦', delay: 2380, color: '#c9a84c' },
];

const CHECKS = [
  'PROFILE', 'SKILLS', 'PROJECTS', 'EXPERIENCE', 'CERTS', 'GITHUB',
  'CONTACT', 'RESUME', 'THEME', 'READY',
];

export default function Bootloader({ onDone }) {
  const [lines, setLines] = useState([]);
  const [progress, setProgress] = useState(0);
  const [checks, setChecks] = useState([]);
  const [done, setDone] = useState(false);
  const [exiting, setExiting] = useState(false);

  // Boot sequence
  useEffect(() => {
    const timers = [];
    BOOT_LINES.forEach((l, i) => {
      timers.push(setTimeout(() => {
        setLines(prev => [...prev, l]);
        setProgress(Math.round(((i + 1) / BOOT_LINES.length) * 100));
      }, l.delay + 300));
    });

    CHECKS.forEach((c, i) => {
      timers.push(setTimeout(() => {
        setChecks(prev => [...prev, c]);
      }, 400 + i * 200));
    });

    timers.push(setTimeout(() => setDone(true), 2900));
    timers.push(setTimeout(() => { setExiting(true); setTimeout(onDone, 600); }, 3400));

    return () => timers.forEach(clearTimeout);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999, overflow: 'hidden',
            background: '#0d0b08', display: 'flex', flexDirection: 'column',
          }}
        >
          {/* Subtle paper texture overlay */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
            backgroundImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,168,76,0.04), transparent 70%)',
          }} />

          {/* Fine grid */}
          <div style={{ position:'absolute', inset:0, pointerEvents:'none',
            backgroundImage: `linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />

          {/* Vignette */}
          <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(10,8,5,0.7) 100%)', pointerEvents:'none' }} />

          <div style={{ position:'relative', zIndex:5, display:'flex', flexDirection:'column', height:'100%', padding:'clamp(1.5rem,4vw,3rem)' }}>

            {/* Header */}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'1.5rem' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'1rem' }}>
                {/* Monogram logo */}
                <div style={{
                  width:38, height:38, borderRadius:8,
                  background:'linear-gradient(135deg, #8a6c2e, #c9a84c)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  boxShadow:'0 0 20px rgba(201,168,76,0.3)'
                }}>
                  <span style={{fontFamily:"'Playfair Display',serif", color:'#0d0b08', fontSize:'1.1rem', fontWeight:700}}>P</span>
                </div>
                <div>
                  <div className="font-mono" style={{ color:'#c9a84c', fontSize:'clamp(0.75rem,2vw,0.9rem)', letterSpacing:'0.15em' }}>PRASHANT_KUSHWAHA</div>
                  <div className="font-mono" style={{ color:'#3d3730', fontSize:'0.58rem', letterSpacing:'0.1em' }}>ECE PORTFOLIO · CLASS OF 2027</div>
                </div>
              </div>
              <div className="font-mono" style={{ color:'#3d3730', fontSize:'0.6rem', letterSpacing:'0.12em', textAlign:'right' }}>
                <div>BUILD: 2025.09</div>
                <div>VER: v2.0.0</div>
              </div>
            </div>

            {/* Check badges */}
            <div style={{ display:'flex', flexWrap:'wrap', gap:'0.4rem', marginBottom:'1.5rem' }}>
              {CHECKS.map((c) => (
                <motion.span key={c}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={checks.includes(c) ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.2 }}
                  className="font-mono"
                  style={{ fontSize:'0.58rem', padding:'2px 10px', borderRadius:4,
                    border:`1px solid ${checks.includes(c) ? 'rgba(122,158,126,0.4)' : 'rgba(201,168,76,0.08)'}`,
                    background: checks.includes(c) ? 'rgba(122,158,126,0.1)' : 'rgba(201,168,76,0.03)',
                    color: checks.includes(c) ? '#7a9e7e' : '#3d3730',
                    letterSpacing:'0.1em', transition:'all 0.2s' }}>
                  {c}
                </motion.span>
              ))}
            </div>

            {/* Main terminal */}
            <div style={{ flex:1, border:'1px solid rgba(201,168,76,0.12)', borderRadius:10,
              background:'rgba(0,0,0,0.4)', padding:'clamp(1rem,3vw,1.8rem)', overflow:'hidden',
              position:'relative', display:'flex', flexDirection:'column' }}>
              <div className="font-mono" style={{ color:'#3d3730', fontSize:'0.6rem', letterSpacing:'0.12em', marginBottom:'1rem', borderBottom:'1px solid rgba(201,168,76,0.08)', paddingBottom:'0.5rem' }}>
                $ init portfolio.sh
              </div>
              <div style={{ flex:1, overflowY:'hidden', display:'flex', flexDirection:'column', gap:'0.28rem' }}>
                {lines.map((l, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.18 }}
                    className="font-mono"
                    style={{ fontSize:'clamp(0.6rem,1.2vw,0.72rem)', color: l.color, lineHeight:1.5, letterSpacing:'0.02em' }}>
                    {l.text}
                  </motion.div>
                ))}
                {!done && (
                  <div className="font-mono" style={{ color:'#c9a84c', fontSize:'0.72rem' }}>
                    <span className="blink">▌</span>
                  </div>
                )}
              </div>
            </div>

            {/* Progress bar */}
            <div style={{ marginTop:'1.2rem' }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'0.4rem' }}>
                <span className="font-mono" style={{ fontSize:'0.6rem', color:'#3d3730', letterSpacing:'0.12em' }}>LOADING</span>
                <span className="font-mono" style={{ fontSize:'0.6rem', color:'#c9a84c' }}>{progress}%</span>
              </div>
              <div style={{ height:2, background:'rgba(201,168,76,0.1)', borderRadius:2, overflow:'hidden' }}>
                <motion.div
                  animate={{ width: `${progress}%` }}
                  transition={{ ease:'easeOut', duration:0.3 }}
                  style={{ height:'100%', background:'linear-gradient(90deg, #8a6c2e, #c9a84c, #e8c97a)',
                    boxShadow:'0 0 8px rgba(201,168,76,0.5)', borderRadius:2 }}
                />
              </div>
              {done && (
                <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.3 }}
                  className="font-mono" style={{ textAlign:'center', marginTop:'0.7rem', fontSize:'0.72rem',
                    color:'#c9a84c', letterSpacing:'0.25em' }}>
                  ✦ ENTERING PORTFOLIO...
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
