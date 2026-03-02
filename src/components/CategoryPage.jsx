import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { products as staticProducts, categories as staticCategories } from '../data/products';
import halalImg from '../assets/halal.png';

const ProductCard = ({ title, category, image, imageUrl, description, id, link, isHalal, index }) => {
    const href = link || `/product/${id}`;
    const imgSrc = imageUrl || image;
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -10 }}
            className="group relative bg-[#0D1B2A] rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:shadow-[0_40px_100px_rgba(30,158,84,0.15)] transition-all duration-700 border border-white/5 m-1"
        >
            <Link to={href} className="block no-underline">
                <div className="relative h-56 overflow-hidden">
                    <motion.img
                        src={imgSrc}
                        alt={title}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                        whileHover={{ scale: 1.12 }}
                        transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
                    />
                    <div className="absolute inset-0 bg-primary/40 opacity-40 group-hover:opacity-20 transition-opacity duration-700" />
                    <div className="absolute top-4 left-4 z-20 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                        <span className="text-[10px] font-black text-white uppercase tracking-[0.1em]">{category}</span>
                    </div>
                    {isHalal && (
                        <motion.div
                            initial={{ scale: 0, rotate: -45 }}
                            whileInView={{ scale: 1, rotate: 12 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + 0.5, type: 'spring' }}
                            className="absolute -top-10 -right-10 w-44 pointer-events-none z-20"
                        >
                            <img src={halalImg} alt="Halal Certified" className="w-full h-auto drop-shadow-2xl"
                                onError={(e) => { e.target.style.display = 'none'; }} />
                        </motion.div>
                    )}
                </div>
                <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-2xl font-black text-white group-hover:text-secondary transition-colors duration-300 tracking-tight">
                            {title}
                        </h3>
                        <motion.div whileHover={{ scale: 1.2, x: 5 }}
                            className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white group-hover:bg-secondary transition-all duration-500 border border-white/10">
                            <ChevronRight size={18} />
                        </motion.div>
                    </div>
                    <p className="text-slate-400 mb-8 line-clamp-2 text-sm leading-relaxed font-medium group-hover:text-slate-300 transition-colors">
                        {description}
                    </p>
                    <div className="pt-6 border-t border-white/10 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                            <CheckCircle2 size={16} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-white uppercase tracking-widest leading-none mb-1">Quality Certified</span>
                            <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest leading-none">Premium Export Grade</span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

const CategoryPage = () => {
    const { slug } = useParams();
    const [categoryProducts, setCategoryProducts] = useState([]);
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);

    // Resolve category info (Merge Firestore + Static)
    useEffect(() => {
        const unsub = onSnapshot(collection(db, 'categories'), (snap) => {
            const staticCat = staticCategories.find(c => c.slug === slug);
            if (!snap.empty) {
                const firestoreCat = snap.docs.map(d => ({ id: d.id, ...d.data() })).find(c => c.slug === slug);
                if (firestoreCat) {
                    setCategory({ ...staticCat, ...firestoreCat });
                } else {
                    setCategory(staticCat || null);
                }
            } else {
                setCategory(staticCat || null);
            }
            setLoading(false);
        }, () => {
            setCategory(staticCategories.find(c => c.slug === slug) || null);
            setLoading(false);
        });
        return unsub;
    }, [slug]);

    // Fetch products for this category (Merge Firestore + Static)
    useEffect(() => {
        const q = query(
            collection(db, 'products'),
            where('categorySlug', '==', slug)
        );
        const unsub = onSnapshot(q, (snap) => {
            const filteredStatic = staticProducts.filter(p => p.categorySlug === slug);
            let merged = [...filteredStatic];

            if (!snap.empty) {
                const firestoreProducts = snap.docs.map(d => ({ id: d.id, ...d.data() }));
                // Merge static and firestore products
                firestoreProducts.forEach(fp => {
                    const idx = merged.findIndex(p => p.title === fp.title);
                    if (idx !== -1) {
                        merged[idx] = { ...merged[idx], ...fp };
                    } else {
                        merged.push(fp);
                    }
                });
            }

            // Sort by order after merging
            merged.sort((a, b) => (a.order || 0) - (b.order || 0));
            setCategoryProducts(merged);
            setLoading(false);
        }, () => {
            setCategoryProducts(staticProducts.filter(p => p.categorySlug === slug));
            setLoading(false);
        });
        return unsub;
    }, [slug]);

    if (!loading && !category) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-primary">
                <h2 className="text-3xl font-black mb-4">Category not found</h2>
                <Link to="/" className="text-secondary underline">← Back to Home</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Banner */}
            <div className="relative h-[55vh] min-h-[380px] bg-[#0D1B2A] overflow-hidden flex items-end">
                {category && (
                    <motion.img
                        initial={{ scale: 1.15, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.45 }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                        src={category.imageUrl || category.image}
                        alt={category.title}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A] via-[#0D1B2A]/50 to-transparent" />

                <div className="relative z-10 container pb-14 pt-36">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                        <Link to="/#products" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-bold transition-colors mb-6 group">
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            Back to Categories
                        </Link>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                        className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-5"
                    >
                        <Sparkles size={13} className="text-secondary" />
                        <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Dhuruvan Exports</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[1.05]"
                    >
                        {category?.title || '...'}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.35 }}
                        className="text-white/60 text-lg max-w-xl mt-4 font-medium leading-relaxed"
                    >
                        {category?.description}
                    </motion.p>
                </div>
            </div>

            {/* Products Grid */}
            <section className="py-16 md:py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-slate-50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                <div className="container relative z-10 px-6">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <p className="text-[10px] font-black text-secondary uppercase tracking-[0.4em] mb-2">
                                {categoryProducts.length} Product{categoryProducts.length !== 1 ? 's' : ''} Available
                            </p>
                            <h2 className="text-3xl md:text-4xl font-black text-primary tracking-tight">
                                All <span className="text-secondary italic">{category?.title}</span>
                            </h2>
                        </div>
                        <Link to="/#contact"
                            className="hidden md:inline-flex items-center gap-2 px-6 py-3 bg-secondary text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-secondary/90 transition-colors shadow-lg shadow-secondary/20">
                            Get a Quote <ArrowLeft size={14} className="rotate-180" />
                        </Link>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="rounded-[2.5rem] bg-slate-100 animate-pulse h-96" />
                            ))}
                        </div>
                    ) : categoryProducts.length === 0 ? (
                        <div className="text-center py-24 text-slate-400 font-medium">
                            No products found in this category yet.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {categoryProducts.map((product, idx) => (
                                <ProductCard key={product.id} index={idx} {...product} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default CategoryPage;
