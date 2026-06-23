import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { MapPin, Navigation, Compass, Calendar, BookOpen } from 'lucide-react';

const TempleMap = () => {
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [coords, setCoords] = useState(null); // { lat, lng }
  const [radius, setRadius] = useState(50000); // Default: 50 KM (50,000 meters)
  const [locationStatus, setLocationStatus] = useState('idle'); // 'idle', 'detecting', 'success', 'failed'

  const fetchTemples = async (lat = null, lng = null, rad = 50000) => {
    try {
      setLoading(true);
      setError('');
      let url = '/temples/nearby';
      if (lat !== null && lng !== null) {
        url += `?lat=${lat}&lng=${lng}&radiusMeters=${rad}`;
      }
      const res = await API.get(url);
      if (res.data && res.data.success) {
        setTemples(res.data.data);
      }
    } catch (err) {
      console.error(err);
      setError('Could not retrieve nearby temples.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial load: Fetch all temples as fallback list
    fetchTemples();
  }, []);

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('failed');
      setError('Geolocation is not supported by your browser.');
      return;
    }

    setLocationStatus('detecting');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ lat: latitude, lng: longitude });
        setLocationStatus('success');
        fetchTemples(latitude, longitude, radius);
      },
      (err) => {
        console.error(err);
        setLocationStatus('failed');
        // Let the user know we're showing default fallback list
        alert('Could not acquire location permission. Showing all major pilgrim sites.');
        fetchTemples();
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  const handleRadiusChange = (e) => {
    const val = parseInt(e.target.value);
    setRadius(val);
    if (coords) {
      fetchTemples(coords.lat, coords.lng, val);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-8">
      {/* Title */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight">Temple & Ashram Finder</h1>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          Locate sacred pilgrimage centers, ashrams, and temples near you with geospatial coordinates mapping.
        </p>
      </div>

      {/* Geolocation Controls Panel */}
      <div className="glass-panel p-6 rounded-3xl flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="space-y-1 text-center md:text-left">
          <h3 className="text-base font-bold text-white">Geospatial Radial Filter</h3>
          <p className="text-xs text-slate-400">
            {coords 
              ? `Active Location: ${coords.lat.toFixed(4)}° N, ${coords.lng.toFixed(4)}° E` 
              : 'Detect coordinates to find holy sites in your proximity.'}
          </p>
        </div>

        <div className="flex flex-wrap gap-3 w-full md:w-auto justify-center">
          {/* Radius Selector */}
          <select
            value={radius}
            onChange={handleRadiusChange}
            disabled={!coords}
            className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-hidden focus:border-spiritual-orange transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <option value={5000}>Within 5 KM</option>
            <option value={10000}>Within 10 KM</option>
            <option value={50000}>Within 50 KM</option>
            <option value={100000}>Within 100 KM</option>
          </select>

          {/* Location button */}
          <button
            onClick={handleDetectLocation}
            disabled={locationStatus === 'detecting'}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-linear-to-r from-spiritual-orange to-spiritual-gold text-white text-xs font-semibold hover:shadow-lg transition-all active:scale-98 disabled:opacity-50 shrink-0"
          >
            <Navigation className={`w-4 h-4 ${locationStatus === 'detecting' ? 'animate-spin' : ''}`} />
            {locationStatus === 'detecting' ? 'Acquiring GPS...' : 'Locate Nearby Temples'}
          </button>
        </div>
      </div>

      {/* Main List */}
      {loading ? (
        <div className="min-h-[30vh] flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-spiritual-orange"></div>
        </div>
      ) : error ? (
        <div className="text-center p-8 bg-red-500/10 border border-red-500/20 text-red-300 rounded-2xl max-w-md mx-auto text-sm">
          {error}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-widest">
              {coords ? 'Nearby Matches Found' : 'Featured Pilgrim Sites'}
            </h4>
            <span className="text-xs text-slate-500 font-mono">Count: {temples.length}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {temples.map((temple) => (
              <div
                key={temple._id}
                className="glass-panel rounded-3xl overflow-hidden flex flex-col hover:border-spiritual-orange/15 transition-all duration-300"
              >
                {/* Image */}
                <div className="h-44 bg-slate-950 overflow-hidden relative">
                  <img
                    src={temple.imageUrl || 'https://images.unsplash.com/photo-1627896157734-4d7d4388f24b?auto=format&fit=crop&w=600&q=80'}
                    alt={temple.name}
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute top-4 right-4">
                    {temple.deityId && (
                      <span className="bg-linear-to-r from-spiritual-orange to-spiritual-gold text-white text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider">
                        {temple.deityId.name}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white tracking-wide">{temple.name}</h3>
                    <p className="text-slate-400 text-xs leading-relaxed">{temple.description}</p>
                  </div>

                  <div className="space-y-2 border-t border-slate-800/40 pt-4 text-xs text-slate-400">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-spiritual-orange shrink-0 mt-0.5" />
                      <span>{temple.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Compass className="w-4 h-4 text-spiritual-gold shrink-0" />
                      <span>Hours: {temple.timing || 'Not Specified'}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {temples.length === 0 && (
              <div className="md:col-span-2 text-center p-12 text-slate-500 text-sm">
                No temples found inside the selected search radius. Try expanding the search distance.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TempleMap;
