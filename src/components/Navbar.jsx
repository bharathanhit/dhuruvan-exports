import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShieldCheck, ChevronDown, Package, Leaf, Award, ShoppingBag } from 'lucide-react';
import { NavHashLink } from 'react-router-hash-link';
import { Link, useLocation } from 'react-router-dom';
import logoImg from '../assets/logo.png';
import logoTextImg from '../assets/logo-text.png';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { categories as staticCategories } from '../data/products';

const iconMap = {
    'agro-products': Leaf,
    'woodcrafts': Package,
    'livestock': Award,
    'beverages': ShoppingBag
};

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [categories, setCategories] = useState([]);
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

    useEffect(() => {
        const q = query(collection(db, 'categories'), orderBy('order', 'asc'));
        const unsubscribe = onSnapshot(q, (snap) => {
            const firestoreCats = snap.docs.map(d => ({ docId: d.id, ...d.data(), isFirestore: true }));
            
            const merged = staticCategories.map(c => ({
                ...c,
                name: c.title,
                desc: c.description,
                icon: iconMap[c.slug] || Package,
                isFeatured: true, // Default featured
                isStatic: true
            }));

            firestoreCats.forEach(fc => {
                const idx = merged.findIndex(s => s.slug === fc.slug);
                if (idx !== -1) {
                    merged[idx] = { 
                        ...merged[idx], 
                        ...fc, 
                        name: fc.title, 
                        desc: fc.description,
                        icon: iconMap[fc.slug] || Package,
                        isStatic: false 
                    };
                } else {
                    merged.push({
                        ...fc,
                        name: fc.title,
                        desc: fc.description,
                        icon: iconMap[fc.slug] || Package,
                        isStatic: false
                    });
                }
            });

            setCategories(merged.filter(c => c.isFeatured));
        });
        return () => unsubscribe();
    }, []);

    const navLinks = [
        { name: 'Home', href: '/#' },
        { name: 'Services', href: '/services' },
        { name: 'Certificates', href: '/certificates' },
        { name: 'Payments', href: '/payment-terms' },
        { name: 'About', href: '/about' },
        { name: 'FAQ', href: '/faq' },
    ];

    const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
    const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);

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
                <NavHashLink smooth to="/#" className="flex items-center gap-1.5 shrink-0">
                    <img src={logoImg} alt="Logo"
                        className={`h-11 lg:h-16 w-auto transition-all duration-300 ${isLight ? '' : '[filter:drop-shadow(0_1px_0.5px_#fff)_drop-shadow(0_-1px_0.5px_#fff)_drop-shadow(1px_0_0.5px_#fff)_drop-shadow(-1px_0_0.5px_#fff)]'}`} />
                    <img src={logoTextImg} alt="Dhuruvan Exports"
                        className={`h-5 lg:h-8 w-auto transition-all duration-300 ${isLight ? '' : '[filter:drop-shadow(0_1px_0.5px_#fff)_drop-shadow(0_-1px_0.5px_#fff)_drop-shadow(1px_0_0.5px_#fff)_drop-shadow(-1px_0_0.5px_#fff)]'}`} />
                </NavHashLink>

                {/* ── Desktop links ── */}
                <div className="hidden lg:flex items-center gap-7">
                    <NavHashLink
                        smooth to="/#"
                        className={`text-[10px] font-black uppercase tracking-widest transition-colors duration-300 hover:text-secondary ${isLight ? 'text-slate-500' : 'text-white/70'}`}
                    >
                        Home
                    </NavHashLink>

                    {/* Desktop Products Dropdown */}
                    <div
                        className="relative group py-4"
                        onMouseEnter={() => setIsProductDropdownOpen(true)}
                        onMouseLeave={() => setIsProductDropdownOpen(false)}
                    >
                        <button className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest transition-colors duration-300 group-hover:text-secondary ${isLight ? 'text-slate-500' : 'text-white/70'}`}>
                            Products
                            <ChevronDown size={12} className={`transition-transform duration-300 ${isProductDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                            {isProductDropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute top-full -left-10 w-[240px] bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden p-2"
                                >
                                    {categories.map((cat) => (
                                        <Link
                                            key={cat.slug}
                                            to={`/category/${cat.slug}`}
                                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 group/item transition-all"
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary group-hover/item:bg-primary group-hover/item:text-white transition-all">
                                                <cat.icon size={14} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-[10px] font-black text-slate-900 uppercase tracking-tight group-hover/item:text-secondary transition-colors">{cat.name}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {navLinks.slice(1).map(link => (
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
                    <a
                        href="#contact"
                        onClick={(e) => {
                            e.preventDefault();
                            window.dispatchEvent(new CustomEvent('openInquiryPopup'));
                        }}
                        className={`text-[10px] font-black uppercase tracking-widest px-5 py-2.5 rounded-full transition-all duration-300 ${isLight ? 'bg-primary text-white hover:bg-secondary' : 'bg-white text-primary hover:bg-secondary hover:text-white'}`}
                    >
                        Get Quote
                    </a>
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
                            {/* Mobile Home */}
                            <NavHashLink
                                smooth to="/#"
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center justify-between px-5 py-3 text-[11px] font-black uppercase tracking-widest text-slate-600 hover:text-secondary hover:bg-slate-50 transition-all"
                            >
                                Home
                            </NavHashLink>

                            {/* Mobile Products Accordion */}
                            <div className="border-b border-slate-50">
                                <button
                                    onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
                                    className="w-full flex items-center justify-between px-5 py-3 text-[11px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all"
                                >
                                    <span className={isMobileProductsOpen ? 'text-secondary' : ''}>Explore Products</span>
                                    <ChevronDown size={14} className={`transition-transform duration-300 ${isMobileProductsOpen ? 'rotate-180' : ''}`} />
                                </button>
                                <AnimatePresence>
                                    {isMobileProductsOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden bg-slate-50/50"
                                        >
                                            {categories.map(cat => (
                                                <Link
                                                    key={cat.slug}
                                                    to={`/category/${cat.slug}`}
                                                    onClick={() => setIsMenuOpen(false)}
                                                    className="flex items-center gap-3 px-8 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-all"
                                                >
                                                    <cat.icon size={12} className="text-secondary" />
                                                    {cat.name}
                                                </Link>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {navLinks.slice(1).map((link, i) => (
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
                            <button
                                onClick={() => {
                                    setIsMenuOpen(false);
                                    window.dispatchEvent(new CustomEvent('openInquiryPopup'));
                                }}
                                className="flex-1 bg-primary text-white text-center text-[10px] font-black uppercase tracking-widest py-2.5 rounded-xl hover:bg-secondary transition-all"
                            >
                                Get Quote
                            </button>
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
