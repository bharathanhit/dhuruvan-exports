import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { NavHashLink } from 'react-router-hash-link';
import { Mail, Phone, Facebook, Twitter, Instagram, Linkedin, Youtube, ShieldCheck, ShoppingBag, Info, Zap, MessageSquare, Package, Compass, Truck, Share2, HelpCircle } from 'lucide-react';
import { collection, onSnapshot, query, orderBy, doc } from 'firebase/firestore';
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
    const [siteSettings, setSiteSettings] = useState({ email: 'Dhuruvanexports@gmail.com', phone: '+91 99527 77973' });
    const [isBixsolOpen, setIsBixsolOpen] = useState(false);


    useEffect(() => {
        return onSnapshot(doc(db, 'site_settings', 'contact'), (docSnap) => {
            if (docSnap.exists()) {
                setSiteSettings(docSnap.data());
            }
        });
    }, []);

    useEffect(() => {
        return onSnapshot(query(collection(db, 'social_links')), (snap) => {
            const links = snap.docs.map(d => ({ id: d.id, ...d.data() }));
            setSocialLinks(links);
        });
    }, []);

    // Merge static + Firestore categories and filter for featured
    useEffect(() => {
        const q = query(collection(db, 'categories'), orderBy('order', 'asc'));
        return onSnapshot(q, (snap) => {
            const firestoreCats = snap.docs.map(d => ({ docId: d.id, ...d.data(), isFirestore: true }));
            // Start with static, then override/append Firestore ones
            // Static ones are considered featured by default
            const merged = staticCategories.map(c => ({ ...c, isFeatured: true }));
            
            firestoreCats.forEach(fc => {
                const idx = merged.findIndex(s => s.slug === fc.slug);
                if (idx !== -1) {
                    merged[idx] = { ...merged[idx], ...fc };
                } else {
                    merged.push(fc);
                }
            });

            // Filter for featured categories only
            const featured = merged.filter(c => c.isFeatured);
            setAllCategories(featured);
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
        <footer className="bg-white pt-24 pb-16 overflow-hidden relative text-primary border-t border-slate-100">
            <div className="container px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-16 lg:gap-x-12 mb-20 pb-20 border-b border-slate-100 items-start">
                    {/* Brand Section */}
                    <div className="lg:col-span-4 flex flex-col gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none text-primary">
                                DHURUVAN <br /> <span className="text-secondary italic">EXPORTS</span>
                            </span>
                        </motion.div>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-primary/70 font-medium leading-relaxed max-w-md text-lg"
                        >
                            A government registered premier merchant export house. We bridge Indian quality with global markets through excellence, transparency, and reliable logistics.
                        </motion.p>
                        <div className="flex gap-4">
                            {socialLinks.length > 0 && socialLinks.map((link) => {
                                const Icon = SocialIconMap[link.platform] || Share2;
                                return (
                                    <motion.a
                                        key={link.id}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.1, backgroundColor: 'var(--color-primary)', color: 'white' }}
                                        className="w-11 h-11 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary transition-all duration-300 shadow-sm backdrop-blur-sm"
                                    >
                                        <Icon size={20} />
                                    </motion.a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-2 flex flex-col gap-8"
                    >
                        <h4 className="text-secondary text-xs font-black uppercase tracking-[0.4em] flex items-center gap-3">
                            <Compass size={16} />
                            Exploration
                        </h4>
                        <ul className="flex flex-col gap-4">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <NavHashLink
                                        smooth
                                        to={link.href}
                                        className="text-primary font-bold text-base md:text-lg hover:text-secondary transition-all hover:translate-x-1 inline-block"
                                    >
                                        {link.name}
                                    </NavHashLink>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="lg:col-span-2 flex flex-col gap-8"
                    >
                        <h4 className="text-secondary text-xs font-black uppercase tracking-[0.4em] flex items-center gap-3">
                            <ShoppingBag size={16} />
                            Products
                        </h4>
                        <ul className="flex flex-col gap-4">
                            {allCategories.map((cat) => (
                                <li key={cat.slug || cat.id}>
                                    <Link
                                        to={`/category/${cat.slug || cat.id}`}
                                        className="text-primary font-bold text-base md:text-lg hover:text-secondary transition-all hover:translate-x-1 flex items-center gap-2 group"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-secondary scale-0 group-hover:scale-100 transition-transform" />
                                        {cat.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="lg:col-span-4 flex flex-col gap-8"
                    >
                        <h4 className="text-secondary text-xs font-black uppercase tracking-[0.4em] flex items-center gap-3">
                            <MessageSquare size={16} />
                            Connect
                        </h4>
                        <div className="flex flex-col gap-4 max-w-sm ml-auto lg:ml-0">
                            <a href={`mailto:${siteSettings.email}`} className="flex gap-4 items-center group cursor-pointer bg-slate-50 p-4 rounded-3xl border border-slate-100 hover:bg-white hover:shadow-2xl hover:border-secondary transition-all overflow-hidden">
                                <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0 group-hover:bg-secondary group-hover:text-white transition-all">
                                    <Mail size={20} />
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Official Email</span>
                                    <span className="text-primary font-black text-xs md:text-sm lg:text-base uppercase tracking-tight break-all">{siteSettings.email}</span>
                                </div>
                            </a>
                            <a href={`tel:${siteSettings.phone.replace(/\s+/g, '')}`} className="flex gap-4 items-center group cursor-pointer bg-slate-50 p-4 rounded-3xl border border-slate-100 hover:bg-white hover:shadow-2xl hover:border-secondary transition-all">
                                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                    <Phone size={20} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Direct Line</span>
                                    <span className="text-primary font-black text-xs md:text-sm lg:text-base whitespace-nowrap tracking-tight">{siteSettings.phone}</span>
                                </div>
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Footer Area */}
                <div className="flex flex-col gap-12 relative z-10">
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
                        {/* Highly Visible Legal Links */}
                        <div className="flex flex-wrap justify-center lg:justify-start gap-4 md:gap-6">
                            {[
                                { to: '/faq', icon: HelpCircle, label: 'FAQ' },
                                { to: '/privacy', icon: ShieldCheck, label: 'Privacy' },
                                { to: '/terms', icon: Info, label: 'Terms' }
                            ].map((item) => (
                                <Link 
                                    key={item.label}
                                    to={item.to} 
                                    onClick={() => window.scrollTo(0, 0)} 
                                    className="flex items-center gap-3 text-primary hover:text-white font-black text-xs uppercase tracking-widest transition-all duration-300 px-6 py-3 rounded-2xl border border-primary/10 bg-primary/5 hover:bg-primary shadow-sm"
                                >
                                    <item.icon size={16} /> {item.label}
                                </Link>
                            ))}
                        </div>

                        {/* Govt. Compliance */}
                        <div className="flex items-center gap-4 px-8 py-3 bg-primary/5 rounded-full border border-primary/10 shadow-sm">
                            <ShieldCheck size={18} className="text-secondary" />
                            <span className="text-primary font-black text-xs uppercase tracking-[0.2em]">Registered Merchant Export House</span>
                        </div>
                    </div>

                    {/* Copyright & Builder bar */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-10 border-t border-primary/10">
                        <p className="text-primary/40 font-bold text-xs uppercase tracking-[0.3em]">
                            © {new Date().getFullYear()} DHURUVAN EXPORTS • ALL RIGHTS RESERVED
                        </p>
                        
                        <div className="flex items-center gap-4">
                            <motion.button
                                onClick={() => setIsBixsolOpen(true)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-3 cursor-pointer bg-primary/5 px-6 py-3 rounded-full border border-primary/10 hover:bg-white hover:shadow-xl transition-all group"
                            >
                                <span className="text-primary/60 group-hover:text-primary font-black text-xs uppercase tracking-[0.2em] flex items-center gap-2">
                                    CRAFTED BY <motion.span
                                        animate={{ scale: [1, 1.4, 1] }}
                                        transition={{ duration: 1.2, repeat: Infinity }}
                                        className="inline-block text-red-500"
                                    >♥</motion.span> <span className="text-secondary italic group-hover:underline">BIXSOL</span>
                                </span>
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>
            <BixsolPopup isOpen={isBixsolOpen} onClose={() => setIsBixsolOpen(false)} />
        </footer>
    );
};

export default Footer;
