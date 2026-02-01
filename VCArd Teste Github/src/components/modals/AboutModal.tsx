import { motion } from 'framer-motion';
import { Info, Download, X } from 'lucide-react';
import { getDirectImageUrl } from '../../utils/helpers';

interface AboutModalProps {
    data: any;
    onClose: () => void;
    onGenerateVCard: () => void;
}

export const AboutModal = ({ data, onClose, onGenerateVCard }: AboutModalProps) => {
    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-ds-dark border border-ds-gold/20 rounded-2xl w-full max-w-sm max-h-[85vh] overflow-y-auto shadow-2xl relative"
            >
                <div className="p-6">
                    {/* Header */}
                    <div className="text-center mb-6">
                        <div className="w-12 h-12 rounded-full bg-ds-green border border-ds-gold mx-auto flex items-center justify-center mb-3 shadow-[0_0_15px_rgba(197,160,89,0.3)]">
                            <Info className="text-ds-gold" size={24} />
                        </div>
                        <h2 className="text-xl font-serif text-white font-bold">{data.aboutTitle}</h2>
                        <div className="h-0.5 w-10 bg-ds-gold mx-auto mt-2"></div>
                    </div>

                    {/* PROFILE IMAGE IN MODAL */}
                    <div className="flex justify-center mb-6">
                        <div className="relative w-24 h-24 rounded-full p-1 border-2 border-ds-gold shadow-lg shadow-ds-gold/20 bg-[#004137]">
                            <img
                                src={getDirectImageUrl(data.avatarUrl)}
                                alt="About Avatar"
                                className="w-full h-full rounded-full object-cover"
                            />
                        </div>
                    </div>

                    {/* About Text */}
                    <div className="mb-8">
                        <h3 className="text-ds-gold text-xs uppercase tracking-widest font-bold mb-4 border-b border-white/10 pb-2">Sobre Mim</h3>
                        <div className="text-white/90 text-sm leading-7 font-light text-justify">
                            {data.aboutText.split('\n').map((paragraph: string, index: number) => (
                                paragraph.trim() && (
                                    <p key={index} className="mb-4 last:mb-0">
                                        {paragraph.trim()}
                                    </p>
                                )
                            ))}
                        </div>
                    </div>

                    {/* VCARD BUTTON IN MODAL */}
                    <button
                        onClick={onGenerateVCard}
                        className="w-full bg-gradient-to-r from-ds-gold to-[#D4AF37] text-ds-green font-bold py-3 rounded-xl shadow-lg hover:shadow-ds-gold/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                        <Download size={20} />
                        <span>Guardar Contacto</span>
                    </button>
                </div>

                <button onClick={onClose} className="absolute top-4 right-4 p-2 text-white/50 hover:text-white bg-black/20 rounded-full">
                    <X size={20} />
                </button>
            </motion.div>
        </div>
    );
};
