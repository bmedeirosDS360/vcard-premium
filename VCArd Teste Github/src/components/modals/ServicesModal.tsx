import { motion } from 'framer-motion';
import { Briefcase, Phone, Mail, MessageCircle, MapPin, Star, X } from 'lucide-react';

interface ServicesModalProps {
    data: any;
    onClose: () => void;
}

export const ServicesModal = ({ data, onClose }: ServicesModalProps) => {
    const services = [
        { name: "Mediação Imobiliária", desc: "Compra, Venda e Arrendamento de Imóveis" },
        { name: "Intermediação de Crédito", desc: "Habitação, Pessoal, Transferências e Consolidados" },
        { name: "Mediação de Seguros", desc: "Vida, Multirriscos, Saúde, Auto e Acidentes" },
        { name: "Obras e Remodelações", desc: "Projetos, Remodelações e Obras Gerais" },
        { name: "Construção de Casas", desc: "Soluções Chave-na-mão" }
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
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
                            <Briefcase className="text-ds-gold" size={24} />
                        </div>
                        <h2 className="text-xl font-serif text-white font-bold">Serviços 360º</h2>
                        <div className="h-0.5 w-10 bg-ds-gold mx-auto mt-2"></div>
                    </div>

                    {/* Services List */}
                    <div className="mb-8">
                        <h3 className="text-ds-gold text-xs uppercase tracking-widest font-bold mb-4 border-b border-white/10 pb-2">Soluções 360º DS</h3>
                        <ul className="space-y-3">
                            {services.map((s, i) => (
                                <li key={i} className="flex flex-col">
                                    <span className="text-white font-medium text-sm flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-ds-gold"></span>
                                        {s.name}
                                    </span>
                                    <span className="text-white/60 text-xs pl-3.5">{s.desc}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contacts Summary */}
                    <div className="mb-6">
                        <h3 className="text-ds-gold text-xs uppercase tracking-widest font-bold mb-4 border-b border-white/10 pb-2">Meus Contatos</h3>
                        <div className="space-y-3 text-sm text-white/80">
                            <div className="flex items-center gap-3">
                                <Phone size={16} className="text-ds-gold" />
                                <span>{data.phone}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail size={16} className="text-ds-gold" />
                                <span className="break-all">{data.email}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <MessageCircle size={16} className="text-ds-gold" />
                                <span>WhatsApp: {data.whatsapp}</span>
                            </div>
                        </div>
                    </div>

                    {/* Agency Summary */}
                    <div>
                        <h3 className="text-ds-gold text-xs uppercase tracking-widest font-bold mb-4 border-b border-white/10 pb-2">Minha Agência</h3>
                        <div className="text-sm text-white/80">
                            <p className="font-serif text-white font-bold mb-1">{data.agency}</p>
                            <div className="flex items-start gap-3 mt-2 mb-4">
                                <MapPin size={16} className="text-ds-gold shrink-0 mt-0.5" />
                                <p>{data.location}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                {data.locationLink && (
                                    <a href={data.locationLink} target="_blank" className="text-center text-xs text-ds-gold border border-ds-gold/30 px-3 py-2 rounded-lg hover:bg-ds-gold hover:text-ds-green transition-colors flex items-center justify-center gap-2">
                                        <MapPin size={14} />
                                        Ver no Mapa
                                    </a>
                                )}
                                {data.googleReviews && (
                                    <a href={data.googleReviews} target="_blank" className="text-center text-xs text-ds-gold border border-ds-gold/30 px-3 py-2 rounded-lg hover:bg-ds-gold hover:text-ds-green transition-colors flex items-center justify-center gap-2">
                                        <Star size={14} />
                                        Avaliações
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <button onClick={onClose} className="absolute top-4 right-4 p-2 text-white/50 hover:text-white bg-black/20 rounded-full">
                    <X size={20} />
                </button>
            </motion.div>
        </div>
    );
};
