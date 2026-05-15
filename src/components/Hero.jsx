import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import CircuitBackground from './CircuitBackground';
import ChipCanvas from './ChipCanvas';
import ECESimPanel from './ECESimPanel';

const ROLES = [
  'Electronics & Communication Engineer',
  'Embedded Systems Developer',
  'Signal Processing Explorer',
  'Hardware-Software Integrator',
  'IoT & RF Systems Developer',
];

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const isMobile = window.innerWidth < 768;

  // Typewriter
  useEffect(() => {
    const role = ROLES[roleIdx];
    let timeout;
    if (!deleting && displayed.length < role.length)
      timeout = setTimeout(() => setDisplayed(role.slice(0, displayed.length+1)), 58);
    else if (!deleting && displayed.length === role.length)
      timeout = setTimeout(() => setDeleting(true), 2400);
    else if (deleting && displayed.length > 0)
      timeout = setTimeout(() => setDisplayed(displayed.slice(0,-1)), 30);
    else { setDeleting(false); setRoleIdx(i=>(i+1)%ROLES.length); }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIdx]);

  // Mouse parallax
  const onMouseMove = (e) => {
    const r = heroRef.current?.getBoundingClientRect();
    if (!r) return;
    setMousePos({ x:((e.clientX-r.left)/r.width-0.5)*2, y:((e.clientY-r.top)/r.height-0.5)*2 });
  };

  const stats = [
    { val:'3+', label:'PROJECTS' },
    { val:'15+', label:'SKILLS' },
    { val:'6+',  label:'CERTS' },
    // { val:'3',   label:'AWARDS' },
  ];

  return (
    <section id="hero" ref={heroRef} onMouseMove={onMouseMove}
      style={{ position:'relative', minHeight:'100svh', display:'flex', alignItems:'center',
        overflow:'hidden', background:'linear-gradient(145deg,#010306 0%,#031323 55%,#010509 100%)' }}>

      <CircuitBackground />

      {/* Scanline */}
      <div style={{ position:'absolute',left:0,right:0,height:1,pointerEvents:'none',zIndex:2,
        background:'linear-gradient(90deg,transparent,rgba(0,245,255,0.3),transparent)',
        animation:'scanline 8s linear infinite' }}/>

      {/* Radial bloom */}
      <div style={{ position:'absolute',inset:0,pointerEvents:'none',zIndex:1,
        background:'radial-gradient(ellipse 90% 70% at 60% 50%,rgba(0,80,160,0.06),transparent 70%)' }}/>

      {/* Floating ECE labels (decorative, hidden mobile) */}
      {[
        {txt:'VCC',  pos:{top:'12%',left:'4%'},  c:'#ffaa00'},
        {txt:'GND',  pos:{top:'75%',left:'3%'},  c:'#00ff88'},
        {txt:'CLK',  pos:{top:'20%',right:'3%'}, c:'#00f5ff'},
        {txt:'DATA', pos:{bottom:'18%',right:'4%'},c:'#7b2fff'},
      ].map(({txt,pos,c})=>(
        <div key={txt} className="font-mono hide-mobile p-glow"
          style={{ position:'absolute',...pos, fontSize:'0.58rem', color:c, zIndex:3,
            padding:'2px 8px', border:`1px solid ${c}40`, borderRadius:3,
            background:`${c}0d`, letterSpacing:'0.12em', pointerEvents:'none' }}>
          {txt}
        </div>
      ))}

      {/* Main content */}
      <div className="wrap sec" style={{ position:'relative', zIndex:10, width:'100%',
        paddingTop:'calc(var(--sp) + 68px)' }}>

        {/* ── DESKTOP LAYOUT: 3-column ── */}
        <div style={{ display:'grid', gap:'1.8rem', alignItems:'start' }} className="hero-grid">

          {/* LEFT COL: text */}
          <motion.div initial={{opacity:0,x:-40}} animate={{opacity:1,x:0}}
            transition={{duration:0.9,ease:[0.22,1,0.36,1]}}>

            {/* Badge */}
            <motion.div initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{delay:0.2}}
              className="status-on" style={{ marginBottom:'1.4rem', display:'inline-flex' }}>
              <span className="pulse-dot"/>
              SYSTEM ONLINE — SEEKING INTERNSHIP
            </motion.div>

            {/* Name */}
            <motion.h1 initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.35}}
              className="font-disp grad-cyan"
              style={{ fontSize:'clamp(2.4rem,5.5vw,4.4rem)', fontWeight:700, lineHeight:1.02,
                letterSpacing:'-0.015em', marginBottom:'0.75rem' }}>
              Prashant Kushwaha
            </motion.h1>

            {/* Typewriter */}
            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.5}}
              style={{ height:'2.2rem', display:'flex', alignItems:'center', marginBottom:'1.1rem' }}>
              <span className="font-disp" style={{ fontSize:'clamp(1rem,2vw,1.25rem)',
                fontWeight:500, color:'#8fc4d8', letterSpacing:'0.01em' }}>{displayed}</span>
              <span className="blink font-mono" style={{ color:'#00f5ff', fontSize:'1.2rem', marginLeft:3 }}>|</span>
            </motion.div>

            {/* Bio */}
            <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.6}}
              style={{ fontSize:'clamp(0.88rem,1.5vw,1rem)', color:'#8fc4d8', lineHeight:1.75,
                maxWidth:'46ch', marginBottom:'1.6rem' }}>
              Building at the intersection of circuits and code. Passionate about embedded systems,
              signal processing, and wireless communication.{' '}
              <span style={{ color:'#00f5ff', fontWeight:500 }}>Class of 2027 · GEC Surat </span>
            </motion.p>

            {/* Stats */}
            <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.7}}
              style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'0.6rem',
                marginBottom:'1.6rem', paddingBottom:'1.4rem',
                borderBottom:'1px solid rgba(0,245,255,0.08)' }}>
              {stats.map(({val,label}) => (
                <div key={label} style={{ textAlign:'center' }}>
                  <div className="font-disp grad-cyan" style={{ fontSize:'1.6rem', fontWeight:700, lineHeight:1 }}>{val}</div>
                  <div className="font-mono" style={{ fontSize:'0.52rem', color:'#1f3d52',
                    letterSpacing:'0.12em', textTransform:'uppercase', marginTop:3 }}>{label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:0.8}}
              style={{ display:'flex', flexWrap:'wrap', gap:'0.7rem', marginBottom:'1.4rem' }}>
              <button className="btn btn-c"
                onClick={()=>document.getElementById('projects')?.scrollIntoView({behavior:'smooth'})}>
                ▷ View Projects
              </button>
              <button className="btn btn-v"
                onClick={()=>document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})}>
                ◈ Contact Me
              </button>
            </motion.div>

            {/* Tech chips */}
            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1}}
              style={{ display:'flex', flexWrap:'wrap', gap:'0.4rem' }}>
              {['C/C++','Python','MATLAB','Arduino','STM32','LoRa','FPGA','Linux'].map(s=>(
                <span key={s} className="chip">{s}</span>
              ))}
            </motion.div>
          </motion.div>

          {/* CENTER COL: 3D Chip (hidden on mobile, shown on md+) */}
          <motion.div initial={{opacity:0,scale:0.84}} animate={{opacity:1,scale:1}}
            transition={{duration:1.2,ease:[0.22,1,0.36,1],delay:0.15}}
            className="hide-mobile"
            style={{ display:'flex', alignItems:'center', justifyContent:'center',
              position:'relative', minHeight:'420px' }}>

            {/* Outer rings */}
            {[380,290,200].map((s,i)=>(
              <div key={s} style={{ position:'absolute', width:s, height:s, borderRadius:'50%',
                border:`1px ${i===0?'dashed':'solid'} rgba(${i===1?'123,47,255':'0,245,255'},${0.1+i*0.04})`,
                animation:`${i%2===0?'spin-s':'spin-r'} ${26+i*5}s linear infinite` }}/>
            ))}

            {/* Radar sweep */}
            <div style={{ position:'absolute',width:260,height:260,borderRadius:'50%',overflow:'hidden',opacity:0.09 }}>
              <div style={{ position:'absolute',top:'50%',left:'50%',width:130,height:2,
                background:'linear-gradient(90deg,rgba(0,245,255,0.9),transparent)',
                transformOrigin:'0 50%', animation:'radar 5s linear infinite' }}/>
            </div>

            {/* HUD frame */}
            <div style={{ position:'relative' }}>
              {/* Corner brackets */}
              {[{t:-7,l:-7,bt:1,bl:1},{t:-7,r:-7,bt:1,br:1},{b:-7,l:-7,bb:1,bl:1},{b:-7,r:-7,bb:1,br:1}]
                .map((pos,i)=>(
                <div key={i} style={{ position:'absolute', width:18, height:18,
                  ...(pos.t!==undefined?{top:pos.t}:{bottom:pos.b}),
                  ...(pos.l!==undefined?{left:pos.l}:{right:pos.r}),
                  ...(pos.bt?{borderTop:'1.5px solid #00f5ff'}:{}),
                  ...(pos.bb?{borderBottom:'1.5px solid #00f5ff'}:{}),
                  ...(pos.bl?{borderLeft:'1.5px solid #00f5ff'}:{}),
                  ...(pos.br?{borderRight:'1.5px solid #00f5ff'}:{}),
                  zIndex:20 }}/>
              ))}

              <div className="font-mono" style={{ position:'absolute',top:-22,left:0,
                fontSize:'0.55rem',color:'rgba(0,245,255,0.4)',letterSpacing:'0.1em' }}>SoC_CORE_v2.4</div>
              <div className="font-mono" style={{ position:'absolute',bottom:-20,right:0,
                fontSize:'0.55rem',color:'rgba(0,245,255,0.4)',letterSpacing:'0.1em' }}>32nm · 1.2GHz</div>

              {/* Signal pads on sides */}
              {[15,35,55,75].map((pct,i)=>(
                <div key={i} style={{ position:'absolute',
                  left:i%2===0?-10:undefined, right:i%2!==0?-10:undefined,
                  top:`${pct}%`, width:5, height:5, borderRadius:'50%',
                  background:['#00f5ff','#00ff88','#7b2fff','#ffaa00'][i],
                  boxShadow:`0 0 6px ${ ['#00f5ff','#00ff88','#7b2fff','#ffaa00'][i]}`,
                  animation:`pulse-glow ${1.5+i*0.4}s ease-in-out infinite`,
                  animationDelay:`${i*0.3}s`, zIndex:15 }}/>
              ))}

              <div style={{ width:300,height:300,borderRadius:12,overflow:'hidden',
                boxShadow:'0 0 50px rgba(0,100,200,0.22),0 0 100px rgba(0,245,255,0.06),0 30px 60px rgba(0,0,0,0.55)' }}>
                <ChipCanvas mousePos={mousePos}/>
              </div>
            </div>

            {/* Floating readout labels */}
            {[
              {txt:'2.4 GHz', top:'8%',  right:'2%', c:'#00f5ff'},
              {txt:'3.3V',    bot:'16%',  left:'1%',  c:'#00ff88'},
              {txt:'72 MHz',  top:'50%',  right:'1%', c:'#7b2fff'},
            ].map(({txt,top,bot,left,right,c})=>(
              <div key={txt} className="font-mono p-glow"
                style={{ position:'absolute', top, bottom:bot, left, right,
                  fontSize:'0.52rem', color:c, padding:'2px 7px',
                  border:`1px solid ${c}40`, background:`${c}0b`, borderRadius:3, zIndex:20 }}>{txt}</div>
            ))}
          </motion.div>

          {/* RIGHT COL: ECE Sim Panel — desktop only */}
          <motion.div initial={{opacity:0,x:40}} animate={{opacity:1,x:0}}
            transition={{duration:0.9,ease:[0.22,1,0.36,1],delay:0.45}}
            className="hide-mobile" style={{ minWidth:0 }}>
            <ECESimPanel/>
          </motion.div>
        </div>

        {/* Mobile-only: show ECE sim panel after text */}
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:1.1}}
          className="show-mobile-only" style={{ marginTop:'1.5rem' }}>
          <ECESimPanel/>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:2.5}}
        style={{ position:'absolute',bottom:'1.5rem',left:'50%',transform:'translateX(-50%)',
          display:'flex',flexDirection:'column',alignItems:'center',gap:'0.4rem',zIndex:10 }}>
        <span className="font-mono" style={{ fontSize:'0.52rem',color:'#1f3d52',letterSpacing:'0.3em' }}>SCROLL</span>
        <div style={{ width:1,height:32,background:'linear-gradient(to bottom,#00f5ff,transparent)',
          animation:'pulse-glow 2s ease-in-out infinite' }}/>
      </motion.div>

      <style>{`
        .hero-grid{grid-template-columns:1fr}
        .show-mobile-only{display:block}
        @media(min-width:768px){
          .hero-grid{grid-template-columns:1fr 1fr}
          .show-mobile-only{display:none}
        }
        @media(min-width:1100px){
          .hero-grid{grid-template-columns:1fr 0.85fr 0.9fr}
          .show-mobile-only{display:none}
        }
      `}</style>
    </section>
  );
}
