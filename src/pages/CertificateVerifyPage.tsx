import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, Search, CheckCircle2, AlertTriangle, ArrowRight, Award } from 'lucide-react';

export const CertificateVerifyPage: React.FC = () => {
  const { certificateId: initialId } = useParams<{ certificateId?: string }>();
  const [query, setQuery] = useState<string>(initialId || 'GMA-CERT-2026-0814');
  const [searchedId, setSearchedId] = useState<string>(initialId || 'GMA-CERT-2026-0814');

  // Sample verified record data
  const isSampleValid =
    searchedId.toUpperCase().includes('GMA-CERT') ||
    searchedId.toUpperCase().includes('GMA-SAMPLE') ||
    searchedId === 'GMA-CERT-2026-0814';

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setSearchedId(query.trim());
  };

  return (
    <div className="bg-brand-light min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-orange">
            <ShieldCheck className="w-4 h-4 text-brand-orange" />
            <span>PUBLIC CREDENTIAL VERIFICATION</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-brand-black tracking-tight">
            Verify a Greptech Certificate
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 max-w-lg mx-auto">
            Greptech Media Academy issues verifiable digital credentials backed by unique cryptographic identifiers for employment and academic authenticity.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-3 bg-white p-2.5 rounded-2xl border border-gray-200 shadow-sm">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter Certificate ID (e.g. GMA-CERT-2026-0814)"
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold rounded-xl transition-colors shrink-0"
          >
            Verify ID
          </button>
        </form>

        {/* Verification Result Card */}
        {isSampleValid ? (
          <div className="bg-white rounded-2xl border-2 border-green-500/30 p-8 shadow-lg space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase text-green-600 tracking-wider block">
                    Authentic Verified Credential
                  </span>
                  <span className="text-sm font-black text-brand-black tracking-tight">
                    {searchedId.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-gray-400 block">Status</span>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-50 text-green-700">
                  Valid / Active
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
                <span className="text-gray-400 font-bold uppercase text-[10px]">Recipient Name</span>
                <p className="text-sm font-bold text-brand-black">Samuel O. (Alumnus)</p>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
                <span className="text-gray-400 font-bold uppercase text-[10px]">Academic Program</span>
                <p className="text-sm font-bold text-brand-black">Cinematography & Filmmaking</p>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
                <span className="text-gray-400 font-bold uppercase text-[10px]">Award Earned</span>
                <p className="text-sm font-bold text-brand-black">Diploma in Cinematography & Directing</p>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
                <span className="text-gray-400 font-bold uppercase text-[10px]">Completion Date</span>
                <p className="text-sm font-bold text-brand-black">September 2026</p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-brand-orange" />
                <span>Issued by Greptech Media Academy Academic Board</span>
              </div>
              <span className="font-mono text-[10px] text-gray-400">HASH: 9a7f...d82e</span>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border-2 border-red-300 p-8 shadow-sm text-center space-y-4">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto" />
            <h3 className="text-xl font-bold text-brand-black">Certificate Record Not Found</h3>
            <p className="text-xs text-gray-600 max-w-md mx-auto">
              The credential reference <span className="font-bold text-brand-black font-mono">"{searchedId}"</span> could not be verified in the Greptech official records database. Please verify the code or contact admissions.
            </p>
          </div>
        )}

        <div className="text-center pt-4">
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 text-xs font-bold text-brand-orange hover:text-brand-orange-hover uppercase tracking-wider"
          >
            <span>Explore Certified Programs at Greptech</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

