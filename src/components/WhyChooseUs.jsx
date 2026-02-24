import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, Globe, Leaf, Users, Award, Sparkles } from 'lucide-react';
import worldmapImg from '../assets/worldmap.jpg';

const FeatureItem = ({ icon: Icon, title, description, index }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ y: -8, backgroundColor: "rgba(20, 32, 61, 0.9)", transition: { duration: 0.15 } }}
        whileTap={{ scale: 0.95, backgroundColor: "#2563eb", transition: { duration: 0.05 } }}
        transition={{ delay: index * 0.1, duration: 0.3 }}
        className="relative group pt-16 px-8 pb-32 rounded-[2.5rem] cursor-pointer overflow-hidden shadow-2xl backdrop-blur-2xl border border-white/20 hover:border-white/10 flex flex-col items-center text-center bg-white/85 max-w-[380px] mx-auto w-full"
    >
        <div className="relative z-10 flex flex-col items-center">
            {/* Icon Box */}
            <div className="w-20 h-20 mb-8 flex items-center justify-center rounded-2xl transition-all duration-150
                          bg-blue-50 border border-blue-100 group-hover:bg-white/20 group-hover:border-white/30">
                <Icon size={40} className="text-slate-600 transition-colors duration-150 group-hover:text-white" strokeWidth={1.5} />
            </div>

            {/* Title */}
            <h3 className="text-2xl font-black mb-4 tracking-tight transition-colors duration-150 
                          text-slate-300 group-hover:text-white">
                {title}
            </h3>

            {/* Description */}
            <p className="text-base leading-relaxed font-semibold transition-colors duration-75
                         text-slate-400 group-hover:text-white">
                {description}
            </p>
        </div>
    </motion.div>
);

const WhyChooseUs = () => {
    const features = [
        {
            icon: ShieldCheck,
            title: "Uncompromising Quality",
            description: "Every product undergoes multi-stage quality checks to ensure it meets international export standards and your specific requirements."
        },
        {
            icon: Globe,
            title: "Global Connectivity",
            description: "With a robust network across 15+ countries, we handle the complexities of international trade so you don't have to."
        },
        {
            icon: Leaf,
            title: "Sustainable Practices",
            description: "Our products are ethically sourced with deep respect for local farmers and environments, ensuring a legacy of sustainability."
        },
        {
            icon: Truck,
            title: "Reliable Logistics",
            description: "We partner with top-tier logistics providers for seamless door-to-door delivery, no matter where your business is located."
        },
        {
            icon: Users,
            title: "Client-Centricity",
            description: "Your business is unique. We provide tailored solutions and dedicated support to help you achieve your market expansion goals."
        },
        {
            icon: Award,
            title: "Certified Excellence",
            description: "As a government-recognized export house, we bring the highest level of trust and legitimacy to every transaction."
        }
    ];

    return (
        <section id="why-choose" className="pt-48 pb-64 px-6 bg-[#0F172A] relative overflow-hidden">
            {/* Background Map Visual with tinted overlay */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <img
                    src={worldmapImg}
                    alt="Global World Map"
                    className="w-full h-full object-cover opacity-[0.2] grayscale brightness-50"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A] via-transparent to-[#0F172A] opacity-90" />
            </div>

            {/* Glowing Orbs */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" />
            </div>

            <div className="container relative z-10 text-center mb-16">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 mb-8"
                >
                    <Sparkles size={16} className="text-slate-400" />
                    <span className="text-xs font-black uppercase tracking-[0.4em] text-slate-400">
                        The Dhuruvan Edge
                    </span>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-7xl font-black text-slate-200 mb-8 tracking-tight"
                >
                    Value Beyond <span className="text-slate-400 italic">Boundaries.</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-lg text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed"
                >
                    We don't just export products; we build long-term relationships based on transparency, quality, and mutual growth.
                </motion.p>
            </div>

            <div className="container relative z-10">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <FeatureItem key={idx} index={idx} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
