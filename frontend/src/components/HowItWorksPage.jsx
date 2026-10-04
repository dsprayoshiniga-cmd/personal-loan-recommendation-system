import React from 'react';
import { 
  FileEdit, Layers, Cpu, Award, ArrowDown, ArrowRight, CheckCircle2, Sparkles 
} from 'lucide-react';

export default function HowItWorksPage({ onStartRecommendation }) {
  const steps = [
    {
      num: '01',
      title: 'Enter Your Details',
      desc: 'Provide personal, employment and financial information across 4 structured form steps.',
      icon: FileEdit,
      color: 'bg-blue-50 text-blue-600 border-blue-200'
    },
    {
      num: '02',
      title: 'Data Preprocessing',
      desc: 'The system cleans inputs, scales numerical metrics using StandardScaler, and one-hot encodes categorical parameters.',
      icon: Layers,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-200'
    },
    {
      num: '03',
      title: 'Machine Learning Analysis',
      desc: 'Scikit-learn Random Forest Classifier evaluates creditworthiness across 120 decision trees trained on historical loan data.',
      icon: Cpu,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200'
    },
    {
      num: '04',
      title: 'Personalized Recommendation',
      desc: 'The system generates loan eligibility, risk tier, optimal amount/tenure, interest rate, and human-readable explanations.',
      icon: Award,
      color: 'bg-purple-50 text-purple-600 border-purple-200'
    }
  ];

  const flowchartNodes = [
    'User Input',
    'Data Preprocessing',
    'Feature Engineering',
    'ML Model (Random Forest)',
    'Risk Prediction',
    'Loan Recommendation',
    'Personalized Result'
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      
      {/* Title */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
          <Sparkles className="w-3.5 h-3.5 mr-1.5 text-blue-600" />
          Transparent System Design
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          How LoanWise Machine Learning Works
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          Learn how financial inputs are preprocessed, engineered, and evaluated through our Random Forest Classification model.
        </p>
      </div>

      {/* 4 Step Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-md space-y-4 relative group hover:border-blue-300 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-400 font-mono tracking-widest">{s.num}</span>
                <div className={`w-10 h-10 rounded-2xl border flex items-center justify-center ${s.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-900">{s.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{s.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Architecture Flow Diagram */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/50 p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-1">
          <h3 className="text-xl font-bold text-slate-900">System Flow Architecture Diagram</h3>
          <p className="text-xs text-slate-500">Sequential data transformation path from client input to Flask model prediction</p>
        </div>

        {/* Horizontal Flow on Desktop */}
        <div className="hidden lg:flex items-center justify-center space-x-2 py-4">
          {flowchartNodes.map((node, i) => (
            <React.Fragment key={i}>
              <div className="px-4 py-3 rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100 border border-slate-200 shadow-2xs text-center text-xs font-bold text-slate-800">
                {node}
              </div>
              {i < flowchartNodes.length - 1 && (
                <ArrowRight className="w-4 h-4 text-blue-600 shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Vertical Flow on Mobile */}
        <div className="flex lg:hidden flex-col items-center space-y-2 py-2">
          {flowchartNodes.map((node, i) => (
            <React.Fragment key={i}>
              <div className="w-full max-w-xs px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-center text-xs font-bold text-slate-800">
                {node}
              </div>
              {i < flowchartNodes.length - 1 && (
                <ArrowDown className="w-4 h-4 text-blue-600 my-1" />
              )}
            </React.Fragment>
          ))}
        </div>

      </div>

      {/* CTA Box */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white text-center space-y-4 shadow-xl shadow-blue-600/20">
        <h3 className="text-2xl font-black">Ready to Check Your Loan Eligibility?</h3>
        <p className="text-sm text-blue-100 max-w-xl mx-auto">
          Experience our machine learning recommendation system firsthand with instant analysis.
        </p>
        <button
          onClick={onStartRecommendation}
          className="inline-flex items-center px-8 py-3.5 rounded-xl bg-white text-blue-700 font-bold text-sm shadow-md hover:bg-blue-50 transition-colors"
        >
          Check My Eligibility Now
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>

    </div>
  );
}
