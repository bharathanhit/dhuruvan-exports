import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { NavHashLink } from 'react-router-hash-link';
import { Mail, Phone, Facebook, Twitter, Instagram, Linkedin, Youtube, ShieldCheck, ShoppingBag, Info, Zap, MessageSquare, Package, Compass, Truck, Share2, HelpCircle } from 'lucide-react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { categories as staticCategories } from '../data/products';
import BixsolPopup from './BixsolPopup';

const SocialIconMap = {
    Facebook: Facebook,
    Twitter: Twitter,
    Instagram: Instagram,
    Linkedin: Linkedin,
    Youtube: Youtube,
    WhatsApp: MessageSquare
};

const Footer = () => {
    const [socialLinks, setSocialLinks] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [isBixsolOpen, setIsBixsolOpen] = useState(false);

    useEffect(() => {
        return onSnapshot(query(collection(db, 'social_links')), (snap) => {
            const links = snap.docs.map(d => ({ id: d.id, ...d.data() }));
            setSocialLinks(links);
        });
    }, []);

    // Merge static + Firestore categories
    useEffect(() => {
        const q = query(collection(db, 'categories'), orderBy('order', 'asc'));
        return onSnapshot(q, (snap) => {
            const firestoreCats = snap.docs.map(d => ({ docId: d.id, ...d.data(), isFirestore: true }));
            // Start with static, then override/append Firestore ones
            const merged = staticCategories.map(c => ({ ...c }));
            firestoreCats.forEach(fc => {
                const idx = merged.findIndex(s => s.slug === fc.slug);
                if (idx !== -1) merged[idx] = { ...merged[idx], ...fc };
                else merged.push(fc);
            });
            setAllCategories(merged);
        });
    }, []);

    const quickLinks = [
        { name: 'Home Catalog', href: '/#' },
        { name: 'Our Services', href: '/services' },
        { name: 'Our Products', href: '/#products' },
        { name: 'Our Certificates', href: '/certificates' },
        { name: 'Company Story', href: '/about' },
        { name: 'FAQ Support', href: '/faq' },
        { name: 'Quality Standards', href: '/#why-choose' },
    ];

    return (
        <footer className="bg-white border-t border-slate-100 pt-20 pb-32 overflow-hidden relative">
            {/* Subtle background flair */}
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/[0.02] rounded-full blur-[100px] translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="container px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16 border-b border-slate-100 pb-16">
                    {/* Brand Section */}
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                        >
                            <span className="text-3xl font-black text-primary tracking-tighter">
                                DHURUVAN <span className="text-secondary italic">EXPORTS</span>
                            </span>
                        </motion.div>
                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-slate-500 font-medium leading-relaxed max-w-sm text-sm"
                        >
                            A government registered premier merchant export house. We bridge Indian quality with global markets through excellence, transparency, and reliable logistics.
                        </motion.p>
                        <div className="flex gap-4">
                            {socialLinks.length > 0 ? (
                                socialLinks.map((link) => {
                                    const Icon = SocialIconMap[link.platform] || Share2;
                                    return (
                                        <motion.a
                                            key={link.id}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ y: -4, backgroundColor: 'var(--color-primary)', color: 'white' }}
                                            className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 transition-all duration-300 shadow-sm"
                                        >
                                            <Icon size={18} />
                                        </motion.a>
                                    );
                                })
                            ) : (
                                [Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                    <div key={i} className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-200">
                                        <Icon size={18} />
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="flex flex-col gap-6"
                    >
                        <h4 className="text-primary text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
                            <Compass size={12} className="text-secondary" />
                            Exploration
                        </h4>
                        <ul className="flex flex-col gap-3">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <NavHashLink
                                        smooth
                                        to={link.href}
                                        className="text-slate-500 font-bold text-sm hover:text-secondary transition-colors"
                                    >
                                        {link.name}
                                    </NavHashLink>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="flex flex-col gap-6"
                    >
                        <h4 className="text-primary text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
                            <ShoppingBag size={12} className="text-secondary" />
                            Products
                        </h4>
                        <ul className="flex flex-col gap-3">
                            {allCategories.map((cat) => (
                                <li key={cat.slug || cat.id}>
                                    <Link
                                        to={`/category/${cat.slug || cat.id}`}
                                        className="text-slate-500 font-bold text-sm hover:text-secondary transition-colors flex items-center gap-1.5 group"
                                    >
                                        <span className="w-1 h-1 rounded-full bg-secondary/40 group-hover:bg-secondary transition-colors" />
                                        {cat.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="flex flex-col gap-6"
                    >
                        <h4 className="text-primary text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
                            <MessageSquare size={12} className="text-secondary" />
                            Connect
                        </h4>
                        <div className="flex flex-col gap-4">
                            <a href="mailto:Dhuruvanexports@gmail.com" className="flex gap-3 items-center group cursor-pointer">
                                <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all">
                                    <Mail size={14} />
                                </div>
                                <span className="text-slate-600 font-bold text-xs truncate">Dhuruvanexports@gmail.com</span>
                            </a>
                            <div className="flex gap-3 items-center group cursor-pointer">
                                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                    <Phone size={14} />
                                </div>
                                <span className="text-slate-600 font-bold text-xs md:whitespace-nowrap">+91 99527 77973</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Footer Area */}
                <div className="flex flex-col gap-8 relative z-10">

                    {/* Highly Visible Legal Links */}
                    <div className="flex flex-wrap justify-center lg:justify-end gap-3 md:gap-4">
                        <Link to="/faq" onClick={() => window.scrollTo(0, 0)} className="flex items-center gap-2 text-primary hover:text-white font-black text-[11px] uppercase tracking-widest transition-all duration-300 px-5 py-2.5 rounded-xl border border-primary/10 bg-slate-50 hover:bg-primary shadow-sm">
                            <HelpCircle size={14} /> FAQ
                        </Link>
                        <Link to="/privacy" onClick={() => window.scrollTo(0, 0)} className="flex items-center gap-2 text-primary hover:text-white font-black text-[11px] uppercase tracking-widest transition-all duration-300 px-5 py-2.5 rounded-xl border border-primary/10 bg-slate-50 hover:bg-primary shadow-sm">
                            <ShieldCheck size={14} /> Privacy Policy
                        </Link>
                        <Link to="/terms" onClick={() => window.scrollTo(0, 0)} className="flex items-center gap-2 text-primary hover:text-white font-black text-[11px] uppercase tracking-widest transition-all duration-300 px-5 py-2.5 rounded-xl border border-primary/10 bg-slate-50 hover:bg-primary shadow-sm">
                            <Info size={14} /> Terms & Conditions
                        </Link>
                    </div>

                    {/* Legacy & Compliance Bar */}
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-6 pt-6 border-t border-slate-100">
                        <div className="flex flex-wrap items-center justify-center lg:justify-end gap-4 order-last lg:order-none">
                            <div className="flex items-center gap-3 px-6 py-2 bg-gradient-to-r from-primary/[0.05] to-secondary/[0.05] rounded-full border border-slate-100 shadow-sm animate-pulse-slow">
                                <ShieldCheck size={14} className="text-secondary" />
                                <span className="text-primary font-black text-[9px] uppercase tracking-[0.2em]">Govt. Certified</span>
                            </div>

                        </div>

                        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 lg:justify-start">
                            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest text-center">
                                © {new Date().getFullYear()} DHURUVAN EXPORTS
                            </p>
                            <div className="hidden md:block w-px h-4 bg-slate-100" />
                            <motion.button
                                onClick={() => setIsBixsolOpen(true)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-2 cursor-pointer bg-primary/5 px-4 py-2 rounded-full border border-primary/10 transition-all ml-4"
                            >
                                <span className="text-primary font-black text-[9px] uppercase tracking-[0.2em]">
                                    Build by <motion.span
                                        animate={{ scale: [1, 1.4, 1] }}
                                        transition={{ duration: 0.8, repeat: Infinity }}
                                        className="inline-block text-red-500"
                                    >♥</motion.span> <span className="text-secondary italic">BIXSOL</span>
                                </span>
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>
            <BixsolPopup isOpen={isBixsolOpen} onClose={() => setIsBixsolOpen(false)} />
        </footer >
    );
};

export default Footer;
