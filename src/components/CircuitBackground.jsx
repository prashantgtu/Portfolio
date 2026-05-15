import { useEffect, useRef } from 'react';

// Draws ECE component symbols on canvas
function drawResistor(ctx, x, y, angle=0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.strokeStyle = 'rgba(0,245,255,0.22)';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-18, 0); ctx.lineTo(-10, 0);
  for (let i = 0; i < 6; i++) ctx.lineTo(-10 + i*3 + 1.5, i%2===0 ? -4 : 4);
  ctx.lineTo(8, 0); ctx.lineTo(18, 0);
  ctx.stroke();
  ctx.restore();
}

function drawCapacitor(ctx, x, y, angle=0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.strokeStyle = 'rgba(123,47,255,0.25)';
  ctx.lineWidth = 0.8;
  ctx.beginPath(); ctx.moveTo(-14,0); ctx.lineTo(-3,0); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(3,0); ctx.lineTo(14,0); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-3,-7); ctx.lineTo(-3,7); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(3,-7); ctx.lineTo(3,7); ctx.stroke();
  ctx.restore();
}

function drawTransistor(ctx, x, y) {
  ctx.save();
  ctx.translate(x, y);
  ctx.strokeStyle = 'rgba(0,255,136,0.2)';
  ctx.lineWidth = 0.8;
  // Base
  ctx.beginPath(); ctx.moveTo(-14,0); ctx.lineTo(-5,0); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-5,-10); ctx.lineTo(-5,10); ctx.stroke();
  // Collector & Emitter
  ctx.beginPath(); ctx.moveTo(-5,-7); ctx.lineTo(12,-14); ctx.moveTo(12,-14); ctx.lineTo(12,-22); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-5,7); ctx.lineTo(12,14); ctx.moveTo(12,14); ctx.lineTo(12,22); ctx.stroke();
  ctx.restore();
}

function drawOpAmp(ctx, x, y) {
  ctx.save();
  ctx.translate(x, y);
  ctx.strokeStyle = 'rgba(255,170,0,0.2)';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-16,-14); ctx.lineTo(-16,14); ctx.lineTo(16,0); ctx.closePath();
  ctx.stroke();
  ctx.font = '5px Share Tech Mono';
  ctx.fillStyle = 'rgba(255,170,0,0.3)';
  ctx.fillText('+', -12, 3);
  ctx.fillText('-', -12, -3);
  ctx.restore();
}

function drawANDGate(ctx, x, y) {
  ctx.save();
  ctx.translate(x, y);
  ctx.strokeStyle = 'rgba(0,128,255,0.22)';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-12,-10); ctx.lineTo(0,-10);
  ctx.arc(0, 0, 10, -Math.PI/2, Math.PI/2);
  ctx.lineTo(-12,10); ctx.closePath();
  ctx.stroke();
  ctx.restore();
}

export default function CircuitBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf, W, H;

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Nodes
    const N = Math.min(22, Math.floor(W * H / 30000));
    const nodes = Array.from({ length: N }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random()-0.5)*0.28, vy: (Math.random()-0.5)*0.28,
      r: Math.random()*1.8+0.8, pulse: Math.random()*Math.PI*2,
    }));

    // Signal particles
    const signals = Array.from({ length: 10 }, () => ({
      progress: Math.random(),
      from: Math.floor(Math.random()*N), to: Math.floor(Math.random()*N),
      speed: 0.003 + Math.random()*0.004,
      color: ['#00f5ff','#0080ff','#7b2fff','#00ff88','#ffaa00'][Math.floor(Math.random()*5)],
    }));

    // Static ECE components (placed once, don't move)
    const comps = [];
    const placements = [
      { type:'R', x:0.12,y:0.18,a:0 }, { type:'R', x:0.85,y:0.35,a:Math.PI/2 },
      { type:'C', x:0.22,y:0.72,a:0 }, { type:'C', x:0.75,y:0.65,a:Math.PI/2 },
      { type:'T', x:0.08,y:0.55 }, { type:'T', x:0.9,y:0.2 },
      { type:'A', x:0.55,y:0.85 }, { type:'A', x:0.3,y:0.12 },
      { type:'G', x:0.68,y:0.15 }, { type:'G', x:0.18,y:0.88 },
    ];
    placements.forEach(p => comps.push({
      ...p, rx: p.x, ry: p.y,
      pulse: Math.random()*Math.PI*2,
    }));

    let waveT = 0;

    const draw = () => {
      ctx.clearRect(0,0,W,H);
      waveT += 0.018;

      // Fine grid
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = 'rgba(0,245,255,0.02)';
      for (let x=0;x<W;x+=55) { ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke(); }
      for (let y=0;y<H;y+=55) { ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke(); }

      // Move + draw nodes
      nodes.forEach(n => {
        n.x+=n.vx; n.y+=n.vy; n.pulse+=0.035;
        if(n.x<0||n.x>W)n.vx*=-1;
        if(n.y<0||n.y>H)n.vy*=-1;
      });

      // L-shaped PCB traces between close nodes
      for (let i=0;i<nodes.length;i++) {
        for (let j=i+1;j<nodes.length;j++) {
          const dx=nodes[i].x-nodes[j].x, dy=nodes[i].y-nodes[j].y;
          const d=Math.hypot(dx,dy);
          if(d<180) {
            const alpha=(1-d/180)*0.28;
            ctx.strokeStyle=`rgba(0,245,255,${alpha})`;
            ctx.lineWidth=0.7;
            ctx.beginPath();
            const mx=nodes[i].x, my=nodes[j].y;
            ctx.moveTo(nodes[i].x,nodes[i].y);
            ctx.lineTo(mx,my);
            ctx.lineTo(nodes[j].x,nodes[j].y);
            ctx.stroke();
            // Via dot at corner
            ctx.beginPath();
            ctx.arc(mx,my,1.5,0,Math.PI*2);
            ctx.fillStyle=`rgba(0,245,255,${alpha*1.5})`;
            ctx.fill();
          }
        }
      }

      // Nodes as pad dots
      nodes.forEach(n => {
        const g=0.55+0.45*Math.sin(n.pulse);
        ctx.beginPath(); ctx.arc(n.x,n.y,n.r*g,0,Math.PI*2);
        ctx.fillStyle=`rgba(0,245,255,${0.45*g})`; ctx.fill();
        ctx.beginPath(); ctx.arc(n.x,n.y,n.r*g+4,0,Math.PI*2);
        ctx.strokeStyle=`rgba(0,245,255,${0.1*g})`; ctx.lineWidth=1; ctx.stroke();
      });

      // ECE component symbols
      ctx.save();
      comps.forEach(c => {
        const px=c.rx*W, py=c.ry*H;
        const alpha=0.5+0.5*Math.sin(waveT*0.8+c.pulse);
        ctx.globalAlpha=alpha;
        if(c.type==='R') drawResistor(ctx,px,py,c.a);
        else if(c.type==='C') drawCapacitor(ctx,px,py,c.a);
        else if(c.type==='T') drawTransistor(ctx,px,py);
        else if(c.type==='A') drawOpAmp(ctx,px,py);
        else if(c.type==='G') drawANDGate(ctx,px,py);
      });
      ctx.globalAlpha=1;
      ctx.restore();

      // Signal particles
      signals.forEach(s => {
        s.progress+=s.speed;
        if(s.progress>=1){
          s.progress=0; s.from=s.to;
          s.to=Math.floor(Math.random()*N);
        }
        const f=nodes[s.from], t=nodes[s.to];
        const px=f.x+(t.x-f.x)*s.progress;
        const py=f.y+(t.y-f.y)*s.progress;
        ctx.beginPath(); ctx.arc(px,py,2.2,0,Math.PI*2);
        ctx.fillStyle=s.color; ctx.fill();
        ctx.shadowColor=s.color; ctx.shadowBlur=6;
        // Tail
        const tl=Math.min(s.progress,0.09);
        const tx=f.x+(t.x-f.x)*(s.progress-tl);
        const ty=f.y+(t.y-f.y)*(s.progress-tl);
        const gr=ctx.createLinearGradient(tx,ty,px,py);
        gr.addColorStop(0,'transparent'); gr.addColorStop(1,s.color);
        ctx.beginPath(); ctx.moveTo(tx,ty); ctx.lineTo(px,py);
        ctx.strokeStyle=gr; ctx.lineWidth=1.4; ctx.stroke();
        ctx.shadowBlur=0;
      });

      // Bottom oscilloscope waveform
      const wY=H-50;
      ctx.beginPath();
      for(let x=0;x<=W;x+=2){
        const t2=x/W;
        const y=wY+Math.sin(t2*Math.PI*10+waveT)*10+Math.sin(t2*Math.PI*20-waveT*1.4)*4;
        x===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
      }
      ctx.strokeStyle='rgba(0,255,136,0.1)'; ctx.lineWidth=1.2; ctx.stroke();

      // Top frequency domain hint
      ctx.beginPath();
      for(let x=0;x<=W;x+=2){
        const t3=x/W;
        const y=35+Math.abs(Math.sin(t3*Math.PI*6+waveT))*18;
        x===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
      }
      ctx.strokeStyle='rgba(123,47,255,0.08)'; ctx.lineWidth=1; ctx.stroke();

      raf=requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize',resize); };
  }, []);

  return <canvas ref={canvasRef} style={{ position:'absolute',inset:0,width:'100%',height:'100%',zIndex:0 }} />;
}
