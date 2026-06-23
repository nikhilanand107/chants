import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import API from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Play, RotateCcw, Check, Sparkles, Flame, Volume2, VolumeX, ArrowLeft } from 'lucide-react';

const ChantingCounter = () => {
  const [searchParams] = useSearchParams();
  const mantraParamId = searchParams.get('mantraId');
  const navigate = useNavigate();
  const { refreshStats, user } = useAuth();

  const [mantras, setMantras] = useState([]);
  const [selectedMantra, setSelectedMantra] = useState(null);
  const [count, setCount] = useState(0);
  const [goal, setGoal] = useState(108);
  const [customGoal, setCustomGoal] = useState('');
  const [isCustomGoalActive, setIsCustomGoalActive] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [isTapping, setIsTapping] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const startTimeRef = useRef(null);

  // Load all available mantras
  useEffect(() => {
    const fetchMantras = async () => {
      try {
        const res = await API.get('/spiritual/mantras');
        if (res.data && res.data.success) {
          const list = res.data.data;
          setMantras(list);
          // If query param exists, pre-select it
          if (mantraParamId) {
            const matched = list.find((m) => m._id === mantraParamId);
            if (matched) setSelectedMantra(matched);
          } else if (list.length > 0) {
            setSelectedMantra(list[0]);
          }
        }
      } catch (err) {
        console.error('Failed to load mantras', err);
      }
    };
    fetchMantras();
    startTimeRef.current = new Date();
  }, [mantraParamId]);

  // Handle selected mantra changing manually
  const handleMantraChange = (e) => {
    const matched = mantras.find((m) => m._id === e.target.value);
    if (matched) {
      setSelectedMantra(matched);
      setCount(0); // Reset count on mantra swap
      startTimeRef.current = new Date();
    }
  };

  // Synthesize soft singing bowl chime sound on tap using Web Audio API
  const playChimeSound = () => {
    if (!isSoundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      // Bell-like high frequency decaying sine wave
      osc.type = 'sine';
      osc.frequency.setValueAtTime(659.25, ctx.currentTime); // E5 note (clear bell tone)
      osc.frequency.exponentialRampToValueAtTime(329.63, ctx.currentTime + 0.12); // Decay to E4

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch (e) {
      console.log('Web Audio context blocked or unsupported', e);
    }
  };

  const handleTap = () => {
    if (!selectedMantra) return;
    setCount((prev) => prev + 1);
    setIsTapping(true);
    playChimeSound();

    // Haptic vibration feedback for mobile layouts
    if (navigator.vibrate) {
      navigator.vibrate(15);
    }

    setTimeout(() => {
      setIsTapping(false);
    }, 100);
  };

  const handleReset = () => {
    if (window.confirm('Reset current session count?')) {
      setCount(0);
      startTimeRef.current = new Date();
    }
  };

  const handleGoalPreset = (preset) => {
    setIsCustomGoalActive(false);
    setGoal(preset);
  };

  const handleCustomGoalSubmit = (e) => {
    e.preventDefault();
    const val = parseInt(customGoal);
    if (val > 0) {
      setGoal(val);
      setIsCustomGoalActive(false);
    }
  };

  const handleSaveSession = async () => {
    if (count === 0) return;
    try {
      setSaving(true);
      setMessage('');
      const endTime = new Date();
      const durationSeconds = Math.round((endTime - startTimeRef.current) / 1000);

      const res = await API.post('/chant/sessions', {
        mantraId: selectedMantra._id,
        count,
        goal,
        durationSeconds
      });

      if (res.data && res.data.success) {
        setMessage('Session saved successfully!');
        setCount(0);
        startTimeRef.current = new Date();
        // Refresh local stats
        await refreshStats();
        // Redirect back to dashboard after 1.5 seconds
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      }
    } catch (error) {
      console.error(error);
      setMessage('Failed to save chanting session data.');
    } finally {
      setSaving(false);
    }
  };

  const progressPercent = Math.min(Math.round((count / goal) * 100), 100);

  return (
    <div className="max-w-xl mx-auto p-4 md:p-8 space-y-8 flex flex-col items-center">
      {/* Top Header */}
      <div className="w-full flex justify-between items-center">
        <Link to="/dashboard" className="text-slate-400 hover:text-white inline-flex items-center gap-1 text-sm font-medium">
          <ArrowLeft className="w-4 h-4" /> Exit
        </Link>
        <button
          onClick={() => setIsSoundEnabled(!isSoundEnabled)}
          className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          title={isSoundEnabled ? 'Disable Chime Sound' : 'Enable Chime Sound'}
        >
          {isSoundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </button>
      </div>

      {/* Mantra selector panel */}
      <div className="w-full glass-panel p-6 rounded-2xl space-y-4">
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Active Mantra</label>
        <select
          value={selectedMantra?._id || ''}
          onChange={handleMantraChange}
          className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-white focus:outline-hidden focus:border-spiritual-orange transition-all text-sm"
        >
          {mantras.map((m) => (
            <option key={m._id} value={m._id}>
              {m.title}
            </option>
          ))}
        </select>

        {selectedMantra && (
          <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/30 text-center">
            <p className="text-sm font-devanagari text-amber-100/90 whitespace-pre-line tracking-wide leading-relaxed font-semibold">
              {selectedMantra.sanskritText}
            </p>
          </div>
        )}
      </div>

      {/* Goal configuration */}
      <div className="w-full flex flex-wrap justify-between items-center gap-4 border-t border-b border-slate-800/40 py-4">
        <div className="flex gap-2">
          <button
            onClick={() => handleGoalPreset(108)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${
              goal === 108 && !isCustomGoalActive
                ? 'bg-spiritual-orange/15 border-spiritual-orange text-spiritual-orange'
                : 'border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            108 Preset
          </button>
          <button
            onClick={() => handleGoalPreset(1008)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${
              goal === 1008 && !isCustomGoalActive
                ? 'bg-spiritual-orange/15 border-spiritual-orange text-spiritual-orange'
                : 'border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            1008 Preset
          </button>
          <button
            onClick={() => setIsCustomGoalActive(true)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${
              isCustomGoalActive
                ? 'bg-spiritual-orange/15 border-spiritual-orange text-spiritual-orange'
                : 'border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Custom Goal
          </button>
        </div>
        <div className="text-xs text-slate-400">
          Target: <span className="font-mono font-bold text-white text-sm">{goal}</span>
        </div>

        {isCustomGoalActive && (
          <form onSubmit={handleCustomGoalSubmit} className="w-full flex gap-2 mt-2">
            <input
              type="number"
              value={customGoal}
              onChange={(e) => setCustomGoal(e.target.value)}
              placeholder="Enter target (e.g. 54)"
              className="bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-white text-xs grow focus:outline-hidden focus:border-spiritual-orange"
              required
            />
            <button
              type="submit"
              className="bg-spiritual-orange text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-spiritual-orange-dark"
            >
              Set
            </button>
          </form>
        )}
      </div>

      {/* Main Tapping Ring Counter */}
      <div className="flex flex-col items-center space-y-4 py-4 select-none">
        <button
          onClick={handleTap}
          className={`w-64 h-64 rounded-full border-4 border-slate-800/80 bg-linear-to-b from-slate-950 to-slate-900 flex flex-col justify-center items-center relative overflow-hidden transition-all shadow-2xl ${
            isTapping ? 'scale-95 border-spiritual-orange shadow-spiritual-orange/10' : 'hover:border-slate-700'
          }`}
          style={{ cursor: 'pointer', outline: 'none' }}
        >
          {/* Dynamic inner completion ripple */}
          <div
            className="absolute bottom-0 left-0 right-0 bg-spiritual-orange/5 transition-all duration-300"
            style={{ height: `${progressPercent}%` }}
          ></div>

          {/* Current Taps Count */}
          <div className="relative z-10 text-center space-y-1">
            <p className="text-5xl md:text-6xl font-display font-bold text-white font-mono tracking-tight">{count}</p>
            <p className="text-slate-500 text-xs font-medium uppercase tracking-widest mt-1">Tap to Chant</p>
          </div>

          {/* Golden sparks if goal reached */}
          {count >= goal && (
            <div className="absolute top-4 text-spiritual-gold animate-bounce">
              <Sparkles className="w-6 h-6 fill-current" />
            </div>
          )}
        </button>

        <div className="w-48 text-center">
          <p className="text-xs text-slate-500">Tap screen or click button to increment</p>
        </div>
      </div>

      {/* Progress slider bar */}
      <div className="w-full space-y-2">
        <div className="flex justify-between text-xs font-semibold text-slate-400">
          <span>Progress</span>
          <span className="font-mono">{progressPercent}%</span>
        </div>
        <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-900">
          <div
            className="bg-linear-to-r from-spiritual-orange to-spiritual-gold h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Message alerts */}
      {message && (
        <div className="w-full bg-slate-950 border border-spiritual-orange/30 text-spiritual-orange text-xs py-3 px-4 rounded-xl text-center font-medium animate-pulse">
          {message}
        </div>
      )}

      {/* Control Buttons */}
      <div className="w-full flex gap-4 pt-4">
        <button
          onClick={handleReset}
          disabled={count === 0}
          className="flex-1 py-3 px-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white font-medium flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-sm"
        >
          <RotateCcw className="w-4 h-4" /> Reset
        </button>
        <button
          onClick={handleSaveSession}
          disabled={count === 0 || saving}
          className="flex-1 py-3 px-4 rounded-xl bg-linear-to-r from-spiritual-orange to-spiritual-gold text-white font-semibold flex items-center justify-center gap-2 transition-all transform hover:shadow-lg hover:shadow-spiritual-orange/10 disabled:opacity-40 disabled:cursor-not-allowed text-sm"
        >
          <Check className="w-4 h-4" /> {saving ? 'Saving...' : 'Save & Exit'}
        </button>
      </div>
    </div>
  );
};

export default ChantingCounter;
