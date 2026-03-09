import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Phone, User, Globe, MessageCircle, Mail, MapPin, Building2, AlignLeft } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const WelcomePopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        company: '',
        port: '',
        interest: 'Agro Products',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        // Show immediately on every load as requested by user
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 800);

        // Listen for manual triggers from Navbar
        const handleManualOpen = () => {
            setIsSubmitted(false); // Reset to form view if previously submitted
            setIsOpen(true);
        };

        window.addEventListener('openInquiryPopup', handleManualOpen);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('openInquiryPopup', handleManualOpen);
        };
    }, []);

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.phone || !formData.port) {
            alert("Please fill in Name, Phone, and Destination Port.");
            return;
        }

        setIsSubmitting(true);
        try {
            // Save to Firestore 'inquiries' collection
            await addDoc(collection(db, 'inquiries'), {
                name: formData.name,
                phone: formData.phone,
                email: formData.email || 'N/A',
                company: formData.company || 'N/A',
                product: formData.interest,
                industry: `First Visit Popup (Co: ${formData.company || 'N/A'})`,
                destination: formData.port,
                message: formData.message || "N/A",
                contactMethod: 'whatsapp',
                createdAt: serverTimestamp(),
                status: 'new'
            });

            setIsSubmitted(true);

            // Auto close after success message
            setTimeout(() => {
                setIsOpen(false);
            }, 3000);

            // Redirect to WhatsApp with full details
            const waBody = `🤝 *New Global Inquiry - Dhuruvan Exports* 🤝\n\n👤 *Name:* ${formData.name}\n🏢 *Company:* ${formData.company || 'N/A'}\n📱 *Phone:* ${formData.phone}\n✉️ *Email:* ${formData.email || 'N/A'}\n🎯 *Interested In:* ${formData.interest}\n⚓ *Target Port:* ${formData.port}\n📝 *Note:* ${formData.message || "Looking for export catalogs."}\n\n🏢 *Source:* Welcome Popup`;
            window.open(`https://wa.me/919952777973?text=${encodeURIComponent(waBody)}`, '_blank');

        } catch (error) {
            console.error("Popup Submission Error:", error);
            alert("Something went wrong. Please check your connection.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4 backdrop-blur-md bg-primary/40 overflow-y-auto"
                    onClick={handleClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="relative bg-white rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] my-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Top Accent Bar */}
                        <div className="h-2 bg-secondary w-full" />

                        <button
                            onClick={handleClose}
                            className="absolute top-6 right-6 text-slate-300 hover:text-primary transition-colors z-10"
                        >
                            <X size={24} />
                        </button>

                        {!isSubmitted ? (
                            <div className="p-8 md:p-12">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 border border-secondary/20 rounded-full mb-6">
                                    <Globe size={12} className="text-secondary animate-pulse" />
                                    <span className="text-[9px] font-black text-secondary uppercase tracking-[0.2em]">Global Export Gateway</span>
                                </div>

                                <h2 className="text-4xl md:text-5xl font-black text-primary tracking-tighter uppercase leading-[0.9] mb-4">
                                    Request Your <br />
                                    <span className="text-secondary italic">Export Quote.</span>
                                </h2>
                                <p className="text-slate-500 font-medium text-sm mb-8">
                                    Complete your business profile to receive specialized catalogs and landing costs for your region.
                                </p>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Full Name */}
                                        <div className="space-y-1.5">
                                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                                            <div className="relative group">
                                                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-secondary transition-colors" />
                                                <input
                                                    type="text" required
                                                    value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    placeholder="Full Name"
                                                    className="w-full bg-slate-50 border border-slate-100 py-3 pl-12 pr-4 rounded-xl text-xs font-bold text-primary outline-none focus:bg-white focus:border-secondary transition-all"
                                                />
                                            </div>
                                        </div>

                                        {/* Company Name */}
                                        <div className="space-y-1.5">
                                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Company Name</label>
                                            <div className="relative group">
                                                <Building2 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-secondary transition-colors" />
                                                <input
                                                    type="text"
                                                    value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                                    placeholder="Company Name (Optional)"
                                                    className="w-full bg-slate-50 border border-slate-100 py-3 pl-12 pr-4 rounded-xl text-xs font-bold text-primary outline-none focus:bg-white focus:border-secondary transition-all"
                                                />
                                            </div>
                                        </div>

                                        {/* Phone / WhatsApp */}
                                        <div className="space-y-1.5">
                                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone / WhatsApp</label>
                                            <div className="relative group">
                                                <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-secondary transition-colors" />
                                                <input
                                                    type="tel" required
                                                    value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    placeholder="WhatsApp with Country Code"
                                                    className="w-full bg-slate-50 border border-slate-100 py-3 pl-12 pr-4 rounded-xl text-xs font-bold text-primary outline-none focus:bg-white focus:border-secondary transition-all"
                                                />
                                            </div>
                                        </div>

                                        {/* Email Address */}
                                        <div className="space-y-1.5">
                                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                                            <div className="relative group">
                                                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-secondary transition-colors" />
                                                <input
                                                    type="email"
                                                    value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    placeholder="work@company.com"
                                                    className="w-full bg-slate-50 border border-slate-100 py-3 pl-12 pr-4 rounded-xl text-xs font-bold text-primary outline-none focus:bg-white focus:border-secondary transition-all"
                                                />
                                            </div>
                                        </div>

                                        {/* Primary Interest */}
                                        <div className="space-y-1.5">
                                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Primary Interest</label>
                                            <select
                                                value={formData.interest} onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                                                className="w-full bg-slate-50 border border-slate-100 py-3 px-4 rounded-xl text-xs font-bold text-primary outline-none focus:bg-white focus:border-secondary transition-all appearance-none cursor-pointer"
                                            >
                                                <option>Agro Products</option>
                                                <option>Woodcrafts</option>
                                                <option>Livestock</option>
                                                <option>Beverages</option>
                                                <option>Other Services</option>
                                            </select>
                                        </div>

                                        {/* Destination Port */}
                                        <div className="space-y-1.5">
                                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Destination Port</label>
                                            <div className="relative group">
                                                <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-secondary transition-colors" />
                                                <input
                                                    type="text" required
                                                    value={formData.port} onChange={(e) => setFormData({ ...formData, port: e.target.value })}
                                                    placeholder="Target Discharge Port"
                                                    className="w-full bg-slate-50 border border-slate-100 py-3 pl-12 pr-4 rounded-xl text-xs font-bold text-primary outline-none focus:bg-white focus:border-secondary transition-all"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Specific Inquiry */}
                                    <div className="space-y-1.5">
                                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Specific Inquiry / Message</label>
                                        <div className="relative group">
                                            <AlignLeft size={16} className="absolute left-4 top-4 text-slate-300 group-focus-within:text-secondary transition-colors" />
                                            <textarea
                                                rows={2}
                                                value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                placeholder="Quantities, special certifications, specific requirements..."
                                                className="w-full bg-slate-50 border border-slate-100 py-3 pl-12 pr-4 rounded-xl text-xs font-bold text-primary outline-none focus:bg-white focus:border-secondary transition-all resize-none"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit" disabled={isSubmitting}
                                        className="w-full py-4 bg-primary text-white rounded-xl font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl shadow-primary/20 hover:bg-secondary transition-all flex items-center justify-center gap-3 mt-4"
                                    >
                                        {isSubmitting ? (
                                            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <Send size={16} /> Get Catalog & Quote
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <div className="p-16 text-center">
                                <motion.div
                                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                                    className="w-24 h-24 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mx-auto mb-8"
                                >
                                    <MessageCircle size={48} />
                                </motion.div>
                                <h2 className="text-4xl font-black text-primary tracking-tighter uppercase mb-4">Inquiry Received</h2>
                                <p className="text-slate-400 font-medium text-lg leading-relaxed">
                                    Our trade specialists are generating your <br />
                                    <span className="text-primary font-bold">Priority Export Quote</span> now.
                                </p>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default WelcomePopup;
