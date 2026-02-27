import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <section id="about" className="py-16 md:py-20 overflow-hidden bg-white">
            <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div className="relative order-2 lg:order-1">
                    <div className="grid grid-cols-2 gap-4 md:gap-6">
                        <div className="space-y-4 md:space-y-6 pt-12">
                            <motion.div
                                initial={{ opacity: 0, x: -50, y: 20 }}
                                whileInView={{ opacity: 1, x: 0, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: "easeOut" }}
                            >
                                <motion.img
                                    whileHover={{ scale: 1.05, rotate: -1 }}
                                    src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=400"
                                    className="rounded-2xl md:rounded-[2rem] shadow-xl border-4 border-white object-cover aspect-[4/5]"
                                    alt="Business Meeting"
                                />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: -30, y: 50 }}
                                whileInView={{ opacity: 1, x: 0, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                            >
                                <motion.img
                                    whileHover={{ scale: 1.05, rotate: 1 }}
                                    src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=400"
                                    className="rounded-2xl md:rounded-[2rem] shadow-xl border-4 border-white object-cover aspect-square"
                                    alt="Logistics"
                                />
                            </motion.div>
                        </div>
                        <div className="space-y-4 md:space-y-6">
                            <motion.div
                                initial={{ opacity: 0, x: 30, y: -50 }}
                                whileInView={{ opacity: 1, x: 0, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
                            >
                                <motion.img
                                    whileHover={{ scale: 1.05, rotate: 1 }}
                                    src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=400"
                                    className="rounded-2xl md:rounded-[2rem] shadow-xl border-4 border-white object-cover aspect-square"
                                    alt="Agriculture"
                                />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: 50, y: -20 }}
                                whileInView={{ opacity: 1, x: 0, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                            >
                                <motion.img
                                    whileHover={{ scale: 1.05, rotate: -1 }}
                                    src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=400"
                                    className="rounded-2xl md:rounded-[2rem] shadow-xl border-4 border-white object-cover aspect-[4/5]"
                                    alt="Dhuruvan Exports Operations"
                                />
                            </motion.div>
                        </div>
                    </div>
                    {/* Decorative element */}
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 90, 180, 270, 360]
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-10 -left-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl -z-10"
                    />
                </div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="order-1 lg:order-2"
                >
                    <div className="inline-flex items-center px-5 py-2 bg-secondary/10 border border-secondary/20 rounded-full text-secondary text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                        Our Story
                    </div>
                    <h2 className="text-4xl md:text-6xl text-primary font-black mb-6 leading-[1.1] tracking-tighter">
                        A Legacy of <br /> <span className="text-secondary italic">Global Trust.</span>
                    </h2>
                    <p className="text-lg md:text-xl text-slate-500 mb-8 leading-relaxed font-medium">
                        Dhuruvan Exports was founded on the principles of integrity, quality, and reliability. We bridge the gap between Indian producers and global markets with unmatched transparency.
                    </p>

                    <div className="space-y-4 mb-10">
                        {[
                            "Ethical Sourcing Practices",
                            "ISO Certified Quality Management",
                            "End-to-end Logistics Support",
                            "Multilingual Customer Service"
                        ].map((item, idx) => (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                key={idx}
                                className="flex items-center gap-4 text-primary group"
                            >
                                <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary transition-all duration-300">
                                    <CheckCircle2 size={14} className="text-secondary group-hover:text-white transition-colors" />
                                </div>
                                <span className="font-bold tracking-tight text-sm md:text-base">{item}</span>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="grid grid-cols-2 gap-6 m-2 p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden"
                    >
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="flex flex-col gap-4 relative z-10"
                        >
                            <div className="w-14 h-14 bg-white rounded-2xl shadow-md flex items-center justify-center text-primary transform -rotate-3 transition-transform hover:rotate-0">
                                <ShieldCheck size={28} />
                            </div>
                            <span className="font-black text-[10px] uppercase tracking-widest text-slate-400">Govt. Certified</span>
                        </motion.div>
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="flex flex-col gap-4 relative z-10"
                        >
                            <div className="w-14 h-14 bg-white rounded-2xl shadow-md flex items-center justify-center text-primary transform rotate-6 transition-transform hover:rotate-0">
                                <Award size={28} />
                            </div>
                            <span className="font-black text-[10px] uppercase tracking-widest text-slate-400">Award Winning</span>
                        </motion.div>
                        {/* Subtle background flair */}
                        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-secondary/5 rounded-full blur-3xl" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                        className="mt-10"
                    >
                        <Link to="/about" className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-secondary transition-all duration-500 group">
                            Discover Our Full Story
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
