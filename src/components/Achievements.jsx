import { motion } from 'framer-motion';
const vp={once:true,margin:'-60px'};
const f=(d=0)=>({initial:{opacity:0,y:26,scale:.96},whileInView:{opacity:1,y:0,scale:1},viewport:vp,transition:{duration:.62,delay:d,ease:[.22,1,.36,1]}});

 const items=[
//   {icon:'🏆',title:'2nd Place — National Hardware Hackathon',org:'[Institute] TechFest 2024',year:'2024',c:'#ffaa00',desc:'Edge AI + sensor fusion on STM32H7 built in 24h.'},
//   {icon:'📜',title:'NPTEL Elite — Digital Circuits',org:'IIT Madras · NPTEL',year:'2023',c:'#00f5ff',desc:'Top 5% nationwide. Boolean algebra, FSMs, sequential circuits.'},
//   {icon:'📜',title:'Embedded Systems Fundamentals',org:'Coursera',year:'2023',c:'#7b2fff',desc:'ARM Cortex-M, FreeRTOS basics, peripheral interfacing.'},
//   {icon:'⭐',title:'Academic Excellence Award',org:'[Your College]',year:'2024',c:'#00ff88',desc:'Top academic performance — 9.2 SGPA in 4th semester.'},
//   {icon:'📜',title:'Python for Data Science & ML',org:'IBM · Coursera',year:'2023',c:'#0080ff',desc:'NumPy, Pandas, Matplotlib, ML pipelines for signal data.'},
//   {icon:'🤖',title:'1st Place — Robotics Designathon',org:'Intra-college',year:'2023',c:'#ff6b6b',desc:'PID robot with <2% deviation in dynamic obstacle course.'},
//   {icon:'📜',title:'Digital Signal Processing',org:'NPTEL · IIT Kharagpur',year:'2024',c:'#00f5ff',desc:'Z-transforms, FIR/IIR design, FFT, DSP hardware.'},
//   {icon:'✍️',title:'IEEE Student Symposium Paper',org:'IEEE Student Branch',year:'2024',c:'#7b2fff',desc:'"LoRa Optimisation for Campus IoT" — departmental symposium.'},

  {icon:'📜',title:'CS50 — Introduction to Programming with Python',org:'Harvard University',year:'2024',c:'#00f5ff',desc:'Comprehensive introduction to Python programming.'},
  {icon:'📜',title:'OCI GenAi Professional',org:'Oracle University',year:'2025',c:'#ff6b6b',desc:'GenAi '},
  {icon:'📜',title:'OCI Datascince Professional',org:'Oracle University',year:'2025',c:'#ffaa00',desc:'Data Science '},
];

export default function Achievements(){
  return(
    <section id="achievements" style={{background:'linear-gradient(180deg,#020509,#03101d 60%,#020509)',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',right:'2rem',top:'2rem',opacity:.06,pointerEvents:'none',width:160,height:160}}>
        <svg viewBox="0 0 160 160" style={{width:'100%',height:'100%'}}>
          {[70,48,26].map(r=><circle key={r} cx="80" cy="80" r={r} fill="none" stroke="#00f5ff" strokeWidth=".7"/>)}
          <line x1="80" y1="10" x2="80" y2="150" stroke="#00f5ff" strokeWidth=".5"/>
          <line x1="10" y1="80" x2="150" y2="80" stroke="#00f5ff" strokeWidth=".5"/>
          <line x1="80" y1="80" x2="150" y2="10" stroke="#00ff88" strokeWidth="1.2" style={{transformOrigin:'80px 80px',animation:'radar 4s linear infinite'}}/>
        </svg>
      </div>
      <div className="wrap sec" style={{position:'relative'}}>
        <motion.div {...f()} style={{marginBottom:'2.8rem'}}>
          <div className="sec-label">05 · ACHIEVEMENTS</div>
          <h2 className="sec-h grad-green">Signal Awards</h2>
          <p className="sec-sub">Certifications, recognitions, and milestones in the ECE journey.</p>
        </motion.div>
        <div style={{display:'grid',gap:'1rem'}} className="ach-grid">
          {items.map((a,i)=>(
            <motion.div key={i} {...f(i*.07)} className="glass lift"
              style={{padding:'1.3rem 1.5rem',cursor:'default',position:'relative',overflow:'hidden'}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=a.c+'45';e.currentTarget.style.boxShadow=`0 0 24px ${a.c}14`;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(0,245,255,.13)';e.currentTarget.style.boxShadow='';}}>
              <div style={{position:'absolute',top:0,left:0,right:0,height:1.5,background:`linear-gradient(90deg,transparent,${a.c},transparent)`,opacity:0,transition:'opacity .28s'}} className="ach-bar"/>
              <div style={{display:'flex',gap:'.8rem',alignItems:'flex-start'}}>
                <span style={{fontSize:'1.4rem',flexShrink:0,marginTop:2}}>{a.icon}</span>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:'flex',alignItems:'center',gap:'.5rem',flexWrap:'wrap',marginBottom:'.28rem'}}>
                    <h3 className="font-disp" style={{fontWeight:600,fontSize:'.92rem',color:'#eef5f9',flex:1,lineHeight:1.22}}>{a.title}</h3>
                    <span className="font-mono" style={{fontSize:'.52rem',padding:'1px 6px',borderRadius:3,
                      background:`${a.c}12`,border:`1px solid ${a.c}38`,color:a.c,flexShrink:0}}>{a.year}</span>
                  </div>
                  <div className="font-mono" style={{fontSize:'.58rem',color:a.c,marginBottom:'.35rem',letterSpacing:'.05em'}}>{a.org}</div>
                  <p style={{fontSize:'.8rem',color:'#8fc4d8',lineHeight:1.55}}>{a.desc}</p>
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
