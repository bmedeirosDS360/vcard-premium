import { motion } from 'framer-motion';
import { ArrowUpRight, LucideIcon } from 'lucide-react';

interface SmartLinkItemProps {
    icon: LucideIcon;
    label: string;
    onClick: () => void;
    subLabel?: string;
    isExternal?: boolean;
    center?: boolean;
}

export const SmartLinkItem = ({ icon: Icon, label, onClick, subLabel, isExternal = false, center = false }: SmartLinkItemProps) => {
    return (
        <motion.button
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.08)' }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={`w-full relative group overflow-hidden p-4 rounded-xl flex items-center mb-3 transition-all border border-white/10 hover:border-ds-gold/50 bg-gradient-to-r from-white/10 to-white/5 shadow-lg hover:shadow-ds-gold/10 ${center ? 'justify-center gap-3' : 'space-x-4'}`}
        >
            <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent z-0 pointer-events-none"></div>

            <div className="p-3 rounded-full bg-gradient-to-br from-ds-green to-ds-dark border border-ds-gold/30 z-10 shadow-lg shrink-0">
                <Icon size={24} className="text-ds-gold" />
            </div>
            <div className={`z-10 ${center ? 'text-center flex-1' : 'text-left flex-1'}`}>
                <h3 className="font-serif text-lg text-white font-medium group-hover:text-ds-gold transition-colors leading-tight">{label}</h3>
                {subLabel && <p className="text-white text-xs uppercase tracking-wider opacity-90">{subLabel}</p>}
            </div>
            {isExternal && <div className="text-white"><ArrowUpRight size={16} /></div>}
        </motion.button>
    );
};
