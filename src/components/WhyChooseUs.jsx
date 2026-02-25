import { motion } from 'framer-motion';
import { ShieldCheck, Truck, Globe, Leaf, Users, Award, Sparkles } from 'lucide-react';
import worldmapImg from '../assets/worldmap.jpg';

const FeatureItem = ({ icon: Icon, title, description, index }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        className="group relative pt-12 px-8 pb-16 rounded-[2.5rem] cursor-pointer overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 bg-white border border-slate-100 flex flex-col items-center text-center w-full max-w-sm mx-auto"
    >
        <div className="relative z-10">
            {/* Icon Box */}
            <div className="w-20 h-20 mb-8 flex items-center justify-center rounded-2xl bg-slate-50 border border-slate-100 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                <Icon size={40} className="text-slate-400 group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
            </div>

            {/* Title */}
            <h3 className="text-2xl font-black mb-4 tracking-tight text-primary">
                {title}
            </h3>

            {/* Description */}
            <p className="text-base leading-relaxed font-medium text-slate-500">
                {description}
            </p>
        </div>

        {/* Subtle background glow on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
        <section id="why-choose" className="py-24 md:py-32 bg-slate-50 relative overflow-hidden">
            {/* Background Map Visual */}
            <div className="absolute inset-x-0 top-0 h-full pointer-events-none opacity-[0.03] grayscale">
                <img
                    src={worldmapImg}
                    alt="World Map"
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="container relative z-10 text-center mb-16 px-6">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-3 px-4 py-2 bg-white rounded-full shadow-sm border border-slate-100 mb-8"
                >
                    <Sparkles size={14} className="text-secondary" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                        The Dhuruvan Edge
                    </span>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-7xl font-black text-primary mb-8 tracking-tighter"
                >
                    Value Beyond <span className="text-secondary italic">Boundaries.</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-lg md:text-xl text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed"
                >
                    We don't just export products; we build long-term relationships based on transparency, quality, and mutual growth.
                </motion.p>
            </div>

            <div className="container relative z-10 px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <FeatureItem key={idx} index={idx} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
