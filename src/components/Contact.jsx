import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowRight, Send, Users, Award, ChevronRight, X, Briefcase, Clock, Calendar, Sparkles } from 'lucide-react';
import flightImg from '../assets/flight.jpeg';

const Contact = () => {
    return (
        <section id="contact" className="section-padding bg-slate-100 flex items-center justify-center" style={{ borderTop: '1px solid #cbd5e1' }}>
            <div className="container">
                <div className="contact-split-layout">
                    {/* Left Side: Cargo Visual (Reference Perfect) */}
                    <div className="cargo-portal-container relative">
                        <div className="cargo-image-wrapper" />



                        <motion.img
                            initial={{ x: -50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            src={flightImg}
                            alt="Cargo Logistics"
                            className="cargo-plane"
                        />

                        {/* The Large Curved Blue Arc */}
                        <div className="cargo-portal-mask" />
                    </div>

                    {/* Right Side: Original Inquiry Form Structure */}
                    <div className="bg-white relative" style={{ border: '1px solid #e2e8f0', borderRadius: '1.5rem', overflow: 'hidden' }}>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="inquiry-card-compact"
                        >
                            <div className="badge-wrapper" style={{ justifyContent: 'flex-start' }}>
                                <div className="exclusive-badge">
                                    <Sparkles size={12} />
                                    <span>Global Partner Opportunity</span>
                                </div>
                            </div>

                            <h3 className="inquiry-title-compact">
                                Get Your <span style={{ color: '#2563eb' }}>Export Quote</span>
                            </h3>
                            <p className="inquiry-subtitle-compact">
                                Reliable sourcing and global supply chain excellence.
                            </p>

                            <form onSubmit={(e) => e.preventDefault()}>
                                <div className="inquiry-field-group">
                                    <label className="inquiry-label">Full Name</label>
                                    <div className="input-container">
                                        <Users size={20} className="field-icon" />
                                        <input
                                            type="text"
                                            placeholder="Ex: John Doe"
                                            className="inquiry-input-field"
                                        />
                                    </div>
                                </div>

                                <div className="inquiry-grid">
                                    <div className="inquiry-field-group">
                                        <label className="inquiry-label">Business Status</label>
                                        <div className="input-container">
                                            <Briefcase size={20} className="field-icon" />
                                            <select className="inquiry-input-field inquiry-select">
                                                <option>Importer / Buyer</option>
                                                <option>Wholesale Distributor</option>
                                                <option>Logistics Provider</option>
                                                <option>Retail Chain Owner</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="inquiry-grid-item">
                                        <label className="inquiry-label">Destination Port</label>
                                        <div className="input-container">
                                            <MapPin size={20} className="field-icon" />
                                            <input
                                                type="text"
                                                placeholder="City, Country"
                                                className="inquiry-input-field"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="inquiry-field-group">
                                    <label className="inquiry-label">Primary Product Inquiry</label>
                                    <div className="input-container">
                                        <Award size={20} className="field-icon" />
                                        <select className="inquiry-input-field inquiry-select">
                                            <option>Premium Basmati Rice</option>
                                            <option>Frozen Buffalo Meat</option>
                                            <option>Handicrafts & Decor</option>
                                            <option>Textiles & Garments</option>
                                            <option>Other Agro Products</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="inquiry-field-group">
                                    <label className="inquiry-label">Preferred Logistics</label>
                                    <div className="input-container">
                                        <Clock size={20} className="field-icon" />
                                        <select className="inquiry-input-field inquiry-select">
                                            <option>Sea Freight (FCL/LCL)</option>
                                            <option>Air Cargo (Express)</option>
                                            <option>Land-Sea Hybrid</option>
                                        </select>
                                    </div>
                                </div>

                                <button className="whatsapp-btn">
                                    <Send size={24} />
                                    Request Quote via WhatsApp
                                </button>

                                <div className="slot-footer" style={{ justifyContent: 'flex-start' }}>
                                    <Calendar size={14} />
                                    <span>Typical Response Time: 2 Business Hours</span>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
