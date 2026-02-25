import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

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
        }, 6000);
        return () => clearInterval(timer);
    }, [images.length]);

    return (
        <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-primary">
            {/* Background Slideshow */}
            <div className="absolute inset-0 z-0 bg-black">
                <AnimatePresence initial={false}>
                    <motion.div
                        key={currentImage}
                        initial={{ opacity: 0, scale: 1.2 }}
                        animate={{ opacity: 0.6, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        transition={{
                            opacity: { duration: 2.5, ease: "easeInOut" },
                            scale: { duration: 6, ease: [0.33, 1, 0.68, 1] }
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
                <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/40 to-transparent z-10" />
                <div className="absolute inset-0 bg-black/40 z-10" />
            </div>

            <div className="container relative z-20">
                <div className="max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="flex items-center gap-4 mb-6"
                    >
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: 48 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="h-px bg-secondary"
                        />
                        <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.4em] text-secondary">
                            Fastest & Secured Export Solutions
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-5xl md:text-8xl mb-6 leading-[1.05] text-white font-black text-shadow-lg tracking-tighter"
                    >
                        Connecting <span className="text-secondary italic">India</span> <br />
                        <span className="text-white/90 font-light">to the Global Market.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
                        className="text-xl md:text-3xl text-white/70 mb-8 max-w-3xl leading-relaxed font-medium"
                    >
                        Dhuruvan Exports is a premier export house specializing in high-quality agricultural products and exquisite woodcrafts. We deliver excellence with guaranteed reliability.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
                        className="flex flex-wrap gap-6 mb-12"
                    >
                        <motion.a
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            href="#products"
                            className="btn btn-secondary px-10 py-5 text-sm shadow-2xl shadow-secondary/30 hover:shadow-secondary/50 font-black tracking-widest uppercase group"
                        >
                            Explore Catalog <ArrowRight size={20} className="ml-2 transition-transform group-hover:translate-x-1" />
                        </motion.a>
                        <motion.a
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            href="#contact"
                            className="btn bg-white/10 border border-white/20 text-white hover:bg-white hover:text-primary transition-all px-10 py-5 text-sm backdrop-blur-md font-black tracking-widest uppercase"
                        >
                            Get A Quote
                        </motion.a>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="flex flex-wrap items-center gap-10 md:gap-20"
                    >
                        {[
                            { label: 'Countries Served', value: '15+' },
                            { label: 'Global Partnerships', value: '25+' },
                            { label: 'Quality Rating', value: '4.9/5' },
                        ].map((stat, i) => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.2 + (i * 0.1), duration: 0.8 }}
                                key={i}
                                className="flex flex-col border-l-2 border-secondary/30 pl-8"
                            >
                                <span className="text-4xl md:text-5xl font-black text-white tabular-nums tracking-tighter">{stat.value}</span>
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mt-2">{stat.label}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-12 right-12 z-30 flex flex-col gap-5">
                {images.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentImage(idx)}
                        className={`group relative h-1.5 rounded-full transition-all duration-500 overflow-hidden ${currentImage === idx ? 'bg-secondary w-20' : 'bg-white/20 w-12 hover:bg-white/40'}`}
                    >
                        {currentImage === idx && (
                            <motion.span
                                initial={{ x: "-100%" }}
                                animate={{ x: "0%" }}
                                transition={{ duration: 6, ease: "linear" }}
                                className="absolute inset-0 bg-white/40"
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{
                    y: [0, 15, 0],
                    opacity: [0.5, 1, 0.5]
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 w-7 h-12 border-2 border-white/20 rounded-full flex justify-center p-2 hidden md:flex z-30"
            >
                <motion.div
                    animate={{ height: [4, 12, 4] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-1 bg-secondary rounded-full"
                />
            </motion.div>
        </section>
    );
};

export default Hero;
