import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Lock, Database, Search, UserCheck } from 'lucide-react';

const PrivacyPolicy = () => {
    return (
        <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
            <div className="container max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-600/10 text-green-600 mb-6 border border-green-100">
                        <Lock size={16} />
                        <span className="text-xs font-black uppercase tracking-[0.2em]">Data Privacy</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
                        Privacy <span className="text-green-600 italic">Policy.</span>
                    </h1>
                    <p className="text-slate-500 font-bold max-w-2xl mx-auto">
                        Your business data and privacy are paramount. At Dhuruvan Exports, we uphold the highest standards of data security for our global importers and partners.
                    </p>
                </motion.div>

                <div className="space-y-12">
                    {/* Section 1 */}
                    <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 transition-all hover:shadow-md">
                        <div className="flex items-center gap-4 mb-6 text-green-600">
                            <Database size={28} />
                            <h2 className="text-2xl font-black text-slate-900">1. Information We Collect</h2>
                        </div>
                        <div className="space-y-4 text-slate-600 font-semibold leading-relaxed">
                            <p>To facilitate global trade, we collect business-related information including:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Registered business details and VAT/Import-Export licenses.</li>
                                <li>Authorized contact persons and their corporate email addresses.</li>
                                <li>Shipping addresses and port logistics preferences.</li>
                                <li>Inquiry history for specific agro or textile products.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Section 2 */}
                    <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 transition-all hover:shadow-md">
                        <div className="flex items-center gap-4 mb-6 text-green-600">
                            <Search size={28} />
                            <h2 className="text-2xl font-black text-slate-900">2. How We Use Data</h2>
                        </div>
                        <div className="space-y-4 text-slate-600 font-semibold leading-relaxed">
                            <p>Collected information is used exclusively for:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Generating accurate export quotes and proforma invoices.</li>
                                <li>Coordinating with maritime and air freight logistics providers.</li>
                                <li>Complying with mandatory bank reporting for international T/T or L/C transfers.</li>
                                <li>Government regulatory filings for export documentation.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Section 3 */}
                    <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 transition-all hover:shadow-md">
                        <div className="flex items-center gap-4 mb-6 text-green-600">
                            <Eye size={28} />
                            <h2 className="text-2xl font-black text-slate-900">3. Data Sharing & Third Parties</h2>
                        </div>
                        <div className="space-y-4 text-slate-600 font-semibold leading-relaxed">
                            <p>We do not sell business data. We only share necessary details with authorized entities involved in the export cycle: shipping lines, inspection agencies (e.g., SGS), customs clearing agents, and banking institutions.</p>
                        </div>
                    </div>

                    {/* Section 4 */}
                    <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 transition-all hover:shadow-md">
                        <div className="flex items-center gap-4 mb-6 text-green-600">
                            <Shield size={28} />
                            <h2 className="text-2xl font-black text-slate-900">4. Security Measures</h2>
                        </div>
                        <div className="space-y-4 text-slate-600 font-semibold leading-relaxed">
                            <p>Our secure communication channels ensure that sensitive trade documents and pricing structures remain confidential. We use encryption for digital document transmission and follow strict physical record-keeping protocols.</p>
                        </div>
                    </div>

                    {/* Section 5 */}
                    <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 transition-all hover:shadow-md">
                        <div className="flex items-center gap-4 mb-6 text-green-600">
                            <UserCheck size={28} />
                            <h2 className="text-2xl font-black text-slate-900">5. Your Data Rights</h2>
                        </div>
                        <div className="space-y-4 text-slate-600 font-semibold leading-relaxed">
                            <p>Global partners have the right to request access to, correction of, or deletion of their business records in our system, provided it does not conflict with legal record-keeping requirements for export trade.</p>
                        </div>
                    </div>
                </div>

                <div className="mt-20 text-center p-12 bg-slate-900 rounded-[3rem] text-white">
                    <h3 className="text-2xl font-black mb-4">Privacy Concerns?</h3>
                    <p className="font-bold opacity-60 mb-8">Dhuruvan Exports is committed to ethical data management practices across all borders.</p>
                    <a href="mailto:privacy@dhuruvanexports.com" className="inline-block bg-green-600 text-white px-10 py-4 rounded-full font-black uppercase text-xs tracking-widest hover:bg-green-700 transition-colors">
                        Contact Data Protection Officer
                    </a>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
