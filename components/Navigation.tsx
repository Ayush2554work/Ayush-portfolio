import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navigation: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center backdrop-blur-xl bg-slate-950/70 border-b border-white/10 shadow-lg shadow-cyan-500/5">
            <NavLink to="/" className="text-xl font-bold font-mono tracking-tighter text-white hover:text-cyan-400 transition-colors z-50">
                ayush<span className="text-cyan-500">.kumar</span>
            </NavLink>

            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-6 text-sm font-medium text-gray-300">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `hover:text-cyan-400 transition-colors ${isActive ? 'text-cyan-400' : ''}`
                    }
                >
                    Home
                </NavLink>
                <NavLink
                    to="/projects"
                    className={({ isActive }) =>
                        `hover:text-cyan-400 transition-colors ${isActive ? 'text-cyan-400' : ''}`
                    }
                >
                    Projects
                </NavLink>
                <NavLink
                    to="/certifications"
                    className={({ isActive }) =>
                        `hover:text-cyan-400 transition-colors ${isActive ? 'text-cyan-400' : ''}`
                    }
                >
                    Certifications
                </NavLink>
                <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                        `hover:text-cyan-400 transition-colors ${isActive ? 'text-cyan-400' : ''}`
                    }
                >
                    Contact
                </NavLink>
            </div>

            {/* Mobile Hamburger Button */}
            <button
                onClick={toggleMenu}
                className="md:hidden z-50 text-white hover:text-cyan-400 transition-colors"
                aria-label="Toggle menu"
            >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Mobile Menu */}
            <div
                className={`fixed top-0 right-0 h-screen w-64 bg-slate-950/95 backdrop-blur-xl border-l border-white/10 transform transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex flex-col gap-6 mt-20 px-8 text-base font-medium text-gray-300">
                    <NavLink
                        to="/"
                        onClick={closeMenu}
                        className={({ isActive }) =>
                            `hover:text-cyan-400 transition-colors py-2 ${isActive ? 'text-cyan-400' : ''}`
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/projects"
                        onClick={closeMenu}
                        className={({ isActive }) =>
                            `hover:text-cyan-400 transition-colors py-2 ${isActive ? 'text-cyan-400' : ''}`
                        }
                    >
                        Projects
                    </NavLink>
                    <NavLink
                        to="/certifications"
                        onClick={closeMenu}
                        className={({ isActive }) =>
                            `hover:text-cyan-400 transition-colors py-2 ${isActive ? 'text-cyan-400' : ''}`
                        }
                    >
                        Certifications
                    </NavLink>
                    <NavLink
                        to="/contact"
                        onClick={closeMenu}
                        className={({ isActive }) =>
                            `hover:text-cyan-400 transition-colors py-2 ${isActive ? 'text-cyan-400' : ''}`
                        }
                    >
                        Contact
                    </NavLink>
                </div>
            </div>

            {/* Mobile Menu Backdrop */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden z-40"
                    onClick={closeMenu}
                />
            )}
        </nav>
    );
};

export default Navigation;
