import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Download, Linkedin, Github } from 'lucide-react';
import GrainyPlanet from './GrainyPlanet';
import { PROFILE_IMAGE_URL, RESUME_LINK, SOCIAL_LINKS } from '../constants';

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Parallax transformations
  const planet1Y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const planet2Y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-20">

      {/* Background Planets with Parallax */}
      <motion.div
        style={{ y: planet1Y }}
        className="absolute top-20 right-[10%] opacity-60 pointer-events-none"
      >
        <GrainyPlanet size={120} color1="#a855f7" color2="#3b0764" duration={40} />
      </motion.div>
      <motion.div
        style={{ y: planet2Y }}
        className="absolute bottom-32 left-[5%] opacity-40 pointer-events-none"
      >
        <GrainyPlanet size={200} color1="#06b6d4" color2="#164e63" duration={60} />
      </motion.div>

      <div className="relative z-10 max-w-5xl w-full grid md:grid-cols-2 gap-12 items-center">

        {/* Text Content with Parallax */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          style={{ y: textY, opacity }}
          className="order-2 md:order-1 space-y-6"
        >
          <div className="space-y-2">
            <h2 className="text-cyan-400 font-mono text-lg tracking-wider">HELLO, I AM</h2>
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
              Ayush Kumar
            </h1>
            <p className="text-xl text-gray-400 max-w-lg leading-relaxed">
              Navigating the digital universe, building stellar web experiences.
              Frontend Developer & Space Enthusiast.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href={RESUME_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-6 py-3 bg-white text-slate-950 font-bold rounded-full overflow-hidden flex items-center gap-2 hover:bg-cyan-50 hover:shadow-xl hover:shadow-cyan-500/30 transition-all duration-300"
            >
              <span>Resume</span>
              <Download size={18} />
              <div className="absolute inset-0 border-2 border-white/50 rounded-full scale-105 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"></div>
            </a>

            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-slate-800/60 backdrop-blur-xl border border-slate-700 rounded-full hover:border-cyan-400/50 hover:bg-slate-700/60 hover:shadow-lg hover:shadow-cyan-500/20 transition-all text-white"
                aria-label={link.platform}
              >
                {link.icon === 'linkedin' ? <Linkedin size={20} /> : <Github size={20} />}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Profile Image & Centerpiece with Parallax */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ y: imageY }}
          className="order-1 md:order-2 flex justify-center relative"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 group">
            {/* Spinning Rings */}
            <div className="absolute inset-0 border border-cyan-500/20 rounded-full animate-[spin_10s_linear_infinite]" />
            <div className="absolute -inset-4 border border-purple-500/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />

            {/* Image Container with Enhanced Glassmorphism */}
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-slate-800/80 shadow-[0_0_60px_rgba(6,182,212,0.4)] group-hover:shadow-[0_0_80px_rgba(6,182,212,0.6)] transition-shadow duration-500">
              <img
                src={PROFILE_IMAGE_URL}
                alt="Ayush Kumar"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
            </div>

            {/* Floating Badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -bottom-4 -right-4 bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 p-4 rounded-xl shadow-2xl shadow-cyan-500/10"
            >
              <div className="text-xs text-cyan-400 font-mono">CURRENTLY</div>
              <div className="font-bold text-white">Building Projects</div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-slate-500">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7" /></svg>
      </div>
    </section>
  );
};

export default Hero;