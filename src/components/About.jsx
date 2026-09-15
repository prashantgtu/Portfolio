import { motion } from 'framer-motion';
import { useTheme } from '../App';

const stats = [
  { val:'8.3', unit:'/10', label:'Core CGPA' },
  { val:'3',  unit:'+',   label:'Projects' },
  { val:'6',  unit:'+',   label:'Certs' },
];
const interests = [
  {icon:'⚡',label:'Embedded Systems',c:'var(--gold)'},
  {icon:'📡',label:'Communication Systems',c:'var(--amber)'},
  {icon:'〰',label:'Signal Processing',c:'var(--sage)'},
  {icon:'🔬',label:'VLSI Design',c:'var(--copper)'},
  {icon:'🌐',label:'IoT & Networking',c:'var(--gold-light)'},
  {icon:'🤖',label:'Edge AI / ML',c:'var(--rose)'},
];
const vp = {once:true,margin:'-80px'};
const f=(d=0)=>({initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:vp,transition:{duration:.7,delay:d,ease:[.22,1,.36,1]}});

export default function About() {
  const { theme } = useTheme();
  const sectionBg = theme === 'dark'
    ? 'linear-gradient(180deg, #0a0a0a, #111108 60%, #0a0a0a)'
    : 'linear-gradient(180deg, #faf6ee, #f5eedd 60%, #faf6ee)';

  return (
    <section id="about" style={{background: sectionBg}}>
      <div className="wrap sec">
        <motion.div {...f()} style={{marginBottom:'2.8rem'}}>
          <div className="sec-label">01 · About</div>
          <h2 className="sec-h grad-gold">About Me</h2>
          <p className="sec-sub">Third-year ECE student building at the hardware-software boundary.</p>
        </motion.div>

        <div style={{display:'grid',gap:'2rem',alignItems:'start'}} className="about-grid">
          {/* Left */}
          <div style={{display:'flex',flexDirection:'column',gap:'1.2rem'}}>
            <motion.div {...f(.1)} className="glass" style={{padding:'2rem 2.2rem',position:'relative',overflow:'hidden'}}>
              {/* Decorative corner */}
              <div style={{position:'absolute',top:0,left:0,width:24,height:24,borderTop:'1px solid var(--gold-dim)',borderLeft:'1px solid var(--gold-dim)',opacity:0.6}}/>
              <div style={{position:'absolute',bottom:0,right:0,width:24,height:24,borderBottom:'1px solid var(--border)',borderRight:'1px solid var(--border)'}}/>

              <div className="font-mono" style={{fontSize:'.58rem',color:'var(--t4)',letterSpacing:'.1em',marginBottom:'1rem'}}>
                &lt;profile role="ECE_student" batch="2023–27" /&gt;
              </div>
              <p style={{fontSize:'.96rem',lineHeight:1.85,color:'var(--t2)',marginBottom:'.9rem'}}>
                I'm a third-year <span style={{color:'var(--gold)',fontWeight:600}}>Electronics and Communication Engineering</span> student at <span style={{color:'var(--gold)',fontWeight:600}}>Dr. S. &amp; S.S. Ghandhy Government Engineering College Surat</span>, driven by curiosity for how systems communicate, compute, and connect.
              </p>
              <p style={{fontSize:'.96rem',lineHeight:1.85,color:'var(--t2)',marginBottom:'.9rem'}}>
                From flashing firmware on microcontrollers at midnight to modelling digital filters in MATLAB, I thrive at the intersection of <span style={{color:'var(--amber)',fontWeight:500}}>hardware and software</span>.
              </p>
              <p style={{fontSize:'.96rem',lineHeight:1.85,color:'var(--t2)'}}>
                Currently exploring <span style={{color:'var(--sage)'}}>embedded IoT systems</span> and <span style={{color:'var(--sage)'}}>communication protocol stacks</span>. Open to research collaborations and internships.
              </p>
              <div style={{marginTop:'1.4rem',paddingTop:'1.1rem',borderTop:'1px solid var(--border)'}}>
                <div className="font-mono" style={{fontSize:'.56rem',color:'var(--t4)',letterSpacing:'.14em',marginBottom:'.6rem'}}>CURRENT STATUS</div>
                <div style={{display:'flex',flexWrap:'wrap',gap:'.4rem'}}>
                  {['Seeking Internship','Open to Research','Building Projects'].map(s=>(
                    <span key={s} className="chip" style={{color:'var(--sage)',borderColor:'rgba(122,158,126,0.3)',background:'rgba(122,158,126,0.08)'}}> {s}</span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Skill activity chart */}
            <motion.div {...f(.18)} className="glass" style={{padding:'1.2rem 1.6rem'}}>
              <div className="font-mono" style={{fontSize:'.55rem',color:'var(--t4)',letterSpacing:'.14em',marginBottom:'.8rem'}}>SKILL ACTIVITY · WEEKLY</div>
              <svg viewBox="0 0 500 60" style={{width:'100%',height:60}} preserveAspectRatio="none">
                <defs>
                  <linearGradient id="wg" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="var(--gold)" stopOpacity=".3"/>
                    <stop offset="100%" stopColor="var(--gold)" stopOpacity="0"/>
                  </linearGradient>
                  <filter id="gf"><feGaussianBlur stdDeviation="1.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                </defs>
                {[0,100,200,300,400].map(x=><line key={x} x1={x} y1="0" x2={x} y2="60" stroke="var(--border)" strokeWidth=".5"/>)}
                <path d="M0,30 Q31,8 63,30 Q94,52 125,30 Q156,8 188,30 Q219,52 250,30 Q281,8 313,30 Q344,52 375,30 Q406,8 438,30 Q469,52 500,30 L500,60 L0,60 Z" fill="url(#wg)"/>
                <path d="M0,30 Q31,8 63,30 Q94,52 125,30 Q156,8 188,30 Q219,52 250,30 Q281,8 313,30 Q344,52 375,30 Q406,8 438,30 Q469,52 500,30" fill="none" stroke="var(--gold)" strokeWidth="1.5" filter="url(#gf)"/>
              </svg>
            </motion.div>
          </div>

          {/* Right */}
          <div style={{display:'flex',flexDirection:'column',gap:'1.2rem'}}>
            <motion.div {...f(.12)} style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'.8rem'}}>
              {stats.map(({val,unit,label},i)=>(
                <motion.div key={label} {...f(.18+i*.06)} className="glass lift"
                  style={{padding:'1.6rem 1rem',textAlign:'center',cursor:'default'}}>
                  <div className="grad-gold font-disp" style={{fontWeight:700,fontSize:'2rem',lineHeight:1}}>
                    {val}<span style={{fontSize:'1.1rem'}}>{unit}</span>
                  </div>
                  <div className="font-mono" style={{fontSize:'.52rem',color:'var(--t4)',letterSpacing:'.1em',marginTop:5,textTransform:'uppercase'}}>{label}</div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div {...f(.2)} className="glass" style={{padding:'1.6rem 1.8rem'}}>
              <div className="sec-label" style={{marginBottom:'1rem'}}>Interest Areas</div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'.55rem'}}>
                {interests.map(({icon,label,c})=>(
                  <div key={label} style={{display:'flex',alignItems:'center',gap:'.6rem',padding:'.6rem .8rem',
                    borderRadius:8,border:'1px solid var(--border)',background:'transparent',
                    transition:'all .22s',cursor:'default'}}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--border-hover)';e.currentTarget.style.background='var(--accent-glow)';}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.background='transparent';}}>
                    <span style={{fontSize:'1rem'}}>{icon}</span>
                    <span style={{fontSize:'.82rem',color:'var(--t2)',fontWeight:500}}>{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...f(.28)} className="glass" style={{padding:'1.4rem 1.6rem',display:'flex',alignItems:'flex-start',gap:'1rem'}}>
              <div style={{width:42,height:42,borderRadius:8,flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',
                background:'var(--accent-glow)',border:'1px solid var(--border)'}}>
                🎓
              </div>
              <div>
                <div className="font-disp" style={{fontWeight:600,fontSize:'.98rem',color:'var(--t1)',marginBottom:'.25rem'}}>B.Tech — Electronics &amp; Communication Engineering</div>
                <div style={{fontSize:'.85rem',color:'var(--t2)',marginBottom:'.5rem'}}>Dr. S. &amp; S.S. Ghandhy Government Engineering College Surat · 2023 – 2027</div>
                <div className="font-mono" style={{fontSize:'.55rem',color:'var(--gold)',letterSpacing:'.08em'}}>CGPA: 8.3/10</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <style>{`@media(min-width:860px){.about-grid{grid-template-columns:1fr 1fr}}`}</style>
    </section>
  );
}
