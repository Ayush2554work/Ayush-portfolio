import React from 'react';
import { motion } from 'framer-motion';
import { Download, Linkedin, Github, Mail, Phone, MapPin, Calendar, Code, Terminal, BarChart, Book, Headphones, Cpu, CircleDot, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PROFILE_IMAGE_URL, RESUME_LINK, SOCIAL_LINKS, PERSONAL_INFO, SKILLS, HOBBIES, LANGUAGES, SOFT_SKILLS, CODING_PROFILES } from '../constants';
import GrainyPlanet from '../components/GrainyPlanet';

const Home: React.FC = () => {
    const navigate = useNavigate();

    const getSkillColor = (category: string) => {
        const colors: Record<string, string> = {
            programming: 'from-blue-600 to-blue-400',
            ai: 'from-purple-600 to-purple-400',
            database: 'from-green-600 to-green-400',
            backend: 'from-orange-600 to-orange-400',
            frontend: 'from-pink-600 to-pink-400',
            tools: 'from-gray-600 to-gray-400',
            design: 'from-indigo-600 to-indigo-400',
            deployment: 'from-teal-600 to-teal-400',
            soft: 'from-cyan-600 to-cyan-400'
        };
        return colors[category] || 'from-slate-600 to-slate-400';
    };

    const getHobbyIcon = (iconName: string) => {
        const icons: Record<string, React.ReactNode> = {
            book: <Book size={24} />,
            headphones: <Headphones size={24} />,
            cpu: <Cpu size={24} />,
            football: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" /></svg>,
            circle: <CircleDot size={24} />,
            'trending-up': <TrendingUp size={24} />
        };
        return icons[iconName] || <Book size={24} />;
    };

    const getCodingIcon = (iconName: string) => {
        const icons: Record<string, React.ReactNode> = {
            code: <Code size={24} />,
            terminal: <Terminal size={24} />,
            'bar-chart': <BarChart size={24} />
        };
        return icons[iconName] || <Code size={24} />;
    };

    return (
        <div className="relative">
            {/* Hero Section */}
            <section className="min-h-[80vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 relative">
                {/* Interactive Background Planets */}
                <motion.div
                    className="absolute top-20 right-[10%] md:right-[15%] opacity-60 cursor-pointer"
                    whileHover={{ scale: 1.1, opacity: 0.8 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/space-game')}
                    title="Click to play Space Dodge!"
                >
                    <GrainyPlanet size={80} color1="#a855f7" color2="#3b0764" duration={40} />
                </motion.div>
                <motion.div
                    className="absolute bottom-32 left-[5%] md:left-[10%] opacity-40 cursor-pointer"
                    whileHover={{ scale: 1.15, opacity: 0.6 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => navigate('/space-game')}
                    title="Click to play Space Dodge!"
                >
                    <GrainyPlanet size={120} color1="#06b6d4" color2="#164e63" duration={60} />
                </motion.div>

                <div className="relative z-10 max-w-5xl w-full grid md:grid-cols-2 gap-12 items-center">
                    {/* Profile Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="flex justify-center relative order-1"
                    >
                        <div className="relative w-64 h-64 md:w-80 md:h-80 group">
                            <div className="absolute inset-0 border border-cyan-500/20 rounded-full animate-[spin_10s_linear_infinite]" />
                            <div className="absolute -inset-4 border border-purple-500/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />

                            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-slate-800/80 shadow-[0_0_60px_rgba(6,182,212,0.4)] group-hover:shadow-[0_0_80px_rgba(6,182,212,0.6)] transition-shadow duration-500">
                                <img
                                    src={PROFILE_IMAGE_URL}
                                    alt="Ayush Kumar"
                                    className="w-full h-full object-cover transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 to-transparent" />
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Intro Text */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="order-2 space-y-6 text-center md:text-left"
                    >
                        <div>
                            <h2 className="text-cyan-400 font-mono text-lg tracking-wider mb-2">HELLO, I'M</h2>
                            <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
                                Ayush Kumar
                            </h1>
                            <p className="text-xl text-gray-400 mt-4">
                                Computer Science Student | ML Enthusiast
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                            <a
                                href={RESUME_LINK}
                                download="Ayush_Kumar_Resume.pdf"
                                className="group relative px-6 py-3 bg-white text-slate-950 font-bold rounded-full overflow-hidden flex items-center gap-2 hover:bg-cyan-50 hover:shadow-xl hover:shadow-cyan-500/30 transition-all duration-300"
                            >
                                <span>Resume</span>
                                <Download size={18} />
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
                </div>
            </section>

            {/* About Me Section */}
            <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-8 md:p-12 shadow-2xl shadow-cyan-500/5"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 flex items-center gap-3">
                        <span className="w-2 h-8 bg-gradient-to-b from-cyan-500 to-purple-500 rounded-full shadow-lg shadow-cyan-500/50"></span>
                        About Me
                    </h2>
                    <p className="text-gray-300 text-lg leading-relaxed">
                        {PERSONAL_INFO.bio}
                    </p>
                </motion.div>
            </section>

            {/* Personal Details */}
            <section className="py-8 px-4 sm:px-6 max-w-6xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 md:p-8 shadow-2xl shadow-purple-500/5"
                >
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">Personal Details</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="flex items-start gap-3">
                            <MapPin className="text-cyan-400 mt-1 flex-shrink-0" size={20} />
                            <div>
                                <p className="text-gray-300 text-sm md:text-base">{PERSONAL_INFO.address}</p>
                                <p className="text-gray-300 text-sm md:text-base">{PERSONAL_INFO.city}</p>
                                <p className="text-gray-300 text-sm md:text-base">{PERSONAL_INFO.country}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Calendar className="text-cyan-400 flex-shrink-0" size={20} />
                            <div>
                                <p className="text-gray-400 text-xs md:text-sm">Date of Birth</p>
                                <p className="text-gray-300 font-medium text-sm md:text-base">{PERSONAL_INFO.birthDate}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone className="text-cyan-400 flex-shrink-0" size={20} />
                            <a href={`tel:${PERSONAL_INFO.phone} `} className="text-gray-300 hover:text-cyan-400 transition-colors text-sm md:text-base">
                                {PERSONAL_INFO.phone}
                            </a>
                        </div>
                        <div className="flex items-center gap-3">
                            <Mail className="text-cyan-400 flex-shrink-0" size={20} />
                            <a href={`mailto:${PERSONAL_INFO.email} `} className="text-gray-300 hover:text-cyan-400 transition-colors break-all text-sm md:text-base">
                                {PERSONAL_INFO.email}
                            </a>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Skills Section */}
            <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 flex items-center gap-3">
                        <span className="w-2 h-8 bg-gradient-to-b from-cyan-500 to-purple-500 rounded-full shadow-lg shadow-cyan-500/50"></span>
                        Technical Skills
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {SKILLS.map((skill, index) => (
                            <motion.div
                                key={skill.name}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                viewport={{ once: true }}
                                className="group relative bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-xl p-4 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300"
                            >
                                <div className={`absolute inset - 0 bg - gradient - to - br ${getSkillColor(skill.category)} opacity - 0 group - hover: opacity - 10 rounded - xl transition - opacity duration - 300`} />
                                <p className="text-sm font-medium text-white relative z-10">{skill.name}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Hobbies Section */}
            <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 flex items-center gap-3">
                        <span className="w-2 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full shadow-lg shadow-purple-500/50"></span>
                        Hobbies & Interests
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {HOBBIES.map((hobby, index) => (
                            <motion.div
                                key={hobby.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-xl p-6 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 flex flex-col items-center gap-3"
                            >
                                <div className="text-purple-400">
                                    {getHobbyIcon(hobby.icon)}
                                </div>
                                <p className="text-white font-medium text-center">{hobby.name}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Languages & Soft Skills */}
            <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto relative z-10">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Languages */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-8 shadow-2xl"
                    >
                        <h3 className="text-2xl font-bold text-white mb-6">Languages</h3>
                        <div className="space-y-4">
                            {LANGUAGES.map((lang) => (
                                <div key={lang.name} className="flex justify-between items-center">
                                    <span className="text-gray-300 font-medium">{lang.name}</span>
                                    <span className="text-cyan-400 text-sm">{lang.proficiency}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Soft Skills */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-8 shadow-2xl"
                    >
                        <h3 className="text-2xl font-bold text-white mb-6">Soft Skills</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {SOFT_SKILLS.map((skill, index) => (
                                <motion.div
                                    key={skill}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    viewport={{ once: true }}
                                    className="bg-slate-800/40 border border-slate-700/50 rounded-lg p-3 text-center text-gray-300 text-sm hover:border-cyan-500/50 hover:text-cyan-300 transition-all"
                                >
                                    {skill}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Coding Profiles */}
            <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto relative z-10 mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 flex items-center gap-3">
                        <span className="w-2 h-8 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full shadow-lg shadow-cyan-500/50"></span>
                        Coding Profiles
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {CODING_PROFILES.map((profile, index) => (
                            <motion.a
                                key={profile.platform}
                                href={profile.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-8 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="text-cyan-400 group-hover:scale-110 transition-transform">
                                        {getCodingIcon(profile.icon)}
                                    </div>
                                    <svg className="w-5 h-5 text-gray-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" fill="none" stroke="current Color" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{profile.platform}</h3>
                                <p className="text-gray-400 text-sm">@{profile.username}</p>
                            </motion.a>
                        ))}
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default Home;
