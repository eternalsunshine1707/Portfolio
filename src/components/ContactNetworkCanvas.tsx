import { useEffect, useRef } from 'react';

const NODE_COUNT = 36;
const LINK_DISTANCE = 140;
const BASE_ALPHA = 0.18;
const NODE_RADIUS = 2.25;
const SPEED = 0.12;

type Node = { x: number; y: number; vx: number; vy: number };

const ContactNetworkCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const initNodes = (w: number, h: number) => {
      const nodes: Node[] = [];
      for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * SPEED * 2,
          vy: (Math.random() - 0.5) * SPEED * 2,
        });
      }
      nodesRef.current = nodes;
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (nodesRef.current.length === 0) initNodes(w, h);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);

    const tick = () => {
      const parent = canvas.parentElement;
      if (!parent || !ctx) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      if (w < 48 || h < 48) {
        frameRef.current = requestAnimationFrame(tick);
        return;
      }
      const nodes = nodesRef.current;
      if (nodes.length === 0) initNodes(w, h);

      ctx.clearRect(0, 0, w, h);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        n.x = Math.max(0, Math.min(w, n.x));
        n.y = Math.max(0, Math.min(h, n.y));
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const d = Math.hypot(dx, dy);
          if (d < LINK_DISTANCE && d > 0) {
            const t = 1 - d / LINK_DISTANCE;
            const alpha = t * BASE_ALPHA;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 188, 212, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(0, 188, 212, ${BASE_ALPHA})`;
        ctx.arc(n.x, n.y, NODE_RADIUS, 0, Math.PI * 2);
        ctx.fill();
      }

      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden
    />
  );
};

export default ContactNetworkCanvas;
