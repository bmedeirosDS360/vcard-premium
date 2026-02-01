import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Stop } from 'lucide-react';
import { getVideoEmbedUrl } from '../../utils/helpers';

interface VideoPlayerProps {
    url: string;
}

export const VideoPlayer = ({ url }: VideoPlayerProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    if (!url) return null;
    const isDrive = url.includes('drive.google.com');
    const isDirectFile = url.match(/\.(mp4|webm|ogg|avi|mov)$/i);

    const handlePlay = () => videoRef.current?.play();
    const handlePause = () => videoRef.current?.pause();
    const handleStop = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    return (
        <div className="mb-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-ds-gold/20 bg-black/50 relative group"
            >
                {isDrive && !isDirectFile ? (
                    <iframe
                        src={getVideoEmbedUrl(url)}
                        title="Video"
                        className="w-full h-full"
                        allow="autoplay"
                        allowFullScreen
                    ></iframe>
                ) : (
                    <>
                        <video
                            ref={videoRef}
                            src={url}
                            className="w-full h-full object-cover"
                            controls={false}
                            playsInline
                        />

                        {/* Custom Controls Overlay */}
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button onClick={handlePlay} className="p-2 bg-black/50 rounded-full text-white hover:bg-ds-gold hover:text-ds-green transition-colors"><Play size={20} /></button>
                            <button onClick={handlePause} className="p-2 bg-black/50 rounded-full text-white hover:bg-ds-gold hover:text-ds-green transition-colors"><Pause size={20} /></button>
                            <button onClick={handleStop} className="p-2 bg-black/50 rounded-full text-white hover:bg-ds-gold hover:text-ds-green transition-colors"><Stop size={20} /></button>
                        </div>
                    </>
                )}
            </motion.div>
        </div>
    );
};
