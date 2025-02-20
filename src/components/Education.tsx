import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRef, useState } from 'react';
import { MapPin, ChevronDown, GraduationCap } from 'lucide-react';

interface Course {
  name: string;
  description: string;
}

interface EducationEntry {
  id: number;
  institution: string;
  logo: string;
  duration: string;
  degree: string;
  major: string;
  location: string;
  courses: Course[];
  isCurrentEducation: boolean;
}

const educationData: EducationEntry[] = [
  {
    id: 1,
    institution: "The George Washington University",
    logo: "/GWU.jpg",
    duration: "Aug 2023 - May 2025 (Expected)",
    degree: "Master of Science",
    major: "Computer Science",
    location: "Washington, DC",
    courses: [
      { name: "Machine Learning", description: "Machine learning algorithms, neural networks, and practical applications" },
      { name: "Intro to Big Data & Analytics", description: "Big data processing, analytics frameworks, and data visualization" },
      { name: "Design & Analysis of Algorithms", description: "Algorithm design techniques, complexity analysis, and optimization" },
      { name: "Linux for Devops", description: "Linux system administration, shell scripting, and DevOps practices" },
      { name: "Advanced Software Paradigms", description: "Design patterns, architectural patterns, and advanced programming concepts" },
      { name: "Cloud Computing", description: "Cloud architecture, services, and deployment strategies" },
      { name: "Database Systems II", description: "Advanced database concepts, distributed databases, and query optimization" }
    ],
    isCurrentEducation: true
  },
  {
    id: 2,
    institution: "Kakatiya Institute of Technology & Science",
    logo: "/KITS_Warangal.jpeg",
    duration: "Aug 2014 - May 2018",
    degree: "Bachelor of Technology",
    major: "Computer Science and Engineering",
    location: "Warangal, India",
    courses: [
      { name: "Data Structures & Algorithms", description: "Advanced data structures, algorithm design, and complexity analysis" },
      { name: "Data Warehousing & Data Mining", description: "Data warehouse architecture, ETL processes, and mining techniques" },
      { name: "Operating Systems", description: "Process management, memory management, and system programming" },
      { name: "Software Engineering", description: "Software development methodologies, project management, and testing" },
      { name: "Computer Networks", description: "Network protocols, architecture, and distributed systems" },
      { name: "Artificial Intelligence", description: "AI principles, search algorithms, and knowledge representation" },
      { name: "GUI Programming", description: "User interface design, event-driven programming, and desktop applications" }
    ],
    isCurrentEducation: false
  }
];

const Education = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const [expandedCourses, setExpandedCourses] = useState<number[]>([]);

  const toggleCourses = (id: number) => {
    setExpandedCourses(prev => 
      prev.includes(id) 
        ? prev.filter(courseId => courseId !== id)
        : [...prev, id]
    );
  };

  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="education" className="min-h-screen bg-dark-950 py-24 relative overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-4 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="text-4xl lg:text-5xl font-bold text-white mb-16 text-center"
        >
          EDUCATION
        </motion.h1>

        <div className="relative" ref={ref}>
          {/* Timeline Line */}
          <div className="absolute left-8 lg:left-1/3 transform lg:-translate-x-px h-full w-px bg-white/10">
            <motion.div
              className="absolute top-0 left-0 w-full bg-cyan-400"
              style={{ height: progressHeight }}
            />
          </div>

          {/* Timeline Entries */}
          <div className="relative space-y-20">
            {educationData.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -50 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="flex items-start relative"
              >
                {/* Institution Logo */}
                <div className="hidden lg:block w-1/3 pr-16 relative">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative w-40 h-40 rounded-xl overflow-hidden ml-auto group"
                  >
                    <div className="w-full h-full flex items-center justify-center bg-white">
                      <img
                        src={entry.logo}
                        alt={`${entry.institution} logo`}
                        className="w-full h-full object-contain"
                        style={{
                          imageRendering: '-webkit-optimize-contrast',
                          transform: 'translateZ(0)',
                          backfaceVisibility: 'hidden',
                          willChange: 'transform'
                        }}
                      />
                    </div>
                  </motion.div>
                  {/* Connecting Line */}
                  <div className="absolute right-0 top-1/2 w-16 h-px bg-gradient-to-r from-cyan-400/20 to-cyan-400" />
                </div>

                {/* Timeline Point */}
                <div className="absolute left-8 lg:left-1/3 transform lg:-translate-x-1/2 w-4 h-4">
                  <div className="w-4 h-4 rounded-full bg-dark-950 border-2 border-cyan-400 relative">
                    {entry.isCurrentEducation && (
                      <span className="absolute inset-0 rounded-full animate-ping bg-cyan-400 opacity-75" />
                    )}
                  </div>
                </div>

                {/* Content Card */}
                <div className="ml-16 lg:ml-12 lg:w-2/3">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/5 rounded-xl p-8 backdrop-blur-sm border border-white/10 shadow-xl"
                  >
                    {/* Mobile Logo */}
                    <div className="lg:hidden mb-4">
                      <div className="w-20 h-20 rounded-lg overflow-hidden">
                        <div className="w-full h-full flex items-center justify-center bg-white">
                          <img
                            src={entry.logo}
                            alt={`${entry.institution} logo`}
                            className="w-full h-full object-contain"
                            style={{
                              imageRendering: '-webkit-optimize-contrast',
                              transform: 'translateZ(0)',
                              backfaceVisibility: 'hidden',
                              willChange: 'transform'
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {entry.institution}
                        </h3>
                        <p className="text-cyan-400 text-sm mb-2">
                          {entry.duration}
                        </p>
                        <div className="flex items-center space-x-2 mb-2">
                          <GraduationCap className="text-white" size={18} />
                          <p className="text-white font-medium">
                            {entry.degree} in {entry.major}
                          </p>
                        </div>
                        <p className="flex items-center text-gray-400 text-sm mb-4">
                          <MapPin size={14} className="mr-1" />
                          {entry.location}
                        </p>
                      </div>
                    </div>

                    {/* Expandable Coursework */}
                    <div className="mt-4">
                      <button
                        onClick={() => toggleCourses(entry.id)}
                        className="flex items-center justify-between w-full text-white hover:text-cyan-400 transition-colors"
                      >
                        <span className="font-medium">Relevant Coursework</span>
                        <ChevronDown
                          className={`transform transition-transform ${
                            expandedCourses.includes(entry.id) ? 'rotate-180' : ''
                          }`}
                          size={20}
                        />
                      </button>
                      
                      <motion.div
                        initial={false}
                        animate={{
                          height: expandedCourses.includes(entry.id) ? 'auto' : 0,
                          opacity: expandedCourses.includes(entry.id) ? 1 : 0
                        }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <ul className="mt-4 space-y-3">
                          {entry.courses.map((course, idx) => (
                            <li key={idx} className="text-gray-300 text-sm">
                              <div className="flex items-start">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 mr-2 flex-shrink-0" />
                                <div>
                                  <span className="font-medium">{course.name}</span>
                                  <p className="text-gray-400 mt-1">{course.description}</p>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
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

export default Education;