import { useState } from 'react';
import { MessageCircle, Mail, Phone } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const GlobalInquiryButtons = ({ productTitle = "General Inquiry", className = "", context = "Product Detail Page", isDark = false }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeAction, setActiveAction] = useState(null);
    const [clientName, setClientName] = useState('');
    const [clientPhone, setClientPhone] = useState('');

    const handleAction = async (type) => {
        if (!clientName || !clientPhone) {
            alert("Please provide your name and phone number to continue.");
            return;
        }

        setIsSubmitting(true);
        setActiveAction(type);

        const inquiryData = {
            name: clientName,
            phone: clientPhone,
            email: 'N/A',
            product: productTitle,
            industry: context === "Product Detail Page" ? `Web Visitor (${context})` : `Visitor from ${context}`,
            destination: "Global",
            logistics: "Sea/Air",
            contactMethod: type,
            createdAt: serverTimestamp(),
            status: 'new'
        };

        try {
            // Save to Dashboard
            await addDoc(collection(db, 'inquiries'), inquiryData);

            // Action Redirects with high specificity
            const waBody = `📦 *Export Inquiry - Dhuruvan Exports* 📦\n\n` +
                `👤 *Name:* ${clientName}\n` +
                `📱 *Phone:* ${clientPhone}\n` +
                `🎯 *Purpose:* Bulk Inquiry for ${productTitle}\n` +
                `🏢 *Source:* ${context}\n\n` +
                `Please provide quality specifications and export pricing.`;

            const subject = `Inquiry regarding ${productTitle}`;

            if (type === 'whatsapp') {
                window.open(`https://wa.me/919952777973?text=${encodeURIComponent(waBody)}`, '_blank');
            } else if (type === 'email') {
                window.location.href = `mailto:Dhuruvanexports@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(waBody)}`;
            } else if (type === 'call') {
                window.location.href = `tel:+919952777973`;
            }
        } catch (error) {
            console.error("Quick Inquiry Error:", error);
            alert("Connection error. Please try again.");
        } finally {
            setIsSubmitting(false);
            setActiveAction(null);
        }
    };

    const inputStyles = `w-full ${isDark ? 'bg-white/5 border-white/10 text-white focus:border-secondary/30' : 'bg-slate-50 border-slate-100 text-primary focus:border-secondary/20'} border py-3 px-4 rounded-xl text-xs font-bold transition-all outline-none`;

    return (
        <div className={`space-y-4 ${className}`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className={inputStyles}
                />
                <input
                    type="tel"
                    required
                    placeholder="Phone/WhatsApp"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className={inputStyles}
                />
            </div>

            <div className={`grid grid-cols-1 sm:grid-cols-3 gap-3`}>
                <button
                    onClick={() => handleAction('whatsapp')}
                    disabled={isSubmitting}
                    className="flex items-center justify-center gap-2 px-6 py-4 bg-[#25D366] text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-[1.02] transition-all shadow-lg shadow-green-100 disabled:opacity-50"
                >
                    {isSubmitting && activeAction === 'whatsapp' ? <div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <MessageCircle size={16} />}
                    WhatsApp
                </button>
                <button
                    onClick={() => handleAction('email')}
                    disabled={isSubmitting}
                    className="flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-[1.02] transition-all shadow-lg disabled:opacity-50"
                >
                    {isSubmitting && activeAction === 'email' ? <div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <Mail size={16} />}
                    Gmail
                </button>
                <button
                    onClick={() => handleAction('call')}
                    disabled={isSubmitting}
                    className={`flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:border-secondary hover:text-secondary transition-all disabled:opacity-50 whitespace-nowrap border ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-600'}`}
                >
                    {isSubmitting && activeAction === 'call' ? <div className="w-3 h-3 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" /> : <Phone size={16} />}
                    Direct Call
                </button>
            </div>
        </div>
    );
};

export default GlobalInquiryButtons;
