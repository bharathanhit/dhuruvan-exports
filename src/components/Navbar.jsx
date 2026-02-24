import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShieldCheck } from 'lucide-react';
import { NavHashLink } from 'react-router-hash-link';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            // Calculate scroll progress
            const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalScroll) * 100;
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/#' },
        { name: 'Products', href: '/#products' },
        { name: 'About', href: '/#about' },
        { name: 'Contact', href: '/#contact' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'glass py-3 shadow-2xl' : 'bg-transparent py-6'}`}>
            {/* Scroll Progress Bar */}
            <motion.div
                className="absolute bottom-0 left-0 h-[2px] bg-secondary origin-left z-50"
                style={{ width: `${scrollProgress}%` }}
            />

            <div className="container flex justify-between items-center">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 group cursor-pointer"
                >
                    <span className={`text-xl md:text-3xl font-black tracking-tighter transition-colors duration-500 ${isScrolled ? 'text-primary' : 'text-white'}`}>
                        DHURUVAN <span className="text-secondary italic">EXPORTS</span>
                    </span>
                </motion.div>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-10 items-center">
                    {navLinks.map((link, i) => (
                        <motion.div
                            key={link.name}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <NavHashLink
                                smooth
                                to={link.href}
                                className={`relative font-bold text-sm uppercase tracking-widest transition-colors duration-500 group ${isScrolled ? 'text-primary' : 'text-white'} hover:text-secondary`}
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-secondary transition-all duration-300 group-hover:w-full" />
                            </NavHashLink>
                        </motion.div>
                    ))}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <NavHashLink
                            smooth
                            to="/#contact"
                            className={`btn px-6 py-3 text-xs font-black tracking-[0.2em] uppercase shadow-lg transition-all duration-500 ${isScrolled ? 'btn-primary' : 'bg-white text-primary hover:bg-secondary hover:text-white'}`}
                        >
                            Start Partnership
                        </NavHashLink>
                    </motion.div>
                    <Link
                        to="/admin"
                        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 hover:bg-secondary/10 ${isScrolled ? 'text-primary/30 hover:text-secondary' : 'text-white/30 hover:text-white'}`}
                        title="Admin Panel"
                    >
                        <ShieldCheck size={16} />
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button className={`md:hidden w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-500 ${isScrolled ? 'bg-primary/5 text-primary' : 'bg-white/10 text-white border border-white/20'}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden bg-white/95 backdrop-blur-xl border-t shadow-2xl overflow-hidden"
                    >
                        <div className="container py-10 flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <NavHashLink
                                    smooth
                                    key={link.name}
                                    to={link.href}
                                    className="text-2xl font-black text-primary uppercase tracking-tighter hover:text-secondary transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.name}
                                </NavHashLink>
                            ))}
                            <NavHashLink smooth to="/#contact" className="btn btn-primary w-full py-5 text-center text-lg font-black uppercase tracking-widest" onClick={() => setIsMenuOpen(false)}>
                                Contact Us
                            </NavHashLink>
                            <Link
                                to="/admin"
                                className="flex items-center gap-3 text-gray-400 text-sm font-bold uppercase tracking-widest hover:text-secondary transition-colors pt-4 border-t border-gray-100 mt-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <ShieldCheck size={16} />
                                Admin
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};


export default Navbar;


