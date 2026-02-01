import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getDirectImageUrl } from '../../utils/helpers';

interface CarouselProps {
    images: string[];
}

export const Carousel = ({ images }: CarouselProps) => {
    const [index, setIndex] = useState(0);

    const nextImage = () => {
        setIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="relative w-full py-4 overflow-hidden group">
            <div className="flex items-center justify-center gap-4 relative h-48">
                <AnimatePresence initial={false} mode='popLayout'>
                    {/* PREV IMAGE (Ghost) */}
                    <motion.div
                        key={index - 1}
                        className="absolute left-[-15%] w-[60%] h-32 opacity-50 blur-[2px] rounded-xl overflow-hidden hidden sm:block pointer-events-none z-0"
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 0.3, scale: 0.8 }}
                        exit={{ x: -100, opacity: 0 }}
                    >
                        <img src={getDirectImageUrl(images[(index - 1 + images.length) % images.length])} className="w-full h-full object-cover" />
                    </motion.div>

                    {/* ACTIVE IMAGE */}
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8, x: 100 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.8, x: -100 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="relative w-[80%] h-48 rounded-2xl overflow-hidden shadow-2xl border border-ds-gold/30 z-20 bg-black/50"
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = offset.x; // + right, - left
                            if (swipe < -50) nextImage();
                            else if (swipe > 50) prevImage();
                        }}
                    >
                        <img
                            src={getDirectImageUrl(images[index])}
                            alt={`Destaque ${index + 1}`}
                            className="w-full h-full object-cover"
                            draggable="false"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
                        <div className="absolute bottom-3 left-4 text-white text-xs font-serif italic tracking-wide">
                            Destaque {index + 1}
                        </div>
                    </motion.div>

                    {/* NEXT IMAGE (Ghost) */}
                    <motion.div
                        key={index + 1}
                        className="absolute right-[-15%] w-[60%] h-32 opacity-50 blur-[2px] rounded-xl overflow-hidden hidden sm:block pointer-events-none z-0"
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 0.3, scale: 0.8 }}
                        exit={{ x: 100, opacity: 0 }}
                    >
                        <img src={getDirectImageUrl(images[(index + 1) % images.length])} className="w-full h-full object-cover" />
                    </motion.div>
                </AnimatePresence>

                {/* Indicators */}
                <div className="absolute -bottom-6 flex gap-2">
                    {images.map((_, i) => (
                        <div
                            key={i}
                            className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? 'w-6 bg-ds-gold' : 'w-1.5 bg-white/20'}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
