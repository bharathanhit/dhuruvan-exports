import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Lock, Eye, EyeOff, LogOut, ShieldCheck, Package, Users, Globe,
    Activity, AlertCircle, Bell, Calendar, BarChart3,
    Plus, Trash2, Edit2, X, Check, FolderOpen, ChevronDown, Link, Mail,
    MessageSquare, Facebook, Twitter, Instagram, Linkedin, Youtube,
    Truck, Search, Settings, Award, Zap, FileImage, UploadCloud,
    MessageCircle, Phone, Clock
} from 'lucide-react';
import {
    collection, addDoc, updateDoc, deleteDoc, doc,
    onSnapshot, query, orderBy, serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase';
import { categories as staticCategories, products as staticProducts } from '../data/products';

const ADMIN_PASSWORD = 'dhuruvan2026';
const slugify = (str) => str.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

const resizeImage = (file, maxWidth = 800) => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;
                if (width > maxWidth) {
                    height = (maxWidth / width) * height;
                    width = maxWidth;
                }
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL('image/jpeg', 0.7)); // High compression to save Firestore space
            };
        };
    });
};

// ─── Login Screen ──────────────────────────────────────────────────
const LoginScreen = ({ onLogin }) => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setTimeout(() => {
            if (password === ADMIN_PASSWORD) {
                sessionStorage.setItem('adminAuth', 'true');
                onLogin();
            } else {
                setError('Invalid password. Access denied.');
                setPassword('');
            }
            setIsLoading(false);
        }, 800);
    };

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#0a1628] via-[#0d2137] to-[#091e33]">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-secondary/30 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[80px] animate-pulse delay-700" />
            </div>
            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                className="relative z-10 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-10 w-full max-w-[440px] m-5 shadow-2xl"
            >
                <div className="flex justify-center mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary to-green-600 flex items-center justify-center text-white shadow-lg shadow-secondary/30">
                        <ShieldCheck size={32} />
                    </div>
                </div>
                <h1 className="text-center text-white text-3xl font-black mb-2 tracking-tight">Admin Access</h1>
                <p className="text-center text-white/50 text-sm font-medium mb-10">Enter your credentials to access the management dashboard</p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em] ml-1">Password</label>
                        <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl px-5 focus-within:border-secondary transition-all">
                            <Lock size={18} className="text-white/30 shrink-0" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter admin password"
                                className="flex-1 bg-transparent border-none outline-none text-white text-sm font-medium py-4 px-4 placeholder:text-white/20"
                                autoFocus
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-white/30 hover:text-white transition-colors">
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>
                    <AnimatePresence>
                        {error && (
                            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                className="flex items-center gap-3 px-5 py-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-200 text-xs font-semibold">
                                <AlertCircle size={16} /><span>{error}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <button type="submit" disabled={isLoading || !password}
                        className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-secondary to-green-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg hover:-translate-y-1 transition-all disabled:opacity-50">
                        {isLoading
                            ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            : <><Lock size={18} /><span>Unlock Dashboard</span></>}
                    </button>
                </form>
                <div className="flex items-center justify-center gap-2 mt-8 text-white/20 text-[10px] font-black uppercase tracking-widest">
                    <ShieldCheck size={12} />Protected by Dhuruvan Exports Security
                </div>
            </motion.div>
        </div>
    );
};

// ─── Form Modal Shell ──────────────────────────────────────────────
const Modal = ({ title, onClose, onSave, saving, valid, children }) => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-[2rem] p-8 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-black text-slate-900">{title}</h3>
                <button onClick={onClose} className="text-slate-400 hover:text-slate-700 transition-colors"><X size={22} /></button>
            </div>
            <div className="space-y-5">{children}</div>
            <div className="flex gap-3 mt-8">
                <button onClick={onClose} className="flex-1 py-3 border border-slate-200 rounded-xl text-sm font-black text-slate-600 hover:bg-slate-50 transition-all">
                    Cancel
                </button>
                <button onClick={onSave} disabled={saving || !valid}
                    className="flex-1 py-3 bg-secondary text-white rounded-xl text-sm font-black hover:bg-secondary/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                    {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Check size={16} />}
                    Save
                </button>
            </div>
        </motion.div>
    </motion.div>
);

// ─── Shared Field Components ───────────────────────────────────────
const Field = ({ label, children }) => (
    <div>
        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">{label}</label>
        {children}
    </div>
);

const TextInput = ({ value, onChange, placeholder, ...rest }) => (
    <input value={value} onChange={onChange} placeholder={placeholder} {...rest}
        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-secondary transition-all" />
);

const TextArea = ({ value, onChange, placeholder, rows = 3 }) => (
    <textarea value={value} onChange={onChange} placeholder={placeholder} rows={rows}
        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-secondary transition-all resize-none" />
);

const ImageUploader = ({ value, onChange, label = "Image" }) => {
    const [isProcessing, setIsProcessing] = useState(false);

    const handleFile = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setIsProcessing(true);
        const dataUrl = await resizeImage(file);
        onChange({ target: { value: dataUrl } });
        setIsProcessing(false);
    };

    return (
        <Field label={label}>
            <div className="space-y-4">
                <div className="flex flex-col gap-3">
                    <div className="relative group overflow-hidden bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-6 transition-all hover:border-secondary/50 hover:bg-white text-center">
                        <input type="file" accept="image/*" onChange={handleFile}
                            className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-400 group-hover:text-secondary group-hover:scale-110 transition-all">
                                {isProcessing ? <div className="w-5 h-5 border-2 border-secondary/20 border-t-secondary rounded-full animate-spin" /> : <Plus size={24} />}
                            </div>
                            <div>
                                <p className="text-xs font-black text-slate-700 uppercase tracking-widest">Click to select file</p>
                                <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-tight">Auto-resizes for Firestore optimization</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <div className="flex items-center gap-4 py-2 opacity-50"><div className="h-px flex-1 bg-slate-200"></div><span className="text-[10px] font-black font-mono">OR PASTE URL</span><div className="h-px flex-1 bg-slate-200"></div></div>
                    <div className="flex items-center border border-slate-200 rounded-2xl overflow-hidden focus-within:border-secondary transition-all">
                        <div className="px-3 py-3 bg-slate-50 border-r border-slate-200"><Link size={16} className="text-slate-400" /></div>
                        <input value={value && !value.startsWith('data:') ? value : ''}
                            onChange={onChange} placeholder="https://unsplash.com/..."
                            className="flex-1 px-4 py-3 text-sm font-medium outline-none bg-white" />
                    </div>
                </div>

                {value && (
                    <div className="relative h-44 rounded-[2rem] overflow-hidden border-4 border-white shadow-xl">
                        <img src={value} alt="Preview" className="w-full h-full object-cover"
                            onError={(e) => { e.target.parentElement.style.display = 'none'; }} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                        <div className="absolute top-4 right-4 bg-secondary text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1 shadow-lg">
                            <Check size={10} /> Active Image
                        </div>
                        <button onClick={() => onChange({ target: { value: '' } })}
                            className="absolute bottom-4 left-4 p-2 bg-white/20 backdrop-blur-md rounded-xl text-white hover:bg-white hover:text-red-500 transition-all">
                            <Trash2 size={16} />
                        </button>
                    </div>
                )}
            </div>
        </Field>
    );
};

// ─── Inquiry Manager ───────────────────────────────────────────────
const StatusBadge = ({ status }) => {
    const styles = {
        new: 'bg-blue-50 text-blue-600 border-blue-100',
        read: 'bg-slate-50 text-slate-500 border-slate-100',
        completed: 'bg-emerald-50 text-emerald-600 border-emerald-100'
    };
    return (
        <span className={`px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-widest border ${styles[status] || styles.new}`}>
            {status}
        </span>
    );
};

const ContactIcon = ({ method }) => {
    if (method === 'whatsapp') return <MessageCircle size={14} className="text-green-500" />;
    if (method === 'email') return <Mail size={14} className="text-blue-500" />;
    if (method === 'call') return <Phone size={14} className="text-orange-500" />;
    return <Globe size={14} className="text-slate-400" />;
};
const InquiryManager = () => {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, new, read

    useEffect(() => {
        const q = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const list = snapshot.docs.map(doc => ({
                docId: doc.id,
                ...doc.data()
            }));
            setInquiries(list);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const toggleStatus = async (docId, currentStatus) => {
        const newStatus = currentStatus === 'new' ? 'read' : 'new';
        await updateDoc(doc(db, 'inquiries', docId), { status: newStatus });
    };

    const handleDelete = async (docId) => {
        if (window.confirm('Delete this inquiry permanently?')) {
            await deleteDoc(doc(db, 'inquiries', docId));
        }
    };

    const filtered = filter === 'all' ? inquiries : inquiries.filter(iq => iq.status === filter);

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[3rem] border border-slate-100">
            <div className="w-10 h-10 border-4 border-secondary/20 border-t-secondary rounded-full animate-spin mb-4" />
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Loading business leads...</p>
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-4xl font-black text-primary tracking-tighter uppercase">Inquiry Dashboard</h2>
                    <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-2 px-1">Manage global business leads from forms</p>
                </div>
                <div className="flex bg-slate-100 p-1 rounded-xl w-fit">
                    {['all', 'new', 'read'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-5 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${filter === f ? 'bg-white text-secondary shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {filtered.map((iq) => (
                    <div key={iq.docId} className={`bg-white border rounded-[2rem] p-8 transition-all group relative overflow-hidden ${iq.status === 'new' ? 'border-blue-100 shadow-[0_10px_30px_-5px_rgba(59,130,246,0.05)]' : 'border-slate-100 opacity-80'}`}>
                        {iq.status === 'new' && <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500" />}

                        <div className="absolute top-0 right-0 p-8 text-slate-50 font-black text-7xl pointer-events-none group-hover:text-slate-100/50 transition-colors">
                            {iq.createdAt?.toDate() ? new Date(iq.createdAt.toDate()).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''}
                        </div>

                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
                            <div className="space-y-6 flex-1">
                                <div className="flex flex-wrap items-center gap-4">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm ${iq.status === 'new' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="text-2xl font-black text-primary tracking-tight">{iq.name}</h3>
                                            <StatusBadge status={iq.status} />
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{iq.industry}</span>
                                            <div className="w-1 h-1 rounded-full bg-slate-200" />
                                            <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                                                <ContactIcon method={iq.contactMethod} />
                                                <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">{iq.contactMethod}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-6 gap-6 pt-6 border-t border-slate-50">
                                    <div className="md:col-span-1">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Target Product</p>
                                        <p className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                            <Package size={14} className="text-secondary" /> {iq.product}
                                        </p>
                                    </div>
                                    <div className="md:col-span-1">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Contact Info</p>
                                        <div className="space-y-1">
                                            {iq.phone && (
                                                <a href={`tel:${iq.phone}`} className="text-sm font-bold text-slate-700 flex items-center gap-2 hover:text-secondary group/link">
                                                    <Phone size={12} className="text-secondary group-hover/link:animate-pulse" /> {iq.phone}
                                                </a>
                                            )}
                                            {iq.email && iq.email !== 'N/A' && (
                                                <a href={`mailto:${iq.email}`} className="text-[11px] font-bold text-slate-400 flex items-center gap-2 hover:text-secondary truncate">
                                                    <Mail size={12} className="shrink-0" /> {iq.email}
                                                </a>
                                            )}
                                            {(!iq.phone && (!iq.email || iq.email === 'N/A')) && <span className="text-xs text-slate-300 italic">No direct contact</span>}
                                        </div>
                                    </div>
                                    <div className="md:col-span-1">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Business / Source</p>
                                        <p className="text-sm font-bold text-slate-700 truncate" title={iq.industry}>
                                            {iq.company && iq.company !== 'N/A' ? iq.company : iq.industry}
                                        </p>
                                        {iq.company && iq.company !== 'N/A' && iq.industry && (
                                            <p className="text-[9px] text-slate-400 font-medium truncate mt-0.5">{iq.industry}</p>
                                        )}
                                    </div>
                                    <div className="md:col-span-1">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Destination Port</p>
                                        <p className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                            <Globe size={14} className="text-blue-400" /> {iq.destination}
                                        </p>
                                    </div>
                                    <div className="md:col-span-1">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Logistics</p>
                                        <p className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                            <Truck size={14} className="text-secondary" /> {iq.logistics}
                                        </p>
                                    </div>
                                    <div className="md:col-span-1">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Date & Time</p>
                                        <p className="text-sm font-bold text-slate-700">
                                            {iq.createdAt?.toDate() ? new Date(iq.createdAt.toDate()).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Pending'}
                                        </p>
                                        <p className="text-[10px] font-medium text-slate-400 font-mono mt-0.5">
                                            {iq.createdAt?.toDate() ? new Date(iq.createdAt.toDate()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                                        </p>
                                    </div>
                                </div>

                                {(iq.message || iq.note) && (
                                    <div className="mt-6 p-4 bg-slate-50 rounded-2xl border border-slate-100 italic text-slate-500 text-xs leading-relaxed">
                                        <div className="flex items-center gap-2 mb-2 not-italic">
                                            <MessageSquare size={12} className="text-slate-400" />
                                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Client Message / Note</span>
                                        </div>
                                        "{iq.message || iq.note}"
                                    </div>
                                )}
                            </div>

                            <div className="flex lg:flex-col gap-3">
                                <button
                                    onClick={() => toggleStatus(iq.docId, iq.status)}
                                    title={iq.status === 'new' ? 'Mark as Read' : 'Mark as New'}
                                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all border shadow-sm ${iq.status === 'new' ? 'bg-secondary/10 border-secondary/20 text-secondary hover:bg-secondary hover:text-white' : 'bg-slate-50 border-slate-200 text-slate-400 hover:bg-slate-100'}`}
                                >
                                    {iq.status === 'new' ? <Check size={20} /> : <MessageSquare size={20} />}
                                </button>
                                <button
                                    onClick={() => handleDelete(iq.docId)}
                                    className="w-12 h-12 rounded-2xl bg-white border border-red-100 text-red-200 hover:bg-red-500 hover:text-white hover:border-red-500 flex items-center justify-center transition-all shadow-sm"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {filtered.length === 0 && (
                    <div className="py-24 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-100 flex flex-col items-center justify-center space-y-4">
                        <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-200">
                            <Mail size={32} />
                        </div>
                        <div>
                            <p className="text-slate-400 font-black uppercase tracking-[0.2em]">No {filter !== 'all' ? filter : ''} inquiries found</p>
                            <p className="text-slate-300 text-xs font-bold uppercase tracking-widest mt-1 italic">Waiting for new partnerships...</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// ─── Appointment Manager ──────────────────────────────────────────
const AppointmentManager = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, 'appointments'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setAppointments(snapshot.docs.map(doc => ({ docId: doc.id, ...doc.data() })));
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Remove this appointment recording?')) {
            await deleteDoc(doc(db, 'appointments', id));
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center py-20 bg-white rounded-[3rem] border border-slate-100">
            <div className="w-10 h-10 border-4 border-secondary/20 border-t-secondary rounded-full animate-spin mr-4" />
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Syncing schedules...</p>
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-700 mt-4">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-4xl font-black text-primary tracking-tighter uppercase">Scheduled Calls</h2>
                    <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-2 px-1">Global Discovery Call Bookings</p>
                </div>
                <div className="bg-primary px-5 py-2 rounded-xl flex items-center gap-3">
                    <Calendar size={14} className="text-secondary" />
                    <span className="text-white font-black text-xs uppercase tracking-widest">{appointments.length} Total Booked</span>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-5">
                {appointments.map((app) => (
                    <div key={app.docId} className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl transition-all group">
                        <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center">
                            {/* Date Block */}
                            <div className="flex flex-col items-center justify-center w-24 h-24 rounded-3xl bg-secondary/5 border-2 border-secondary/10 shrink-0">
                                <span className="text-[10px] font-black text-secondary uppercase tracking-[0.2em]">Scheduled</span>
                                <div className="text-2xl font-black text-primary leading-none mt-1">{app.date.split(' ')[1].replace(',', '')}</div>
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{app.date.split(' ')[0]}</div>
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 mb-4">
                                    <h3 className="text-2xl font-black text-primary truncate tracking-tight uppercase">{app.name}</h3>
                                    <div className="px-3 py-1 bg-white border border-slate-200 rounded-full flex items-center gap-1.5 shadow-sm">
                                        <Clock size={12} className="text-secondary" />
                                        <span className="text-[10px] font-black text-primary italic uppercase tracking-widest">{app.time}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex items-center gap-4 group/item">
                                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover/item:bg-primary/5 group-hover/item:text-primary transition-colors">
                                            <Mail size={18} />
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Contact Email</p>
                                            <a href={`mailto:${app.email}`} className="text-sm font-bold text-slate-700 hover:text-secondary hover:underline underline-offset-4 decoration-2">{app.email}</a>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 group/item">
                                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover/item:bg-primary/5 group-hover/item:text-primary transition-colors">
                                            <MessageSquare size={18} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Client Note / Requirements</p>
                                            <p className="text-sm font-bold text-slate-600 line-clamp-1 italic">"{app.note || 'No special requirements provided'}"</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 shrink-0 self-center">
                                <button
                                    onClick={() => handleDelete(app.docId)}
                                    className="w-12 h-12 rounded-2xl bg-white border border-red-100 text-red-200 hover:bg-red-500 hover:text-white hover:border-red-500 flex items-center justify-center transition-all shadow-sm"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {appointments.length === 0 && (
                    <div className="py-24 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                        <Calendar size={40} className="text-slate-200 mx-auto mb-4" />
                        <p className="text-slate-400 font-black uppercase tracking-[0.2em]">No discovery calls booked yet</p>
                    </div>
                )}
            </div>
        </div>
    );
};


const CategoryManager = () => {
    const [categories, setCategories] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({ title: '', description: '', imageUrl: '', color: '#16a34a' });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const q = query(collection(db, 'categories'), orderBy('order', 'asc'));
        return onSnapshot(q, (snap) => {
            const firestoreCats = snap.docs.map(d => ({ docId: d.id, ...d.data(), isFirestore: true }));
            const merged = staticCategories.map(c => ({ ...c, isStatic: true }));

            firestoreCats.forEach(fc => {
                const idx = merged.findIndex(s => s.slug === fc.slug);
                if (idx !== -1) {
                    merged[idx] = { ...merged[idx], ...fc, isStatic: false };
                } else {
                    merged.push(fc);
                }
            });
            merged.sort((a, b) => (a.order || 0) - (b.order || 0));
            setCategories(merged);
        });
    }, []);

    const reset = () => { setForm({ title: '', description: '', imageUrl: '', color: '#16a34a' }); setEditing(null); };

    const handleSave = async () => {
        if (!form.title) return;
        setSaving(true);
        const payload = {
            title: form.title,
            slug: slugify(form.title),
            description: form.description,
            imageUrl: form.imageUrl,
            color: form.color,
            order: editing ? editing.order : categories.length,
            updatedAt: serverTimestamp()
        };
        try {
            if (editing && editing.docId) {
                await updateDoc(doc(db, 'categories', editing.docId), payload);
            } else {
                await addDoc(collection(db, 'categories'), { ...payload, createdAt: serverTimestamp() });
            }
            reset(); setShowForm(false);
        } catch (e) {
            console.error(e);
            alert("Error saving category: " + e.message);
        }
        setSaving(false);
    };

    const handleDelete = async (cat) => {
        if (!cat.isFirestore) {
            alert("This category is defined in the source code. To modify it, edit and save it once to 'promote' it to the database.");
            return;
        }
        if (!window.confirm(`Delete "${cat.title}"?`)) return;
        await deleteDoc(doc(db, 'categories', cat.docId));
    };

    const openEdit = (cat) => {
        setEditing(cat);
        setForm({
            title: cat.title,
            description: cat.description || '',
            imageUrl: cat.imageUrl || cat.image || '',
            color: cat.color || '#16a34a'
        });
        setShowForm(true);
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Categories</h2>
                    <p className="text-slate-400 text-sm font-medium">{categories.length} categories in Firestore</p>
                </div>
                <button onClick={() => { reset(); setShowForm(true); }}
                    className="flex items-center gap-2 px-5 py-3 bg-secondary text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-secondary/90 transition-all shadow-lg shadow-secondary/20">
                    <Plus size={16} /> Add Category
                </button>
            </div>

            <AnimatePresence>
                {showForm && (
                    <Modal title={editing ? 'Edit Category' : 'New Category'} onClose={() => { setShowForm(false); reset(); }}
                        onSave={handleSave} saving={saving} valid={!!form.title}>
                        <Field label="Category Name *">
                            <TextInput value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. Agro Products" />
                            {form.title && <p className="text-[10px] text-slate-400 mt-1 font-mono">slug: /{slugify(form.title)}</p>}
                        </Field>
                        <Field label="Description">
                            <TextArea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Brief description..." />
                        </Field>
                        <Field label="Accent Color">
                            <div className="flex items-center gap-3">
                                <input type="color" value={form.color} onChange={e => setForm({ ...form, color: e.target.value })}
                                    className="w-12 h-10 rounded-lg border border-slate-200 cursor-pointer" />
                                <span className="text-sm font-mono text-slate-500">{form.color}</span>
                            </div>
                        </Field>
                        <ImageUploader label="Category Banner Image" value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} />
                    </Modal>
                )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories.map((cat) => (
                    <motion.div key={cat.slug} layout
                        className="flex items-center gap-4 bg-white border border-slate-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all">
                        <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100">
                            {cat.imageUrl && <img src={cat.imageUrl} alt={cat.title} className="w-full h-full object-cover" />}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <h4 className="font-black text-slate-900 truncate">{cat.title}</h4>
                                {cat.isStatic && <span className="text-[8px] font-black bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full uppercase tracking-widest border border-slate-200">Static</span>}
                                {cat.isFirestore && <span className="text-[8px] font-black bg-secondary/10 text-secondary px-1.5 py-0.5 rounded-full uppercase tracking-widest border border-secondary/20">Live</span>}
                            </div>
                            <p className="text-xs text-slate-400 truncate font-medium">{cat.description}</p>
                            <div className="flex items-center gap-1.5 mt-1">
                                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                                <span className="text-[10px] font-mono text-slate-400">/{cat.slug}</span>
                            </div>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                            <button onClick={() => openEdit(cat)} className="w-9 h-9 rounded-xl border border-slate-100 flex items-center justify-center text-slate-400 hover:text-secondary hover:border-secondary transition-all">
                                <Edit2 size={15} />
                            </button>
                            <button onClick={() => handleDelete(cat)} className="w-9 h-9 rounded-xl border border-slate-100 flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-200 transition-all">
                                <Trash2 size={15} />
                            </button>
                        </div>
                    </motion.div>
                ))}
                {categories.length === 0 && (
                    <div className="col-span-2 py-16 text-center text-slate-400 font-medium">
                        No categories yet. Click "Add Category" to get started.
                    </div>
                )}
            </div>
        </div>
    );
};

// ─── Product Manager ───────────────────────────────────────────────
const ProductManager = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState(null);
    const [filterCat, setFilterCat] = useState('all');
    const [form, setForm] = useState({
        title: '',
        description: '',
        longDescription: '',
        category: '',
        categorySlug: '',
        imageUrl: '',
        isHalal: false,
        status: 'Ready for Export',
        badgeNote: 'Premium Selection',
        specifications: [{ label: '', value: '' }],
        benefits: [''],
        varieties: [{ title: '', desc: '', imageUrl: '' }]
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const unsub1 = onSnapshot(query(collection(db, 'products'), orderBy('order', 'asc')), (snap) => {
            const firestoreProds = snap.docs.map(d => ({ docId: d.id, ...d.data(), isFirestore: true }));
            const merged = staticProducts.map(p => ({ ...p, isStatic: true }));

            firestoreProds.forEach(fp => {
                const idx = merged.findIndex(p => p.title === fp.title);
                if (idx !== -1) {
                    merged[idx] = { ...merged[idx], ...fp, isStatic: false };
                } else {
                    merged.push(fp);
                }
            });
            merged.sort((a, b) => (a.order || 0) - (b.order || 0));
            setProducts(merged);
        });

        const unsub2 = onSnapshot(query(collection(db, 'categories'), orderBy('order', 'asc')), (snap) => {
            const firestoreCats = snap.docs.map(d => ({ docId: d.id, ...d.data(), isFirestore: true }));
            const merged = staticCategories.map(c => ({ ...c, isStatic: true }));

            firestoreCats.forEach(fc => {
                const idx = merged.findIndex(s => s.slug === fc.slug);
                if (idx !== -1) {
                    merged[idx] = { ...merged[idx], ...fc, isStatic: false };
                } else {
                    merged.push(fc);
                }
            });
            setCategories(merged);
        });

        return () => { unsub1(); unsub2(); };
    }, []);

    const reset = () => {
        setForm({
            title: '',
            description: '',
            longDescription: '',
            category: '',
            categorySlug: '',
            imageUrl: '',
            isHalal: false,
            status: 'Ready for Export',
            badgeNote: 'Premium Selection',
            specifications: [{ label: '', value: '' }],
            benefits: [''],
            varieties: [{ title: '', desc: '', imageUrl: '' }]
        });
        setEditing(null);
    };

    const handleSave = async () => {
        if (!form.title || !form.categorySlug) return;
        setSaving(true);
        const payload = {
            title: form.title,
            id: slugify(form.title),
            description: form.description,
            longDescription: form.longDescription,
            category: form.category,
            categorySlug: form.categorySlug,
            isHalal: form.isHalal,
            imageUrl: form.imageUrl,
            status: form.status,
            badgeNote: form.badgeNote,
            specifications: form.specifications.filter(s => s.label && s.value),
            benefits: form.benefits.filter(b => b.trim()),
            varieties: form.varieties.filter(v => v.title).map(v => ({
                title: v.title,
                desc: v.desc,
                img: v.imageUrl // Map internal imageUrl to 'img' for compatibility with detail page
            })),
            order: editing ? editing.order : products.length,
            updatedAt: serverTimestamp()
        };
        try {
            if (editing && editing.docId) {
                await updateDoc(doc(db, 'products', editing.docId), payload);
            } else {
                // If editing a static product (it has no docId), or adding new, create a new Firestore doc
                await addDoc(collection(db, 'products'), { ...payload, createdAt: serverTimestamp() });
            }
            reset(); setShowForm(false);
        } catch (e) {
            console.error(e);
            alert("Error saving: " + e.message);
        }
        setSaving(false);
    };

    const handleDelete = async (prod) => {
        if (!prod.isFirestore) {
            alert("This product is defined in the source code. To modify it, edit and save it once to 'promote' it to the database.");
            return;
        }
        if (!window.confirm(`Delete "${prod.title}"?`)) return;
        await deleteDoc(doc(db, 'products', prod.docId));
    };

    const openEdit = (prod) => {
        setEditing(prod);
        setForm({
            title: prod.title,
            description: prod.description || '',
            longDescription: prod.longDescription || '',
            category: prod.category,
            categorySlug: prod.categorySlug,
            imageUrl: prod.imageUrl || prod.image || '',
            isHalal: !!prod.isHalal,
            status: prod.status || 'Ready for Export',
            badgeNote: prod.badgeNote || 'Premium Selection',
            specifications: prod.specifications && prod.specifications.length ? prod.specifications : [{ label: '', value: '' }],
            benefits: prod.benefits && prod.benefits.length ? prod.benefits : [''],
            varieties: prod.varieties && prod.varieties.length ? prod.varieties.map(v => ({
                title: v.title,
                desc: v.desc || '',
                imageUrl: v.img || v.imageUrl || ''
            })) : [{ title: '', desc: '', imageUrl: '' }]
        });
        setShowForm(true);
    };

    const filtered = filterCat === 'all' ? products : products.filter(p => p.categorySlug === filterCat);

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Products</h2>
                    <p className="text-slate-400 text-sm font-medium">{products.length} products in Firestore</p>
                </div>
                <div className="flex gap-3">
                    <div className="relative">
                        <select value={filterCat} onChange={e => setFilterCat(e.target.value)}
                            className="appearance-none border border-slate-200 rounded-xl px-4 py-2.5 pr-9 text-xs font-black text-slate-600 outline-none focus:border-secondary transition-all bg-white cursor-pointer">
                            <option value="all">All Categories</option>
                            {categories.map(c => <option key={c.slug} value={c.slug}>{c.title}</option>)}
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                    <button onClick={() => { reset(); setShowForm(true); }}
                        className="flex items-center gap-2 px-5 py-3 bg-secondary text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-secondary/90 transition-all shadow-lg shadow-secondary/20">
                        <Plus size={16} /> Add Product
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {showForm && (
                    <Modal title={editing ? 'Edit Product' : 'New Product'} onClose={() => { setShowForm(false); reset(); }}
                        onSave={handleSave} saving={saving} valid={!!(form.title && form.categorySlug)}>
                        <Field label="Product Name *">
                            <TextInput value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Turmeric Powder" />
                        </Field>
                        <Field label="Category *">
                            <div className="relative">
                                <select value={form.categorySlug}
                                    onChange={e => {
                                        const cat = categories.find(c => c.slug === e.target.value);
                                        if (cat) setForm(f => ({ ...f, category: cat.title, categorySlug: cat.slug }));
                                    }}
                                    className="w-full appearance-none border border-slate-200 rounded-xl px-4 py-3 pr-10 text-sm font-bold outline-none focus:border-secondary transition-all bg-white cursor-pointer">
                                    <option value="">Select a category</option>
                                    {categories.map(c => <option key={c.slug} value={c.slug}>{c.title}</option>)}
                                </select>
                                <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            </div>
                        </Field>
                        <Field label="Short Description">
                            <TextArea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Brief product description for the grid..." />
                        </Field>
                        <Field label="Long Description (Detail Page)">
                            <TextArea value={form.longDescription} onChange={e => setForm(f => ({ ...f, longDescription: e.target.value }))} placeholder="Detailed story for the product page..." rows={5} />
                        </Field>

                        <Field label="Specifications">
                            <div className="space-y-3">
                                {form.specifications.map((spec, idx) => (
                                    <div key={idx} className="flex gap-2">
                                        <input value={spec.label} onChange={e => {
                                            const newSpecs = [...form.specifications];
                                            newSpecs[idx].label = e.target.value;
                                            setForm(f => ({ ...f, specifications: newSpecs }));
                                        }} placeholder="Label (e.g. Moisture)" className="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold outline-none" />
                                        <input value={spec.value} onChange={e => {
                                            const newSpecs = [...form.specifications];
                                            newSpecs[idx].value = e.target.value;
                                            setForm(f => ({ ...f, specifications: newSpecs }));
                                        }} placeholder="Value (e.g. 12% Max)" className="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold outline-none" />
                                        <button onClick={() => {
                                            const newSpecs = form.specifications.filter((_, i) => i !== idx);
                                            setForm(f => ({ ...f, specifications: newSpecs.length ? newSpecs : [{ label: '', value: '' }] }));
                                        }} className="p-2 text-red-400 hover:text-red-500"><Trash2 size={16} /></button>
                                    </div>
                                ))}
                                <button onClick={() => setForm(f => ({ ...f, specifications: [...f.specifications, { label: '', value: '' }] }))} className="text-[10px] font-black text-secondary uppercase tracking-widest flex items-center gap-1">+ Add Spec</button>
                            </div>
                        </Field>
                        <div className="grid grid-cols-2 gap-4">
                            <Field label="Availability Status">
                                <TextInput value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} placeholder="e.g. Set Available" />
                            </Field>
                            <Field label="Display Badge">
                                <TextInput value={form.badgeNote} onChange={e => setForm(f => ({ ...f, badgeNote: e.target.value }))} placeholder="e.g. Handcrafted Product" />
                            </Field>
                        </div>

                        <Field label="Product Highlights / Benefits">
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-2">
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight italic">ℹ️ These are key selling points that appear in the product highlights section.</p>
                            </div>
                            <div className="space-y-3">
                                {form.benefits.map((benefit, idx) => (
                                    <div key={idx} className="flex gap-2">
                                        <input value={benefit} onChange={e => {
                                            const newBen = [...form.benefits];
                                            newBen[idx] = e.target.value;
                                            setForm({ ...form, benefits: newBen });
                                        }} placeholder="e.g. 100% Organic" className="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold outline-none" />
                                        <button onClick={() => {
                                            const newBen = form.benefits.filter((_, i) => i !== idx);
                                            setForm({ ...form, benefits: newBen.length ? newBen : [''] });
                                        }} className="p-2 text-red-400 hover:text-red-500"><Trash2 size={16} /></button>
                                    </div>
                                ))}
                                <button onClick={() => setForm({ ...form, benefits: [...form.benefits, ''] })} className="text-[10px] font-black text-secondary uppercase tracking-widest flex items-center gap-1">+ Add Benefit</button>
                            </div>
                        </Field>

                        <Field label="Varieties">
                            <div className="space-y-4">
                                {form.varieties.map((v, idx) => (
                                    <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Variety #{idx + 1}</span>
                                            <button onClick={() => {
                                                const newV = form.varieties.filter((_, i) => i !== idx);
                                                setForm({ ...form, varieties: newV.length ? newV : [{ title: '', desc: '', imageUrl: '' }] });
                                            }} className="text-red-400 hover:text-red-500"><Trash2 size={14} /></button>
                                        </div>
                                        <div className="space-y-3">
                                            <input value={v.title} onChange={e => {
                                                const newV = [...form.varieties];
                                                newV[idx].title = e.target.value;
                                                setForm({ ...form, varieties: newV });
                                            }} placeholder="Variety Title (e.g. Sona Masoori)" className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold outline-none" />
                                            <input value={v.desc} onChange={e => {
                                                const newV = [...form.varieties];
                                                newV[idx].desc = e.target.value;
                                                setForm({ ...form, varieties: newV });
                                            }} placeholder="Short Description..." className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium outline-none" />
                                            <input value={v.imageUrl} onChange={e => {
                                                const newV = [...form.varieties];
                                                newV[idx].imageUrl = e.target.value;
                                                setForm({ ...form, varieties: newV });
                                            }} placeholder="Variety Image URL..." className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium outline-none mb-4" />
                                            {v.imageUrl && <div className="h-20 w-full rounded-xl overflow-hidden border border-slate-200"><img src={v.imageUrl} className="w-full h-full object-cover" /></div>}
                                            <div className="relative mt-2">
                                                <input type="file" accept="image/*" onChange={async (e) => {
                                                    const file = e.target.files[0];
                                                    if (!file) return;
                                                    const dataUrl = await resizeImage(file, 400); // Varieties can be smaller
                                                    const newV = [...form.varieties];
                                                    newV[idx].imageUrl = dataUrl;
                                                    setForm({ ...form, varieties: newV });
                                                }} className="absolute inset-0 opacity-0 cursor-pointer" />
                                                <button type="button" className="w-full py-2 bg-slate-100 rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-200">Or Click to Pick File</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <button onClick={() => setForm({ ...form, varieties: [...form.varieties, { title: '', desc: '', imageUrl: '' }] })}
                                    className="text-[10px] font-black text-secondary uppercase tracking-widest flex items-center gap-1">+ Add Variety</button>
                            </div>
                        </Field>

                        <div className="flex items-center gap-3">
                            <button type="button" onClick={() => setForm(f => ({ ...f, isHalal: !f.isHalal }))}
                                className={`w-10 h-6 rounded-full transition-all flex-shrink-0 ${form.isHalal ? 'bg-secondary' : 'bg-slate-200'}`}>
                                <div className={`w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform ${form.isHalal ? 'translate-x-4' : 'translate-x-0.5'}`} />
                            </button>
                            <label className="text-sm font-black text-slate-600">Halal Certified</label>
                        </div>
                        <ImageUploader label="Main Product Hero Image" value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} />
                    </Modal>
                )
                }
            </AnimatePresence >

            <div className="space-y-3">
                {filtered.map((prod) => (
                    <motion.div key={prod.docId || prod.id} layout
                        className="flex items-center gap-4 bg-white border border-slate-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all">
                        <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100">
                            {(prod.imageUrl || prod.image) && (
                                <img src={prod.imageUrl || prod.image} alt={prod.title} className="w-full h-full object-cover" />
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="font-black text-slate-900">{prod.title}</h4>
                                {prod.isStatic && <span className="text-[8px] font-black bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full uppercase tracking-widest border border-slate-200">Static</span>}
                                {prod.isFirestore && <span className="text-[8px] font-black bg-secondary/10 text-secondary px-1.5 py-0.5 rounded-full uppercase tracking-widest border border-secondary/20">Live</span>}
                                {prod.isHalal && (
                                    <span className="text-[9px] font-black bg-green-50 text-green-700 px-2 py-0.5 rounded-full uppercase tracking-widest">Halal</span>
                                )}
                            </div>
                            <p className="text-xs text-slate-400 truncate font-medium">{prod.description}</p>
                            <span className="text-[10px] font-black text-secondary uppercase tracking-widest">{prod.category}</span>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                            <button onClick={() => openEdit(prod)} className="w-9 h-9 rounded-xl border border-slate-100 flex items-center justify-center text-slate-400 hover:text-secondary hover:border-secondary transition-all">
                                <Edit2 size={15} />
                            </button>
                            <button onClick={() => handleDelete(prod)} className="w-9 h-9 rounded-xl border border-slate-100 flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-200 transition-all">
                                <Trash2 size={15} />
                            </button>
                        </div>
                    </motion.div>
                ))}
                {filtered.length === 0 && (
                    <div className="py-16 text-center text-slate-400 font-medium">
                        {products.length === 0 ? 'No products yet. Click "Add Product" to get started.' : 'No products in this category.'}
                    </div>
                )}
            </div>
        </div >
    );
};

// ─── Certificate Manager ──────────────────────────────────────────
const CertificateManager = () => {
    const [certs, setCerts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState(null);
    const [saving, setSaving] = useState(false);
    const [uploadingPage, setUploadingPage] = useState(false);

    // Form state
    const [form, setForm] = useState({ name: '', description: '', icon: 'Award' });
    // Pages = array of base64 or URL strings
    const [pages, setPages] = useState([]);
    const [pageUrl, setPageUrl] = useState('');

    const iconOptions = ['Award', 'ShieldCheck', 'FileImage', 'Check', 'Globe', 'Lock'];

    useEffect(() => {
        const q = query(collection(db, 'certificates'), orderBy('createdAt', 'desc'));
        return onSnapshot(q, (snap) =>
            setCerts(snap.docs.map(d => ({ docId: d.id, ...d.data() })))
        );
    }, []);

    const reset = () => {
        setForm({ name: '', description: '', icon: 'Award' });
        setPages([]);
        setPageUrl('');
        setEditing(null);
    };

    const handleFileUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;
        setUploadingPage(true);
        const results = [];
        for (const file of files) {
            const resized = await resizeImage(file, 1200);
            results.push(resized);
        }
        setPages(prev => [...prev, ...results]);
        setUploadingPage(false);
        e.target.value = '';
    };

    const addPageUrl = () => {
        if (!pageUrl.trim()) return;
        setPages(prev => [...prev, pageUrl.trim()]);
        setPageUrl('');
    };

    const removePage = (idx) => {
        setPages(prev => prev.filter((_, i) => i !== idx));
    };

    const handleSave = async () => {
        if (!form.name || pages.length === 0) {
            alert('Please enter a certificate name and add at least one page image.');
            return;
        }
        setSaving(true);
        const payload = {
            name: form.name,
            description: form.description,
            icon: form.icon,
            pages,
            updatedAt: serverTimestamp(),
        };
        try {
            if (editing && editing.docId) {
                await updateDoc(doc(db, 'certificates', editing.docId), payload);
            } else {
                await addDoc(collection(db, 'certificates'), { ...payload, createdAt: serverTimestamp() });
            }
            reset();
            setShowForm(false);
        } catch (e) {
            console.error(e);
            alert('Error saving certificate: ' + e.message);
        }
        setSaving(false);
    };

    const handleDelete = async (certId) => {
        if (!window.confirm('Delete this certificate group?')) return;
        await deleteDoc(doc(db, 'certificates', certId));
    };

    const openEdit = (cert) => {
        setEditing(cert);
        setForm({ name: cert.name, description: cert.description || '', icon: cert.icon || 'Award' });
        setPages(cert.pages || []);
        setShowForm(true);
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Certificates</h2>
                    <p className="text-slate-400 text-sm font-medium">Manage official certificates displayed on the website</p>
                </div>
                <button
                    onClick={() => { reset(); setShowForm(true); }}
                    className="flex items-center gap-2 px-5 py-3 bg-secondary text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-secondary/90 transition-all shadow-lg"
                >
                    <Plus size={16} /> Add Certificate
                </button>
            </div>

            <AnimatePresence>
                {showForm && (
                    <motion.div
                        key="cert-form"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-white border border-slate-100 rounded-[2rem] p-8 mb-8 shadow-sm"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-black text-slate-900 text-lg">{editing ? 'Edit Certificate' : 'New Certificate Group'}</h3>
                            <button onClick={() => { setShowForm(false); reset(); }} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-200 transition-all">
                                <X size={16} />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                            <div>
                                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Certificate Name *</label>
                                <input
                                    value={form.name}
                                    onChange={e => setForm({ ...form, name: e.target.value })}
                                    placeholder="e.g. GST Registration"
                                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-secondary transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Icon</label>
                                <select
                                    value={form.icon}
                                    onChange={e => setForm({ ...form, icon: e.target.value })}
                                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-secondary"
                                >
                                    {iconOptions.map(opt => <option key={opt}>{opt}</option>)}
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Description</label>
                                <input
                                    value={form.description}
                                    onChange={e => setForm({ ...form, description: e.target.value })}
                                    placeholder="e.g. GOVERNMENT OF INDIA • TAX REGISTRATION"
                                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-secondary transition-all"
                                />
                            </div>
                        </div>

                        {/* Page Images Section */}
                        <div className="mb-6">
                            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Certificate Pages ({pages.length} added) *</label>

                            {/* Upload File */}
                            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center mb-4 hover:border-secondary transition-colors relative">
                                {uploadingPage ? (
                                    <div className="flex items-center justify-center gap-3 text-secondary">
                                        <div className="w-5 h-5 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
                                        <span className="text-sm font-bold">Processing images...</span>
                                    </div>
                                ) : (
                                    <>
                                        <UploadCloud size={28} className="text-slate-300 mx-auto mb-2" />
                                        <p className="text-sm font-bold text-slate-400 mb-1">Upload certificate page images</p>
                                        <p className="text-[10px] text-slate-300 mb-3">PNG, JPG, PDF screenshots supported. Multiple files allowed.</p>
                                        <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-black text-slate-500 uppercase tracking-widest hover:border-secondary hover:text-secondary transition-all">
                                            <Plus size={14} /> Browse Files
                                            <input type="file" multiple accept="image/*" onChange={handleFileUpload} className="hidden" />
                                        </label>
                                    </>
                                )}
                            </div>

                            {/* Or paste URL */}
                            <div className="flex gap-3">
                                <div className="flex-1 flex items-center border border-slate-200 rounded-xl overflow-hidden focus-within:border-secondary transition-all">
                                    <div className="px-3 py-3 bg-slate-50 border-r border-slate-200"><Link size={14} className="text-slate-400" /></div>
                                    <input
                                        value={pageUrl}
                                        onChange={e => setPageUrl(e.target.value)}
                                        onKeyDown={e => e.key === 'Enter' && addPageUrl()}
                                        placeholder="Or paste image URL and press Add"
                                        className="flex-1 px-4 py-3 text-sm font-medium outline-none bg-white"
                                    />
                                </div>
                                <button
                                    onClick={addPageUrl}
                                    className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-secondary hover:text-white transition-all"
                                >
                                    Add
                                </button>
                            </div>

                            {/* Pages preview grid */}
                            {pages.length > 0 && (
                                <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                                    {pages.map((pg, idx) => (
                                        <div key={idx} className="relative rounded-xl overflow-hidden border border-slate-200 group aspect-[3/4]">
                                            <img src={pg} alt={`Page ${idx + 1}`} className="w-full h-full object-cover" onError={e => e.target.src = 'https://via.placeholder.com/150?text=Error'} />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <button
                                                    onClick={() => removePage(idx)}
                                                    className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center"
                                                >
                                                    <X size={14} />
                                                </button>
                                            </div>
                                            <div className="absolute bottom-1 right-1 bg-black/60 text-white text-[8px] font-black px-1.5 py-0.5 rounded">
                                                {idx + 1}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                            <button
                                onClick={() => { setShowForm(false); reset(); }}
                                className="px-6 py-3 text-slate-400 text-xs font-black uppercase tracking-widest hover:text-slate-700 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={saving || !form.name || pages.length === 0}
                                className="flex items-center gap-2 px-6 py-3 bg-secondary text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-secondary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
                            >
                                {saving ? (
                                    <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Saving...</>
                                ) : (
                                    <><Check size={14} /> {editing ? 'Update Certificate' : 'Save Certificate'}</>
                                )}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Certificate List */}
            {certs.length === 0 && !showForm && (
                <div className="py-20 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                    <Award size={40} className="text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-sm">No certificates yet</p>
                    <p className="text-slate-300 text-xs mt-1">Click "Add Certificate" to get started</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {certs.map(cert => (
                    <div key={cert.docId} className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm flex items-start gap-5 relative group">
                        {/* Icon */}
                        <div className="w-14 h-14 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                            <Award size={24} />
                        </div>
                        {/* Info */}
                        <div className="flex-1 min-w-0">
                            <h4 className="font-black text-slate-900 text-lg uppercase tracking-tight">{cert.name}</h4>
                            {cert.description && <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{cert.description}</p>}
                            {/* Page thumbnails */}
                            <div className="flex gap-2 mt-3 flex-wrap">
                                {(cert.pages || []).slice(0, 5).map((pg, i) => (
                                    <div key={i} className="w-10 h-12 rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
                                        <img src={pg} alt={`Page ${i + 1}`} className="w-full h-full object-cover" onError={e => e.target.src = 'https://via.placeholder.com/40?text='} />
                                    </div>
                                ))}
                                {(cert.pages || []).length > 5 && (
                                    <div className="w-10 h-12 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-center text-[10px] font-black text-slate-400">
                                        +{cert.pages.length - 5}
                                    </div>
                                )}
                            </div>
                            <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest mt-2">{(cert.pages || []).length} pages</p>
                        </div>
                        {/* Actions */}
                        <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => openEdit(cert)} className="p-2 hover:text-secondary transition-colors"><Edit2 size={16} /></button>
                            <button onClick={() => handleDelete(cert.docId)} className="p-2 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 p-6 bg-amber-50 border border-amber-200 rounded-2xl">
                <p className="text-amber-700 text-xs font-bold">
                    <span className="font-black">ℹ️ Note:</span> New certificates added here will appear on the <strong>Certificates page</strong> automatically alongside the static GST & MSME certificates.
                    Pages are displayed in a flip-book viewer in the order you upload them.
                </p>
            </div>
        </div>
    );
};

// ─── Dashboard Overview ────────────────────────────────────────────
const DashboardOverview = () => {
    const [catCount, setCatCount] = useState(0);
    const [prodCount, setProdCount] = useState(0);
    const [inquiryCount, setInquiryCount] = useState(0);
    const [newInquiryCount, setNewInquiryCount] = useState(0);
    const [appointmentCount, setAppointmentCount] = useState(0);

    const [certCount, setCertCount] = useState(0);
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        const u1 = onSnapshot(collection(db, 'categories'), s => {
            const firestoreCount = s.docs.filter(d => !staticCategories.some(sc => sc.slug === d.data().slug)).length;
            setCatCount(staticCategories.length + firestoreCount);
        });
        const u2 = onSnapshot(query(collection(db, 'products'), orderBy('order', 'asc')), s => {
            const firestoreProds = s.docs.map(d => ({ docId: d.id, ...d.data(), isFirestore: true }));
            const merged = staticProducts.map(p => ({ ...p, isStatic: true }));

            firestoreProds.forEach(fp => {
                const idx = merged.findIndex(p => p.title === fp.title);
                if (idx !== -1) merged[idx] = { ...merged[idx], ...fp, isStatic: false };
                else merged.push(fp);
            });
            merged.sort((a, b) => (a.order || 0) - (b.order || 0));
            setAllProducts(merged);
            setProdCount(merged.length);
        });
        const u3 = onSnapshot(collection(db, 'inquiries'), s => {
            setInquiryCount(s.size);
            setNewInquiryCount(s.docs.filter(d => d.data().status === 'new').length);
        });
        const u4 = onSnapshot(collection(db, 'appointments'), s => setAppointmentCount(s.size));
        const u5 = onSnapshot(collection(db, 'certificates'), s => setCertCount(s.size));
        return () => { u1(); u2(); u3(); u4(); u5(); };
    }, []);

    const stats = [
        { icon: FolderOpen, label: 'Categories', value: catCount, color: 'purple' },
        { icon: Package, label: 'Products', value: prodCount, color: 'green' },
        { icon: Mail, label: 'Inquiries', value: inquiryCount, color: 'orange', sub: `${newInquiryCount} New` },
        { icon: Calendar, label: 'Scheduled', value: appointmentCount, color: 'emerald' },
        { icon: Award, label: 'Certificates', value: certCount, color: 'amber' },

    ];
    const colorMap = {
        blue: 'bg-blue-50 text-blue-600',
        green: 'bg-green-50 text-green-600',
        purple: 'bg-purple-50 text-purple-600',
        orange: 'bg-orange-50 text-orange-600',
        indigo: 'bg-indigo-50 text-indigo-600',
        emerald: 'bg-emerald-50 text-emerald-600',
        amber: 'bg-amber-50 text-amber-600'
    };

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map((s, i) => (
                    <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                        className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${colorMap[s.color]}`}>
                            <s.icon size={20} />
                        </div>
                        <div className="flex items-baseline gap-2">
                            <div className="text-3xl font-black text-slate-900 tracking-tight">{s.value}</div>
                            {s.sub && <span className="text-[10px] font-black text-secondary uppercase animate-pulse shrink-0">{s.sub}</span>}
                        </div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{s.label}</div>
                    </motion.div>
                ))}
            </div>

            <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="font-black text-slate-900 text-xl tracking-tight uppercase">Global Product Inventory</h3>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Live tracking of all export items</p>
                    </div>
                    <div className="px-5 py-2 bg-slate-50 border border-slate-100 rounded-full">
                        <span className="text-xs font-black text-primary uppercase tracking-widest">{allProducts.length} Items Total</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {allProducts.map((prod, idx) => (
                        <motion.div
                            key={prod.docId || prod.id || idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 }}
                            className="group p-4 bg-white border border-slate-50 rounded-2xl hover:border-secondary/20 hover:shadow-lg hover:shadow-secondary/5 transition-all flex items-center gap-4"
                        >
                            <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-50 flex-shrink-0">
                                <img src={prod.imageUrl || prod.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-black text-slate-800 text-xs truncate uppercase tracking-tight group-hover:text-secondary transition-colors">{prod.title}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest truncate max-w-[80px]">{prod.category}</span>
                                    <div className="w-1 h-1 rounded-full bg-slate-200" />
                                    {prod.isFirestore ? (
                                        <span className="text-[8px] font-black text-secondary uppercase tracking-widest px-1.5 py-0.5 bg-secondary/5 rounded-md">Live</span>
                                    ) : (
                                        <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest px-1.5 py-0.5 bg-slate-50 rounded-md">Static</span>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm">
                <h3 className="font-black text-slate-900 mb-2">Quick Guide</h3>
                <ul className="space-y-3 text-sm text-slate-500 font-medium">
                    <li className="flex items-start gap-3"><span className="w-5 h-5 rounded-full bg-secondary/10 text-secondary flex items-center justify-center text-[10px] font-black mt-0.5 flex-shrink-0">1</span>Go to <strong className="text-slate-700">Categories</strong> tab → Add your product categories with an image URL and description.</li>
                    <li className="flex items-start gap-3"><span className="w-5 h-5 rounded-full bg-secondary/10 text-secondary flex items-center justify-center text-[10px] font-black mt-0.5 flex-shrink-0">2</span>Go to <strong className="text-slate-700">Products</strong> tab → Add individual products, select their category, and paste an image URL.</li>
                    <li className="flex items-start gap-3"><span className="w-5 h-5 rounded-full bg-secondary/10 text-secondary flex items-center justify-center text-[10px] font-black mt-0.5 flex-shrink-0">3</span>Changes appear <strong className="text-slate-700">instantly</strong> on the website — no refresh needed.</li>
                </ul>
            </div>
        </div>
    );
};

// ─── Main Dashboard Shell ──────────────────────────────────────────
const Dashboard = ({ onLogout }) => {
    const [tab, setTab] = useState('overview');
    const tabs = [
        { id: 'overview', label: 'Overview', icon: BarChart3 },
        { id: 'categories', label: 'Categories', icon: FolderOpen },
        { id: 'products', label: 'Products', icon: Package },
        { id: 'inquiries', label: 'Inquiries', icon: Mail },
        { id: 'appointments', label: 'Call Bookings', icon: Calendar },
        { id: 'certificates', label: 'Certificates', icon: Award },

    ];
    return (
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-10 md:py-14">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="flex items-center gap-3 text-3xl font-black text-slate-900 tracking-tight">
                        <Activity size={28} className="text-secondary" /> Admin Dashboard
                    </h1>
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">
                        <Calendar size={14} />
                        {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="w-11 h-11 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-secondary transition-all">
                        <Bell size={20} />
                    </button>
                    <button onClick={onLogout} className="flex items-center gap-2 px-5 py-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-xs font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">
                        <LogOut size={16} /> Logout
                    </button>
                </div>
            </div>

            <div className="flex gap-2 mb-8 bg-slate-100 p-1.5 rounded-2xl w-fit">
                {tabs.map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${tab === t.id ? 'bg-white text-secondary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                        <t.icon size={15} />{t.label}
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                    {tab === 'overview' && <DashboardOverview />}
                    {tab === 'categories' && <CategoryManager />}
                    {tab === 'products' && <ProductManager />}
                    {tab === 'certificates' && <CertificateManager />}

                    {tab === 'inquiries' && <InquiryManager />}
                    {tab === 'appointments' && <AppointmentManager />}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

// ─── Root ──────────────────────────────────────────────────────────
const AdminPanel = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(true); // Unlocked for now

    useEffect(() => {
        const auth = sessionStorage.getItem('adminAuth');
        if (auth === 'true') setIsAuthenticated(true);
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem('adminAuth');
        setIsAuthenticated(false);
    };

    return (
        <div className="min-h-screen bg-slate-50 font-inter pt-20">
            {!isAuthenticated ? (
                <LoginScreen onLogin={() => setIsAuthenticated(true)} />
            ) : (
                <Dashboard onLogout={handleLogout} />
            )}
        </div>
    );
};

export default AdminPanel;
