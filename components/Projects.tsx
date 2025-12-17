import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { PROJECTS } from '../constants';
import CursorFollower from './CursorFollower';

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const headerY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const cardsY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={sectionRef} id="projects" className="py-24 relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div style={{ y: headerY }} className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="w-2 h-8 bg-cyan-500 rounded-full inline-block shadow-lg shadow-cyan-500/50"></span>
            Featured Missions
          </h2>
          <p className="text-gray-400 max-w-2xl text-lg ml-5">
            A collection of {PROJECTS.length} innovative projects spanning AI/ML, IoT, web development, and data science.
          </p>
        </motion.div>

        <motion.div style={{ y: cardsY }} className="grid md:grid-cols-2 gap-8">
          {PROJECTS.map((project, index) => (
            <CursorFollower key={project.id} strength={30}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl overflow-hidden hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500"
              >
                {/* Image Preview with Enhanced Glassmorphism Overlay */}
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent z-10 group-hover:opacity-75 transition-opacity" />
                  <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm group-hover:bg-transparent group-hover:backdrop-blur-none transition-all z-10" />
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Shimmer effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-20" />
                </div>

                {/* Content with Enhanced Styling */}
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex gap-3">
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-lg bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-cyan-500/50 hover:bg-slate-700/50 text-gray-400 hover:text-white hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
                          title="Live View"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink size={18} />
                        </a>
                      )}
                      <a
                        href={project.repoLink}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-lg bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-cyan-500/50 hover:bg-slate-700/50 text-gray-400 hover:text-white hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
                        title="View Code"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github size={18} />
                      </a>
                    </div>
                  </div>

                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-mono px-3 py-1.5 rounded-full bg-cyan-900/30 backdrop-blur-sm text-cyan-300 border border-cyan-900/50 hover:bg-cyan-900/40 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Glow effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl" />
                </div>
              </motion.div>
            </CursorFollower>
          ))}
        </motion.div>

        {/* Decorative background elements */}
        < div className="absolute top-1/4 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
      </div>
    </section>
  );
};

export default Projects;