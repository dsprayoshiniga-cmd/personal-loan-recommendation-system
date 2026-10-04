import React from 'react';
import { ShieldCheck, BookOpen, Cpu, Target, Award, Info, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
          <BookOpen className="w-3.5 h-3.5 mr-1.5 text-blue-600" />
          Academic Data Science Capstone Project
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          About The Project
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          Comprehensive overview of objectives, domain background, architecture, and educational scope.
        </p>
      </div>

      {/* Main Info Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/50 p-6 sm:p-10 space-y-8">
        
        {/* Project Meta Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
          
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Project Title</span>
            <span className="text-base font-bold text-slate-900">Personal Loan Recommendation System</span>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Domain</span>
            <span className="text-base font-bold text-blue-600">Data Science / Machine Learning</span>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Core Model</span>
            <span className="text-base font-bold text-emerald-600">Scikit-Learn Random Forest</span>
          </div>

        </div>

        {/* Objective */}
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-slate-900 flex items-center">
            <Target className="w-5 h-5 text-blue-600 mr-2" />
            Project Objective
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            To develop a machine-learning-based system that analyzes an individual's financial profile—including credit score, net monthly income, debt-to-income (DTI) ratio, employment stability, and savings buffer—to provide a personalized personal-loan recommendation and risk evaluation.
          </p>
        </div>

        {/* Academic Prototype Notice */}
        <div className="p-6 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-3">
          <div className="flex items-center space-x-2 text-amber-900 font-bold text-base">
            <Info className="w-5 h-5 text-amber-600 shrink-0" />
            <span>Academic Prototype Disclaimer</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Please note that this application is designed and built as an <strong>academic prototype</strong> for demonstrating Data Science and Machine Learning principles. It does not replace formal credit underwriting or decisioning made by official banking and financial institutions.
          </p>
        </div>

        {/* Key Features Implemented */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900 flex items-center">
            <Award className="w-5 h-5 text-blue-600 mr-2" />
            Key Deliverables & Implementation Highlights
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
            <li className="flex items-start p-3 rounded-xl bg-slate-50 border border-slate-200/60">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 shrink-0 mt-0.5" />
              <span>Full-stack REST API architecture combining React, Vite, and Flask.</span>
            </li>
            <li className="flex items-start p-3 rounded-xl bg-slate-50 border border-slate-200/60">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 shrink-0 mt-0.5" />
              <span>Synthetic dataset generation (1,500 records) with domain-specific approval logic.</span>
            </li>
            <li className="flex items-start p-3 rounded-xl bg-slate-50 border border-slate-200/60">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 shrink-0 mt-0.5" />
              <span>Scikit-Learn Random Forest Classifier training with evaluation metrics export.</span>
            </li>
            <li className="flex items-start p-3 rounded-xl bg-slate-50 border border-slate-200/60">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 shrink-0 mt-0.5" />
              <span>Interactive EMI calculator with Recharts visual payment breakdown.</span>
            </li>
          </ul>
        </div>

      </div>

    </div>
  );
}
