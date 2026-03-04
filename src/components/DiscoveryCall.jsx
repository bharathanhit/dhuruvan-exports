import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

const DiscoveryCall = () => {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background Spices Illustration (Generated Asset) */}
            <div className="absolute inset-x-0 top-0 h-full pointer-events-none opacity-80 lg:opacity-100">
                {/* chili (top left) */}
                <motion.div
                    initial={{ x: -100, rotate: -20, opacity: 0 }}
                    whileInView={{ x: 0, rotate: -15, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="absolute top-10 -left-10 md:left-20 w-48 h-auto"
                >
                    <img src="/discovery_call_bg_elements.png" alt="" className="w-full h-auto drop-shadow-2xl" />
                </motion.div>

                {/* cinnamon/star anise (top right) */}
                <motion.div
                    initial={{ x: 100, y: -50, opacity: 0 }}
                    whileInView={{ x: 0, y: 0, opacity: 1 }}
                    transition={{ duration: 1.2, delay: 0.2 }}
                    className="absolute top-20 right-10 md:right-40 w-56 h-auto"
                >
                    <img src="/discovery_call_bg_elements.png" alt="" className="w-full h-auto drop-shadow-xl saturate-150 rotate-45 scale-75" />
                </motion.div>

                {/* turmeric roots (bottom center) */}
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.4 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 w-64 h-auto"
                >
                    <img src="/discovery_call_bg_elements.png" alt="" className="w-full h-auto drop-shadow-2xl brightness-110 saturate-125 -rotate-12" />
                </motion.div>

                {/* Scattered leaves */}
                <motion.div
                    animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 right-20 w-32 h-auto hidden lg:block"
                >
                    <img src="/discovery_call_bg_elements.png" alt="" className="w-full h-auto opacity-40 blur-[1px]" />
                </motion.div>
            </div>

            <div className="container relative z-10 px-6 max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center"
                >
                    <h2 className="text-4xl md:text-6xl font-black text-[#B91C1C] mb-8 leading-tight tracking-tighter">
                        SCHEDULE <br />
                        YOUR <br />
                        DISCOVERY <br />
                        CALL
                    </h2>

                    <motion.a
                        href="/#contact"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative inline-flex items-center justify-center px-10 py-5 bg-[#B91C1C] rounded-full overflow-hidden transition-all shadow-[0_15px_35px_rgba(185,28,28,0.25)]"
                    >
                        <span className="relative font-black text-[12px] uppercase tracking-[0.2em] text-yellow-400">
                            Schedule Now
                        </span>
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
};

export default DiscoveryCall;
