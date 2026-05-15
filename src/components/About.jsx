import { motion } from 'framer-motion';

const stats = [
  { val:'8.3', unit:'/10', label:'Core CGPA' },
  { val:'3',  unit:'+',   label:'Projects' },
  { val:'6',   unit:'+',   label:'Certs' },
  // { val:'4',   unit:'',    label:'Hackathons' },
];
const interests = [
  {icon:'⚡',label:'Embedded Systems',c:'#00f5ff'},
  {icon:'📡',label:'Communication Systems',c:'#7b2fff'},
  {icon:'〰',label:'Signal Processing',c:'#00ff88'},
  {icon:'🔬',label:'VLSI Design',c:'#ffaa00'},
  {icon:'🌐',label:'IoT & Networking',c:'#0080ff'},
  {icon:'🤖',label:'Edge AI / ML',c:'#ff6b6b'},
];
const vp = {once:true,margin:'-80px'};
const f=(d=0)=>({initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:vp,transition:{duration:.7,delay:d,ease:[.22,1,.36,1]}});

export default function About() {
  return (
    <section id="about" style={{background:'linear-gradient(180deg,#010306,#030d18 60%,#020509)'}}>
      <div className="wrap sec">
        <motion.div {...f()} style={{marginBottom:'2.8rem'}}>
          <div className="sec-label">01 · ABOUT</div>
          <h2 className="sec-h grad-cyan">System Overview</h2>
          <p className="sec-sub">Third-year ECE student building things at the hardware-software boundary.</p>
        </motion.div>

        <div style={{display:'grid',gap:'2rem',alignItems:'start'}} className="about-grid">
          {/* Left */}
          <div style={{display:'flex',flexDirection:'column',gap:'1.2rem'}}>
            <motion.div {...f(.1)} className="glass" style={{padding:'1.8rem 2rem',position:'relative',overflow:'hidden'}}>
              <div style={{position:'absolute',top:0,left:0,width:20,height:20,borderTop:'2px solid #00f5ff',borderLeft:'2px solid #00f5ff'}}/>
              <div style={{position:'absolute',bottom:0,right:0,width:20,height:20,borderBottom:'2px solid rgba(123,47,255,.7)',borderRight:'2px solid rgba(123,47,255,.7)'}}/>
              <div className="font-mono" style={{fontSize:'.58rem',color:'#1f3d52',letterSpacing:'.1em',marginBottom:'.9rem'}}>&lt;bio role="ECE_student" batch="2023–27" /&gt;</div>
              <p style={{fontSize:'.95rem',lineHeight:1.8,color:'#8fc4d8',marginBottom:'.9rem'}}>
                I'm a third-year <span style={{color:'#00f5ff',fontWeight:600}}>Electronics and Communication Engineering</span> student at <span style={{color:'#00f5ff',fontWeight:600}}>Dr. S. & S.S. Ghandhy Government Engineering College Surat</span>, driven by curiosity for how systems communicate, compute, and connect.
              </p>
              <p style={{fontSize:'.95rem',lineHeight:1.8,color:'#8fc4d8',marginBottom:'.9rem'}}>
                From flashing firmware on microcontrollers at midnight to modelling digital filters in MATLAB, I thrive at the intersection of <span style={{color:'#7b2fff',fontWeight:500}}>hardware and software</span>.
              </p>
              <p style={{fontSize:'.95rem',lineHeight:1.8,color:'#8fc4d8'}}>
                Currently exploring <span style={{color:'#00ff88'}}>embedded IoT systems</span> and <span style={{color:'#00ff88'}}>communication protocol stacks</span>. Open to research collaborations and internships.
              </p>
              <div style={{marginTop:'1.4rem',paddingTop:'1.1rem',borderTop:'1px solid rgba(0,245,255,.08)'}}>
                <div className="font-mono" style={{fontSize:'.56rem',color:'#1f3d52',letterSpacing:'.14em',marginBottom:'.6rem'}}>CURRENT_STATUS</div>
                <div style={{display:'flex',flexWrap:'wrap',gap:'.4rem'}}>
                  {['Seeking Internship','Open to Research','Building Projects'].map(s=>(
                    <span key={s} className="chip" style={{color:'#00ff88',borderColor:'rgba(0,255,136,.25)',background:'rgba(0,255,136,.05)'}}>● {s}</span>
                  ))}
                </div>
              </div>
            </motion.div>
            {/* Osc strip */}
            <motion.div {...f(.18)} className="glass" style={{padding:'1.1rem 1.5rem'}}>
              <div className="font-mono" style={{fontSize:'.55rem',color:'#1f3d52',letterSpacing:'.14em',marginBottom:'.7rem'}}>OSC_CH1 · SKILL_ACTIVITY · 20ms/div</div>
              <svg viewBox="0 0 500 60" style={{width:'100%',height:60}} preserveAspectRatio="none">
                <defs>
                  <linearGradient id="wg" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#00f5ff" stopOpacity=".25"/><stop offset="100%" stopColor="#00f5ff" stopOpacity="0"/></linearGradient>
                  <filter id="gf"><feGaussianBlur stdDeviation="1.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                </defs>
                {[0,100,200,300,400].map(x=><line key={x} x1={x} y1="0" x2={x} y2="60" stroke="rgba(0,245,255,.05)" strokeWidth=".5"/>)}
                <path d="M0,30 Q31,8 63,30 Q94,52 125,30 Q156,8 188,30 Q219,52 250,30 Q281,8 313,30 Q344,52 375,30 Q406,8 438,30 Q469,52 500,30 L500,60 L0,60 Z" fill="url(#wg)"/>
                <path d="M0,30 Q31,8 63,30 Q94,52 125,30 Q156,8 188,30 Q219,52 250,30 Q281,8 313,30 Q344,52 375,30 Q406,8 438,30 Q469,52 500,30" fill="none" stroke="#00f5ff" strokeWidth="1.4" filter="url(#gf)"/>
              </svg>
            </motion.div>
          </div>

          {/* Right */}
          <div style={{display:'flex',flexDirection:'column',gap:'1.2rem'}}>
            <motion.div {...f(.12)} style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'.8rem'}}>
              {stats.map(({val,unit,label},i)=>(
                <motion.div key={label} {...f(.18+i*.06)} className="glass lift"
                  style={{padding:'1.4rem 1.1rem',textAlign:'center',cursor:'default'}}>
                  <div className="grad-cyan font-disp" style={{fontWeight:700,fontSize:'2rem',lineHeight:1}}>
                    {val}<span style={{fontSize:'1.1rem'}}>{unit}</span>
                  </div>
                  <div className="font-mono" style={{fontSize:'.55rem',color:'#1f3d52',letterSpacing:'.1em',marginTop:4,textTransform:'uppercase'}}>{label}</div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div {...f(.2)} className="glass" style={{padding:'1.5rem 1.7rem'}}>
              <div className="sec-label" style={{marginBottom:'1rem'}}>INTEREST_MODULES</div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'.55rem'}}>
                {interests.map(({icon,label,c})=>(
                  <div key={label} style={{display:'flex',alignItems:'center',gap:'.6rem',padding:'.6rem .8rem',
                    borderRadius:6,border:'1px solid rgba(255,255,255,.05)',background:'rgba(255,255,255,.015)',
                    transition:'all .22s',cursor:'default'}}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor=c+'45';e.currentTarget.style.background=c+'0a';}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,.05)';e.currentTarget.style.background='rgba(255,255,255,.015)';}}>
                    <span style={{fontSize:'1rem'}}>{icon}</span>
                    <span className="font-disp" style={{fontSize:'.84rem',color:'#8fc4d8',fontWeight:500}}>{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...f(.28)} className="glass" style={{padding:'1.3rem 1.5rem',display:'flex',alignItems:'flex-start',gap:'1rem'}}>
              <div style={{width:40,height:40,borderRadius:8,flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(0,128,255,.1)',border:'1px solid rgba(0,128,255,.28)'}}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5z" stroke="#0080ff" strokeWidth="1.5" strokeLinejoin="round"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="#0080ff" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </div>
              <div>
                <div className="font-disp" style={{fontWeight:600,fontSize:'.96rem',color:'#eef5f9',marginBottom:'.25rem'}}>B.Tech — Electronics & Communication Engineering</div>
                <div style={{fontSize:'.85rem',color:'#8fc4d8',marginBottom:'.5rem'}}>Dr. S. & S.S. Ghandhy Government Engineering College Surat · 2023 – 2027</div>
                <div className="font-mono" style={{fontSize:'.55rem',color:'#1f3d52',letterSpacing:'.08em'}}>CGPA: 8.3/10 ·</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <style>{`@media(min-width:860px){.about-grid{grid-template-columns:1fr 1fr}}`}</style>
    </section>
  );
}
