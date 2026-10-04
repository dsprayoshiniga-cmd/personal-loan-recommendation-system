import React from 'react';
import { Mail, ShieldCheck, Cpu, Code2, Lock } from 'lucide-react';

export default function ContactSection() {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-lg shadow-slate-200/40 p-8 sm:p-10 space-y-8">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <h3 className="text-2xl font-black text-slate-900">Project Information & Demonstration Support</h3>
        <p className="text-sm text-slate-600">
          This system was developed as a college Data Science & Machine Learning capstone project.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Info 1 */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
          <div className="flex items-center space-x-2 text-blue-600 font-bold text-sm">
            <Cpu className="w-4 h-4" />
            <span>Machine Learning Core</span>
          </div>
          <p className="text-xs text-slate-600">
            Scikit-Learn Random Forest Pipeline trained on 1,500 credit profiles with automated feature scaling and one-hot encoding.
          </p>
        </div>

        {/* Info 2 */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
          <div className="flex items-center space-x-2 text-indigo-600 font-bold text-sm">
            <Code2 className="w-4 h-4" />
            <span>Full-Stack Architecture</span>
          </div>
          <p className="text-xs text-slate-600">
            React + Vite single-page application communicating via RESTful API with a Python Flask backend service.
          </p>
        </div>

        {/* Info 3 */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
          <div className="flex items-center space-x-2 text-emerald-600 font-bold text-sm">
            <Lock className="w-4 h-4" />
            <span>Data Privacy Note</span>
          </div>
          <p className="text-xs text-slate-600">
            All user form inputs processed during session inference remain private and local. No personal identifiers are stored or shared.
          </p>
        </div>

      </div>
    </div>
  );
}
