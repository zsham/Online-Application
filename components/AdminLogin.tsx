
import React, { useState } from 'react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Updated Standard Credentials for 2025
    const VALID_USER = 'admin';
    const VALID_PASS = 'unisel2025';

    // Robust checking: trim whitespace and ignore case for username
    const cleanUser = username.trim().toLowerCase();
    const cleanPass = password.trim();

    setTimeout(() => {
      if (cleanUser === VALID_USER && cleanPass === VALID_PASS) {
        onLoginSuccess();
      } else {
        setError('Invalid administrative credentials. Please verify your username and password.');
        setIsLoading(false);
      }
    }, 800);
  };

  const handleQuickLogin = () => {
    setUsername('admin');
    setPassword('unisel2025');
    setError('');
  };

  return (
    <div className="max-w-md mx-auto animate-in zoom-in duration-500">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        <div className="bg-slate-900 p-10 text-center relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-orange-500"></div>
          <div className="bg-orange-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 rotate-3 shadow-lg">
            <i className="fas fa-user-shield text-2xl text-white"></i>
          </div>
          <h2 className="text-white text-2xl font-bold">Admin Central</h2>
          <p className="text-slate-400 text-sm mt-1">Please sign in to manage admissions</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-xs font-bold flex items-center gap-3 animate-pulse">
              <i className="fas fa-exclamation-triangle"></i>
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Username</label>
            <div className="relative group">
              <i className="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-orange-500 transition-colors"></i>
              <input 
                required
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all font-medium"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Password</label>
            <div className="relative group">
              <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-orange-500 transition-colors"></i>
              <input 
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all font-medium"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <button 
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 rounded-2xl font-bold text-white shadow-xl transition-all flex items-center justify-center gap-3 ${
                isLoading 
                ? 'bg-slate-400 cursor-not-allowed' 
                : 'bg-slate-900 hover:bg-orange-600 active:scale-[0.98]'
              }`}
            >
              {isLoading ? (
                <><i className="fas fa-spinner fa-spin"></i> Authenticating...</>
              ) : (
                <>SIGN IN <i className="fas fa-arrow-right"></i></>
              )}
            </button>
            
            <button 
              type="button"
              onClick={handleQuickLogin}
              className="text-xs text-slate-400 hover:text-orange-500 font-bold transition-colors py-2"
            >
              <i className="fas fa-magic mr-2"></i>
              USE DEMO CREDENTIALS
            </button>
          </div>
        </form>

        <div className="bg-slate-50 p-6 border-t border-slate-100">
          <p className="text-[10px] text-slate-400 text-center leading-relaxed italic">
            Access to this area is restricted to authorized personnel only. (Demo: admin / unisel2025)
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
