import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    TrendingUp,
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
        <div id="product-detail" className="min-h-screen bg-white relative">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[50%] h-[30%] bg-secondary/5 rounded-full blur-[120px] -z-10" />

            <div className="container px-6 pt-24 pb-16 lg:pt-32 lg:pb-24">
                {/* Navigation */}
                <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate('/#products')}
                    className="group flex items-center gap-3 text-slate-400 hover:text-primary transition-colors mb-12"
                >
                    <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-secondary/10 group-hover:text-secondary group-hover:border-secondary/20 transition-all duration-300">
                        <TrendingUp size={16} className="rotate-180" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Back to Catalog</span>
                </motion.button>

                {/* Hero Header */}
                <div className="mb-20 lg:mb-24 lg:pl-[5%] relative">
                    <div className="flex flex-wrap items-center gap-4 mb-8">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-4 px-6 py-3 bg-secondary/10 border border-secondary/20 rounded-full text-secondary text-[10px] font-black uppercase tracking-[0.4em]"
                        >
                            <TrendingUp size={14} />
                            <span>Premium {product.category}</span>
                        </motion.div>
                        {product.brand && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="px-6 py-3 bg-primary text-white rounded-full text-[10px] font-black uppercase tracking-[0.4em] shadow-xl shadow-primary/20"
                            >
                                {product.brand}
                            </motion.div>
                        )}
                    </div>

                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-5xl md:text-7xl font-black text-primary mb-8 tracking-tighter leading-[1.05] uppercase"
                    >
                        {product.title}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-slate-400 max-w-4xl leading-relaxed font-medium"
                    >
                        {product.longDescription || product.description}
                    </motion.p>

                    {/* Decorative line */}
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: 100 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="h-1.5 bg-secondary mt-12 rounded-full"
                    />
                </div>

                {/* Alternating Feature Layout */}
                <div className="space-y-24 lg:space-y-32">
                    {product.varieties && product.varieties.map((variety, index) => (
                        <div
                            key={index}
                            className={`flex flex-col lg:flex-row items-center gap-16 lg:gap-24 py-16 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                        >
                            {/* Text Content Block */}
                            <div className="flex-1 text-left">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="flex flex-col gap-4 mb-8"
                                >
                                    <div className="flex items-center gap-6">
                                        <motion.div
                                            whileHover={{ rotate: 360 }}
                                            transition={{ duration: 1 }}
                                            className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-3xl shadow-sm"
                                        >
                                            {getEmojiForVariety(index)}
                                        </motion.div>
                                        <h2 className="text-3xl md:text-4xl font-black text-primary tracking-tighter leading-tight uppercase">
                                            {variety.title}
                                        </h2>
                                    </div>
                                    {variety.brand && (
                                        <div className="flex items-center gap-3 ml-20">
                                            <div className="h-px w-8 bg-secondary/30" />
                                            <span className="text-[10px] font-black text-secondary uppercase tracking-[0.5em]">
                                                {variety.brand}
                                            </span>
                                        </div>
                                    )}
                                </motion.div>

                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                    className="text-lg md:text-xl text-slate-500 leading-relaxed font-medium tracking-tight mb-8"
                                >
                                    {variety.desc.split(' ').map((word, i) => {
                                        const highlights = ['premium', 'quality', 'export', 'guaranteed', 'pure', 'certified', 'flourish', 'exclusive', 'superior', 'rich', 'authentic', 'global', 'comprehensive', 'interactive', 'focused', 'personalized', 'optimal', 'hydration', 'pristine'];
                                        const cleanWord = word.toLowerCase().replace(/[.,]/g, '');
                                        if (highlights.includes(cleanWord)) {
                                            return (
                                                <span key={i} className="text-secondary font-black inline-block underline decoration-secondary/20 underline-offset-4">
                                                    {word}{' '}
                                                </span>
                                            );
                                        }
                                        return <span key={i}>{word} </span>;
                                    })}
                                </motion.p>

                                <div className="grid grid-cols-2 gap-4">
                                    {['Export Grade', 'Purity Tested', 'Global Logistics', 'Secure Pack'].map((tag, i) => (
                                        <div key={i} className="flex items-center gap-3 py-3 px-5 bg-slate-50 rounded-xl border border-slate-100">
                                            <div className="w-2 h-2 rounded-full bg-secondary" />
                                            <span className="text-[9px] font-black text-primary uppercase tracking-widest">{tag}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Image Visualization Block - Smaller and more refined */}
                            <div className="flex-1 flex justify-center w-full relative">
                                {/* Background Decorative Circle */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-secondary/5 rounded-full blur-[60px] -z-10" />

                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1 }}
                                    className="relative w-full max-w-[320px] group"
                                >
                                    <div className="relative overflow-hidden rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,43,88,0.15)] bg-white p-2.5 border border-slate-100">
                                        <motion.div
                                            whileHover={{ scale: 1.08 }}
                                            transition={{ duration: 0.8 }}
                                            className="overflow-hidden rounded-[2rem]"
                                        >
                                            <img
                                                src={variety.img || variety.image || product.image}
                                                alt={variety.title}
                                                className="w-full h-[280px] md:h-[350px] object-cover"
                                            />
                                        </motion.div>

                                        {/* Halal Badge Overlay - Floating */}
                                        {product.isHalal && (
                                            <motion.div
                                                animate={{ y: [0, -8, 0] }}
                                                transition={{ duration: 3, repeat: Infinity }}
                                                className="absolute -top-4 -right-4 w-14 h-14 bg-white rounded-2xl p-3 shadow-xl border border-slate-100 z-20 flex items-center justify-center"
                                            >
                                                <img src={halalImg} alt="Halal" className="w-full h-full object-contain" />
                                            </motion.div>
                                        )}
                                    </div>

                                    {/* Aesthetic Shadow Element */}
                                    <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-secondary/10 rounded-full blur-2xl -z-10" />
                                </motion.div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
