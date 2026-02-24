import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Award } from 'lucide-react';

const About = () => {
    return (
        <section id="about" className="section-padding overflow-hidden bg-white">
            <div className="container grid md:grid-cols-2 gap-20 items-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="relative"
                >
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-6 pt-12">
                            <motion.img
                                whileHover={{ scale: 1.05 }}
                                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=400"
                                className="rounded-3xl shadow-2xl border-4 border-white"
                                alt="Business Meeting"
                            />
                            <motion.img
                                whileHover={{ scale: 1.05 }}
                                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=400"
                                className="rounded-3xl shadow-2xl border-4 border-white"
                                alt="Logistics"
                            />
                        </div>
                        <div className="space-y-6">
                            <motion.img
                                whileHover={{ scale: 1.05 }}
                                src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=400"
                                className="rounded-3xl shadow-2xl border-4 border-white"
                                alt="Agriculture"
                            />
                            <motion.img
                                whileHover={{ scale: 1.05 }}
                                src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=400"
                                className="rounded-3xl shadow-2xl border-4 border-white"
                                alt="Dhuruvan Exports Operations"
                            />
                        </div>
                    </div>
                    {/* Decorative element */}
                    <div className="absolute -z-10 -top-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl animate-pulse" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-block bg-secondary/10 text-secondary text-[10px] font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-full mb-6">
                        Our Story
                    </div>
                    <h2 className="text-4xl md:text-6xl text-primary font-bold mb-8 leading-tight">A Legacy of <br /> <span className="text-secondary italic">Global Trust.</span></h2>
                    <p className="text-xl text-gray-500 mb-8 leading-relaxed">
                        Dhuruvan Exports was founded on the principles of integrity, quality, and reliability. We bridge the gap between Indian producers and global markets with unmatched transparency.
                    </p>

                    <div className="space-y-5 mb-12">
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
                                className="flex items-center gap-4 text-primary group cursor-default"
                            >
                                <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary transition-colors duration-300">
                                    <CheckCircle2 size={14} className="text-secondary group-hover:text-white transition-colors" />
                                </div>
                                <span className="font-bold tracking-tight">{item}</span>
                            </motion.div>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 gap-8 p-10 bg-slate-50 rounded-[2rem] border border-gray-100 shadow-sm">
                        <div className="flex flex-col gap-4">
                            <div className="w-14 h-14 bg-white rounded-2xl shadow-md flex items-center justify-center text-primary transform -rotate-3">
                                <ShieldCheck size={28} />
                            </div>
                            <span className="font-black text-xs uppercase tracking-widest text-gray-400">Govt. Certified</span>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="w-14 h-14 bg-white rounded-2xl shadow-md flex items-center justify-center text-primary transform rotate-6">
                                <Award size={28} />
                            </div>
                            <span className="font-black text-xs uppercase tracking-widest text-gray-400">Award Winning</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};


export default About;
