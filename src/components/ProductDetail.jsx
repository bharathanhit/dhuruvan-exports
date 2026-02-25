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
        <div id="product-detail" className="min-h-screen bg-white">
            <div className="container px-6 pt-24 pb-16 lg:pt-32 lg:pb-24">
                {/* Hero Header */}
                <div className="mb-12 lg:mb-16 lg:pl-[5%]">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-4 px-5 py-2.5 bg-secondary/10 border border-secondary/20 rounded-full text-secondary text-[11px] font-black uppercase tracking-[0.3em] mb-6"
                    >
                        <TrendingUp size={16} />
                        <span>Premium {product.category}</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-4xl md:text-6xl font-black text-primary mb-6 tracking-tighter leading-[1.1]"
                    >
                        {product.title}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-slate-500 max-w-4xl leading-relaxed font-medium"
                    >
                        {product.longDescription || product.description}
                    </motion.p>
                </div>

                {/* Alternating Feature Layout */}
                <div className="space-y-12 lg:space-y-16">
                    {product.varieties && product.varieties.map((variety, index) => (
                        <div
                            key={index}
                            className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-16 py-10 lg:py-16 border-b border-slate-50 last:border-0 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                        >
                            {/* Text Content Block */}
                            <div className={`flex-1 text-left ${index % 2 === 0 ? 'lg:pl-10' : 'lg:pr-10'}`}>
                                <motion.div
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="flex items-center gap-5 mb-5"
                                >
                                    <motion.span
                                        whileHover={{ rotate: [0, -10, 10, 0] }}
                                        className="text-2xl md:text-4xl filter grayscale hover:grayscale-0 transition-all duration-500 cursor-default"
                                    >
                                        {getEmojiForVariety(index)}
                                    </motion.span>
                                    <h2 className="text-xl md:text-3xl font-black text-primary tracking-tighter leading-tight">
                                        {variety.title}
                                    </h2>
                                </motion.div>

                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                    className="text-base md:text-lg text-slate-500 leading-relaxed font-medium tracking-tight"
                                >
                                    {variety.desc.split(' ').map((word, i) => {
                                        const highlights = ['premium', 'quality', 'export', 'guaranteed', 'pure', 'certified', 'flourish', 'exclusive', 'superior', 'rich', 'authentic', 'global', 'comprehensive', 'interactive', 'focused', 'personalized', 'optimal', 'hydration', 'pristine'];
                                        const cleanWord = word.toLowerCase().replace(/[.,]/g, '');
                                        if (highlights.includes(cleanWord)) {
                                            return (
                                                <motion.span
                                                    key={i}
                                                    initial={{ opacity: 0.5 }}
                                                    whileInView={{ opacity: 1 }}
                                                    transition={{ delay: 0.5 + (i * 0.02) }}
                                                    className="text-secondary font-black inline-block"
                                                >
                                                    {word}{' '}
                                                </motion.span>
                                            );
                                        }
                                        return <span key={i}>{word} </span>;
                                    })}
                                </motion.p>
                            </div>

                            {/* Image Visualization Block */}
                            <div className="flex-1 flex justify-center w-full">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8, rotate: index % 2 === 0 ? 5 : -5 }}
                                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ type: "spring", damping: 15, duration: 1 }}
                                    className="relative w-full max-w-[450px] group"
                                >
                                    <div className="relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,43,88,0.08)] bg-white p-2 border border-slate-100/50">
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
                                            className="overflow-hidden rounded-[1.5rem] md:rounded-[2rem]"
                                        >
                                            <img
                                                src={variety.img}
                                                alt={variety.title}
                                                className="w-full h-[250px] md:h-[350px] object-cover"
                                            />
                                        </motion.div>

                                        {/* Reveal Mask */}
                                        <motion.div
                                            initial={{ x: "-100%" }}
                                            whileInView={{ x: "100%" }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1.2, ease: [0.6, 0.01, -0.05, 0.9] }}
                                            className="absolute inset-0 bg-secondary/20 z-10 pointer-events-none"
                                        />
                                    </div>

                                    {/* Halal Badge Overlay */}
                                    {product.isHalal && (
                                        <motion.div
                                            animate={{
                                                y: [0, -10, 0],
                                                rotate: index % 2 === 0 ? [12, 15, 12] : [-12, -15, -12]
                                            }}
                                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                            className={`absolute -bottom-4 ${index % 2 === 0 ? '-right-4' : '-left-4'} w-16 h-16 bg-white rounded-full p-3 shadow-xl border border-slate-50 z-20`}
                                        >
                                            <img src={halalImg} alt="Halal Certified" className="w-full h-full object-contain" />
                                        </motion.div>
                                    )}
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
