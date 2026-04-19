import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, CheckCircle, ShieldCheck, Lock, Globe, FileImage, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';

import GST_P1 from '../assets/GST/gst_p1.png';
import GST_P2 from '../assets/GST/gst_p2.png';
import GST_P3 from '../assets/GST/gst_p3.png';
import MSME_P1 from '../assets/MSME/msme_p1.png';
import MSME_P2 from '../assets/MSME/msme_p2.png';
import MSME_P3 from '../assets/MSME/msme_p3.png';
import MSME_P4 from '../assets/MSME/msme_p4.png';

// All colour values modified for a clean, premium light design
const CERT_THEMES = [
    { primary: '#f59e0b', secondary: '#d97706', text: '#b45309', light: 'rgba(245,158,11,0.06)', border: 'rgba(245,158,11,0.2)' },
    { primary: '#6366f1', secondary: '#4f46e5', text: '#4338ca', light: 'rgba(99,102,241,0.06)', border: 'rgba(99,102,241,0.2)' },
    { primary: '#10b981', secondary: '#059669', text: '#047857', light: 'rgba(16,185,129,0.06)', border: 'rgba(16,185,129,0.2)' },
    { primary: '#ec4899', secondary: '#db2777', text: '#be185d', light: 'rgba(236,72,153,0.06)', border: 'rgba(236,72,153,0.2)' },
];
const getTheme = (i) => CERT_THEMES[i % CERT_THEMES.length];


// ─── Individual certificate display (Simplified from Flipbook) ───────────────
const CertificateImage = ({ images, name, index }) => {
    const theme = getTheme(index);

    if (!images || images.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="relative group/book mx-auto flex flex-col items-center w-full max-w-[450px]"
            >
                <div className="absolute -inset-20 rounded-full blur-[100px] opacity-20 pointer-events-none"
                    style={{ background: `radial-gradient(circle, ${theme.primary}, transparent 70%)` }} />
                
                <div className="relative w-full aspect-[3/4] rounded-[2.6rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center p-8 text-center"
                    style={{ background: '#fff', border: `1px dashed ${theme.primary}40` }}>
                    <div className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center transition-transform duration-700 group-hover/book:scale-110"
                        style={{ background: theme.light, color: theme.primary }}>
                        <Award size={32} className="opacity-60" />
                    </div>
                    <p className="text-[11px] font-bold text-slate-800 leading-relaxed max-w-[280px]">
                        {name.includes('APEDA') && "Our APEDA partnership ensures that every agricultural shipment adheres to stringent quality controls and global export protocols."}


                        {!['APEDA'].some(key => name.includes(key)) && "Verified document confirming our adherence to international trade regulations and quality assurance standards."}

                    </p>
                    <div className="mt-4 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 italic text-[8px] font-black uppercase tracking-widest" style={{ color: theme.primary }}>
                        Verification In Progress
                    </div>
                    
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-1">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-1 h-1 rounded-full bg-slate-200" />
                        ))}
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="relative group/book mx-auto flex flex-col items-center w-full max-w-[450px]"
        >
            {/* Per-cert coloured glow */}
            <div className="absolute -inset-20 rounded-full blur-[160px] opacity-0 group-hover/book:opacity-70 transition-opacity duration-1000 pointer-events-none"
                style={{ background: `radial-gradient(circle, ${theme.primary}1A, transparent 70%)` }} />

            {/* Static image with coloured gradient border */}
            <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} className="relative w-full">
                <div className="relative rounded-[2.6rem] shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-700"
                    style={{ padding: '2px', background: `linear-gradient(135deg, ${theme.primary}40, rgba(255,255,255,0.8), ${theme.secondary}40)` }}>
                    <div className="rounded-[2.5rem] overflow-hidden p-3" style={{ background: '#ffffff' }}>
                        <div className="relative aspect-[3/4.2] rounded-[2rem] overflow-hidden border border-slate-100 group/image">
                            <img 
                                src={images[0]} 
                                alt={`${name} Main Page`} 
                                className="w-full h-full object-contain pointer-events-none select-none transition-transform duration-700 group-hover/image:scale-[1.02]" 
                                draggable="false" 
                            />
                            {/* Subtle glass overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Verified seal overlay */}
            <div className="mt-6 px-5 py-2 rounded-full shadow-sm flex items-center gap-2.5" style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.05)' }}>
                <CheckCircle size={14} style={{ color: theme.primary }} />
                <span className="text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: '#64748b' }}>
                    Official Certificate
                </span>
            </div>
        </motion.div>
    );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
const Certificates = () => {
    const [dynamicCerts, setDynamicCerts] = useState([]);

    useEffect(() => {
        // Disable context menu
        const block = (e) => e.preventDefault();
        document.addEventListener('contextmenu', block);

        // Disable zooming for this page
        const meta = document.querySelector('meta[name="viewport"]');
        const originalContent = meta ? meta.getAttribute('content') : 'width=device-width, initial-scale=1.0';
        if (meta) {
            meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
        }

        // Programmatically prevent multi-touch zoom and ctrl-scroll zoom
        const handleTouch = (e) => {
            if (e.touches.length > 1) e.preventDefault();
        };
        const handleWheel = (e) => {
            if (e.ctrlKey) e.preventDefault();
        };
        const handleGesture = (e) => {
            e.preventDefault();
        };

        document.addEventListener('touchstart', handleTouch, { passive: false });
        document.addEventListener('wheel', handleWheel, { passive: false });
        document.addEventListener('gesturestart', handleGesture);

        return () => {
            document.removeEventListener('contextmenu', block);
            document.removeEventListener('touchstart', handleTouch);
            document.removeEventListener('wheel', handleWheel);
            document.removeEventListener('gesturestart', handleGesture);
            if (meta) {
                meta.setAttribute('content', originalContent);
            }
        };
    }, []);

    useEffect(() => {
        const q = query(collection(db, 'certificates'), orderBy('createdAt', 'desc'));
        return onSnapshot(q, (snap) => setDynamicCerts(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
    }, []);

    const staticCerts = [
        { name: 'GST Registration',  description: 'GOVERNMENT OF INDIA • TAX REGISTRATION',    images: [GST_P1, GST_P2, GST_P3],              icon: <Award size={26} /> },
        { name: 'MSME Certificate',  description: 'MINISTRY OF MSME • UDYAM REGISTRATION',      images: [MSME_P1, MSME_P2, MSME_P3, MSME_P4],  icon: <CheckCircle size={26} /> },


    ];

    const getIcon = (iconName) => {
        const icons = {
            'Award': <Award size={26} />,
            'ShieldCheck': <ShieldCheck size={26} />,
            'FileImage': <FileImage size={26} />,
            'Check': <CheckCircle size={26} />,
            'Globe': <Globe size={26} />,
            'Lock': <Lock size={26} />
        };
        return icons[iconName] || <Award size={26} />;
    };

    const finalCerts = [
        ...staticCerts.filter(sc => !dynamicCerts.some(dc => dc.name.toLowerCase() === sc.name.toLowerCase())),
        ...dynamicCerts.map(cert => ({ 
            ...cert, 
            images: cert.pages || [], 
            icon: getIcon(cert.icon) 
        }))
    ];

    return (
        <div className="min-h-screen overflow-x-hidden relative selection:bg-secondary selection:text-white"
            style={{ background: '#f8fafc' }}>

            {/* ── Animated background glows ── */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div animate={{ x: [0, 60, 0], y: [0, 40, 0] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="absolute rounded-full" style={{ top: '5%', left: '-10%', width: '50rem', height: '50rem', background: 'radial-gradient(circle, rgba(245,158,11,0.06), transparent 70%)', filter: 'blur(60px)' }} />
                <motion.div animate={{ x: [0, -50, 0], y: [0, 70, 0] }} transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
                    className="absolute rounded-full" style={{ top: '30%', right: '-12%', width: '42rem', height: '42rem', background: 'radial-gradient(circle, rgba(99,102,241,0.05), transparent 70%)', filter: 'blur(60px)' }} />
                <motion.div animate={{ x: [0, 40, 0], y: [0, -30, 0] }} transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
                    className="absolute rounded-full" style={{ bottom: '10%', left: '30%', width: '38rem', height: '38rem', background: 'radial-gradient(circle, rgba(16,185,129,0.04), transparent 70%)', filter: 'blur(60px)' }} />

                {/* Subtle grid */}
                <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)', backgroundSize: '64px 64px' }} />

                {/* Top fade */}
                <div className="absolute top-0 left-0 right-0 h-40" style={{ background: 'linear-gradient(to bottom, #f8fafc, transparent)' }} />
            </div>

            <div className="relative z-10 container mx-auto px-4 md:px-8 pt-36 pb-28">

                {/* ── Back button ── */}
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex mb-10 max-w-7xl mx-auto">
                    <Link to="/#" className="inline-flex items-center gap-2 text-[10px] font-black transition-all group tracking-[0.2em] uppercase px-4 py-2 rounded-xl bg-white shadow-sm"
                        style={{ color: '#475569', border: '1px solid rgba(0,0,0,0.05)' }}
                        onMouseEnter={e => { e.currentTarget.style.color = '#0f172a'; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.15)'; }}
                        onMouseLeave={e => { e.currentTarget.style.color = '#475569'; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.05)'; }}>
                        <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" /> Home
                    </Link>
                </motion.div>

                {/* ── Hero ── */}
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
                    className="text-center mb-16 max-w-4xl mx-auto">

                    {/* Live badge */}
                    <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.35em] mb-8"
                        style={{ border: '1px solid rgba(0,0,0,0.08)', background: '#fff', color: '#475569', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                        <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#34d399' }} />
                        Verified Export Certifications
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none uppercase mb-6" style={{ color: '#0f172a' }}>
                        Trusted<br />
                        <span className="relative inline-block italic" style={{ background: 'linear-gradient(90deg, #f59e0b, #ea580c, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                            Worldwide
                        </span>
                    </h1>

                    <p className="text-lg font-medium leading-relaxed max-w-xl mx-auto" style={{ color: '#64748b' }}>
                        Government-verified certifications affirming our commitment to quality, compliance, and global trade integrity.
                    </p>

                    <div className="flex justify-center gap-2 mt-8">
                        {['#fbbf24', '#818cf8', '#34d399'].map((c, i) => (
                            <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: c, opacity: 0.7 }} />
                        ))}
                    </div>
                </motion.div>


                {/* ── Certificate cards + flipbooks ── */}
                <div className="flex flex-wrap justify-center gap-x-12 gap-y-24 items-start max-w-7xl mx-auto">
                    {finalCerts.map((cert, index) => {
                        const theme = getTheme(index);
                        return (
                            <div key={cert.id || cert.name} className="flex flex-col items-center w-full md:w-[calc(50%-3rem)] lg:w-[calc(50%-3rem)] xl:w-[calc(33%-3rem)] min-w-[320px] max-w-[480px] group/item">

                                {/* ── Cert header card ── */}
                                <motion.div
                                    initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                                    className="w-full mb-10 relative overflow-hidden rounded-[2rem] p-6 shadow-sm"
                                    style={{ background: theme.light, border: `1px solid ${theme.border}` }}>

                                    {/* Faint number watermark */}
                                    <div className="absolute right-4 top-0 text-[5rem] font-black leading-none pointer-events-none select-none"
                                        style={{ color: 'rgba(0,0,0,0.03)' }}>
                                        {String(index + 1).padStart(2, '0')}
                                    </div>

                                    <div className="flex items-center gap-4 relative z-10">
                                        {/* Coloured icon */}
                                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-xl shrink-0 transition-all duration-500 group-hover/item:scale-110 group-hover/item:-rotate-6"
                                            style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}>
                                            {cert.icon}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-base font-black uppercase tracking-tight leading-tight mb-1 transition-colors duration-300"
                                                style={{ color: '#0f172a' }}>
                                                {cert.name}
                                            </h3>
                                            {cert.description && (
                                                <p className="text-[8px] font-black uppercase tracking-[0.2em] leading-relaxed truncate"
                                                    style={{ color: '#475569' }}>
                                                    {cert.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Bottom label */}
                                    <div className="flex items-center gap-2 mt-4 relative z-10">
                                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: theme.primary }} />
                                        <span className="text-[8px] font-black uppercase tracking-widest" style={{ color: theme.text }}>
                                            Primary Document • Verified Legal Copy
                                        </span>
                                    </div>
                                </motion.div>

                                <CertificateImage images={cert.images} name={cert.name} index={index} />
                            </div>
                        );
                    })}
                </div>

                {/* ── Bottom trust bar ── */}
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="mt-32 max-w-5xl mx-auto">
                    <div className="relative overflow-hidden rounded-[3rem] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.03)]"
                        style={{ border: '1px solid rgba(0,0,0,0.05)', background: '#fff' }}>

                        {/* Top shimmer line */}
                        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.05), transparent)' }} />
                        {/* Gradient tint */}
                        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.02), transparent 50%, rgba(99,102,241,0.02))' }} />

                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="flex items-center gap-5 text-left">
                                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-xl shrink-0"
                                    style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
                                    <ShieldCheck size={30} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black uppercase tracking-tight leading-tight mb-1" style={{ color: '#0f172a' }}>Authenticated Global Entity</h2>
                                    <p className="text-sm font-medium" style={{ color: '#64748b' }}>Verified by Government of India Trade Authorities</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap justify-center md:justify-end gap-3">
                                {[
                                    { icon: <Lock size={13} />, label: 'AES-256 Secured', color: '#818cf8' },
                                    { icon: <CheckCircle size={13} />, label: 'Trade Integrity', color: '#34d399' },
                                    { icon: <Award size={13} />, label: 'APEDA Aligned', color: '#fbbf24' },
                                ].map((tag, i) => (
                                    <div key={i} className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                                        style={{ border: '1px solid rgba(0,0,0,0.05)', background: '#f8fafc', color: '#475569' }}
                                        onMouseEnter={e => { e.currentTarget.style.background = '#f1f5f9'; e.currentTarget.style.color = '#0f172a'; }}
                                        onMouseLeave={e => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.color = '#475569'; }}>
                                        <span style={{ color: tag.color }}>{tag.icon}</span>
                                        {tag.label}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

export default Certificates;
