import React from 'react';
import { 
  CheckCircle2, AlertTriangle, ShieldCheck, TrendingUp, Info, 
  RefreshCw, FileText, ArrowRight, HelpCircle, Award, Sparkles 
} from 'lucide-react';
import EmiCalculator from './EmiCalculator';

export default function ResultDashboard({ result, onRecalculate, onNavigateToDataScience }) {
  if (!result) return null;

  const {
    eligible,
    status,
    recommendation_score,
    risk_level,
    recommended_loan_amount,
    recommended_tenure_years,
    estimated_interest_rate,
    estimated_monthly_emi,
    explanations,
    disclaimer
  } = result;

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const getRiskColor = (level) => {
    if (level === 'Low Risk') return 'bg-emerald-100 text-emerald-800 border-emerald-300';
    if (level === 'Medium Risk') return 'bg-amber-100 text-amber-800 border-amber-300';
    return 'bg-rose-100 text-rose-800 border-rose-300';
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Academic Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-4 sm:p-5 shadow-md flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-blue-300 tracking-wider uppercase block">
              Machine Learning Model Inference
            </span>
            <span className="text-sm font-bold text-white">
              Machine Learning Based Recommendation — For Educational/Demonstration Purposes
            </span>
          </div>
        </div>
        <button
          onClick={onNavigateToDataScience}
          className="hidden md:inline-flex items-center text-xs font-semibold bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg transition-colors"
        >
          View Model Specs
          <ArrowRight className="w-3.5 h-3.5 ml-1" />
        </button>
      </div>

      {/* Main Results Dashboard Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/60 overflow-hidden">
        
        {/* Top Header Strip */}
        <div className={`p-6 sm:p-8 ${eligible ? 'bg-emerald-50/50 border-b border-emerald-100' : 'bg-rose-50/50 border-b border-rose-100'}`}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            
            {/* Status & Eligibility Header */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className={`px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider border ${eligible ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-rose-100 text-rose-800 border-rose-300'}`}>
                  {status}
                </span>
                <span className={`px-3 py-1.5 rounded-full text-xs font-bold border ${getRiskColor(risk_level)}`}>
                  {risk_level}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Your Loan Recommendation Summary
              </h2>
              <p className="text-sm text-slate-600">
                {eligible 
                  ? 'Your financial and credit profile meets the model\'s recommended loan criteria.'
                  : 'Your profile has elevated risk indicators. See recommended adjusted terms below.'}
              </p>
            </div>

            {/* Circular Recommendation Score Gauge */}
            <div className="flex items-center space-x-4 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm shrink-0">
              <div className="relative w-24 h-24 flex items-center justify-center">
                {/* SVG Progress Circle */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-100"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className={eligible ? "text-emerald-500" : "text-amber-500"}
                    strokeDasharray={`${recommendation_score}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-black text-slate-900">{recommendation_score}%</span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">ML Score</span>
                </div>
              </div>
              <div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">RECOMMENDATION SCORE</div>
                <div className="text-sm font-extrabold text-slate-900">
                  Model Recommendation Confidence: {recommendation_score >= 75 ? 'High' : recommendation_score >= 50 ? 'Moderate' : 'Low'}
                </div>
                <div className="text-xs text-slate-500">Based on 1,500 historical credit samples</div>
              </div>
            </div>

          </div>
        </div>

        {/* 4 Metric Cards Grid */}
        <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 bg-slate-50/50">
          
          {/* Card 1 */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Recommended Loan</span>
            <div className="text-2xl font-black text-slate-900">{formatCurrency(recommended_loan_amount)}</div>
            <p className="text-xs text-slate-500">Optimized against disposable income</p>
          </div>

          {/* Card 2 */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Recommended Tenure</span>
            <div className="text-2xl font-black text-slate-900">{recommended_tenure_years} Years</div>
            <p className="text-xs text-slate-500">({recommended_tenure_years * 12} Monthly installments)</p>
          </div>

          {/* Card 3 */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Estimated Interest Rate</span>
            <div className="text-2xl font-black text-blue-600">{estimated_interest_rate}% p.a.</div>
            <p className="text-xs text-slate-500">Risk-adjusted benchmark rate</p>
          </div>

          {/* Card 4 */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Estimated Monthly EMI</span>
            <div className="text-2xl font-black text-emerald-600">{formatCurrency(estimated_monthly_emi)}/mo</div>
            <p className="text-xs text-slate-500">Principal + Interest monthly</p>
          </div>

        </div>

        {/* Section 8: Personalized Explanation */}
        <div className="p-6 sm:p-8 border-t border-slate-200/80 space-y-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight flex items-center">
              <Award className="w-5 h-5 text-blue-600 mr-2" />
              Why this recommendation?
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Transparent, human-readable explanations generated directly from your financial profile evaluation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Strengths */}
            <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-3">
              <h4 className="text-sm font-bold text-emerald-900 flex items-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2" />
                Profile Strengths & Positive Drivers
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                {explanations?.strengths?.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-emerald-600 font-bold mr-2">✓</span>
                    <span>{item.replace(/^✓\s*/, '')}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Areas for Improvement */}
            <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-3">
              <h4 className="text-sm font-bold text-amber-900 flex items-center">
                <AlertTriangle className="w-4 h-4 text-amber-600 mr-2" />
                Risk Factors & Areas for Improvement
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                {explanations?.areas_for_improvement?.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-amber-600 font-bold mr-2">⚠</span>
                    <span>{item.replace(/^⚠\s*/, '')}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Section 20: Mandatory Safety/Disclaimer */}
        <div className="p-6 sm:p-8 bg-slate-900 text-slate-300 border-t border-slate-800 space-y-3">
          <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
            <Info className="w-5 h-5 shrink-0" />
            <span>Important Academic & Regulatory Disclaimer</span>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
            {disclaimer || "Disclaimer: This recommendation is generated by a machine-learning model for educational and demonstration purposes only. It is not a financial approval or guarantee of loan eligibility."}
          </p>
        </div>

      </div>

      {/* Recalculate & Actions Footer Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <button
          onClick={onRecalculate}
          className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white border border-slate-300 text-slate-700 font-semibold text-sm shadow-xs hover:bg-slate-50 transition-colors"
        >
          <RefreshCw className="w-4 h-4 mr-2 text-slate-500" />
          Modify Form & Recalculate
        </button>

        <div className="w-full sm:w-auto flex items-center space-x-3">
          <button
            onClick={() => window.print()}
            className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3 rounded-xl bg-white border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors"
          >
            <FileText className="w-4 h-4 mr-2 text-slate-500" />
            Print Report
          </button>
          
          <button
            onClick={onNavigateToDataScience}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm shadow-md hover:bg-blue-700 transition-colors"
          >
            Data Science Breakdown
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>

      {/* Embedded Live EMI Adjuster for recommended terms */}
      <div className="pt-6">
        <EmiCalculator 
          initialAmount={recommended_loan_amount} 
          initialRate={estimated_interest_rate} 
          initialTenure={recommended_tenure_years} 
        />
      </div>

    </div>
  );
}
