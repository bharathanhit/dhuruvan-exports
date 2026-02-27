import { motion } from 'framer-motion';
import { Quote, Star, Sparkles, Building2 } from 'lucide-react';

const TestimonialCard = ({ quote, name, position, company, image, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.8 }}
        whileHover={{ y: -10 }}
        className="group relative m-2 p-8 md:p-10 rounded-[3rem] bg-white border border-slate-100 shadow-[0_15px_40px_-20px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(0,43,88,0.12)] transition-all duration-700 flex flex-col h-full"
    >
        {/* Subtle Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[3rem]" />

        {/* Quote Icon */}
        <div className="mb-8 relative">
            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-secondary relative z-10 group-hover:bg-secondary group-hover:text-white transition-all duration-500 shadow-sm">
                <Quote size={28} />
            </div>
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-secondary/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Quote Text */}
        <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed italic mb-10 relative z-10">
            "{quote}"
        </p>

        {/* Author Info */}
        <div className="mt-auto flex items-center gap-5 relative z-10 pt-8 border-t border-slate-50">
            <div className="relative">
                <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-lg border-2 border-white group-hover:border-secondary transition-colors duration-500">
                    <img src={image} alt={name} className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-secondary text-white rounded-lg flex items-center justify-center shadow-lg">
                    <Star size={10} fill="currentColor" />
                </div>
            </div>
            <div className="flex flex-col">
                <h4 className="font-black text-primary text-lg tracking-tight">{name}</h4>
                <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                    <span>{position}</span>
                    <span className="w-1 h-1 bg-slate-200 rounded-full" />
                    <span className="text-secondary">{company}</span>
                </div>
            </div>
        </div>

        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl" />
    </motion.div>
);

const Testimonials = () => {
    const testimonials = [
        {
            quote: "Dhuruvan Exports has been our primary source for premium Basmati rice for over 3 years. Their consistency in quality and logistical reliability is unmatched in the industry.",
            name: "Marcus Thompson",
            position: "Procurement Director",
            company: "Global Grains UK",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop"
        },
        {
            quote: "The transparency they bring to the export process is refreshing. From certification to final delivery, every step is handled with professional precision and care.",
            name: "Sofia Rodriguez",
            position: "Supply Chain Manager",
            company: "Al-Zahrani Trading",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop"
        },
        {
            quote: "Their woodcraft collection exceeded our expectations. The artisanal quality and sustainable sourcing practices align perfectly with our luxury interior brand.",
            name: "Chen Wei",
            position: "Chief Curator",
            company: "Oriental Designs SG",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop"
        }
    ];

    return (
        <section className="py-24 md:py-32 bg-white relative overflow-hidden">
            {/* Background Flair */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-slate-50 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2 pointer-events-none" />

            {/* Content Container */}
            <div className="container relative z-10">
                <div className="flex flex-col items-center text-center mb-20 px-6">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-3 px-6 py-2.5 bg-slate-50 border border-slate-100 rounded-full mb-8"
                    >
                        <Sparkles size={16} className="text-secondary" />
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">
                            Global Recognition
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-7xl font-black text-primary mb-8 tracking-tighter leading-[0.9]"
                    >
                        Trusted by <br />
                        <span className="text-secondary italic">Industry Leaders.</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed"
                    >
                        Join the expanding network of global partners who experience the Dhuruvan advantage every day through quality and trust.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
                    {testimonials.map((testimonial, idx) => (
                        <TestimonialCard key={idx} index={idx} {...testimonial} />
                    ))}
                </div>

                {/* Trust Badges Marquee (static for now) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-24 pt-16 border-t border-slate-50 flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-700"
                >
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-center gap-3 text-slate-400 font-black tracking-widest text-[10px] uppercase">
                            <Building2 size={24} />
                            Partner Organization {i}
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;
