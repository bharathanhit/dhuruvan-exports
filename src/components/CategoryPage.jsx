import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ChevronRight, Sparkles, X, Send, Package, ShoppingBag, Info, Award, Phone, Mail } from 'lucide-react';
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { products as staticProducts, categories as staticCategories } from '../data/products';
import halalImg from '../assets/halal.png';
import woodenBg from '../assets/wooden-background.jpg';
import agriWallBg from '../assets/agri-wall.jpg';
import waterBg from '../assets/children-water-bg.png';

import GlobalInquiryButtons from './GlobalInquiryButtons';

const ProductModal = ({ product, onClose }) => {
    if (!product) return null;
    const imgSrc = product.imageUrl || product.image;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/60 backdrop-blur-md"
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
                    className="absolute top-6 right-6 z-[60] py-2 px-5 bg-white shadow-xl rounded-full flex items-center justify-center gap-2 text-primary border border-slate-100 md:hidden text-[10px] font-black uppercase tracking-widest"
                >
                    <X size={14} />
                    CLOSE
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
                <div className="md:w-1/2 p-6 md:p-8 lg:p-10 flex flex-col gap-6 bg-white overflow-y-auto max-h-[90vh]">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-secondary/10 border border-secondary/20 rounded-full w-fit">
                        <Award size={12} className="text-secondary" />
                        <span className="text-[9px] font-black text-secondary uppercase tracking-[0.2em]">{product.badgeNote || 'Handcrafted Product'}</span>
                    </div>

                    <div className="space-y-3">
                        <h2 className="text-3xl md:text-3xl font-black text-primary tracking-tighter uppercase leading-[0.9]">
                            {product.title}
                        </h2>
                        <p className="text-slate-500 font-medium text-sm leading-relaxed">
                            {product.longDescription || product.description}
                        </p>
                    </div>

                    {/* Highlights/Benefits */}
                    {product.benefits && product.benefits.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {product.benefits.filter(b => b.trim() !== '').map((benefit, i) => (
                                <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-secondary/5 border border-secondary/10 rounded-lg text-secondary">
                                    <CheckCircle2 size={10} className="shrink-0" />
                                    <span className="text-[9px] font-black uppercase tracking-tight">{benefit}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Specs Section */}
                    <div className="space-y-6 pt-6 border-t border-slate-100">
                        {product.specifications && product.specifications.length > 0 && product.specifications.some(s => s.label.trim() !== '') ? (
                            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                                {product.specifications.filter(s => s.label.trim() !== '').map((spec, i) => (
                                    <div key={i} className="flex flex-col gap-1 group/spec">
                                        <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest group-hover/spec:text-secondary transition-colors">{spec.label}</span>
                                        <span className="text-sm font-black text-primary leading-none uppercase italic border-b border-slate-50 pb-1 group-hover/spec:border-secondary/20 transition-all">{spec.value}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-3 bg-slate-50/50 rounded-xl border border-slate-100 flex flex-col gap-1.5">
                                    <CheckCircle2 size={16} className="text-secondary" />
                                    <h5 className="text-[9px] font-black text-primary uppercase tracking-widest">Premium Grade</h5>
                                </div>
                                <div className="p-3 bg-slate-50/50 rounded-xl border border-slate-100 flex flex-col gap-1.5">
                                    <ShoppingBag size={16} className="text-secondary" />
                                    <h5 className="text-[9px] font-black text-primary uppercase tracking-widest">Global Logistics</h5>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mt-auto pt-6 border-t border-slate-100">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4 text-center">Start Your Inquiry</p>
                        <GlobalInquiryButtons productTitle={product.title} context={`Category Modal: ${product.categorySlug}`} />
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
                    className="absolute top-8 right-8 hidden md:flex items-center gap-3 px-6 py-2.5 bg-slate-100 hover:bg-red-50 rounded-full text-slate-400 hover:text-red-500 transition-all z-50 shadow-sm border border-slate-200 group font-black text-[10px] uppercase tracking-widest"
                >
                    <X size={16} className="group-hover:rotate-90 transition-transform" />
                    CLOSE
                </button>
            </motion.div>
        </motion.div>
    );
};

const ProductCard = ({ product, index, onOpen, themeColor, slug }) => {
    const imgSrc = product.imageUrl || product.image;
    const isBeverage = slug === 'beverages';
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -12 }}
            className="group relative bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.4)] hover:shadow-[0_40px_100px_rgba(0,0,0,0.6)] transition-all duration-700 m-1 cursor-pointer"
            onClick={() => onOpen(product)}
        >
            {/* Dynamic Glow Effect on Hover */}
            <div 
                className="absolute inset-x-0 bottom-0 h-1/2 opacity-0 group-hover:opacity-20 transition-opacity duration-700 blur-[80px] pointer-events-none z-0"
                style={{ backgroundColor: themeColor || '#1e9e54' }}
            />

            <div className={`relative h-64 overflow-hidden z-10 ${isBeverage ? 'bg-slate-50' : 'bg-[#0a0a0a]'}`}>
                <motion.img
                    src={imgSrc}
                    alt={product.title}
                    className={`w-full h-full ${isBeverage ? 'object-contain p-4' : 'object-cover'} opacity-90 group-hover:opacity-100 transition-all duration-1000`}
                    whileHover={{ scale: 1.08 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-700" />

                <div className="absolute top-5 left-5 z-20">
                    <div className="px-4 py-1.5 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
                        <span className="text-[9px] font-black text-white uppercase tracking-widest">{product.status || 'Ready to Export'}</span>
                    </div>
                </div>

                {product.isHalal && (
                    <motion.img
                        initial={{ scale: 0, rotate: -45 }}
                        whileInView={{ scale: 1, rotate: 12 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.5, type: 'spring' }}
                        src={halalImg}
                        alt="Halal"
                        className="absolute -top-4 -right-4 w-28 pointer-events-none z-20 drop-shadow-2xl"
                    />
                )}
            </div>

            <div className="p-8 relative z-10 bg-gradient-to-b from-transparent to-black/20">
                <div className="flex justify-between items-start mb-5">
                    <h3 className="text-xl md:text-2xl font-black text-white tracking-tighter leading-none group-hover:translate-x-1 transition-transform duration-500 uppercase">
                        {product.title}
                    </h3>
                    <div 
                        className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-white transition-all duration-500 border border-white/10 shrink-0 group-hover:scale-110 shadow-lg"
                        style={{ '--hover-bg': themeColor || '#1e9e54' }}
                    >
                        <ChevronRight size={18} className="group-hover:text-white" />
                    </div>
                </div>
                
                <p className="text-slate-400 mb-8 line-clamp-2 text-sm leading-relaxed font-medium group-hover:text-slate-200 transition-colors">
                    {product.description}
                </p>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div 
                            className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg"
                            style={{ backgroundColor: `${themeColor}20`, color: themeColor }}
                        >
                            <Package size={16} />
                        </div>
                        <span className="text-[10px] font-black text-white/90 uppercase tracking-widest leading-none">Export Details</span>
                    </div>
                    {product.specifications && (
                        <div className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/5">
                            <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">
                                {product.specifications.length} Attributes
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Hover Accent Border */}
            <div 
                className="absolute inset-0 border-2 border-transparent group-hover:border-white/10 transition-colors duration-700 pointer-events-none rounded-[2.5rem]"
            />
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
            merged.sort((a, b) => {
                const getOrder = (p) => {
                    if (typeof p.order === 'number') return p.order;
                    if (p.title?.toLowerCase().includes('rice')) return -1000; // Final safety for rice
                    return 0;
                };
                return getOrder(a) - getOrder(b);
            });
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
        <div className="min-h-screen bg-[#050505]">
            <AnimatePresence>
                {activeProduct && (
                    <ProductModal product={activeProduct} onClose={() => setActiveProduct(null)} />
                )}
            </AnimatePresence>

            {/* Hero Banner */}
            <div className={`relative h-[55vh] min-h-[450px] md:h-[60vh] overflow-hidden flex items-end bg-gradient-to-br ${category?.gradient || 'from-slate-900 to-slate-800'}`}>
                {category && (
                    <motion.img
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1.8, ease: 'easeOut' }}
                        src={category.imageUrl || category.image}
                        alt={category.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-60"
                    />
                )}
                
                {/* Subtle texture overlay for premium feel */}
                <div className="absolute inset-0 bg-black/20 mix-blend-multiply z-0" />
                <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-0" />

                <div className="relative z-10 container pb-20 pt-48 px-6">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ duration: 0.8, type: 'spring', damping: 25, stiffness: 200 }}
                        className="max-w-4xl relative z-10"
                    >
                        <Link to="/#products" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-xs font-bold transition-colors mb-8 group tracking-widest uppercase">
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            Return to Catalog
                        </Link>

                        <div className="block mb-5">
                            <motion.span 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-[10px] md:text-[11px] font-black text-white uppercase tracking-[0.4em] px-5 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl"
                            >
                                Premium Global Selection
                            </motion.span>
                        </div>
                        
                        <h1 className="text-5xl md:text-[6rem] font-black tracking-tighter leading-none text-white mb-6 drop-shadow-2xl uppercase">
                            {category?.title || '...'}
                        </h1>
                        
                        <p className="text-white/80 text-xl md:text-2xl font-medium leading-relaxed max-w-2xl drop-shadow-lg tracking-tight">
                            {category?.description}
                        </p>
                    </motion.div>
                </div>

                {/* Animated Background Element */}
                <motion.div 
                    animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"
                />
            </div>

            {/* Products Grid */}
            <section 
                className={`relative overflow-hidden bg-fixed bg-center bg-cover bg-[#050505] py-40 md:py-64 min-h-[100vh]`}
                style={{ 
                    backgroundImage: `url(${slug === 'agro-products' ? agriWallBg : slug === 'beverages' ? waterBg : woodenBg})`,
                    backgroundPosition: 'center 30%'
                }}
            >
                {/* Fixed Overlays for Image Clarity */}
                {slug === 'woodcrafts' ? (
                    <div className="absolute inset-0 bg-[#3a2012]/60 z-0" />
                ) : (
                    <div className="absolute inset-0 bg-black/40 z-0" />
                )}

                {/* Refined Mesh Glows (more subtle now cards have glows) */}
                <div className="absolute inset-0 opacity-40 z-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[80%] h-[80%] rounded-full blur-[140px] -translate-y-1/2 translate-x-1/3" style={{ backgroundColor: `${category?.color}30` }} />
                    <div className="absolute bottom-0 left-0 w-[60%] h-[60%] rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4" style={{ backgroundColor: `${category?.color}20` }} />
                </div>

                <div className="container relative z-10 px-6">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
                        <div className="max-w-2xl">
                            <motion.p 
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="inline-block px-4 py-1.5 mb-6 rounded-full bg-white/5 border border-white/10 text-[10px] font-black text-white/60 uppercase tracking-[0.4em]"
                            >
                                {categoryProducts.length} Premium Collection{categoryProducts.length !== 1 ? 's' : ''}
                            </motion.p>
                            <motion.h2 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-[1.1]"
                            >
                                Explore Our <span style={{ color: category?.color || '#1e9e54' }}>{category?.title}</span>
                            </motion.h2>
                        </div>

                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="rounded-[2.5rem] bg-white/5 border border-white/5 animate-pulse h-[500px]" />
                            ))}
                        </div>
                    ) : categoryProducts.length === 0 ? (
                        <div className="text-center py-32 rounded-[3rem] border border-white/5 bg-white/5 backdrop-blur-sm">
                            <div className="inline-flex p-5 rounded-3xl bg-white/5 text-white/20 mb-6 font-black uppercase text-xs">Empty Collection</div>
                            <p className="text-white/40 text-lg font-medium">No products found in this category yet.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                            {categoryProducts.map((product, idx) => (
                                <ProductCard 
                                    key={product.id || product.docId} 
                                    index={idx} 
                                    product={product} 
                                    onOpen={setActiveProduct} 
                                    themeColor={category?.color}
                                    slug={slug}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default CategoryPage;

