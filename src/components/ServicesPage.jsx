import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Package, Truck, ShieldCheck, Search, Zap, Globe, Layout, Compass,
    CheckCircle2, ArrowRight, BarChart3, Phone, Clock, ChevronLeft,
    ChevronRight, Calendar, Check, X, User, Mail, MessageCircle
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
// ─── Booking Widget (Mobile Native Style) ───────────────────────────
const BookingWidget = () => {
    const today = new Date();
    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth());
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [step, setStep] = useState('landing'); // landing | calendar | time | form | done
    const [form, setForm] = useState({ name: '', email: '', phone: '', note: '' });
    const [saving, setSaving] = useState(false);

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startOffset = (firstDay + 6) % 7;

    const prevMonth = () => {
        if (month === 0) { setMonth(11); setYear(y => y - 1); }
        else setMonth(m => m - 1);
        setSelectedDate(null);
    };
    const nextMonth = () => {
        if (month === 11) { setMonth(0); setYear(y => y + 1); }
        else setMonth(m => m + 1);
        setSelectedDate(null);
    };

    const isAvailable = (d) => {
        const date = new Date(year, month, d);
        const day = date.getDay();
        const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
        return day !== 0 && !isPast;
    };

    const handleSubmit = async () => {
        if (!form.name || !form.email) return;
        setSaving(true);
        try {
            const dateStr = `${MONTHS[month]} ${selectedDate}, ${year}`;
            const appointmentData = {
                name: form.name,
                email: form.email,
                phone: form.phone,
                note: form.note,
                date: dateStr,
                time: selectedTime,
                createdAt: serverTimestamp()
            };

            // Save to appointments collection (Original)
            await addDoc(collection(db, 'appointments'), appointmentData);

            // Save to inquiries collection (For unified dashboard view)
            await addDoc(collection(db, 'inquiries'), {
                name: form.name,
                email: form.email,
                phone: form.phone,
                product: "Discovery Call",
                industry: `Scheduled: ${dateStr} @ ${selectedTime}`,
                destination: "Virtual (Consultation)",
                logistics: "N/A",
                contactMethod: 'call',
                createdAt: serverTimestamp(),
                status: 'new'
            });

            // Constructing the Message for WhatsApp
            const body = `🤝 *Dhuruvan Exports - Discovery Call Scheduled* 🤝\n\n🎯 *Confirmed:* ${dateStr} @ ${selectedTime}\n👤 *Client:* ${form.name}\n📱 *Phone:* ${form.phone}\n✉️ *Email:* ${form.email}\n📝 *Note:* ${form.note || "N/A"}\n\nPlease confirm our meeting invitation.`;

            // Auto-open WhatsApp
            window.open(`https://wa.me/919952777973?text=${encodeURIComponent(body)}`, '_blank');

            setStep('done');
        } catch (e) { alert('Error: ' + e.message); }
        setSaving(false);
    };

    const reset = () => {
        setSelectedDate(null); setSelectedTime(null);
        setForm({ name: '', email: '', phone: '', note: '' });
        setStep('calendar');
    };

    const cells = [];
    for (let i = 0; i < startOffset; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);

    return (
        <div className="relative mx-auto w-[260px] h-[520px] md:w-[300px] md:h-[600px] bg-slate-900 rounded-[2.5rem] p-2 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] border-[6px] border-slate-900 border-x-slate-800 relative z-20 overflow-hidden ring-1 ring-white/10">
            {/* Mobile Ear Speaker */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl z-40 flex items-end justify-center pb-1">
                <div className="w-10 h-1 bg-slate-800 rounded-full" />
            </div>

            {/* Mobile Screen */}
            <div className="w-full h-full bg-[#F8FAFC] rounded-[2.5rem] overflow-hidden flex flex-col relative">
                {/* Status Bar */}
                <div className="h-12 shrink-0 px-8 pt-4 flex items-center justify-between text-slate-400 z-30">
                    <span className="text-[10px] font-black">9:41</span>
                    <div className="flex items-center gap-1.5 opacity-60">
                        <Zap size={10} />
                        <div className="w-4 h-2 rounded-[2px] border border-current" />
                    </div>
                </div>

                <div className="flex-1 flex flex-col relative overflow-hidden">
                    <div className="p-6 pt-2">
                        <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg mb-4">
                            <Phone size={20} />
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {/* Step: Landing / Intro */}
                        {step === 'landing' && (
                            <motion.div
                                key="landing"
                                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                                className="flex-1 flex flex-col p-5"
                            >
                                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-5">
                                    <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center text-secondary border border-secondary/20 shadow-inner">
                                        <Globe size={32} />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-xl md:text-2xl font-black text-primary leading-none uppercase tracking-tighter">
                                            Ready to Scale Your<br />
                                            <span className="text-secondary italic">Global Reach?</span>
                                        </h3>
                                        <p className="text-[9px] font-bold text-slate-400 leading-relaxed max-w-[200px] mx-auto">
                                            Our specialists are ready to handle your sourcing, logistics, and private labeling needs.
                                        </p>
                                    </div>

                                    <div className="w-full space-y-3 pt-2">
                                        <div className="grid grid-cols-2 gap-2">
                                            <button
                                                onClick={() => window.open('https://wa.me/919952777973', '_blank')}
                                                className="py-3.5 bg-[#25D366] text-white rounded-2xl flex flex-col items-center justify-center gap-1 shadow-lg shadow-green-100/50 hover:scale-[1.02] transition-all"
                                            >
                                                <MessageCircle size={18} />
                                                <span className="text-[8px] font-black uppercase tracking-widest">WhatsApp</span>
                                            </button>
                                            <button
                                                onClick={() => window.location.href = 'mailto:Dhuruvanexports@gmail.com'}
                                                className="py-3.5 bg-primary text-white rounded-2xl flex flex-col items-center justify-center gap-1 shadow-lg shadow-primary/10 hover:scale-[1.02] transition-all"
                                            >
                                                <Mail size={18} />
                                                <span className="text-[8px] font-black uppercase tracking-widest">Gmail</span>
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => setStep('calendar')}
                                            className="w-full py-4 bg-white border border-slate-200 text-primary rounded-2xl font-black text-[9px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:border-secondary transition-all shadow-sm"
                                        >
                                            Schedule a Call <Calendar size={12} className="text-secondary" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Step: Calendar (The Drawer Style) */}
                        {step === 'calendar' && (
                            <motion.div
                                key="cal"
                                initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                className="absolute inset-0 top-32 bg-white rounded-t-[2.5rem] shadow-[0_-20px_40px_rgba(0,0,0,0.05)] z-20 flex flex-col p-6"
                            >
                                {/* Drawer Handle */}
                                <div className="w-12 h-1.5 bg-slate-100 rounded-full mx-auto mb-6 shrink-0" />

                                <div className="mb-4">
                                    <h5 className="text-sm font-black text-primary uppercase tracking-widest pl-1">Select Date</h5>
                                </div>

                                <div className="flex-1 bg-slate-50 rounded-[2rem] p-4 border border-slate-100 mb-4 overflow-y-auto">
                                    <div className="flex items-center justify-between mb-4 border-b border-slate-200/50 pb-3">
                                        <button onClick={prevMonth} className="p-1 text-slate-400 hover:text-primary"><ChevronLeft size={18} /></button>
                                        <span className="font-black text-primary text-[10px] uppercase tracking-widest">{MONTHS[month]} {year}</span>
                                        <button onClick={nextMonth} className="p-1 text-slate-400 hover:text-primary"><ChevronRight size={18} /></button>
                                    </div>
                                    <div className="grid grid-cols-7 gap-1 mb-2">
                                        {DAYS.map(d => <div key={d} className="text-center text-[7px] font-black text-slate-300">{d}</div>)}
                                    </div>
                                    <div className="grid grid-cols-7 gap-1">
                                        {cells.map((d, i) => (
                                            <div key={i} className="aspect-square">
                                                {d ? (
                                                    <button
                                                        onClick={() => isAvailable(d) && setSelectedDate(d)}
                                                        disabled={!isAvailable(d)}
                                                        className={`w-full h-full rounded-xl text-[10px] font-black transition-all
                                                            ${d === selectedDate ? 'bg-secondary text-white shadow-lg' :
                                                                isAvailable(d) ? 'bg-white text-primary border border-slate-100 shadow-sm' : 'text-slate-100'}`}
                                                    >
                                                        {d}
                                                    </button>
                                                ) : null}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    disabled={!selectedDate}
                                    onClick={() => setStep('time')}
                                    className="w-full py-4 bg-primary text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2"
                                >
                                    Choose Time <ArrowRight size={14} />
                                </button>
                            </motion.div>
                        )}

                        {/* Step: Time Slots */}
                        {step === 'time' && (
                            <motion.div
                                key="time"
                                initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                className="absolute inset-0 top-32 bg-white rounded-t-[2.5rem] shadow-[0_-20px_40px_rgba(0,0,0,0.05)] z-20 flex flex-col p-6"
                            >
                                <div className="w-12 h-1.5 bg-slate-100 rounded-full mx-auto mb-6 shrink-0" />

                                <div className="mb-6 flex items-center justify-between">
                                    <h5 className="text-sm font-black text-primary uppercase tracking-widest">Available Slots</h5>
                                    <button onClick={() => setStep('calendar')} className="text-[9px] font-black text-secondary uppercase underline tracking-widest">Change Date</button>
                                </div>

                                <div className="grid grid-cols-2 gap-2 overflow-y-auto pr-1 pb-4">
                                    {TIME_SLOTS.map(t => (
                                        <button
                                            key={t}
                                            onClick={() => { setSelectedTime(t); setStep('form'); }}
                                            className="py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black text-primary hover:bg-white hover:shadow-md hover:border-secondary transition-all text-center"
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Step: Details Form */}
                        {step === 'form' && (
                            <motion.div
                                key="form"
                                initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ scale: 0.9, opacity: 0 }}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                className="absolute inset-0 top-20 bg-white rounded-t-[2.5rem] shadow-[0_-20px_40px_rgba(0,0,0,0.05)] z-30 flex flex-col p-6 overflow-hidden"
                            >
                                <div className="w-12 h-1.5 bg-slate-100 rounded-full mx-auto mb-6 shrink-0" />

                                <div className="mb-6">
                                    <h4 className="text-xl font-black text-primary uppercase tracking-tighter">Your Details</h4>
                                    <div className="mt-2 py-2 px-3 bg-secondary/5 rounded-xl border border-secondary/10 inline-flex items-center gap-2">
                                        <Calendar size={12} className="text-secondary" />
                                        <span className="text-[9px] font-black text-primary uppercase tracking-widest">{MONTHS[month]} {selectedDate} · {selectedTime}</span>
                                    </div>
                                </div>

                                <div className="flex-1 overflow-y-auto pr-1 space-y-4 pb-6">
                                    <div className="space-y-1">
                                        <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest pl-1">Name</label>
                                        <input
                                            value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                                            className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-primary focus:border-secondary transition-all outline-none"
                                            placeholder="Enter your name"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest pl-1">Phone Number</label>
                                        <input
                                            value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                                            className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-primary focus:border-secondary transition-all outline-none"
                                            placeholder="+91 00000 00000"
                                            type="tel"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest pl-1">Email</label>
                                        <input
                                            value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                                            className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-primary focus:border-secondary transition-all outline-none"
                                            placeholder="you@example.com"
                                            type="email"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest pl-1">Requirements</label>
                                        <textarea
                                            value={form.note} onChange={e => setForm({ ...form, note: e.target.value })}
                                            className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-medium text-slate-600 focus:border-secondary transition-all outline-none resize-none"
                                            placeholder="Briefly mention your needs..."
                                            rows={2}
                                        />
                                    </div>
                                </div>

                                <button
                                    disabled={saving || !form.name || !form.email || !form.phone}
                                    onClick={handleSubmit}
                                    className="w-full py-4 bg-secondary text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-secondary/20 transition-all flex items-center justify-center gap-3"
                                >
                                    {saving ? 'Scheduling...' : 'Confirm Strategy Call'}
                                </button>
                                <button onClick={() => setStep('time')} className="w-full mt-3 py-2 text-[8px] font-black text-slate-400 uppercase tracking-widest hover:text-primary transition-colors">Cancel</button>
                            </motion.div>
                        )}

                        {/* Step: Success */}
                        {step === 'done' && (
                            <motion.div
                                key="done"
                                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                                className="absolute inset-0 bg-white z-40 flex flex-col items-center justify-center p-6 text-center"
                            >
                                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mb-4 shadow-sm border border-emerald-100">
                                    <Check size={28} />
                                </div>
                                <h3 className="text-xl font-black text-primary uppercase tracking-tighter mb-2 leading-none">All Set!</h3>
                                <p className="text-[9px] text-slate-500 font-medium mb-10 leading-relaxed px-4">
                                    Your call for <span className="text-primary font-black underline decoration-secondary/30">{MONTHS[month]} {selectedDate}</span> is booked. We've opened WhatsApp to confirm.
                                </p>

                                <div className="w-full space-y-2 mt-auto">
                                    <button
                                        onClick={() => {
                                            const subject = `Discovery Call Confirmation: ${form.name}`;
                                            const body = `Dhuruvan Exports Discovery Call\n\nClient: ${form.name}\nEmail: ${form.email}\nScheduled: ${MONTHS[month]} ${selectedDate}, ${year} at ${selectedTime}\nNote: ${form.note || "N/A"}`;
                                            window.location.href = `mailto:Dhuruvanexports@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                                        }}
                                        className="w-full py-4 bg-primary text-white rounded-2xl font-black text-[9px] uppercase tracking-[0.2em] shadow-lg shadow-primary/10 flex items-center justify-center gap-2"
                                    >
                                        Open in Gmail <Mail size={14} />
                                    </button>

                                    <button
                                        onClick={reset}
                                        className="w-full py-3 text-[8px] font-black text-slate-400 uppercase tracking-widest transition-all hover:text-primary"
                                    >
                                        Back to Home
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Mobile Bottom Indicator */}
                <div className="h-4 pb-2 shrink-0 flex items-center justify-center z-50">
                    <div className="w-24 h-1 bg-slate-200 rounded-full" />
                </div>
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
                {/* Background Spices Illustration (Generated Asset) */}
                <div className="absolute inset-x-0 top-0 h-full pointer-events-none opacity-80 lg:opacity-100">
                    <motion.div
                        initial={{ x: -100, rotate: -20, opacity: 0 }}
                        whileInView={{ x: 0, rotate: -15, opacity: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="absolute top-10 -left-10 md:left-20 w-48 h-auto hidden md:block"
                    >
                        <img src="/discovery_call_bg_elements.png" alt="" className="w-full h-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)] saturate-[1.25]" />
                    </motion.div>

                    <motion.div
                        initial={{ x: 100, y: -50, opacity: 0 }}
                        whileInView={{ x: 0, y: 0, opacity: 1 }}
                        transition={{ duration: 1.2, delay: 0.2 }}
                        className="absolute top-20 right-10 md:right-40 w-56 h-auto"
                    >
                        <img src="/discovery_call_bg_elements.png" alt="" className="w-full h-auto drop-shadow-[0_25px_50px_rgba(0,0,0,0.35)] saturate-150 rotate-45 scale-75" />
                    </motion.div>

                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.4 }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-64 h-auto hidden md:block"
                    >
                        <img src="/discovery_call_bg_elements.png" alt="" className="w-full h-auto drop-shadow-[0_30px_60px_rgba(0,0,0,0.4)] brightness-110 saturate-125 -rotate-12" />
                    </motion.div>
                </div>

                <div className="container px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">

                        {/* Left Side: Brand Coloured Title */}
                        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-center lg:text-left pt-10">
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-secondary/10 border border-secondary/20 rounded-full mb-8">
                                <Calendar size={14} className="text-secondary" />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Book a Call</span>
                            </div>
                            <h2 className="text-5xl md:text-7xl font-black text-primary mb-8 leading-[0.9] tracking-tighter">
                                SCHEDULE <br />
                                YOUR <br />
                                <span className="text-secondary italic">DISCOVERY</span> <br />
                                CALL
                            </h2>
                            <p className="text-slate-500 font-bold text-lg mb-4 max-w-md">Pick a date and time that works for you.</p>
                            <p className="text-slate-400 font-medium max-w-md text-sm">Our trade specialists will call you locally or via Video Call to discuss your global export requirements.</p>
                        </motion.div>

                        {/* Right Side: Existing Interactive Booking Widget */}
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
                            <BookingWidget />
                        </motion.div>
                    </div>
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
