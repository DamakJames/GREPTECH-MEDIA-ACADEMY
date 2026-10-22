import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Lock,
  Mail,
  User,
  ShieldCheck,
  ArrowRight,
  Loader2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LoginPage: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { login, register, user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectPath = searchParams.get('redirect');

  const redirectAfterAuth = (userEmail: string) => {
    if (redirectPath) {
      navigate(redirectPath);
      return;
    }
    const clean = userEmail.trim().toLowerCase();
    if (clean.includes('admin') || clean === 'greptechmediaacademy@gmail.com') {
      navigate('/admin');
    } else if (clean.startsWith('chris') || clean.startsWith('valentina')) {
      navigate('/portal/instructor');
    } else {
      navigate('/portal/student');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSubmitting(true);

    try {
      if (isRegistering) {
        if (!fullName.trim()) throw new Error('Please enter your full name');
        await register(email, password, fullName, 'student');
        redirectAfterAuth(email);
      } else {
        await login(email, password);
        redirectAfterAuth(email);
      }
    } catch (err: any) {
      let msg = err.message || 'Authentication failed. Please check your credentials.';
      if (err.code === 'auth/operation-not-allowed') {
        msg = 'Email/Password sign-in is not yet enabled in your Firebase Console. Enable it under Firebase Console > Authentication > Sign-in method.';
      } else if (err.code === 'auth/email-already-in-use') {
        msg = 'An account with this email already exists. Please sign in instead.';
      } else if (err.code === 'auth/weak-password') {
        msg = 'Password should be at least 6 characters.';
      } else if (
        err.code === 'auth/invalid-credential' ||
        err.code === 'auth/wrong-password' ||
        err.code === 'auth/user-not-found'
      ) {
        msg = 'Invalid email or password. Please check your credentials.';
      }
      setErrorMessage(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-brand-light min-h-screen py-16 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden p-8 space-y-7">
        {/* Header & Logo */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <img src="/assets/logo/greptech-icon.png" alt="Greptech" className="h-10 w-auto" />
            <div className="flex flex-col text-left">
              <span className="font-black text-lg tracking-tight text-brand-black leading-none">
                GREP<span className="text-brand-orange">TECH</span>
              </span>
              <span className="text-[8px] font-bold tracking-widest text-gray-500 uppercase mt-0.5">
                MEDIA ACADEMY
              </span>
            </div>
          </Link>
          <h1 className="text-2xl font-black text-brand-black pt-2">
            {isRegistering ? 'Create Student Account' : 'Sign In to Portal'}
          </h1>
          <p className="text-xs text-gray-500">
            {isRegistering
              ? 'Join Greptech Media Academy and start your creative training'
              : 'Access your coursework, student progress, or faculty management desk'}
          </p>
        </div>

        {/* Currently signed-in banner */}
        {user && (
          <div className="p-3.5 rounded-xl bg-orange-50/70 border border-orange-200 text-xs flex items-center justify-between">
            <div>
              <span className="text-[10px] text-gray-500 uppercase font-bold block">Currently Signed In:</span>
              <span className="font-bold text-brand-black">{user.displayName}</span> (
              <span className="text-brand-orange uppercase font-bold">{user.role}</span>)
            </div>
            <button
              onClick={() => logout()}
              className="text-xs font-bold text-red-600 hover:underline"
            >
              Sign Out
            </button>
          </div>
        )}

        {/* Auth Mode Toggle Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            type="button"
            onClick={() => {
              setIsRegistering(false);
              setErrorMessage(null);
            }}
            className={`flex-1 py-2.5 text-xs font-bold border-b-2 transition-colors ${
              !isRegistering
                ? 'border-brand-orange text-brand-orange'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Portal Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setIsRegistering(true);
              setErrorMessage(null);
            }}
            className={`flex-1 py-2.5 text-xs font-bold border-b-2 transition-colors ${
              isRegistering
                ? 'border-brand-orange text-brand-orange'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            New Registration
          </button>
        </div>

        {errorMessage && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
            {errorMessage}
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegistering && (
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. John"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-brand-orange"
                />
              </div>
            </div>
          )}

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
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
              Password
            </label>
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
            disabled={submitting}
            className="w-full py-3.5 rounded-xl text-sm font-bold text-white bg-brand-orange hover:bg-brand-orange-hover transition-colors shadow-md flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>{isRegistering ? 'Register & Enter Student Portal' : 'Sign In to Portal'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-gray-500">
          Applying for a course?{' '}
          <Link to="/apply" className="font-bold text-brand-orange hover:underline">
            Online Admission Form
          </Link>
        </div>
      </div>
    </div>
  );
};
