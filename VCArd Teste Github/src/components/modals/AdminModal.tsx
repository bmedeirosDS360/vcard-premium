import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Lock, Settings, MessageSquare, Phone, User, Monitor } from 'lucide-react';
import { Data } from '../../data/initialData';

interface AdminModalProps {
    data: Data;
    onSave: (newData: Data) => void;
    onClose: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ data, onSave, onClose }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [formData, setFormData] = useState<Data>(data);
    const [activeTab, setActiveTab] = useState<'geral' | 'integracoes' | 'contato' | 'textos'>('geral');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'admin' || password === '1234') {
            setIsAuthenticated(true);
        } else {
            alert('Password incorreta');
        }
    };

    const handleChange = (field: keyof Data, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleNestedChange = (parent: keyof Data, child: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [parent]: {
                ...(prev[parent] as any),
                [child]: value
            }
        }));
    };

    const renderTabButton = (id: typeof activeTab, label: string, icon: any) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === id
                    ? 'bg-ds-gold text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
        >
            {React.createElement(icon, { size: 16 })}
            {label}
        </button>
    );

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center px-4 bg-black/90 backdrop-blur-md">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-[#0f172a] border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
            >
                {/* HEADER */}
                <div className="flex justify-between items-center p-6 border-b border-white/5 bg-black/20">
                    <div className="flex items-center gap-3">
                        <Settings className="text-ds-gold" />
                        <h2 className="text-xl font-serif font-bold text-white">Área Reservada</h2>
                    </div>
                    <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* CONTENT */}
                <div className="flex-1 overflow-hidden relative">
                    {!isAuthenticated ? (
                        <div className="h-full flex flex-col items-center justify-center p-8">
                            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 w-full max-w-sm text-center">
                                <Lock className="mx-auto text-ds-gold mb-6" size={48} />
                                <h3 className="text-white font-bold text-lg mb-2">Acesso Restrito</h3>
                                <p className="text-white/40 text-sm mb-6">Insira a password de administrador para continuar.</p>
                                <form onSubmit={handleLogin} className="space-y-4">
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-ds-gold transition-colors"
                                        autoFocus
                                    />
                                    <button
                                        type="submit"
                                        className="w-full bg-ds-gold text-black font-bold py-3 rounded-lg hover:bg-[#d4b06a] transition-colors"
                                    >
                                        Entrar
                                    </button>
                                </form>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col">
                            {/* TABS */}
                            <div className="flex gap-2 p-4 border-b border-white/5 overflow-x-auto">
                                {renderTabButton('geral', 'Geral', User)}
                                {renderTabButton('integracoes', 'Integrações & Bots', MessageSquare)}
                                {renderTabButton('contato', 'Contactos', Phone)}
                                {renderTabButton('textos', 'Textos Legais', Monitor)}
                            </div>

                            {/* FORM AREA */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-6">

                                {activeTab === 'geral' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <InputGroup label="Nome Completo" value={formData.name} onChange={(v) => handleChange('name', v)} />
                                        <InputGroup label="Cargo / Título" value={formData.role} onChange={(v) => handleChange('role', v)} />
                                        <InputGroup label="Agência" value={formData.agency} onChange={(v) => handleChange('agency', v)} />
                                        <InputGroup label="Frase de Destaque" value={formData.tagline} onChange={(v) => handleChange('tagline', v)} fullWidth />

                                        <div className="md:col-span-2 mt-4">
                                            <h4 className="text-ds-gold text-sm font-bold uppercase mb-4 border-b border-white/10 pb-2">Imagens URLs</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <InputGroup label="Foto de Perfil" value={formData.avatarUrl} onChange={(v) => handleChange('avatarUrl', v)} />
                                                <InputGroup label="Logo Agência" value={formData.logoUrl} onChange={(v) => handleChange('logoUrl', v)} />
                                                <InputGroup label="Imagem de Capa" value={formData.coverUrl} onChange={(v) => handleChange('coverUrl', v)} />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'integracoes' && (
                                    <div className="space-y-6">
                                        <div className="bg-ds-gold/10 border border-ds-gold/30 rounded-xl p-6">
                                            <div className="flex items-start gap-4">
                                                <div className="bg-ds-gold text-black p-3 rounded-lg">
                                                    <MessageSquare size={24} />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="text-white font-bold text-lg">Typebot.io</h4>
                                                    <p className="text-white/60 text-sm mb-4">Configure o assistente virtual que será aberto no botão principal.</p>

                                                    <InputGroup
                                                        label="URL do Typebot (Viewer URL)"
                                                        value={formData.botEmbedUrl}
                                                        onChange={(v) => handleChange('botEmbedUrl', v)}
                                                        placeholder="https://viewer.typebot.io/..."
                                                        fullWidth
                                                    />
                                                    <p className="text-xs text-white/30 mt-2">
                                                        Copie o link de partilha do seu Typebot e cole aqui. Ex: <code>https://viewer.typebot.io/meu-bot</code>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'contato' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <InputGroup label="Telemóvel" value={formData.phone} onChange={(v) => handleChange('phone', v)} />
                                        <InputGroup label="Email" value={formData.email} onChange={(v) => handleChange('email', v)} />
                                        <InputGroup label="WhatsApp (apenas números)" value={formData.whatsapp} onChange={(v) => handleChange('whatsapp', v)} />
                                        <InputGroup label="Website URL" value={formData.website} onChange={(v) => handleChange('website', v)} />

                                        <div className="md:col-span-2 mt-4">
                                            <h4 className="text-ds-gold text-sm font-bold uppercase mb-4 border-b border-white/10 pb-2">Redes Sociais</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                {/* @ts-ignore */}
                                                <InputGroup label="Facebook" value={formData.social?.facebook} onChange={(v) => handleNestedChange('social', 'facebook', v)} />
                                                {/* @ts-ignore */}
                                                <InputGroup label="Instagram" value={formData.social?.instagram} onChange={(v) => handleNestedChange('social', 'instagram', v)} />
                                                {/* @ts-ignore */}
                                                <InputGroup label="LinkedIn" value={formData.social?.linkedin} onChange={(v) => handleNestedChange('social', 'linkedin', v)} />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'textos' && (
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">Sobre Mim</label>
                                            <textarea
                                                value={formData.aboutText}
                                                onChange={(e) => handleChange('aboutText', e.target.value)}
                                                className="w-full h-40 bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-ds-gold transition-colors resize-none"
                                            />
                                        </div>
                                    </div>
                                )}

                            </div>

                            {/* FOOTER ACTIONS */}
                            <div className="p-6 border-t border-white/5 bg-black/20 flex justify-end gap-3">
                                <button
                                    onClick={onClose}
                                    className="px-6 py-3 rounded-lg text-white font-medium hover:bg-white/5 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={() => onSave(formData)}
                                    className="px-8 py-3 bg-ds-gold text-black font-bold rounded-lg hover:bg-[#d4b06a] transition-all flex items-center gap-2"
                                >
                                    <Save size={18} />
                                    Guardar Alterações
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

const InputGroup = ({ label, value, onChange, fullWidth = false, placeholder = '' }: any) => (
    <div className={fullWidth ? 'col-span-1 md:col-span-2' : ''}>
        <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">{label}</label>
        <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-ds-gold transition-colors"
        />
    </div>
);
