import React from 'react';
import { ShieldCheck, Cpu, Database, Award, Info, Heart } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: About */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">LoanWise</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Personal Loan Recommendation System powered by Scikit-learn Random Forest Classification. An academic Data Science & Machine Learning project demonstration.
            </p>
            <div className="flex items-center space-x-2 text-xs text-slate-400 pt-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Backend API Status: Active (Flask REST)</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-white font-semibold text-base mb-4 tracking-wide">Quick Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              {['Home', 'Loan Recommendation', 'How It Works', 'Data Science', 'Dashboard', 'About'].map((item) => {
                const idMap = {
                  'Home': 'home',
                  'Loan Recommendation': 'recommendation',
                  'How It Works': 'how-it-works',
                  'Data Science': 'data-science',
                  'Dashboard': 'dashboard',
                  'About': 'about'
                };
                return (
                  <li key={item}>
                    <button
                      onClick={() => {
                        setActiveTab(idMap[item]);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="text-slate-400 hover:text-blue-400 transition-colors"
                    >
                      {item}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Col 3: Technology Stack */}
          <div>
            <h4 className="text-white font-semibold text-base mb-4 tracking-wide">Technology Stack</h4>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">Python 3.11</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">Flask REST API</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">Scikit-Learn</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">Random Forest</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">Pandas & NumPy</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">React + Vite</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">Tailwind CSS</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">Recharts</span>
            </div>
          </div>

          {/* Col 4: Disclaimer & Academic Note */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-base mb-4 tracking-wide">Academic Disclaimer</h4>
            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs text-slate-400 leading-relaxed">
              <div className="flex items-center text-amber-400 font-semibold mb-1">
                <Info className="w-4 h-4 mr-1.5 shrink-0" />
                Demonstration Only
              </div>
              This application is built as a college Data Science capstone project. Predictions do not constitute guaranteed bank approvals or official financial advice.
            </div>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} LoanWise Recommendation Engine. Academic Capstone Project.</p>
          <div className="flex items-center space-x-1">
            <span>Built for Data Science & Machine Learning Demonstration</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
