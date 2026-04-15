import { motion } from 'framer-motion';
import { CreditCard, ShieldCheck, Globe, Scale, Clock, Briefcase, CheckCircle2, DollarSign, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const PaymentTerms = () => {
    useEffect(() => {
        document.title = "Payment Terms | Secure Global Trade Finance | Dhuruvan Exports";
    }, []);
    const paymentMethods = [
        {
            title: "100% Irrevocable & Confirmed L/C",
            desc: "The most secure method for international trade, providing total protection for both buyer and seller.",
            icon: ShieldCheck
        },
        {
            title: "50% Advance & 50% L/C",
            desc: "A balanced structure often used for tailored high-volume orders.",
            icon: Scale
        },
        {
            title: "100% Advance Payment",
            desc: "The fastest processing route, ideal for urgent shipments and establishing trust.",
            icon: DollarSign
        },

        {
            title: "50 % advance , 50% BL SCAN COPY BEFORE SHIPMENT",
            desc: "A streamlined process for recurring global trade partners.",
            icon: Globe
        }
    ];

    return (
        <div className="pt-52 pb-24 bg-slate-50 min-h-screen selection:bg-secondary selection:text-white">
            <div className="container max-w-5xl px-6">
                <motion.div
                    initial={{ opacity: 0, y: -20 }} // Updated animation
                    animate={{ opacity: 1, y: 0 }} // Updated animation
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex justify-end mb-12">
                        <Link
                            to="/#"
                            className="inline-flex items-center gap-2 text-slate-500 bg-white shadow-sm hover:bg-secondary hover:text-white px-4 py-2 rounded-xl text-[10px] font-black transition-all group tracking-[0.2em] uppercase border border-slate-100"
                        >
                            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                            Back to Home
                        </Link>
                    </div>
                </motion.div>

                {/* Hero Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-24"
                >
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/5 text-primary mb-10 border border-primary/10">
                        <CreditCard size={16} className="text-secondary" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Financial Protocols</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-primary mb-8 tracking-tighter leading-none uppercase">
                        Payment <span className="text-secondary italic">Terms.</span>
                    </h1>
                    <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto leading-relaxed">
                        Secure, transparent, and internationally recognized payment structures to facilitate seamless global trade operations.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 gap-8 mb-24">
                    {paymentMethods.map((method, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col md:flex-row items-center gap-10 hover:shadow-[0_40px_80px_rgba(0,43,88,0.08)] transition-all group"
                        >
                            <div className="w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shrink-0">
                                <method.icon size={32} />
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h2 className="text-2xl font-black text-primary mb-3 tracking-tight uppercase">{method.title}</h2>
                                <p className="text-slate-500 font-medium leading-relaxed">{method.desc}</p>
                            </div>
                            <div className="flex items-center gap-2 text-secondary font-black text-[10px] uppercase tracking-widest shrink-0">
                                <CheckCircle2 size={16} /> Approved Method
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Important Notes */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-primary p-12 md:p-16 rounded-[4rem] text-white overflow-hidden relative"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                    <div className="relative z-10 max-w-3xl">
                        <h3 className="text-3xl font-black mb-10 tracking-tight uppercase">Operational Guidelines</h3>

                        <div className="space-y-8">
                            <div className="flex gap-6">
                                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                                    <Clock size={20} className="text-secondary" />
                                </div>
                                <div>
                                    <h4 className="text-xs font-black uppercase tracking-widest text-secondary mb-2">Processing Time</h4>
                                    <p className="text-white/60 font-medium leading-relaxed">International bank transfers (T/T) typically reflect within 3-5 business days. Order processing begins immediately upon confirmation of the initial deposit.</p>
                                </div>
                            </div>

                            <div className="flex gap-6">
                                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                                    <ShieldCheck size={20} className="text-secondary" />
                                </div>
                                <div>
                                    <h4 className="text-xs font-black uppercase tracking-widest text-secondary mb-2">Security Standard</h4>
                                    <p className="text-white/60 font-medium leading-relaxed">All transactions are managed through Tier-1 banking channels in compliance with RBI (Reserve Bank of India) and international anti-money laundering regulations.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

export default PaymentTerms;
