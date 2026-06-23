import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../../services/api';
import { ArrowLeft, BookOpen, Compass, ShieldAlert, Award, FileText, Music, Play } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

const GodDetails = () => {
  const { slug } = useParams();
  const { playTrack } = useAudio();
  const [deity, setDeity] = useState(null);
  const [mantras, setMantras] = useState([]);
  const [aartis, setAartis] = useState([]);
  const [chalisas, setChalisas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('stories'); // 'stories', 'mantras', 'aartis', 'chalisas'

  useEffect(() => {
    const fetchDeityDetails = async () => {
      try {
        setLoading(true);
        setError('');
        const [deityRes, mantrasRes, aartisRes, chalisasRes] = await Promise.all([
          API.get(`/spiritual/deities/${slug}`),
          API.get(`/spiritual/deities/${slug}/mantras`),
          API.get(`/spiritual/deities/${slug}/aartis`),
          API.get(`/spiritual/deities/${slug}/chalisas`)
        ]);

        if (deityRes.data && deityRes.data.success) {
          setDeity(deityRes.data.data);
        }
        if (mantrasRes.data && mantrasRes.data.success) {
          setMantras(mantrasRes.data.data);
        }
        if (aartisRes.data && aartisRes.data.success) {
          setAartis(aartisRes.data.data);
        }
        if (chalisasRes.data && chalisasRes.data.success) {
          setChalisas(chalisasRes.data.data);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to retrieve deity details.');
      } finally {
        setLoading(false);
      }
    };

    fetchDeityDetails();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-spiritual-orange"></div>
      </div>
    );
  }

  if (error || !deity) {
    return (
      <div className="max-w-md mx-auto mt-12 p-8 glass-panel text-center rounded-2xl">
        <ShieldAlert className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Deity Not Found</h3>
        <p className="text-slate-400 text-sm mb-6">{error || 'The requested deity details could not be loaded.'}</p>
        <Link to="/gods" className="inline-flex items-center gap-2 text-spiritual-orange hover:underline font-semibold">
          <ArrowLeft className="w-4 h-4" /> Back to Deities
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-8">
      {/* Back navigation */}
      <Link to="/gods" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium">
        <ArrowLeft className="w-4 h-4" /> Back to all Deities
      </Link>

      {/* Hero Banner Grid */}
      <div className="glass-panel rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-12">
        <div className="md:col-span-4 h-64 md:h-auto bg-slate-950">
          <img
            src={deity.imageUrl || deity.thumbnailUrl}
            alt={deity.name}
            className="w-full h-full object-cover opacity-80"
          />
        </div>
        <div className="md:col-span-8 p-6 md:p-10 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-5xl font-display font-bold text-white tracking-wide">{deity.name}</h1>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed font-sans">{deity.description}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 border-t border-slate-800/60 pt-6 text-sm">
            <div>
              <p className="text-slate-500 font-semibold uppercase tracking-wider text-xs">Vahana (Vehicle)</p>
              <p className="text-slate-300 font-medium mt-1">{deity.vehicle || 'Not Specified'}</p>
            </div>
            <div>
              <p className="text-slate-500 font-semibold uppercase tracking-wider text-xs">Astra (Weapon)</p>
              <p className="text-slate-300 font-medium mt-1">{deity.weapon || 'Not Specified'}</p>
            </div>
            <div className="col-span-2 md:col-span-1">
              <p className="text-slate-500 font-semibold uppercase tracking-wider text-xs">Key Festivals</p>
              <p className="text-slate-300 font-medium mt-1">{(deity.festivals || []).join(', ') || 'Not Specified'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Selectors */}
      <div className="flex border-b border-slate-800/80 gap-2">
        <button
          onClick={() => setActiveTab('stories')}
          className={`pb-4 px-4 font-display font-medium text-sm transition-all border-b-2 ${
            activeTab === 'stories' 
              ? 'border-spiritual-orange text-spiritual-orange' 
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Lore & Symbolism
        </button>
        <button
          onClick={() => setActiveTab('mantras')}
          className={`pb-4 px-4 font-display font-medium text-sm transition-all border-b-2 ${
            activeTab === 'mantras' 
              ? 'border-spiritual-orange text-spiritual-orange' 
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Mantras ({mantras.length})
        </button>
        <button
          onClick={() => setActiveTab('aartis')}
          className={`pb-4 px-4 font-display font-medium text-sm transition-all border-b-2 ${
            activeTab === 'aartis' 
              ? 'border-spiritual-orange text-spiritual-orange' 
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Aartis ({aartis.length})
        </button>
        {chalisas.length > 0 && (
          <button
            onClick={() => setActiveTab('chalisas')}
            className={`pb-4 px-4 font-display font-medium text-sm transition-all border-b-2 ${
              activeTab === 'chalisas' 
                ? 'border-spiritual-orange text-spiritual-orange' 
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Chalisa ({chalisas.length})
          </button>
        )}
      </div>

      {/* Tab Panels */}
      <div className="space-y-6">
        {/* STORIES TAB */}
        {activeTab === 'stories' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Mythological Stories */}
            <div className="space-y-6">
              <h3 className="text-xl font-display font-bold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-spiritual-orange" /> Mythological Stories
              </h3>
              {(deity.stories || []).map((story, i) => (
                <div key={i} className="glass-panel p-6 rounded-2xl space-y-3">
                  <h4 className="text-lg font-bold text-white">{story.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{story.content}</p>
                </div>
              ))}
              {(!deity.stories || deity.stories.length === 0) && (
                <p className="text-slate-500 text-sm">No stories available for this deity.</p>
              )}
            </div>

            {/* Right: Symbolism & Attributes */}
            <div className="space-y-6">
              <h3 className="text-xl font-display font-bold text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-spiritual-gold" /> Divine Symbolism
              </h3>
              {(deity.symbolism || []).map((sym, i) => (
                <div key={i} className="glass-panel p-6 rounded-2xl space-y-2">
                  <h4 className="text-base font-bold text-spiritual-gold flex items-center gap-2">
                    <Award className="w-4 h-4" /> {sym.aspect}
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{sym.description}</p>
                </div>
              ))}
              {(!deity.symbolism || deity.symbolism.length === 0) && (
                <p className="text-slate-500 text-sm">No symbolism logs found.</p>
              )}
            </div>
          </div>
        )}

        {/* MANTRAS TAB */}
        {activeTab === 'mantras' && (
          <div className="space-y-6 max-w-3xl">
            {mantras.length === 0 ? (
              <p className="text-slate-500 text-sm text-center p-12 glass-panel rounded-2xl">
                No mantras currently available.
              </p>
            ) : (
              mantras.map((mantra) => (
                <div key={mantra._id} className="glass-panel p-6 rounded-3xl space-y-6 border border-slate-800/40 relative">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <h3 className="text-xl font-display font-bold text-white">{mantra.title}</h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      {mantra.audioFileUrl && (
                        <button
                          onClick={() => playTrack(mantra.title, mantra.audioFileUrl)}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 text-xs font-semibold tracking-wide transition-all border border-indigo-500/20 cursor-pointer"
                        >
                          <Music className="w-3.5 h-3.5" /> Listen Audio
                        </button>
                      )}
                      <Link
                        to={`/chant?mantraId=${mantra._id}`}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-spiritual-orange/15 hover:bg-spiritual-orange/20 text-spiritual-orange hover:text-white text-xs font-semibold tracking-wide transition-all border border-spiritual-orange/20 w-fit"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" /> Launch Japa Counter
                      </Link>
                    </div>
                  </div>

                  {/* Sanskrit original text block */}
                  <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800/30 text-center space-y-4">
                    <p className="text-xl md:text-2xl font-bold leading-loose text-amber-100/90 tracking-wide font-devanagari select-all">
                      {mantra.sanskritText}
                    </p>
                    <p className="text-xs md:text-sm text-slate-400 italic leading-relaxed select-all">
                      {mantra.transliteration}
                    </p>
                  </div>

                  {/* Meaning & Benefits */}
                  <div className="space-y-4 text-sm">
                    <div>
                      <h4 className="font-semibold text-slate-300">Shlok Meaning:</h4>
                      <p className="text-slate-400 mt-1.5 leading-relaxed">{mantra.meaning}</p>
                    </div>

                    {mantra.explanation && (
                      <div>
                        <h4 className="font-semibold text-slate-300">Significance & Method:</h4>
                        <p className="text-slate-400 mt-1.5 leading-relaxed">{mantra.explanation}</p>
                      </div>
                    )}

                    {mantra.benefits && mantra.benefits.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-slate-300">Benefits:</h4>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-400">
                          {mantra.benefits.map((benefit, index) => (
                            <li key={index}>{benefit}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* AARTIS TAB */}
        {activeTab === 'aartis' && (
          <div className="space-y-6 max-w-3xl">
            {aartis.length === 0 ? (
              <p className="text-slate-500 text-sm text-center p-12 glass-panel rounded-2xl">
                No aartis currently available.
              </p>
            ) : (
              aartis.map((aarti) => (
                <div key={aarti._id} className="glass-panel p-6 rounded-3xl space-y-6">
                  <div className="flex justify-between items-center border-b border-slate-800/60 pb-3">
                    <h3 className="text-xl font-display font-bold text-white">{aarti.title}</h3>
                    {aarti.audioFileUrl && (
                      <button
                        onClick={() => playTrack(aarti.title, aarti.audioFileUrl)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 text-xs font-semibold tracking-wide transition-all border border-indigo-500/20 cursor-pointer"
                      >
                        <Music className="w-3.5 h-3.5" /> Listen Audio
                      </button>
                    )}
                  </div>

                  <div className="space-y-8 divide-y divide-slate-800/40">
                    {(aarti.lyrics || []).map((stanza, idx) => (
                      <div key={idx} className={`pt-6 ${idx === 0 ? 'pt-0' : ''} grid grid-cols-1 md:grid-cols-2 gap-4`}>
                        {/* Left column original/sanskrit lyrics */}
                        <div className="space-y-2 text-center md:text-left bg-slate-950/20 p-4 rounded-xl">
                          <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full font-semibold">Stanza {stanza.stanzaNumber}</span>
                          <p className="text-lg font-bold text-amber-100/90 leading-relaxed font-devanagari mt-2 whitespace-pre-line">{stanza.originalText}</p>
                          <p className="text-xs text-slate-400 italic mt-2 whitespace-pre-line leading-relaxed">{stanza.transliteration}</p>
                        </div>
                        {/* Right column meaning lyrics */}
                        <div className="flex flex-col justify-center p-4">
                          <h5 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Meaning</h5>
                          <p className="text-slate-300 text-sm leading-relaxed mt-2 whitespace-pre-line">{stanza.translation}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* CHALISAS TAB */}
        {activeTab === 'chalisas' && (
          <div className="space-y-6 max-w-3xl">
            {chalisas.length === 0 ? (
              <p className="text-slate-500 text-sm text-center p-12 glass-panel rounded-2xl">
                No chalisas currently available.
              </p>
            ) : (
              chalisas.map((chalisa) => (
                <div key={chalisa._id} className="glass-panel p-6 rounded-3xl space-y-6">
                  <div className="flex justify-between items-center border-b border-slate-800/60 pb-3">
                    <h3 className="text-xl font-display font-bold text-white">{chalisa.title}</h3>
                    {chalisa.audioFileUrl && (
                      <button
                        onClick={() => playTrack(chalisa.title, chalisa.audioFileUrl)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 text-xs font-semibold tracking-wide transition-all border border-indigo-500/20 cursor-pointer"
                      >
                        <Music className="w-3.5 h-3.5" /> Listen Audio
                      </button>
                    )}
                  </div>

                  <div className="space-y-6 divide-y divide-slate-800/40">
                    {(chalisa.verses || []).map((verse, idx) => (
                      <div key={idx} className={`pt-6 ${idx === 0 ? 'pt-0' : ''} flex flex-col md:grid md:grid-cols-12 gap-4`}>
                        {/* Verse info */}
                        <div className="md:col-span-2 flex flex-col justify-start items-start gap-1">
                          <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider">
                            {verse.type || 'Chaupai'} {verse.verseNumber}
                          </span>
                        </div>
                        {/* Sacred Text */}
                        <div className="md:col-span-6 space-y-2 text-center md:text-left bg-slate-950/20 p-4 rounded-xl">
                          <p className="text-lg font-bold text-amber-100/90 leading-relaxed font-devanagari whitespace-pre-line">
                            {verse.originalText}
                          </p>
                          {verse.transliteration && (
                            <p className="text-xs text-slate-400 italic whitespace-pre-line leading-relaxed">
                              {verse.transliteration}
                            </p>
                          )}
                        </div>
                        {/* Meaning */}
                        <div className="md:col-span-4 flex flex-col justify-center">
                          <h5 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Meaning</h5>
                          <p className="text-slate-300 text-sm leading-relaxed mt-2 whitespace-pre-line">
                            {verse.translation}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GodDetails;
