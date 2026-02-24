import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Lock, Eye, EyeOff, LogOut, ShieldCheck, BarChart3, Package, Users, Globe,
    Mail, Phone, MapPin, ArrowRight, TrendingUp, Clock, CheckCircle2, XCircle,
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
        <div className="admin-login-wrapper">
            <div className="admin-login-bg">
                <div className="admin-login-orb admin-login-orb-1" />
                <div className="admin-login-orb admin-login-orb-2" />
                <div className="admin-login-orb admin-login-orb-3" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                className="admin-login-card"
            >
                <div className="admin-login-icon-wrap">
                    <div className="admin-login-shield">
                        <ShieldCheck size={32} />
                    </div>
                </div>

                <h1 className="admin-login-title">Admin Access</h1>
                <p className="admin-login-subtitle">
                    Enter your credentials to access the management dashboard
                </p>

                <form onSubmit={handleSubmit} className="admin-login-form">
                    <div className="admin-login-field">
                        <label className="admin-login-label">Password</label>
                        <div className="admin-login-input-wrap">
                            <Lock size={18} className="admin-login-input-icon" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter admin password"
                                className="admin-login-input"
                                autoFocus
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="admin-login-toggle"
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
                                className="admin-login-error"
                            >
                                <AlertCircle size={16} />
                                <span>{error}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <button
                        type="submit"
                        className="admin-login-btn"
                        disabled={isLoading || !password}
                    >
                        {isLoading ? (
                            <div className="admin-login-spinner" />
                        ) : (
                            <>
                                <Lock size={18} />
                                <span>Unlock Dashboard</span>
                            </>
                        )}
                    </button>
                </form>

                <p className="admin-login-footer-text">
                    <ShieldCheck size={12} />
                    Protected by Dhuruvan Exports Security
                </p>
            </motion.div>
        </div>
    );
};

// ─── Stat Card ─────────────────────────────────────────────────────
const StatCard = ({ icon: Icon, label, value, change, color, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        className="admin-stat-card"
    >
        <div className="admin-stat-header">
            <div className={`admin-stat-icon admin-stat-icon-${color}`}>
                <Icon size={20} />
            </div>
            {change && (
                <span className={`admin-stat-change ${change > 0 ? 'positive' : 'negative'}`}>
                    <TrendingUp size={12} />
                    {change > 0 ? '+' : ''}{change}%
                </span>
            )}
        </div>
        <h3 className="admin-stat-value">{value}</h3>
        <p className="admin-stat-label">{label}</p>
    </motion.div>
);



// ─── Quick Action Button ───────────────────────────────────────────
const QuickAction = ({ icon: Icon, label, color }) => (
    <button className={`admin-quick-action admin-qa-${color}`}>
        <Icon size={18} />
        <span>{label}</span>
    </button>
);

// ─── Dashboard ─────────────────────────────────────────────────────
const Dashboard = ({ onLogout }) => {
    const stats = [
        { icon: Inbox, label: 'Total Inquiries', value: '247', change: 12, color: 'blue' },
        { icon: Package, label: 'Active Products', value: '14', change: 8, color: 'green' },
        { icon: Globe, label: 'Countries Served', value: '32', change: 5, color: 'purple' },
        { icon: Users, label: 'Active Clients', value: '89', change: 15, color: 'orange' },
    ];



    const products = [
        { name: 'Basmati Rice', inquiries: 78, status: 'active' },
        { name: 'Non-Basmati Rice', inquiries: 56, status: 'active' },
        { name: 'Buffalo Meat', inquiries: 45, status: 'active' },
        { name: 'Drinking Water', inquiries: 34, status: 'active' },
        { name: 'Woodcrafts', inquiries: 34, status: 'active' },
    ];

    return (
        <div className="admin-dashboard">
            {/* Top Header Bar */}
            <div className="admin-topbar">
                <div className="admin-topbar-left">
                    <h1 className="admin-topbar-title">
                        <Activity size={22} className="admin-topbar-icon" />
                        Dashboard
                    </h1>
                    <span className="admin-topbar-date">
                        <Calendar size={14} />
                        {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                </div>
                <div className="admin-topbar-right">
                    <button className="admin-topbar-btn admin-topbar-notif">
                        <Bell size={18} />
                        <span className="admin-notif-dot" />
                    </button>
                    <button className="admin-topbar-btn admin-topbar-settings">
                        <Settings size={18} />
                    </button>
                    <button className="admin-logout-btn" onClick={onLogout}>
                        <LogOut size={16} />
                        <span>Logout</span>
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="admin-stats-grid">
                {stats.map((stat, i) => (
                    <StatCard key={stat.label} {...stat} delay={i * 0.1} />
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="admin-content-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>

                {/* Right Sidebar */}
                <div className="admin-sidebar-cards">
                    {/* Product Performance */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="admin-panel-card"
                    >
                        <div className="admin-panel-header">
                            <div className="admin-panel-title-wrap">
                                <BarChart3 size={18} className="admin-panel-title-icon" />
                                <h2 className="admin-panel-title">Product Performance</h2>
                            </div>
                        </div>
                        <div className="admin-products-list">
                            {products.map((prod, i) => (
                                <div key={i} className="admin-product-row">
                                    <div className="admin-product-info">
                                        <span className="admin-product-name">{prod.name}</span>
                                        <span className="admin-product-inquiries">{prod.inquiries} inquiries</span>
                                    </div>
                                    <div className="admin-product-bar-wrap">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(prod.inquiries / 78) * 100}%` }}
                                            transition={{ delay: 0.6 + i * 0.1, duration: 0.8 }}
                                            className="admin-product-bar"
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
                        className="admin-panel-card"
                    >
                        <div className="admin-panel-header">
                            <div className="admin-panel-title-wrap">
                                <Settings size={18} className="admin-panel-title-icon" />
                                <h2 className="admin-panel-title">Quick Actions</h2>
                            </div>
                        </div>
                        <div className="admin-quick-actions-grid">
                            <QuickAction icon={FileText} label="Export Report" color="blue" />
                            <QuickAction icon={Mail} label="Send Newsletter" color="green" />
                            <QuickAction icon={Package} label="Add Product" color="purple" />
                        </div>
                    </motion.div>
                </div>
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
        <div className="admin-page-root">
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
