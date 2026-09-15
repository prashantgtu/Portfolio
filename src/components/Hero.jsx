import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../App';

const ROLES = [
  'Electronics & Communication Engineer',
  'Embedded Systems Developer',
  'Signal Processing Explorer',
  'Hardware-Software Integrator',
  'IoT & RF Systems Developer',
];

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const heroRef = useRef(null);
  const { theme } = useTheme();

  // Typewriter
  useEffect(() => {
    const role = ROLES[roleIdx];
    let timeout;
    if (!deleting && displayed.length < role.length)
      timeout = setTimeout(() => setDisplayed(role.slice(0, displayed.length+1)), 58);
    else if (!deleting && displayed.length === role.length)
      timeout = setTimeout(() => setDeleting(true), 2400);
    else if (deleting && displayed.length > 0)
      timeout = setTimeout(() => setDisplayed(displayed.slice(0,-1)), 30);
    else { setDeleting(false); setRoleIdx(i=>(i+1)%ROLES.length); }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIdx]);

  const stats = [
    { val:'3+', label:'Projects' },
    { val:'15+', label:'Skills' },
    { val:'6+',  label:'Certs' },
  ];

  const heroBg = theme === 'dark'
    ? 'linear-gradient(145deg, #0a0a0a 0%, #141008 55%, #0f0d0a 100%)'
    : 'linear-gradient(145deg, #f8f3e8 0%, #fdf8ee 55%, #f5edd8 100%)';

  return (
    <section id="hero" ref={heroRef}
      style={{ position:'relative', minHeight:'100svh', display:'flex', alignItems:'center',
        overflow:'hidden', background: heroBg }}>

      {/* Subtle texture overlay */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:1,
        backgroundImage: theme === 'dark'
          ? 'radial-gradient(ellipse 80% 60% at 65% 45%, rgba(201,168,76,0.04), transparent 70%)'
          : 'radial-gradient(ellipse 80% 60% at 65% 45%, rgba(160,118,42,0.06), transparent 70%)' }} />

      {/* Fine grid lines */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:1,
        backgroundImage: theme === 'dark'
          ? `linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)`
          : `linear-gradient(rgba(160,118,42,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(160,118,42,0.04) 1px, transparent 1px)`,
        backgroundSize: '60px 60px' }} />

      {/* Scanline — very subtle */}
      <div style={{ position:'absolute',left:0,right:0,height:1,pointerEvents:'none',zIndex:2,
        background: theme === 'dark'
          ? 'linear-gradient(90deg,transparent,rgba(201,168,76,0.18),transparent)'
          : 'linear-gradient(90deg,transparent,rgba(160,118,42,0.12),transparent)',
        animation:'scanline 10s linear infinite' }}/>

      {/* Decorative corner marks */}
      {[
        {pos:{top:'8%',left:'3%'}}, {pos:{top:'8%',right:'3%'}},
        {pos:{bottom:'8%',left:'3%'}}, {pos:{bottom:'8%',right:'3%'}},
      ].map(({pos},i) => (
        <div key={i} className="hide-mobile p-glow" style={{
          position:'absolute', ...pos, width:24, height:24,
          borderTop: i < 2 ? `1px solid rgba(201,168,76,0.2)` : 'none',
          borderBottom: i >= 2 ? `1px solid rgba(201,168,76,0.2)` : 'none',
          borderLeft: i % 2 === 0 ? `1px solid rgba(201,168,76,0.2)` : 'none',
          borderRight: i % 2 !== 0 ? `1px solid rgba(201,168,76,0.2)` : 'none',
          zIndex:3, pointerEvents:'none'
        }}/>
      ))}

      {/* Main content */}
      <div className="wrap sec" style={{ position:'relative', zIndex:10, width:'100%',
        paddingTop:'calc(var(--sp) + 68px)' }}>

        <div style={{ display:'grid', gap:'2rem', alignItems:'center' }} className="hero-grid">

          {/* LEFT COL: text */}
          <motion.div initial={{opacity:0,x:-40}} animate={{opacity:1,x:0}}
            transition={{duration:0.9,ease:[0.22,1,0.36,1]}}>

            {/* Badge */}
            <motion.div initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{delay:0.2}}
              className="status-on" style={{ marginBottom:'1.6rem', display:'inline-flex' }}>
              <span className="pulse-dot"/>
              SYSTEM ONLINE — SEEKING INTERNSHIP
            </motion.div>

            {/* Name */}
            <motion.h1 initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.35}}
              className="font-disp grad-gold"
              style={{ fontSize:'clamp(2.6rem,5.5vw,4.8rem)', fontWeight:700, lineHeight:1.02,
                letterSpacing:'-0.01em', marginBottom:'0.8rem' }}>
              Prashant Kushwaha
            </motion.h1>

            {/* Typewriter */}
            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.5}}
              style={{ height:'2.2rem', display:'flex', alignItems:'center', marginBottom:'1.2rem' }}>
              <span className="font-disp" style={{ fontSize:'clamp(1rem,2vw,1.28rem)',
                fontWeight:500, color:'var(--t2)', letterSpacing:'0.01em', fontStyle:'italic' }}>{displayed}</span>
              <span className="blink font-mono" style={{ color:'var(--gold)', fontSize:'1.2rem', marginLeft:4 }}>|</span>
            </motion.div>

            {/* Bio */}
            <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.6}}
              style={{ fontSize:'clamp(0.9rem,1.5vw,1.02rem)', color:'var(--t2)', lineHeight:1.8,
                maxWidth:'46ch', marginBottom:'1.8rem' }}>
              Building at the intersection of circuits and code. Passionate about embedded systems,
              signal processing, and wireless communication.{' '}
              <span style={{ color:'var(--gold)', fontWeight:600 }}>Class of 2027 · GEC Surat</span>
            </motion.p>

            {/* Stats */}
            <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.7}}
              style={{ display:'flex', gap:'2rem', marginBottom:'1.8rem', paddingBottom:'1.6rem',
                borderBottom:'1px solid var(--border)' }}>
              {stats.map(({val,label}) => (
                <div key={label}>
                  <div className="font-disp grad-gold" style={{ fontSize:'2rem', fontWeight:700, lineHeight:1 }}>{val}</div>
                  <div className="font-mono" style={{ fontSize:'0.52rem', color:'var(--t4)',
                    letterSpacing:'0.1em', textTransform:'uppercase', marginTop:4 }}>{label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:0.8}}
              style={{ display:'flex', flexWrap:'wrap', gap:'0.75rem', marginBottom:'1.6rem' }}>
              <button className="btn btn-c"
                onClick={()=>document.getElementById('projects')?.scrollIntoView({behavior:'smooth'})}>
                View Projects →
              </button>
              <button className="btn btn-v"
                onClick={()=>document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})}>
                Contact Me
              </button>
            </motion.div>

            {/* Tech chips */}
            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1}}
              style={{ display:'flex', flexWrap:'wrap', gap:'0.45rem' }}>
              {['C/C++','Python','MATLAB','Arduino','STM32','LoRa','FPGA','Linux'].map(s=>(
                <span key={s} className="chip">{s}</span>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT COL: elegant profile card (desktop) */}
          <motion.div initial={{opacity:0,x:40}} animate={{opacity:1,x:0}}
            transition={{duration:1,ease:[0.22,1,0.36,1],delay:0.3}}
            className="hide-mobile"
            style={{ display:'flex', alignItems:'center', justifyContent:'center' }}>

            <div style={{ position:'relative', width:340 }}>
              {/* Outer decorative ring */}
              <div style={{
                position:'absolute', inset:-20, borderRadius:'50%',
                border:'1px solid var(--border)',
                animation:'spin-s 40s linear infinite',
                opacity:0.5
              }}/>
              <div style={{
                position:'absolute', inset:-40, borderRadius:'50%',
                border:'1px dashed var(--border)',
                animation:'spin-r 60s linear infinite',
                opacity:0.3
              }}/>

              {/* Main card */}
              <div className="glass" style={{
                padding:'2.4rem 2rem',
                textAlign:'center',
                position:'relative',
                overflow:'hidden'
              }}>
                {/* Corner decoration */}
                {[{top:0,left:0,bt:1,bl:1},{top:0,right:0,bt:1,br:1},{bottom:0,left:0,bb:1,bl:1},{bottom:0,right:0,bb:1,br:1}].map((pos,i)=>(
                  <div key={i} style={{
                    position:'absolute', width:14, height:14,
                    ...(pos.top!==undefined?{top:10}:{bottom:10}),
                    ...(pos.left!==undefined?{left:10}:{right:10}),
                    borderTop:pos.bt?'1px solid var(--gold-dim)':'none',
                    borderBottom:pos.bb?'1px solid var(--gold-dim)':'none',
                    borderLeft:pos.bl?'1px solid var(--gold-dim)':'none',
                    borderRight:pos.br?'1px solid var(--gold-dim)':'none',
                    opacity:0.6
                  }}/>
                ))}

                {/* Avatar circle */}
                <div style={{
                  width:90, height:90,
                  borderRadius:'50%',
                  background:`linear-gradient(135deg, var(--gold-dim), var(--gold))`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  margin:'0 auto 1.4rem',
                  boxShadow:'0 0 0 4px var(--bg-card), 0 0 0 6px var(--border), 0 8px 32px var(--accent-glow)',
                  fontSize:'2.4rem', fontWeight:700,
                  color: theme==='dark'?'#0a0805':'#fff8ee',
                  fontFamily:"'Playfair Display', serif"
                }}>PK</div>

                <div className="font-disp" style={{ fontWeight:700, fontSize:'1.3rem', color:'var(--t1)', marginBottom:4 }}>Prashant Kushwaha</div>
                <div className="font-mono" style={{ fontSize:'0.58rem', color:'var(--gold)', letterSpacing:'0.12em', marginBottom:'1.4rem', opacity:0.8 }}>ECE · BATCH 2023–27</div>

                {/* Horizontal separator with diamond */}
                <div style={{ display:'flex', alignItems:'center', gap:'0.8rem', marginBottom:'1.4rem' }}>
                  <div style={{ flex:1, height:1, background:'var(--border)' }}/>
                  <div style={{ width:6, height:6, background:'var(--gold)', transform:'rotate(45deg)', opacity:0.6 }}/>
                  <div style={{ flex:1, height:1, background:'var(--border)' }}/>
                </div>

                {/* Info rows */}
                {[
                  {icon:'🎓', label:'GEC Surat'},
                  {icon:'📡', label:'ECE Department'},
                  {icon:'🌏', label:'Gujarat, India'},
                  {icon:'⚡', label:'Open to Internships'},
                ].map(({icon,label})=>(
                  <div key={label} style={{
                    display:'flex', alignItems:'center', gap:'0.7rem',
                    padding:'0.5rem 0.8rem', borderRadius:6,
                    marginBottom:'0.4rem',
                    background:'var(--accent-glow)',
                    border:'1px solid transparent',
                    transition:'border-color .2s'
                  }}
                  onMouseEnter={e=>e.currentTarget.style.borderColor='var(--border)'}
                  onMouseLeave={e=>e.currentTarget.style.borderColor='transparent'}>
                    <span style={{fontSize:'0.9rem'}}>{icon}</span>
                    <span style={{fontSize:'0.78rem', color:'var(--t2)', fontWeight:500}}>{label}</span>
                  </div>
                ))}

                {/* Status badge */}
                <div className="status-on" style={{ marginTop:'1.2rem', justifyContent:'center' }}>
                  <span className="pulse-dot"/>
                  Available for hire
                </div>
              </div>

              {/* Floating accent dots */}
              {[{top:'-5%',right:'8%',c:'var(--gold)'},{bottom:'10%',left:'-4%',c:'var(--amber)'},{top:'45%',right:'-6%',c:'var(--copper)'}].map(({top,bottom,left,right,c},i)=>(
                <div key={i} style={{
                  position:'absolute', top, bottom, left, right,
                  width:8, height:8, borderRadius:'50%',
                  background:c,
                  boxShadow:`0 0 12px ${c}`,
                  animation:`pulse-glow ${1.5+i*0.5}s ease-in-out infinite`,
                  animationDelay:`${i*0.4}s`
                }}/>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:2.5}}
        style={{ position:'absolute',bottom:'1.5rem',left:'50%',transform:'translateX(-50%)',
          display:'flex',flexDirection:'column',alignItems:'center',gap:'0.4rem',zIndex:10 }}>
        <span className="font-mono" style={{ fontSize:'0.5rem',color:'var(--t4)',letterSpacing:'0.3em' }}>SCROLL</span>
        <div style={{ width:1,height:32,background:`linear-gradient(to bottom, var(--gold), transparent)`,
          animation:'pulse-glow 2s ease-in-out infinite' }}/>
      </motion.div>

      <style>{`
        .hero-grid{grid-template-columns:1fr}
        @media(min-width:900px){
          .hero-grid{grid-template-columns:1.1fr 0.9fr}
        }
      `}</style>
    </section>
  );
}
