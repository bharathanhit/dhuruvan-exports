import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, CheckCircle, ShieldCheck, Lock, ChevronLeft, ChevronRight, BookOpen, X, Maximize2 } from 'lucide-react';
import HTMLFlipBook from 'react-pageflip';

// Import images from organized folders
import GST_P1 from '../assets/GST/gst_p1.png';
import GST_P2 from '../assets/GST/gst_p2.png';
import GST_P3 from '../assets/GST/gst_p3.png';
import MSME_P1 from '../assets/MSME/msme_p1.png';
import MSME_P2 from '../assets/MSME/msme_p2.png';
import MSME_P3 from '../assets/MSME/msme_p3.png';
import MSME_P4 from '../assets/MSME/msme_p4.png';

const FlipBookComponent = ({ images, name, index }) => {
    const book = useRef();
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedImage, setSelectedImage] = useState(null);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (selectedImage) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [selectedImage]);

    return (
        <>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative group/book mx-auto flex flex-col items-center w-full max-w-[750px]"
            >
                {/* Background Glow Effect */}
                <div className="absolute -inset-20 bg-secondary/10 rounded-full blur-[150px] opacity-0 group-hover/book:opacity-100 transition-opacity duration-1000 pointer-events-none" />

                {/* Navigation Controls - Smaller & Nearer */}
                <div className="absolute top-1/2 -left-3 -translate-y-1/2 z-30 hidden xl:block">
                    <button
                        onClick={() => book.current.pageFlip().flipPrev()}
                        className="w-10 h-10 rounded-xl bg-white/95 backdrop-blur-md shadow-xl border border-white/50 flex items-center justify-center text-primary hover:bg-secondary hover:text-white transition-all duration-500 hover:scale-110 active:scale-95"
                    >
                        <ChevronLeft size={20} />
                    </button>
                </div>

                <div className="absolute top-1/2 -right-3 -translate-y-1/2 z-30 hidden xl:block">
                    <button
                        onClick={() => book.current.pageFlip().flipNext()}
                        className="w-10 h-10 rounded-xl bg-white/95 backdrop-blur-md shadow-xl border border-white/50 flex items-center justify-center text-primary hover:bg-secondary hover:text-white transition-all duration-500 hover:scale-110 active:scale-95"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>

                {/* The FlipBook - Extra Large Scale */}
                <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="shadow-[0_50px_120px_rgba(0,0,0,0.2)] rounded-[2.5rem] overflow-hidden bg-white/40 backdrop-blur-sm p-4 border border-white/60 relative z-10"
                >
                    <HTMLFlipBook
                        width={750}
                        height={1050}
                        size="stretch"
                        minWidth={280}
                        maxWidth={750}
                        minHeight={400}
                        maxHeight={1050}
                        maxShadowOpacity={0.4}
                        showCover={true}
                        mobileScrollSupport={true}
                        onFlip={(e) => setCurrentPage(e.data)}
                        className="dhuruvan-book"
                        ref={book}
                        style={{ background: 'transparent' }}
                    >
                        {images.map((img, i) => (
                            <div key={i} className="relative bg-white overflow-hidden group/page">
                                {/* Click to Zoom Layer - Middle Clickable Area */}
                                <div
                                    className="absolute inset-10 z-30 cursor-zoom-in flex items-center justify-center opacity-0 group-hover/page:opacity-100 transition-opacity duration-300"
                                    onClick={() => setSelectedImage(img)}
                                >
                                    <div className="bg-primary/80 backdrop-blur-sm text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                        <Maximize2 size={12} /> Click to Expand
                                    </div>
                                </div>

                                <div
                                    className="absolute inset-0 z-20 cursor-grab active:cursor-grabbing"
                                    onContextMenu={(e) => e.preventDefault()}
                                />

                                <img
                                    src={img}
                                    alt={`${name} Page ${i + 1}`}
                                    className="w-full h-full object-contain pointer-events-none select-none"
                                    draggable="false"
                                />

                                <div className="absolute bottom-8 right-8 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] z-10">
                                    PAGE {i + 1}
                                </div>

                                <div className={`absolute top-0 w-12 h-full z-10 pointer-events-none opacity-[0.15] ${i % 2 === 0 ? 'right-0 bg-gradient-to-l from-black to-transparent' : 'left-0 bg-gradient-to-r from-black to-transparent'}`} />
                            </div>
                        ))}
                    </HTMLFlipBook>
                </motion.div>

                {/* Glassmorphic Indicator */}
                <div className="mt-12 flex flex-col items-center gap-5 relative z-20">
                    <div className="px-8 py-3 bg-white/80 backdrop-blur-md rounded-[1.5rem] border border-white/50 shadow-sm flex items-center gap-6 group-hover/book:shadow-2xl transition-all duration-700">
                        <div className="flex -space-x-1.5">
                            {images.map((_, i) => (
                                <div key={i} className={`w-2.5 h-2.5 rounded-full border border-white transition-all duration-500 ${currentPage === i ? 'w-8 bg-secondary' : 'bg-slate-200'}`} />
                            ))}
                        </div>
                        <div className="w-px h-6 bg-slate-200" />
                        <span className="text-xs font-black text-primary uppercase tracking-[0.2em]">
                            {currentPage + 1} <span className="text-slate-300 mx-1">/</span> {images.length}
                        </span>
                    </div>
                </div>
            </motion.div>

            {/* FULL SCREEN ZOOM MODAL */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100000] flex items-center justify-center p-4 md:p-10 bg-black/95 backdrop-blur-xl"
                        onClick={() => setSelectedImage(null)}
                    >
                        {/* Close Button - Labeled Exit */}
                        <motion.button
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="absolute top-10 right-10 flex items-center gap-3 px-6 py-3 bg-white/10 hover:bg-secondary backdrop-blur-md rounded-2xl border border-white/20 text-white transition-all duration-500 z-[100] group shadow-2xl"
                            onClick={() => setSelectedImage(null)}
                        >
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] font-inter">Exit Preview</span>
                            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover:rotate-90 transition-transform duration-500">
                                <X size={18} />
                            </div>
                        </motion.button>

                        {/* Image Container */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full h-full max-w-5xl flex items-center justify-center"
                        >
                            <img
                                src={selectedImage}
                                alt="Zoomed Certificate"
                                className="w-full h-full object-contain pointer-events-none select-none drop-shadow-[0_0_50px_rgba(255,255,255,0.1)]"
                                draggable="false"
                                onContextMenu={(e) => e.preventDefault()}
                            />

                            {/* Security Badge in Modal */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-[10px] font-black text-white/40 uppercase tracking-[0.4em] whitespace-nowrap">
                                <Lock size={12} className="inline mr-2 -mt-1" /> SECURED PREVIEW MODE
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

const Certificates = () => {
    useEffect(() => {
        const handleContextMenu = (e) => e.preventDefault();
        document.addEventListener('contextmenu', handleContextMenu);
        return () => document.removeEventListener('contextmenu', handleContextMenu);
    }, []);

    const certificates = [
        {
            name: 'GST Registration',
            description: 'GOVERNMENT OF INDIA • TAX REGISTRATION',
            images: [GST_P1, GST_P2, GST_P3],
            icon: <Award className="text-secondary" size={24} />,
        },
        {
            name: 'MSME Certificate',
            description: 'MINISTRY OF MSME • UDYAM REGISTRATION',
            images: [MSME_P1, MSME_P2, MSME_P3, MSME_P4],
            icon: <CheckCircle className="text-secondary" size={24} />,
        }
    ];

    return (
        <div className="pt-32 pb-40 min-h-screen bg-[#f8fafc] select-none overflow-x-hidden relative">
            {/* Background Decorative Gradient */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-gradient-to-b from-secondary/[0.07] to-transparent pointer-events-none" />

            <div className="container px-4 md:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto text-center mb-12"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-white shadow-lg rounded-full text-secondary text-[9px] font-black uppercase tracking-[0.3em] mb-8 border border-slate-50"
                    >
                        <Lock size={12} className="animate-pulse" />
                        SECURED DIGITAL ARCHIVE
                    </motion.div>
                    <h1 className="text-5xl md:text-6xl font-black text-primary tracking-tighter mb-8 uppercase leading-[0.85]">
                        TRUST <br />
                        <span className="text-secondary italic">VERIFIED</span>
                    </h1>
                    <div className="w-24 h-1.5 bg-secondary mx-auto mb-8 rounded-full shadow-[0_0_15px_rgba(var(--secondary-rgb),0.2)]" />
                    <p className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto font-bold tracking-tight">
                        Our verified government artifacts presented in a premium interactive environment.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-[1300px] mx-auto items-start">
                    {certificates.map((cert, index) => (
                        <div key={cert.name} className="flex flex-col items-center">
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="mb-8 flex flex-col items-center text-center group"
                            >
                                <div className="w-14 h-14 rounded-[1.2rem] bg-white shadow-xl flex items-center justify-center border border-slate-50 text-secondary mb-4 group-hover:bg-secondary group-hover:text-white transition-all duration-700 transform group-hover:rotate-[360deg] group-hover:scale-110">
                                    {cert.icon}
                                </div>
                                <h3 className="text-2xl font-black text-primary uppercase tracking-tighter group-hover:text-secondary transition-colors duration-500">{cert.name}</h3>
                                <p className="text-slate-400 font-black text-[9px] tracking-[0.3em] uppercase mt-2">{cert.description}</p>
                            </motion.div>

                            <FlipBookComponent images={cert.images} name={cert.name} index={index} />
                        </div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-32 p-10 bg-white border border-slate-100 rounded-[3rem] text-center relative overflow-hidden shadow-xl max-w-5xl mx-auto"
                >
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                        <div className="flex items-center gap-6 text-left">
                            <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                                <ShieldCheck size={32} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-primary uppercase tracking-tight mb-1">Authenticated Global Entity</h2>
                                <p className="text-slate-500 text-sm font-medium">Verified by Government of India Trade Authorities</p>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-center md:justify-end gap-4 items-center">
                            <div className="flex items-center gap-3 bg-slate-50 px-5 py-2.5 rounded-xl border border-slate-100">
                                <Lock className="text-secondary" size={14} />
                                <span className="text-[10px] font-black text-primary tracking-[0.2em] uppercase">AES-256 Secured</span>
                            </div>
                            <div className="flex items-center gap-3 bg-slate-50 px-5 py-2.5 rounded-xl border border-slate-100">
                                <CheckCircle className="text-secondary" size={14} />
                                <span className="text-[10px] font-black text-primary tracking-[0.2em] uppercase">Trade Integrity</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Certificates;
