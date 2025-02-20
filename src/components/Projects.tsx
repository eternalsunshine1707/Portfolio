import React, { useState } from 'react';
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
    image: "/CISC.png",
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

const Projects = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="projects" className="min-h-screen bg-dark-950 py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl lg:text-5xl font-bold text-white mb-16 text-center"
        >
          THINGS I'VE BUILT
        </motion.h1>

        {/* Projects List */}
        <div className="max-w-5xl mx-auto space-y-24">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              onHoverStart={() => setHoveredId(project.id)}
              onHoverEnd={() => setHoveredId(null)}
              className={`relative group ${index % 2 === 0 ? '' : 'lg:flex-row-reverse'} flex flex-col lg:flex-row items-center gap-8 lg:gap-12`}
            >
              {/* Project Image */}
              <div className="lg:w-3/5 w-full">
                <motion.div 
                  className="relative rounded-xl overflow-hidden w-full h-[400px]"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent opacity-60 z-10"
                    initial={{ opacity: 0.6 }}
                    animate={{ opacity: hoveredId === project.id ? 0.3 : 0.6 }}
                    transition={{ duration: 0.3 }}
                  />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 transition-opacity duration-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredId === project.id ? 0.2 : 0 }}
                  />
                </motion.div>
              </div>

              {/* Project Info */}
              <div className="lg:w-2/5 w-full">
                <motion.div
                  initial={{ x: index % 2 === 0 ? 20 : -20 }}
                  animate={{ x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="relative"
                >
                  <motion.span 
                    className="text-cyan-400 text-sm font-medium mb-2 block"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {project.category}
                  </motion.span>
                  <motion.h3 
                    className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {project.title}
                  </motion.h3>
                  <motion.div 
                    className="bg-white/5 backdrop-blur-sm p-6 rounded-xl mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </motion.div>

                  {/* Technologies */}
                  <motion.div 
                    className="flex flex-wrap gap-2 mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {project.technologies.map((tech, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + (idx * 0.1) }}
                        whileHover={{ scale: 1.1 }}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${tech.color} bg-opacity-20 text-white`}
                      >
                        {tech.name}
                      </motion.span>
                    ))}
                  </motion.div>

                  {/* Links */}
                  <motion.div 
                    className="flex items-center gap-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-cyan-400 transition-colors flex items-center gap-2 group/link"
                        whileHover={{ x: 5 }}
                      >
                        <Github size={20} />
                        <span className="text-sm font-medium">View Source</span>
                        <ArrowRight size={16} className="opacity-0 group-hover/link:opacity-100 transition-opacity" />
                      </motion.a>
                    )}
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-cyan-400 transition-colors flex items-center gap-2 group/link"
                        whileHover={{ x: 5 }}
                      >
                        <ExternalLink size={20} />
                        <span className="text-sm font-medium">Live Demo</span>
                        <ArrowRight size={16} className="opacity-0 group-hover/link:opacity-100 transition-opacity" />
                      </motion.a>
                    )}
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;