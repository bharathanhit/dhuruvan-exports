import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, ArrowLeft, Leaf, Sparkles, TrendingUp, Package } from 'lucide-react';
import { Link } from 'react-router-dom';

// Import all wood craft images
import img1 from '../assets/wood/WhatsApp Image 2026-02-22 at 5.57.59 PM.jpeg';
import img2 from '../assets/wood/WhatsApp Image 2026-02-22 at 5.58.00 PM (1).jpeg';
import img3 from '../assets/wood/WhatsApp Image 2026-02-22 at 5.58.00 PM.jpeg';
import img4 from '../assets/wood/WhatsApp Image 2026-02-22 at 5.58.01 PM (1).jpeg';
import img5 from '../assets/wood/WhatsApp Image 2026-02-22 at 5.58.01 PM.jpeg';
import img6 from '../assets/wood/WhatsApp Image 2026-02-22 at 5.58.02 PM (1).jpeg';
import img7 from '../assets/wood/WhatsApp Image 2026-02-22 at 5.58.02 PM (2).jpeg';
import img8 from '../assets/wood/WhatsApp Image 2026-02-22 at 5.58.02 PM.jpeg';
import img9 from '../assets/wood/WhatsApp Image 2026-02-22 at 5.58.03 PM.jpeg';

const woodProducts = [
    {
        id: 1,
        name: 'Rattan Baby Cradle Stand',
        category: 'Baby Furniture',
        description: 'Handcrafted rattan cradle stand with elegant arched frame and wicker basket insert. Perfect blend of artistry and function for nurseries.',
        image: img1,
        tag: 'Bestseller',
    },
    {
        id: 2,
        name: 'Wicker Pedestal Stools (Set of 3)',
        category: 'Seating',
        description: 'Intricately woven bamboo pedestal stools in a matching set. Ideal for living rooms, verandas, or garden spaces.',
        image: img2,
        tag: 'Set Available',
    },
    {
        id: 3,
        name: 'Wicker Duo Pedestal Set',
        category: 'Seating',
        description: 'A pair of natural bamboo pedestal stools in two sizes — a versatile accent piece for any interior or exterior setting.',
        image: img3,
        tag: 'Pair',
    },
    {
        id: 4,
        name: 'Hanging Swing Chair',
        category: 'Swing Furniture',
        description: 'Stunning handcrafted hanging swing chair with dark mahogany rattan frame and wicker seat. A statement piece for patios and terraces.',
        image: img4,
        tag: 'Export Favourite',
    },
    {
        id: 5,
        name: 'Oval Sofa Set',
        category: 'Living Room',
        description: 'Full organic oval weave living room set — sofa, armchairs, and coffee table. Premium natural rattan, export-grade finish.',
        image: img5,
        tag: 'Full Set',
    },
    {
        id: 6,
        name: 'Rattan Peacock Chair',
        category: 'Accent Chairs',
        description: 'Iconic peacock throne chair with mahogany rattan frame and wicker weave backrest. Artisanal craftsmanship, globally admired.',
        image: img6,
        tag: 'Iconic',
    },
    {
        id: 7,
        name: 'Wicker Storage Basket',
        category: 'Storage',
        description: 'Natural tightly woven wicker storage baskets. Available in multiple sizes — perfect for retail, home decor, and gifting markets.',
        image: img7,
        tag: 'Bulk Available',
    },
    {
        id: 8,
        name: 'Rattan Lounge Sofa',
        category: 'Living Room',
        description: 'Spacious three-seater rattan lounge sofa with deep-weave texture. Lightweight yet durable — ideal for hotels and resorts.',
        image: img8,
        tag: 'Hotel Grade',
    },
    {
        id: 9,
        name: 'Hanging Egg Chair',
        category: 'Swing Furniture',
        description: 'Classic wicker hanging egg chair, cocoon-shaped with a sturdy rattan frame. A global bestseller in outdoor and indoor decor.',
        image: img9,
        tag: 'Top Export',
    },
];

const WoodCrafts = () => {
    const [selected, setSelected] = useState(null);

    const handleEmail = (product) => {
        const subject = encodeURIComponent(`Inquiry for ${product.name}`);
        const body = encodeURIComponent(`Hello Dhuruvan Exports,\n\nI am interested in the following wood craft product:\n\n*${product.name}*\nCategory: ${product.category}\n\nPlease share pricing and export details.\n\nThank you.`);
        window.location.href = `mailto:Dhuruvanexports@gmail.com?subject=${subject}&body=${body}`;
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative pt-32 pb-48 lg:pt-48 lg:pb-64 overflow-hidden bg-primary">
                {/* Background Visuals */}
                <div className="absolute inset-0 opacity-10 blur-[100px] pointer-events-none">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary rounded-full transform translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600 rounded-full transform -translate-x-1/2 translate-y-1/2" />
                </div>

                <div className="container px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <Link to="/" className="inline-flex items-center gap-3 text-white/50 hover:text-white transition-colors text-[10px] font-black uppercase tracking-[0.3em] mb-12">
                            <ArrowLeft size={16} />
                            Return Home
                        </Link>
                    </motion.div>

                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-4 px-5 py-2.5 bg-white/10 border border-white/20 rounded-full text-white text-[11px] font-black uppercase tracking-[0.4em] mb-10 backdrop-blur-md"
                        >
                            <Leaf size={16} className="text-secondary" />
                            <span>Traditional Handcrafted Arts</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-[0.95]"
                        >
                            Wood & Rattan<br />
                            <span className="text-secondary italic">Excellence.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg md:text-2xl text-white/70 max-w-2xl leading-relaxed font-medium mb-12"
                        >
                            Authentic handcrafted rattan and bamboo furniture, export-ready for global markets. Each piece represents centuries of Indian artisanal heritage.
                        </motion.p>

                        <div className="flex flex-wrap gap-12">
                            {[
                                { v: '9+', l: 'Unique Designs', icon: Package },
                                { v: '100%', l: 'Natural Fiber', icon: Leaf },
                                { v: '15+', l: 'Export Ports', icon: TrendingUp }
                            ].map((s, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + i * 0.1 }}
                                    className="flex items-center gap-4"
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-secondary">
                                        <s.icon size={24} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-3xl font-black text-white leading-none">{s.v}</span>
                                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-1">{s.l}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Aesthetic Arc */}
                <div className="absolute -bottom-1 left-0 w-full overflow-hidden leading-none z-0">
                    <svg className="relative block w-[calc(100%+1.3px)] h-[80px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M1200 0L0 0 598.97 114.72 1200 0z" className="fill-white"></path>
                    </svg>
                </div>
            </section>

            {/* Catalog Grid */}
            <section className="py-24 md:py-32 bg-white relative -mt-32 z-10">
                <div className="container px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {woodProducts.map((product, i) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.8 }}
                                onClick={() => setSelected(product)}
                                className="group bg-white rounded-[2.5rem] overflow-hidden shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(0,43,88,0.12)] border border-slate-100 transition-all duration-700 hover:-translate-y-2 cursor-pointer"
                            >
                                {/* Image Container - Reduced for Elegance */}
                                <div className="relative h-56 overflow-hidden bg-slate-50">
                                    <motion.div
                                        className="w-full h-full"
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
                                    >
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </motion.div>

                                    {/* Reveal Mask */}
                                    <motion.div
                                        initial={{ x: "-100%" }}
                                        whileInView={{ x: "100%" }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.5, ease: [0.6, 0.01, -0.05, 0.9] }}
                                        className="absolute inset-0 bg-secondary/20 z-10 pointer-events-none"
                                    />

                                    <div className="absolute top-6 left-6 z-20 px-4 py-1.5 bg-white/95 backdrop-blur-md rounded-full border border-white/20 shadow-lg">
                                        <span className="text-[10px] font-black text-primary uppercase tracking-widest">{product.tag}</span>
                                    </div>
                                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                </div>

                                {/* Content */}
                                <div className="p-10">
                                    <span className="text-[10px] font-black text-secondary uppercase tracking-[0.3em] mb-4 block">
                                        {product.category}
                                    </span>
                                    <h3 className="text-2xl font-black text-primary mb-4 tracking-tighter group-hover:text-secondary transition-colors duration-300">
                                        {product.name}
                                    </h3>
                                    <p className="text-slate-500 text-sm font-medium leading-relaxed line-clamp-2 mb-8">
                                        {product.description}
                                    </p>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={(e) => { e.stopPropagation(); handleEmail(product); }}
                                        className="w-full btn btn-primary py-4 text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-2 group-hover:shadow-xl transition-all"
                                    >
                                        <Send size={16} />
                                        Send Inquiry
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lightbox / Product QuickView */}
            <AnimatePresence>
                {selected && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelected(null)}
                        className="fixed inset-0 bg-primary/80 backdrop-blur-md z-[1000] flex items-center justify-center p-6 md:p-12"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            onClick={e => e.stopPropagation()}
                            className="bg-white rounded-[3rem] overflow-hidden max-w-5xl w-full flex flex-col lg:flex-row shadow-[0_50px_100px_rgba(0,0,0,0.3)]"
                        >
                            <div className="flex-1 min-h-[300px] lg:h-auto overflow-hidden bg-slate-50 relative">
                                <img src={selected.image} alt={selected.name} className="w-full h-full object-cover" />
                                <div className="absolute top-8 left-8 z-20 px-5 py-2 bg-white/90 backdrop-blur-md rounded-full shadow-xl">
                                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{selected.tag}</span>
                                </div>
                            </div>
                            <div className="flex-1 p-10 lg:p-16 flex flex-col justify-center">
                                <button
                                    onClick={() => setSelected(null)}
                                    className="absolute top-8 right-8 w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all duration-300"
                                >
                                    <X size={24} />
                                </button>

                                <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-secondary/10 rounded-full text-secondary text-[10px] font-black uppercase tracking-[0.3em] mb-8">
                                    <Sparkles size={14} />
                                    <span>Handcrafted Product</span>
                                </div>

                                <h2 className="text-4xl md:text-5xl font-black text-primary mb-6 tracking-tighter leading-none">
                                    {selected.name}
                                </h2>
                                <p className="text-slate-500 text-lg font-medium leading-relaxed mb-10">
                                    {selected.description}
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button
                                        onClick={() => handleEmail(selected)}
                                        className="flex-[2] btn btn-primary py-5 text-[12px] font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl shadow-green-100"
                                    >
                                        <Send size={18} />
                                        Request Global Quote
                                    </button>
                                    <button
                                        onClick={() => setSelected(null)}
                                        className="flex-1 bg-slate-100 text-slate-400 font-black py-5 rounded-2xl text-[11px] uppercase tracking-widest hover:bg-slate-200 hover:text-slate-600 transition-all"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default WoodCrafts;
