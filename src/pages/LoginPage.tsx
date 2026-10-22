import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, Mail, User, ShieldAlert, ArrowRight } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'student' | 'instructor' | 'admin'>('student');
  const [notification, setNotification] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setNotification(
      `Stage 1 Preview: Login submitted for ${role.toUpperCase()} account (${email}). Full Firebase Authentication and session tokens will be connected in Stage 4.`
    );
  };

  return (
    <div className="bg-brand-light min-h-screen py-20 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden p-8 space-y-8">
        {/* Header & Logo */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <img src="/assets/logo/greptech-icon.png" alt="Greptech" className="h-10 w-auto" />
            <div className="flex flex-col text-left">
              <span className="font-black text-lg tracking-tight text-brand-black leading-none">
                GREP<span className="text-brand-orange">TECH</span>
              </span>
              <span className="text-[8px] font-bold tracking-widest text-gray-500 uppercase">
                MEDIA ACADEMY
              </span>
            </div>
          </Link>
          <h1 className="text-2xl font-black text-brand-black pt-2">Academy Portal Login</h1>
          <p className="text-xs text-gray-500">
            Sign in to access your course lessons, assignments, or management portal.
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-3 gap-1 bg-gray-100 p-1 rounded-xl">
          {(['student', 'instructor', 'admin'] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => {
                setRole(r);
                setNotification(null);
              }}
              className={`py-2 text-xs font-bold capitalize rounded-lg transition-all ${
                role === r
                  ? 'bg-white text-brand-black shadow-sm'
                  : 'text-gray-500 hover:text-brand-black'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {notification && (
          <div className="p-3.5 rounded-xl bg-orange-50 border border-orange-200 text-xs text-orange-950 flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
            <span>{notification}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@greptechacademy.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-brand-orange"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
                Password
              </label>
              <a href="#" className="text-[11px] text-brand-orange hover:underline">
                Forgot?
              </a>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-brand-orange"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl text-sm font-bold text-white bg-brand-orange hover:bg-brand-orange-hover transition-colors shadow-md flex items-center justify-center gap-2"
          >
            <span>Log In as {role}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-gray-100 text-center text-xs text-gray-500">
          Not yet enrolled?{' '}
          <Link to="/apply" className="font-bold text-brand-orange hover:underline">
            Apply for Admission
          </Link>
        </div>
      </div>
    </div>
  );
};

