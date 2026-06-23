import React, { createContext, useState, useContext, useRef, useEffect } from 'react';
import { Play, Pause, Square, Music } from 'lucide-react';

const AudioContext = createContext();

export const useAudio = () => useContext(AudioContext);

export const AudioProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null); // { title: string, url: string }
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Initialize Audio element
  useEffect(() => {
    audioRef.current = new Audio();
    const audio = audioRef.current;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTrack(null);
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
    };
  }, []);

  const playTrack = (title, url) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (currentTrack && currentTrack.url === url) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play().catch(e => console.log('Playback error', e));
      }
      return;
    }

    audio.pause();
    audio.src = url;
    setCurrentTrack({ title, url });
    audio.play().catch(e => console.log('Playback error', e));
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(e => console.log('Playback error', e));
    }
  };

  const stopTrack = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setCurrentTrack(null);
    setIsPlaying(false);
  };

  return (
    <AudioContext.Provider value={{ currentTrack, isPlaying, playTrack, togglePlay, stopTrack }}>
      {children}
      {currentTrack && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg px-4 animate-slide-up">
          <div className="glass-panel border border-spiritual-orange/30 bg-slate-950/90 text-white rounded-2xl p-4 shadow-2xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-spiritual-orange/10 flex items-center justify-center text-spiritual-orange shrink-0 animate-spin" style={{ animationDuration: '6s' }}>
                <Music className="w-5 h-5" />
              </div>
              <div className="overflow-hidden">
                <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Now Listening</p>
                <h4 className="text-sm font-semibold truncate text-white">{currentTrack.title}</h4>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={togglePlay}
                className="p-2.5 rounded-full bg-spiritual-orange text-white hover:bg-spiritual-orange-dark transition-colors shadow-lg shadow-spiritual-orange/15"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              </button>
              <button
                onClick={stopTrack}
                className="p-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                title="Stop & Close"
              >
                <Square className="w-4 h-4 fill-current text-slate-400" />
              </button>
            </div>
          </div>
        </div>
      )}
    </AudioContext.Provider>
  );
};
