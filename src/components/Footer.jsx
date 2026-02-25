import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { NavHashLink } from 'react-router-hash-link';
import { Mail, Phone, Facebook, Twitter, Instagram, Linkedin, ShieldCheck, ShoppingBag, Info, Zap, MessageSquare, Package, Compass, Truck } from 'lucide-react';

const Footer = () => {
    const quickLinks = [
        { name: 'Home Catalog', href: '/#' },
        { name: 'Our Products', href: '/#products' },
        { name: 'Company Story', href: '/#about' },
        { name: 'Quality Standards', href: '/#why-choose' },
        { name: 'Export Inquiry', href: '/#contact' },
    ];

    const categories = [
        { name: 'Premium Basmati', href: '/#products' },
        { name: 'Agro Commodities', href: '/#products' },
        { name: 'Halal Certified', href: '/#products' },
        { name: 'Handcrafted Wood', href: '/wood-crafts' },
        { name: 'Global Logistics', href: '/#contact' },
    ];

    return (
        <footer className="bg-white border-t border-slate-100 pt-20 pb-10 overflow-hidden relative">
            {/* Subtle background flair */}
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/[0.02] rounded-full blur-[100px] translate-y-1/2 translate-x-1/2" />

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
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                <motion.a
                                    key={i}
                                    href="#"
                                    whileHover={{ y: -4, backgroundColor: 'var(--color-primary)', color: 'white' }}
                                    className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 transition-all duration-300 shadow-sm"
                                >
                                    <Icon size={18} />
                                </motion.a>
                            ))}
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
                            Portfolio
                        </h4>
                        <ul className="flex flex-col gap-3">
                            {categories.map((link) => (
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
                            <div className="flex gap-3 items-center group cursor-pointer">
                                <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all">
                                    <Mail size={14} />
                                </div>
                                <span className="text-slate-600 font-bold text-xs truncate">info@dhuruvanexports.com</span>
                            </div>
                            <div className="flex gap-3 items-center group cursor-pointer">
                                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                    <Phone size={14} />
                                </div>
                                <span className="text-slate-600 font-bold text-xs md:whitespace-nowrap">+91 99527 77973</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Legacy & Compliance Bar */}
                <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-full border border-slate-100">
                        <ShieldCheck size={16} className="text-secondary" />
                        <span className="text-slate-400 font-black text-[9px] uppercase tracking-[0.2em]">ISO 9001:2015 Registered Export House</span>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-8">
                        <div className="flex gap-6">
                            <Link to="/privacy" className="text-slate-400 hover:text-primary font-black text-[9px] uppercase tracking-widest transition-colors">Privacy</Link>
                            <Link to="/terms" className="text-slate-400 hover:text-primary font-black text-[9px] uppercase tracking-widest transition-colors">Terms</Link>
                        </div>
                        <p className="text-slate-300 font-black text-[9px] uppercase tracking-widest">
                            © {new Date().getFullYear()} DHURUVAN EXPORTS
                        </p>
                    </div>
                </div>
            </div>
        </footer >
    );
};

export default Footer;
