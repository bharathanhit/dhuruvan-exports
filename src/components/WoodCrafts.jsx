import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, ArrowLeft, Leaf, Package, Star } from 'lucide-react';
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

const products = [
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

    const handleWhatsApp = (product) => {
        const msg = encodeURIComponent(`Hello Dhuruvan Exports,\n\nI am interested in the following wood craft product:\n\n*${product.name}*\nCategory: ${product.category}\n\nPlease share pricing and export details.\n\nThank you.`);
        window.open(`https://wa.me/919952777973?text=${msg}`, '_blank');
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>

            {/* Hero Banner */}
            <div style={{
                background: 'linear-gradient(135deg, #002D58 0%, #1E9E54 100%)',
                padding: '120px 0 80px',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* decorative circles */}
                <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
                <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '13px', fontWeight: 700, marginBottom: '32px', letterSpacing: '0.05em' }}>
                        <ArrowLeft size={16} /> Back to Home
                    </Link>

                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '999px', padding: '6px 16px', marginBottom: '20px' }}>
                        <Leaf size={13} style={{ color: '#4ade80' }} />
                        <span style={{ color: 'white', fontSize: '11px', fontWeight: 800, letterSpacing: '0.25em', textTransform: 'uppercase' }}>Handcrafted Collection</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 900, color: 'white', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '20px' }}>
                        Wood & Rattan<br /><span style={{ color: '#4ade80' }}>Craft Collection</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                        style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', fontWeight: 500, maxWidth: '520px', lineHeight: 1.7 }}>
                        Authentic handcrafted rattan and bamboo furniture, export-ready worldwide. Each piece made by skilled artisans using traditional Indian craft techniques.
                    </motion.p>

                    <div style={{ display: 'flex', gap: '32px', marginTop: '40px' }}>
                        {[{ v: '9+', l: 'Unique Products' }, { v: '100%', l: 'Handcrafted' }, { v: '15+', l: 'Export Markets' }].map((s, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}>
                                <div style={{ fontSize: '2rem', fontWeight: 900, color: 'white' }}>{s.v}</div>
                                <div style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>{s.l}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <div className="container" style={{ padding: '64px 2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '28px' }}>
                    {products.map((product, i) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.07, duration: 0.5 }}
                            style={{ background: 'white', borderRadius: '20px', overflow: 'hidden', border: '1px solid #e2e8f0', cursor: 'pointer', transition: 'transform 0.3s, box-shadow 0.3s' }}
                            whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(0,45,88,0.12)' }}
                            onClick={() => setSelected(product)}
                        >
                            {/* Image */}
                            <div style={{ position: 'relative', height: '260px', overflow: 'hidden', backgroundColor: '#f1f5f9' }}>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                                    onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                                    onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                                />
                                {/* Tag */}
                                <div style={{ position: 'absolute', top: '14px', left: '14px', background: 'var(--secondary)', color: 'white', fontSize: '10px', fontWeight: 800, padding: '4px 12px', borderRadius: '999px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                                    {product.tag}
                                </div>
                            </div>

                            {/* Info */}
                            <div style={{ padding: '20px 22px 22px' }}>
                                <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '6px' }}>
                                    {product.category}
                                </div>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0f172a', marginBottom: '8px', lineHeight: 1.3 }}>
                                    {product.name}
                                </h3>
                                <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.6, marginBottom: '18px', fontWeight: 500 }}>
                                    {product.description}
                                </p>

                                <button
                                    onClick={(e) => { e.stopPropagation(); handleWhatsApp(product); }}
                                    style={{
                                        width: '100%', padding: '11px', background: 'var(--primary)', color: 'white', border: 'none',
                                        borderRadius: '10px', fontSize: '12px', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase',
                                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'background 0.2s'
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.background = '#1E9E54'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'var(--primary)'}
                                >
                                    <Send size={14} /> Enquire on WhatsApp
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selected && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setSelected(null)}
                        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                            onClick={e => e.stopPropagation()}
                            style={{ background: 'white', borderRadius: '24px', overflow: 'hidden', maxWidth: '780px', width: '100%', display: 'flex', flexDirection: 'column' }}
                        >
                            <div style={{ position: 'relative', height: '380px', backgroundColor: '#f1f5f9' }}>
                                <img src={selected.image} alt={selected.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <button onClick={() => setSelected(null)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'white', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 12px rgba(0,0,0,0.15)' }}>
                                    <X size={18} style={{ color: '#0f172a' }} />
                                </button>
                                <div style={{ position: 'absolute', top: '16px', left: '16px', background: 'var(--secondary)', color: 'white', fontSize: '10px', fontWeight: 800, padding: '4px 12px', borderRadius: '999px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                                    {selected.tag}
                                </div>
                            </div>
                            <div style={{ padding: '28px 32px 32px' }}>
                                <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '8px' }}>
                                    {selected.category}
                                </div>
                                <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', marginBottom: '12px' }}>{selected.name}</h2>
                                <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.7, marginBottom: '24px', fontWeight: 500 }}>{selected.description}</p>
                                <div style={{ display: 'flex', gap: '12px' }}>
                                    <button
                                        onClick={() => handleWhatsApp(selected)}
                                        style={{ flex: 1, padding: '14px', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '12px', fontSize: '13px', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                                    >
                                        <Send size={15} /> Request Export Quote
                                    </button>
                                    <button
                                        onClick={() => setSelected(null)}
                                        style={{ padding: '14px 20px', background: '#f1f5f9', color: '#64748b', border: 'none', borderRadius: '12px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
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
