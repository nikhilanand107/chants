import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AudioProvider } from './context/AudioContext';
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Dashboard';
import ChantingCounter from './pages/Chanting/ChantingCounter';
import GodList from './pages/Gods/GodList';
import GodDetails from './pages/Gods/GodDetails';
import Calendar from './pages/Festivals/Calendar';
import TempleMap from './pages/Temples/TempleMap';
import GitaReader from './pages/Gita/GitaReader';
import { Flame, LogOut, BookOpen, Compass, Activity, Home as HomeIcon, Calendar as CalendarIcon, MapPin, Play } from 'lucide-react';

// Route Guard for authenticated paths
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#060913]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-spiritual-orange"></div>
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Global Layout Frame
const Layout = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#060913] text-slate-100 font-sans">
      {/* Navigation Header */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <span className="font-devanagari text-2xl text-spiritual-orange font-bold transition-transform group-hover:rotate-6">ॐ</span>
            <span className="font-display font-bold text-lg md:text-xl tracking-wide bg-linear-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Sādhanā
            </span>
          </Link>

          {/* Links & Auth State */}
          <nav className="flex items-center gap-3 md:gap-6 text-sm font-medium">
            <Link to="/" className="hover:text-spiritual-orange transition-colors flex items-center gap-1 text-xs md:text-sm">
              <HomeIcon className="w-4 h-4 shrink-0" /> <span className="hidden sm:inline">Home</span>
            </Link>
            <Link to="/gods" className="hover:text-spiritual-orange transition-colors flex items-center gap-1 text-xs md:text-sm">
              <Compass className="w-4 h-4 shrink-0" /> <span className="hidden sm:inline">Deities</span>
            </Link>
            <Link to="/gita" className="hover:text-spiritual-orange transition-colors flex items-center gap-1 text-xs md:text-sm">
              <BookOpen className="w-4 h-4 shrink-0" /> <span className="hidden sm:inline">Read</span>
            </Link>
            <Link to="/festivals" className="hover:text-spiritual-orange transition-colors flex items-center gap-1 text-xs md:text-sm">
              <CalendarIcon className="w-4 h-4 shrink-0" /> <span className="hidden sm:inline">Calendar</span>
            </Link>
            <Link to="/temples" className="hover:text-spiritual-orange transition-colors flex items-center gap-1 text-xs md:text-sm">
              <MapPin className="w-4 h-4 shrink-0" /> <span className="hidden sm:inline">Temples</span>
            </Link>

            {user ? (
              <>
                <Link to="/dashboard" className="hover:text-spiritual-orange transition-colors flex items-center gap-1 text-xs md:text-sm">
                  <Activity className="w-4 h-4 shrink-0" /> <span className="hidden sm:inline">Dashboard</span>
                </Link>
                <Link to="/chant" className="hover:text-spiritual-orange transition-colors flex items-center gap-1 text-xs md:text-sm">
                  <Play className="w-4 h-4 fill-current shrink-0" /> <span className="hidden sm:inline">Japa</span>
                </Link>

                <div className="h-4 w-px bg-slate-800 hidden sm:block"></div>

                {/* User Stats / Logout */}
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 hidden md:block font-medium">Hi, {user.name}</span>
                  <button
                    onClick={logout}
                    className="text-slate-400 hover:text-red-400 transition-colors flex items-center gap-1 cursor-pointer"
                    title="Log Out"
                  >
                    <LogOut className="w-4 h-4 shrink-0" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-spiritual-orange transition-colors text-xs md:text-sm">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-linear-to-r from-spiritual-orange to-spiritual-gold text-white px-4 py-2 rounded-full text-xs font-semibold hover:shadow-md hover:shadow-spiritual-orange/15 transition-all shrink-0"
                >
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Main Content Pane */}
      <main className="flex-grow relative">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/60 py-6 text-center text-xs text-slate-500 space-y-2">
        <p className="font-devanagari text-spiritual-orange text-sm select-none">ॐ शान्तिः शान्तिः शान्तिः</p>
        <p>© {new Date().getFullYear()} Sādhanā Companion Ecosystem. Devoted to spiritual growth.</p>
      </footer>
    </div>
  );
};

// Route Controller
function App() {
  return (
    <AuthProvider>
      <AudioProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/chant"
                element={
                  <ProtectedRoute>
                    <ChantingCounter />
                  </ProtectedRoute>
                }
              />
              <Route path="/gods" element={<GodList />} />
              <Route path="/gods/:slug" element={<GodDetails />} />
              <Route path="/gita" element={<GitaReader />} />
              <Route path="/festivals" element={<Calendar />} />
              <Route path="/temples" element={<TempleMap />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </AudioProvider>
    </AuthProvider>
  );
}

export default App;
