import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOOT_LINES = [
  { text: 'ECE_PORTFOLIO_OS v2.1.0 — ARM Cortex-M7 @ 480 MHz', delay: 0,    color: '#00f5ff' },
  { text: '[  OK  ] Initialising memory subsystem... 512MB DDR4', delay: 280,  color: '#00ff88' },
  { text: '[  OK  ] Loading hardware abstraction layer (HAL)', delay: 520,  color: '#00ff88' },
  { text: '[  OK  ] Mounting signal processor unit (SPU)', delay: 760,  color: '#00ff88' },
  { text: '[  OK  ] Calibrating oscilloscope — CH1 CH2 CH3 CH4', delay: 980,  color: '#00ff88' },
  { text: '[  OK  ] Synchronising clock domains — 100 MHz ref', delay: 1180, color: '#00ff88' },
  { text: '[  OK  ] Establishing UART link — 921600 baud', delay: 1360, color: '#00ff88' },
  { text: '[  OK  ] Loading embedded firmware modules', delay: 1520, color: '#00ff88' },
  { text: '[ WARN ] RF calibration pending — 2.4 GHz band', delay: 1680, color: '#ffaa00' },
  { text: '[  OK  ] PLL locked — phase error < 0.001°', delay: 1840, color: '#00ff88' },
  { text: '[  OK  ] Network stack initialised — TCP/IP ready', delay: 1980, color: '#00ff88' },
  { text: '[  OK  ] Signal integrity checks passed', delay: 2100, color: '#00ff88' },
  { text: '───────────────────────────────────────────────────', delay: 2260, color: '#1f3d52' },
  { text: 'ALL SYSTEMS NOMINAL — LAUNCHING ECE PORTFOLIO...', delay: 2380, color: '#00f5ff' },
];

const CHECKS = [
  'POWER', 'CLOCK', 'MEMORY', 'GPIO', 'ADC', 'DAC', 'SPI', 'I2C', 'UART', 'DMA',
  'TIMER', 'PWM', 'IRQ', 'BOOT',
];

export default function Bootloader({ onDone }) {
  const [lines, setLines] = useState([]);
  const [progress, setProgress] = useState(0);
  const [checks, setChecks] = useState([]);
  const [done, setDone] = useState(false);
  const [exiting, setExiting] = useState(false);
  const canvasRef = useRef(null);

  // Waveform canvas
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    let t = 0, raf;
    const draw = () => {
      c.width = c.offsetWidth; c.height = c.offsetHeight;
      ctx.clearRect(0, 0, c.width, c.height);
      // Draw oscilloscope-style waveform
      const h = c.height, w = c.width;
      // Grid
      ctx.strokeStyle = 'rgba(0,245,255,0.04)';
      ctx.lineWidth = 0.5;
      for (let x = 0; x < w; x += 40) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,h); ctx.stroke(); }
      for (let y = 0; y < h; y += 20) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(w,y); ctx.stroke(); }
      // Sine wave CH1
      ctx.beginPath();
      for (let x = 0; x <= w; x += 1) {
        const y = h/2 + Math.sin((x/w)*Math.PI*10 + t) * (h*0.28) + Math.sin((x/w)*Math.PI*22 + t*1.3) * (h*0.07);
        x===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
      }
      ctx.strokeStyle = 'rgba(0,245,255,0.35)';
      ctx.lineWidth = 1.2;
      ctx.stroke();
      // Square wave CH2
      ctx.beginPath();
      let sq = 1;
      for (let x = 0; x <= w; x += 1) {
        if (x % Math.floor(w/12) === 0) sq *= -1;
        const y = h*0.75 + sq * h*0.12;
        x===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
      }
      ctx.strokeStyle = 'rgba(0,255,136,0.22)';
      ctx.lineWidth = 1;
      ctx.stroke();
      t += 0.04;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

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
      }, 400 + i * 160));
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
            background: '#010306', display: 'flex', flexDirection: 'column',
          }}
        >
          {/* Scanline flicker */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10,
            background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.06) 0px, rgba(0,0,0,0.06) 1px, transparent 1px, transparent 3px)',
          }} className="flicker" />

          {/* Waveform bg */}
          <canvas ref={canvasRef} style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:0.6 }} />

          {/* Vignette */}
          <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(1,3,6,0.7) 100%)', pointerEvents:'none' }} />

          <div style={{ position:'relative', zIndex:5, display:'flex', flexDirection:'column', height:'100%', padding:'clamp(1.5rem,4vw,3rem)' }}>

            {/* Header */}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'1.5rem' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'1rem' }}>
                <svg viewBox="0 0 36 36" style={{ width:32, height:32 }}>
                  <rect x="5" y="5" width="26" height="26" rx="4" fill="none" stroke="#00f5ff" strokeWidth="1.2" opacity="0.8"/>
                  <rect x="10" y="10" width="16" height="16" rx="2" fill="rgba(0,245,255,0.08)" stroke="#0080ff" strokeWidth="0.8"/>
                  <circle cx="18" cy="18" r="3" fill="#00f5ff" className="p-glow"/>
                </svg>
                <div>
                  <div className="font-mono" style={{ color:'#00f5ff', fontSize:'clamp(0.75rem,2vw,0.9rem)', letterSpacing:'0.15em' }}>ECE_PORTFOLIO_OS</div>
                  <div className="font-mono" style={{ color:'#1f3d52', fontSize:'0.58rem', letterSpacing:'0.1em' }}>SECURE_BOOT · ARM_TrustZone</div>
                </div>
              </div>
              <div className="font-mono" style={{ color:'#1f3d52', fontSize:'0.6rem', letterSpacing:'0.12em', textAlign:'right' }}>
                <div>BUILD: 2025.04.10</div>
                <div>SN: ECE-7B2F-00F5</div>
              </div>
            </div>

            {/* Hardware checks row */}
            <div style={{ display:'flex', flexWrap:'wrap', gap:'0.4rem', marginBottom:'1.5rem' }}>
              {CHECKS.map((c, i) => (
                <motion.span key={c}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={checks.includes(c) ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.2 }}
                  className="font-mono"
                  style={{ fontSize:'0.58rem', padding:'2px 8px', borderRadius:2,
                    border:`1px solid ${checks.includes(c) ? 'rgba(0,255,136,0.4)' : 'rgba(255,255,255,0.05)'}`,
                    background: checks.includes(c) ? 'rgba(0,255,136,0.08)' : 'rgba(255,255,255,0.02)',
                    color: checks.includes(c) ? '#00ff88' : '#1f3d52',
                    letterSpacing:'0.1em', transition:'all 0.2s' }}>
                  {c}
                </motion.span>
              ))}
            </div>

            {/* Main terminal */}
            <div style={{ flex:1, border:'1px solid rgba(0,245,255,0.1)', borderRadius:8,
              background:'rgba(0,0,0,0.5)', padding:'clamp(1rem,3vw,1.8rem)', overflow:'hidden',
              position:'relative', display:'flex', flexDirection:'column' }}>
              <div className="font-mono" style={{ color:'#1f3d52', fontSize:'0.6rem', letterSpacing:'0.12em', marginBottom:'1rem', borderBottom:'1px solid rgba(0,245,255,0.06)', paddingBottom:'0.5rem' }}>
                root@ece-portfolio:~# ./boot_sequence.sh
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
                  <div className="font-mono" style={{ color:'#00f5ff', fontSize:'0.72rem' }}>
                    <span className="blink">█</span>
                  </div>
                )}
              </div>
            </div>

            {/* Progress bar */}
            <div style={{ marginTop:'1.2rem' }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'0.4rem' }}>
                <span className="font-mono" style={{ fontSize:'0.6rem', color:'#1f3d52', letterSpacing:'0.12em' }}>BOOT_PROGRESS</span>
                <span className="font-mono" style={{ fontSize:'0.6rem', color:'#00f5ff' }}>{progress}%</span>
              </div>
              <div style={{ height:3, background:'rgba(255,255,255,0.05)', borderRadius:2, overflow:'hidden' }}>
                <motion.div
                  animate={{ width: `${progress}%` }}
                  transition={{ ease:'easeOut', duration:0.3 }}
                  style={{ height:'100%', background:'linear-gradient(90deg,#0080ff,#00f5ff)',
                    boxShadow:'0 0 10px rgba(0,245,255,0.6)', borderRadius:2 }}
                />
              </div>
              {done && (
                <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.3 }}
                  className="font-mono" style={{ textAlign:'center', marginTop:'0.7rem', fontSize:'0.72rem',
                    color:'#00f5ff', letterSpacing:'0.25em' }}>
                  ▷ ENTERING PORTFOLIO ENVIRONMENT...
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
