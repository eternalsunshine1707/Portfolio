import { motion, useAnimationControls, useInView } from 'framer-motion';
import { Github, ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface Metric {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

const METRICS: Metric[] = [
  { label: 'Records Processed Daily', value: 1, suffix: 'M+' },
  { label: 'Pipeline Runtime Reduction', value: 35, suffix: '%' },
  { label: 'Saved Monthly', value: 7.5, prefix: '$', suffix: 'K', decimals: 1 },
  { label: 'Rows Optimized', value: 50, suffix: 'M+' },
  { label: 'Data Reliability', value: 99, suffix: '%+' },
  { label: 'Production Pipelines Deployed', value: 10, suffix: '+' },
];

const CountUpMetric = ({
  metric,
  isSelected,
  isAnyoneSelected,
  onSelect,
}: {
  metric: Metric;
  isSelected: boolean;
  isAnyoneSelected: boolean;
  onSelect: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView && !isSelected) return;
    let raf: number;
    const start = performance.now();
    const duration = 1400;
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(metric.value * progress);
      if (progress < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, isSelected]);

  const decimals = metric.decimals ?? 0;

  return (
    <motion.div
      ref={ref}
      onClick={onSelect}
      className="cursor-pointer select-none transition-opacity duration-300"
      style={{ opacity: isAnyoneSelected && !isSelected ? 0.35 : 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
    >
      <div className="text-xl lg:text-2xl font-bold text-[#3a2f2f] whitespace-nowrap">
        {metric.prefix}
        {display.toFixed(decimals)}
        {metric.suffix}
      </div>
      <div className="text-[11px] text-gray-400 mt-1 whitespace-nowrap">{metric.label}</div>
    </motion.div>
  );
};

interface Portfolio {
  [key: string]: string | boolean;
}

const sravani: Portfolio = {
  'Data Engineer': '',
  'Data Analyst': '',
  'AWS Certified': '',
  'Pipeline Architect': '',
  'ETL Optimizer': '',
  'Problem Solver': '',
  'Writer': '',
  'Eternal Dreamer': '',
  'Sugar, Spice & Everything Nice': '',
  loading: true // Forever Evolving...
};

const LINE_STAGGER = 0.13; // seconds between each terminal line

const ViewWorkButton = () => {
  const ref = useRef<HTMLAnchorElement>(null);
  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };
  return (
    <motion.a
      ref={ref}
      href="#projects"
      onMouseMove={handleMove}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.96 }}
      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/20 bg-white/5 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-white transition-colors hover:text-[#3a2f2f]"
    >
      {/* Traveling light along the border, like the shivypatel.com CTA */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          padding: '1.5px',
          background: 'conic-gradient(from 0deg, transparent 0%, transparent 90%, #3a2f2f 96%, #fff 98%, #3a2f2f 100%)',
          WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          animation: 'spinBorder 2.4s linear infinite',
        }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-25"
        style={{
          background: 'radial-gradient(140px circle at var(--mx, 50%) var(--my, 50%), #3a2f2f, transparent 60%)',
        }}
      />
      <span className="relative">View my work</span>
      <ArrowRight className="relative w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
    </motion.a>
  );
};

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [terminalVisible, setTerminalVisible] = useState(false);
  const [imageFlipped, setImageFlipped] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<number | null>(null);
  const roles = Object.keys(sravani).filter(key => key !== 'loading');

  // Controls for the right-side box — starts hidden, triggered after left finishes
  const rightBoxControls = useAnimationControls();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % roles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [roles.length]);

  // Called when the left column's slide-in animation fully completes
  const handleLeftAnimationComplete = async () => {
    // Phase 1: drop the box in with spring bounce — await waits for spring to settle
    await rightBoxControls.start({
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 130,
        damping: 12,
        mass: 1.2,
      },
    });
    // Phase 2: spring has settled → mount terminal lines (they stagger via their own delays)
    setTerminalVisible(true);
  };

  return (
    <section className="min-h-screen pt-20 overflow-x-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-[calc(100vh-5rem)] gap-12">

          {/* ── LEFT — slides in from left, 1.3s, triggers right on complete ── */}
          <motion.div
            initial={{ opacity: 0, x: -120 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            onAnimationComplete={handleLeftAnimationComplete}
            className="w-full lg:w-[60%]"
            style={{ willChange: 'transform, opacity' }}
          >
            <motion.h1
              initial={{ y: 30 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-8"
            >
              Hi! I'm{' '}
              <span className="text-[#3a2f2f]">
                Sravani B
              </span>
            </motion.h1>

            <div className="space-y-6 text-xl text-gray-300 leading-relaxed mb-12 max-w-3xl">
              <motion.p
                initial={{ y: 24 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
              >
                I enjoy creating things that live on the Internet. With 7+ years of experience across Data Engineering and Analytics, I've designed pipelines that move millions of records, built dashboards that help teams make faster decisions, and automated workflows that save hours every week. Whether it's architecting an ETL pipeline from scratch or digging into messy data to find the story it's trying to tell - I'm equally at home in both worlds. Currently, I'm actively exploring full-time roles in Data Engineering and Data Analytics.
              </motion.p>

              <motion.p
                initial={{ y: 24 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Believe your data deserves better engineering or cleaner insights!? You are in the right place. Let's talk!
              </motion.p>
            </div>

            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="flex flex-col sm:flex-row items-center gap-6"
            >
              <div className="flex items-center gap-4">
                <motion.a
                  href="mailto:sravanistar99@gmail.com"
                  className="p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors relative group"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-6 h-6" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill="#EA4335"
                      d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805l-208 157.459L48 152.805V112h416zM48 400V198.195l208 157.459 208-157.459V400H48z"
                    />
                  </svg>
                  <motion.span
                    className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-white opacity-0 group-hover:opacity-100 whitespace-nowrap bg-dark-950/80 px-2 py-1 rounded"
                    initial={{ y: 10 }}
                    animate={{ y: 0 }}
                  >
                    Email
                  </motion.span>
                </motion.a>

                <motion.a
                  href="https://www.linkedin.com/in/sravaniofficial/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors relative group"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-6 h-6" fill="#0A66C2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <motion.span
                    className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-white opacity-0 group-hover:opacity-100 whitespace-nowrap bg-dark-950/80 px-2 py-1 rounded"
                    initial={{ y: 10 }}
                    animate={{ y: 0 }}
                  >
                    LinkedIn
                  </motion.span>
                </motion.a>

                <motion.a
                  href="https://github.com/eternalsunshine1707"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/5 hover:bg-white/10 rounded-lg text-white hover:text-[#6bab8a] transition-colors relative group"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github className="w-6 h-6" />
                  <motion.span
                    className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-white opacity-0 group-hover:opacity-100 whitespace-nowrap bg-dark-950/80 px-2 py-1 rounded"
                    initial={{ y: 10 }}
                    animate={{ y: 0 }}
                  >
                    GitHub
                  </motion.span>
                </motion.a>
              </div>

              <span className="h-6 w-px bg-white/20 hidden sm:block" aria-hidden />

              <ViewWorkButton />
            </motion.div>

            {/* ── IMPACT METRICS ── */}
            <div className="flex flex-nowrap items-start gap-6 lg:gap-8 mt-14 overflow-x-auto pb-2">
              {METRICS.map((metric, index) => (
                <CountUpMetric
                  key={metric.label}
                  metric={metric}
                  isSelected={selectedMetric === index}
                  isAnyoneSelected={selectedMetric !== null}
                  onSelect={() => setSelectedMetric(prev => (prev === index ? null : index))}
                />
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT — waits for left, then drops + bounces in ── */}
          <motion.div
            initial={{ opacity: 0, y: -220 }}
            animate={rightBoxControls}
            className="w-full lg:w-[40%] perspective lg:pl-12"
            style={{ willChange: 'transform, opacity' }}
          >
            <div className="relative w-full aspect-[4/5] max-w-md mx-auto">
              <motion.div
                onClick={() => setImageFlipped((f) => !f)}
                whileHover={{ scale: 1.02 }}
                className="group relative w-full h-full rounded-xl overflow-hidden border border-white/10 cursor-pointer bg-gradient-to-br from-white/10 to-white/0"
              >
                <div
                  className={`absolute inset-0 flex items-center justify-center text-lg font-semibold text-white/70 bg-gradient-to-br ${
                    imageFlipped ? 'from-[#2a2a3a] to-[#161622]' : 'from-[#3a2f2f] to-[#1c1616]'
                  } transition-all duration-500`}
                >
                  {imageFlipped ? 'Photo 2 (placeholder)' : 'Photo 1 (placeholder)'}
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="px-5 py-2 rounded-full border border-[#3a2f2f]/60 text-[#3a2f2f] text-sm font-semibold tracking-wide">
                    Click me
                  </span>
                </div>
              </motion.div>

              {/* Marching-ants light dashes running just outside this box's edge — no separate box */}
              <svg className="absolute -inset-3 pointer-events-none" viewBox="0 0 100 125">
                <rect
                  x="1"
                  y="1"
                  width="98"
                  height="123"
                  rx="9"
                  fill="none"
                  stroke="#3a2f2f"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeDasharray="22 17 9 19"
                  vectorEffect="non-scaling-stroke"
                  style={{ animation: 'marchingAnts 6s linear infinite' }}
                />
              </svg>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
