import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Package, Truck, ShieldCheck, Search, Zap, Globe, Layout, Compass,
    CheckCircle2, ArrowRight, BarChart3, Phone, Clock, ChevronLeft,
    ChevronRight, Calendar, Check, X, User, Mail
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { collection, onSnapshot, query, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import GlobalInquiryButtons from './GlobalInquiryButtons';

const IconMap = {
    Package: <Package className="w-8 h-8" />,
    Truck: <Truck className="w-8 h-8" />,
    ShieldCheck: <ShieldCheck className="w-8 h-8" />,
    Globe: <Globe className="w-8 h-8" />,
    Zap: <Zap className="w-8 h-8" />,
    Search: <Search className="w-8 h-8" />,
    Layout: <Layout className="w-8 h-8" />,
    Compass: <Compass className="w-8 h-8" />,
    BarChart3: <BarChart3 className="w-8 h-8" />
};

const staticServices = [
    {
        icon: 'Layout',
        title: "Private Label Packaging",
        desc: "Complete end-to-end solutions from design to retail-ready packaging. We help brands launch their own lines with premium Indian products.",
        features: ["Custom Label Design", "Multiple Packaging Formats", "Barcoding & Compliance", "Mono Cartons & Pouches"],
        color: "bg-blue-500",
        dark: true
    },
    {
        icon: 'Truck',
        title: "Global Logistics",
        desc: "Multimodal transport solutions ensuring your cargo reaches any port worldwide with precision and safety.",
        features: ["Ocean & Air Freight", "Customs Clearance", "Door-to-Door Delivery", "Real-time Tracking"],
        color: "bg-secondary",
        dark: false
    },
    {
        icon: 'ShieldCheck',
        title: "Quality Assurance",
        desc: "Rigorous multi-stage inspection process to ensure every shipment exceeds international quality standards.",
        features: ["ISO Compliance", "Batch Testing", "SGS/Intertek Inspection", "Pure Origin Certification"],
        color: "bg-primary",
        dark: true
    },
    {
        icon: 'Globe',
        title: "Sourcing & Procurement",
        desc: "Vast network across India to source the finest agro commodities and handicrafts directly from the source.",
        features: ["Direct Farm Sourcing", "Artisan Partnerships", "Competitive Pricing", "Market Intelligence"],
        color: "bg-emerald-500",
        dark: true
    }
];

const TIME_SLOTS = ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM'];

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

// ─── Booking Widget ─────────────────────────────────────────────────
const BookingWidget = () => {
    const today = new Date();
    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth());
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [step, setStep] = useState('calendar'); // calendar | time | form | done
    const [form, setForm] = useState({ name: '', email: '', note: '' });
    const [saving, setSaving] = useState(false);

    const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    // offset so Monday is col 0
    const startOffset = (firstDay + 6) % 7;

    const prevMonth = () => {
        if (month === 0) { setMonth(11); setYear(y => y - 1); }
        else setMonth(m => m - 1);
        setSelectedDate(null); setSelectedTime(null); setStep('calendar');
    };
    const nextMonth = () => {
        if (month === 11) { setMonth(0); setYear(y => y + 1); }
        else setMonth(m => m + 1);
        setSelectedDate(null); setSelectedTime(null); setStep('calendar');
    };

    const isAvailable = (d) => {
        const date = new Date(year, month, d);
        const day = date.getDay();
        const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
        return day !== 0 && !isPast; // no Sundays, no past
    };

    const handleDateClick = (d) => {
        if (!isAvailable(d)) return;
        setSelectedDate(d);
        setSelectedTime(null);
        setStep('time');
    };

    const handleTimeClick = (t) => {
        setSelectedTime(t);
        setStep('form');
    };

    const handleSubmit = async () => {
        if (!form.name || !form.email) return;
        setSaving(true);
        try {
            await addDoc(collection(db, 'appointments'), {
                name: form.name,
                email: form.email,
                note: form.note,
                date: `${MONTHS[month]} ${selectedDate}, ${year}`,
                time: selectedTime,
                createdAt: serverTimestamp()
            });
            setStep('done');
        } catch (e) { alert('Error: ' + e.message); }
        setSaving(false);
    };

    const reset = () => {
        setSelectedDate(null); setSelectedTime(null);
        setForm({ name: '', email: '', note: '' });
        setStep('calendar');
    };

    // Build calendar grid
    const cells = [];
    for (let i = 0; i < startOffset; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);

    return (
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-primary/10 border border-slate-100 overflow-hidden flex flex-col lg:flex-row">

            {/* ── Left Panel ── */}
            <div className="lg:w-72 shrink-0 bg-slate-50 border-b lg:border-b-0 lg:border-r border-slate-100 p-8 flex flex-col gap-6">
                <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">Dhuruvan Exports</p>
                    <h3 className="text-2xl font-black text-primary leading-tight">Schedule a<br /><span className="text-secondary italic">Discovery Call</span></h3>
                </div>

                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2.5 text-slate-500">
                        <div className="w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0">
                            <Clock size={13} className="text-slate-400" />
                        </div>
                        <span className="text-sm font-bold">30 min</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-slate-500">
                        <div className="w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0">
                            <Phone size={13} className="text-slate-400" />
                        </div>
                        <span className="text-sm font-bold">Phone / Video Call</span>
                    </div>
                </div>

                <p className="text-sm text-slate-400 font-medium leading-relaxed">
                    Connect with our trade specialists to discuss sourcing, packaging, logistics, and export planning tailored to your business.
                </p>

                {selectedDate && (
                    <div className="mt-auto p-4 bg-secondary/5 border border-secondary/20 rounded-2xl">
                        <p className="text-[10px] font-black text-secondary uppercase tracking-widest mb-1">Selected</p>
                        <p className="text-sm font-black text-primary">{MONTHS[month]} {selectedDate}, {year}</p>
                        {selectedTime && <p className="text-sm font-bold text-slate-500 mt-0.5">{selectedTime}</p>}
                    </div>
                )}
            </div>

            {/* ── Right Panel ── */}
            <div className="flex-1 p-6 md:p-10">
                <AnimatePresence mode="wait">

                    {/* Calendar */}
                    {step === 'calendar' && (
                        <motion.div key="cal" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <div className="flex items-center justify-between mb-8">
                                <button onClick={prevMonth} className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-secondary hover:text-secondary transition-all">
                                    <ChevronLeft size={18} />
                                </button>
                                <h4 className="font-black text-slate-900 text-lg">{MONTHS[month]} {year}</h4>
                                <button onClick={nextMonth} className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center bg-primary text-white hover:bg-secondary transition-all">
                                    <ChevronRight size={18} />
                                </button>
                            </div>

                            <div className="grid grid-cols-7 gap-1 mb-2">
                                {DAYS.map(d => (
                                    <div key={d} className="text-center text-[10px] font-black text-slate-400 uppercase py-1">{d}</div>
                                ))}
                            </div>

                            <div className="grid grid-cols-7 gap-1.5">
                                {cells.map((d, i) => (
                                    <div key={i}>
                                        {d ? (
                                            <button
                                                onClick={() => handleDateClick(d)}
                                                disabled={!isAvailable(d)}
                                                className={`w-full aspect-square rounded-full text-sm font-black transition-all duration-200 
                                                    ${d === selectedDate ? 'bg-primary text-white shadow-lg' :
                                                        isAvailable(d) ? 'bg-blue-50 text-primary hover:bg-primary hover:text-white hover:shadow-md' :
                                                            'text-slate-200 cursor-not-allowed'}`}
                                            >
                                                {d}
                                            </button>
                                        ) : <div />}
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 pt-6 border-t border-slate-100">
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Time Zone</p>
                                <div className="flex items-center gap-2 text-slate-600">
                                    <Globe size={14} className="text-slate-400" />
                                    <span className="text-sm font-bold">India Standard Time (IST)</span>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Time Slots */}
                    {step === 'time' && (
                        <motion.div key="time" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <div className="flex items-center gap-3 mb-8">
                                <button onClick={() => setStep('calendar')} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-primary hover:text-primary transition-all">
                                    <ChevronLeft size={16} />
                                </button>
                                <div>
                                    <h4 className="font-black text-slate-900">{MONTHS[month]} {selectedDate}, {year}</h4>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Select a time slot</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {TIME_SLOTS.map(t => (
                                    <button
                                        key={t}
                                        onClick={() => handleTimeClick(t)}
                                        className="py-3 px-4 rounded-xl border border-slate-200 text-sm font-black text-primary hover:border-primary hover:bg-primary hover:text-white transition-all duration-200 text-center"
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Details Form */}
                    {step === 'form' && (
                        <motion.div key="form" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <div className="flex items-center gap-3 mb-8">
                                <button onClick={() => setStep('time')} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-primary hover:text-primary transition-all">
                                    <ChevronLeft size={16} />
                                </button>
                                <div>
                                    <h4 className="font-black text-slate-900">Enter Your Details</h4>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{MONTHS[month]} {selectedDate} · {selectedTime}</p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <div>
                                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Your Name *</label>
                                    <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden focus-within:border-primary transition-all">
                                        <div className="px-3 py-3 bg-slate-50 border-r border-slate-200"><User size={14} className="text-slate-400" /></div>
                                        <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                                            placeholder="John Smith" className="flex-1 px-4 py-3 text-sm font-bold outline-none bg-white" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Email Address *</label>
                                    <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden focus-within:border-primary transition-all">
                                        <div className="px-3 py-3 bg-slate-50 border-r border-slate-200"><Mail size={14} className="text-slate-400" /></div>
                                        <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                                            type="email" placeholder="john@company.com" className="flex-1 px-4 py-3 text-sm font-bold outline-none bg-white" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Additional Note</label>
                                    <textarea value={form.note} onChange={e => setForm({ ...form, note: e.target.value })}
                                        placeholder="What would you like to discuss?" rows={3}
                                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-primary transition-all resize-none" />
                                </div>

                                <button onClick={handleSubmit} disabled={saving || !form.name || !form.email}
                                    className="w-full py-4 bg-primary text-white font-black text-sm uppercase tracking-widest rounded-xl hover:bg-secondary transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
                                    {saving ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Booking...</> : <><Calendar size={16} /> Confirm Booking</>}
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* Success */}
                    {step === 'done' && (
                        <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-16 text-center gap-6">
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                                className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center">
                                <Check size={36} className="text-secondary" />
                            </motion.div>
                            <div>
                                <h4 className="text-2xl font-black text-primary mb-2">Booking Confirmed!</h4>
                                <p className="text-slate-500 font-medium">{MONTHS[month]} {selectedDate}, {year} · {selectedTime}</p>
                                <p className="text-sm text-slate-400 mt-2">A confirmation will be sent to <strong>{form.email}</strong></p>
                            </div>
                            <button onClick={reset} className="px-6 py-3 border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest text-slate-500 hover:border-primary hover:text-primary transition-all">
                                Schedule Another
                            </button>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
};

const ServicesPage = () => {
    const [services, setServices] = React.useState(staticServices);

    React.useEffect(() => {
        const q = query(collection(db, 'services'), orderBy('order', 'asc'));
        return onSnapshot(q, (snap) => {
            if (!snap.empty) {
                const fsServices = snap.docs.map(d => ({ docId: d.id, ...d.data(), isFirestore: true }));
                const merged = [...staticServices];
                fsServices.forEach(fsApp => {
                    const idx = merged.findIndex(s => s.title === fsApp.title);
                    if (idx !== -1) merged[idx] = fsApp;
                    else merged.push(fsApp);
                });
                setServices(merged);
            }
        });
    }, []);

    return (
        <div className="pt-24 min-h-screen bg-white">

            {/* Private Label Packaging - Deep Dive (Premium Split Layout) */}
            <section className="py-24 md:py-32 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/[0.03] rounded-full blur-3xl -z-10 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/[0.03] rounded-full blur-3xl -z-10 -translate-x-1/2" />

                <div className="container px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
                            <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 100 }}
                                className="relative rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-30px_rgba(0,43,88,0.25)] border-8 border-white bg-slate-50">
                                <img src="/private_label_packaging_display_1772193650032.png" alt="Private Label Packaging Range" className="w-full h-auto object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent pointer-events-none" />
                            </motion.div>
                            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -bottom-8 -right-8 bg-white p-6 rounded-[2rem] shadow-2xl border border-slate-50 hidden md:block">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary"><Package size={24} /></div>
                                    <div className="flex flex-col">
                                        <span className="text-xl font-black text-primary leading-none">100+</span>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Design Templates</span>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex flex-col items-start text-left">
                            <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 bg-slate-50 border border-slate-100 rounded-full">
                                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Retail Ready Solutions</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black text-primary mb-8 uppercase tracking-tighter leading-none">
                                Private Label <br /><span className="text-secondary italic">Packaging Hub</span>
                            </h2>
                            <p className="text-lg md:text-xl text-slate-500 leading-relaxed font-medium mb-10">
                                Empower your brand with our world-class packaging infrastructure. We provide <span className="text-primary font-bold italic underline decoration-secondary/30">End-to-End solutions</span> — from conceptual design to retail-ready physical products.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 w-full">
                                {[
                                    { title: "Custom Formats", desc: "Pillow Pouches & Mono Cartons" },
                                    { title: "Brand Identity", desc: "Global Logo & Label Design" },
                                    { title: "Compliance", desc: "Barcoding & Int'l Standards" },
                                    { title: "Material Science", desc: "PET Jars, Grinders & Boxes" }
                                ].map((item, idx) => (
                                    <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-secondary/20 transition-all">
                                        <h4 className="text-[11px] font-black uppercase text-primary tracking-widest mb-1">{item.title}</h4>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Grid Services */}
            <section className="py-24 bg-slate-50">
                <div className="container px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-black text-primary uppercase tracking-tighter mb-4">Core Trade Services</h2>
                        <div className="h-1.5 w-20 bg-secondary mx-auto" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services.map((svc, idx) => (
                            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }} viewport={{ once: true }}
                                className="p-10 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group flex flex-col h-full">
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110 group-hover:rotate-6 ${svc.color} text-white shadow-lg`}>
                                    {IconMap[svc.icon] || <Package className="w-8 h-8" />}
                                </div>
                                <h3 className="text-xl font-black text-primary uppercase tracking-tight mb-4 group-hover:text-secondary transition-colors">{svc.title}</h3>
                                <p className="text-slate-500 font-medium text-sm leading-relaxed mb-8 flex-grow">{svc.desc}</p>
                                <div className="space-y-3 pt-6 border-t border-slate-50">
                                    {svc.features.map((f, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                                            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{f}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Booking / Schedule Call Section ── */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-secondary/[0.03] rounded-full blur-[100px] pointer-events-none" />
                <div className="container px-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary/5 border border-secondary/20 rounded-full mb-5">
                            <Calendar size={12} className="text-secondary" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary">Book a Call</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tighter leading-tight">
                            Schedule Your <br /><span className="text-secondary italic">Discovery Call</span>
                        </h2>
                        <p className="text-slate-400 font-medium mt-4 max-w-xl mx-auto">Pick a date and time that works for you. Our trade specialists will call you to discuss your requirements.</p>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto">
                        <BookingWidget />
                    </motion.div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 bg-slate-50">
                <div className="container px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                            className="bg-primary rounded-[3rem] p-12 md:p-20 relative overflow-hidden text-white">
                            <div className="relative z-10">
                                <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter uppercase leading-[0.85]">
                                    Ready to Scale Your <br /><span className="text-secondary italic">Global Reach?</span>
                                </h2>
                                <p className="text-white/60 font-medium text-lg mb-12 max-w-2xl mx-auto">
                                    Our specialists are ready to handle your sourcing, logistics, and private labeling needs.
                                </p>
                                <GlobalInquiryButtons productTitle="Supply Chain / Sourcing Partnership" context="Services Page" className="max-w-2xl mx-auto" />
                            </div>
                            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServicesPage;
