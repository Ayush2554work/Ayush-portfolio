import React from 'react';
import { motion } from 'framer-motion';

interface GrainyPlanetProps {
  size: number;
  color1: string;
  color2: string;
  className?: string;
  duration?: number;
}

const GrainyPlanet: React.FC<GrainyPlanetProps> = ({ size, color1, color2, className, duration = 20 }) => {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* Orbit Ring (Optional decorative) */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: duration * 1.5, ease: "linear" }}
        className="absolute -inset-8 border border-white/5 rounded-full"
      />
      
      {/* The Planet */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: duration, ease: "linear" }}
        className="relative w-full h-full rounded-full overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${color1}, ${color2})`,
        }}
      >
        {/* Grain Overlay */}
        <div 
          className="absolute inset-0 opacity-40 mix-blend-overlay"
          style={{ filter: 'url(#noiseFilter)' }}
        ></div>
        
        {/* Shadow Overlay for 3D effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/80 rounded-full" />
      </motion.div>
    </div>
  );
};

export default GrainyPlanet;