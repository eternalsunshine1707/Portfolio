import React, { useState } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const skills = [
  "Python", "SQL", "AWS", "Spark", "PySpark", "Airflow", 
  "Snowflake", "Databricks", "ETL", "Data Warehousing",
  "Docker", "Kubernetes", "Git", "Jenkins", "HTML",
  "Data Modeling", "CSS", "Big Data", "Hadoop",
  "JavaScript", "React", "MongoDB", "Redshift", "Glue",
  "Machine Learning", "Golang", "Data Analytics", "C++",
  "Shell Scripting", "Linux", "R", "CI/CD", "Lambda",
  "EMR"
];

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const controls = useAnimationControls();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2
      }
    }
  };

  const skillVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.8
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <section id="skills" className="min-h-screen bg-dark-950 py-24 relative overflow-hidden" ref={ref}>
      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
            rotate: [0, 90, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear"
          }}
          className="absolute w-[800px] h-[800px] -top-96 -right-96 bg-cyan-500/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.15, 0.1],
            rotate: [0, -90, 0]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear"
          }}
          className="absolute w-[600px] h-[600px] top-1/3 -left-48 bg-purple-500/10 rounded-full blur-[100px]"
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h1 
            className="text-4xl lg:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            TECHNICAL EXPERTISE
          </motion.h1>
          <motion.p 
            className="text-gray-400 max-w-4xl mx-auto px-4"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Welcome to my tech toolkit! While my expertise lies in Data Engineering, I've explored each of these technologies at some point & have thoroughly enjoyed creating with them. Sure, I won't claim to be a guru in everything (let's keep it real!), but <span className="text-cyan-400 font-medium">here's my secret sauce</span>: Once you truly get what a tool is meant for and why you'd use it, figuring out how is just a matter of resourceful problem-solving! Besides, in tech, knowing how to find the right answers is often more valuable than memorizing them all!
          </motion.p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Skills Tags */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="lg:w-3/4"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  variants={skillVariants}
                  onHoverStart={() => setHoveredSkill(skill)}
                  onHoverEnd={() => setHoveredSkill(null)}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                  className="group"
                >
                  <motion.div
                    className="bg-[#F0F4F8] bg-opacity-5 backdrop-blur-sm rounded-xl p-4 h-full flex items-center justify-center text-center transition-all duration-300 hover:bg-opacity-10 border border-white/5 hover:border-cyan-400/30 shadow-lg hover:shadow-cyan-400/5 relative overflow-hidden"
                    animate={{
                      boxShadow: hoveredSkill === skill 
                        ? "0 0 20px rgba(34,211,238,0.2)" 
                        : "0 0 0 rgba(34,211,238,0)"
                    }}
                  >
                    {/* Animated background gradient */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      animate={{
                        background: [
                          "linear-gradient(45deg, transparent 0%, rgba(34,211,238,0.1) 50%, transparent 100%)",
                          "linear-gradient(45deg, transparent 100%, rgba(34,211,238,0.1) 50%, transparent 0%)",
                        ]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    />
                    
                    <span className="text-gray-300 group-hover:text-cyan-400 transition-colors duration-300 font-medium relative z-10">
                      {skill}
                    </span>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side Content */}
          <div className="lg:w-1/4 space-y-6">
            {/* Experience Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-xl p-6 text-center border border-white/10 relative overflow-hidden group"
            >
              <motion.div
                animate={{
                  opacity: [0.1, 0.2, 0.1],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10"
              />
              <motion.div
                className="relative z-10"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <motion.span
                  className="text-2xl mb-2 block"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  ⚡
                </motion.span>
                <motion.div
                  className="text-3xl font-bold text-cyan-400 mb-2"
                  whileHover={{ scale: 1.1 }}
                >
                  4+
                </motion.div>
                <div className="text-sm text-white">
                  Years of Experience
                </div>
              </motion.div>
            </motion.div>

            {/* Certification */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-xl p-6 border border-white/10"
            >
              <motion.h3
                className="text-lg font-bold text-cyan-400 mb-4 text-center"
                whileHover={{ scale: 1.05 }}
              >
                Certifications
              </motion.h3>
              <motion.a
                href="https://www.credly.com/badges/aws-certified-cloud-practitioner"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="block"
              >
                <motion.div
                  className="relative group"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.img
                    src="/AWS-Certified-Cloud-Practitioner_badge.634f8a21af2e0e956ed8905a72366146ba22b74c.png"
                    alt="AWS Certified Cloud Practitioner"
                    className="w-48 h-48 mx-auto"
                    whileHover={{ 
                      scale: 1.1,
                      rotate: [0, 5, -5, 0],
                      transition: { duration: 0.5 }
                    }}
                  />
                  <motion.div
                    className="mt-4 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h4 className="text-white font-medium">AWS Certified Cloud Practitioner</h4>
                    <p className="text-gray-400 text-sm mt-1">Issued by Amazon Web Services</p>
                  </motion.div>
                </motion.div>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;