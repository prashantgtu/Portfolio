import { motion } from 'framer-motion';
const vp={once:true,margin:'-70px'};
const f=(d=0)=>({initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:vp,transition:{duration:.7,delay:d,ease:[.22,1,.36,1]}});

const cats=[
  {id:'prog', label:'PROGRAMMING', icon:'{ }', c:'#00f5ff', sub:'Languages',
   skills:[{n:'C / C++',l:90},{n:'Python',l:82},{n:'MATLAB',l:76},{n:'JavaScript',l:65},{n:'Assembly (ARM)',l:55}]},
  {id:'core', label:'CORE ECE',   icon:'〰',  c:'#7b2fff', sub:'Fundamentals',
   skills:[{n:'Digital Electronics',l:88},{n:'Signals & Systems',l:83},{n:'Analog Circuits',l:78},{n:'Comm. Systems',l:80},{n:'Control Systems',l:72}]},
  {id:'hw',   label:'EMBEDDED/HW',icon:'⚡',  c:'#00ff88', sub:'Microcontrollers',
   skills:[{n:'Arduino / AVR',l:86},{n:'STM32 Cortex-M',l:66},{n:'Raspberry Pi',l:73},{n:'MQTT / BLE',l:68},{n:'PCB Design',l:58}]},
  {id:'tools',label:'TOOLS',      icon:'⚙',  c:'#ffaa00', sub:'Software & workflow',
   skills:[{n:'Git / GitHub',l:82},{n:'Proteus/LTSpice',l:71},{n:'Vivado (FPGA)',l:51},{n:'Linux CLI',l:74},{n:'Keil IDE',l:78}]},
];
const extras=['UART/SPI/I2C','RF Basics','LoRa','Verilog HDL','FIR/IIR Filters','Modulation','GNU Radio','TCP/IP','Op-Amp','React.js','Node.js','Figma'];

function Bar({n,l,c,delay}){
  return(
    <div style={{marginBottom:'.75rem'}}>
      <div style={{display:'flex',justifyContent:'space-between',marginBottom:'.28rem'}}>
        <span className="font-mono" style={{fontSize:'.68rem',color:'#8fc4d8'}}>{n}</span>
        <span className="font-mono" style={{fontSize:'.65rem',color:c}}>{l}%</span>
      </div>
      <div style={{height:3,background:'rgba(255,255,255,.05)',borderRadius:2,overflow:'hidden'}}>
        <motion.div initial={{width:0}} whileInView={{width:`${l}%`}} viewport={{once:true}}
          transition={{duration:1.1,delay,ease:[.22,1,.36,1]}}
          style={{height:'100%',borderRadius:2,background:`linear-gradient(90deg,${c}70,${c})`,
            boxShadow:`0 0 6px ${c}55`,position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',inset:0,background:'linear-gradient(90deg,transparent 60%,rgba(255,255,255,.15))',animation:'shimmer 2.5s ease-in-out infinite'}}/>
        </motion.div>
      </div>
    </div>
  );
}

export default function Skills(){
  return(
    <section id="skills" style={{background:'linear-gradient(180deg,#020509,#03111e 60%,#020509)'}}>
      <div className="wrap sec">
        <motion.div {...f()} style={{marginBottom:'2.8rem'}}>
          <div className="sec-label">02 · SKILLS</div>
          <h2 className="sec-h grad-violet">Technical Modules</h2>
          <p className="sec-sub">Core competencies by ECE domain — from silicon to software.</p>
        </motion.div>

        <div style={{display:'grid',gap:'1.2rem',marginBottom:'1.4rem'}} className="skills-grid">
          {cats.map((c,ci)=>(
            <motion.div key={c.id} {...f(ci*.1)} className="glass lift"
              style={{padding:'1.6rem 1.8rem',position:'relative',overflow:'hidden',cursor:'default'}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=c.c+'45';e.currentTarget.style.boxShadow=`0 0 30px ${c.c}14`;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(0,245,255,.13)';e.currentTarget.style.boxShadow='';} }>
              <div style={{display:'flex',alignItems:'center',gap:'.8rem',marginBottom:'1.3rem'}}>
                <div style={{width:38,height:38,borderRadius:7,display:'flex',alignItems:'center',justifyContent:'center',
                  fontSize:'1rem',background:`${c.c}10`,border:`1px solid ${c.c}38`,color:c.c,
                  fontFamily:"'Share Tech Mono',monospace",flexShrink:0}}>{c.icon}</div>
                <div>
                  <div className="font-mono" style={{fontSize:'.6rem',color:c.c,letterSpacing:'.13em',fontWeight:700}}>{c.label}</div>
                  <div style={{fontSize:'.68rem',color:'#1f3d52',marginTop:1}}>{c.sub}</div>
                </div>
              </div>
              {c.skills.map((s,si)=><Bar key={s.n} n={s.n} l={s.l} c={c.c} delay={si*.09+ci*.05}/>)}
              <div style={{position:'absolute',bottom:0,left:0,right:0,height:1,
                background:`linear-gradient(90deg,transparent,${c.c}55,transparent)`}}/>
            </motion.div>
          ))}
        </div>

        <motion.div {...f(.45)} className="glass" style={{padding:'1.6rem 2rem'}}>
          <div className="font-mono" style={{fontSize:'.57rem',color:'#1f3d52',letterSpacing:'.2em',marginBottom:'1rem'}}>ADDITIONAL_MODULES · PROTOCOLS · TOOLS</div>
          <div style={{display:'flex',flexWrap:'wrap',gap:'.45rem'}}>
            {extras.map((s,i)=>(
              <motion.span key={s} className="chip" initial={{opacity:0,scale:.85}} whileInView={{opacity:1,scale:1}}
                viewport={{once:true}} transition={{delay:.5+i*.04}}>{s}</motion.span>
            ))}
          </div>
        </motion.div>
      </div>
      <style>{`@media(min-width:640px){.skills-grid{grid-template-columns:1fr 1fr}}`}</style>
    </section>
  );
}
