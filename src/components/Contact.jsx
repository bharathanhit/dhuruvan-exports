import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Send, Users, Award, Briefcase, Clock, Calendar, Sparkles, ChevronDown } from 'lucide-react';
import flightImg from '../assets/flight.jpeg';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        industry: 'Importer / Buyer',
        destination: '',
        product: 'Premium Basmati Rice'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const subject = `New Inquiry from ${formData.name}`;
        const body = `Inquiry Details:\n\nName: ${formData.name}\nIndustry: ${formData.industry}\nDestination: ${formData.destination}\nProduct: ${formData.product}\n\nSent from Dhuruvan Exports Website`;

        window.location.href = `mailto:Dhuruvanexports@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    return (
        <section id="contact" className="py-24 md:py-32 bg-slate-50 flex items-center justify-center border-t border-slate-100 overflow-hidden relative">
            {/* Background Flair */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary/[0.03] rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />

            <div className="container px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 bg-white m-2 rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,43,88,0.1)] border border-slate-100 max-w-6xl mx-auto">
                    {/* Left Side: Cargo Visual */}
                    <div className="relative min-h-[400px] lg:min-h-[600px] bg-slate-50 overflow-hidden group">
                        <motion.img
                            initial={{ x: -60, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            src={flightImg}
                            alt="Global Cargo Logistics"
                            className="absolute top-1/2 left-[45%] -translate-x-1/2 -translate-y-1/2 w-[90%] z-20 drop-shadow-[0_40px_80px_rgba(0,43,88,0.2)] pointer-events-none rotate-[-4deg] transition-transform duration-[2s] group-hover:scale-105"
                        />

                        {/* Architectural Mask */}
                        <div className="absolute top-1/2 left-[85%] -translate-y-1/2 w-[150%] h-[200%] bg-white rounded-full z-10 shadow-[-30px_0_80px_rgba(0,0,0,0.03)] border-l-[12px] border-primary hidden lg:block" />

                        {/* Status Tags */}
                        <div className="absolute bottom-10 left-10 z-30 hidden md:flex flex-col gap-3">
                            <div className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-white flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                                <span className="text-[10px] font-black text-primary uppercase tracking-widest">Global Ports Active</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Inquiry Form */}
                    <div className="p-8 md:p-12 lg:p-16 relative bg-white">
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="w-full"
                        >
                            <div className="flex justify-start mb-6">
                                <div className="inline-flex items-center gap-3 px-5 py-2 bg-secondary/10 border border-secondary/20 rounded-full text-secondary text-[10px] font-black uppercase tracking-[0.3em]">
                                    <Sparkles size={12} />
                                    <span>Export Opportunity</span>
                                </div>
                            </div>

                            <h3 className="text-4xl md:text-5xl font-black text-primary mb-4 tracking-tighter leading-[0.95] uppercase">
                                Request a <br /> <span className="text-secondary italic">Global Quote.</span>
                            </h3>
                            <p className="text-slate-500 font-medium mb-12 text-lg">
                                Scalable supply chains start with a single inquiry.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] ml-1">Company Representative</label>
                                    <div className="relative group">
                                        <Users size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-secondary transition-colors" />
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="Your Full Name"
                                            className="w-full bg-slate-50 border border-slate-100 py-4.5 pl-14 pr-5 rounded-2xl text-sm font-bold text-primary outline-none focus:bg-white focus:border-secondary focus:ring-4 focus:ring-secondary/5 transition-all shadow-sm"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] ml-1">Industry Sector</label>
                                        <div className="relative group">
                                            <Briefcase size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-secondary transition-colors z-10" />
                                            <select
                                                value={formData.industry}
                                                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                                                className="w-full bg-slate-50 border border-slate-100 py-4.5 pl-14 pr-10 rounded-2xl text-sm font-bold text-primary outline-none focus:bg-white focus:border-secondary transition-all appearance-none cursor-pointer relative z-0 shadow-sm"
                                            >
                                                <option>Importer / Buyer</option>
                                                <option>Wholesale Network</option>
                                                <option>Retail Chain</option>
                                                <option>Logistics Partner</option>
                                            </select>
                                            <ChevronDown size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] ml-1">Destination Port</label>
                                        <div className="relative group">
                                            <MapPin size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-secondary transition-colors" />
                                            <input
                                                type="text"
                                                required
                                                value={formData.destination}
                                                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                                                placeholder="City, Region"
                                                className="w-full bg-slate-50 border border-slate-100 py-4.5 pl-14 pr-5 rounded-2xl text-sm font-bold text-primary outline-none focus:bg-white focus:border-secondary transition-all shadow-sm"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] ml-1">Primary Product Inquiry</label>
                                    <div className="relative group">
                                        <Award size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-secondary transition-colors z-10" />
                                        <select
                                            value={formData.product}
                                            onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-100 py-4.5 pl-14 pr-10 rounded-2xl text-sm font-bold text-primary outline-none focus:bg-white focus:border-secondary transition-all appearance-none cursor-pointer relative z-0 shadow-sm"
                                        >
                                            <option>Premium Basmati Rice</option>
                                            <option>Halal Certified Commodities</option>
                                            <option>Sustainable Textiles</option>
                                            <option>Handcrafted Woodwork</option>
                                            <option>Bulk Agro Logistics</option>
                                        </select>
                                        <ChevronDown size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-primary hover:bg-secondary text-white py-6 px-8 rounded-2xl font-black text-[13px] uppercase tracking-[0.2em] flex items-center justify-center gap-4 shadow-2xl transition-all hover:-translate-y-1 active:scale-[0.98] mt-10 group"
                                >
                                    <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    Send Inquiry
                                </button>

                                <div className="flex items-center gap-3 mt-8 pt-6 border-t border-slate-50 text-slate-300 text-[10px] font-black uppercase tracking-[0.25em]">
                                    <Clock size={14} className="text-secondary" />
                                    <span>SLA: 120 Minute Rapid Response</span>
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
