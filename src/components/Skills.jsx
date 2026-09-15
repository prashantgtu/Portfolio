import { motion } from 'framer-motion';
import { useTheme } from '../App';

const vp={once:true,margin:'-70px'};
const f=(d=0)=>({initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:vp,transition:{duration:.7,delay:d,ease:[.22,1,.36,1]}});

const cats=[
  {id:'prog', label:'Programming',  icon:'{ }', c:'var(--gold)',   sub:'Languages & scripting',
   skills:[{n:'C / C++',l:90},{n:'Python',l:82},{n:'MATLAB',l:76},{n:'JavaScript',l:65},{n:'Assembly (ARM)',l:55}]},
  {id:'core', label:'Core ECE',     icon:'〰',  c:'var(--amber)',  sub:'Fundamentals',
   skills:[{n:'Digital Electronics',l:88},{n:'Signals & Systems',l:83},{n:'Analog Circuits',l:78},{n:'Comm. Systems',l:80},{n:'Control Systems',l:72}]},
  {id:'hw',   label:'Embedded / HW',icon:'⚡',  c:'var(--sage)',   sub:'Microcontrollers & hardware',
   skills:[{n:'Arduino / AVR',l:86},{n:'STM32 Cortex-M',l:66},{n:'Raspberry Pi',l:73},{n:'MQTT / BLE',l:68},{n:'PCB Design',l:58}]},
  {id:'tools',label:'Tools',        icon:'⚙',  c:'var(--copper)', sub:'Software & workflow',
   skills:[{n:'Git / GitHub',l:82},{n:'Proteus/LTSpice',l:71},{n:'Vivado (FPGA)',l:51},{n:'Linux CLI',l:74},{n:'Keil IDE',l:78}]},
];
const extras=['UART/SPI/I2C','RF Basics','LoRa','Verilog HDL','FIR/IIR Filters','Modulation','GNU Radio','TCP/IP','Op-Amp','React.js','Node.js','Figma'];

function Bar({n,l,c,cDim,delay}){
  return(
    <div style={{marginBottom:'.8rem'}}>
      <div style={{display:'flex',justifyContent:'space-between',marginBottom:'.3rem'}}>
        <span className="font-mono" style={{fontSize:'.68rem',color:'var(--t2)'}}>{n}</span>
        <span className="font-mono" style={{fontSize:'.65rem',color:c}}>{l}%</span>
      </div>
      <div style={{height:4,background:'var(--border)',borderRadius:2,overflow:'hidden'}}>
        <motion.div initial={{width:0}} whileInView={{width:`${l}%`}} viewport={{once:true}}
          transition={{duration:1.1,delay,ease:[.22,1,.36,1]}}
          style={{height:'100%',borderRadius:2,
            background:`linear-gradient(90deg, ${cDim}, ${c})`,
            position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',inset:0,background:'linear-gradient(90deg,transparent 60%,rgba(255,255,255,.2))',animation:'shimmer 2.5s ease-in-out infinite'}}/>
        </motion.div>
      </div>
    </div>
  );
}

export default function Skills(){
  const { theme } = useTheme();
  const sectionBg = theme === 'dark'
    ? 'linear-gradient(180deg, #0a0a0a, #120f08 60%, #0a0a0a)'
    : 'linear-gradient(180deg, #faf6ee, #f0e8d8 60%, #faf6ee)';

  return(
    <section id="skills" style={{background: sectionBg}}>
      <div className="wrap sec">
        <motion.div {...f()} style={{marginBottom:'2.8rem'}}>
          <div className="sec-label">02 · Skills</div>
          <h2 className="sec-h grad-gold">Technical Expertise</h2>
          <p className="sec-sub">Core competencies by ECE domain — from silicon to software.</p>
        </motion.div>

        <div style={{display:'grid',gap:'1.2rem',marginBottom:'1.4rem'}} className="skills-grid">
          {cats.map((c,ci)=>(
            <motion.div key={c.id} {...f(ci*.1)} className="glass lift"
              style={{padding:'1.8rem 2rem',position:'relative',overflow:'hidden',cursor:'default'}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--border-hover)';}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';}}>
              <div style={{display:'flex',alignItems:'center',gap:'.8rem',marginBottom:'1.4rem'}}>
                <div style={{width:40,height:40,borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',
                  fontSize:'1.1rem',background:'var(--accent-glow)',border:'1px solid var(--border)',
                  fontFamily:"'JetBrains Mono',monospace",flexShrink:0,color:c.c}}>{c.icon}</div>
                <div>
                  <div className="font-disp" style={{fontSize:'.9rem',color:'var(--t1)',fontWeight:600}}>{c.label}</div>
                  <div className="font-mono" style={{fontSize:'.6rem',color:'var(--t4)',marginTop:1,letterSpacing:'.06em'}}>{c.sub}</div>
                </div>
              </div>
              {c.skills.map((s,si)=><Bar key={s.n} n={s.n} l={s.l} c={c.c} delay={si*.09+ci*.05}/>)}
              <div style={{position:'absolute',bottom:0,left:0,right:0,height:1,
                background:`linear-gradient(90deg, transparent, ${c.c}60, transparent)`}}/>
            </motion.div>
          ))}
        </div>

        <motion.div {...f(.45)} className="glass" style={{padding:'1.8rem 2.2rem'}}>
          <div className="font-mono" style={{fontSize:'.57rem',color:'var(--t4)',letterSpacing:'.2em',marginBottom:'1rem'}}>ADDITIONAL MODULES · PROTOCOLS · TOOLS</div>
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
