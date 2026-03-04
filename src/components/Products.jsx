import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import { categories as staticCategories } from '../data/products';

const CategoryCard = ({ title, description, image, imageUrl, slug, color, index }) => {
    const imgSrc = imageUrl || image;
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -10 }}
            className="group relative"
        >
            <Link to={`/category/${slug}`} className="block no-underline">
                <div className="relative rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-[#0D1B2A] shadow-[0_20px_60px_rgba(0,0,0,0.25)] hover:shadow-[0_40px_100px_rgba(0,0,0,0.35)] transition-all duration-700 border border-white/5">
                    <div className="relative h-48 md:h-64 overflow-hidden">
                        <motion.img
                            src={imgSrc}
                            alt={title}
                            className="w-full h-full object-cover opacity-75 group-hover:opacity-90 transition-opacity duration-700"
                            whileHover={{ scale: 1.08 }}
                            transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A] via-[#0D1B2A]/30 to-transparent" />
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="absolute top-3 right-3 md:top-4 md:right-4 px-2.5 py-1 md:px-3 md:py-1.5 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest text-white border border-white/20 backdrop-blur-md bg-white/10"
                        >
                            View All
                        </motion.div>
                    </div>
                    <div className="p-5 md:p-7">
                        <div className="flex items-start justify-between gap-3 md:gap-4">
                            <div className="min-w-0">
                                <h3 className="text-lg md:text-2xl font-black text-white tracking-tight mb-1 md:mb-2 group-hover:text-secondary transition-colors duration-300 truncate">
                                    {title}
                                </h3>
                                <p className="text-slate-400 text-xs md:text-sm leading-relaxed font-medium line-clamp-2 group-hover:text-slate-300 transition-colors">
                                    {description}
                                </p>
                            </div>
                            <motion.div
                                whileHover={{ scale: 1.2, x: 4 }}
                                className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-xl bg-white/5 group-hover:bg-secondary flex items-center justify-center text-white transition-all duration-500 border border-white/10 mt-1"
                            >
                                <ArrowRight size={14} className="md:w-[18px]" />
                            </motion.div>
                        </div>
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: '40%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.12 + 0.4 }}
                            className="h-0.5 rounded-full mt-4 md:mt-5"
                            style={{ backgroundColor: color || '#1e9e54' }}
                        />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

const Products = () => {
    const [categories, setCategories] = useState(staticCategories);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, 'categories'), orderBy('order', 'asc'));
        const unsub = onSnapshot(q, (snap) => {
            if (!snap.empty) {
                const firestoreCats = snap.docs.map(d => ({ id: d.id, ...d.data() }));
                // Merge: static defaults + Firestore additions/overrides
                const merged = [...staticCategories];
                firestoreCats.forEach(fc => {
                    const idx = merged.findIndex(s => s.slug === fc.slug);
                    if (idx !== -1) {
                        merged[idx] = { ...merged[idx], ...fc }; // Firestore overrides matching static
                    } else {
                        merged.push(fc); // New Firestore-only category
                    }
                });
                setCategories(merged);
            }
            setLoading(false);
        }, () => setLoading(false));
        return unsub;
    }, []);

    return (
        <section id="products" className="py-16 md:py-24 bg-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-slate-50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="container relative z-10">
                <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-14 gap-8 px-6">
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
                            <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Our Product Categories</span>
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
                            Explore our curated product lines — each category sourced from India's finest farms, forests, and artisans.
                        </p>
                        <div className="h-1.5 w-20 bg-secondary/20 rounded-full" />
                    </motion.div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 pb-8">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="rounded-[2rem] bg-slate-100 animate-pulse h-80" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 pb-8">
                        {categories.map((cat, idx) => (
                            <CategoryCard key={cat.id || cat.slug} index={idx} {...cat} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Products;
