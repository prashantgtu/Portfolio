import { useEffect, useRef, useState } from 'react';

// ── Mini Oscilloscope ──
function OscPanel() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d');
    let t = 0, raf;
    const draw = () => {
      const W = c.width = c.offsetWidth;
      const H = c.height = c.offsetHeight;
      ctx.clearRect(0, 0, W, H);
      // Grid
      ctx.strokeStyle = 'rgba(0,245,255,0.06)'; ctx.lineWidth = 0.5;
      for (let x = 0; x < W; x += W/8)  { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
      for (let y = 0; y < H; y += H/4)  { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }
      // CH1 - sine
      ctx.beginPath();
      for (let x = 0; x <= W; x++) {
        const y = H/2 + Math.sin((x/W)*Math.PI*8 + t)*H*0.3 + Math.sin((x/W)*Math.PI*18+t*0.7)*H*0.06;
        x===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
      }
      ctx.strokeStyle = '#00f5ff'; ctx.lineWidth = 1.3;
      ctx.shadowColor = '#00f5ff'; ctx.shadowBlur = 4; ctx.stroke(); ctx.shadowBlur = 0;
      // CH2 - sawtooth
      ctx.beginPath();
      for (let x = 0; x <= W; x++) {
        const phase = ((x/W * 4 + t/Math.PI*0.8) % 1);
        const y = H*0.82 - phase * H*0.22;
        x===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
      }
      ctx.strokeStyle = '#00ff88'; ctx.lineWidth = 1; ctx.stroke();
      t += 0.045;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div style={{ background:'rgba(0,0,0,0.5)', border:'1px solid rgba(0,245,255,0.16)', borderRadius:8, padding:'10px 12px', flex:1 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6 }}>
        <span className="font-mono" style={{ fontSize:'0.55rem', color:'rgba(0,245,255,0.5)', letterSpacing:'0.12em' }}>OSCILLOSCOPE</span>
        <div style={{ display:'flex', gap:8 }}>
          <span className="font-mono" style={{ fontSize:'0.5rem', color:'#00f5ff' }}>CH1</span>
          <span className="font-mono" style={{ fontSize:'0.5rem', color:'#00ff88' }}>CH2</span>
        </div>
      </div>
      <canvas ref={ref} style={{ width:'100%', height:70, display:'block' }} />
      <div style={{ display:'flex', justifyContent:'space-between', marginTop:5 }}>
        {['1kHz','10ms/div','2V/div'].map(v=>(
          <span key={v} className="font-mono" style={{ fontSize:'0.48rem', color:'#1f3d52' }}>{v}</span>
        ))}
      </div>
    </div>
  );
}

// ── Logic Gate Pulses ──
function LogicPanel() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d');
    let t = 0, raf;
    const draw = () => {
      const W = c.width = c.offsetWidth;
      const H = c.height = c.offsetHeight;
      ctx.clearRect(0, 0, W, H);
      const channels = [
        { label:'A', color:'#00f5ff', period:0.25, phase:0    },
        { label:'B', color:'#7b2fff', period:0.15, phase:0.08 },
        { label:'Q', color:'#00ff88', period:0.25, phase:0,   isAND:true },
      ];
      const rowH = H / channels.length;
      channels.forEach((ch, i) => {
        const y0 = i * rowH + rowH*0.2;
        const yH = rowH * 0.55;
        ctx.font = '6px Share Tech Mono';
        ctx.fillStyle = ch.color;
        ctx.fillText(ch.label, 4, y0 + yH/2 + 2);
        ctx.beginPath();
        let px = 16;
        for (let x = 16; x <= W; x++) {
          let hi;
          if (ch.isAND) {
            const aHi = Math.sin(((x-16)/(W-16)/channels[0].period)*Math.PI*2 + t) > 0;
            const bHi = Math.sin(((x-16)/(W-16)/channels[1].period)*Math.PI*2 + t + channels[1].phase*Math.PI*2) > 0;
            hi = aHi && bHi;
          } else {
            hi = Math.sin(((x-16)/(W-16)/ch.period)*Math.PI*2 + t + ch.phase*Math.PI*2) > 0;
          }
          const y = y0 + (hi ? 0 : yH);
          if (x === px) ctx.moveTo(x, y);
          else { if (Math.abs(y - (y0+(Math.sin((((x-1)-16)/(W-16)/ch.period)*Math.PI*2+t)>0?0:yH))) > 1) ctx.lineTo(x-1, y); ctx.lineTo(x,y); }
        }
        ctx.strokeStyle = ch.color; ctx.lineWidth = 1.2;
        ctx.shadowColor = ch.color; ctx.shadowBlur = 3; ctx.stroke(); ctx.shadowBlur = 0;
      });
      t += 0.04;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div style={{ background:'rgba(0,0,0,0.5)', border:'1px solid rgba(123,47,255,0.2)', borderRadius:8, padding:'10px 12px', flex:1 }}>
      <div style={{ marginBottom:6 }}>
        <span className="font-mono" style={{ fontSize:'0.55rem', color:'rgba(123,47,255,0.6)', letterSpacing:'0.12em' }}>LOGIC ANALYZER · AND_GATE</span>
      </div>
      <canvas ref={ref} style={{ width:'100%', height:70, display:'block' }} />
      <div className="font-mono" style={{ fontSize:'0.48rem', color:'#1f3d52', marginTop:5 }}>A·B=Q · 100ns/div</div>
    </div>
  );
}

// ── Frequency Spectrum ──
function SpectrumPanel() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d');
    let t = 0, raf;
    const BARS = 32;
    const baseHeights = Array.from({length:BARS},(_,i)=>{
      const f = i/BARS;
      return Math.exp(-Math.pow(f-0.15,2)*30)*0.9 + Math.exp(-Math.pow(f-0.42,2)*60)*0.5 + Math.exp(-Math.pow(f-0.7,2)*80)*0.3;
    });
    const draw = () => {
      const W = c.width = c.offsetWidth;
      const H = c.height = c.offsetHeight;
      ctx.clearRect(0,0,W,H);
      // Grid lines
      ctx.strokeStyle='rgba(0,245,255,0.05)'; ctx.lineWidth=0.5;
      [0.25,0.5,0.75].forEach(f=>{ const y=H*f; ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke(); });
      const bw = W/BARS;
      baseHeights.forEach((bh,i)=>{
        const noise = Math.sin(t*2.1+i*0.7)*0.08 + Math.sin(t*3.3+i*1.4)*0.04;
        const h = Math.max(0.02, bh + noise) * H * 0.88;
        const x = i*bw + bw*0.1;
        const hue = 180 + (i/BARS)*60;
        const alpha = 0.6 + bh*0.4;
        // Bar
        const gr = ctx.createLinearGradient(0,H-h,0,H);
        gr.addColorStop(0,'rgba(0,245,255,'+alpha+')');
        gr.addColorStop(1,'rgba(0,128,255,0.1)');
        ctx.fillStyle=gr;
        ctx.fillRect(x, H-h, bw*0.7, h);
        // Peak dot
        ctx.beginPath(); ctx.arc(x+bw*0.35, H-h-2, 1.5, 0, Math.PI*2);
        ctx.fillStyle='rgba(0,245,255,0.9)'; ctx.fill();
      });
      t += 0.03;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div style={{ background:'rgba(0,0,0,0.5)', border:'1px solid rgba(0,128,255,0.18)', borderRadius:8, padding:'10px 12px', flex:1 }}>
      <div style={{ marginBottom:6 }}>
        <span className="font-mono" style={{ fontSize:'0.55rem', color:'rgba(0,128,255,0.55)', letterSpacing:'0.12em' }}>SPECTRUM ANALYZER · FFT</span>
      </div>
      <canvas ref={ref} style={{ width:'100%', height:70, display:'block' }} />
      <div className="font-mono" style={{ fontSize:'0.48rem', color:'#1f3d52', marginTop:5 }}>0 Hz — 20 kHz · Hanning window</div>
    </div>
  );
}

// ── Live readouts ──
function LiveReadouts() {
  const [vals, setVals] = useState({ freq:'1.000', volt:'3.318', duty:'50.0', snr:'42.3' });
  useEffect(() => {
    const iv = setInterval(() => {
      setVals({
        freq: (1 + Math.random()*0.002 - 0.001).toFixed(3),
        volt: (3.3 + Math.random()*0.04 - 0.02).toFixed(3),
        duty: (50 + Math.random()*0.4 - 0.2).toFixed(1),
        snr:  (42 + Math.random()*0.6 - 0.3).toFixed(1),
      });
    }, 700);
    return () => clearInterval(iv);
  }, []);

  const items = [
    { l:'FREQ', v:vals.freq, u:'kHz', c:'#00f5ff' },
    { l:'VOLT', v:vals.volt, u:'V',   c:'#00ff88' },
    { l:'DUTY', v:vals.duty, u:'%',   c:'#7b2fff' },
    { l:'SNR',  v:vals.snr,  u:'dB',  c:'#ffaa00' },
  ];

  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'0.4rem' }}>
      {items.map(({ l,v,u,c }) => (
        <div key={l} style={{ background:'rgba(0,0,0,0.45)', border:`1px solid ${c}22`,
          borderRadius:6, padding:'6px 8px', textAlign:'center' }}>
          <div className="font-mono" style={{ fontSize:'0.5rem', color:'#1f3d52', letterSpacing:'0.12em', marginBottom:3 }}>{l}</div>
          <div className="font-mono" style={{ fontSize:'0.82rem', color:c, lineHeight:1 }}>{v}</div>
          <div className="font-mono" style={{ fontSize:'0.46rem', color:`${c}80`, marginTop:2 }}>{u}</div>
        </div>
      ))}
    </div>
  );
}

export default function ECESimPanel() {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'0.5rem',
      background:'rgba(1,3,6,0.7)', border:'1px solid rgba(0,245,255,0.13)',
      borderRadius:10, padding:'0.9rem', backdropFilter:'blur(14px)' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:4 }}>
        <span className="font-mono" style={{ fontSize:'0.58rem', color:'rgba(0,245,255,0.4)', letterSpacing:'0.2em' }}>
          ECE_SIM_CONSOLE v1.4
        </span>
        <div style={{ display:'flex', gap:5 }}>
          {['RUN','CLK','IRQ'].map(s=>(
            <span key={s} className="font-mono" style={{ fontSize:'0.46rem', padding:'1px 5px',
              border:'1px solid rgba(0,255,136,0.35)', background:'rgba(0,255,136,0.07)',
              borderRadius:2, color:'#00ff88', letterSpacing:'0.1em' }}>{s}</span>
          ))}
        </div>
      </div>
      <LiveReadouts />
      <div style={{ display:'flex', gap:'0.5rem' }}>
        <OscPanel />
        <LogicPanel />
      </div>
      <SpectrumPanel />
    </div>
  );
}
