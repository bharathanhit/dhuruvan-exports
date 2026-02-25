import { motion } from 'framer-motion';
import { Shield, Eye, Lock, Database, Search, UserCheck } from 'lucide-react';

const PrivacyPolicy = () => {
    return (
        <div className="pt-40 pb-24 bg-slate-50 min-h-screen selection:bg-secondary selection:text-white">
            <div className="container max-w-4xl px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-24"
                >
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary/10 text-secondary mb-10 border border-secondary/20">
                        <Lock size={16} />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Data Safeguard</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-primary mb-8 tracking-tighter leading-none">
                        Privacy <span className="text-secondary italic">Control.</span>
                    </h1>
                    <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto leading-relaxed">
                        Your business intelligence is paramount. At Dhuruvan Exports, we implement enterprise-grade security protocols to protect our global trade partners.
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
                        <div className="flex items-center gap-5 mb-8 text-secondary">
                            <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center">
                                <Database size={28} />
                            </div>
                            <h2 className="text-3xl font-black text-primary tracking-tight">1. Information Architecture</h2>
                        </div>
                        <div className="space-y-6 text-slate-500 font-medium leading-relaxed text-lg">
                            <p>To facilitate worldwide distribution, we manage business-critical data including:</p>
                            <ul className="space-y-4">
                                {[
                                    'Regulatory business identifiers and Export-Import licenses.',
                                    'Certified corporate representatives and secure communications.',
                                    'International port logistics and maritime preferences.',
                                    'Sourcing history for agro-commodities and specialized crafts.'
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-4">
                                        <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* Section 2 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white p-12 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-slate-100 transition-all hover:shadow-[0_40px_80px_rgba(0,43,88,0.08)]"
                    >
                        <div className="flex items-center gap-5 mb-8 text-secondary">
                            <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center">
                                <Search size={28} />
                            </div>
                            <h2 className="text-3xl font-black text-primary tracking-tight">2. Strategic Utilization</h2>
                        </div>
                        <div className="space-y-6 text-slate-500 font-medium leading-relaxed text-lg">
                            <p>All data points are utilized exclusively for operational excellence:</p>
                            <ul className="space-y-4">
                                {[
                                    'Generating high-precision export quotes and proforma invoices.',
                                    'Orchestrating maritime and air freight logistics pipelines.',
                                    'Compliance with international banking and T/T regulations.',
                                    'Digital filing for government-mandated export certifications.'
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-4">
                                        <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* Section 3 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white p-12 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-slate-100 transition-all hover:shadow-[0_40px_80px_rgba(0,43,88,0.08)]"
                    >
                        <div className="flex items-center gap-5 mb-8 text-secondary">
                            <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center">
                                <Eye size={28} />
                            </div>
                            <h2 className="text-3xl font-black text-primary tracking-tight">3. Global Integrity</h2>
                        </div>
                        <p className="text-slate-500 font-medium text-lg leading-relaxed">
                            We do not monetize business data. We only facilitate the transfer of necessary details to authorized entities in the export lifecycle, including Tier-1 shipping lines, global inspection agencies (SGS), and banking institutions.
                        </p>
                    </motion.div>

                    {/* Section 4 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white p-12 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-slate-100 transition-all hover:shadow-[0_40px_80px_rgba(0,43,88,0.08)]"
                    >
                        <div className="flex items-center gap-5 mb-8 text-secondary">
                            <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center">
                                <Shield size={28} />
                            </div>
                            <h2 className="text-3xl font-black text-primary tracking-tight">4. Fortified Security</h2>
                        </div>
                        <p className="text-slate-500 font-medium text-lg leading-relaxed">
                            Our secure trade pathways ensure that sensitive pricing structures and proprietary wood-craft designs remain confidential. We utilize high-grade encryption for all digital documentation.
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mt-32 text-center p-16 bg-primary rounded-[4rem] text-white shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <h3 className="text-3xl md:text-4xl font-black mb-6 tracking-tighter">Compliance Inquiry</h3>
                    <p className="font-medium text-white/60 mb-12 text-lg max-w-xl mx-auto">
                        Dhuruvan Exports is committed to ethical data management across all global borders.
                    </p>
                    <a href="mailto:privacy@dhuruvanexports.com" className="btn bg-secondary text-white hover:bg-secondary/90 px-12 py-5 text-sm uppercase tracking-[0.2em]">
                        Contact Privacy Officer
                    </a>
                </motion.div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
