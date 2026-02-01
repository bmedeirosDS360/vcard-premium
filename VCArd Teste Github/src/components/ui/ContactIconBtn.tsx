import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ContactIconBtnProps {
    icon: LucideIcon;
    onClick: () => void;
    label: string;
}

export const ContactIconBtn = ({ icon: Icon, onClick, label }: ContactIconBtnProps) => (
    <div className="flex flex-col items-center gap-2 w-20">
        <motion.button
            whileHover={{ scale: 1.1, borderColor: '#C5A059', boxShadow: '0 0 20px rgba(197,160,89,0.4)' }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className="w-14 h-14 flex items-center justify-center rounded-2xl border border-ds-gold/50 bg-gradient-to-br from-[#004137] to-[#002A24] text-white hover:to-[#004137] transition-all shadow-[0_4px_10px_rgba(0,0,0,0.3)]"
            aria-label={label}
        >
            <Icon size={24} strokeWidth={2} />
        </motion.button>
        <span className="text-[9px] text-white font-medium uppercase tracking-wider opacity-90 text-center leading-3 min-h-[24px] flex items-start justify-center">{label}</span>
    </div>
);
