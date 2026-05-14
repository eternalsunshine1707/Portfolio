import { motion } from 'framer-motion';

const GlobalBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" style={{ background: '#050505' }}>
      {/* Perspective scrolling grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(107,171,138,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(107,171,138,0.06) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridScroll 18s linear infinite',
          transformOrigin: 'center top',
          transform: 'perspective(600px) rotateX(12deg)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
        }}
      />

      {/* Floating glow orbs */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 600,
          height: 600,
          top: '-10%',
          right: '-5%',
          background: 'radial-gradient(circle, rgba(107,171,138,0.18) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{ x: [0, 30, 0], y: [0, -40, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute rounded-full"
        style={{
          width: 500,
          height: 500,
          bottom: '10%',
          left: '-8%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{ x: [0, -25, 0], y: [0, 35, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      <motion.div
        className="absolute rounded-full"
        style={{
          width: 350,
          height: 350,
          top: '45%',
          left: '45%',
          background: 'radial-gradient(circle, rgba(14,165,233,0.10) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }}
        animate={{ x: [0, 20, -20, 0], y: [0, -30, 20, 0], scale: [1, 0.95, 1.05, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />

      {/* Pulsing center radial glow */}
      <motion.div
        className="absolute"
        style={{
          width: '70%',
          height: '40%',
          top: '30%',
          left: '15%',
          background: 'radial-gradient(ellipse, rgba(107,171,138,0.05) 0%, transparent 70%)',
        }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
};

export default GlobalBackground;
