import { useState } from 'react';
import { motion } from 'framer-motion';
const vp={once:true,margin:'-60px'};
const f=(d=0)=>({initial:{opacity:0,y:30},whileInView:{opacity:1,y:0},viewport:vp,transition:{duration:.7,delay:d,ease:[.22,1,.36,1]}});

const projects=[
  {id:'p1',title:'Anti-Theft Alarm System',cat:'EMBEDDED IoT',c:'#ff6b6b',icon:'🚨',status:'COMPLETED',sc:'#00ff88',
   desc:'ESP32-based anti-theft alarm system with motion detection, piezo siren . Real-time SMS alerts on intrusion.',
   tech:['ESP32','Motion Sensor','Telegram Bot','Arduino','IoT'],outcome:'<100ms intrusion detection · Telegram alert to phone'},
  {id:'p2',title:'Surveillance Car using ESP32',cat:'EMBEDDED IoT',c:'#00f5ff',icon:'🚗',status:'COMPLETED',sc:'#00f5ff',
   desc:'Autonomous surveillance car with ESP32 microcontroller, live camera feed over WiFi,  mobile app control.',
   tech:['ESP32','Camera Module','WiFi','Python'],outcome:'Live 720p feed · 50m WiFi range '},
  
  /* {id:'p3',title:'Smart Sensor Fusion Dashboard',cat:'EMBEDDED IoT',c:'#00f5ff',icon:'📡',status:'DEPLOYED',sc:'#00ff88',
   desc:'Real-time environmental monitoring with temperature, humidity, gas sensors over MQTT. React dashboard on Raspberry Pi with custom PCB shield.',
   tech:['STM32','MQTT','React','Node.js','PCB'],outcome:'40% latency reduction vs polling'},
  {id:'p4',title:'FIR Filter — Audio Noise Cancellation',cat:'SIGNAL PROCESSING',c:'#00ff88',icon:'〰️',status:'COMPLETED',sc:'#00f5ff',
   desc:'64-tap FIR low-pass filter in MATLAB. Compared Hamming, Kaiser, Blackman windows. Validated on real speech signals.',
   tech:['MATLAB','DSP','Python','NumPy'],outcome:'18 dB SNR improvement on speech'},
  {id:'p5',title:'LoRa Campus Alert Network',cat:'COMM. SYSTEMS',c:'#7b2fff',icon:'📻',status:'IN PROGRESS',sc:'#ffaa00',
   desc:'Long-range wireless emergency alerts using LoRa. Custom packet protocol with CRC, adaptive spreading factor, mesh topology.',
   tech:['LoRa','Arduino','RF','C++','Protocol'],outcome:'2.5 km · <1% packet loss indoors'},
  {id:'p6',title:'FPGA UART Transceiver',cat:'DIGITAL DESIGN',c:'#ffaa00',icon:'🔧',status:'COMPLETED',sc:'#00f5ff',
   desc:'Configurable UART on Xilinx Artix-7 using Verilog HDL. Hardware flow control, FIFO, 921600 baud, self-test loopback.',
   tech:['Verilog','Vivado','FPGA','Logic'],outcome:'Zero bit errors at max baud on hardware'},
  {id:'p7',title:'PID Line-Following Robot',cat:'EMBEDDED SYSTEMS',c:'#ff6b6b',icon:'🤖',status:'COMPETED',sc:'#7b2fff',
   desc:'PID-controlled robot with IR sensor array on ATmega328P. Custom H-bridge driver, ultrasonic obstacle avoidance.',
   tech:['ATmega328P','PID','C','H-Bridge'],outcome:'2nd place — national robotics fest'},
  {id:'p8',title:'AM/FM Modulation Analyser',cat:'COMMUNICATION',c:'#0080ff',icon:'📊',status:'COMPLETED',sc:'#00f5ff',
   desc:'SDR tool for AM/FM analysis with real-time spectrum display, constellation diagrams, SNR measurement.',
   tech:['Python','GNU Radio','SDR','NumPy'],outcome:'12 modulation schemes with live spectrum'}, */
];

function Card({p,delay}){
  const [hov,setHov]=useState(false);
  return(
    <motion.div {...f(delay)} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{background:'rgba(4,14,26,.85)',backdropFilter:'blur(18px)',
        border:`1px solid ${hov?p.c+'50':'rgba(0,245,255,.12)'}`,
        borderRadius:10,overflow:'hidden',display:'flex',flexDirection:'column',cursor:'default',
        transform:hov?'translateY(-4px)':'none',
        boxShadow:hov?`0 0 36px ${p.c}16,0 20px 45px rgba(0,0,0,.45)`:undefined,
        transition:'all .3s ease'}}>
      <div style={{height:2,background:`linear-gradient(90deg,transparent,${p.c},transparent)`,
        opacity:hov?1:.22,boxShadow:hov?`0 0 10px ${p.c}`:'none',transition:'all .3s'}}/>
      <div style={{padding:'1.4rem 1.6rem',flex:1,display:'flex',flexDirection:'column'}}>
        <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:'.5rem',marginBottom:'.8rem'}}>
          <div style={{display:'flex',gap:'.65rem',alignItems:'flex-start',minWidth:0}}>
            <span style={{fontSize:'1.4rem',flexShrink:0}}>{p.icon}</span>
            <div style={{minWidth:0}}>
              <div className="font-mono" style={{fontSize:'.56rem',color:p.c,letterSpacing:'.12em',marginBottom:'.2rem'}}>{p.cat}</div>
              <h3 className="font-disp" style={{fontWeight:700,fontSize:'.98rem',color:'#eef5f9',lineHeight:1.22}}>{p.title}</h3>
            </div>
          </div>
          <span className="font-mono" style={{flexShrink:0,fontSize:'.5rem',padding:'2px 8px',borderRadius:3,
            background:`${p.sc}12`,border:`1px solid ${p.sc}38`,color:p.sc,letterSpacing:'.07em',whiteSpace:'nowrap'}}>● {p.status}</span>
        </div>
        <p style={{fontSize:'.84rem',lineHeight:1.7,color:'#8fc4d8',marginBottom:'1rem',flex:1}}>{p.desc}</p>
        <div style={{display:'flex',flexWrap:'wrap',gap:'.35rem',marginBottom:'.9rem'}}>
          {p.tech.map(t=>(
            <span key={t} style={{background:`${p.c}0c`,border:`1px solid ${p.c}35`,color:p.c,
              padding:'2px 8px',borderRadius:3,fontSize:'.62rem',fontFamily:"'Share Tech Mono',monospace"}}>{t}</span>
          ))}
        </div>
        <div style={{padding:'.55rem .8rem',borderRadius:5,background:`${p.c}07`,border:`1px solid ${p.c}20`,
          display:'flex',gap:'.4rem',alignItems:'flex-start',marginBottom:'.9rem'}}>
          <span style={{color:p.c,flexShrink:0,marginTop:1}}>→</span>
          <span className="font-mono" style={{fontSize:'.65rem',color:'#8fc4d8',lineHeight:1.5}}>{p.outcome}</span>
        </div>
        <div style={{display:'flex',gap:'1rem',paddingTop:'.8rem',borderTop:'1px solid rgba(0,245,255,.07)'}}>
          {[{l:'Code',icon:'⌥'},{l:'Demo',icon:'⤴'}].map(({l,icon})=>(
            <button key={l} className="btn-g" onClick={()=>window.open('[Your GitHub]','_blank')}
              style={{fontSize:'.74rem'}}>{icon} {l}</button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects(){
  return(
    <section id="projects" style={{background:'linear-gradient(180deg,#020509,#030d18 60%,#020509)'}}>
      <div className="wrap sec">
        <motion.div {...f()} style={{marginBottom:'2.8rem'}}>
          <div className="sec-label">03 · PROJECTS</div>
          <h2 className="sec-h grad-cyan">Engineering Lab</h2>
          <p className="sec-sub">Systems designed, circuits built, firmware flashed — concept to deployment.</p>
        </motion.div>
        <div style={{display:'grid',gap:'1.2rem'}} className="proj-grid">
          {projects.map((p,i)=><Card key={p.id} p={p} delay={i*.08}/>)}
        </div>
        <motion.div {...f(.5)} style={{textAlign:'center',marginTop:'2.2rem'}}>
          <button className="btn btn-v" onClick={()=>window.open('[Your GitHub]','_blank')}>⊕ All Projects on GitHub</button>
        </motion.div>
      </div>
      <style>{`@media(min-width:640px){.proj-grid{grid-template-columns:1fr 1fr}} @media(min-width:1024px){.proj-grid{grid-template-columns:1fr 1fr 1fr}}`}</style>
    </section>
  );
}
