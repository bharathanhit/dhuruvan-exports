import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { NavHashLink } from 'react-router-hash-link';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowRight, ShieldCheck, Globe, Home, Compass, Info, Zap, MessageSquare, Package, ShoppingBag, Truck } from 'lucide-react';

const Footer = () => {
    const quickLinks = [
        { name: 'Home', href: '/#', icon: Home },
        { name: 'Products', href: '/#products', icon: ShoppingBag },
        { name: 'About Us', href: '/#about', icon: Info },
        { name: 'Global Edge', href: '/#why-choose', icon: Zap },
        { name: 'Contact', href: '/#contact', icon: MessageSquare },
    ];

    const categories = [
        { name: 'Basmati Rice', href: '/#products', icon: Package },
        { name: 'Agro Products', href: '/#products', icon: Compass },
        { name: 'Textiles', href: '/#products', icon: Zap },
        { name: 'Wood Crafts', href: '/wood-crafts', icon: Package },
        { name: 'Logistics', href: '/#contact', icon: Truck },
    ];

    return (
        <footer className="footer-master bg-white border-t border-gray-100 pt-6 pb-4 overflow-hidden relative">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-4 border-b border-gray-100 pb-6">
                    {/* Brand Section - Unified with Navbar Palette */}
                    <div className="lg:col-span-2 flex flex-col gap-3">
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-3"
                        >
                            <span className="text-2xl font-black text-primary tracking-tighter">
                                DHURUVAN <span className="text-secondary italic">EXPORTS</span>
                            </span>
                        </motion.div>
                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-gray-500 font-medium leading-relaxed max-w-sm text-xs"
                        >
                            Bridging Indian quality with global markets. A premier merchant export house committed to excellence and transparency since 2026.
                        </motion.p>
                        <div className="flex gap-2">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                <motion.a
                                    key={i}
                                    href="#"
                                    whileHover={{ y: -3, scale: 1.1 }}
                                    className="w-8 h-8 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:border-primary transition-all"
                                >
                                    <Icon size={14} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation - Aligned with Navbar */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="flex flex-col gap-3"
                    >
                        <h4 className="text-primary text-[10px] font-black uppercase tracking-[0.3em] border-l-2 border-secondary pl-3">Company</h4>
                        <ul className="flex flex-col gap-2">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <NavHashLink
                                        smooth
                                        to={link.href}
                                        className="text-gray-500 font-bold text-[13px] hover:text-primary flex items-center gap-2.5 group transition-colors"
                                    >
                                        <link.icon size={13} className="text-secondary group-hover:scale-120 transition-transform" />
                                        {link.name}
                                    </NavHashLink>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Solutions Area */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="flex flex-col gap-3"
                    >
                        <h4 className="text-primary text-[10px] font-black uppercase tracking-[0.3em] border-l-2 border-secondary pl-3">Portfolio</h4>
                        <ul className="flex flex-col gap-2">
                            {categories.map((link) => (
                                <li key={link.name}>
                                    <NavHashLink
                                        smooth
                                        to={link.href}
                                        className="text-gray-500 font-bold text-[13px] hover:text-primary flex items-center gap-2.5 group transition-colors"
                                    >
                                        <link.icon size={13} className="text-secondary group-hover:scale-120 transition-transform" />
                                        {link.name}
                                    </NavHashLink>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Global Compliance & Contact */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="flex flex-col gap-3"
                    >
                        <h4 className="text-primary text-[10px] font-black uppercase tracking-[0.3em] border-l-2 border-secondary pl-3">Connect</h4>
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-3 items-center group">
                                <Mail size={14} className="text-secondary" />
                                <span className="text-gray-600 font-bold text-[11px] truncate">info@dhuruvanexports.com</span>
                            </div>
                            <div className="flex gap-3 items-center group">
                                <Phone size={14} className="text-secondary" />
                                <span className="text-gray-600 font-bold text-[11px]">+91 99527 77973</span>
                            </div>
                            {/* Location removed */}
                        </div>
                    </motion.div>
                </div>

                {/* Unified Legacy Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-5">
                    <div className="flex items-center gap-2.5">
                        <ShieldCheck size={16} className="text-secondary" />
                        <span className="text-gray-400 font-bold text-[8px] uppercase tracking-[0.25em]">ISO 9001:2015 Registered Export House</span>
                    </div>

                    <div className="flex items-center gap-10">
                        <div className="flex gap-6">
                            <Link to="/privacy" className="text-gray-400 hover:text-primary font-bold text-[8px] uppercase tracking-widest transition-colors">Privacy Policy</Link>
                            <Link to="/terms" className="text-gray-400 hover:text-primary font-bold text-[8px] uppercase tracking-widest transition-colors">Terms of Trade</Link>
                        </div>
                        <p className="text-gray-400 font-bold text-[8px] uppercase tracking-widest">
                            © 2026 DHURUVAN EXPORTS
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};


export default Footer;
