import React from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { useAuth, UserRole } from '../../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-brand-orange border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-gray-500 font-semibold tracking-wider uppercase">
            Verifying Credentials & Permissions...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-brand-light">
        <div className="max-w-md w-full bg-white rounded-2xl border border-gray-200 shadow-xl p-8 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-brand-black">Access Restricted</h2>
            <p className="text-xs text-gray-600 leading-relaxed">
              This portal requires <span className="font-bold uppercase text-brand-orange">{allowedRoles?.join(' or ')}</span> authorization. You are currently signed in as <span className="font-bold uppercase text-brand-black">{user.role}</span> ({user.email}).
            </p>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-black hover:bg-gray-800 transition-colors"
            >
              <span>Sign In with Authorized Account</span>
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 text-xs font-bold text-gray-600 hover:text-brand-orange py-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Homepage</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
