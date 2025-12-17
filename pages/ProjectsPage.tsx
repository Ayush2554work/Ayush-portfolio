import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Calendar, CheckCircle } from 'lucide-react';
import Projects from '../components/Projects';
import { ACHIEVEMENTS } from '../constants';

const ProjectsPage: React.FC = () => {
    return (
        <div className="min-h-screen">
            {/* Projects Section */}
            <Projects />

            {/* Achievements Section */}
            <section className="py-24 px-4 sm:px-6 max-w-6xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4 flex items-center gap-3">
                            <Trophy className="text-yellow-500" size={40} />
                            Achievements & Hackathons
                        </h2>
                        <p className="text-gray-400 text-lg">
                            Recognition and accomplishments in competitive tech events
                        </p>
                    </div>

                    <div className="space-y-8">
                        {ACHIEVEMENTS.map((achievement, index) => (
                            <motion.div
                                key={achievement.id}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className="group relative bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl overflow-hidden hover:border-yellow-500/50 hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-500"
                            >
                                {/* Decorative gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative p-8 md:p-10">
                                    {/* Header */}
                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                                        <div>
                                            <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-yellow-400 transition-colors mb-2">
                                                {achievement.title}
                                            </h3>
                                            {achievement.subtitle && (
                                                <p className="text-purple-400 font-medium">{achievement.subtitle}</p>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-400 bg-slate-800/50 rounded-full px-4 py-2 w-fit">
                                            <Calendar size={16} />
                                            <span className="text-sm font-mono">{achievement.period}</span>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-gray-300 text-lg leading-relaxed mb-6">
                                        {achievement.description}
                                    </p>

                                    {/* Projects List */}
                                    {achievement.projects && achievement.projects.length > 0 && (
                                        <div className="space-y-3">
                                            {achievement.projects.map((project, idx) => (
                                                <motion.div
                                                    key={idx}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                                                    viewport={{ once: true }}
                                                    className="flex items-start gap-3 bg-slate-800/30 backdrop-blur-sm rounded-lg p-4 border border-slate-700/30"
                                                >
                                                    <CheckCircle className="text-green-400 flex-shrink-0 mt-0.5" size={20} />
                                                    <p className="text-gray-300">{project}</p>
                                                </motion.div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Glow effect on hover */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl" />
                                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Decorative background elements */}
                <div className="absolute top-1/4 right-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none -z-10" />
                <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none -z-10" />
            </section>
        </div>
    );
};

export default ProjectsPage;
