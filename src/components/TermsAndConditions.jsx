import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Shield, Globe, Scale, Clock, AlertCircle } from 'lucide-react';

const TermsAndConditions = () => {
    return (
        <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
            <div className="container max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 text-blue-600 mb-6 border border-blue-100">
                        <FileText size={16} />
                        <span className="text-xs font-black uppercase tracking-[0.2em]">Legal Framework</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
                        Terms & <span className="text-blue-600 italic">Conditions.</span>
                    </h1>
                    <p className="text-slate-500 font-bold max-w-2xl mx-auto">
                        Last Updated: February 2026. These terms govern the export operations and global trade agreements facilitated by Dhuruvan Exports.
                    </p>
                </motion.div>

                <div className="space-y-12">
                    {/* Section 1 */}
                    <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
                        <div className="flex items-center gap-4 mb-6 text-blue-600">
                            <Globe size={28} />
                            <h2 className="text-2xl font-black text-slate-900">1. Global Trade Compliance</h2>
                        </div>
                        <div className="space-y-4 text-slate-600 font-semibold leading-relaxed">
                            <p>All export transactions are subject to the laws and regulations of the Republic of India and the destination country's import laws.</p>
                            <p>Dhuruvan Exports ensures compliance with INCOTERMS 2020. Unless otherwise agreed in writing, all prices quoted are on an FOB (Free On Board) basis.</p>
                        </div>
                    </div>

                    {/* Section 2 */}
                    <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
                        <div className="flex items-center gap-4 mb-6 text-blue-600">
                            <Shield size={28} />
                            <h2 className="text-2xl font-black text-slate-900">2. Quality Assurance & Inspection</h2>
                        </div>
                        <div className="space-y-4 text-slate-600 font-semibold leading-relaxed">
                            <p>We guarantee that all products meet the quality specifications provided in the formal proforma invoice. Third-party inspections (SGS, Intertek, etc.) are welcome and should be arranged prior to shipment.</p>
                            <p>Any claims regarding quality or quantity must be filed within 10 business days of the shipment's arrival at the destination port.</p>
                        </div>
                    </div>

                    {/* Section 3 */}
                    <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
                        <div className="flex items-center gap-4 mb-6 text-blue-600">
                            <Scale size={28} />
                            <h2 className="text-2xl font-black text-slate-900">3. Payment Terms</h2>
                        </div>
                        <div className="space-y-4 text-slate-600 font-semibold leading-relaxed">
                            <p>Standard payment terms for international orders are: 30% Advance T/T (Telegraphic Transfer) and 70% against Scanned Bill of Lading (B/L) or Irrevocable Confirmed Letter of Credit (L/C) at sight.</p>
                        </div>
                    </div>

                    {/* Section 4 */}
                    <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
                        <div className="flex items-center gap-4 mb-6 text-blue-600">
                            <Clock size={28} />
                            <h2 className="text-2xl font-black text-slate-900">4. Delivery & Lead Times</h2>
                        </div>
                        <div className="space-y-4 text-slate-600 font-semibold leading-relaxed">
                            <p>While we strive for precision in delivery times, estimated lead times are subject to shipping availability, seasonal crop cycles (for agro products), and unforeseen maritime logistics delays (Force Majeure).</p>
                        </div>
                    </div>

                    {/* Section 5 */}
                    <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
                        <div className="flex items-center gap-4 mb-6 text-blue-600">
                            <AlertCircle size={28} />
                            <h2 className="text-2xl font-black text-slate-900">5. Dispute Resolution</h2>
                        </div>
                        <div className="space-y-4 text-slate-600 font-semibold leading-relaxed">
                            <p>Any disputes arising out of trade agreements shall be settled through amicable negotiation. If a resolution cannot be reached, the dispute shall be referred to the jurisdiction of the courts in Tamil Nadu, India.</p>
                        </div>
                    </div>
                </div>

                <div className="mt-20 text-center p-12 bg-blue-600 rounded-[3rem] text-white">
                    <h3 className="text-2xl font-black mb-4">Questions about our terms?</h3>
                    <p className="font-bold opacity-80 mb-8">Our legal and logistics team is here to assist global partners.</p>
                    <a href="mailto:info@dhuruvanexports.com" className="inline-block bg-white text-blue-600 px-10 py-4 rounded-full font-black uppercase text-xs tracking-widest hover:scale-105 transition-transform">
                        Contact Legal Team
                    </a>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;
