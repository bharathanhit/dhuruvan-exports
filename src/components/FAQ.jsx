import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle, MessageCircle, Mail, Phone, Calendar, ArrowRight, Sparkles } from 'lucide-react';

const faqData = [
    {
        question: "What products does Dhuruvan Exports specialize in?",
        answer: "We specialize in core divisions: Agro Products (Premium Basmati Rice, Spices, Dry Fruits), Handcrafted Woodcrafts (Antique furniture and decor), and Beverages (Purified Mineral Water). All our products are sourced from premium Indian origins with strict quality control."
    },
    {
        question: "What shipment methods do you support?",
        answer: "We provide flexible global logistics through our primary methods: FOB (Freight on board), CIF (Cost insurance and Freight), DOD (Door to door), and DTP (Door to door duty paid). We handle both Sea and Air freight depending on your requirements."
    },
    {
        question: "Are your food and livestock products certified?",
        answer: "Yes, all our agro-commodities and livestock products are Halal Certified and compliant with international food safety standards. We provide specific barcoding and compliance labels for different global markets as part of our packaging services."
    },
    {
        question: "Can I request sample products before a bulk order?",
        answer: "Absolutely. We encourage sourcing partners to request samples for quality verification. You can request samples by contacting our trade specialists via WhatsApp or the direct inquiry form on our website."
    },
    {
        question: "Do you offer Private Labeling and Custom Packaging?",
        answer: "Yes, our Private Label Packaging Hub offers end-to-end solutions. This includes conceptual brand design, label creation, barcoding, and multiple packaging formats like Mono Cartons, Pillow Pouches, and Pet Jars."
    },
    {
        question: "How do I schedule a business consultation call?",
        answer: "You can schedule a Discovery Call directly through our Services page. Our mapping-style UI allows you to pick a date and time that works for you, and our team will connect with you via Video or Local Call."
    },
    {
        question: "What is your typical turnaround time for an inquiry?",
        answer: "Our team aims to respond to all inquiries within 12–24 business hours. For urgent requirements, we recommend reaching out via our direct WhatsApp line for instant communication."
    }
];

const FAQItem = ({ item, index }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`group border-b border-slate-100 last:border-0 transition-all ${isOpen ? 'bg-slate-50/50' : 'hover:bg-slate-50/30'}`}
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-7 px-6 md:px-10 flex items-center justify-between text-left gap-6"
            >
                <div className="flex items-center gap-6">
                    <span className="text-secondary font-black text-sm opacity-40 tabular-nums">
                        {(index + 1).toString().padStart(2, '0')}
                    </span>
                    <h3 className={`text-lg md:text-xl font-black transition-colors ${isOpen ? 'text-primary' : 'text-slate-600 group-hover:text-primary'}`}>
                        {item.question}
                    </h3>
                </div>
                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all ${isOpen ? 'bg-primary border-primary text-white rotate-0' : 'border-slate-200 text-slate-400 group-hover:border-primary group-hover:text-primary'}`}>
                    {isOpen ? <Minus size={16} strokeWidth={3} /> : <Plus size={16} strokeWidth={3} />}
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="px-6 md:px-10 pb-8 pl-[4.5rem] md:pl-[5.5rem] pr-10">
                            <p className="text-slate-500 font-medium leading-relaxed text-base md:text-lg">
                                {item.answer}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const FAQ = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Header Section */}
            <section className="pt-40 pb-20 bg-primary relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
                </div>

                <div className="container px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2.5 px-6 py-2 bg-white/5 border border-white/10 rounded-full mb-8"
                        >
                            <HelpCircle size={14} className="text-secondary" />
                            <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Partner Support Center</span>
                        </motion.div>
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter uppercase leading-[0.9]">
                            Frequently Asked <br />
                            <span className="text-secondary italic">Questions</span>
                        </h1>
                        <p className="text-white/60 font-medium text-lg md:text-xl max-w-2xl mx-auto">
                            Everything you need to know about our global export operations, logistics, and quality standards.
                        </p>
                    </div>
                </div>
            </section>

            {/* Accordion Section */}
            <section className="py-24 relative">
                <div className="container px-6">
                    <div className="max-w-4xl mx-auto bg-white rounded-[3rem] border border-slate-100 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.05)] overflow-hidden">
                        {faqData.map((item, index) => (
                            <FAQItem key={index} item={item} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Still have questions? Section */}
            <section className="pb-24">
                <div className="container px-6">
                    <div className="max-w-4xl mx-auto text-center bg-slate-50 rounded-[3rem] p-12 md:p-16 border border-slate-100">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm mx-auto mb-8 border border-slate-100">
                            <Sparkles size={24} />
                        </div>
                        <h2 className="text-3xl font-black text-primary mb-6 uppercase tracking-tight">Still have a question?</h2>
                        <p className="text-slate-500 font-medium mb-12 max-w-md mx-auto">
                            If you couldn't find the answer you're looking for, please connect with our support team.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <motion.a
                                href="https://wa.me/919952777973"
                                whileHover={{ y: -5 }}
                                className="p-6 bg-white border border-slate-100 rounded-2xl flex items-center gap-5 group hover:border-[#25D366]/30 transition-all text-left shadow-sm"
                            >
                                <div className="w-12 h-12 bg-[#25D366]/10 rounded-xl flex items-center justify-center text-[#25D366]">
                                    <MessageCircle size={20} />
                                </div>
                                <div>
                                    <h4 className="font-black text-primary text-xs uppercase tracking-widest mb-1">WhatsApp Chat</h4>
                                    <p className="text-[11px] text-slate-400 font-bold">Instant Support Available</p>
                                </div>
                            </motion.a>

                            <motion.a
                                href="mailto:Dhuruvanexports@gmail.com"
                                whileHover={{ y: -5 }}
                                className="p-6 bg-white border border-slate-100 rounded-2xl flex items-center gap-5 group hover:border-primary/30 transition-all text-left shadow-sm"
                            >
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <h4 className="font-black text-primary text-xs uppercase tracking-widest mb-1">Email Inquiry</h4>
                                    <p className="text-[11px] text-slate-400 font-bold">Responds within 12 hours</p>
                                </div>
                            </motion.a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FAQ;
