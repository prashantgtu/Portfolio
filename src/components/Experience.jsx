import { motion } from 'framer-motion';
import { useTheme } from '../App';

const vp={once:true,margin:'-70px'};
const f=(d=0)=>({initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:vp,transition:{duration:.72,delay:d,ease:[.22,1,.36,1]}});

const exps=[
  {type:'Internship',role:'HR Intern',company:'Marpu Foundation',loc:'Remote',
   period:'June – Jul 2025',c:'var(--gold)',
   desc:'Google Forms and Sheets-based HR management system at a non-profit.',
   pts:['Built Google Forms and Sheets-based HR management system','Streamlined hiring processes','Managed various HR workflows']},
];

export default function Experience(){
  const { theme } = useTheme();
  const sectionBg = theme === 'dark'
    ? 'linear-gradient(180deg, #0a0a0a, #121008 60%, #0a0a0a)'
    : 'linear-gradient(180deg, #faf6ee, #f0e8d8 60%, #faf6ee)';

  return(
    <section id="experience" style={{background: sectionBg}}>
      <div className="wrap sec" style={{maxWidth:880,marginInline:'auto'}}>
        <motion.div {...f()} style={{marginBottom:'2.8rem'}}>
          <div className="sec-label">04 · Experience</div>
          <h2 className="sec-h grad-gold">Career Timeline</h2>
          <p className="sec-sub">Professional milestones — internships, research, leadership.</p>
        </motion.div>
        <div style={{position:'relative'}}>
          {/* Timeline line */}
          <div style={{position:'absolute',left:'clamp(14px,3.5vw,20px)',top:10,bottom:10,width:1,
            background:'linear-gradient(to bottom, var(--gold), var(--amber), var(--copper))',
            opacity:0.3}}/>
          <div style={{display:'flex',flexDirection:'column',gap:'1.6rem'}}>
            {exps.map((e,i)=>(
              <motion.div key={i} {...f(i*.14)} style={{display:'flex',gap:'clamp(1.2rem,3.5vw,2rem)',alignItems:'flex-start'}}>
                {/* Timeline dot */}
                <div style={{flexShrink:0,width:'clamp(28px,7vw,40px)',display:'flex',justifyContent:'center'}}>
                  <div style={{width:13,height:13,borderRadius:'50%',marginTop:24,background:e.c,
                    boxShadow:`0 0 12px ${e.c}80`,border:`2px solid var(--bg-primary)`,
                    outline:`2px solid ${e.c}`,position:'relative',zIndex:2}}>
                    <div style={{position:'absolute',inset:-5,borderRadius:'50%',border:`1px solid ${e.c}`,
                      animation:'ping-glow 2.2s ease-out infinite',animationDelay:`${i*.5}s`,opacity:0.5}}/>
                  </div>
                </div>
                <div style={{flex:1}}>
                  <div className="glass" style={{padding:'1.6rem 1.8rem',cursor:'default'}}
                    onMouseEnter={el=>{el.currentTarget.style.borderColor='var(--border-hover)';}}
                    onMouseLeave={el=>{el.currentTarget.style.borderColor='var(--border)';}}>
                    <div style={{display:'flex',flexWrap:'wrap',alignItems:'center',justifyContent:'space-between',gap:'.5rem',marginBottom:'.9rem'}}>
                      <span className="font-mono" style={{fontSize:'.56rem',padding:'3px 10px',borderRadius:4,
                        background:'var(--accent-glow)',border:'1px solid var(--border)',color:'var(--gold)',
                        letterSpacing:'.1em',textTransform:'uppercase'}}>{e.type}</span>
                      <span className="font-mono" style={{fontSize:'.58rem',color:'var(--t3)'}}>{e.period}</span>
                    </div>
                    <h3 className="font-disp" style={{fontWeight:700,fontSize:'1.1rem',color:'var(--t1)',marginBottom:'.3rem'}}>{e.role}</h3>
                    <div style={{display:'flex',gap:'.5rem',alignItems:'center',marginBottom:'.9rem',flexWrap:'wrap'}}>
                      <span style={{fontSize:'.84rem',color:'var(--gold)',fontWeight:600}}>{e.company}</span>
                      <span style={{color:'var(--border)'}}>·</span>
                      <span style={{fontSize:'.78rem',color:'var(--t3)'}}>{e.loc}</span>
                    </div>
                    <p style={{fontSize:'.88rem',lineHeight:1.75,color:'var(--t2)',marginBottom:'.9rem'}}>{e.desc}</p>
                    <ul style={{display:'flex',flexDirection:'column',gap:'.5rem'}}>
                      {e.pts.map((pt,pi)=>(
                        <li key={pi} style={{display:'flex',gap:'.6rem',alignItems:'flex-start',fontSize:'.86rem',color:'var(--t2)'}}>
                          <span style={{width:5,height:5,borderRadius:'50%',background:'var(--gold)',marginTop:'.45rem',
                            flexShrink:0,boxShadow:'0 0 6px var(--gold)',opacity:0.7}}/>
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
