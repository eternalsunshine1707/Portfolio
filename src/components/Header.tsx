import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Code2, Briefcase, GraduationCap, FolderGit2, Mail } from 'lucide-react';

const Header = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  const navItems = [
    { name: 'About Me', icon: <User size={16} />, href: 'about-me' },
    { name: 'Experience', icon: <Briefcase size={16} />, href: 'experience' },
    { name: 'Education', icon: <GraduationCap size={16} />, href: 'education' },
    { name: 'Skills', icon: <Code2 size={16} />, href: 'skills' },
    { name: 'Projects', icon: <FolderGit2 size={16} />, href: 'projects' },
    { name: 'Contact', icon: <Mail size={16} />, href: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.href));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
            setActiveSection(navItems[i].href);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.getElementById(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-dark-950/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Animated Logo */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative"
          >
            <motion.div
              whileHover="hover"
              className="relative w-12 h-12 flex items-center justify-center cursor-pointer"
            >
              {/* Background Circle */}
              <motion.div
                className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600"
                variants={{
                  hover: {
                    scale: 1.1,
                    rotate: 90,
                    borderRadius: "100%"
                  }
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Glowing Effect */}
              <motion.div
                className="absolute inset-0 rounded-xl bg-cyan-400 blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* SB Text */}
              <motion.div
                className="relative z-10 flex items-center justify-center"
                variants={{
                  hover: {
                    scale: 1.1,
                    rotate: -90,
                  }
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative">
                  <span 
                    className="text-5xl" 
                    style={{ 
                      fontFamily: 'Brush Script MT, cursive',
                      letterSpacing: '-1px',
                      color: '#050505'
                    }}
                  >
                    sb
                  </span>
                </div>
              </motion.div>

              {/* Rotating Border */}
              <motion.div
                className="absolute inset-0 rounded-xl border-2 border-white/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />

              {/* Shimmer Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{
                  x: ["-200%", "200%"],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "linear",
                }}
              />
            </motion.div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onHoverStart={() => setHoveredItem(item.name)}
                onHoverEnd={() => setHoveredItem(null)}
                className="relative"
              >
                <motion.a
                  href={`#${item.href}`}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`flex items-center space-x-2 py-2 px-3 rounded-lg group relative ${
                    activeSection === item.href 
                      ? 'text-cyan-400' 
                      : 'text-white hover:text-cyan-400'
                  } transition-colors`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.span
                    animate={{
                      rotate: hoveredItem === item.name ? 360 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.icon}
                  </motion.span>
                  <span className="text-sm font-medium relative">
                    {item.name.split('').map((letter, i) => (
                      <motion.span
                        key={i}
                        className="inline-block"
                        animate={{
                          y: hoveredItem === item.name ? [-2, 0] : 0,
                        }}
                        transition={{
                          delay: i * 0.05,
                          duration: 0.3,
                        }}
                      >
                        {letter}
                      </motion.span>
                    ))}
                  </span>
                  {(hoveredItem === item.name || activeSection === item.href) && (
                    <motion.div
                      layoutId="navHighlight"
                      className={`absolute inset-0 rounded-lg -z-10 ${
                        activeSection === item.href 
                          ? 'bg-cyan-400/10' 
                          : 'bg-white/5'
                      }`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </motion.a>
              </motion.div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white hover:text-cyan-400 transition-colors"
          >
            <div className="space-y-2">
              <motion.div
                animate={{
                  rotate: isOpen ? 45 : 0,
                  y: isOpen ? 8 : 0,
                }}
                className="w-6 h-0.5 bg-current"
              />
              <motion.div
                animate={{
                  opacity: isOpen ? 0 : 1,
                }}
                className="w-6 h-0.5 bg-current"
              />
              <motion.div
                animate={{
                  rotate: isOpen ? -45 : 0,
                  y: isOpen ? -8 : 0,
                }}
                className="w-6 h-0.5 bg-current"
              />
            </div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={`#${item.href}`}
                    onClick={(e) => scrollToSection(e, item.href)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center space-x-2 p-3 rounded-lg ${
                      activeSection === item.href
                        ? 'text-cyan-400 bg-cyan-400/10'
                        : 'text-white hover:text-cyan-400 hover:bg-white/5'
                    } transition-colors`}
                  >
                    {item.icon}
                    <span className="text-sm font-medium">{item.name}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;