import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, BookOpen, Music, Heart, Sun, Activity, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="relative min-h-[90vh] flex flex-col justify-center items-center px-4 overflow-hidden pt-12">
      {/* Cosmic background blur */}
      <div className="aurora-bg"></div>

      <div className="relative z-10 max-w-4xl text-center space-y-8 px-4">
        {/* Om Symbol / Logo container */}
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-linear-to-b from-spiritual-orange to-spiritual-gold flex items-center justify-center shadow-lg shadow-spiritual-orange/20 animate-pulse">
            <span className="font-devanagari text-4xl text-white font-bold leading-none select-none">ॐ</span>
          </div>
        </div>

        {/* Hero Headings */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight text-white leading-tight">
            Daily Spiritual Discipline in the <span className="bg-linear-to-r from-spiritual-orange to-spiritual-gold bg-clip-text text-transparent glow-text-saffron">Modern Age</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-sans leading-relaxed">
            Cultivate mindfulness, build chanting streaks, study ancient lore, and align your life path with daily horoscope, aartis, and digital Japa.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {user ? (
            <Link
              to="/dashboard"
              className="px-8 py-3 rounded-full bg-linear-to-r from-spiritual-orange to-spiritual-gold hover:from-spiritual-orange-dark hover:to-spiritual-gold text-white font-medium shadow-lg hover:shadow-spiritual-orange/30 transition-all transform hover:-translate-y-0.5 text-center"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/register"
                className="px-8 py-3 rounded-full bg-linear-to-r from-spiritual-orange to-spiritual-gold hover:from-spiritual-orange-dark hover:to-spiritual-gold text-white font-medium shadow-lg hover:shadow-spiritual-orange/30 transition-all transform hover:-translate-y-0.5 text-center"
              >
                Begin Your Journey
              </Link>
              <Link
                to="/login"
                className="px-8 py-3 rounded-full bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 font-medium transition-all text-center"
              >
                Access Account
              </Link>
            </>
          )}
        </div>

        {/* Features Showcase Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-16 text-left">
          {/* Card 1 */}
          <div className="glass-panel p-6 rounded-2xl hover:border-spiritual-orange/30 transition-all duration-300">
            <div className="p-3 bg-spiritual-orange/10 rounded-xl w-fit text-spiritual-orange mb-4">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-display font-semibold text-white mb-2">Digital Japa Counter</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Track daily chants of your favorite mantras with customized goals (108, 1008) and keep streaks active.
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass-panel p-6 rounded-2xl hover:border-spiritual-orange/30 transition-all duration-300">
            <div className="p-3 bg-spiritual-gold/10 rounded-xl w-fit text-spiritual-gold mb-4">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-display font-semibold text-white mb-2">Wisdom & Lore</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Learn about Lord Shiva, Lord Ganesha, and Lord Hanuman with authentic stories, weapons, vehicles, and representations.
            </p>
          </div>

          {/* Card 3 */}
          <div className="glass-panel p-6 rounded-2xl hover:border-spiritual-orange/30 transition-all duration-300">
            <div className="p-3 bg-indigo-500/10 rounded-xl w-fit text-indigo-400 mb-4">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-display font-semibold text-white mb-2">Daily Astrology</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              View daily horoscopes for career, wealth, and wellness parameters, and compute planetary charts (Future phase).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
