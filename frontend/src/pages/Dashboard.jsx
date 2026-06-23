import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Flame, Play, Eye, BookOpen, Compass, Award, Calendar } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const res = await API.get('/users/dashboard');
      if (res.data && res.data.success) {
        setDashboardData(res.data.data);
      }
    } catch (err) {
      console.error(err);
      setError('Could not retrieve dashboard statistics.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-spiritual-orange"></div>
      </div>
    );
  }

  const stats = dashboardData?.stats || user?.stats || { totalChantCount: 0, currentStreak: 0, longestStreak: 0 };
  const recentSessions = dashboardData?.recentSessions || [];

  return (
    <div className="space-y-8 p-4 md:p-8 max-w-6xl mx-auto">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-white">Welcome back, {user?.name}!</h1>
          <p className="text-slate-400 text-sm">Align your day with mindfulness and spiritual devotion.</p>
        </div>
        <div className="flex items-center gap-2 bg-spiritual-orange/15 border border-spiritual-orange/20 px-4 py-2 rounded-full text-spiritual-orange font-medium animate-pulse">
          <Flame className="w-5 h-5 fill-spiritual-orange" />
          <span>Streak: {stats.currentStreak} Days</span>
        </div>
      </div>

      {/* Stats Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-2xl flex items-center gap-4">
          <div className="p-4 bg-spiritual-orange/10 rounded-xl text-spiritual-orange">
            <Award className="w-8 h-8" />
          </div>
          <div>
            <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Total Chants</p>
            <h3 className="text-3xl font-display font-bold text-white mt-1">{stats.totalChantCount}</h3>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl flex items-center gap-4">
          <div className="p-4 bg-amber-500/10 rounded-xl text-amber-500">
            <Flame className="w-8 h-8" />
          </div>
          <div>
            <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Current Streak</p>
            <h3 className="text-3xl font-display font-bold text-white mt-1">{stats.currentStreak} Days</h3>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl flex items-center gap-4">
          <div className="p-4 bg-indigo-500/10 rounded-xl text-indigo-400">
            <Calendar className="w-8 h-8" />
          </div>
          <div>
            <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Longest Streak</p>
            <h3 className="text-3xl font-display font-bold text-white mt-1">{stats.longestStreak} Days</h3>
          </div>
        </div>
      </div>

      {/* Quick Action Shortcuts */}
      <div className="space-y-4">
        <h2 className="text-xl font-display font-semibold text-white">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            to="/chant"
            className="glass-panel hover:glass-panel-active p-6 rounded-2xl flex flex-col justify-between h-40 transition-all duration-300 group"
          >
            <div className="w-10 h-10 rounded-xl bg-spiritual-orange/10 text-spiritual-orange flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play className="w-5 h-5 fill-spiritual-orange" />
            </div>
            <div>
              <h4 className="text-lg font-display font-bold text-white">Start Japa Session</h4>
              <p className="text-slate-400 text-xs mt-1">Open digital chanting counter</p>
            </div>
          </Link>

          <Link
            to="/gods"
            className="glass-panel hover:glass-panel-active p-6 rounded-2xl flex flex-col justify-between h-40 transition-all duration-300 group"
          >
            <div className="w-10 h-10 rounded-xl bg-spiritual-gold/10 text-spiritual-gold flex items-center justify-center group-hover:scale-110 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-lg font-display font-bold text-white">Explore Deities</h4>
              <p className="text-slate-400 text-xs mt-1">View stories, weapons, & mantras</p>
            </div>
          </Link>

          <div
            className="glass-panel p-6 rounded-2xl flex flex-col justify-between h-40 opacity-60 cursor-not-allowed"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="text-lg font-display font-bold text-white">Astrology Services</h4>
                <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded font-sans uppercase">Phase 3</span>
              </div>
              <p className="text-slate-400 text-xs mt-1">Daily horoscope and Kundli builder</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Japa Logs */}
      <div className="space-y-4">
        <h2 className="text-xl font-display font-semibold text-white">Recent Chanting Activity</h2>
        <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800/40">
          {recentSessions.length === 0 ? (
            <div className="p-8 text-center text-slate-500 space-y-3">
              <p className="text-sm">You haven't logged any chanting sessions yet.</p>
              <Link to="/chant" className="inline-block text-spiritual-orange text-xs font-semibold hover:underline">
                Start Your First Session →
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/50 text-slate-400 text-xs uppercase tracking-wider">
                    <th className="px-6 py-4">Mantra</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4 text-center">Taps Completed</th>
                    <th className="px-6 py-4 text-center">Session Goal</th>
                    <th className="px-6 py-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40">
                  {recentSessions.map((session) => (
                    <tr key={session._id} className="hover:bg-slate-900/20 transition-colors">
                      <td className="px-6 py-4 font-medium text-white">
                        {session.mantraId?.title || 'Unknown Mantra'}
                      </td>
                      <td className="px-6 py-4 text-slate-400">
                        {new Date(session.createdAt).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="px-6 py-4 text-center text-white font-mono">{session.count}</td>
                      <td className="px-6 py-4 text-center text-slate-400 font-mono">{session.goal}</td>
                      <td className="px-6 py-4 text-right">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          session.status === 'completed' 
                            ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}>
                          {session.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
