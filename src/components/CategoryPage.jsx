import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ChevronRight, Sparkles, X, Send, Package, ShoppingBag, Info, Award, Phone, Mail } from 'lucide-react';
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { products as staticProducts, categories as staticCategories } from '../data/products';
import halalImg from '../assets/halal.png';

const ProductModal = ({ product, onClose }) => {
    if (!product) return null;
    const imgSrc = product.imageUrl || product.image;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/60 backdrop-blur-md"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 30 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="relative bg-white rounded-[3rem] w-full max-w-4xl overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] flex flex-col md:flex-row min-h-[400px]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button Mobile */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-50 w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white md:hidden"
                >
                    <X size={20} />
                </button>

                {/* Left Side: Image Area */}
                <div className="md:w-1/2 relative min-h-[400px]">
                    <img src={imgSrc} alt={product.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                    {/* Status Badge */}
                    <div className="absolute top-8 left-8">
                        <div className="px-5 py-2.5 bg-white/90 backdrop-blur-md rounded-full border border-white/50 shadow-lg">
                            <span className="text-[10px] font-black text-primary uppercase tracking-widest">{product.status || 'Set Available'}</span>
                        </div>
                    </div>

                    {product.isHalal && (
                        <div className="absolute bottom-8 left-8">
                            <img src={halalImg} alt="Halal" className="w-20 h-auto drop-shadow-xl" />
                        </div>
                    )}
                </div>

                {/* Right Side: Content Area */}
                <div className="md:w-1/2 p-6 md:p-10 flex flex-col gap-6 bg-white">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-secondary/10 border border-secondary/20 rounded-full w-fit">
                        <Award size={12} className="text-secondary" />
                        <span className="text-[9px] font-black text-secondary uppercase tracking-[0.2em]">{product.badgeNote || 'Handcrafted Product'}</span>
                    </div>

                    <div className="space-y-3">
                        <h2 className="text-3xl md:text-4xl font-black text-primary tracking-tighter uppercase leading-[0.9]">
                            {product.title}
                        </h2>
                        <p className="text-slate-500 font-medium text-base leading-relaxed">
                            {product.longDescription || product.description}
                        </p>
                    </div>

                    {/* Highlights/Benefits */}
                    {product.benefits && product.benefits.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-8">
                            {product.benefits.filter(b => b.trim() !== '').map((benefit, i) => (
                                <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-secondary/5 border border-secondary/10 rounded-lg text-secondary">
                                    <CheckCircle2 size={12} className="shrink-0" />
                                    <span className="text-[10px] font-black uppercase tracking-tight">{benefit}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Specs Section */}
                    <div className="space-y-6 pt-8 border-t border-slate-100 min-h-[120px]">
                        {product.specifications && product.specifications.length > 0 && product.specifications.some(s => s.label.trim() !== '') ? (
                            <>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-6 h-6 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                                        <Award size={14} />
                                    </div>
                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Key Specifications</h4>
                                </div>
                                <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                                    {product.specifications.filter(s => s.label.trim() !== '').map((spec, i) => (
                                        <div key={i} className="flex flex-col gap-1.5 group/spec">
                                            <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest group-hover/spec:text-secondary transition-colors">{spec.label}</span>
                                            <span className="text-base font-black text-primary leading-none uppercase italic border-b-2 border-slate-50 pb-2 group-hover/spec:border-secondary/20 transition-all">{spec.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-5 bg-slate-50/50 rounded-2xl border border-slate-100 flex flex-col gap-2">
                                    <CheckCircle2 size={18} className="text-secondary" />
                                    <h5 className="text-[10px] font-black text-primary uppercase tracking-widest">Premium Export Grade</h5>
                                    <p className="text-[11px] text-slate-400 font-medium">Quality tested for global standards.</p>
                                </div>
                                <div className="p-5 bg-slate-50/50 rounded-2xl border border-slate-100 flex flex-col gap-2">
                                    <ShoppingBag size={18} className="text-secondary" />
                                    <h5 className="text-[10px] font-black text-primary uppercase tracking-widest">Global Logistics</h5>
                                    <p className="text-[11px] text-slate-400 font-medium">Available via FOB, CIF & DTP.</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mt-auto pt-6 space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <a
                                href={`https://wa.me/919952777973?text=Hello, I am interested in ${product.title} from your ${product.category} category.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="sm:col-span-2 flex items-center justify-center gap-3 py-4 bg-primary text-white rounded-[1.2rem] font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl shadow-primary/20 hover:bg-secondary transition-all"
                            >
                                <Send size={15} /> Request Global Quote
                            </a>

                            <a
                                href="tel:+919952777973"
                                className="flex items-center justify-center gap-3 py-4 bg-slate-50 text-primary border border-slate-100 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.1em] hover:bg-white hover:border-primary transition-all group"
                            >
                                <Phone size={14} className="group-hover:animate-bounce" /> Direct Call
                            </a>

                            <a
                                href="mailto:Dhuruvanexports@gmail.com"
                                className="flex items-center justify-center gap-3 py-4 bg-slate-50 text-primary border border-slate-100 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.1em] hover:bg-white hover:border-primary transition-all group"
                            >
                                <Mail size={14} className="group-hover:animate-bounce" /> Email Inquiry
                            </a>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-full py-4 text-slate-300 font-black text-[9px] uppercase tracking-[0.3em] hover:text-red-400 transition-colors"
                        >
                            Dismiss Window
                        </button>
                    </div>
                </div>

                {/* Floating Close (Desktop) */}
                <button
                    onClick={onClose}
                    className="absolute top-8 right-8 hidden md:flex w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full items-center justify-center text-white transition-all hover:scale-110 hover:rotate-90"
                >
                    <X size={24} strokeWidth={3} />
                </button>
            </motion.div>
        </motion.div>
    );
};

const ProductCard = ({ product, index, onOpen }) => {
    const imgSrc = product.imageUrl || product.image;
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -10 }}
            className="group relative bg-[#0D1B2A] rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:shadow-[0_40px_100px_rgba(30,158,84,0.15)] transition-all duration-700 border border-white/5 m-1 cursor-pointer"
            onClick={() => onOpen(product)}
        >
            <div className="relative h-64 overflow-hidden">
                <motion.img
                    src={imgSrc}
                    alt={product.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                    whileHover={{ scale: 1.12 }}
                    transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
                />
                <div className="absolute inset-0 bg-primary/40 opacity-40 group-hover:opacity-20 transition-opacity duration-700" />

                <div className="absolute top-5 left-5 z-20 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                    <span className="text-[9px] font-black text-white uppercase tracking-widest">{product.status || 'Ready to Export'}</span>
                </div>

                {product.isHalal && (
                    <motion.img
                        initial={{ scale: 0, rotate: -45 }}
                        whileInView={{ scale: 1, rotate: 12 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.5, type: 'spring' }}
                        src={halalImg}
                        alt="Halal"
                        className="absolute -top-6 -right-6 w-32 pointer-events-none z-20"
                    />
                )}
            </div>
            <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl md:text-2xl font-black text-white group-hover:text-secondary transition-colors duration-300 tracking-tight leading-tight uppercase">
                        {product.title}
                    </h3>
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white group-hover:bg-secondary transition-all duration-500 border border-white/10 shrink-0">
                        <ChevronRight size={18} />
                    </div>
                </div>
                <p className="text-slate-400 mb-6 line-clamp-2 text-sm leading-relaxed font-medium group-hover:text-slate-300 transition-colors">
                    {product.description}
                </p>
                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                            <Package size={14} />
                        </div>
                        <span className="text-[10px] font-black text-white uppercase tracking-widest leading-none">View Details</span>
                    </div>
                    {product.specifications && (
                        <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">
                            {product.specifications.length} Specs
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

const CategoryPage = () => {
    const { slug } = useParams();
    const [categoryProducts, setCategoryProducts] = useState([]);
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeProduct, setActiveProduct] = useState(null);

    // Resolve category info
    useEffect(() => {
        const unsub = onSnapshot(collection(db, 'categories'), (snap) => {
            const staticCat = staticCategories.find(c => c.slug === slug);
            if (!snap.empty) {
                const firestoreCat = snap.docs.map(d => ({ id: d.id, ...d.data() })).find(c => c.slug === slug);
                if (firestoreCat) setCategory({ ...staticCat, ...firestoreCat });
                else setCategory(staticCat || null);
            } else setCategory(staticCat || null);
            setLoading(false);
        }, () => {
            setCategory(staticCategories.find(c => c.slug === slug) || null);
            setLoading(false);
        });
        return unsub;
    }, [slug]);

    // Fetch products
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
                firestoreProducts.forEach(fp => {
                    const idx = merged.findIndex(p => p.title === fp.title);
                    if (idx !== -1) merged[idx] = { ...merged[idx], ...fp };
                    else merged.push(fp);
                });
            }
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
            <div className="min-h-screen flex flex-col items-center justify-center text-primary pt-20">
                <h2 className="text-3xl font-black mb-4">Category not found</h2>
                <Link to="/" className="text-secondary underline">← Back to Home</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <AnimatePresence>
                {activeProduct && (
                    <ProductModal product={activeProduct} onClose={() => setActiveProduct(null)} />
                )}
            </AnimatePresence>

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

                <div className="relative z-10 container pb-14 pt-36 px-6">
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
                        <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Global Export Selection</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[1] uppercase"
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
                <div className="container relative z-10 px-6">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <p className="text-[10px] font-black text-secondary uppercase tracking-[0.4em] mb-2">
                                {categoryProducts.length} Premium Collection{categoryProducts.length !== 1 ? 's' : ''}
                            </p>
                            <h2 className="text-3xl md:text-4xl font-black text-primary tracking-tight">
                                Explore <span className="text-secondary italic">{category?.title}</span>
                            </h2>
                        </div>
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
                                <ProductCard key={product.id || product.docId} index={idx} product={product} onOpen={setActiveProduct} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default CategoryPage;
