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
            {/* Content starts directly with Private Label Section */}

            {/* Private Label Packaging - Deep Dive (Premium Split Layout) */}
            <section className="py-24 md:py-32 bg-white relative overflow-hidden">
                {/* Background Decorations */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/[0.03] rounded-full blur-3xl -z-10 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/[0.03] rounded-full blur-3xl -z-10 -translate-x-1/2" />

                <div className="container px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        {/* Image Side (Left) */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 100 }}
                                className="relative rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-30px_rgba(0,43,88,0.25)] border-8 border-white bg-slate-50"
                            >
                                <img
                                    src="/private_label_packaging_display_1772193650032.png"
                                    alt="Private Label Packaging Range"
                                    className="w-full h-auto object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent pointer-events-none" />
                            </motion.div>

                            {/* Floating Stats or Label */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -bottom-8 -right-8 bg-white p-6 rounded-[2rem] shadow-2xl border border-slate-50 hidden md:block"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                                        <Package size={24} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xl font-black text-primary leading-none">100+</span>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Design Templates</span>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Text Side (Right) */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex flex-col items-start text-left"
                        >
                            <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 bg-slate-50 border border-slate-100 rounded-full">
                                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Retail Ready Solutions</span>
                            </div>

                            <h2 className="text-4xl md:text-6xl font-black text-primary mb-8 uppercase tracking-tighter leading-none">
                                Private Label <br />
                                <span className="text-secondary italic">Packaging Hub</span>
                            </h2>

                            <p className="text-lg md:text-xl text-slate-500 leading-relaxed font-medium mb-10">
                                Empower your brand with our world-class packaging infrastructure. We provide <span className="text-primary font-bold italic underline decoration-secondary/30">End-to-End solutions</span> — from conceptual design to retail-ready physical products.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 w-full">
                                {[
                                    { title: "Custom Formats", desc: "Pillow Pouches & Mono Cartons" },
                                    { title: "Brand Identity", desc: "Global Logo & Label Design" },
                                    { title: "Compliance", desc: "Barcoding & Int'l Standards" },
                                    { title: "Material Science", desc: "PET Jars, Grinders & Boxes" }
                                ].map((item, idx) => (
                                    <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-secondary/20 transition-all">
                                        <h4 className="text-[11px] font-black uppercase text-primary tracking-widest mb-1">{item.title}</h4>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{item.desc}</p>
                                    </div>
                                ))}
                            </div>

                            <motion.div
                                whileHover={{ x: 5 }}
                                transition={{ type: "spring", stiffness: 400 }}
                            >

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


        </div>
    );
};

export default ServicesPage;
