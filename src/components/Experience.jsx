import { motion } from 'framer-motion';
const vp={once:true,margin:'-70px'};
const f=(d=0)=>({initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:vp,transition:{duration:.72,delay:d,ease:[.22,1,.36,1]}});

const exps=[
  {type:'INTERNSHIP',role:'HR',company:'Marpu Foundation',loc:'Remote',
   period:'June – Jul 2025',c:'#00f5ff',
   desc:'Google Forms and Sheets-based HR management system  at a non-profit.',
   pts:['Google Forms and Sheets-based HR management system','Hiring processes','various HR workflows']},
  // {type:'RESEARCH',role:'Undergraduate Research Assistant',company:'[College] — Signal Processing Lab',
  //  loc:'On Campus',period:'Jan 2024 – Present',c:'#7b2fff',
  //  desc:'Adaptive filter research for noise cancellation in biomedical signal acquisition with Prof. [Name].',
  //  pts:['LMS and RLS filters implemented in MATLAB','Benchmarked on ECG / EEG clinical datasets','Co-authored poster for departmental symposium']},
  // {type:'LEADERSHIP',role:'Technical Lead — ECE Society',company:'[College] ECE Student Society',
  //  loc:'On Campus',period:'Aug 2023 – Present',c:'#00ff88',
  //  desc:'Leading 8-member team for workshops, project exhibitions, and competitions.',
  //  pts:['Arduino & MATLAB workshops for 120+ students','Team 2nd place at national hardware hackathon','End-to-end project exhibition at annual tech fest']},
];

export default function Experience(){
  return(
    <section id="experience" style={{background:'linear-gradient(180deg,#020509,#040f1c 60%,#020509)'}}>
      <div className="wrap sec" style={{maxWidth:880,marginInline:'auto'}}>
        <motion.div {...f()} style={{marginBottom:'2.8rem'}}>
          <div className="sec-label">04 · EXPERIENCE</div>
          <h2 className="sec-h grad-cyan">Signal Timeline</h2>
          <p className="sec-sub">Professional milestones — internships, research, leadership.</p>
        </motion.div>
        <div style={{position:'relative'}}>
          <div style={{position:'absolute',left:'clamp(14px,3.5vw,20px)',top:10,bottom:10,width:1,
            background:'linear-gradient(to bottom,#00f5ff40,#7b2fff40,#00ff8840)'}}/>
          <div style={{display:'flex',flexDirection:'column',gap:'1.6rem'}}>
            {exps.map((e,i)=>(
              <motion.div key={i} {...f(i*.14)} style={{display:'flex',gap:'clamp(1.2rem,3.5vw,2rem)',alignItems:'flex-start'}}>
                <div style={{flexShrink:0,width:'clamp(28px,7vw,40px)',display:'flex',justifyContent:'center'}}>
                  <div style={{width:13,height:13,borderRadius:'50%',marginTop:24,background:e.c,
                    boxShadow:`0 0 12px ${e.c},0 0 24px ${e.c}55`,border:`2px solid ${e.c}`,position:'relative',zIndex:2}}>
                    <div style={{position:'absolute',inset:-5,borderRadius:'50%',border:`1px solid ${e.c}`,
                      animation:'ping-glow 2.2s ease-out infinite',animationDelay:`${i*.5}s`}}/>
                  </div>
                </div>
                <div style={{flex:1}}>
                  <div className="glass" style={{padding:'1.5rem 1.7rem',cursor:'default'}}
                    onMouseEnter={el=>{el.currentTarget.style.borderColor=e.c+'42';el.currentTarget.style.boxShadow=`0 0 25px ${e.c}10`;}}
                    onMouseLeave={el=>{el.currentTarget.style.borderColor='rgba(0,245,255,.13)';el.currentTarget.style.boxShadow='';}}>
                    <div style={{display:'flex',flexWrap:'wrap',alignItems:'center',justifyContent:'space-between',gap:'.4rem',marginBottom:'.8rem'}}>
                      <span className="font-mono" style={{fontSize:'.56rem',padding:'2px 9px',borderRadius:3,
                        background:`${e.c}14`,border:`1px solid ${e.c}40`,color:e.c,letterSpacing:'.1em'}}>{e.type}</span>
                      <span className="font-mono" style={{fontSize:'.58rem',color:'#1f3d52'}}>{e.period}</span>
                    </div>
                    <h3 className="font-disp" style={{fontWeight:700,fontSize:'1.1rem',color:'#eef5f9',marginBottom:'.25rem'}}>{e.role}</h3>
                    <div style={{display:'flex',gap:'.4rem',alignItems:'center',marginBottom:'.8rem',flexWrap:'wrap'}}>
                      <span style={{fontSize:'.84rem',color:e.c,fontWeight:500}}>{e.company}</span>
                      <span style={{color:'#1f3d52'}}>·</span>
                      <span style={{fontSize:'.76rem',color:'#1f3d52'}}>{e.loc}</span>
                    </div>
                    <p style={{fontSize:'.86rem',lineHeight:1.7,color:'#8fc4d8',marginBottom:'.9rem'}}>{e.desc}</p>
                    <ul style={{display:'flex',flexDirection:'column',gap:'.45rem'}}>
                      {e.pts.map((pt,pi)=>(
                        <li key={pi} style={{display:'flex',gap:'.5rem',alignItems:'flex-start',fontSize:'.84rem',color:'#8fc4d8'}}>
                          <span style={{width:5,height:5,borderRadius:'50%',background:e.c,marginTop:'.45rem',
                            flexShrink:0,boxShadow:`0 0 5px ${e.c}`}}/>
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
