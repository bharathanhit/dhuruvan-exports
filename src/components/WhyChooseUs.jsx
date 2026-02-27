import { motion } from 'framer-motion';
import { ShieldCheck, Truck, Globe, Leaf, Users, Award, Sparkles } from 'lucide-react';
import worldmapImg from '../assets/worldmap.jpg';

const FeatureItem = ({ icon: Icon, title, description, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.8 }}
        whileHover={{
            y: -12,
            scale: 1.02,
            transition: { duration: 0.4, ease: "easeOut" }
        }}
        className="group relative m-2 pt-12 px-8 pb-16 rounded-[3rem] cursor-pointer overflow-hidden transition-all duration-700 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col items-center text-center w-full max-w-sm mx-auto hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] hover:border-secondary/30"
    >
        {/* Subtle Background Overlay/Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-40 group-hover:opacity-100 transition-opacity duration-700" />

        {/* Animated Shine Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-700 bg-gradient-to-tr from-transparent via-white to-transparent -translate-x-full group-hover:translate-x-full rotate-45 pointer-events-none" />

        <div className="relative z-10 w-full flex flex-col items-center">
            {/* Icon Box */}
            <div className="w-20 h-20 mb-10 flex items-center justify-center rounded-[2rem] bg-slate-50 border border-slate-100 group-hover:bg-secondary group-hover:border-secondary transition-all duration-500 shadow-sm relative">
                <Icon size={40} className="text-secondary group-hover:text-white transition-colors duration-500 relative z-10" strokeWidth={1.5} />
            </div>

            {/* Title */}
            <h3 className="text-2xl font-black mb-4 tracking-tight text-primary group-hover:text-secondary transition-colors duration-300">
                {title}
            </h3>

            {/* Description */}
            <p className="text-base leading-relaxed font-medium text-slate-500 group-hover:text-slate-700 transition-colors duration-300 px-2">
                {description}
            </p>
        </div>

        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl" />
    </motion.div>
);

const WhyChooseUs = () => {
    const features = [
        {
            icon: ShieldCheck,
            title: "Uncompromising Quality",
            description: "Every product undergoes multi-stage quality checks to ensure it meets international export standards."
        },
        {
            icon: Globe,
            title: "Global Connectivity",
            description: "With a robust network across 15+ countries, we handle the complexities of international trade."
        },
        {
            icon: Leaf,
            title: "Sustainable Practices",
            description: "Our products are ethically sourced with deep respect for local farmers and environments."
        },
        {
            icon: Truck,
            title: "Reliable Logistics",
            description: "We partner with top-tier logistics providers for seamless door-to-door delivery worldwide."
        },
        {
            icon: Users,
            title: "Client-Centricity",
            description: "We provide tailored solutions and dedicated support to help you achieve your market expansion goals."
        },
        {
            icon: Award,
            title: "Certified Excellence",
            description: "As a government-recognized export house, we bring the highest level of trust to every transaction."
        }
    ];

    return (
        <section id="why-choose" className="py-24 md:py-32 bg-white relative overflow-hidden">
            {/* High-End Background System */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                {/* Subtle Dot Grid */}
                <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:40px_40px] opacity-40" />

                {/* The Map as a visible background watermark */}
                <motion.div
                    initial={{ scale: 1.05, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 0.15 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2.5, ease: "easeOut" }}
                    className="absolute inset-0 flex items-center justify-center grayscale"
                >
                    <img
                        src={worldmapImg}
                        alt="Global Network"
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                {/* Soft gradient to blend the map */}
                <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white z-10" />

                {/* Ambient Designer Glows */}
                <div className="absolute top-0 right-[-10%] w-[800px] h-[800px] bg-secondary/[0.03] rounded-full blur-[120px] z-10" />
                <div className="absolute bottom-0 left-[-10%] w-[800px] h-[800px] bg-primary/[0.03] rounded-full blur-[120px] z-10" />
            </div>

            <div className="container relative z-20 text-center mb-24 px-6">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-3 px-6 py-2.5 bg-white rounded-full border border-slate-100 shadow-sm mb-8"
                >
                    <Sparkles size={16} className="text-secondary" />
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">
                        The Dhuruvan Edge
                    </span>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-7xl font-black text-primary mb-8 tracking-tighter leading-[0.9]"
                >
                    Value Beyond <br />
                    <span className="text-secondary italic">Boundaries.</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed"
                >
                    We don't just export products; we build long-term relationships based on transparency, quality, and mutual growth.
                </motion.p>
            </div>

            <div className="container relative z-20 px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                    {features.map((feature, idx) => (
                        <FeatureItem key={idx} index={idx} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;









