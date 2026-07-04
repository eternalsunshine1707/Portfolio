import { useEffect, useRef } from 'react';

const DESKTOP_DOTS = 300;
const MOBILE_DOTS = 75;
const MOUSE_RADIUS = 160;
const MOUSE_FORCE = 0.35;

interface Dot {
  x: number;
  y: number;
  baseVx: number;
  baseVy: number;
  pushVx: number;
  pushVy: number;
  radius: number;
  baseOpacity: number;
  phase: number;
  pulseSpeed: number;
}

const GlobalBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = 0;
    let height = 0;
    let resizeTimer: ReturnType<typeof setTimeout>;
    let mouseX = -9999;
    let mouseY = -9999;
    let dots: Dot[] = [];
    let lastTime = 0;
    let lastWidth = window.innerWidth;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove);

    function resize() {
      const dpr = Math.min(window.devicePixelRatio, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = width + 'px';
      canvas!.style.height = height + 'px';
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function initDots() {
      dots = [];
      const padX = width * 0.04;
      const padY = height * 0.04;
      const areaW = width - padX * 2;
      const areaH = height - padY * 2;
      const dotCount = width < 768 ? MOBILE_DOTS : DESKTOP_DOTS;

      for (let i = 0; i < dotCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.15 + Math.random() * 0.3;
        dots.push({
          x: padX + Math.random() * areaW,
          y: padY + Math.random() * areaH,
          baseVx: Math.cos(angle) * speed,
          baseVy: Math.sin(angle) * speed,
          pushVx: 0,
          pushVy: 0,
          radius: 0.9 + Math.random() * 0.7,
          baseOpacity: 0.5 + Math.random() * 0.5,
          phase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.0008 + Math.random() * 0.0015,
        });
      }
    }

    function animate(time: number) {
      const dt = lastTime ? time - lastTime : 16;
      lastTime = time;
      ctx!.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const halfW = width / 2;
      const halfH = height / 2;
      const radiusSq = MOUSE_RADIUS * MOUSE_RADIUS;

      for (const dot of dots) {
        const dmx = dot.x - mouseX;
        const dmy = dot.y - mouseY;
        const distSq = dmx * dmx + dmy * dmy;

        if (distSq < radiusSq && distSq > 0) {
          const dist = Math.sqrt(distSq);
          const falloff = 1 - dist / MOUSE_RADIUS;
          const force = MOUSE_FORCE * falloff * falloff;
          const nx = dmx / dist;
          const ny = dmy / dist;
          dot.pushVx += (nx * force + ny * force * 0.3) * (dt / 16);
          dot.pushVy += (ny * force - nx * force * 0.3) * (dt / 16);
        }

        dot.pushVx *= 0.97;
        dot.pushVy *= 0.97;
        dot.x += (dot.baseVx + dot.pushVx) * (dt / 16);
        dot.y += (dot.baseVy + dot.pushVy) * (dt / 16);

        if (dot.x < -20) dot.x = width + 20;
        if (dot.x > width + 20) dot.x = -20;
        if (dot.y < -20) dot.y = height + 20;
        if (dot.y > height + 20) dot.y = -20;

        dot.phase += dot.pulseSpeed * dt;
        const pulse = (Math.sin(dot.phase) + 1) / 2;
        const opacity = dot.baseOpacity * (0.3 + pulse * 0.7);

        const dx = (dot.x - cx) / halfW;
        const dy = (dot.y - cy) / halfH;
        const edgeDist = dx * dx + dy * dy;
        const vignette = Math.max(0, 1 - edgeDist * 0.7);

        ctx!.beginPath();
        ctx!.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255, 255, 255, ${opacity * vignette * 0.9})`;
        ctx!.fill();
      }

      animationId = requestAnimationFrame(animate);
    }

    resize();
    initDots();
    animationId = requestAnimationFrame(animate);

    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const widthChanged = window.innerWidth !== lastWidth;
        lastWidth = window.innerWidth;
        resize();
        if (widthChanged) initDots();
      }, 200);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      style={{ background: 'oklch(12.964% 0.02739 261.707)' }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};

export default GlobalBackground;
