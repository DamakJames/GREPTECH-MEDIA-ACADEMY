import React from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, RefreshCw } from 'lucide-react';
import { useAuth, UserRole } from '../../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const { user, loading, switchDemoRole } = useAuth();
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
              You are currently signed in as <span className="font-bold uppercase text-brand-orange">{user.role}</span> ({user.email}). This area strictly requires <span className="font-bold uppercase text-brand-black">{allowedRoles.join(' or ')}</span> authorization.
            </p>
          </div>

          {/* Quick Demo Role Switcher */}
          <div className="p-4 rounded-xl bg-orange-50/70 border border-orange-200 text-left space-y-3">
            <span className="text-[11px] font-bold text-brand-orange uppercase block tracking-wider">
              Quick Role Switch (Demo Mode)
            </span>
            <div className="flex flex-wrap gap-2">
              {allowedRoles.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => switchDemoRole(r)}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-brand-black hover:bg-gray-800 transition-colors capitalize flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Switch to {r}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-brand-orange"
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
