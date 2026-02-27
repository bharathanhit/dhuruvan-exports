import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Award, Target, Eye, Globe2, Users, HeartHandshake } from 'lucide-react';

const AboutPage = () => {
    return (
        <div className="pt-24 min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative py-24 bg-slate-50 overflow-hidden">
                <div className="container px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <h1 className="text-6xl md:text-6xl font-black text-primary tracking-tighter mb-8 uppercase leading-[0.85]">
                            A Legacy of <br />
                            <span className="text-secondary italic">Indian Excellence</span>
                        </h1>
                        <p className="text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto font-medium">
                            Bridging the gap between India's finest producers and the global market with integrity, quality, and an unwavering commitment to transparency.
                        </p>
                    </motion.div>
                </div>
                {/* Decorative background flair */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/[0.03] rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            </section>

            {/* Core Story Section */}
            <section className="py-24 md:py-32 overflow-hidden bg-white">
                <div className="container px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    <div className="relative">
                        <div className="grid grid-cols-2 gap-6">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1 }}
                                className="space-y-6 pt-12"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=400"
                                    className="rounded-[3rem] shadow-2xl border-2 border-slate-100 object-cover aspect-[4/5]"
                                    alt="Business Meeting"
                                />
                                <img
                                    src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=400"
                                    className="rounded-[3rem] shadow-2xl border-2 border-slate-100 object-cover aspect-square"
                                    alt="Logistics"
                                />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className="space-y-6"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=400"
                                    className="rounded-[3rem] shadow-2xl border-2 border-slate-100 object-cover aspect-square"
                                    alt="Agriculture"
                                />
                                <img
                                    src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=400"
                                    className="rounded-[3rem] shadow-2xl border-2 border-slate-100 object-cover aspect-[4/5]"
                                    alt="Dhuruvan Exports Operations"
                                />
                            </motion.div>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-black text-primary mb-8 leading-tight tracking-tighter uppercase">
                            Global Integrity. <br />
                            <span className="text-secondary">Local Heritage.</span>
                        </h2>
                        <div className="space-y-6 text-lg text-slate-500 font-medium">
                            <p>
                                At Dhuruvan Exports, we don't just export products; we export trust. For over a decade, we have dedicated ourselves to showcasing the rich agricultural and artisanal heritage of India to the world.
                            </p>
                            <p>
                                Based in the heart of India's production hubs, we maintain direct relationships with farmers and artisans, ensuring that every shipment meets the highest international standards while supporting local communities.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-8 mt-12">
                            <div className="group">
                                <div className="text-4xl font-black text-primary mb-2 tracking-tighter group-hover:text-secondary transition-colors">150+</div>
                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Partners</div>
                            </div>
                            <div className="group">
                                <div className="text-4xl font-black text-primary mb-2 tracking-tighter group-hover:text-secondary transition-colors">25+</div>
                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Export Countries</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Mission & Vision Section */}
            <section className="py-24 bg-primary text-white overflow-hidden relative">
                <div className="container px-6 grid grid-cols-1 md:grid-cols-2 gap-20 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="w-16 h-16 rounded-[1.5rem] bg-white/10 flex items-center justify-center text-secondary mb-8 border border-white/10">
                            <Target size={32} />
                        </div>
                        <h3 className="text-3xl font-black mb-6 uppercase tracking-tight">Our Mission</h3>
                        <p className="text-white/60 text-xl font-medium leading-relaxed">
                            To deliver premium Indian products to the global market by fostering sustainable partnerships, ensuring uncompromising quality, and maintaining ethical trade practices at every step of the supply chain.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="w-16 h-16 rounded-[1.5rem] bg-white/10 flex items-center justify-center text-secondary mb-8 border border-white/10">
                            <Eye size={32} />
                        </div>
                        <h3 className="text-3xl font-black mb-6 uppercase tracking-tight">Our Vision</h3>
                        <p className="text-white/60 text-xl font-medium leading-relaxed">
                            To become the world's most trusted gateway for Indian exports, recognized for our commitment to quality, innovation, and the positive impact we create for our local producers and global clients.
                        </p>
                    </motion.div>
                </div>

                {/* Decorative background flair */}
                <div className="absolute -bottom-20 -right-20 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl opacity-50" />
            </section>

            {/* Core Values Section */}
            <section className="py-24 md:py-32 bg-slate-50">
                <div className="container px-6">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-4xl md:text-6xl font-black text-primary tracking-tighter mb-6 uppercase">Our Core Values</h2>
                        <div className="w-24 h-2 bg-secondary mx-auto rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: <Globe2 size={24} />,
                                title: "Global mindset",
                                desc: "Understanding international markets and cultures to better serve our diverse clientele."
                            },
                            {
                                icon: <ShieldCheck size={24} />,
                                title: "Unwavering Quality",
                                desc: "Strict adherence to ISO standards and rigorous quality control protocols."
                            },
                            {
                                icon: <HeartHandshake size={24} />,
                                title: "Ethical Trade",
                                desc: "Empowering our producers through fair pricing and sustainable practices."
                            },
                            {
                                icon: <Users size={24} />,
                                title: "Client First",
                                desc: "Dedicated support and customized solutions for every export requirement."
                            }
                        ].map((val, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-primary group-hover:bg-secondary group-hover:text-white transition-all duration-500 mb-6">
                                    {val.icon}
                                </div>
                                <h4 className="text-xl font-black text-primary mb-4 uppercase tracking-tight">{val.title}</h4>
                                <p className="text-slate-500 font-medium leading-relaxed text-sm">{val.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
};

export default AboutPage;
