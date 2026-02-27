import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Lock, Eye, EyeOff, LogOut, ShieldCheck, BarChart3, Package, Users, Globe,
    Mail, ArrowRight, TrendingUp, Clock, CheckCircle2, XCircle,
    MessageSquare, Inbox, Star, ChevronRight, Settings, Bell, Search,
    FileText, Truck, Calendar, Activity, AlertCircle, Filter
} from 'lucide-react';

const ADMIN_PASSWORD = 'dhuruvan2026';

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
            {/* Animated Background Orbs */}
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
                <p className="text-center text-white/50 text-sm font-medium mb-10">
                    Enter your credentials to access the management dashboard
                </p>

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
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-white/30 hover:text-white transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10, height: 0 }}
                                animate={{ opacity: 1, y: 0, height: 'auto' }}
                                exit={{ opacity: 0, y: -10, height: 0 }}
                                className="flex items-center gap-3 px-5 py-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-200 text-xs font-semibold"
                            >
                                <AlertCircle size={16} />
                                <span>{error}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-secondary to-green-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-secondary/20 hover:-translate-y-1 transition-all active:scale-[0.98] disabled:opacity-50"
                        disabled={isLoading || !password}
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <Lock size={18} />
                                <span>Unlock Dashboard</span>
                            </>
                        )}
                    </button>
                </form>

                <div className="flex items-center justify-center gap-2 mt-8 text-white/20 text-[10px] font-black uppercase tracking-widest text-center">
                    <ShieldCheck size={12} />
                    Protected by Dhuruvan Exports Security
                </div>
            </motion.div>
        </div>
    );
};

// ─── Stat Card ─────────────────────────────────────────────────────
const StatCard = ({ icon: Icon, label, value, change, color, delay }) => {
    const colorMap = {
        blue: "bg-blue-50 text-blue-600",
        green: "bg-green-50 text-green-600",
        purple: "bg-purple-50 text-purple-600",
        orange: "bg-orange-50 text-orange-600"
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            className="bg-white border m-2 border-slate-100 rounded-[2rem] p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
        >
            <div className="flex items-center justify-between mb-5">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colorMap[color]}`}>
                    <Icon size={22} />
                </div>
                {change && (
                    <span className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg ${change > 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                        <TrendingUp size={12} />
                        {change > 0 ? '+' : ''}{change}%
                    </span>
                )}
            </div>
            <h3 className="text-3xl font-black text-slate-900 mb-1 tracking-tighter">{value}</h3>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
        </motion.div>
    );
};

// ─── Quick Action Button ───────────────────────────────────────────
const QuickAction = ({ icon: Icon, label, color }) => {
    const colorMap = {
        blue: "text-blue-600 hover:bg-blue-50 border-blue-50",
        green: "text-green-600 hover:bg-green-50 border-green-50",
        purple: "text-purple-600 hover:bg-purple-50 border-purple-50"
    };

    return (
        <button className={`flex items-center gap-3 m-1 p-4 bg-white border rounded-2xl text-xs font-black uppercase tracking-widest transition-all hover:-translate-y-1 hover:shadow-lg ${colorMap[color]}`}>
            <Icon size={18} />
            <span>{label}</span>
        </button>
    );
};

// ─── Dashboard ─────────────────────────────────────────────────────
const Dashboard = ({ onLogout }) => {
    const stats = [
        { icon: Inbox, label: 'Total Inquiries', value: '247', change: 12, color: 'blue' },
        { icon: Package, label: 'Active Products', value: '14', change: 8, color: 'green' },
        { icon: Globe, label: 'Countries Served', value: '32', change: 5, color: 'purple' },
        { icon: Users, label: 'Active Clients', value: '89', change: 15, color: 'orange' },
    ];

    const productsList = [
        { name: 'Basmati Rice', inquiries: 78 },
        { name: 'Non-Basmati Rice', inquiries: 56 },
        { name: 'Buffalo Meat', inquiries: 45 },
        { name: 'Drinking Water', inquiries: 34 },
        { name: 'Woodcrafts', inquiries: 34 },
    ];

    return (
        <div className="max-w-[1400px] mx-auto px-6 py-10 md:py-16">
            {/* Top Header Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div className="space-y-1">
                    <h1 className="flex items-center gap-3 text-3xl font-black text-slate-900 tracking-tight">
                        <Activity size={28} className="text-secondary" />
                        Dashboard
                    </h1>
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
                        <Calendar size={14} />
                        {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="w-11 h-11 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-secondary hover:border-secondary transition-all">
                        <Bell size={20} />
                    </button>
                    <button className="w-11 h-11 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-secondary hover:border-secondary transition-all">
                        <Settings size={20} />
                    </button>
                    <button onClick={onLogout} className="flex items-center gap-2 px-6 py-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-xs font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">
                        <LogOut size={16} />
                        Logout
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {stats.map((stat, i) => (
                    <StatCard key={stat.label} {...stat} delay={i * 0.1} />
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Product Performance */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-sm"
                >
                    <div className="flex items-center gap-3 pb-8 mb-8 border-b border-slate-50">
                        <BarChart3 size={24} className="text-secondary" />
                        <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase tracking-widest text-sm">Product Performance</h2>
                    </div>
                    <div className="space-y-8">
                        {productsList.map((prod, i) => (
                            <div key={i} className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-black text-slate-900 uppercase tracking-wide">{prod.name}</span>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{prod.inquiries} inquiries</span>
                                </div>
                                <div className="w-full h-3 bg-slate-50 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(prod.inquiries / 78) * 100}%` }}
                                        transition={{ delay: 0.6 + i * 0.1, duration: 0.8 }}
                                        className="h-full bg-gradient-to-r from-secondary to-green-500 rounded-full"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-sm"
                >
                    <div className="flex items-center gap-3 pb-8 mb-8 border-b border-slate-50">
                        <Settings size={24} className="text-secondary" />
                        <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase tracking-widest text-sm">Operation Hub</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <QuickAction icon={FileText} label="Export Report" color="blue" />
                        <QuickAction icon={Mail} label="Update Clients" color="green" />
                        <QuickAction icon={Package} label="Add Inventory" color="purple" />
                        <QuickAction icon={Activity} label="System Log" color="blue" />
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

// ─── Main Admin Panel Component ────────────────────────────────────
const AdminPanel = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const auth = sessionStorage.getItem('adminAuth');
        if (auth === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = () => setIsAuthenticated(true);

    const handleLogout = () => {
        sessionStorage.removeItem('adminAuth');
        setIsAuthenticated(false);
    };

    return (
        <div className="min-h-screen bg-slate-50 font-inter pt-20">
            <AnimatePresence mode="wait">
                {!isAuthenticated ? (
                    <LoginScreen key="login" onLogin={handleLogin} />
                ) : (
                    <motion.div
                        key="dashboard"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <Dashboard onLogout={handleLogout} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminPanel;

