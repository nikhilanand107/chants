import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../services/api';
import { Search, Compass } from 'lucide-react';

const GodList = () => {
  const [deities, setDeities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [wikiData, setWikiData] = useState(null);
  const [wikiLoading, setWikiLoading] = useState(false);

  useEffect(() => {
    const fetchDeities = async () => {
      try {
        setLoading(true);
        const res = await API.get('/spiritual/deities');
        if (res.data && res.data.success) {
          setDeities(res.data.data);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch deities information.');
      } finally {
        setLoading(false);
      }
    };
    fetchDeities();
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setWikiData(null);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setWikiLoading(true);
        const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(search.trim())}`);
        if (res.ok) {
          const data = await res.json();
          if (data.type !== 'disambiguation' && data.extract) {
            setWikiData({
              title: data.title,
              extract: data.extract,
              thumbnail: data.thumbnail?.source || null,
              content_urls: data.content_urls
            });
          } else {
            setWikiData(null);
          }
        } else {
          setWikiData(null);
        }
      } catch (err) {
        console.error("Wiki fetch error:", err);
        setWikiData(null);
      } finally {
        setWikiLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const filteredDeities = deities.filter(deity =>
    deity.name.toLowerCase().includes(search.toLowerCase()) ||
    deity.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 p-4 md:p-8 max-w-6xl mx-auto">
      {/* Title */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight">Spiritual Deities & Lore</h1>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          Explore the profound symbolism, sacred weapons, celestial vehicles, and mythologies of holy deities.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search deities (e.g. Shiva, Ganesha)..."
          className="w-full bg-slate-950 border border-slate-800 rounded-full py-3 pl-12 pr-6 text-white placeholder-slate-600 focus:outline-hidden focus:border-spiritual-orange transition-all text-sm shadow-inner"
        />
      </div>

      {/* Wikipedia Results */}
      {search.trim() && (wikiLoading ? (
        <div className="text-center text-slate-500 text-sm animate-pulse">Searching Wikipedia...</div>
      ) : wikiData ? (
        <div className="bg-slate-900 border border-slate-700 p-6 rounded-2xl flex flex-col md:flex-row gap-6 items-center md:items-start max-w-4xl mx-auto mb-8">
          {wikiData.thumbnail && (
            <img src={wikiData.thumbnail} alt={wikiData.title} className="w-24 h-24 rounded-full object-cover shadow-lg" />
          )}
          <div className="flex-1 space-y-2 text-center md:text-left">
            <h2 className="text-xl font-display font-bold text-white flex items-center justify-center md:justify-start gap-2">
              {wikiData.title}
              <span className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded-full uppercase tracking-wider font-sans">Wikipedia</span>
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">{wikiData.extract}</p>
            {wikiData.content_urls && (
              <a href={wikiData.content_urls.desktop.page} target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 text-sm inline-block mt-2 font-medium">
                Read more on Wikipedia &rarr;
              </a>
            )}
          </div>
        </div>
      ) : null)}

      {/* Grid */}
      {loading ? (
        <div className="min-h-[40vh] flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-spiritual-orange"></div>
        </div>
      ) : error ? (
        <div className="text-center p-8 bg-red-500/10 border border-red-500/20 text-red-300 rounded-2xl max-w-md mx-auto text-sm">
          {error}
        </div>
      ) : filteredDeities.length === 0 ? (
        <div className="text-center p-12 text-slate-500 text-sm">
          No deities match your search criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredDeities.map((deity) => (
            <Link
              key={deity._id}
              to={`/gods/${deity.slug}`}
              className="glass-panel hover:glass-panel-active rounded-3xl overflow-hidden flex flex-col group transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Image Banner */}
              <div className="h-48 overflow-hidden relative bg-slate-950">
                <img
                  src={deity.thumbnailUrl || 'https://images.unsplash.com/photo-1608976451642-1262d1a37a77?auto=format&fit=crop&w=400&q=80'}
                  alt={deity.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                <div className="absolute bottom-4 left-6">
                  <h3 className="text-2xl font-display font-bold text-white tracking-wide">{deity.name}</h3>
                </div>
              </div>

              {/* Description Body */}
              <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">
                  {deity.description}
                </p>

                {/* Substats */}
                <div className="flex gap-4 text-xs text-slate-400 border-t border-slate-800/40 pt-4">
                  <div>
                    <span className="font-semibold text-slate-500">Vehicle:</span> {deity.vehicle || 'None'}
                  </div>
                  <div>
                    <span className="font-semibold text-slate-500">Weapon:</span> {deity.weapon || 'None'}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default GodList;
