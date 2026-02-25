import { motion } from 'framer-motion';
import { FileText, Shield, Globe, Scale, Clock, AlertCircle } from 'lucide-react';

const TermsAndConditions = () => {
    return (
        <div className="pt-40 pb-24 bg-slate-50 min-h-screen selection:bg-secondary selection:text-white">
            <div className="container max-w-4xl px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-24"
                >
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/5 text-primary mb-10 border border-primary/10">
                        <FileText size={16} className="text-secondary" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Legal Framework</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-primary mb-8 tracking-tighter leading-none">
                        Terms of <span className="text-secondary italic">Exchange.</span>
                    </h1>
                    <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto leading-relaxed">
                        Last Updated: February 2026. These protocols govern the international trade operations and logistics agreements managed by Dhuruvan Exports.
                    </p>
                </motion.div>

                <div className="space-y-16">
                    {/* Section 1 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white p-12 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-slate-100 transition-all hover:shadow-[0_40px_80px_rgba(0,43,88,0.08)]"
                    >
                        <div className="flex items-center gap-5 mb-8 text-primary">
                            <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-secondary">
                                <Globe size={28} />
                            </div>
                            <h2 className="text-3xl font-black text-primary tracking-tight">1. Global Trade Compliance</h2>
                        </div>
                        <div className="space-y-6 text-slate-500 font-medium leading-relaxed text-lg">
                            <p>All export operations are strictly governed by the Republic of India's foreign trade policies and the destination port's regulatory frameworks.</p>
                            <p>Dhuruvan Exports operates under INCOTERMS 2020 protocols. Unless explicitly documented, all baseline valuations are provided on an FOB (Free On Board) basis.</p>
                        </div>
                    </motion.div>

                    {/* Section 2 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white p-12 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-slate-100 transition-all hover:shadow-[0_40px_80px_rgba(0,43,88,0.08)]"
                    >
                        <div className="flex items-center gap-5 mb-8 text-primary">
                            <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-secondary">
                                <Shield size={28} />
                            </div>
                            <h2 className="text-3xl font-black text-primary tracking-tight">2. Quality Assurance Protocols</h2>
                        </div>
                        <div className="space-y-6 text-slate-500 font-medium leading-relaxed text-lg">
                            <p>We guarantee all commodities match the analytical specifications provided in the formal proforma. Multi-tier inspections (SGS, Intertek) are encouraged and facilitated prior to port dispatch.</p>
                            <p>Formal feedback regarding quality or quantity must be transmitted via secure channels within 10 business days of port arrival.</p>
                        </div>
                    </motion.div>

                    {/* Section 3 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white p-12 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-slate-100 transition-all hover:shadow-[0_40px_80px_rgba(0,43,88,0.08)]"
                    >
                        <div className="flex items-center gap-5 mb-8 text-primary">
                            <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-secondary">
                                <Scale size={28} />
                            </div>
                            <h2 className="text-3xl font-black text-primary tracking-tight">3. Strategic Payment Structures</h2>
                        </div>
                        <p className="text-slate-500 font-medium text-lg leading-relaxed">
                            Standard international settlement follows: 30% Initial T/T (Transfer) and 70% against verified Scanned Bill of Lading (B/L) or Irrevocable Confirmed Letter of Credit (L/C) at sight.
                        </p>
                    </motion.div>

                    {/* Section 4 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white p-12 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-slate-100 transition-all hover:shadow-[0_40px_80px_rgba(0,43,88,0.08)]"
                    >
                        <div className="flex items-center gap-5 mb-8 text-primary">
                            <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-secondary">
                                <Clock size={28} />
                            </div>
                            <h2 className="text-3xl font-black text-primary tracking-tight">4. Logistics & Lead Timelines</h2>
                        </div>
                        <p className="text-slate-500 font-medium text-lg leading-relaxed">
                            Lead times are calculated based on vessel availability and regional harvest cycles. Dhuruvan Exports maintains high-speed dispatch protocols but remains subject to global maritime Force Majeure.
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mt-32 text-center p-16 bg-primary rounded-[4rem] text-white shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                    <h3 className="text-3xl md:text-4xl font-black mb-6 tracking-tighter">Legal Inquiries</h3>
                    <p className="font-medium text-white/60 mb-12 text-lg max-w-xl mx-auto">
                        Our legal and logistics intelligence team is available for global partner consultation.
                    </p>
                    <a href="mailto:info@dhuruvanexports.com" className="btn bg-white text-primary hover:bg-slate-100 px-12 py-5 text-sm uppercase tracking-[0.2em]">
                        Consult Legal Team
                    </a>
                </motion.div>
            </div>
        </div>
    );
};

export default TermsAndConditions;
