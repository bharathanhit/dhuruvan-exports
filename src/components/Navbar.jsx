import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShieldCheck } from 'lucide-react';
import { NavHashLink } from 'react-router-hash-link';
import { Link, useLocation } from 'react-router-dom';
import logoImg from '../assets/logo.png';
import logoTextImg from '../assets/logo-text.png';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 40);
            const total = document.documentElement.scrollHeight - window.innerHeight;
            setScrollProgress((window.scrollY / total) * 100);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => { setIsMenuOpen(false); }, [location]);

    const navLinks = [
        { name: 'Home', href: '/#' },
        { name: 'Products', href: '/#products' },
        { name: 'Services', href: '/services' },
        { name: 'Certificates', href: '/certificates' },
        { name: 'About', href: '/about' },
    ];

    const isLight = isScrolled || location.pathname !== '/';

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isLight ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 py-2.5' : 'bg-transparent py-6'}`}>
            {/* Slim progress bar */}
            <motion.div
                className="absolute bottom-0 left-0 h-[2px] bg-secondary origin-left"
                style={{ scaleX: scrollProgress / 100, width: '100%' }}
            />

            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">

                {/* ── Brand ── */}
                <NavHashLink smooth to="/#" className="flex items-center gap-2 shrink-0">
                    <img src={logoImg} alt="Logo"
                        className={`h-12 w-auto transition-all duration-300 ${isLight ? '' : 'brightness-200'}`} />
                    <img src={logoTextImg} alt="Dhuruvan Exports"
                        className="h-6 w-auto" />
                </NavHashLink>

                {/* ── Desktop links ── */}
                <div className="hidden lg:flex items-center gap-7">
                    {navLinks.map(link => (
                        <NavHashLink
                            key={link.name}
                            smooth to={link.href}
                            className={`text-[10px] font-black uppercase tracking-widest transition-colors duration-300 hover:text-secondary ${isLight ? 'text-slate-500' : 'text-white/70'}`}
                        >
                            {link.name}
                        </NavHashLink>
                    ))}
                </div>

                {/* ── Desktop CTA ── */}
                <div className="hidden lg:flex items-center gap-3">
                    <NavHashLink smooth to="/#contact"
                        className={`text-[10px] font-black uppercase tracking-widest px-5 py-2.5 rounded-full transition-all duration-300 ${isLight ? 'bg-primary text-white hover:bg-secondary' : 'bg-white text-primary hover:bg-secondary hover:text-white'}`}>
                        Get Quote
                    </NavHashLink>
                    <Link to="/admin" title="Admin"
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isLight ? 'text-slate-300 hover:text-secondary hover:bg-slate-50' : 'text-white/20 hover:text-white/60'}`}>
                        <ShieldCheck size={15} />
                    </Link>
                </div>

                {/* ── Mobile hamburger ── */}
                <button
                    onClick={() => setIsMenuOpen(v => !v)}
                    className={`lg:hidden w-8 h-8 flex items-center justify-center rounded-lg transition-all ${isLight ? 'text-slate-600 hover:bg-slate-100' : 'text-white hover:bg-white/10'}`}
                >
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.span key={isMenuOpen ? 'x' : 'm'}
                            initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.15 }}>
                            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
                        </motion.span>
                    </AnimatePresence>
                </button>
            </div>

            {/* ── Mobile menu — floating card ── */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.97, y: -4 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.97, y: -4 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        className="lg:hidden absolute top-full left-3 right-3 mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden"
                    >
                        {/* Nav links */}
                        <div className="py-2">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: -6 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.04 }}
                                >
                                    <NavHashLink
                                        smooth to={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="flex items-center justify-between px-5 py-3 text-[11px] font-black uppercase tracking-widest text-slate-600 hover:text-secondary hover:bg-slate-50 transition-all"
                                    >
                                        {link.name}
                                    </NavHashLink>
                                </motion.div>
                            ))}
                        </div>

                        {/* CTA footer */}
                        <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex items-center gap-3">
                            <NavHashLink
                                smooth to="/#contact"
                                onClick={() => setIsMenuOpen(false)}
                                className="flex-1 bg-primary text-white text-center text-[10px] font-black uppercase tracking-widest py-2.5 rounded-xl hover:bg-secondary transition-all"
                            >
                                Get Quote
                            </NavHashLink>
                            <Link
                                to="/admin"
                                onClick={() => setIsMenuOpen(false)}
                                className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 text-slate-400 hover:text-secondary hover:bg-slate-200 transition-all"
                                title="Admin"
                            >
                                <ShieldCheck size={15} />
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
