import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { Calendar as CalendarIcon, Sparkles, BookOpen } from 'lucide-react';

const Calendar = () => {
  const [festivals, setFestivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFestivals = async () => {
      try {
        setLoading(true);
        const res = await API.get('/festivals');
        if (res.data && res.data.success) {
          setFestivals(res.data.data);
        }
      } catch (err) {
        console.error(err);
        setError('Could not retrieve festival calendar data.');
      } finally {
        setLoading(false);
      }
    };
    fetchFestivals();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8">
      {/* Title */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight">Hindu Festival Calendar</h1>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          Keep track of holy celebrations, upcoming fasts, traditional pujas, and associated deity rituals.
        </p>
      </div>

      {loading ? (
        <div className="min-h-[40vh] flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-spiritual-orange"></div>
        </div>
      ) : error ? (
        <div className="text-center p-8 bg-red-500/10 border border-red-500/20 text-red-300 rounded-2xl max-w-md mx-auto text-sm">
          {error}
        </div>
      ) : festivals.length === 0 ? (
        <div className="text-center p-12 text-slate-500 text-sm">
          No upcoming festivals logged in the calendar.
        </div>
      ) : (
        <div className="space-y-6">
          {festivals.map((fest) => (
            <div
              key={fest._id}
              className="glass-panel p-6 md:p-8 rounded-3xl border border-slate-800/40 grid grid-cols-1 md:grid-cols-12 gap-6 hover:border-spiritual-orange/15 transition-all duration-300"
            >
              {/* Date Box */}
              <div className="md:col-span-3 flex md:flex-col items-center md:justify-center justify-start gap-4 md:gap-2 bg-slate-950/40 border border-slate-800/30 p-4 rounded-2xl text-center md:h-fit">
                <CalendarIcon className="w-5 h-5 text-spiritual-orange" />
                <div>
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Date</p>
                  <p className="text-lg font-bold text-white mt-1">
                    {new Date(fest.date).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              {/* Info Details */}
              <div className="md:col-span-9 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-xl md:text-2xl font-display font-bold text-white tracking-wide">
                    {fest.title}
                  </h3>
                  {fest.associatedDeityIds && fest.associatedDeityIds.map((deity) => (
                    <span
                      key={deity._id}
                      className="inline-flex items-center gap-1 bg-spiritual-orange/10 border border-spiritual-orange/20 text-spiritual-orange text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider"
                    >
                      <BookOpen className="w-3 h-3" /> {deity.name}
                    </span>
                  ))}
                </div>

                <p className="text-slate-300 text-sm leading-relaxed">{fest.description}</p>

                {fest.significance && (
                  <div className="text-xs bg-slate-950/20 p-3 rounded-xl border border-slate-900/30">
                    <span className="font-semibold text-slate-400 uppercase tracking-widest text-[9px] block mb-1">
                      Divine Significance
                    </span>
                    <span className="text-slate-400 italic leading-relaxed">{fest.significance}</span>
                  </div>
                )}

                {fest.rituals && fest.rituals.length > 0 && (
                  <div className="space-y-2">
                    <h5 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-spiritual-gold" /> Key Rituals & Pujas
                    </h5>
                    <ul className="list-disc pl-5 text-xs text-slate-400 space-y-1.5 leading-relaxed">
                      {fest.rituals.map((ritual, idx) => (
                        <li key={idx}>{ritual}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Calendar;
