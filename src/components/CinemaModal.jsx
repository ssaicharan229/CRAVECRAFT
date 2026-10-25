import React, { useRef, useState } from "react";
import { X, Play, Pause, RotateCcw, Volume2, VolumeX, FastForward } from "lucide-react";
import { playClickSound } from "../utils/audioAmbiance";

export default function CinemaModal({ dish, onClose }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    playClickSound();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const cycleSpeed = () => {
    playClickSound();
    if (!videoRef.current) return;
    const speeds = [0.5, 1, 1.5];
    const nextIdx = (speeds.indexOf(playbackRate) + 1) % speeds.length;
    const nextSpeed = speeds[nextIdx];
    videoRef.current.playbackRate = nextSpeed;
    setPlaybackRate(nextSpeed);
  };

  const handleRestart = () => {
    playClickSound();
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 sm:p-8 animate-fade-in">
      <div className="relative w-full max-w-5xl bg-[#08090d] border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        
        {/* Cinema Header */}
        <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <div>
            <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block">
              4K Cinematic Masterpiece Film
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-syne text-white">
              {dish.name}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 text-white/60 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Box */}
        <div className="relative aspect-[16/9] w-full bg-black flex items-center justify-center">
          <video
            ref={videoRef}
            src={dish.videoSrc}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-contain"
          />

          {/* Quick HUD controls overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3 bg-black/60 border border-white/10 rounded-2xl backdrop-blur-md">
            
            <div className="flex items-center gap-2">
              <button
                onClick={togglePlay}
                className="p-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl transition-all font-bold"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>

              <button
                onClick={handleRestart}
                className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all"
                title="Restart"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={cycleSpeed}
                className="px-3 py-2 bg-white/10 hover:bg-white/20 text-amber-400 text-xs font-mono font-bold rounded-xl transition-all"
                title="Change Playback Speed"
              >
                {playbackRate}x {playbackRate === 0.5 ? "Slow-Mo" : ""}
              </button>
            </div>

            <div className="text-xs text-white/60 font-mono">
              1080p Full Ultra-HD • 24 FPS Cinematic Sequence
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
