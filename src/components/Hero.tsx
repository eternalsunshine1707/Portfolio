import { motion, useAnimationControls } from 'framer-motion';
import { FileText, Github } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Portfolio {
  [key: string]: string | boolean;
}

const sravani: Portfolio = {
  'Data Engineer': '',
  'Pipeline Architect': '',
  'ETL Optimizer': '',
  'Problem Solver': '',
  'Artistic Soul': '',
  'Writer': '',
  'Eternal Dreamer': '',
  'Sugar, Spice & Everything Nice': '',
  loading: true // Forever Evolving...
};

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const roles = Object.keys(sravani).filter(key => key !== 'loading');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % roles.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <section className="min-h-screen pt-20 bg-dark-950 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-[calc(100vh-5rem)] gap-12">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full lg:w-[60%]"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-8"
            >
              Hi! I'm{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-300">
                Sravani B
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-6 text-base text-gray-300 leading-relaxed mb-12 max-w-3xl"
            >
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                I enjoy creating things that live on the Internet. With over 4 years of experience in Data Engineering from my tenure at DXC Technology, I bring a strong foundation in building efficient data solutions. Currently, I'm pursuing my Master's in Computer Science at George Washington University, to continue pushing the boundaries of what's possible. I'm actively exploring full-time Data Engineering roles to kick off after graduation.
              </motion.p>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                Believe your data deserves better engineering or are you looking for a Data Engineer who thinks beyond the pipeline!? You are in the right place. Let's talk!
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center gap-6"
            >
              <motion.a
                href="/Sravani_B_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-cyan-400 to-cyan-500 text-dark-950 rounded-lg font-semibold hover:from-cyan-300 hover:to-cyan-400 transition-all duration-300 shadow-lg shadow-cyan-500/25 w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FileText className="w-5 h-5" />
                <span>Download Resume</span>
              </motion.a>

              <div className="flex items-center gap-4">
                <motion.a
                  href="mailto:sravanistar99@gmail.com"
                  className="p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors relative group"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
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
                  <svg
                    className="w-6 h-6"
                    fill="#0A66C2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
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
                  className="p-3 bg-white/5 hover:bg-white/10 rounded-lg text-white hover:text-cyan-400 transition-colors relative group"
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
            </motion.div>
          </motion.div>

          {/* Right Content - Code Block */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-full lg:w-[40%] perspective lg:pl-12"
          >
            <motion.div
              whileHover={{ rotateY: 10, scale: 1.02 }}
              className="w-full bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 relative overflow-hidden transform transition-transform duration-300"
            >
              {/* Animated Background Grid */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,transparent_49%,rgba(34,211,238,0.1)_50%,transparent_51%,transparent_100%)] bg-[length:40px_40px] animate-[grid_2s_linear_infinite]" />
              
              {/* Glowing Line Effect */}
              <div className="absolute h-px w-full top-0 left-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-shimmer" />
              
              <div className="font-mono text-sm relative">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-emerald-400"
                >
                  // Portfolio Interface
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <span className="text-purple-400">const</span>{' '}
                  <span className="text-blue-400">sravani</span>
                  <span className="text-white">:</span>{' '}
                  <span className="text-yellow-400">Array</span>
                  <span className="text-cyan-400">&lt;</span>
                  <span className="text-yellow-400">Portfolio</span>
                  <span className="text-cyan-400">&gt;</span>{' '}
                  <span className="text-white">=</span>{' '}
                  <span className="text-white">[</span>
                </motion.div>

                <div className="space-y-2 pl-4">
                  {roles.map((role, index) => (
                    <motion.div
                      key={role}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ 
                        delay: 0.6 + (index * 0.1),
                        duration: 0.3
                      }}
                      className="flex items-center"
                    >
                      <span className="text-orange-400">'</span>
                      <span className={`${
                        index === currentIndex ? 'text-white' : 'text-gray-400'
                      }`}>
                        {role}
                        {index === currentIndex && (
                          <motion.span
                            initial={{ scaleX: 1 }}
                            animate={{ scaleX: 0 }}
                            transition={{ 
                              duration: 0.5, 
                              repeat: Infinity, 
                              repeatType: "reverse" 
                            }}
                            className="absolute -right-4 top-1/2 -translate-y-1/2 w-2 h-4 bg-cyan-400"
                          />
                        )}
                      </span>
                      <span className="text-orange-400">'</span>
                      <span className="text-white">,</span>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 + (roles.length * 0.1) }}
                  className="pl-4 mt-2"
                >
                  <span className="text-blue-400">loading</span>
                  <span className="text-white">:</span>{' '}
                  <span className="text-orange-400">true</span>{' '}
                  <span className="text-emerald-400">// Forever Evolving...</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 + (roles.length * 0.1) }}
                  className="text-white"
                >
                  ];
                </motion.div>
              </div>

              {/* Matrix-like Rain Effect */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ 
                      y: ['0%', '100%'],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.2,
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                    className="absolute w-px h-20 bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
                    style={{ left: `${i * 10}%` }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 1 }}
          className="absolute w-[500px] h-[500px] -top-48 -right-24 bg-cyan-500/20 rounded-full blur-[120px]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute w-[400px] h-[400px] top-1/3 -left-24 bg-purple-500/20 rounded-full blur-[100px]"
        />
      </div>
    </section>
  );
};

export default Hero;