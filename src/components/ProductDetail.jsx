import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    TrendingUp,
    ArrowLeft,
    CheckCircle2,
    ShieldCheck,
    Globe2,
    Package,
    ArrowRight,
    LucideIcon
} from 'lucide-react';
import { products } from '../data/products';
import halalImg from '../assets/halal.png';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const product = products.find(p => p.id === id);

    useEffect(() => {
        if (!product) {
            navigate('/#products');
        }
        window.scrollTo(0, 0);
    }, [product, navigate]);

    if (!product) return null;

    const getEmojiForVariety = (index) => {
        const emojis = ['🏆', '✨', '🌍', '📦', '🤝'];
        return emojis[index % emojis.length];
    };

    return (
        <div id="product-detail" className="min-h-screen bg-[#fafbfc] selection:bg-secondary/30">
            {/* Top Navigation Bar */}
            <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 py-4 mb-2">
                <div className="container px-6 flex items-center justify-between">
                    <button
                        onClick={() => navigate('/#products')}
                        className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors text-[10px] font-black uppercase tracking-[0.2em]"
                    >
                        <ArrowLeft size={14} />
                        Back to Catalog
                    </button>
                    <div className="flex items-center gap-4">
                        <span className="text-slate-300 text-[10px] font-bold uppercase tracking-widest hidden md:block">SKU: DE-{product.id.substring(0, 4).toUpperCase()}</span>
                        <Link to="/#contact" className="px-4 py-2 bg-primary text-white text-[9px] font-black uppercase tracking-widest rounded-lg hover:bg-secondary transition-all">
                            Enquire Now
                        </Link>
                    </div>
                </div>
            </div>

            <div className="container px-6 pt-12 pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* Left Column: Product Info */}
                    <div className="lg:col-span-7 space-y-16">
                        <section>
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-3 px-4 py-1.5 bg-secondary/10 border border-secondary/20 rounded-full text-secondary text-[9px] font-black uppercase tracking-[0.3em] mb-8"
                            >
                                <TrendingUp size={12} />
                                <span>Export Grade {product.category}</span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-5xl md:text-7xl font-black text-primary mb-8 tracking-tighter leading-[0.95] uppercase"
                            >
                                {product.title.split(' ').map((word, i) => (
                                    <span key={i} className={i === product.title.split(' ').length - 1 ? "text-secondary italic block lg:inline" : ""}>
                                        {word}{' '}
                                    </span>
                                ))}
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-lg md:text-xl text-slate-500 max-w-2xl leading-relaxed font-medium mb-12"
                            >
                                {product.longDescription || product.description}
                            </motion.p>

                            {/* Key Highlights Table/Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    { icon: ShieldCheck, label: 'Quality', val: 'A++ Grade' },
                                    { icon: Globe2, label: 'Supply', val: 'Global' },
                                    { icon: Package, label: 'Custom', val: 'Packaging' },
                                    { icon: CheckCircle2, label: 'Status', val: 'Certified' }
                                ].map((stat, i) => (
                                    <div key={i} className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
                                        <stat.icon size={18} className="text-secondary mb-3" />
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{stat.label}</p>
                                        <p className="text-[11px] font-bold text-primary">{stat.val}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Varieties Section */}
                        <section className="space-y-12">
                            <h2 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] mb-10 pl-1 border-l-4 border-secondary">Available Varieties & Quality</h2>

                            {product.varieties && product.varieties.map((variety, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="group relative bg-white border border-slate-100 rounded-[2.5rem] p-6 md:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_30px_60px_rgba(0,43,88,0.08)] transition-all duration-700 flex flex-col md:flex-row gap-10 items-center overflow-hidden"
                                >
                                    {/* Numbering Overlay */}
                                    <div className="absolute top-0 right-0 p-8 text-slate-50 font-black text-8xl pointer-events-none group-hover:text-secondary/5 transition-colors">
                                        0{index + 1}
                                    </div>

                                    {/* Small Premium Image - Further reduced for boutique feel */}
                                    <div className="relative w-full md:w-[180px] shrink-0">
                                        <div className="aspect-square relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem] shadow-xl border-4 border-white">
                                            <motion.img
                                                whileHover={{ scale: 1.15 }}
                                                transition={{ duration: 1 }}
                                                src={variety.img}
                                                alt={variety.title}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors duration-500" />
                                        </div>
                                        {/* Emoji Decoration */}
                                        <div className="absolute -top-3 -left-3 w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center text-xl z-10 border border-slate-50">
                                            {getEmojiForVariety(index)}
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="flex-1 space-y-4 relative z-10">
                                        <h3 className="text-xl md:text-2xl font-black text-primary tracking-tighter leading-tight group-hover:text-secondary transition-colors">
                                            {variety.title}
                                        </h3>
                                        <p className="text-sm md:text-base text-slate-500 leading-relaxed font-medium">
                                            {variety.desc}
                                        </p>
                                        <div className="flex gap-4 pt-2">
                                            <span className="px-3 py-1 bg-slate-50 text-[9px] font-black text-slate-400 uppercase tracking-widest rounded-md border border-slate-100 italic">Export Ready</span>
                                            <span className="px-3 py-1 bg-secondary/5 text-[9px] font-black text-secondary uppercase tracking-widest rounded-md border border-secondary/10">Premium Grade</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </section>
                    </div>

                    {/* Right Column: Specifications & Sidebar */}
                    <div className="lg:col-span-5 space-y-8">
                        <div className="sticky top-40 space-y-8">

                            {/* Detailed Specs Card */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-primary text-white rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group"
                            >
                                {/* Decorative elements */}
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
                                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl" />

                                <h3 className="text-2xl font-black mb-8 tracking-tighter flex items-center gap-3">
                                    <ArrowRight size={20} className="text-secondary" />
                                    Specifications
                                </h3>

                                <div className="space-y-6 relative z-10">
                                    {product.specifications && product.specifications.map((spec, i) => (
                                        <div key={i} className="flex flex-col gap-1 border-b border-white/10 pb-4 last:border-0 group-hover:border-white/20 transition-colors">
                                            <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">{spec.label}</span>
                                            <span className="text-base font-bold text-white/90">{spec.value}</span>
                                        </div>
                                    ))}
                                </div>

                                {product.isHalal && (
                                    <div className="mt-12 pt-8 border-t border-white/10 flex items-center gap-6">
                                        <div className="w-16 h-16 bg-white rounded-2xl p-3 shadow-xl">
                                            <img src={halalImg} alt="Halal" className="w-full h-full object-contain" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Global Standards</p>
                                            <p className="text-sm font-black text-secondary uppercase">100% Halal Certified</p>
                                        </div>
                                    </div>
                                )}
                            </motion.div>

                            {/* Benefits List */}
                            <div className="bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-sm">
                                <h3 className="text-xl font-black text-primary mb-8 tracking-tighter">Key Benefits</h3>
                                <div className="space-y-4">
                                    {product.benefits && product.benefits.map((benefit, i) => (
                                        <div key={i} className="flex items-center gap-4 text-slate-600 group">
                                            <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 group-hover:bg-secondary transition-colors">
                                                <CheckCircle2 size={12} className="text-secondary group-hover:text-white" />
                                            </div>
                                            <span className="text-sm font-bold tracking-tight">{benefit}</span>
                                        </div>
                                    ))}
                                </div>

                                <Link
                                    to="/#contact"
                                    className="w-full mt-12 btn btn-primary py-5 text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl"
                                >
                                    Start Bulk Inquiry
                                    <ArrowRight size={16} />
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Bottom CTA Section */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-24 bg-slate-900 rounded-[3rem] p-12 md:p-20 relative overflow-hidden text-center"
                >
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-0 left-0 w-96 h-96 bg-secondary rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
                    </div>

                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tighter uppercase leading-[0.95]">
                            Ready to Source <br /> <span className="text-secondary italic">Premium {product.title}?</span>
                        </h2>
                        <p className="text-white/50 text-lg mb-12 font-medium">
                            Dhuruvan Exports handles everything from quality inspection to global logistics. Partner with us for reliable, high-volume supply.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Link to="/#contact" className="px-10 py-5 bg-white text-primary rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-secondary hover:text-white transition-all shadow-2xl">
                                Request Export Quote
                            </Link>
                            <Link to="/services" className="px-10 py-5 bg-white/10 text-white border border-white/20 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-white/20 transition-all">
                                Our Supply Chain Services
                            </Link>
                        </div>
                    </div>
                </motion.section>
            </div>
        </div>
    );
};

export default ProductDetail;
