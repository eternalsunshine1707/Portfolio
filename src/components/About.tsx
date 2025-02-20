import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRef } from 'react';

const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1.02, 0.98]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-1, 1]);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section id="about-me" className="min-h-screen bg-dark-950 py-24 overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-4 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="text-4xl lg:text-5xl font-bold text-white mb-16 text-center"
        >
          ABOUT ME
        </motion.h1>

        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ duration: 2 }}
            style={{ y, opacity }}
            className="portrait-container w-full lg:w-[30%] h-auto relative bg-dark-950"
          >
            <motion.div
              initial={{ scale: 0.95, x: -20, opacity: 0 }}
              animate={{ 
                scale: inView ? 1 : 0.95, 
                x: inView ? 0 : -20,
                opacity: inView ? 1 : 0
              }}
              transition={{ 
                duration: 1.5, 
                ease: "easeOut",
                opacity: { duration: 2 }
              }}
              className="floating-image h-full relative overflow-hidden rounded-2xl"
              style={{ 
                scale,
                rotateZ: rotate
              }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
            >
              <motion.img
                src="/Kutty.jpeg"
                alt="Portrait"
                className="w-full object-cover transition-all duration-300"
                style={{ height: '100vh' }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.5 }
                }}
              />
              <div className="gradient-overlay" />
            </motion.div>
          </motion.div>

          <div className="lg:w-[70%] lg:pl-4" ref={ref}>
            <div className="w-full max-w-4xl">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
                transition={{ duration: 0.6 }}
                className="text-2xl lg:text-3xl font-bold text-white mb-3"
              > <br></br>
                Hey there!
              </motion.h2>

              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-cyan-400 text-sm font-medium mb-6"
              >
                I'm graduate student pursuing Master's in Computer Science at The George Washington University, and I'm actively exploring new opportunities as a Data Engineer. This website was made to showcase everything I can do and plan to do. Don't judge my writing based on this section, though - this is by far my shoddiest work yet!
              </motion.h3>

              <div className="space-y-6">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-white text-sm leading-relaxed text-justify"
                >
                  I got into data engineering because I'm what you might call a <span className="highlight">pseudo-perfectionist</span> (is that even a thing!?). I can't stand messy data, clunky processes, or things that just don't "look right." If something doesn't work smoothly or doesn't look great, it bugs me to no end. It's like an itch I have to scratch. So, naturally, I found myself on this path where I get to make things that are not just functional but downright fabulous. <span className="highlight">Crafting pipelines</span>, <span className="highlight">optimizing data flows</span>, and ensuring everything "fits perfectly" has become my way of bringing order to chaos, and that's the energy I bring to every project - getting it to look and work just right (and maybe showing off a little).
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-white text-sm leading-relaxed text-justify"
                >
                  My love for development, though, started way before this pseudo-perfectionist epiphany. I mean, think about it - "<span className="text-cyan-400">int i = 10;</span>" magically makes a whole integer? Wow! Watching lines of code morph into apps like Facebook or Amazon? Pure magic. That's when I knew: I wanted to be part of this magic, creating things people actually use and love.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-white text-sm leading-relaxed text-justify"
                >
                  I created this website to showcase my work, my passion for problem-solving, and, above all, my love for building solutions that matter. Through this, I hope to make it easier for you to connect with me. If you like what you see, head over to the contact section and drop me a message - I'd love to hear from you!
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-8"
              >
                <a 
                  href="#contact" 
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-400 to-cyan-500 text-dark-950 rounded-lg font-semibold hover:from-cyan-300 hover:to-cyan-400 transition-all duration-300 shadow-lg shadow-cyan-500/25"
                >
                  Let's Connect
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;