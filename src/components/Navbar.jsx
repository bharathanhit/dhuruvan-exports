import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShieldCheck } from 'lucide-react';
import { NavHashLink } from 'react-router-hash-link';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
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
        { name: 'Services', href: '/services' },
        { name: 'Certificates', href: '/certificates' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/#contact' },
    ];

    const isSubPage = location.pathname !== '/';

    return (
        <nav className={`fixed w-full z-50 transition-all duration-500 ${(isScrolled || isSubPage) ? 'bg-white py-4 shadow-xl border-b border-slate-100' : 'bg-transparent py-8'}`}>
            {/* Scroll Progress Bar */}
            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-slate-100/10">
                <motion.div
                    className="h-full bg-secondary origin-left shadow-[0_0_10px_rgba(30,158,84,0.5)]"
                    style={{ scaleX: scrollProgress / 100 }}
                />
            </div>

            <div className="container px-6 flex justify-between items-center">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <NavHashLink smooth to="/#" className="flex items-center gap-2 group">
                        <span className={`text-2xl md:text-3xl font-black tracking-tighter transition-colors duration-500 ${(isScrolled || isSubPage) ? 'text-primary' : 'text-white'}`}>
                            DHURUVAN <span className="text-secondary italic">EXPORTS</span>
                        </span>
                    </NavHashLink>
                </motion.div>

                {/* Desktop Menu */}
                <div className="hidden lg:flex gap-12 items-center">
                    <div className="flex gap-10 items-center">
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
                                    className={`relative font-black text-[11px] uppercase tracking-[0.2em] transition-colors duration-500 group ${(isScrolled || isSubPage) ? 'text-slate-600' : 'text-white/80'} hover:text-secondary`}
                                >
                                    {link.name}
                                    <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-secondary transition-all duration-300 group-hover:w-full" />
                                </NavHashLink>
                            </motion.div>
                        ))}
                    </div>

                    <div className="flex items-center gap-6 pl-10 border-l border-slate-200/20">
                        <Link
                            to="/#contact"
                            className={`btn whitespace-nowrap px-8 py-3.5 text-[10px] font-black tracking-[0.25em] uppercase transition-all duration-500 ${(isScrolled || isSubPage) ? 'btn-primary' : 'bg-white text-primary hover:bg-secondary hover:text-white shadow-xl'}`}
                        >
                            Get Export Quote
                        </Link>

                        <Link
                            to="/admin"
                            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:bg-secondary/10 ${(isScrolled || isSubPage) ? 'text-slate-300 hover:text-secondary' : 'text-white/20 hover:text-white'}`}
                            title="Admin Panel"
                        >
                            <ShieldCheck size={18} />
                        </Link>
                    </div>
                </div>

                {/* Mobile Toggle */}
                <button
                    className={`lg:hidden w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-500 ${(isScrolled || isSubPage) ? 'bg-primary/5 text-primary' : 'bg-white/10 text-white border border-white/20'}`}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-white border-t border-slate-100 shadow-2xl overflow-hidden"
                    >
                        <div className="p-8 flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <NavHashLink
                                    smooth
                                    key={link.name}
                                    to={link.href}
                                    className="text-3xl font-black text-primary uppercase tracking-tighter hover:text-secondary transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.name}
                                </NavHashLink>
                            ))}
                            <div className="h-px bg-slate-100 w-full my-4" />
                            <NavHashLink
                                smooth
                                to="/#contact"
                                className="btn btn-primary w-full py-5 text-center text-[13px] font-black uppercase tracking-widest"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Contact Us
                            </NavHashLink>
                            <Link
                                to="/admin"
                                className="flex items-center justify-center gap-3 text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] hover:text-secondary transition-colors py-4"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <ShieldCheck size={16} />
                                System Admin
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;


