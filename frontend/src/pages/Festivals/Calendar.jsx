import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { Calendar as CalendarIcon, Sparkles, Sun, Moon, Star, Sunrise, Sunset } from 'lucide-react';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  });
  const [panchang, setPanchang] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPanchang = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await API.get(`/panchang/${selectedDate}`);
        if (res.data && res.data.success) {
          setPanchang(res.data.data);
        } else {
          setError('Could not retrieve panchang data for this date.');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch panchang. Please try again later.');
        setPanchang(null);
      } finally {
        setLoading(false);
      }
    };
    if (selectedDate) {
      fetchPanchang();
    }
  }, [selectedDate]);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8">
      {/* Title */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight">Daily Panchang & Festivals</h1>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          View today's Tithi, Nakshatra, Sunrise, Sunset, and holy celebrations. Data is securely cached for lightning-fast reading.
        </p>
      </div>

      {/* Date Picker */}
      <div className="max-w-xs mx-auto relative">
        <div className="bg-slate-900 border border-slate-700 p-2 rounded-2xl flex items-center justify-center gap-4">
          <CalendarIcon className="w-5 h-5 text-spiritual-orange" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-transparent text-white font-semibold focus:outline-hidden cursor-pointer"
          />
        </div>
      </div>

      {loading ? (
        <div className="min-h-[40vh] flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-spiritual-orange"></div>
        </div>
      ) : error ? (
        <div className="text-center p-8 bg-red-500/10 border border-red-500/20 text-red-300 rounded-2xl max-w-md mx-auto text-sm">
          {error}
        </div>
      ) : panchang ? (
        <div className="space-y-6 animate-fade-in">
          <div className="glass-panel p-6 md:p-8 rounded-3xl border border-slate-800/40 hover:border-spiritual-orange/15 transition-all duration-300">
            <div className="text-center mb-8 pb-6 border-b border-slate-800/50">
              <h2 className="text-2xl font-bold text-white tracking-wide">
                {new Date(panchang.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="p-4 bg-slate-900/50 rounded-2xl border border-slate-800/50 flex flex-col items-center">
                <Moon className="w-6 h-6 text-spiritual-orange mb-2" />
                <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Tithi</span>
                <span className="text-white font-medium">{panchang.tithi}</span>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-2xl border border-slate-800/50 flex flex-col items-center">
                <Star className="w-6 h-6 text-spiritual-gold mb-2" />
                <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Nakshatra</span>
                <span className="text-white font-medium">{panchang.nakshatra}</span>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-2xl border border-slate-800/50 flex flex-col items-center">
                <Sun className="w-6 h-6 text-yellow-500 mb-2" />
                <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Paksha</span>
                <span className="text-white font-medium">{panchang.paksha}</span>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-2xl border border-slate-800/50 flex flex-col items-center">
                <Sparkles className="w-6 h-6 text-purple-400 mb-2" />
                <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Yoga</span>
                <span className="text-white font-medium">{panchang.yoga}</span>
              </div>
            </div>

            <div className="flex justify-center gap-8 mt-8">
              <div className="flex items-center gap-2">
                <Sunrise className="w-5 h-5 text-orange-400" />
                <span className="text-sm text-slate-300">Sunrise: {panchang.sunrise}</span>
              </div>
              <div className="flex items-center gap-2">
                <Sunset className="w-5 h-5 text-orange-600" />
                <span className="text-sm text-slate-300">Sunset: {panchang.sunset}</span>
              </div>
            </div>

            {panchang.festivals && panchang.festivals.length > 0 && (
              <div className="mt-8 pt-6 border-t border-slate-800/50">
                <h3 className="text-lg font-bold text-white mb-4 text-center">Festivals Today</h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {panchang.festivals.map((fest, idx) => (
                    <span key={idx} className="bg-spiritual-orange/10 border border-spiritual-orange/30 text-spiritual-orange px-4 py-2 rounded-full text-sm font-medium">
                      {fest}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center p-12 text-slate-500 text-sm">
          Select a date to view Panchang details.
        </div>
      )}
    </div>
  );
};

export default Calendar;
