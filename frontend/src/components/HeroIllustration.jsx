import React from 'react';
import { ShieldCheck, TrendingUp, Cpu, CheckCircle2, Zap, BarChart3, Lock } from 'lucide-react';

export default function HeroIllustration() {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      
      {/* Background ambient blur */}
      <div className="absolute -top-6 -left-6 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-6 -right-6 w-72 h-72 bg-indigo-400/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Main Glass Dashboard Card */}
      <div className="relative bg-white rounded-3xl p-6 sm:p-7 shadow-xl shadow-slate-200/80 border border-slate-200/90 space-y-5">
        
        {/* Top Header Row */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">ML Risk Engine</h4>
              <p className="text-xs text-slate-500">Random Forest Classifier v1.2</p>
            </div>
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
            84.7% Model Accuracy
          </span>
        </div>

        {/* Financial Profile Gauges */}
        <div className="grid grid-cols-2 gap-3.5">
          
          {/* Gauge 1: Recommendation Score */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="flex items-center justify-between text-xs font-medium text-slate-500">
              <span>Match Score</span>
              <Zap className="w-3.5 h-3.5 text-blue-600" />
            </div>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-2xl font-black text-slate-900">87%</span>
              <span className="text-[11px] font-semibold text-emerald-600">High Eligibility</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-emerald-500 h-full w-[87%] rounded-full"></div>
            </div>
          </div>

          {/* Gauge 2: Credit Score */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="flex items-center justify-between text-xs font-medium text-slate-500">
              <span>Credit Profile</span>
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
            </div>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-2xl font-black text-slate-900">765</span>
              <span className="text-[11px] font-semibold text-slate-500">/ 850 (Good)</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-blue-600 h-full w-[85%] rounded-full"></div>
            </div>
          </div>

        </div>

        {/* Recommended Offer Card Teaser */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-lg shadow-slate-900/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-500/10 rounded-full blur-xl pointer-events-none"></div>
          
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
              Recommended Loan Offer
            </span>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-blue-500/20 text-blue-300 border border-blue-400/30">
              Optimal Term
            </span>
          </div>

          <div className="flex items-baseline justify-between mb-3">
            <div>
              <div className="text-2xl font-extrabold text-white">₹5,00,000</div>
              <div className="text-xs text-slate-400">Tenure: 5 Years @ 10.5% p.a.</div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-emerald-400">₹10,500</div>
              <div className="text-[11px] text-slate-400">Est. Monthly EMI</div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-700/80 flex items-center justify-between text-xs text-slate-300">
            <span className="flex items-center">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-1.5" />
              Manageable DTI Ratio
            </span>
            <span className="text-slate-400 font-mono text-[11px]">DTI: 32.4%</span>
          </div>
        </div>

        {/* Bottom Feature importances preview */}
        <div className="pt-1">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-semibold text-slate-700">Top Model Features</span>
            <span className="text-[11px] text-slate-400">Scikit-Learn Weight</span>
          </div>
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Requested Loan Amount</span>
              <div className="w-24 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full w-[78%]"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Credit Score & Repayment</span>
              <div className="w-24 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-indigo-600 h-full w-[65%]"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Monthly Disposable Income</span>
              <div className="w-24 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full w-[52%]"></div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Floating Badges */}
      <div className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg border border-slate-200/90 flex items-center space-x-2 text-xs font-semibold text-slate-800">
        <Lock className="w-4 h-4 text-blue-600" />
        <span>Restful API Verified</span>
      </div>

      <div className="absolute -top-4 -right-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg border border-slate-200/90 flex items-center space-x-2 text-xs font-semibold text-slate-800">
        <BarChart3 className="w-4 h-4 text-emerald-600" />
        <span>Real-time Risk Analytics</span>
      </div>

    </div>
  );
}
