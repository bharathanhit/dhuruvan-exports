import { motion } from 'framer-motion';
import { CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import halalImg from '../assets/halal.png';
import { products } from '../data/products';

const ProductCard = ({ title, category, image, description, index, link, isHalal, brand }) => {
    const Wrapper = link ? Link : 'div';
    const wrapperProps = link ? { to: link } : {};

    const cardVariants = {
        hidden: { opacity: 0, y: 50, rotateX: 10 },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                type: "spring",
                damping: 20,
                stiffness: 100,
                duration: 0.8,
                delay: index * 0.1
            }
        }
    };

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{
                y: -12,
                transition: { duration: 0.4, ease: "easeOut" }
            }}
            className="group relative m-2 bg-[#0D1B2A] rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:shadow-[0_40px_100px_rgba(30,158,84,0.15)] transition-all duration-700 border border-white/5 perspective-1000"
        >
            <Wrapper {...wrapperProps} className={link ? 'block no-underline' : ''}>
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                    <motion.div
                        className="w-full h-full"
                        whileHover={{ scale: 1.15 }}
                        transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
                    >
                        <img
                            src={image}
                            alt={title}
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                        />
                    </motion.div>

                    {/* Sophisticated Reveal Overlay */}
                    <motion.div
                        initial={{ x: "-100%" }}
                        whileInView={{ x: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: [0.6, 0.01, -0.05, 0.9] }}
                        className="absolute inset-0 bg-secondary/20 z-10 pointer-events-none"
                    />

                    {/* Dark Overlay on Hover */}
                    <div className="absolute inset-0 bg-primary/40 opacity-40 group-hover:opacity-20 transition-opacity duration-700" />

                    {/* Category & Brand Badges */}
                    <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg"
                        >
                            <span className="text-[10px] font-black text-white uppercase tracking-[0.1em]">{category}</span>
                        </motion.div>
                        {brand && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 + 0.3 }}
                                className="px-4 py-1.5 bg-secondary/80 backdrop-blur-md rounded-full shadow-lg self-start"
                            >
                                <span className="text-[9px] font-black text-white uppercase tracking-[0.2em]">{brand}</span>
                            </motion.div>
                        )}
                    </div>

                    {/* Halal Badge */}
                    {isHalal && (
                        <motion.div
                            initial={{ scale: 0, rotate: -45 }}
                            whileInView={{ scale: 1, rotate: 12 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
                            className="absolute -top-10 -right-10 w-44 pointer-events-none z-20 transition-transform duration-700 group-hover:translate-x-2 group-hover:-translate-y-2"
                        >
                            <img
                                src={halalImg}
                                alt="Halal Certified"
                                className="w-full h-auto drop-shadow-2xl brightness-110"
                                onError={(e) => { e.target.style.display = 'none'; }}
                            />
                        </motion.div>
                    )}
                </div>

                {/* Content Section */}
                <div className="p-8 transition-colors duration-500 group-hover:bg-white/[0.02]">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-2xl font-black text-white group-hover:text-secondary transition-colors duration-300 tracking-tight">
                            {title}
                        </h3>
                        <motion.div
                            whileHover={{ scale: 1.2, x: 5 }}
                            className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white group-hover:bg-secondary group-hover:text-white transition-all duration-500 shadow-sm border border-white/10"
                        >
                            <ChevronRight size={18} />
                        </motion.div>
                    </div>

                    <p className="text-slate-400 mb-8 line-clamp-2 text-sm leading-relaxed font-medium group-hover:text-slate-300 transition-colors">
                        {description}
                    </p>

                    {/* Premium Seal */}
                    <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <motion.div
                                animate={{ rotate: [0, 5, -5, 0] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary"
                            >
                                <CheckCircle2 size={16} />
                            </motion.div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-white uppercase tracking-widest leading-none mb-1">
                                    Quality Certified
                                </span>
                                <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest leading-none">
                                    Premium Pillar
                                </span>
                            </div>
                        </div>
                        <div className="flex -space-x-2 opacity-30 group-hover:opacity-100 transition-all duration-700">
                            {[1, 2, 3].map(i => (
                                <motion.div
                                    whileHover={{ y: -5 }}
                                    key={i}
                                    className="w-6 h-6 rounded-full border-2 border-[#0D1B2A] bg-white/10 flex items-center justify-center text-white/40 group-hover:bg-secondary group-hover:text-white transition-all"
                                >
                                    <CheckCircle2 size={10} />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </Wrapper>
        </motion.div >
    );
};

const Products = () => {
    return (
        <section id="products" className="py-16 md:py-20 bg-white relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-slate-50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="container relative z-10">
                <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-10 gap-8 px-6">
                    <div className="max-w-xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-50 border border-slate-100 mb-6 group hover:border-secondary/30 transition-all duration-500"
                        >
                            <div className="p-1.5 rounded-full bg-secondary/10 text-secondary group-hover:scale-110 transition-transform">
                                <Sparkles size={14} />
                            </div>
                            <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Our Premium Catalog</span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-6xl text-primary font-black leading-[1.05] tracking-tighter"
                        >
                            Global Quality, <br />
                            <span className="text-secondary italic">Local Roots.</span>
                        </motion.h2>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="max-w-md lg:pb-2"
                    >
                        <p className="text-slate-500 text-lg md:text-xl leading-relaxed font-medium mb-6">
                            We source only the finest products that meet stringent international quality benchmarks. Each item is carefully selected and processed.
                        </p>
                        <div className="h-1.5 w-20 bg-secondary/20 rounded-full" />
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 px-6 pb-8">
                    {products.map((product, idx) => (
                        <ProductCard
                            key={idx}
                            index={idx}
                            {...product}
                            link={product.link || `/product/${product.id}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Products;
