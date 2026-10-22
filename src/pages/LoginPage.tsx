import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Lock,
  Mail,
  User,
  ShieldCheck,
  ArrowRight,
  Loader2,
  Sparkles,
} from 'lucide-react';
import { useAuth, UserRole } from '../context/AuthContext';

export const LoginPage: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { login, register, switchDemoRole, user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectPath = searchParams.get('redirect');

  const redirectAfterAuth = (role: UserRole) => {
    if (redirectPath) {
      navigate(redirectPath);
      return;
    }
    if (role === 'admin') navigate('/admin');
    else if (role === 'instructor') navigate('/portal/instructor');
    else navigate('/portal/student');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSubmitting(true);

    try {
      if (isRegistering) {
        if (!fullName.trim()) throw new Error('Please enter your full name');
        await register(email, password, fullName, selectedRole);
        redirectAfterAuth(selectedRole);
      } else {
        await login(email, password, selectedRole);
        redirectAfterAuth(selectedRole);
      }
    } catch (err: any) {
      let msg = err.message || 'Authentication failed. Please check your credentials.';
      if (err.code === 'auth/operation-not-allowed') {
        msg = 'Email/Password sign-in is not yet enabled in your Firebase Console. Enable it under Firebase Console > Authentication > Sign-in method, or use 1-Click Instant Demo Login below!';
      } else if (err.code === 'auth/email-already-in-use') {
        msg = 'An account with this email already exists. Please sign in instead.';
      } else if (err.code === 'auth/weak-password') {
        msg = 'Password should be at least 6 characters.';
      } else if (
        err.code === 'auth/invalid-credential' ||
        err.code === 'auth/wrong-password' ||
        err.code === 'auth/user-not-found'
      ) {
        msg = 'Invalid email or password. Check your credentials or try 1-Click Instant Demo Login below.';
      }
      setErrorMessage(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleQuickDemoLogin = (role: UserRole) => {
    switchDemoRole(role);
    redirectAfterAuth(role);
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

        {/* 1-Click Quick Demo Login Bar */}
        <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200/80 space-y-2">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
            <span>1-Click Instant Demo Login</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('student')}
              className="px-2.5 py-2 rounded-lg text-xs font-bold bg-white border border-gray-200 hover:border-brand-orange hover:text-brand-orange transition-colors text-center shadow-sm"
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('instructor')}
              className="px-2.5 py-2 rounded-lg text-xs font-bold bg-white border border-gray-200 hover:border-brand-orange hover:text-brand-orange transition-colors text-center shadow-sm"
            >
              Instructor
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('admin')}
              className="px-2.5 py-2 rounded-lg text-xs font-bold bg-white border border-gray-200 hover:border-brand-orange hover:text-brand-orange transition-colors text-center shadow-sm"
            >
              Admin
            </button>
          </div>
        </div>

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

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
              Portal Role Selection
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['student', 'instructor', 'admin'] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setSelectedRole(r)}
                  className={`py-2 rounded-lg text-xs font-bold uppercase transition-all ${
                    selectedRole === r
                      ? 'bg-brand-black text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {r}
                </button>
              ))}
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
                <span>{isRegistering ? 'Register & Enter Portal' : `Sign In as ${selectedRole}`}</span>
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
