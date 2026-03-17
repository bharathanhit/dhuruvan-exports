import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    TrendingUp,
    ArrowLeft,
    CheckCircle2,
    Package,
    ArrowRight,
    Layers,
    BoxSelect
} from 'lucide-react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { products as staticProducts } from '../data/products';
import halalImg from '../assets/halal.png';
import GlobalInquiryButtons from './GlobalInquiryButtons';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const staticProd = staticProducts.find(p => p.id === id);
                const q = query(collection(db, 'products'), where('id', '==', id));
                const snap = await getDocs(q);

                if (!snap.empty) {
                    const firestoreProd = { ...snap.docs[0].data(), docId: snap.docs[0].id };
                    setProduct({ ...staticProd, ...firestoreProd });
                } else if (staticProd) {
                    setProduct(staticProd);
                } else {
                    navigate('/#products');
                }
            } catch (err) {
                console.error("Firestore lookup failed:", err);
                const staticProd = staticProducts.find(p => p.id === id);
                if (staticProd) setProduct(staticProd);
                else navigate('/#products');
            }
            setLoading(false);
            window.scrollTo(0, 0);
        };
        fetchProduct();
    }, [id, navigate]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="w-12 h-12 border-4 border-secondary/20 border-t-secondary rounded-full animate-spin" />
        </div>
    );
    if (!product) return null;

    const getEmojiForVariety = (index) => {
        const emojis = ['🏆', '✨', '🌍', '📦', '🤝'];
        return emojis[index % emojis.length];
    };

    return (
        <div id="product-detail" className="min-h-screen bg-[#fafbfc] selection:bg-secondary/30">
            <div className="container px-6 pt-52 pb-24">
                <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex items-center justify-end gap-3 mb-12">
                        <Link
                            to="/#"
                            className="inline-flex items-center gap-2 text-slate-500 bg-slate-100 hover:bg-secondary hover:text-white px-4 py-2 rounded-xl text-[10px] font-black transition-all group tracking-[0.2em] uppercase"
                        >
                            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                            Back to Home
                        </Link>
                        <Link
                            to={product?.categorySlug ? `/category/${product.categorySlug}` : "/#products"}
                            className="inline-flex items-center gap-2 text-slate-500 bg-slate-100 hover:bg-secondary hover:text-white px-4 py-2 rounded-xl text-[10px] font-black transition-all group tracking-[0.2em] uppercase"
                        >
                            Back to {product?.categorySlug ? product.category : 'Catalog'}
                        </Link>
                    </div>
                </motion.div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
                    {/* Left Column: Product Image & Highlights */}
                    <div className="lg:col-span-6 space-y-12">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative group rounded-[3rem] overflow-hidden shadow-2xl bg-white border border-slate-100 aspect-square"
                        >
                            <img
                                src={product.imageUrl || product.image}
                                alt={product.title}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none" />
                            
                            <div className="absolute top-8 left-8 z-20">
                                <div className="px-5 py-2 bg-white/90 backdrop-blur-md rounded-full shadow-xl border border-white/20">
                                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Premium Export Entry</span>
                                </div>
                            </div>

                            {product.isHalal && (
                                <motion.img
                                    initial={{ scale: 0, rotate: -45 }}
                                    animate={{ scale: 1, rotate: 12 }}
                                    src={halalImg}
                                    alt="Halal"
                                    className="absolute -top-4 -right-4 w-32 pointer-events-none z-20 drop-shadow-2xl opacity-90"
                                />
                            )}
                        </motion.div>

                    </div>


                    {/* Right Column: Title, Description & Specifications Card */}
                    <div className="lg:col-span-6 space-y-10">
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
                                className="text-4xl md:text-6xl font-black text-primary mb-8 tracking-tighter leading-[0.95] uppercase"
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
                                className="text-lg md:text-xl text-slate-500 leading-relaxed font-medium mb-12"
                            >
                                {product.longDescription || product.description}
                            </motion.p>
                        </section>

                        {/* Detailed Specs Card */}
                        {product.specifications && product.specifications.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-10 shadow-sm relative overflow-hidden group"
                            >
                                <h3 className="text-xl font-black mb-8 tracking-tighter flex items-center gap-3 text-primary uppercase">
                                    <ArrowRight size={18} className="text-secondary" />
                                    Specifications
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 relative z-10">
                                    {product.specifications.map((spec, i) => (
                                        <div key={i} className="flex flex-col gap-1 border-b border-slate-50 pb-3 last:border-0 md:[&:nth-last-child(2)]:border-0 transition-colors group/spec">
                                            <span className="text-[9px] font-black text-secondary tracking-widest uppercase">{spec.label}</span>
                                            <span className="text-[14px] font-black text-primary leading-tight">{spec.value}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Available Types */}
                                {product.types && product.types.length > 0 && (
                                    <div className="mt-10 pt-8 border-t border-slate-50 relative z-10">
                                        <div className="flex items-center gap-2 mb-4">
                                            <Layers size={14} className="text-secondary" />
                                            <p className="text-[9px] font-black text-secondary tracking-widest uppercase">Available Types</p>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {product.types.map((type, i) => (
                                                <span key={i} className="px-3 py-1.5 bg-slate-50 border border-slate-100 text-primary text-[9px] font-black uppercase tracking-widest rounded-full hover:bg-secondary hover:text-white hover:border-secondary transition-all">
                                                    {type}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {product.minimumOrder && (
                                    <div className="mt-8 relative z-10">
                                        <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-5 flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                                                <BoxSelect size={18} className="text-secondary" />
                                            </div>
                                            <div>
                                                <p className="text-[9px] font-black text-secondary uppercase tracking-widest mb-0.5">Min Order</p>
                                                <p className="text-base font-black text-primary leading-tight">{product.minimumOrder}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {/* Varieties Section (Moved Here) */}
                        {product.varieties && product.varieties.length > 0 && (
                            <motion.section 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="space-y-6 pt-4"
                            >
                                <div className="flex flex-col gap-1">
                                    <span className="text-[9px] font-black text-secondary uppercase tracking-[0.3em]">Selection</span>
                                    <h2 className="text-xl font-black text-primary uppercase tracking-tighter">Varieties</h2>
                                </div>

                                <div className="space-y-4">
                                    {product.varieties.map((variety, index) => (
                                        <div
                                            key={index}
                                            className="group relative bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-all duration-500 overflow-hidden"
                                        >
                                            <div className="absolute top-0 right-0 p-4 text-slate-50 font-black text-6xl pointer-events-none group-hover:text-secondary/5 transition-colors leading-none">
                                                {index + 1}
                                            </div>
                                            <div className="flex items-center gap-4 relative z-10">
                                                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-xl border border-slate-100 shrink-0">
                                                    {getEmojiForVariety(index)}
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-black text-primary tracking-tighter uppercase group-hover:text-secondary transition-colors leading-none mb-2">
                                                        {variety.title}
                                                    </h3>
                                                    <p className="text-sm text-slate-500 font-medium line-clamp-2 leading-snug">
                                                        {variety.desc}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.section>
                        )}
                    </div>
                </div>


                <div className="mt-12 pt-12 border-t border-slate-100">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-12">
                            {/* Benefits List (Full Width or Side-by-Side) */}
                            {product.benefits && product.benefits.length > 0 && (
                                <div className="bg-white border border-slate-100 rounded-[3rem] p-12 shadow-sm">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                        <div>
                                            <h3 className="text-3xl font-black text-primary mb-8 tracking-tighter uppercase">Key Benefits</h3>
                                            <div className="space-y-4">
                                                {product.benefits.map((benefit, i) => (
                                                    <div key={i} className="flex items-start gap-4 text-slate-600 group">
                                                        <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 group-hover:bg-secondary transition-colors mt-0.5">
                                                            <CheckCircle2 size={12} className="text-secondary group-hover:text-white" />
                                                        </div>
                                                        <span className="text-[15px] font-bold tracking-tight leading-tight group-hover:text-primary transition-colors">{benefit}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="bg-slate-50 rounded-[2rem] p-8 flex flex-col justify-center items-center text-center space-y-6">
                                            <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Direct Inquiry</p>
                                            <h4 className="text-2xl font-black text-primary tracking-tighter">Ready to Source?</h4>
                                            <GlobalInquiryButtons productTitle={product.title} context="Product Detail Consolidated" className="w-full" />
                                        </div>
                                    </div>
                                </div>
                            )}
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
                        <div className="flex flex-col gap-6 justify-center">
                            <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] mb-4">Partner with Dhuruvan Exports Today</p>
                            <GlobalInquiryButtons productTitle={product.title} className="max-w-2xl mx-auto w-full" />
                        </div>
                    </div>
                </motion.section>
            </div>
        </div>
    );
};

export default ProductDetail;












