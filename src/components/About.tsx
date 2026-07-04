import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRef, useEffect, useState } from 'react';

const SLIDES = [
  { src: './Kutty1.jpeg', alt: 'Kutty' },
  { src: './Kutty2.jpeg', alt: 'Kutty scaring the reptile!' },
  { src: './Kutty3.jpeg', alt: 'Delusional Kutty' },
  { src: './Kutty4.jpeg', alt: 'Dramebaaz Kutty' },
  { src: './Kutty5.jpeg', alt: 'WTF Kutty' },
  { src: './Kutty6.jpeg', alt: 'WTF Kutty' },
  { src: './Kutty7.JPG', alt: 'WTF Kutty' },
]
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

  // Slideshow state
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlide((prev) => (prev + 1) % SLIDES.length);
    }, 4000); // Changed interval to 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about-me" className="min-h-screen py-24 overflow-hidden" ref={containerRef}>
      <div className="w-full px-8 xl:px-12">
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
            className="portrait-container w-full lg:w-[30%] h-auto relative z-10"
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
              {/* Slideshow */}
              <motion.img
                key={SLIDES[slide].src}
                src={SLIDES[slide].src}
                alt={SLIDES[slide].alt}
                className="w-full h-[440px] md:h-[560px] lg:h-[680px] object-cover object-center transition-all duration-500"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.7 }}
              />
              {/* Dots navigation */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    className={`w-2.5 h-2.5 rounded-full ${slide === idx ? 'bg-[#3a2f2f]' : 'bg-white/30'} border-none outline-none transition-colors`}
                    style={{ boxShadow: slide === idx ? '0 0 6px #3a2f2f' : undefined }}
                    onClick={() => setSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>

          <div className="lg:w-[70%] lg:pl-4" ref={ref}>
            <div className="w-full">
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
                className="text-[#3a2f2f] text-xl font-medium mb-6"
              >
                I'm graduate student pursuing Master's in Computer Science at The George Washington University, and I'm actively exploring new opportunities as a Data Engineer. This website was made to showcase everything I can do and plan to do. Don't judge my writing based on this section, though - this is by far my shoddiest work yet!
              </motion.h3>

              <div className="space-y-6">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-white text-xl leading-relaxed text-justify"
                >
                  I got into data engineering because I'm what you might call a <span className="highlight">pseudo-perfectionist</span> (is that even a thing!?). I can't stand messy data, clunky processes, or things that just don't "look right." If something doesn't work smoothly or doesn't look great, it bugs me to no end. It's like an itch I have to scratch. So, naturally, I found myself on this path where I get to make things that are not just functional but downright fabulous. <span className="highlight">Crafting pipelines</span>, <span className="highlight">optimizing data flows</span>, and ensuring everything "fits perfectly" has become my way of bringing order to chaos, and that's the energy I bring to every project - getting it to look and work just right (and maybe showing off a little).
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-white text-xl leading-relaxed text-justify"
                >
                  My love for development, though, started way before this pseudo-perfectionist epiphany. I mean, think about it - "<span className="text-[#3a2f2f]">int i = 10;</span>" magically makes a whole integer? Wow! Watching lines of code morph into apps like Facebook or Amazon? Pure magic. That's when I knew: I wanted to be part of this magic, creating things people actually use and love.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-white text-xl leading-relaxed text-justify"
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
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#3a2f2f] to-[#3a2f2f] text-dark-950 rounded-lg font-semibold hover:from-[#3a2f2f] hover:to-[#3a2f2f] transition-all duration-300 shadow-lg shadow-[#3a2f2f]/25"
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