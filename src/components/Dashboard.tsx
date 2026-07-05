import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RefreshCw, Play, Pause } from 'lucide-react';
import {
  SiPython, SiApachespark, SiApacheairflow, SiSnowflake, SiDocker,
  SiKubernetes, SiGit, SiJenkins, SiJavascript, SiReact, SiPostgresql, SiMysql,
  SiMongodb, SiRedis, SiApachekafka, SiTerraform, SiGithubactions,
  SiGitlab, SiLinux,
} from 'react-icons/si';

const BASE = import.meta.env.BASE_URL;

// AWS, Tableau, and dbt have no icon in this library — render as text badges instead
const TextBadge = ({ label }: { label: string }) => (
  <div className="w-7 h-7 rounded-md border border-white/20 flex items-center justify-center text-[9px] font-bold text-white">
    {label}
  </div>
);

/** Thin beige border traced around the whole dashboard grid, with a glowing dot looping slowly around the perimeter */
const DashboardBorderTrace = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => {
      const rect = el.getBoundingClientRect();
      setSize({ w: rect.width, h: rect.height });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { w, h } = size;
  const pathD = w > 0 && h > 0 ? `M1,1 H${w - 1} V${h - 1} H1 Z` : '';

  return (
    <div ref={wrapRef} className="absolute -inset-4 pointer-events-none">
      {w > 0 && h > 0 && (
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="absolute inset-0">
          <rect x={1} y={1} width={w - 2} height={h - 2} fill="none" stroke="#c9b694" strokeOpacity={0.3} strokeWidth={1} />
          <path id="dashboardTracePath" d={pathD} fill="none" stroke="none" />
          <circle r={7} fill="#c9b694" opacity={0.35}>
            <animateMotion dur="16s" repeatCount="indefinite">
              <mpath xlinkHref="#dashboardTracePath" />
            </animateMotion>
          </circle>
          <circle r={3.5} fill="#c9b694">
            <animateMotion dur="16s" repeatCount="indefinite">
              <mpath xlinkHref="#dashboardTracePath" />
            </animateMotion>
          </circle>
        </svg>
      )}
    </div>
  );
};

const ABOUT_ME_PARAGRAPHS = [
  "I'm a recent graduate from The George Washington University, and I'm actively exploring new opportunities as a Data Engineer. This website was made to showcase everything I can do and plan to do. Don't judge my writing based on this section, though, this is by far my shoddiest work yet!",
  "I got into data engineering because I'm what you might call a pseudo-perfectionist (is that even a thing!?). I can't stand messy data, clunky processes, or things that just don't \"look right.\" If something doesn't work smoothly or doesn't look great, it bugs me to no end. It's like an itch I have to scratch. So, naturally, I found myself on this path where I get to make things that are not just functional but downright fabulous. Crafting pipelines, optimizing data flows, and ensuring everything \"fits perfectly\" has become my way of bringing order to chaos, and that's the energy I bring to every project, getting it to look and work just right (and maybe showing off a little).",
  "My love for development, though, started way before this pseudo-perfectionist epiphany. I mean, think about it, \"int i = 10;\" magically makes a whole integer? Wow! Watching lines of code morph into apps like Facebook or Amazon? Pure magic. That's when I knew: I wanted to be part of this magic, creating things people actually use and love.",
  "I created this website to showcase my work, my passion for problem-solving, and, above all, my love for building solutions that matter. Through this, I hope to make it easier for you to connect with me. If you like what you see, head over to the contact section and drop me a message, I'd love to hear from you!",
];

const READING_PARAGRAPHS = [
  "Currently making my way through The Magic by Rhonda Byrne, one gratitude exercise at a time. Jury's still out on whether it's rewiring my brain or just giving me a very wholesome excuse to journal at 11pm. If you've read it, come tell me, I promise I won't turn it into a TED talk.",
];

const BOLD_PHRASES = ['pseudo-perfectionist', 'Crafting pipelines', 'optimizing data flows', 'int i = 10;'];

const renderWithBold = (text: string) => {
  const pattern = BOLD_PHRASES.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  const re = new RegExp(`(${pattern})`, 'g');
  return text.split(re).map((part, i) =>
    BOLD_PHRASES.includes(part) ? (
      <strong key={i} className="font-bold">{part}</strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
};

const QUOTES = [
  { text: 'Hey there, whatever is meant for you will cross seven oceans & find you. Trust the journey bro!', bg: '#2d5f6b', font: "'Baloo 2', cursive" },
  { text: 'దేవుడు నిన్ను రాణి చేయాలనుకుంటే, నీకు కిరీటం ఇవ్వడు - యుద్ధాన్ని ఇస్తాడు', bg: '#6b3f2d', font: "'Noto Sans Telugu', sans-serif" },
  { text: "It's You Vs You. And one of You has to die!", bg: '#4a2d6b', font: "'Baloo 2', cursive" },
  { text: 'God is love!', bg: '#6b2d4a', font: "'Baloo 2', cursive" },
];

const TOOLS_ROW_1 = [
  { Icon: SiPython, name: 'Python', color: '#3776AB' },
  { Icon: null, name: 'AWS', badge: 'AWS' },
  { Icon: SiApachespark, name: 'Spark', color: '#E25A1C' },
  { Icon: SiApacheairflow, name: 'Airflow', color: '#017CEE' },
  { Icon: SiSnowflake, name: 'Snowflake', color: '#29B5E8' },
  { Icon: SiDocker, name: 'Docker', color: '#2496ED' },
  { Icon: SiKubernetes, name: 'Kubernetes', color: '#326CE5' },
  { Icon: SiGit, name: 'Git', color: '#F05032' },
  { Icon: SiJenkins, name: 'Jenkins', color: '#D24939' },
  { Icon: null, name: 'dbt', badge: 'dbt' },
  { Icon: SiTerraform, name: 'Terraform', color: '#7B42BC' },
];

const TOOLS_ROW_2 = [
  { Icon: SiJavascript, name: 'JavaScript', color: '#F7DF1E' },
  { Icon: SiReact, name: 'React', color: '#61DAFB' },
  { Icon: SiPostgresql, name: 'PostgreSQL', color: '#4169E1' },
  { Icon: SiMysql, name: 'MySQL', color: '#4479A1' },
  { Icon: SiMongodb, name: 'MongoDB', color: '#47A248' },
  { Icon: SiRedis, name: 'Redis', color: '#DC382D' },
  { Icon: SiApachekafka, name: 'Kafka', color: '#231F20' },
  { Icon: null, name: 'Tableau', badge: 'TB' },
  { Icon: SiGithubactions, name: 'GitHub Actions', color: '#2088FF' },
  { Icon: SiGitlab, name: 'GitLab', color: '#FC6D26' },
  { Icon: SiLinux, name: 'Linux', color: '#FCC624' },
];

const cardBase =
  'rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 flex flex-col relative overflow-hidden group';
const cardTitle = 'text-xs uppercase tracking-wider text-[#c9b694] font-bold';
const cardMotionProps = { whileHover: { y: -6, scale: 1.015, transition: { duration: 0.25 } } };

/** Cursor-following beige glow, shown on hover */
const HoverGlow = () => {
  const ref = useRef<HTMLDivElement>(null);
  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };
  return (
    <div ref={ref} onMouseMove={handleMove} className="absolute inset-0 pointer-events-none z-20">
      <span
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'radial-gradient(220px circle at var(--mx, 50%) var(--my, 50%), rgba(201,182,148,0.18), transparent 65%)' }}
      />
    </div>
  );
};

/** Golden traveling-light border on hover — same technique as the hero "View my work" button */
const CardShimmerBorder = () => (
  <span
    aria-hidden
    className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
    style={{
      border: '1.5px solid transparent',
      WebkitMask: 'linear-gradient(#000 0 0) padding-box, linear-gradient(#000 0 0)',
      WebkitMaskComposite: 'xor',
      maskComposite: 'exclude',
    }}
  >
    <span className="absolute inset-0 overflow-visible blur-[2px]" style={{ containerType: 'size' } as React.CSSProperties}>
      <span
        className="absolute inset-0"
        style={{ height: '100cqh', aspectRatio: '2', borderRadius: 0, animation: 'shimmerSlide 3.6s ease-in-out infinite alternate' }}
      >
        <span
          className="absolute -inset-full rotate-0"
          style={{
            background: 'conic-gradient(from calc(270deg - 45deg), transparent 0, #c9b694 90deg, transparent 90deg)',
            animation: 'spinAround 3.6s linear infinite',
          }}
        />
      </span>
    </span>
  </span>
);

const CardEffects = () => (
  <>
    <HoverGlow />
    <CardShimmerBorder />
  </>
);

/** Shared fullscreen expand modal — fixed size, beige bg, big image, hidden scrollbar */
const ExpandModal = ({
  open,
  onClose,
  title,
  paragraphs,
  image,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  paragraphs: string[];
  image?: string;
}) => {
  const paraWordCounts = paragraphs.map((p) => p.split(' ').length);
  const totalWords = paraWordCounts.reduce((a, b) => a + b, 0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!open) {
      setCount(0);
      return;
    }
    setCount(0);
    const id = setInterval(() => {
      setCount((c) => {
        if (c >= totalWords) {
          clearInterval(id);
          return c;
        }
        return c + 1;
      });
    }, 28);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  let wordsUsed = 0;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-6 sm:p-16"
          style={{ background: 'rgba(10,10,18,0.6)', backdropFilter: 'blur(6px)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl rounded-2xl overflow-hidden flex flex-col"
            style={{ background: '#c9b694', height: 'min(85vh, 700px)' }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/15 hover:bg-black/25 text-[#3a2f2f] transition-colors z-10"
              aria-label="Close"
            >
              <X size={20} />
            </button>
            {image && (
              <div className="relative shrink-0" style={{ height: '66%' }}>
                <img
                  src={image}
                  alt={title}
                  className="absolute inset-x-0 top-6 sm:top-8 w-full h-[calc(100%-3rem)] sm:h-[calc(100%-4rem)] object-contain"
                />
              </div>
            )}
            <div className="relative flex flex-col flex-1 min-h-0 pt-3 sm:pt-4 px-8 sm:px-12 pb-8 sm:pb-12">
              <h3 className="text-2xl font-bold text-[#3a2f2f] mb-2 shrink-0">{title}</h3>
              <div className="overflow-y-auto scrollbar-hide flex-1 min-h-0 space-y-4">
                {paragraphs.map((para, pi) => {
                  const paraWords = para.split(' ');
                  const availableForThisPara = Math.max(0, Math.min(paraWords.length, count - wordsUsed));
                  const startedThisPara = count > wordsUsed;
                  wordsUsed += paraWords.length;
                  if (!startedThisPara) return null;
                  const revealed = paraWords.slice(0, availableForThisPara).join(' ');
                  const isLastVisible = count < totalWords && availableForThisPara < paraWords.length;
                  return (
                    <p key={pi} className="text-[#3a2f2f] text-base sm:text-lg leading-relaxed text-justify">
                      {renderWithBold(revealed)}
                      {isLastVisible && <span className="opacity-50">▍</span>}
                    </p>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ScratchCard = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const isDrawing = useRef(false);

  const paintCover = () => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const { width, height } = wrap.getBoundingClientRect();
    if (width === 0 || height === 0) return;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.globalCompositeOperation = 'source-over';
    const coverGradient = ctx.createLinearGradient(0, 0, width, height);
    coverGradient.addColorStop(0, '#c9b694');
    coverGradient.addColorStop(1, '#1c1616');
    ctx.fillStyle = coverGradient;
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    ctx.font = '600 13px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('scratch me', width / 2, height / 2);
  };

  // Repaint whenever the card's actual size settles (grid layout can resize it after mount)
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    paintCover();
    const ro = new ResizeObserver(() => {
      if (!revealed) paintCover();
    });
    ro.observe(wrap);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkRevealPercent = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const { width, height } = canvas;
    const data = ctx.getImageData(0, 0, width, height).data;
    let cleared = 0;
    const step = 4 * 8;
    let total = 0;
    for (let i = 3; i < data.length; i += step) {
      total++;
      if (data[i] < 40) cleared++;
    }
    if (total > 0 && cleared / total > 0.45) {
      setRevealed(true);
    }
  };

  const scratchAt = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(clientX - rect.left, clientY - rect.top, 20, 0, Math.PI * 2);
    ctx.fill();
  };

  const handleReset = () => {
    setRevealed(false);
    setQuoteIndex(Math.floor(Math.random() * QUOTES.length));
    requestAnimationFrame(paintCover);
  };

  const quote = QUOTES[quoteIndex];

  return (
    <motion.div {...cardMotionProps} className={`${cardBase} items-center justify-center p-0 h-full ${className ?? ''}`}>
      <CardEffects />
      <div
        ref={wrapRef}
        className="absolute inset-3 rounded-lg flex items-center justify-center text-center px-4 overflow-hidden"
        style={{ background: quote.bg }}
      >
        <p style={{ fontFamily: quote.font, color: '#fff', fontSize: '0.95rem', lineHeight: 1.5 }}>
          {quote.text}
        </p>
        {!revealed && (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 cursor-pointer touch-none"
            onMouseDown={(e) => { isDrawing.current = true; scratchAt(e.clientX, e.clientY); }}
            onMouseMove={(e) => { if (isDrawing.current) { scratchAt(e.clientX, e.clientY); checkRevealPercent(); } }}
            onMouseUp={() => { isDrawing.current = false; }}
            onMouseLeave={() => { isDrawing.current = false; }}
            onTouchStart={(e) => { isDrawing.current = true; const t = e.touches[0]; scratchAt(t.clientX, t.clientY); }}
            onTouchMove={(e) => { const t = e.touches[0]; scratchAt(t.clientX, t.clientY); checkRevealPercent(); }}
            onTouchEnd={() => { isDrawing.current = false; }}
          />
        )}
      </div>
      {revealed && (
        <button
          onClick={handleReset}
          className="absolute top-2 right-2 p-1.5 rounded-full bg-black/40 text-white/80 hover:text-[#c9b694] transition-colors z-30"
          aria-label="Scratch again"
        >
          <RefreshCw size={14} />
        </button>
      )}
      <span className="absolute bottom-2 left-3 text-[10px] uppercase tracking-wider text-white/50 font-semibold z-10">
        Scratch Me
      </span>
    </motion.div>
  );
};

const CertCard = ({ title, img, alt, className, imgScale = 1, imgOffsetX = 0 }: { title: string; img: string; alt: string; className?: string; imgScale?: number; imgOffsetX?: number }) => (
  <motion.div
    {...cardMotionProps}
    className={`rounded-xl border border-white/10 p-4 flex flex-col items-center bg-[#f3ede1] relative overflow-hidden group h-full ${className ?? ''}`}
  >
    <CardEffects />
    <span className="text-sm uppercase tracking-wider text-[#6b5842] font-bold mb-1">{title}</span>
    <img
      src={`${BASE}${img}`}
      alt={alt}
      className="flex-1 w-full min-h-0 object-contain"
      style={{ mixBlendMode: 'multiply', transform: `translateX(${imgOffsetX}%) scale(${imgScale})` }}
    />
  </motion.div>
);

const ToolsMarquee = () => (
  <motion.div {...cardMotionProps} className={`${cardBase} col-span-2 lg:col-span-4 row-span-1 py-5 gap-3 overflow-hidden justify-center`}>
    <CardEffects />
    <span className={cardTitle}>Tools &amp; Skills</span>
    {[TOOLS_ROW_1, TOOLS_ROW_2].map((row, rowIdx) => (
      <div key={rowIdx} className="overflow-hidden relative">
        <div
          className="flex gap-8 w-max"
          style={{ animation: `${rowIdx === 0 ? 'marqueeLeft' : 'marqueeRight'} 26s linear infinite` }}
        >
          {[...row, ...row].map(({ Icon, name, color, badge }, i) => (
            <div key={i} className="flex flex-col items-center gap-1 shrink-0" title={name}>
              {Icon ? <Icon size={32} color={color} /> : <TextBadge label={badge ?? name} />}
              <span className="text-[10px] text-gray-400 whitespace-nowrap">{name}</span>
            </div>
          ))}
        </div>
      </div>
    ))}
  </motion.div>
);

const Dashboard = () => {
  const [whyThisOpen, setWhyThisOpen] = useState(false);
  const [readingOpen, setReadingOpen] = useState(false);
  const [isSongPlaying, setIsSongPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleSong = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isSongPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsSongPlaying((p) => !p);
  };

  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        {/* 4-col bento grid — each card's row/col span is chosen so the whole thing tiles with no gaps */}
        <div className="relative">
        <DashboardBorderTrace />
        <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[160px] gap-5">
          <CertCard
            className="row-span-2"
            title="AWS Certified"
            img="AWSDataEngineer.png"
            alt="AWS Certified Data Engineer Associate"
            imgScale={1.45}
            imgOffsetX={4.8}
          />

          <ScratchCard className="row-span-2" />

          {/* Currently Listening — big album art fills the card, click to play/pause the song */}
          <motion.div
            {...cardMotionProps}
            onClick={toggleSong}
            className={`${cardBase} justify-end p-0 row-span-2 cursor-pointer`}
          >
            <CardEffects />
            <audio ref={audioRef} src={`${BASE}ForestBlakk.mp3`} onEnded={() => setIsSongPlaying(false)} />
            <img
              src={`${BASE}ForestBlakk.png`}
              alt="Forest Blakk album art"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white">
              {isSongPlaying ? <Pause size={14} /> : <Play size={14} />}
            </div>
            <div className="relative z-10 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <img src={`${BASE}Spotify.png`} alt="Spotify" className="w-4 h-4 object-contain" />
                <span className="text-[10px] uppercase tracking-wider text-[#c9b694] font-bold">
                  Currently Listening
                </span>
              </div>
              <p className="text-white text-sm font-semibold">If You Love Her</p>
              <p className="text-gray-300 text-xs">Forest Blakk</p>
            </div>
          </motion.div>

          <CertCard
            className="row-span-2"
            title="On Deck"
            img="Databricks.png"
            alt="Databricks Certified Data Engineer Associate"
          />

          {/* Currently Reading — big cover, click expands */}
          <motion.div
            {...cardMotionProps}
            onClick={() => setReadingOpen(true)}
            className={`${cardBase} justify-end p-0 col-span-2 lg:col-span-1 row-span-1 cursor-pointer`}
          >
            <CardEffects />
            <img
              src={`${BASE}magic.png`}
              alt="Currently reading"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="relative z-10 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-4 flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-wider text-[#c9b694] font-bold">
                Currently Reading
              </span>
              <p className="text-white text-sm font-semibold">The Magic</p>
            </div>
          </motion.div>

          {/* Why This — click expands */}
          <motion.div
            {...cardMotionProps}
            onClick={() => setWhyThisOpen(true)}
            className={`${cardBase} justify-center cursor-pointer col-span-2 lg:col-span-3 row-span-1`}
          >
            <CardEffects />
            <span className={`${cardTitle} mb-2`}>Why This?</span>
            <p className="text-gray-300 text-sm leading-relaxed line-clamp-2 text-justify">
              {ABOUT_ME_PARAGRAPHS[0]}
            </p>
            <span className="text-[#c9b694] text-xs mt-2 font-medium">Click to read more →</span>
          </motion.div>

          <ToolsMarquee />
        </div>
        </div>
      </div>

      <ExpandModal
        open={whyThisOpen}
        onClose={() => setWhyThisOpen(false)}
        title="Why This?"
        paragraphs={ABOUT_ME_PARAGRAPHS}
      />
      <ExpandModal
        open={readingOpen}
        onClose={() => setReadingOpen(false)}
        title="Currently Reading"
        paragraphs={READING_PARAGRAPHS}
        image={`${BASE}magic.png`}
      />
    </section>
  );
};

export default Dashboard;
