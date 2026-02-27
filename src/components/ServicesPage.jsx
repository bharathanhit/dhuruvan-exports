import React from 'react';
import { motion } from 'framer-motion';
import {
    Package,
    Truck,
    ShieldCheck,
    Search,
    Zap,
    Globe,
    Layout,
    Compass,
    CheckCircle2,
    ArrowRight,
    BarChart3
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ServicesPage = () => {
    const services = [
        {
            icon: <Layout className="w-8 h-8" />,
            title: "Private Label Packaging",
            desc: "Complete end-to-end solutions from design to retail-ready packaging. We help brands launch their own lines with premium Indian products.",
            features: ["Custom Label Design", "Multiple Packaging Formats", "Barcoding & Compliance", "Mono Cartons & Pouches"],
            color: "bg-blue-500",
            dark: true
        },
        {
            icon: <Truck className="w-8 h-8" />,
            title: "Global Logistics",
            desc: "Multimodal transport solutions ensuring your cargo reaches any port worldwide with precision and safety.",
            features: ["Ocean & Air Freight", "Customs Clearance", "Door-to-Door Delivery", "Real-time Tracking"],
            color: "bg-secondary",
            dark: false
        },
        {
            icon: <ShieldCheck className="w-8 h-8" />,
            title: "Quality Assurance",
            desc: "Rigorous multi-stage inspection process to ensure every shipment exceeds international quality standards.",
            features: ["ISO Compliance", "Batch Testing", "SGS/Intertek Inspection", "Pure Origin Certification"],
            color: "bg-primary",
            dark: true
        },
        {
            icon: <Globe className="w-8 h-8" />,
            title: "Sourcing & Procurement",
            desc: "Vast network across India to source the finest agro commodities and handicrafts directly from the source.",
            features: ["Direct Farm Sourcing", "Artisan Partnerships", "Competitive Pricing", "Market Intelligence"],
            color: "bg-emerald-500",
            dark: true
        }
    ];

    return (
        <div className="pt-24 min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative py-24 bg-slate-900 border-b border-white/5 overflow-hidden">
                <div className="container px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl"
                    >
                        <div className="inline-flex items-center gap-3 px-5 py-2 bg-secondary/20 border border-secondary/30 rounded-full text-secondary text-[10px] font-black uppercase tracking-[0.4em] mb-8">
                            Premium Export Ecosystem
                        </div>
                        <h1 className="text-6xl md:text-6xl font-black text-white tracking-tighter mb-8 uppercase leading-[0.85]">
                            World Class <br />
                            <span className="text-secondary italic">Services</span>
                        </h1>
                        <p className="text-xl text-white/50 leading-relaxed max-w-2xl font-medium">
                            Dhuruvan Exports provides a comprehensive suite of services that bridge the gap between Indian excellence and global demand.
                        </p>
                    </motion.div>
                </div>
                {/* Motion background */}
                <motion.div
                    animate={{
                        rotate: [0, 360],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 right-0 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"
                />
            </section>

            {/* Private Label Packaging - Deep Dive (Based on User Image) */}
            <section className="py-24 md:py-32 bg-white">
                <div className="container px-6">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex-1"
                        >
                            <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/5 rounded-full text-primary text-[10px] font-black uppercase tracking-widest mb-6">
                                <Package size={14} className="text-secondary" />
                                Specialty Service
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black text-primary mb-8 uppercase tracking-tighter leading-none">
                                Private Label <br />
                                <span className="text-secondary italic">Packaging</span>
                            </h2>
                            <div className="h-1.5 w-32 bg-primary mb-8" />
                            <p className="text-xl text-slate-500 font-medium leading-relaxed mb-8 italic">
                                "One of the largest packaging and labelling houses in India."
                            </p>
                            <p className="text-lg text-slate-600 leading-relaxed mb-10">
                                Our company prides itself in being one of the largest packaging and labelling houses in India. Aside from processing spices, we also provide packaging solutions to various clients across the country. From designing to manufacturing and labelling, our team of dynamic and dedicated packaging professionals will provide you with end-to-end solutions, catering to all your packaging requirements - be it formatting, choosing the appropriate size and shape, designing, labelling and barcoding.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                                {[
                                    "Pillow Pouches",
                                    "Mono Cartons",
                                    "Custom Boxes",
                                    "PET Jars",
                                    "Grinders",
                                    "Barcoding Solutions",
                                    "Size & Shape Consulting"
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3 group">
                                        <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all">
                                            <CheckCircle2 size={14} />
                                        </div>
                                        <span className="font-bold text-primary text-sm">{item}</span>
                                    </div>
                                ))}
                            </div>

                            <Link to="/#contact" className="inline-flex items-center gap-4 px-10 py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-secondary transition-all duration-500 shadow-xl shadow-primary/10">
                                Start Your Brand
                                <ArrowRight size={16} />
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="flex-1 relative"
                        >
                            <div className="aspect-square bg-slate-50 rounded-[4rem] overflow-hidden border border-slate-100 relative group">
                                <img
                                    src="/private_label_packaging_display_1772193650032.png"
                                    alt="Private Label Packaging Solutions"
                                    className="w-full h-full object-cover grayscale-0 group-hover:scale-105 transition-all duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-60" />
                                <div className="absolute bottom-12 left-12 right-12 p-8 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20">
                                    <h4 className="text-white text-2xl font-black uppercase mb-2">Retail Ready</h4>
                                    <p className="text-white/70 text-sm font-medium">We give you the liberty to choose from our range of packaging services.</p>
                                </div>
                            </div>

                            {/* Decorative Stats */}
                            <motion.div
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-10 -right-10 p-8 bg-white rounded-3xl shadow-2xl border border-slate-50 z-20"
                            >
                                <BarChart3 size={32} className="text-secondary mb-4" />
                                <div className="text-3xl font-black text-primary">100%</div>
                                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Customization</div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Grid Services Section */}
            <section className="py-24 bg-slate-50">
                <div className="container px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-black text-primary uppercase tracking-tighter mb-4">Core Trade Services</h2>
                        <div className="h-1.5 w-20 bg-secondary mx-auto" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services.map((svc, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="p-10 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group flex flex-col h-full"
                            >
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110 group-hover:rotate-6 ${svc.color} text-white shadow-lg`}>
                                    {svc.icon}
                                </div>
                                <h3 className="text-xl font-black text-primary uppercase tracking-tight mb-4 group-hover:text-secondary transition-colors">{svc.title}</h3>
                                <p className="text-slate-500 font-medium text-sm leading-relaxed mb-8 flex-grow">
                                    {svc.desc}
                                </p>
                                <div className="space-y-3 pt-6 border-t border-slate-50">
                                    {svc.features.map((f, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                                            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{f}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-white">
                <div className="container px-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="p-16 md:p-24 bg-primary rounded-[4rem] text-center text-white relative overflow-hidden"
                    >
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-6xl font-black mb-8 uppercase tracking-tighter">Ready to Scale Global?</h2>
                            <p className="text-white/60 mb-12 max-w-2xl mx-auto font-medium text-lg leading-relaxed">
                                Whether you need bulk cargo or custom private label solutions, Dhuruvan Exports is your turnkey partner for global success.
                            </p>
                            <Link to="/#contact" className="px-12 py-6 bg-secondary text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white hover:text-primary transition-all duration-500 shadow-2xl">
                                Start Inquiry
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default ServicesPage;
