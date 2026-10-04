import React, { useState, useMemo } from 'react';
import { Calculator, DollarSign, Calendar, Percent, PieChart as PieIcon, ArrowRight } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export default function EmiCalculator({ initialAmount = 500000, initialRate = 10.5, initialTenure = 5 }) {
  const [loanAmount, setLoanAmount] = useState(initialAmount);
  const [interestRate, setInterestRate] = useState(initialRate);
  const [tenureYears, setTenureYears] = useState(initialTenure);

  const calculation = useMemo(() => {
    const P = parseFloat(loanAmount) || 0;
    const annualRate = parseFloat(interestRate) || 0;
    const years = parseInt(tenureYears) || 1;
    const r = (annualRate / 100) / 12;
    const n = years * 12;

    if (P <= 0 || n <= 0) {
      return { monthlyEmi: 0, totalInterest: 0, totalPayable: 0 };
    }

    let emi = 0;
    if (r === 0) {
      emi = P / n;
    } else {
      emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }

    const monthlyEmi = Math.round(emi);
    const totalPayable = Math.round(monthlyEmi * n);
    const totalInterest = Math.max(0, totalPayable - P);

    return { monthlyEmi, totalInterest, totalPayable };
  }, [loanAmount, interestRate, tenureYears]);

  const pieData = [
    { name: 'Principal Amount', value: parseFloat(loanAmount) || 0, color: '#2563EB' },
    { name: 'Total Interest', value: calculation.totalInterest, color: '#F59E0B' }
  ];

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/50 p-6 sm:p-8 space-y-8">
      
      {/* Header */}
      <div className="flex items-center space-x-3 border-b border-slate-100 pb-5">
        <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Personal Loan EMI Calculator</h3>
          <p className="text-sm text-slate-500">Calculate estimated monthly installments and interest breakdown</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Inputs */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Input 1: Loan Amount */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-semibold text-slate-700">
              <label htmlFor="loanAmountInput">Desired Loan Amount</label>
              <span className="text-base font-bold text-blue-600">{formatCurrency(loanAmount)}</span>
            </div>
            <input
              id="loanAmountInput"
              type="range"
              min="20000"
              max="2500000"
              step="10000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-slate-400 font-mono">
              <span>₹20,000</span>
              <span>₹10,000,00</span>
              <span>₹25,000,00</span>
            </div>
          </div>

          {/* Input 2: Interest Rate */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-semibold text-slate-700">
              <label htmlFor="interestRateInput">Estimated Interest Rate (% p.a.)</label>
              <span className="text-base font-bold text-blue-600">{interestRate}%</span>
            </div>
            <input
              id="interestRateInput"
              type="range"
              min="8.0"
              max="24.0"
              step="0.25"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-slate-400 font-mono">
              <span>8.0%</span>
              <span>15.0%</span>
              <span>24.0%</span>
            </div>
          </div>

          {/* Input 3: Tenure */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-semibold text-slate-700">
              <label htmlFor="tenureInput">Loan Tenure (Years)</label>
              <span className="text-base font-bold text-blue-600">{tenureYears} {tenureYears === 1 ? 'Year' : 'Years'} ({tenureYears * 12} Months)</span>
            </div>
            <input
              id="tenureInput"
              type="range"
              min="1"
              max="7"
              step="1"
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-slate-400 font-mono">
              <span>1 Year</span>
              <span>4 Years</span>
              <span>7 Years</span>
            </div>
          </div>

          {/* Key Metric Highlights */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 text-center">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">Monthly EMI</span>
              <span className="text-lg sm:text-xl font-extrabold text-blue-700">{formatCurrency(calculation.monthlyEmi)}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-100 text-center">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">Total Interest</span>
              <span className="text-lg sm:text-xl font-extrabold text-amber-700">{formatCurrency(calculation.totalInterest)}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-100 border border-slate-200 text-center">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">Total Amount</span>
              <span className="text-lg sm:text-xl font-extrabold text-slate-900">{formatCurrency(calculation.totalPayable)}</span>
            </div>
          </div>

        </div>

        {/* Right Chart Visualization */}
        <div className="lg:col-span-5 bg-slate-50/80 rounded-2xl p-6 border border-slate-200/80 flex flex-col items-center justify-center">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center">
            <PieIcon className="w-4 h-4 mr-1.5 text-blue-600" />
            Payment Breakdown
          </h4>

          <div className="w-full h-56 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', border: 'none' }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Inner Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xs text-slate-400 font-medium">Monthly EMI</span>
              <span className="text-sm font-extrabold text-slate-900">{formatCurrency(calculation.monthlyEmi)}</span>
            </div>
          </div>

          <div className="w-full flex justify-center space-x-6 text-xs mt-2">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-blue-600 inline-block"></span>
              <span className="text-slate-600 font-medium">Principal ({Math.round(((loanAmount)/calculation.totalPayable)*100 || 0)}%)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
              <span className="text-slate-600 font-medium">Interest ({Math.round(((calculation.totalInterest)/calculation.totalPayable)*100 || 0)}%)</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
