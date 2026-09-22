import { motion } from 'framer-motion';
import { useTheme } from '../App';

const vp={once:true,margin:'-60px'};
const f=(d=0)=>({initial:{opacity:0,y:26,scale:.96},whileInView:{opacity:1,y:0,scale:1},viewport:vp,transition:{duration:.62,delay:d,ease:[.22,1,.36,1]}});

const items=[
  {icon:'📜',title:'CS50 — Introduction to Programming with Python',org:'Harvard University',year:'2024',c:'var(--gold)',desc:'Comprehensive introduction to Python programming, algorithms, and problem-solving.'},
  {icon:'📜',title:'Semiconductor Process Technology and Packaging',org:'Department of Electronics, Sardar Vallabhbhai National Institute of Technology (SVNIT), Surat',year:'2025',c:'var(--amber)',desc:'Focused training on semiconductor fabrication, process technology, and advanced packaging concepts.'},
  {icon:'📜',title:'OCI GenAI Professional',org:'Oracle University',year:'2025',c:'var(--copper)',desc:'Certified in Generative AI fundamentals and Oracle Cloud Infrastructure AI services.'},
];

export default function Achievements(){
  const { theme } = useTheme();
  const sectionBg = theme === 'dark'
    ? 'linear-gradient(180deg, #0a0a0a, #111008 60%, #0a0a0a)'
    : 'linear-gradient(180deg, #faf6ee, #f5eedd 60%, #faf6ee)';

  return(
    <section id="achievements" style={{background: sectionBg, position:'relative', overflow:'hidden'}}>
      {/* Decorative background element */}
      <div style={{position:'absolute',right:'2rem',top:'2rem',opacity:.06,pointerEvents:'none',width:160,height:160}}>
        <svg viewBox="0 0 160 160" style={{width:'100%',height:'100%'}}>
          {[70,48,26].map(r=><circle key={r} cx="80" cy="80" r={r} fill="none" stroke="var(--gold)" strokeWidth=".7"/>)}
          <line x1="80" y1="10" x2="80" y2="150" stroke="var(--gold)" strokeWidth=".5"/>
          <line x1="10" y1="80" x2="150" y2="80" stroke="var(--gold)" strokeWidth=".5"/>
          <line x1="80" y1="80" x2="150" y2="10" stroke="var(--gold)" strokeWidth="1.2" style={{transformOrigin:'80px 80px',animation:'radar 4s linear infinite'}}/>
        </svg>
      </div>

      <div className="wrap sec" style={{position:'relative'}}>
        <motion.div {...f()} style={{marginBottom:'2.8rem'}}>
          <div className="sec-label">05 · Achievements</div>
          <h2 className="sec-h grad-gold">Certifications & Awards</h2>
          <p className="sec-sub">Certifications, recognitions, and milestones in the ECE journey.</p>
        </motion.div>
        <div style={{display:'grid',gap:'1rem'}} className="ach-grid">
          {items.map((a,i)=>(
            <motion.div key={i} {...f(i*.07)} className="glass lift"
              style={{padding:'1.5rem 1.7rem',cursor:'default',position:'relative',overflow:'hidden'}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--border-hover)';}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';}}>
              {/* Top accent line */}
              <div className="ach-bar" style={{position:'absolute',top:0,left:0,right:0,height:2,
                background:`linear-gradient(90deg,transparent,${a.c},transparent)`,opacity:0,transition:'opacity .3s'}}/>
              <div style={{display:'flex',gap:'.9rem',alignItems:'flex-start'}}>
                <div style={{width:44,height:44,borderRadius:10,flexShrink:0,display:'flex',
                  alignItems:'center',justifyContent:'center',fontSize:'1.3rem',
                  background:'var(--accent-glow)',border:'1px solid var(--border)'}}>
                  {a.icon}
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:'flex',alignItems:'flex-start',gap:'.5rem',flexWrap:'wrap',marginBottom:'.3rem'}}>
                    <h3 className="font-disp" style={{fontWeight:600,fontSize:'.95rem',color:'var(--t1)',flex:1,lineHeight:1.28}}>{a.title}</h3>
                    <span className="font-mono" style={{fontSize:'.52rem',padding:'2px 8px',borderRadius:4,
                      background:'var(--accent-glow)',border:'1px solid var(--border)',color:'var(--gold)',flexShrink:0}}>{a.year}</span>
                  </div>
                  <div className="font-mono" style={{fontSize:'.6rem',color:a.c,marginBottom:'.4rem',letterSpacing:'.05em'}}>{a.org}</div>
                  <p style={{fontSize:'.82rem',color:'var(--t2)',lineHeight:1.6}}>{a.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`.glass:hover .ach-bar{opacity:1!important} @media(min-width:640px){.ach-grid{grid-template-columns:1fr 1fr}} @media(min-width:1024px){.ach-grid{grid-template-columns:1fr 1fr 1fr}}`}</style>
    </section>
  );
}
