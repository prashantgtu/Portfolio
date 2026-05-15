import { motion } from 'framer-motion';
const vp={once:true,margin:'-70px'};
const f=(d=0)=>({initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:vp,transition:{duration:.7,delay:d,ease:[.22,1,.36,1]}});

const cards=[
  {icon:'✉',label:'EMAIL',val:'kushwaha7757@gmail.com',hint:'Primary · replies <24h',link:'mailto:kushwaha7757@gmail.com',c:'#00f5ff'},
  {icon:'⌥',label:'GITHUB',val:'github.com/prashantgtu',hint:'Code & open-source',link:'https://github.com/prashantgtu',c:'#7b2fff'},
  {icon:'in',label:'LINKEDIN',val:'www.linkedin.com/in/prashantkushwaha-ec',hint:'Professional network',link:'https://www.linkedin.com/in/prashantkushwaha-ec',c:'#0080ff'},
  {icon:'◎',label:'LOCATION',val:'Gujarat, India',hint:'Open to relocation',link:null,c:'#00ff88'},
];

function CCard({c}){
  return(
    <div className="glass lift" style={{padding:'1.2rem 1.4rem',display:'flex',alignItems:'center',gap:'.9rem',cursor:c.link?'pointer':'default'}}
      onMouseEnter={e=>{e.currentTarget.style.borderColor=c.c+'42';e.currentTarget.style.boxShadow=`0 0 24px ${c.c}12`;}}
      onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(0,245,255,.13)';e.currentTarget.style.boxShadow='';}}>
      <div style={{width:42,height:42,borderRadius:9,display:'flex',alignItems:'center',justifyContent:'center',
        flexShrink:0,color:c.c,fontSize:'1rem',fontWeight:700,
        background:`${c.c}10`,border:`1px solid ${c.c}34`}}>{c.icon}</div>
      <div style={{minWidth:0,flex:1}}>
        <div className="font-mono" style={{fontSize:'.52rem',color:'#1f3d52',letterSpacing:'.16em',marginBottom:'.2rem'}}>{c.label}</div>
        <div className="font-disp" style={{fontWeight:600,fontSize:'.9rem',color:'#eef5f9',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{c.val}</div>
        <div style={{fontSize:'.72rem',color:c.c,marginTop:'.15rem'}}>{c.hint}</div>
      </div>
      {c.link&&<span style={{color:c.c,opacity:.55,flexShrink:0}}>→</span>}
    </div>
  );
}

export default function Contact(){
  return(
    <>
      <section id="contact" style={{background:'linear-gradient(180deg,#020509,#040f1c 60%,#010306)',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',left:'2rem',top:'2.5rem',opacity:.06,pointerEvents:'none'}}>
          <svg width="60" height="160" viewBox="0 0 60 160">
            <line x1="30" y1="160" x2="30" y2="50" stroke="#00f5ff" strokeWidth="1.4"/>
            <line x1="30" y1="68" x2="6" y2="32" stroke="#00f5ff" strokeWidth=".9" opacity=".7"/>
            <line x1="30" y1="68" x2="54" y2="32" stroke="#00f5ff" strokeWidth=".9" opacity=".7"/>
            <circle cx="30" cy="50" r="3" fill="#00f5ff" className="p-glow"/>
            {[10,20,30].map(r=><circle key={r} cx="30" cy="45" r={r} fill="none" stroke="#00f5ff" strokeWidth=".4" strokeDasharray="3 6" opacity=".3"/>)}
          </svg>
        </div>
        <div className="wrap sec" style={{maxWidth:820,marginInline:'auto',position:'relative'}}>
          <motion.div {...f()} style={{textAlign:'center',marginBottom:'2.8rem'}}>
            <div className="sec-label" style={{justifyContent:'center'}}>06 · CONTACT</div>
            <h2 className="sec-h grad-cyan" style={{textAlign:'center'}}>Establish Connection</h2>
            <p style={{textAlign:'center',color:'#8fc4d8',fontSize:'.96rem',lineHeight:1.72,maxWidth:'46ch',margin:'.4rem auto 0'}}>
              Open to internships, research collaborations, and engineering conversations. Response within 24 hours.
            </p>
          </motion.div>
          <div style={{display:'grid',gap:'1rem',marginBottom:'1.5rem'}} className="contact-grid">
            {cards.map((c,i)=>(
              <motion.div key={c.label} {...f(.1+i*.09)}>
                {c.link?<a href={c.link} target="_blank" rel="noopener noreferrer" style={{display:'block',textDecoration:'none'}}><CCard c={c}/></a>:<CCard c={c}/>}
              </motion.div>
            ))}
          </div>
          <motion.div {...f(.5)} className="glass" style={{padding:'2.2rem',textAlign:'center'}}>
            <div className="sec-label" style={{justifyContent:'center',marginBottom:'.8rem'}}>RESUME_DOWNLOAD</div>
            <h3 className="font-disp" style={{fontWeight:700,fontSize:'clamp(1.3rem,3vw,1.7rem)',color:'#eef5f9',marginBottom:'.6rem'}}>
              Ready to review my full profile?
            </h3>
            <p style={{fontSize:'.88rem',color:'#8fc4d8',marginBottom:'1.4rem',lineHeight:1.65}}>
              One-page resume · ECE coursework · projects · experience · ATS-optimised.
            </p>
            <button className="btn btn-c" style={{fontSize:'.88rem',padding:'.85rem 2.4rem'}}
              onClick={()=>window.open('https://drive.google.com/file/d/1lN_0OSwsZyHz0C1BstkjI0Lrw8h7KJCk/view?usp=sharing','_blank')}>↓ Download Resume (PDF)</button>
          </motion.div>
        </div>
      </section>
      <footer style={{background:'#010306',borderTop:'1px solid rgba(0,245,255,.06)',padding:'1.8rem clamp(1rem,4vw,2.5rem)'}}>
        <div style={{maxWidth:'var(--max-w)',margin:'0 auto',display:'flex',flexWrap:'wrap',alignItems:'center',justifyContent:'space-between',gap:'.8rem'}}>
          <div>
            <div className="font-disp grad-cyan" style={{fontWeight:700,fontSize:'.92rem'}}>Prashant Kushwaha</div>
            <div className="font-mono" style={{fontSize:'.52rem',color:'#1f3d52',marginTop:2,letterSpacing:'.08em'}}>Electronics & Communication Engineering · Class of 2027</div>
          </div>
          <div className="font-mono" style={{fontSize:'.52rem',color:'#1f3d52',display:'flex',alignItems:'center',gap:'.6rem'}}>
            <span style={{width:16,height:1,background:'rgba(0,245,255,.2)',display:'inline-block'}}/>
            SIGNAL: STRONG · LATENCY: &lt;1ms
            <span style={{width:16,height:1,background:'rgba(0,245,255,.2)',display:'inline-block'}}/>
          </div>
          <div className="font-mono" style={{fontSize:'.52rem',color:'#1f3d52'}}>©{new Date().getFullYear()} · Built with circuits & caffeine ⚡</div>
        </div>
      </footer>
      <style>{`@media(min-width:580px){.contact-grid{grid-template-columns:1fr 1fr}}`}</style>
    </>
  );
}
