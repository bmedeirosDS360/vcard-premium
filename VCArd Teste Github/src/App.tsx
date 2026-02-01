import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QRCode from 'react-qr-code';
import {
  Phone, UserPlus, MessageCircle, Mail, Home, Search, Percent, Users,
  Facebook, Instagram, Linkedin, QrCode, Download, Share2, X
} from 'lucide-react';

import { DEFAULT_DATA } from './data/initialData';
import { getDirectImageUrl, normalizeUrl } from './utils/helpers';

import { SmartLinkItem } from './components/ui/SmartLinkItem';
import { ContactIconBtn } from './components/ui/ContactIconBtn';
import { Carousel } from './components/features/Carousel';
import { VideoPlayer } from './components/features/VideoPlayer';
import { ServicesModal } from './components/modals/ServicesModal';
import { AboutModal } from './components/modals/AboutModal';
import { AdminModal } from './components/modals/AdminModal';

export default function App() {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('vcard_data');
    return saved ? JSON.parse(saved) : DEFAULT_DATA;
  });
  const [showQR, setShowQR] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showLegal, setShowLegal] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  const handleSaveData = (newData: typeof DEFAULT_DATA) => {
    setData(newData);
    localStorage.setItem('vcard_data', JSON.stringify(newData));
    setShowAdmin(false);

    // Force Typebot reload if URL changed
    // @ts-ignore
    if (window.Typebot) {
      // @ts-ignore
      window.Typebot.initPopup({
        typebot: newData.botEmbedUrl || 'https://typebot.co/vcard-x0pcsgu',
        apiHost: 'https://typebot.io',
      });
    }
  };

  // Initializing Typebot Popup
  useEffect(() => {
    const scriptId = 'typebot-script';
    const typebotUrl = (data as any).botEmbedUrl || 'https://typebot.co/vcard-x0pcsgu';

    const initBot = () => {
      // @ts-ignore
      if (window.Typebot) {
        // @ts-ignore
        window.Typebot.initPopup({
          typebot: typebotUrl,
          apiHost: 'https://typebot.io', // Defaulting to official, but library handles if URL is passed
          autoShowDelay: 0,
        });
      }
    };

    if (document.getElementById(scriptId)) {
      initBot();
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://cdn.jsdelivr.net/npm/@typebot.io/js@0.3/dist/web.js';
    script.async = true;
    script.onload = initBot;
    document.body.appendChild(script);

    // Cleanup not strictly necessary for single page app persisting, but good practice
    return () => {
      // document.body.removeChild(script); // Usually we keep it if we navigate back and forth, but here okay.
      // We won't remove it to avoid reloading it unnecessarily if component re-mounts quickly.
    };
  }, [data]);

  const toggleBot = () => {
    // @ts-ignore
    if (window.Typebot) {
      // @ts-ignore
      window.Typebot.open();
    } else {
      console.log('Typebot script loading...');
    }
  };

  const openBotWithFlow = (assunto: string) => {
    // @ts-ignore
    if (window.Typebot) {
      // @ts-ignore
      window.Typebot.setPrefilledVariables({
        'interesse': assunto
      });
      // @ts-ignore
      window.Typebot.open();
    } else {
      console.log("O bot ainda não carregou...");
    }
  };

  const generateVCard = () => {
    const vCardData = `BEGIN:VCARD
VERSION:3.0
N:${data.name};;;;
FN:${data.name} | DS Alverca
ORG:${data.agency}
TITLE:Consultor Imobiliário / Team Leader
TEL;TYPE=CELL:${data.phone}
EMAIL:${data.email}
URL:${data.website}
ADR;TYPE=WORK:;;${data.location};;;;
NOTE:Especialista Imobiliário e Intermediário de Crédito em Alverca
END:VCARD`;

    const blob = new Blob([vCardData], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${data.name.replace(' ', '_')}.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const shareContact = async () => {
    const urlToShare = data.shareUrl || window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: data.name,
          text: `Contacte ${data.name}`,
          url: urlToShare,
        });
      } catch (err) { console.log(err); }
    } else {
      try {
        await navigator.clipboard.writeText(urlToShare);
        alert('Link copiado!');
      } catch (e) { alert('Copie o link do navegador.'); }
    }
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(`Olá ${data.name}, gostaria de iniciar o atendimento automático.`);
    window.open(`https://wa.me/${data.whatsapp}?text=${text}`, '_blank');
  };

  const openPhone = () => { window.open(`tel:${data.phone}`); };
  const openEmail = () => { window.open(`mailto:${data.email}`); };

  // Text Modal Component (Inline for simplicity or move later)
  const TextModal = ({ title, text, onClose }: { title: string, text: string, onClose: () => void }) => (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-ds-dark border border-ds-gold/20 rounded-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto relative p-6 shadow-2xl"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white p-1">
          <X size={24} />
        </button>
        <h3 className="font-serif font-bold text-xl text-ds-gold mb-4 border-b border-white/10 pb-2">{title}</h3>
        <div className="text-white/80 text-sm leading-relaxed whitespace-pre-wrap font-light text-justify">
          {text}
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-[100dvh] relative font-sans text-white overflow-x-hidden pb-32">

      {/* Background Gradient */}
      <div className="fixed top-[-20%] left-[-20%] w-[140%] h-[80%] bg-[radial-gradient(circle,rgba(197,160,89,0.08)_0%,rgba(0,59,43,0)_70%)] pointer-events-none z-0"></div>

      {/* HEADER */}
      <header className="pt-8 pb-4 px-6 text-center relative z-10 w-full overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 mt-4"
        >
          <img
            src={getDirectImageUrl(data.logoUrl)}
            alt="Logo Decisões e Soluções"
            className="h-24 mx-auto object-contain drop-shadow-gold filter brightness-110"
          />
        </motion.div>

        {/* COVER PHOTO SECTION */}
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full max-w-md mx-auto h-48 mb-8 rounded-2xl overflow-hidden bg-[#004137] border border-ds-gold/30 relative shadow-[0_0_25px_rgba(197,160,89,0.4)] group"
        >
          <img
            src={getDirectImageUrl(data.coverUrl)}
            alt="Capa"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="relative w-36 h-36 mx-auto mt-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="relative w-full h-full"
          >
            <div className="absolute inset-0 rounded-full animate-pulse-gold bg-[#004137] -z-10"></div>
            <img
              src={getDirectImageUrl(data.avatarUrl)}
              alt="Avatar"
              className="w-full h-full object-cover rounded-full border-[3px] border-ds-gold shadow-[0_0_35px_rgba(197,160,89,0.5)] relative z-20 bg-[#004137]"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-4"
        >
          <h2 className="text-3xl font-serif font-bold mb-1 text-white drop-shadow-md">{data.name}</h2>
          <div className="h-0.5 w-12 bg-ds-gold mx-auto my-3 shadow-[0_0_10px_rgba(197,160,89,0.8)]"></div>
          <p className="text-ds-gold text-sm uppercase tracking-widest font-semibold drop-shadow-sm">{data.role}</p>
          {data.tagline && (
            <p className="text-white text-xs mt-2 italic font-light tracking-wide max-w-xs mx-auto opacity-90">
              "{data.tagline}"
            </p>
          )}
          <p className="text-white text-[10px] mt-4 tracking-wider">{data.agency}</p>
        </motion.div>
      </header>

      {/* MAIN */}
      <main className="px-5 space-y-6 max-w-md mx-auto relative z-10">

        {/* CONTACT ROW */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center items-center gap-4 py-2"
        >
          <ContactIconBtn icon={Phone} onClick={openPhone} label="Ligar Urgente" />
          <ContactIconBtn icon={UserPlus} onClick={generateVCard} label="Guardar" />
          <ContactIconBtn icon={MessageCircle} onClick={openWhatsApp} label="Duvidas Rápidas" />
          <ContactIconBtn icon={Mail} onClick={openEmail} label="Propostas e Docs" />
        </motion.div>

        {/* VIDEO SECTION */}
        <VideoPlayer url={data.videoUrl} />

        {/* MAIN CTA BUTTON - ASSISTANT */}
        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          onClick={toggleBot}
          className="w-full bg-[#C5A059] text-black p-4 rounded-2xl relative flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(197,160,89,0.6)] animate-pulse-gold group overflow-hidden border border-white/20"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          <MessageCircle className="animate-pulse" size={24} />
          <div className="flex flex-col items-center leading-tight text-center">
            <span className="font-bold tracking-wide uppercase text-sm mb-0.5">Falar com Assistente!</span>
            <span className="text-[10px] font-medium opacity-90 normal-case tracking-wide">Experiência digital personalizada 24h por dia</span>
          </div>
        </motion.button>

        {/* GRID */}
        <div className="pt-2 pb-6">
          <SmartLinkItem icon={Home} label="Quanto vale o meu Imóvel?" subLabel="Valor de Mercado" onClick={() => openBotWithFlow('avaliacao')} />
          <SmartLinkItem icon={Search} label="Encontrar o Imóvel Ideal!" subLabel="Comprar" onClick={() => openBotWithFlow('comprar')} />
          <SmartLinkItem icon={Percent} label="Poupar no Crédito e Seguros" subLabel="Simulação Gratuita" onClick={() => openBotWithFlow('credito')} />
          <SmartLinkItem icon={Users} label="Trabalhar na minha Equipa" subLabel="Recrutamento" onClick={() => openBotWithFlow('recrutamento')} />

          <div className="flex gap-2">
            <SmartLinkItem icon={Home} label="Decisões e Soluções 360º" onClick={() => setShowServices(true)} center={true} />
            <SmartLinkItem icon={Home} label="Sobre Mim" onClick={() => setShowAbout(true)} center={true} />
          </div>
        </div>

        {/* CAROUSEL */}
        {data.carousel && data.carousel.length > 0 && (
          <Carousel images={data.carousel} />
        )}

        {/* SOCIAL */}
        <div className="text-center mt-6 mb-2">
          <p className="text-ds-gold text-xs uppercase tracking-widest font-semibold mb-4">Conheça o meu percurso e visão</p>
          <div className="flex justify-center space-x-6">
            <div className="flex flex-col items-center gap-2">
              <motion.a href={normalizeUrl(data.social.facebook)} target="_blank" whileHover={{ y: -3, color: '#C5A059', opacity: 1, scale: 1.1 }} className="text-white transition-all p-3 bg-white/5 rounded-full border border-white/10 hover:bg-white/10"><Facebook size={20} /></motion.a>
              <span className="text-[10px] text-white font-medium uppercase tracking-wider opacity-90">Mercado e Oportunidades</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <motion.a href={normalizeUrl(data.social.instagram)} target="_blank" whileHover={{ y: -3, color: '#C5A059', opacity: 1, scale: 1.1 }} className="text-white transition-all p-3 bg-white/5 rounded-full border border-white/10 hover:bg-white/10"><Instagram size={20} /></motion.a>
              <span className="text-[10px] text-white font-medium uppercase tracking-wider opacity-90">O meu dia a dia</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <motion.a href={normalizeUrl(data.social.linkedin)} target="_blank" whileHover={{ y: -3, color: '#C5A059', opacity: 1, scale: 1.1 }} className="text-white transition-all p-3 bg-white/5 rounded-full border border-white/10 hover:bg-white/10"><Linkedin size={20} /></motion.a>
              <span className="text-[10px] text-white font-medium uppercase tracking-wider opacity-90">Percurso Profissional</span>
            </div>
          </div>
        </div>

        {/* LINKS FOOTER */}
        <div className="text-center pb-8 pt-2 flex flex-col items-center gap-3">
          <div className="flex justify-center space-x-6 items-center">
            <button onClick={() => setShowPrivacy(true)} className="text-xs text-white hover:text-ds-gold transition-colors underline decoration-dotted">Políticas de Privacidade</button>
            <div className="text-white/30">|</div>
            <button onClick={() => setShowLegal(true)} className="text-xs text-white hover:text-ds-gold transition-colors underline decoration-dotted">Aviso Legal</button>
          </div>
          <button onClick={() => setShowAdmin(true)} className="text-[10px] text-white/20 hover:text-ds-gold transition-colors uppercase tracking-widest mt-2">Área Reservada</button>
          <p className="text-[10px] text-white/20 mt-2 font-light">
            Powered by <a href="#" className="hover:text-ds-gold transition-colors">Jsoc360</a> &copy; {new Date().getFullYear()}
          </p>
        </div>

      </main>

      {/* STICKY FOOTER */}
      <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pt-2 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))]">
        <div className="max-w-md mx-auto bg-black/80 backdrop-blur-xl rounded-2xl border border-ds-gold/20 p-2 flex justify-between items-center shadow-[0_0_20px_rgba(0,0,0,0.5)]">
          {/* QR */}
          <button onClick={() => setShowQR(true)} className="flex-1 flex flex-col items-center py-2 text-white/50 hover:text-ds-gold transition-colors group">
            <QrCode size={20} className="mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-[9px] uppercase tracking-widest font-medium">QR Code</span>
          </button>

          <div className="w-[1px] h-8 bg-white/10"></div>

          {/* SAVE */}
          <button onClick={generateVCard} className="flex-1 flex flex-col items-center py-2 text-ds-gold font-bold relative -top-5">
            <div className="bg-ds-gold p-3 rounded-full mb-1 border-4 border-[#001A15] shadow-[0_0_15px_rgba(197,160,89,0.4)] hover:scale-110 transition-transform">
              <UserPlus size={24} className="text-ds-green" />
            </div>
            <span className="text-[9px] uppercase tracking-widest font-bold">Guardar</span>
          </button>

          <div className="w-[1px] h-8 bg-white/10"></div>

          {/* SHARE */}
          <button onClick={shareContact} className="flex-1 flex flex-col items-center py-2 text-white/50 hover:text-ds-gold transition-colors group">
            <Share2 size={20} className="mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-[9px] uppercase tracking-widest font-medium">Partilhar</span>
          </button>
        </div>
      </div>

      {/* MODALS */}
      {showServices && <ServicesModal data={data} onClose={() => setShowServices(false)} />}
      {showAbout && <AboutModal data={data} onClose={() => setShowAbout(false)} onGenerateVCard={generateVCard} />}
      {showPrivacy && <TextModal title="Política de Privacidade" text={data.privacyText} onClose={() => setShowPrivacy(false)} />}
      {showLegal && <TextModal title="Aviso Legal" text={data.legalText} onClose={() => setShowLegal(false)} />}
      {showAdmin && <AdminModal data={data} onSave={handleSaveData} onClose={() => setShowAdmin(false)} />}

      {/* QR MODAL */}
      <AnimatePresence>
        {showQR && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowQR(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-8 max-w-sm w-full text-center relative"
            >
              <button onClick={() => setShowQR(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800">
                <X size={24} />
              </button>
              <h3 className="text-ds-green font-serif text-2xl font-bold mb-2">Seu Cartão Digital</h3>
              <p className="text-gray-500 text-sm mb-6">Aponte a câmara para conectar</p>
              <div className="bg-white p-2 rounded-xl border-2 border-ds-gold/20 inline-block mb-6 shadow-inner">
                <QRCode value={window.location.href} size={200} fgColor="#003B2B" bgColor="#FFFFFF" />
              </div>
              <div className="flex justify-center">
                <img src={getDirectImageUrl(data.avatarUrl)} className="w-10 h-10 rounded-full border border-gray-200" alt="Avatar" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
