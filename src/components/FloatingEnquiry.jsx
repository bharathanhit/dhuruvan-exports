import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Phone, Mail, X, Send, Sparkles } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const FloatingEnquiry = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAction = async (type) => {
        const phone = "+919952777973";
        const email = "Dhuruvanexports@gmail.com";
        const body = "Hi Dhuruvan Exports, I'm interested in partnering with you. Please provide more details about your export services.";

        setIsSubmitting(true);
        try {
            // Save to Dashboard
            await addDoc(collection(db, 'inquiries'), {
                name: "Floating Widget Lead",
                product: "General Partnership",
                industry: "Quick Connect",
                destination: "Global",
                logistics: "Sea/Air",
                contactMethod: type,
                createdAt: serverTimestamp(),
                status: 'new'
            });

            const body = `🤝 *General Export Inquiry - Dhuruvan Exports* 🤝\n\n` +
                `🎯 *Purpose:* Exploring Business Partnership / Services\n` +
                `🏢 *Source:* Floating Connect Widget\n\n` +
                `I'm interested in learning more about your global supply chain and export services. Please connect.`;

            if (type === 'whatsapp') {
                window.open(`https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(body)}`, '_blank');
            } else if (type === 'email') {
                window.location.href = `mailto:${email}?subject=Export Partnership Inquiry&body=${encodeURIComponent(body)}`;
            } else if (type === 'call') {
                window.location.href = `tel:${phone}`;
            }
        } catch (error) {
            console.error("Floating Inquiry Error:", error);
        } finally {
            setIsSubmitting(false);
            setIsOpen(false);
        }
    };

    return (
        <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4 pointer-events-none">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="pointer-events-auto bg-white rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(0,43,88,0.25)] border border-slate-100 p-8 w-[320px] mb-2"
                    >
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <Sparkles size={14} className="text-secondary" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Direct Connect</span>
                                </div>
                                <h3 className="text-2xl font-black text-primary tracking-tighter uppercase leading-none">Quick Inquiry</h3>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-slate-300 hover:text-primary transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            <button
                                onClick={() => handleAction('whatsapp')}
                                disabled={isSubmitting}
                                className="group flex items-center gap-4 p-4 rounded-2xl bg-[#25D366]/5 border border-[#25D366]/10 hover:bg-[#25D366] hover:text-white transition-all duration-300 disabled:opacity-50"
                            >
                                <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center group-hover:bg-white group-hover:text-[#25D366] transition-colors shadow-lg">
                                    {isSubmitting ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <MessageCircle size={20} />}
                                </div>
                                <div className="text-left">
                                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60">WhatsApp</p>
                                    <p className="font-black text-sm">Instant Chat</p>
                                </div>
                            </button>

                            <button
                                onClick={() => handleAction('email')}
                                disabled={isSubmitting}
                                className="group flex items-center gap-4 p-4 rounded-2xl bg-primary/5 border border-primary/10 hover:bg-primary hover:text-white transition-all duration-300 disabled:opacity-50"
                            >
                                <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center group-hover:bg-white group-hover:text-primary transition-colors shadow-lg">
                                    {isSubmitting ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <Mail size={20} />}
                                </div>
                                <div className="text-left">
                                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Gmail</p>
                                    <p className="font-black text-sm">Formal Inquiry</p>
                                </div>
                            </button>

                            <button
                                onClick={() => handleAction('call')}
                                disabled={isSubmitting}
                                className="group flex items-center gap-4 p-4 rounded-2xl bg-secondary/5 border border-secondary/10 hover:bg-secondary hover:text-white transition-all duration-300 disabled:opacity-50"
                            >
                                <div className="w-10 h-10 rounded-xl bg-secondary text-white flex items-center justify-center group-hover:bg-white group-hover:text-secondary transition-colors shadow-lg">
                                    {isSubmitting ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <Phone size={20} />}
                                </div>
                                <div className="text-left">
                                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Direct Call</p>
                                    <p className="font-black text-sm">+91 99527 77973</p>
                                </div>
                            </button>
                        </div>

                        <p className="text-[9px] font-bold text-slate-400 text-center mt-6 uppercase tracking-widest">Available 24/7 for Global Partners</p>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                initial={false}
                animate={{
                    scale: scrolled || isOpen ? 1 : 0,
                    opacity: scrolled || isOpen ? 1 : 0
                }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="pointer-events-auto w-16 h-16 rounded-[1.5rem] bg-primary text-white flex items-center justify-center shadow-[0_20px_40px_-5px_rgba(37,99,235,0.4)] border-4 border-white transition-all group overflow-hidden relative"
            >
                <div className="absolute inset-0 bg-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <div className="relative z-10">
                    {isOpen ? <X size={28} /> : <Send size={28} />}
                </div>
            </motion.button>
        </div>
    );
};

export default FloatingEnquiry;
