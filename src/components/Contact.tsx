import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Github, 
  Linkedin, 
  Mail,
  MapPin,
  ExternalLink,
  Sparkles
} from 'lucide-react';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const sparkleVariants = {
    animate: {
      rotate: [0, 360],
      scale: [1, 1.2, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6 text-cyan-400" />,
      title: "Email",
      value: "sravanistar99@gmail.com",
      link: "mailto:sravanistar99@gmail.com",
      description: "Send me an email anytime!"
    },
    {
      icon: <Linkedin className="w-6 h-6 text-cyan-400" />,
      title: "LinkedIn",
      value: "linkedin.com/in/sravaniofficial",
      link: "https://www.linkedin.com/in/sravaniofficial/",
      description: "Let's connect professionally"
    },
    {
      icon: <Github className="w-6 h-6 text-cyan-400" />,
      title: "GitHub",
      value: "github.com/eternalsunshine1707",
      link: "https://github.com/eternalsunshine1707",
      description: "Check out my code repositories"
    },
    {
      icon: <MapPin className="w-6 h-6 text-cyan-400" />,
      title: "Location",
      value: "Arlington, Virginia",
      description: "Available for local & remote opportunities"
    }
  ];

  return (
    <section id="contact" className="min-h-screen bg-dark-950 py-24 relative overflow-hidden" ref={ref}>
      {/* Background Decoration */}
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
          className="absolute w-[500px] h-[500px] -bottom-48 -right-24 bg-cyan-500/20 rounded-full blur-[120px]"
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
          className="absolute w-[400px] h-[400px] top-1/3 -left-24 bg-purple-500/20 rounded-full blur-[100px]"
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <motion.div variants={sparkleVariants} animate="animate">
                <Sparkles className="w-8 h-8 text-cyan-400" />
              </motion.div>
              <h1 className="text-4xl lg:text-5xl font-bold text-white">
                GET IN TOUCH
              </h1>
              <motion.div variants={sparkleVariants} animate="animate">
                <Sparkles className="w-8 h-8 text-cyan-400" />
              </motion.div>
            </div>
            <div className="flex flex-col items-center gap-4">
              <motion.p 
                className="text-gray-400 max-w-2xl"
                variants={itemVariants}
              >
                I'm currently on the lookout for new internship or full-time opportunities, and I'm excited to connect!
              </motion.p>
              <motion.p 
                className="text-gray-400 max-w-2xl"
                variants={itemVariants}
              >
                Whether you have a question, a potential collaboration, or just want to say hi, don't hesitate to reach out. 
                I'll do my best to get back to you quickly - We might just create something amazing together!
              </motion.p>
            </div>
          </motion.div>

          {/* Contact Methods Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 relative group overflow-hidden"
              >
                {/* Animated Border */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{
                    background: [
                      "linear-gradient(0deg, transparent 0%, cyan 50%, transparent 100%)",
                      "linear-gradient(360deg, transparent 0%, cyan 50%, transparent 100%)",
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />

                <div className="flex items-start gap-4">
                  <div className="bg-cyan-400/20 p-3 rounded-lg group-hover:bg-cyan-400/30 transition-colors">
                    {method.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-medium mb-1">{method.title}</h3>
                    {method.link ? (
                      <motion.a
                        href={method.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-2 group/link"
                        whileHover={{ x: 5 }}
                      >
                        <span>{method.value}</span>
                        <ExternalLink size={14} className="opacity-0 group-hover/link:opacity-100 transition-opacity" />
                      </motion.a>
                    ) : (
                      <p className="text-gray-400">{method.value}</p>
                    )}
                    <p className="text-sm text-gray-500 mt-2">{method.description}</p>
                  </div>
                </div>

                {/* Hover Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 transition-opacity duration-300"
                  whileHover={{ opacity: 0.2 }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;