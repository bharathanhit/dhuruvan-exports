import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Send, Users, Award, Briefcase, Clock, Calendar, Sparkles, ChevronDown } from 'lucide-react';
import flightImg from '../assets/flight.jpeg';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        industry: 'Importer / Buyer',
        destination: '',
        product: 'Premium Basmati Rice',
        logistics: 'Sea Freight (FCL/LCL)'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const subject = `New Inquiry from ${formData.name}`;
        const body = `Inquiry Details:\n\nName: ${formData.name}\nBusiness Status: ${formData.industry}\nDestination: ${formData.destination}\nProduct: ${formData.product}\nLogistics: ${formData.logistics}\n\nSent from Dhuruvan Exports Website`;

        window.location.href = `mailto:Dhuruvanexports@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    return (
        <section id="contact" className="py-12 md:py-16 bg-gradient-to-br from-[#F0F9FF] via-[#E1F1FF] to-[#EEF2FF] flex items-center justify-center relative overflow-hidden">
            <div className="container px-4 relative z-10">
                <div className="bg-white rounded-[2rem] overflow-hidden shadow-[0_30px_100px_-20px_rgba(0,0,0,0.08)] max-w-5xl mx-auto flex flex-col lg:flex-row relative min-h-[600px]">

                    {/* Left Column: Visual with Curve */}
                    <div className="lg:w-[45%] bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] relative overflow-hidden hidden lg:flex items-center justify-center p-12">
                        <motion.div
                            initial={{ x: -120, opacity: 0 }}
                            whileInView={{ x: 20, opacity: 1 }}
                            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                            className="relative z-30 scale-[1.25]"
                        >
                            <img
                                src={flightImg}
                                alt="Global Logistics"
                                className="w-full h-auto object-contain drop-shadow-[-40px_60px_90px_rgba(0,43,88,0.25)]"
                            />
                        </motion.div>

                        {/* The Large Curved Divider */}
                        <div className="absolute top-0 -right-[70px] h-full w-[140px] bg-white z-20 rounded-l-[100%] shadow-[-15px_0_30px_rgba(0,0,0,0.02)] border-l-[8px] border-[#2563EB]" />
                    </div>

                    {/* Right Column: Precise Form UI */}
                    <div className="flex-1 p-6 md:p-8 lg:p-12 flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* Top Badge */}
                            <div className="flex justify-start mb-8">
                                <div className="inline-flex items-center gap-2.5 px-6 py-2 bg-[#EEF2FF] border border-[#E0E7FF] rounded-full">
                                    <Sparkles size={14} className="text-[#3B82F6]" />
                                    <span className="text-[10px] font-black text-[#3B82F6] uppercase tracking-[0.2em]">Global Partner Opportunity</span>
                                </div>
                            </div>

                            <h3 className="text-4xl md:text-5xl font-black text-[#1E293B] mb-3 tracking-tight">
                                Get Your <span className="text-[#3B82F6]">Export Quote</span>
                            </h3>
                            <p className="text-slate-500 font-medium mb-10 text-base">
                                Reliable sourcing and global supply chain excellence.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Full Name Field */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                                    <div className="relative group">
                                        <Users size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#3B82F6] transition-colors" />
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="Ex: John Doe"
                                            className="w-full bg-[#F8FAFC] border border-[#F1F5F9] py-4 pl-14 pr-5 rounded-xl text-sm font-bold text-[#1E293B] outline-none focus:bg-white focus:border-[#3B82F6]/30 transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Business Status & Port Field */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Business Status</label>
                                        <div className="relative group">
                                            <Briefcase size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#3B82F6] transition-colors z-10" />
                                            <select
                                                value={formData.industry}
                                                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                                                className="w-full bg-[#F8FAFC] border border-[#F1F5F9] py-4 pl-14 pr-10 rounded-xl text-sm font-bold text-[#1E293B] outline-none focus:bg-white focus:border-[#3B82F6]/30 transition-all appearance-none cursor-pointer relative z-0"
                                            >
                                                <option>Importer / Buyer</option>
                                                <option>Wholesale Network</option>
                                                <option>Retail Chain</option>
                                            </select>
                                            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Destination Port</label>
                                        <div className="relative group">
                                            <MapPin size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#3B82F6] transition-colors" />
                                            <input
                                                type="text"
                                                required
                                                value={formData.destination}
                                                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                                                placeholder="City, Country"
                                                className="w-full bg-[#F8FAFC] border border-[#F1F5F9] py-4 pl-14 pr-5 rounded-xl text-sm font-bold text-[#1E293B] outline-none focus:bg-white focus:border-[#3B82F6]/30 transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Product Inquiry Field */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Primary Product Inquiry</label>
                                    <div className="relative group">
                                        <Award size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#3B82F6] transition-colors z-10" />
                                        <select
                                            value={formData.product}
                                            onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                                            className="w-full bg-[#F8FAFC] border border-[#F1F5F9] py-4 pl-14 pr-10 rounded-xl text-sm font-bold text-[#1E293B] outline-none focus:bg-white focus:border-[#3B82F6]/30 transition-all appearance-none cursor-pointer relative z-0"
                                        >
                                            <option>Premium Basmati Rice</option>
                                            <option>Halal Certified Commodities</option>
                                            <option>Sustainable Textiles</option>
                                            <option>Handcrafted Woodwork</option>
                                        </select>
                                        <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                    </div>
                                </div>


                                {/* Submit Button Styled as WhatsApp */}
                                <motion.button
                                    whileHover={{ scale: 1.02, boxShadow: "0 20px 40px -10px rgba(37,99,235,0.3)" }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="w-full bg-[#2563EB] text-white py-5 px-8 rounded-2xl font-black text-[12px] uppercase tracking-[0.2em] flex items-center justify-center gap-4 shadow-xl transition-all mt-8"
                                >
                                    <Send size={18} />
                                    Request Quote Via WhatsApp
                                </motion.button>

                                {/* Footer Note */}
                                <div className="flex items-center justify-center gap-2 mt-6 text-slate-400 text-[9px] font-black uppercase tracking-widest">
                                    <Calendar size={12} />
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
