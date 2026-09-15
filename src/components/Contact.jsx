import { motion } from 'framer-motion';
import { useTheme } from '../App';

const vp={once:true,margin:'-70px'};
const f=(d=0)=>({initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:vp,transition:{duration:.7,delay:d,ease:[.22,1,.36,1]}});

const cards=[
  {icon:'✉',label:'Email',val:'kushwaha7757@gmail.com',hint:'Primary · replies <24h',link:'mailto:kushwaha7757@gmail.com',c:'var(--gold)'},
  {icon:'⌥',label:'GitHub',val:'github.com/prashantgtu',hint:'Code & open-source',link:'https://github.com/prashantgtu',c:'var(--amber)'},
  {icon:'in',label:'LinkedIn',val:'linkedin.com/in/prashantkushwaha-ec',hint:'Professional network',link:'https://www.linkedin.com/in/prashantkushwaha-ec',c:'var(--copper)'},
  {icon:'◎',label:'Location',val:'Gujarat, India',hint:'Open to relocation',link:null,c:'var(--sage)'},
];

function CCard({c}){
  return(
    <div className="glass lift" style={{padding:'1.3rem 1.6rem',display:'flex',alignItems:'center',gap:'1rem',cursor:c.link?'pointer':'default'}}
      onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--border-hover)';}}
      onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';}}>
      <div style={{width:44,height:44,borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',
        flexShrink:0,color:c.c,fontSize:c.icon.length>1?'0.82rem':'1.1rem',fontWeight:700,
        background:'var(--accent-glow)',border:'1px solid var(--border)'}}>{c.icon}</div>
      <div style={{minWidth:0,flex:1}}>
        <div className="font-mono" style={{fontSize:'.52rem',color:'var(--t4)',letterSpacing:'.16em',marginBottom:'.2rem',textTransform:'uppercase'}}>{c.label}</div>
        <div className="font-disp" style={{fontWeight:600,fontSize:'.92rem',color:'var(--t1)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{c.val}</div>
        <div style={{fontSize:'.72rem',color:c.c,marginTop:'.15rem',opacity:0.9}}>{c.hint}</div>
      </div>
      {c.link&&<span style={{color:'var(--gold)',opacity:.6,flexShrink:0,fontSize:'1.1rem'}}>→</span>}
    </div>
  );
}

export default function Contact(){
  const { theme } = useTheme();
  const sectionBg = theme === 'dark'
    ? 'linear-gradient(180deg, #0a0a0a, #0f0d08 60%, #0a0a0a)'
    : 'linear-gradient(180deg, #faf6ee, #f0e8d8 60%, #faf6ee)';

  const footerBg = theme === 'dark' ? '#080808' : '#f5edd8';

  return(
    <>
      <section id="contact" style={{background: sectionBg, position:'relative', overflow:'hidden'}}>
        {/* Decorative element */}
        <div style={{position:'absolute',left:'2rem',top:'2.5rem',opacity:.07,pointerEvents:'none'}}>
          <svg width="60" height="160" viewBox="0 0 60 160">
            <line x1="30" y1="160" x2="30" y2="50" stroke="var(--gold)" strokeWidth="1.4"/>
            <line x1="30" y1="68" x2="6" y2="32" stroke="var(--gold)" strokeWidth=".9" opacity=".7"/>
            <line x1="30" y1="68" x2="54" y2="32" stroke="var(--gold)" strokeWidth=".9" opacity=".7"/>
            <circle cx="30" cy="50" r="3" fill="var(--gold)" className="p-glow"/>
            {[10,20,30].map(r=><circle key={r} cx="30" cy="45" r={r} fill="none" stroke="var(--gold)" strokeWidth=".4" strokeDasharray="3 6" opacity=".3"/>)}
          </svg>
        </div>

        <div className="wrap sec" style={{maxWidth:820,marginInline:'auto',position:'relative'}}>
          <motion.div {...f()} style={{textAlign:'center',marginBottom:'2.8rem'}}>
            <div className="sec-label" style={{justifyContent:'center'}}>06 · Contact</div>
            <h2 className="sec-h grad-gold" style={{textAlign:'center'}}>Let's Connect</h2>
            <p style={{textAlign:'center',color:'var(--t2)',fontSize:'.98rem',lineHeight:1.75,maxWidth:'46ch',margin:'.4rem auto 0'}}>
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

          <motion.div {...f(.5)} className="glass" style={{padding:'2.4rem',textAlign:'center'}}>
            <div className="sec-label" style={{justifyContent:'center',marginBottom:'.8rem'}}>Resume</div>
            <h3 className="font-disp" style={{fontWeight:700,fontSize:'clamp(1.3rem,3vw,1.7rem)',color:'var(--t1)',marginBottom:'.6rem'}}>
              Ready to review my full profile?
            </h3>
            <p style={{fontSize:'.9rem',color:'var(--t2)',marginBottom:'1.6rem',lineHeight:1.7}}>
              One-page resume · ECE coursework · projects · experience · ATS-optimised.
            </p>
            <button className="btn btn-c" style={{fontSize:'.88rem',padding:'.9rem 2.6rem'}}
              onClick={()=>window.open('https://drive.google.com/file/d/1hwMGWyN-soHLZIoj4Uedsd3zG_KvYSHz/view?usp=sharing','_blank')}>↓ Download Resume (PDF)</button>
          </motion.div>
        </div>
      </section>

      <footer style={{background: footerBg, borderTop:'1px solid var(--border)', padding:'2rem clamp(1rem,4vw,2.5rem)'}}>
        <div style={{maxWidth:'var(--max-w)',margin:'0 auto',display:'flex',flexWrap:'wrap',alignItems:'center',justifyContent:'space-between',gap:'.8rem'}}>
          <div>
            <div className="font-disp grad-gold" style={{fontWeight:700,fontSize:'.95rem'}}>Prashant Kushwaha</div>
            <div className="font-mono" style={{fontSize:'.52rem',color:'var(--t4)',marginTop:2,letterSpacing:'.08em'}}>Electronics & Communication Engineering · Class of 2027</div>
          </div>
          <div className="font-mono" style={{fontSize:'.52rem',color:'var(--t4)',display:'flex',alignItems:'center',gap:'.6rem'}}>
            <span style={{width:16,height:1,background:'var(--border)',display:'inline-block'}}/>
            Crafted with care & curiosity ✦
            <span style={{width:16,height:1,background:'var(--border)',display:'inline-block'}}/>
          </div>
          <div className="font-mono" style={{fontSize:'.52rem',color:'var(--t4)'}}>©{new Date().getFullYear()} · Built with circuits & caffeine ⚡</div>
        </div>
      </footer>
      <style>{`@media(min-width:580px){.contact-grid{grid-template-columns:1fr 1fr}}`}</style>
    </>
  );
}
