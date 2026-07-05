import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin } from 'lucide-react';

/** Cursor-following beige glow, shown on hover — same pattern as Dashboard.tsx's HoverGlow */
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
        style={{ background: 'radial-gradient(280px circle at var(--mx, 50%) var(--my, 50%), rgba(201,182,148,0.18), transparent 65%)' }}
      />
    </div>
  );
};

/** Golden traveling-light border on hover — same technique as Dashboard.tsx's CardShimmerBorder */
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

interface TimelineEntry {
  id: number;
  company: string;
  logo: string;
  duration: string;
  position: string;
  location: string;
  narrative: string[];
  isCurrentPosition: boolean;
}

const timelineData: TimelineEntry[] = [
  {
    id: 1,
    company: "Tidel Enterprise Inc",
    logo: "./Tidel.jpeg",
    duration: "Apr 2026 - Present",
    position: "Data Analyst",
    location: "Remote, USA",
    narrative: [
      "At Tidel, I got to just dig in and fix the reporting mess most teams never find the time to deal with. I built Power BI dashboards that gave three-plus teams one shared, trustworthy view of their numbers instead of everyone pulling their own reports by hand, which saved about four to six hours a week across the board. A lot of that reliability came from the unglamorous work underneath it: cleaning and processing over 50,000 records with Python, Pandas, Excel, and Google Sheets so the dashboards were actually showing something true. I leaned on tools like Claude and ChatGPT pretty regularly here too, mostly to speed through repetitive scripting and validation logic so I could spend more time on the actual analysis, which is honestly just how a lot of data work gets done now.",
      "I also supported A/B testing for the product and operations teams, turning test results into something people could actually act on instead of a coin flip."
    ],
    isCurrentPosition: false
  },
  {
    id: 2,
    company: "Drunix Solutions",
    logo: "./Drunix.jpeg",
    duration: "Jun 2026 - Mar 2026 (10 months)",
    position: "Software Developer - Data",
    location: "Remote, USA",
    narrative: [
      "Drunix is where I got real hands on experience owning something end to end. I built a Slack bot and a companion web app in React and AWS, and over ten months I shipped six-plus feature releases through a proper branching and code review workflow that kept production stable the whole way through.",
      "I also reworked our Jenkins CI/CD pipelines, which cut deployment time by around 30% and made releases feel a lot less like holding my breath. When things broke in production, which happens, I was usually the one digging in to find the actual root cause. I resolved 13-plus high-severity incidents there and never had one come back."
    ],
    isCurrentPosition: false
  },
  {
    id: 3,
    company: "DXC Technology",
    logo: "./DXC.png",
    duration: "May 2018 - Jun 2023 (5 years 1 month)",
    position: "Data Engineer",
    location: "Hyderabad, India",
    narrative: [
      "DXC is where I really grew up as an engineer. Over five years I went from someone who could write a working pipeline to someone who owned the reliability of Zurich Insurance's entire analytics platform. I architected and deployed an automated ETL pipeline for their Titian platform on AWS Glue, Lambda, Step Functions, and S3, and it cut our daily processing time from ten hours down to six and a half, which meant four downstream teams got their data hours earlier every day. I moved a lot of our transformation logic into modular dbt models on Snowflake so the pipelines were easier to maintain and people stopped writing one off queries just to answer simple questions. I also went back through legacy SQL transformations and rewrote them as optimized PySpark jobs, using caching, bucketing, and repartitioning to bring query times down from fifteen minutes to under nine across all of Zurich's insurance platforms.",
      "Cost and reliability mattered just as much to me as speed. Swapping an EC2 based ingestion setup for a serverless one built on API Gateway, Lambda, DynamoDB, and S3 saved about $7,500 a month and made scaling a lot less painful. I built a small microservice, the Publishing Reschedule Lambda, that checked job dependencies and automatically delayed broken publish events, and that alone pushed SLA adherence up to 98%. I automated ingestion in Databricks for over a million records a day flowing through Bronze, Silver, and Gold layers, built more than 20 reusable Spark notebooks that cut onboarding time for new data sources by 60%, and designed a cross cloud ingestion framework with Apache Iceberg to keep AWS S3 and Azure Blob Storage in sync for high availability. On top of that I built ten-plus business facing data marts in Snowflake that shaved up to five minutes off dashboard load times, orchestrated everything through Airflow, and layered in data contracts with Great Expectations and dbt tests to keep accuracy above 99.5%."
    ],
    isCurrentPosition: false
  },
  {
    id: 4,
    company: "Aditya Birla Group",
    logo: "./Aditya_Birla_Group_Logo.png",
    duration: "May 2017 - Aug 2017 (4 months)",
    position: "Software Development Intern",
    location: "Hyderabad, India",
    narrative: [
      "My internship at Aditya Birla Group was my first real taste of building something people actually used. I built an Android app that could take a photo of a book and figure out what it was using OCR, pulling the author's name straight from the image and searching Google and Amazon APIs to find matches. It landed around 90% accuracy, which felt like a big deal at the time for a first real computer vision project.",
      "I also helped keep a real time traffic monitoring project running alongside it, mostly maintenance and support."
    ],
    isCurrentPosition: false
  },
  {
    id: 5,
    company: "Kakatiya Institute of Technology & Science",
    logo: "./KITSW_OfficiaLogo.png",
    duration: "Aug 2016 - Oct 2017 (1 year 3 months)",
    position: "Student Technical Assistant",
    location: "Warangal, India",
    narrative: [
      "As a Student Technical Assistant at KITS, I ended up leading a team of 16 through an entire placement season, which meant coordinating with over 800 students, faculty, and recruiters and making sure nothing fell through the cracks. I set up and tested the systems for coding rounds, configured software and network resources across more than 50 workstations, and was usually the first person people came to when something stopped working.",
      "We kept disruptions to a minimum and finished the season with a 95% satisfaction rate from everyone involved."
    ],
    isCurrentPosition: false
  }
];

const Experience = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"],
  });

  const [inViewRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const setTimelineRefs = (node: HTMLDivElement | null) => {
    timelineRef.current = node;
    inViewRef(node);
  };

  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="min-h-screen py-24 relative overflow-hidden">
      <div className="w-full px-8 xl:px-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="text-4xl lg:text-5xl font-bold text-[#c9b694] mb-16 text-center"
        >
          WORK EXPERIENCE
        </motion.h1>

        <div className="relative" ref={setTimelineRefs}>
          {/* Timeline Line */}
          <div className="absolute left-8 lg:left-1/3 transform lg:-translate-x-px h-full w-px bg-white/10">
            <motion.div
              className="absolute top-0 left-0 w-full bg-[#c9b694]"
              style={{ height: progressHeight }}
            />
            {/* Traveling light + dot at the leading edge of the fill */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{ top: progressHeight }}
            >
              <div className="relative w-3 h-3 rounded-full bg-[#c9b694] shadow-[0_0_12px_4px_rgba(201,182,148,0.7)]">
                <span className="absolute inset-0 rounded-full bg-[#c9b694] opacity-60 animate-ping" />
              </div>
            </motion.div>
          </div>

          {/* Timeline Entries */}
          <div className="relative space-y-20">
            {timelineData.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -50 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="flex items-start relative"
              >
                {/* Company Logo */}
                <div className="hidden lg:block w-1/3 pr-16 relative">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative w-40 h-40 rounded-xl overflow-hidden shadow-lg ml-auto group bg-white"
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <img
                        src={entry.logo}
                        alt={`${entry.company} logo`}
                        className="w-full h-full object-contain"
                        style={{
                          imageRendering: '-webkit-optimize-contrast',
                          transform: 'translateZ(0)',
                          backfaceVisibility: 'hidden'
                        }}
                      />
                    </div>
                  </motion.div>
                  {/* Connecting Line */}
                  <div className="absolute right-0 top-1/2 w-16 h-px bg-gradient-to-r from-[#c9b694]/20 to-[#c9b694]" />
                </div>

                {/* Timeline Point */}
                <div className="absolute left-8 lg:left-1/3 transform lg:-translate-x-1/2 w-4 h-4">
                  <div className="w-4 h-4 rounded-full bg-dark-950 border-2 border-[#c9b694] relative">
                    {entry.isCurrentPosition && (
                      <span className="absolute inset-0 rounded-full animate-ping bg-[#c9b694] opacity-75" />
                    )}
                  </div>
                </div>

                {/* Content Card */}
                <div className="ml-16 lg:ml-6 lg:w-[55%]">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.99 }}
                    className="group relative bg-white/5 rounded-xl p-8 backdrop-blur-sm border border-white/10 shadow-xl overflow-hidden"
                  >
                    <CardEffects />
                    {/* Mobile Logo */}
                    <div className="lg:hidden mb-4">
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-white flex items-center justify-center">
                        <img
                          src={entry.logo}
                          alt={`${entry.company} logo`}
                          className="w-full h-full object-contain"
                          style={{
                            imageRendering: '-webkit-optimize-contrast',
                            transform: 'translateZ(0)',
                            backfaceVisibility: 'hidden'
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap items-baseline gap-x-3 mb-1">
                      <h3 className="text-2xl font-bold text-white">
                        {entry.company}
                      </h3>
                      <span className="text-gray-500">|</span>
                      <span className="text-2xl font-bold text-[#c9b694]" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {entry.position}
                      </span>
                    </div>
                    <p className="flex flex-wrap items-center gap-x-2 text-sm text-gray-400 mb-6">
                      <span className="flex items-center">
                        <MapPin size={14} className="mr-1" />
                        {entry.location}
                      </span>
                      <span className="text-gray-600">&bull;</span>
                      <span>{entry.duration}</span>
                    </p>

                    <div className="space-y-4">
                      {entry.narrative.map((paragraph, idx) => (
                        <p key={idx} className="text-gray-300 text-lg leading-relaxed text-justify">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
