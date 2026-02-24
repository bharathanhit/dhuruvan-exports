import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, TrendingUp } from 'lucide-react';

const Hero = () => {
    const images = [
        "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=2000", // Plane
        "https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&q=80&w=2000", // Ship
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2000"  // Warehouse
    ];

    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden bg-primary">
            {/* Background Slideshow */}
            <div className="absolute inset-0 z-0 bg-black">
                <AnimatePresence initial={false}>
                    <motion.div
                        key={currentImage}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 0.4, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            opacity: { duration: 2.5, ease: "easeInOut" },
                            scale: { duration: 8, ease: "linear" }
                        }}
                        className="absolute inset-0"
                    >
                        <img
                            src={images[currentImage]}
                            alt="Global Logistics"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                </AnimatePresence>
                {/* Consistent Dark Overlay for Text Visibility */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/60 to-transparent z-10" />
                <div className="absolute inset-0 bg-black/60 z-10" />
            </div>

            <div className="container relative z-20 px-6">
                <div className="max-w-xl">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex items-center gap-4 mb-8"
                    >
                        <div className="h-px w-12 bg-secondary" />
                        <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] text-secondary">
                            Fastest & Secured Export Solutions
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-5xl md:text-7xl mb-8 leading-[1.1] text-white font-bold text-shadow-lg"
                    >
                        Connecting <span className="text-secondary italic">India</span> <br />
                        <span className="text-white/90 font-light">to the Global Market.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-2xl md:text-3xl text-blue-100/70 mb-12 max-w-4xl leading-loose font-bold tracking-widest"
                        style={{ wordSpacing: '0.3rem' }}
                    >
                        Dhuruvan Exports is a premier export house specializing in high-quality agricultural products and exquisite woodcrafts. We deliver excellence from our fields to your doorstep with guaranteed reliability.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="flex flex-wrap gap-6"
                    >
                        <a href="#products" className="btn btn-secondary px-10 py-5 text-lg shadow-2xl shadow-secondary/30 hover:shadow-secondary/50 font-black tracking-widest uppercase">
                            Explore Catalog <ArrowRight size={20} className="ml-2" />
                        </a>
                        <a href="#contact" className="btn border-2 border-white/30 text-white hover:bg-white hover:text-primary transition-all px-10 py-5 text-lg backdrop-blur-sm font-black tracking-widest uppercase">
                            Get A Quote
                        </a>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="mt-20 flex items-center gap-12"
                    >
                        {[
                            { label: 'Countries Served', value: '15+' },
                            { label: 'Global Partnerships', value: '25+' },
                            { label: 'Quality Rating', value: '4.9/5' },
                        ].map((stat, i) => (
                            <div key={i} className="flex flex-col border-l-2 border-secondary/50 pl-6">
                                <span className="text-4xl font-black text-white tabular-nums">{stat.value}</span>
                                <span className="text-[10px] uppercase tracking-[0.3em] font-black text-blue-200/60 mt-2">{stat.label}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-10 right-10 z-30 flex flex-col gap-4">
                {images.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentImage(idx)}
                        className={`w-12 h-1.5 rounded-full transition-all duration-500 ${currentImage === idx ? 'bg-secondary w-16' : 'bg-white/30'}`}
                    />
                ))}
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-2 hidden md:flex z-30"
            >
                <div className="w-1 h-2 bg-secondary rounded-full" />
            </motion.div>
        </section>
    );
};



export default Hero;
