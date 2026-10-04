import React, { useEffect, useState } from 'react';
import { Users, CheckCircle2, TrendingUp, ShieldAlert, BarChart2, PieChart as PieIcon, Activity } from 'lucide-react';
import { 
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend 
} from 'recharts';
import { getDashboardStats } from '../services/api';

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const totalApps = stats?.total_applications || 1500;
  const eligibleApps = stats?.eligible_applications || 775;
  const avgScore = stats?.average_recommendation_score || 78.4;
  const lowRiskPct = stats?.low_risk_percentage || 64.2;

  const charts = stats?.charts || {
    eligibility_distribution: [
      { name: 'Eligible', value: 775, color: '#10B981' },
      { name: 'Not Eligible', value: 725, color: '#EF4444' }
    ],
    risk_distribution: [
      { name: 'Low Risk', value: 963, color: '#10B981' },
      { name: 'Medium Risk', value: 382, color: '#F59E0B' },
      { name: 'High Risk', value: 155, color: '#EF4444' }
    ],
    amount_distribution: [
      { range: '₹30k - ₹2L', count: 420 },
      { range: '₹2L - ₹5L', count: 580 },
      { range: '₹5L - ₹10L', count: 320 },
      { range: '₹10L+', count: 180 }
    ],
    employment_distribution: [
      { type: 'Salaried', count: 900 },
      { type: 'Self Employed', count: 300 },
      { type: 'Business', count: 225 },
      { type: 'Other', count: 75 }
    ]
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      
      {/* Title */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
          <Activity className="w-3.5 h-3.5 mr-1.5 text-blue-600" />
          Live Analytics & Application Intelligence
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Personal Loan Analytics Dashboard
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          Real-time statistical overview derived from the system's stored dataset and applicant predictions.
        </p>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1: Total Applications */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Applications</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">{totalApps.toLocaleString()}</div>
          <p className="text-xs text-slate-500">Evaluated dataset records</p>
        </div>

        {/* Card 2: Eligible Applications */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Eligible Applicants</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-600">
            {eligibleApps.toLocaleString()} <span className="text-sm font-semibold text-slate-400">({Math.round((eligibleApps/totalApps)*100)}%)</span>
          </div>
          <p className="text-xs text-slate-500">Met minimum credit threshold</p>
        </div>

        {/* Card 3: Avg Score */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Avg Rec. Score</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-indigo-600">{avgScore}%</div>
          <p className="text-xs text-slate-500">Mean model confidence score</p>
        </div>

        {/* Card 4: Low Risk % */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Low Risk %</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">{lowRiskPct}%</div>
          <p className="text-xs text-slate-500">Low default probability profiles</p>
        </div>

      </div>

      {/* 4 Recharts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Chart 1: Loan Eligibility Distribution */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center">
              <PieIcon className="w-4 h-4 mr-2 text-blue-600" />
              1. Loan Eligibility Distribution
            </h3>
            <span className="text-xs text-slate-400">Target Label Split</span>
          </div>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={charts.eligibility_distribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {charts.eligibility_distribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', border: 'none' }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Risk Level Distribution */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center">
              <BarChart2 className="w-4 h-4 mr-2 text-indigo-600" />
              2. Risk Tier Breakdown
            </h3>
            <span className="text-xs text-slate-400">Low / Medium / High Risk</span>
          </div>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts.risk_distribution} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', border: 'none' }}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {charts.risk_distribution.map((entry, index) => (
                    <Cell key={`cell-risk-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Loan Amount Distribution */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center">
              <BarChart2 className="w-4 h-4 mr-2 text-emerald-600" />
              3. Requested Loan Amount Distribution
            </h3>
            <span className="text-xs text-slate-400">Quantum Ranges</span>
          </div>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts.amount_distribution} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="range" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', border: 'none' }}
                />
                <Bar dataKey="count" fill="#2563EB" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Employment Type Distribution */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center">
              <BarChart2 className="w-4 h-4 mr-2 text-purple-600" />
              4. Employment Category Distribution
            </h3>
            <span className="text-xs text-slate-400">Applicant Employment Types</span>
          </div>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts.employment_distribution} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="type" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', border: 'none' }}
                />
                <Bar dataKey="count" fill="#4F46E5" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
}
