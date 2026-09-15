import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../App';

const vp={once:true,margin:'-60px'};
const f=(d=0)=>({initial:{opacity:0,y:30},whileInView:{opacity:1,y:0},viewport:vp,transition:{duration:.7,delay:d,ease:[.22,1,.36,1]}});

const projects=[
  {id:'p1',title:'Anti-Theft Alarm System',cat:'EMBEDDED IoT',c:'var(--rose)',icon:'🚨',status:'Completed',sc:'var(--sage)',
   desc:'ESP32-based anti-theft alarm system with motion detection, piezo siren. Real-time SMS alerts on intrusion.',
   tech:['ESP32','Motion Sensor','Telegram Bot','Arduino','IoT'],outcome:'<100ms intrusion detection · Telegram alert to phone'},
  {id:'p2',title:'Surveillance Car using ESP32',cat:'EMBEDDED IoT',c:'var(--gold)',icon:'🚗',status:'Completed',sc:'var(--gold)',
   desc:'Autonomous surveillance car with ESP32 microcontroller, live camera feed over WiFi, mobile app control.',
   tech:['ESP32','Camera Module','WiFi','Python'],outcome:'Live 720p feed · 50m WiFi range'},
];

function Card({p,delay}){
  const [hov,setHov]=useState(false);
  return(
    <motion.div {...f(delay)} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      className="glass lift"
      style={{overflow:'hidden',display:'flex',flexDirection:'column',cursor:'default',
        borderColor: hov ? 'var(--border-hover)' : 'var(--border)',
        boxShadow: hov ? '0 12px 40px var(--shadow)' : undefined,
        transition:'all .3s ease'}}>
      <div style={{height:2,background:`linear-gradient(90deg,transparent,${p.c},transparent)`,
        opacity:hov?1:.3,transition:'opacity .3s'}}/>
      <div style={{padding:'1.6rem 1.8rem',flex:1,display:'flex',flexDirection:'column'}}>
        <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:'.5rem',marginBottom:'.9rem'}}>
          <div style={{display:'flex',gap:'.65rem',alignItems:'flex-start',minWidth:0}}>
            <span style={{fontSize:'1.4rem',flexShrink:0}}>{p.icon}</span>
            <div style={{minWidth:0}}>
              <div className="font-mono" style={{fontSize:'.56rem',color:p.c,letterSpacing:'.1em',marginBottom:'.2rem',textTransform:'uppercase'}}>{p.cat}</div>
              <h3 className="font-disp" style={{fontWeight:700,fontSize:'1rem',color:'var(--t1)',lineHeight:1.22}}>{p.title}</h3>
            </div>
          </div>
          <span className="font-mono" style={{flexShrink:0,fontSize:'.5rem',padding:'2px 9px',borderRadius:4,
            background:'var(--accent-glow)',border:'1px solid var(--border)',color:'var(--sage)',letterSpacing:'.07em',whiteSpace:'nowrap'}}>● {p.status}</span>
        </div>
        <p style={{fontSize:'.86rem',lineHeight:1.75,color:'var(--t2)',marginBottom:'1rem',flex:1}}>{p.desc}</p>
        <div style={{display:'flex',flexWrap:'wrap',gap:'.35rem',marginBottom:'.9rem'}}>
          {p.tech.map(t=>(
            <span key={t} style={{background:'var(--accent-glow)',border:'1px solid var(--border)',color:'var(--t3)',
              padding:'2px 9px',borderRadius:4,fontSize:'.62rem',fontFamily:"'JetBrains Mono',monospace"}}>{t}</span>
          ))}
        </div>
        <div style={{padding:'.6rem .9rem',borderRadius:6,background:'var(--accent-glow)',border:'1px solid var(--border)',
          display:'flex',gap:'.5rem',alignItems:'flex-start',marginBottom:'.9rem'}}>
          <span style={{color:'var(--gold)',flexShrink:0}}>→</span>
          <span className="font-mono" style={{fontSize:'.65rem',color:'var(--t2)',lineHeight:1.55}}>{p.outcome}</span>
        </div>
        <div style={{display:'flex',gap:'1rem',paddingTop:'.8rem',borderTop:'1px solid var(--border)'}}>
          {[{l:'Code',icon:'⌥'},{l:'Demo',icon:'↗'}].map(({l,icon})=>(
            <button key={l} className="btn-g" onClick={()=>window.open('https://github.com/prashantgtu','_blank')}
              style={{fontSize:'.76rem'}}>{icon} {l}</button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects(){
  const { theme } = useTheme();
  const sectionBg = theme === 'dark'
    ? 'linear-gradient(180deg, #0a0a0a, #0f0d08 60%, #0a0a0a)'
    : 'linear-gradient(180deg, #faf6ee, #f5f0e4 60%, #faf6ee)';

  return(
    <section id="projects" style={{background: sectionBg}}>
      <div className="wrap sec">
        <motion.div {...f()} style={{marginBottom:'2.8rem'}}>
          <div className="sec-label">03 · Projects</div>
          <h2 className="sec-h grad-gold">Engineering Work</h2>
          <p className="sec-sub">Systems designed, circuits built, firmware flashed — concept to deployment.</p>
        </motion.div>
        <div style={{display:'grid',gap:'1.2rem'}} className="proj-grid">
          {projects.map((p,i)=><Card key={p.id} p={p} delay={i*.08}/>)}
        </div>
        <motion.div {...f(.5)} style={{textAlign:'center',marginTop:'2.2rem'}}>
          <button className="btn btn-v" onClick={()=>window.open('https://github.com/prashantgtu','_blank')}>View All on GitHub →</button>
        </motion.div>
      </div>
      <style>{`@media(min-width:640px){.proj-grid{grid-template-columns:1fr 1fr}} @media(min-width:1024px){.proj-grid{grid-template-columns:1fr 1fr}}`}</style>
    </section>
  );
}
