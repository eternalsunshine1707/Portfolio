import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';

interface Technology {
  name: string;
  color: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: Technology[];
  githubUrl?: string;
  liveUrl?: string;
  category: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Big Sales Prediction Using Random Forest Regressor",
    description: "This project leverages machine learning to enhance retail sales prediction, a cornerstone of inventory management and revenue forecasting. Using a dataset of 14,204 entries with 12 product and outlet attributes, I developed a robust predictive model to optimize business strategies and decision-making in the retail sector.",
    image: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
    technologies: [
      { name: "Python", color: "bg-blue-500" },
      { name: "Scikit-learn", color: "bg-orange-500" },
      { name: "Pandas", color: "bg-purple-500" },
      { name: "NumPy", color: "bg-green-500" },
      { name: "Matplotlib", color: "bg-red-500" }
    ],
    githubUrl: "https://github.com/eternalsunshine1707/BigSalesPredictionUsingRandomForestRegressor",
    category: "Machine Learning"
  },
  {
    id: 2,
    title: "Graph Analytics",
    description: "Analyzed a trust network dataset from SOC-E (Epinions) using R, focusing on graph analytics and visualization. Developed custom functions utilizing igraph and sna packages to process 10M nodes and edges. Implemented advanced metrics including power centrality, cliques, and random walks to identify community patterns. Successfully transformed complex network data into actionable insights through visualization and simplification techniques.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    technologies: [
      { name: "R", color: "bg-blue-500" },
      { name: "igraph", color: "bg-green-500" },
      { name: "sna", color: "bg-purple-500" },
      { name: "ggplot2", color: "bg-orange-500" },
      { name: "tidyverse", color: "bg-red-500" }
    ],
    githubUrl: "https://github.com/eternalsunshine1707/BigDataProject1_GraphAnalytics",
    category: "Data Analytics"
  },
  {
    id: 3,
    title: "Assembly Language Based Computer Simulator",
    description: "The project's goal is to create an assembly language-based simulator of a modest traditional CISC computer, developing a comprehensive understanding of computer systems' internal design. The simulator includes key components: basic machine design with simple memory, load/store instructions, and an initial interface; enhanced memory and cache modules with a program demonstration; and advanced features like floating-point/vector operations and enhanced scheduling with branch prediction.",
    image: "./CISC.png",
    technologies: [
      { name: "Assembly", color: "bg-gray-500" },
      { name: "Java", color: "bg-red-500" },
      { name: "Computer Architecture", color: "bg-green-500" },
      { name: "Memory Management", color: "bg-purple-500" }
    ],
    githubUrl: "https://github.com/eternalsunshine1707/AssemblyLanguageBased_ComputerSimulator",
    category: "Systems Programming"
  }
];

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

const Projects = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <section id="projects" className="min-h-screen py-24 relative overflow-hidden">
      <div className="w-full px-8 xl:px-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-4xl lg:text-5xl font-bold text-[#c9b694] mb-16 text-center"
        >
          THINGS I'VE BUILT
        </motion.h1>

        {/* Projects Grid — all 3 fit in one row on desktop, full-width to match Dashboard/Hero */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const isSelected = selectedId === project.id;
            const isOtherSelected = selectedId !== null && !isSelected;
            return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: (index % 2) * 0.15 }}
              style={{ zIndex: isSelected ? 20 : 1 }}
            >
            <motion.div
              whileHover={!selectedId ? { y: -8 } : {}}
              onClick={() => setSelectedId((cur) => (cur === project.id ? null : project.id))}
              animate={{
                scale: isSelected ? 1.06 : isOtherSelected ? 0.94 : 1,
                filter: isOtherSelected ? 'blur(5px)' : 'blur(0px)',
                opacity: isOtherSelected ? 0.55 : 1,
                rotate: isSelected ? [0, -2.5, 2.5, -1.5, 0] : 0,
              }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
              className="group relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden flex flex-col cursor-pointer"
            >
              <CardEffects />

              {/* Project Image */}
              <div className="relative w-full h-80 overflow-hidden">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.4 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent opacity-70" />
              </div>

              {/* Project Info */}
              <div className="relative p-6 flex flex-col flex-1 z-10">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#c9b694] transition-colors">
                  {project.title}
                </h3>

                <p className="text-gray-300 text-base leading-relaxed mb-6 flex-1 text-justify">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${tech.color} bg-opacity-20 text-white`}
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-6">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-white hover:text-[#c9b694] transition-colors flex items-center gap-2 group/link"
                    >
                      <Github size={20} />
                      <span className="text-sm font-medium">View Source</span>
                      <ArrowRight size={16} className="opacity-0 group-hover/link:opacity-100 transition-opacity" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-white hover:text-[#c9b694] transition-colors flex items-center gap-2 group/link"
                    >
                      <ExternalLink size={20} />
                      <span className="text-sm font-medium">Live Demo</span>
                      <ArrowRight size={16} className="opacity-0 group-hover/link:opacity-100 transition-opacity" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
