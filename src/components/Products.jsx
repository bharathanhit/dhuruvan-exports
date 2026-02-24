import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ChevronRight, Sparkles, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import woodcraftsImg from '../assets/woodcrafts.jpg';
import waterImg from '../assets/water.jpeg';
import halalImg from '../assets/halal.png';

const ProductCard = ({ title, category, image, description, index, link, isHalal }) => {
    const Wrapper = link ? Link : 'div';
    const wrapperProps = link ? { to: link } : {};

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            className="group relative bg-white rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.15)] transition-all duration-700 hover:-translate-y-2"
        >
            <Wrapper {...wrapperProps} className={link ? 'block no-underline text-inherit' : ''}>
                {/* Image Container with refined overlay */}
                <div className="h-72 overflow-hidden relative">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />

                    {/* Category Badge - Guaranteed Small Inline Styles */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '8px',
                            left: '8px',
                            zIndex: 50,
                            backgroundColor: 'white',
                            padding: '4px 9px',
                            borderRadius: '99px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            border: '1px solid rgba(0,0,0,0.05)',
                            fontSize: '9px',
                            fontWeight: '900',
                            color: '#002D58',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            lineHeight: '1',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {category}
                    </div>

                    {/* Halal Badge - Aggressive Flash to Corner */}
                    {isHalal && (
                        <img
                            src={halalImg}
                            alt="Halal Certified"
                            style={{
                                position: 'absolute',
                                top: '-60px',
                                right: '-60px',
                                width: '250px',
                                height: 'auto',
                                zIndex: 60,
                                userSelect: 'none',
                                pointerEvents: 'none',
                                filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.4))'
                            }}
                            onError={(e) => { e.target.style.display = 'none'; }}
                        />
                    )}
                </div>

                {/* Content Section */}
                <div
                    className="p-6"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)', color: 'white' }}
                >
                    <div className="flex justify-between items-start mb-3">
                        <h3 className="text-3xl font-bold group-hover:text-secondary transition-colors duration-300">
                            {title}
                        </h3>
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white group-hover:bg-secondary group-hover:text-white transition-all duration-500">
                            <ChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
                        </div>
                    </div>

                    <p className="text-gray-200 mb-4 line-clamp-2 text-base leading-relaxed font-medium">
                        {description}
                    </p>

                    {/* Premium Seal */}
                    <div className="pt-4 border-t border-white/20 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-secondary/30 flex items-center justify-center text-secondary">
                                <CheckCircle2 size={20} />
                            </div>
                            <div>
                                <p className="text-xs font-black text-white uppercase tracking-widest leading-none mb-1">
                                    Quality Certified
                                </p>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">
                                    Premium Standard
                                </p>
                            </div>
                        </div>
                        <div className="flex -space-x-2 opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-6 h-6 rounded-full border border-white bg-secondary flex items-center justify-center">
                                    <CheckCircle2 size={10} className="text-white" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {link && (
                    <div className="absolute bottom-4 right-4 flex items-center gap-1 text-secondary text-sm font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <span>View Products</span>
                        <ChevronRight size={14} />
                    </div>
                )}
            </Wrapper>
        </motion.div >
    );
};

const Products = () => {
    const products = [
        {
            title: 'Basmati Rice',
            category: 'Agro Products',
            image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800',
            description: 'Long-grain, aromatic rice sourced from the foothills of the Himalayas. Known for its distinct fragrance and fluffy texture.'
        },
        {
            title: 'Non-Basmati Rice',
            category: 'Agro Products',
            image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&q=80&w=800',
            description: 'High-quality Sona Masoori, Ponni, and IR64 varieties. Versatile and nutrition-rich grains for everyday consumption.'
        },
        {
            title: 'Buffalo Meat',
            category: 'Livestock',
            image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=80&w=800',
            description: 'Premium frozen boneless buffalo meat. Processed under strict hygienic conditions and international safety standards.',
            isHalal: true
        },
        {
            title: 'Drinking Water',
            category: 'Beverages',
            image: waterImg,
            description: 'Purified and mineral-enriched drinking water. Packaged with advanced purification technology for crystal clarity.'
        },
        {
            title: 'Woodcrafts',
            category: 'Handicrafts',
            image: woodcraftsImg,
            description: 'Exquisitely carved wooden furniture and decorative items. Reflecting India\'s rich cultural heritage and craftsmanship.',
            link: '/wood-crafts'
        }
    ];

    return (
        <section id="products" className="py-32 bg-white relative overflow-hidden">
            {/* Subtle premium background elements */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 -z-0" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-green-50/50 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 -z-0" />

            <div className="container relative z-10">
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-24 gap-12">
                    <div className="max-w-xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 mb-8 group hover:border-secondary/30 transition-all duration-500"
                        >
                            <div className="p-1.5 rounded-full bg-secondary/10 text-secondary group-hover:scale-110 transition-transform">
                                <Sparkles size={14} />
                            </div>
                            <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Our Premium Catalog</span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-5xl md:text-7xl text-primary font-bold leading-[1.1]"
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
                        className="max-w-md"
                    >
                        <p className="text-gray-500 text-xl leading-relaxed font-medium mb-6">
                            We source only the finest products that meet stringent international quality benchmarks. Each item is carefully selected and processed.
                        </p>
                        <div className="h-1 w-20 bg-secondary/30 rounded-full" />
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {products.map((product, idx) => (
                        <ProductCard key={idx} index={idx} {...product} />
                    ))}
                </div>
            </div>
        </section>
    );
};


export default Products;
