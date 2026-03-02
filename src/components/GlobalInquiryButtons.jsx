import { useState } from 'react';
import { MessageCircle, Mail, Phone } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const GlobalInquiryButtons = ({ productTitle = "General Inquiry", className = "", context = "Product Detail Page" }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeAction, setActiveAction] = useState(null);

    const handleAction = async (type) => {
        setIsSubmitting(true);
        setActiveAction(type);

        const inquiryData = {
            name: "Direct Click Inquiry",
            product: productTitle,
            industry: context === "Product Detail Page" ? "Web Visitor" : `Visitor from ${context}`,
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
            const subject = context === "Product Detail Page"
                ? `Inquiry for ${productTitle}`
                : `Business Inquiry regarding ${context}`;

            const body = context === "Product Detail Page"
                ? `📦 *Product Inquiry - Dhuruvan Exports* 📦\n\n🎯 *Purpose:* Bulk Inquiry for ${productTitle}\n🏢 *Source:* ${context}\n\nPlease provide quality specifications and export pricing.`
                : `🤝 *Business Inquiry - Dhuruvan Exports* 🤝\n\n🎯 *Purpose:* ${productTitle}\n🏢 *Source:* ${context}\n\nI'm interested in discussing how we can collaborate. Please connect.`;

            if (type === 'whatsapp') {
                window.open(`https://wa.me/919952777973?text=${encodeURIComponent(body)}`, '_blank');
            } else if (type === 'email') {
                window.location.href = `mailto:Dhuruvanexports@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            } else if (type === 'call') {
                window.location.href = `tel:+919952777973`;
            }
        } catch (error) {
            console.error("Quick Inquiry Error:", error);
        } finally {
            setIsSubmitting(false);
            setActiveAction(null);
        }
    };

    return (
        <div className={`grid grid-cols-1 sm:grid-cols-3 gap-3 ${className}`}>
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
                className="flex items-center justify-center gap-2 px-6 py-4 bg-white border border-slate-200 text-slate-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:border-secondary hover:text-secondary transition-all disabled:opacity-50 whitespace-nowrap"
            >
                {isSubmitting && activeAction === 'call' ? <div className="w-3 h-3 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" /> : <Phone size={16} />}
                Direct Call
            </button>
        </div>
    );
};

export default GlobalInquiryButtons;
