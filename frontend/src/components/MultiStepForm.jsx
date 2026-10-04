import React, { useState } from 'react';
import { 
  User, Briefcase, CreditCard, Target, Sparkles, 
  ChevronRight, ChevronLeft, AlertCircle, Info, Loader2, CheckCircle2 
} from 'lucide-react';
import { getPrediction } from '../services/api';
import ResultDashboard from './ResultDashboard';

export default function MultiStepForm({ onNavigateToDataScience }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(1);
  const [predictionResult, setPredictionResult] = useState(null);
  const [errors, setErrors] = useState({});

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Personal
    age: 32,
    gender: 'Male',
    maritalStatus: 'Married',
    dependents: 1,
    education: 'Graduate',
    
    // Step 2: Employment
    employmentType: 'Salaried',
    monthlyIncome: 65000,
    employmentYears: 4.5,
    employerType: 'Private Company',
    
    // Step 3: Financial
    creditScore: 740,
    existingLoan: 'No',
    existingEmi: 0,
    monthlyExpenses: 20000,
    savings: 180000,
    
    // Step 4: Loan Requirement
    desiredLoanAmount: 400000,
    preferredLoanTenure: 5,
    loanPurpose: 'Home Renovation'
  });

  const steps = [
    { number: 1, title: 'Personal', icon: User },
    { number: 2, title: 'Employment', icon: Briefcase },
    { number: 3, title: 'Financial', icon: CreditCard },
    { number: 4, title: 'Loan Requirement', icon: Target }
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateStep = (step) => {
    const errs = {};
    if (step === 1) {
      if (!formData.age || formData.age < 18 || formData.age > 70) {
        errs.age = 'Age must be between 18 and 70';
      }
    } else if (step === 2) {
      if (!formData.monthlyIncome || formData.monthlyIncome < 5000) {
        errs.monthlyIncome = 'Monthly income must be at least ₹5,000';
      }
      if (formData.employmentYears === '' || formData.employmentYears < 0) {
        errs.employmentYears = 'Employment years cannot be negative';
      }
    } else if (step === 3) {
      if (!formData.creditScore || formData.creditScore < 300 || formData.creditScore > 850) {
        errs.creditScore = 'Credit score must be between 300 and 850';
      }
      if (formData.existingLoan === 'Yes' && (formData.existingEmi === '' || formData.existingEmi < 0)) {
        errs.existingEmi = 'Please specify valid existing monthly EMI';
      }
      if (formData.monthlyExpenses === '' || formData.monthlyExpenses < 0) {
        errs.monthlyExpenses = 'Monthly expenses cannot be negative';
      }
      if (formData.savings === '' || formData.savings < 0) {
        errs.savings = 'Savings cannot be negative';
      }
    } else if (step === 4) {
      if (!formData.desiredLoanAmount || formData.desiredLoanAmount < 10000) {
        errs.desiredLoanAmount = 'Desired loan amount must be at least ₹10,000';
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(4)) return;

    setLoading(true);
    setLoadingStep(1);

    // Simulate multi-stage ML pipeline feedback for visual presentation
    const t1 = setTimeout(() => setLoadingStep(2), 500);
    const t2 = setTimeout(() => setLoadingStep(3), 1100);

    try {
      const res = await getPrediction(formData);
      clearTimeout(t1);
      clearTimeout(t2);
      setPredictionResult(res);
      setCurrentStep(5); // Result Step
      window.scrollTo({ top: 50, behavior: 'smooth' });
    } catch (err) {
      setErrors({ submit: err.message || 'Error generating recommendation' });
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val || 0);
  };

  // If results are generated, render ResultDashboard
  if (currentStep === 5 && predictionResult) {
    return (
      <ResultDashboard 
        result={predictionResult} 
        onRecalculate={() => setCurrentStep(1)} 
        onNavigateToDataScience={onNavigateToDataScience}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
          <Sparkles className="w-3.5 h-3.5 mr-1.5 text-blue-600" />
          Scikit-Learn Powered Model
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Personal Loan Recommendation
        </h2>
        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
          Complete the 4-step financial profile assessment to receive a machine learning credit recommendation.
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/90 shadow-sm">
        <div className="grid grid-cols-4 gap-2 relative">
          
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isCompleted = currentStep > s.number;
            const isCurrent = currentStep === s.number;
            
            return (
              <div key={s.number} className="flex flex-col items-center relative z-10">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-bold text-sm sm:text-base transition-all duration-200 ${
                  isCompleted 
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20' 
                    : isCurrent 
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 ring-4 ring-blue-100' 
                      : 'bg-slate-100 text-slate-400'
                }`}>
                  {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                </div>
                <span className={`text-[11px] sm:text-xs font-semibold mt-2 text-center ${
                  isCurrent ? 'text-blue-700 font-bold' : isCompleted ? 'text-slate-800' : 'text-slate-400'
                }`}>
                  Step {s.number}: {s.title}
                </span>
              </div>
            );
          })}

        </div>
      </div>

      {/* Main Form Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/50 p-6 sm:p-10 space-y-8 relative">
        
        {/* Loading Overlay */}
        {loading && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-md rounded-3xl z-30 flex flex-col items-center justify-center p-8 space-y-6 text-center animate-in fade-in">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 animate-spin">
              <Loader2 className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900">Processing ML Recommendation</h3>
              <p className="text-sm text-slate-500 font-mono">
                {loadingStep === 1 && "1. Scaling numerical features & encoding categoricals..."}
                {loadingStep === 2 && "2. Executing Random Forest Decision Trees (120 estimators)..."}
                {loadingStep === 3 && "3. Computing risk matrix & recommendation metrics..."}
              </p>
            </div>
            <div className="w-64 bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full animate-pulse w-full"></div>
            </div>
          </div>
        )}

        {errors.submit && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center">
            <AlertCircle className="w-5 h-5 mr-2 shrink-0" />
            {errors.submit}
          </div>
        )}

        {/* STEP 1: PERSONAL INFORMATION */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-xl font-bold text-slate-900 flex items-center">
                <User className="w-5 h-5 text-blue-600 mr-2" />
                Step 1 — Personal Information
              </h3>
              <p className="text-xs text-slate-500">Demographic baseline parameters</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Age */}
              <div className="space-y-2">
                <label htmlFor="ageInput" className="block text-sm font-semibold text-slate-700">Age (Years)</label>
                <input
                  id="ageInput"
                  type="number"
                  min="18"
                  max="70"
                  value={formData.age}
                  onChange={(e) => handleChange('age', parseInt(e.target.value) || '')}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium text-slate-900"
                />
                {errors.age && <p className="text-xs text-rose-600 font-medium">{errors.age}</p>}
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <label htmlFor="genderSelect" className="block text-sm font-semibold text-slate-700">Gender</label>
                <select
                  id="genderSelect"
                  value={formData.gender}
                  onChange={(e) => handleChange('gender', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium text-slate-900 bg-white"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Marital Status */}
              <div className="space-y-2">
                <label htmlFor="maritalSelect" className="block text-sm font-semibold text-slate-700">Marital Status</label>
                <select
                  id="maritalSelect"
                  value={formData.maritalStatus}
                  onChange={(e) => handleChange('maritalStatus', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium text-slate-900 bg-white"
                >
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                </select>
              </div>

              {/* Dependents */}
              <div className="space-y-2">
                <label htmlFor="dependentsSelect" className="block text-sm font-semibold text-slate-700">Number of Dependents</label>
                <select
                  id="dependentsSelect"
                  value={formData.dependents}
                  onChange={(e) => handleChange('dependents', parseInt(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium text-slate-900 bg-white"
                >
                  <option value={0}>0 (No Dependents)</option>
                  <option value={1}>1 Dependent</option>
                  <option value={2}>2 Dependents</option>
                  <option value={3}>3 Dependents</option>
                  <option value={4}>4+ Dependents</option>
                </select>
              </div>

              {/* Education */}
              <div className="space-y-2 sm:col-span-2">
                <label htmlFor="educationSelect" className="block text-sm font-semibold text-slate-700">Highest Education Qualification</label>
                <select
                  id="educationSelect"
                  value={formData.education}
                  onChange={(e) => handleChange('education', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium text-slate-900 bg-white"
                >
                  <option value="High School">High School</option>
                  <option value="Graduate">Graduate (Bachelor's Degree)</option>
                  <option value="Post Graduate">Post Graduate (Master's Degree)</option>
                  <option value="Doctorate">Doctorate (Ph.D. / Professional)</option>
                </select>
              </div>

            </div>
          </div>
        )}

        {/* STEP 2: EMPLOYMENT & INCOME */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-xl font-bold text-slate-900 flex items-center">
                <Briefcase className="w-5 h-5 text-blue-600 mr-2" />
                Step 2 — Employment & Income
              </h3>
              <p className="text-xs text-slate-500">Employment stability and monthly cash inflow</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Employment Type */}
              <div className="space-y-2">
                <label htmlFor="empTypeSelect" className="block text-sm font-semibold text-slate-700">Employment Type</label>
                <select
                  id="empTypeSelect"
                  value={formData.employmentType}
                  onChange={(e) => handleChange('employmentType', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium text-slate-900 bg-white"
                >
                  <option value="Salaried">Salaried</option>
                  <option value="Self Employed">Self Employed</option>
                  <option value="Business">Business Owner</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Monthly Income */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label htmlFor="monthlyIncomeInput" className="block text-sm font-semibold text-slate-700">Monthly Net Income (₹)</label>
                  <span className="text-xs font-bold text-blue-600">{formatCurrency(formData.monthlyIncome)}</span>
                </div>
                <input
                  id="monthlyIncomeInput"
                  type="number"
                  step="1000"
                  value={formData.monthlyIncome}
                  onChange={(e) => handleChange('monthlyIncome', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium text-slate-900"
                />
                {errors.monthlyIncome && <p className="text-xs text-rose-600 font-medium">{errors.monthlyIncome}</p>}
              </div>

              {/* Employment Years */}
              <div className="space-y-2">
                <label htmlFor="empYearsInput" className="block text-sm font-semibold text-slate-700">Years in Current Work/Job</label>
                <input
                  id="empYearsInput"
                  type="number"
                  step="0.5"
                  min="0"
                  max="40"
                  value={formData.employmentYears}
                  onChange={(e) => handleChange('employmentYears', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium text-slate-900"
                />
                {errors.employmentYears && <p className="text-xs text-rose-600 font-medium">{errors.employmentYears}</p>}
              </div>

              {/* Employer Type */}
              <div className="space-y-2">
                <label htmlFor="employerTypeSelect" className="block text-sm font-semibold text-slate-700">Employer Category</label>
                <select
                  id="employerTypeSelect"
                  value={formData.employerType}
                  onChange={(e) => handleChange('employerType', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium text-slate-900 bg-white"
                >
                  <option value="Private Company">Private Company</option>
                  <option value="Government">Government / Public Sector</option>
                  <option value="MNC">Multinational Corporation (MNC)</option>
                  <option value="Self-Employed/Business">Self-Employed / Business</option>
                  <option value="Other">Other</option>
                </select>
              </div>

            </div>
          </div>
        )}

        {/* STEP 3: FINANCIAL INFORMATION */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-xl font-bold text-slate-900 flex items-center">
                <CreditCard className="w-5 h-5 text-blue-600 mr-2" />
                Step 3 — Financial Information
              </h3>
              <p className="text-xs text-slate-500">Credit profile, existing liabilities, and liquid savings</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Credit Score */}
              <div className="space-y-2 sm:col-span-2 p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                <div className="flex justify-between items-center">
                  <label htmlFor="creditScoreInput" className="text-sm font-semibold text-slate-700 flex items-center">
                    Credit Score (CIBIL / Experian)
                    <span className="ml-2 group relative cursor-pointer text-slate-400 hover:text-blue-600">
                      <Info className="w-4 h-4" />
                    </span>
                  </label>
                  <span className={`text-base font-black px-3 py-1 rounded-lg ${
                    formData.creditScore >= 750 ? 'bg-emerald-100 text-emerald-800' : formData.creditScore >= 650 ? 'bg-blue-100 text-blue-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {formData.creditScore} - {formData.creditScore >= 750 ? 'Excellent' : formData.creditScore >= 680 ? 'Good' : formData.creditScore >= 600 ? 'Fair' : 'Poor'}
                  </span>
                </div>
                <input
                  id="creditScoreInput"
                  type="range"
                  min="300"
                  max="850"
                  step="5"
                  value={formData.creditScore}
                  onChange={(e) => handleChange('creditScore', parseInt(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-slate-400 font-mono">
                  <span>300 (Poor)</span>
                  <span>650 (Fair)</span>
                  <span>750 (Good)</span>
                  <span>850 (Excellent)</span>
                </div>
                {errors.creditScore && <p className="text-xs text-rose-600 font-medium">{errors.creditScore}</p>}
              </div>

              {/* Existing Loan */}
              <div className="space-y-2">
                <label htmlFor="existingLoanSelect" className="block text-sm font-semibold text-slate-700">Existing Active Loans?</label>
                <select
                  id="existingLoanSelect"
                  value={formData.existingLoan}
                  onChange={(e) => {
                    const val = e.target.value;
                    handleChange('existingLoan', val);
                    if (val === 'No') handleChange('existingEmi', 0);
                  }}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium text-slate-900 bg-white"
                >
                  <option value="No">No Existing Loans</option>
                  <option value="Yes">Yes, Active Loans</option>
                </select>
              </div>

              {/* Existing EMI */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label htmlFor="existingEmiInput" className="block text-sm font-semibold text-slate-700">Existing Monthly EMI (₹)</label>
                  <span className="text-xs font-bold text-slate-500">{formatCurrency(formData.existingEmi)}</span>
                </div>
                <input
                  id="existingEmiInput"
                  type="number"
                  disabled={formData.existingLoan === 'No'}
                  value={formData.existingEmi}
                  onChange={(e) => handleChange('existingEmi', parseFloat(e.target.value) || 0)}
                  className={`w-full px-4 py-3 rounded-xl border font-medium text-slate-900 ${
                    formData.existingLoan === 'No' ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed' : 'border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500'
                  }`}
                />
                {errors.existingEmi && <p className="text-xs text-rose-600 font-medium">{errors.existingEmi}</p>}
              </div>

              {/* Monthly Expenses */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label htmlFor="monthlyExpensesInput" className="block text-sm font-semibold text-slate-700">Estimated Monthly Expenses (₹)</label>
                  <span className="text-xs font-bold text-slate-500">{formatCurrency(formData.monthlyExpenses)}</span>
                </div>
                <input
                  id="monthlyExpensesInput"
                  type="number"
                  value={formData.monthlyExpenses}
                  onChange={(e) => handleChange('monthlyExpenses', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium text-slate-900"
                />
                {errors.monthlyExpenses && <p className="text-xs text-rose-600 font-medium">{errors.monthlyExpenses}</p>}
              </div>

              {/* Savings */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label htmlFor="savingsInput" className="block text-sm font-semibold text-slate-700">Total Liquid Savings / Fixed Deposits (₹)</label>
                  <span className="text-xs font-bold text-emerald-600">{formatCurrency(formData.savings)}</span>
                </div>
                <input
                  id="savingsInput"
                  type="number"
                  value={formData.savings}
                  onChange={(e) => handleChange('savings', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium text-slate-900"
                />
                {errors.savings && <p className="text-xs text-rose-600 font-medium">{errors.savings}</p>}
              </div>

            </div>
          </div>
        )}

        {/* STEP 4: LOAN REQUIREMENT */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-xl font-bold text-slate-900 flex items-center">
                <Target className="w-5 h-5 text-blue-600 mr-2" />
                Step 4 — Loan Requirement
              </h3>
              <p className="text-xs text-slate-500">Requested loan quantum, tenure, and purpose</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Desired Loan Amount */}
              <div className="space-y-2 sm:col-span-2">
                <div className="flex justify-between items-center">
                  <label htmlFor="desiredLoanAmountInput" className="block text-sm font-semibold text-slate-700">Desired Loan Amount (₹)</label>
                  <span className="text-xl font-extrabold text-blue-600">{formatCurrency(formData.desiredLoanAmount)}</span>
                </div>
                <input
                  id="desiredLoanAmountInput"
                  type="number"
                  step="10000"
                  min="10000"
                  max="2500000"
                  value={formData.desiredLoanAmount}
                  onChange={(e) => handleChange('desiredLoanAmount', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-bold text-lg text-slate-900"
                />
                {errors.desiredLoanAmount && <p className="text-xs text-rose-600 font-medium">{errors.desiredLoanAmount}</p>}
              </div>

              {/* Preferred Loan Tenure */}
              <div className="space-y-2">
                <label htmlFor="preferredLoanTenureSelect" className="block text-sm font-semibold text-slate-700">Preferred Loan Tenure (Years)</label>
                <select
                  id="preferredLoanTenureSelect"
                  value={formData.preferredLoanTenure}
                  onChange={(e) => handleChange('preferredLoanTenure', parseInt(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium text-slate-900 bg-white"
                >
                  <option value={1}>1 Year (12 Months)</option>
                  <option value={2}>2 Years (24 Months)</option>
                  <option value={3}>3 Years (36 Months)</option>
                  <option value={4}>4 Years (48 Months)</option>
                  <option value={5}>5 Years (60 Months)</option>
                  <option value={6}>6 Years (72 Months)</option>
                  <option value={7}>7 Years (84 Months)</option>
                </select>
              </div>

              {/* Loan Purpose */}
              <div className="space-y-2">
                <label htmlFor="loanPurposeSelect" className="block text-sm font-semibold text-slate-700">Loan Purpose</label>
                <select
                  id="loanPurposeSelect"
                  value={formData.loanPurpose}
                  onChange={(e) => handleChange('loanPurpose', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium text-slate-900 bg-white"
                >
                  <option value="Education">Education</option>
                  <option value="Medical">Medical</option>
                  <option value="Home Renovation">Home Renovation</option>
                  <option value="Wedding">Wedding</option>
                  <option value="Vehicle">Vehicle</option>
                  <option value="Personal">Personal</option>
                  <option value="Business">Business</option>
                  <option value="Other">Other</option>
                </select>
              </div>

            </div>

            {/* Quick Summary Teaser */}
            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-center justify-between text-xs text-slate-700">
              <span className="font-semibold text-blue-900">Summary: Requesting {formatCurrency(formData.desiredLoanAmount)} for {formData.loanPurpose} over {formData.preferredLoanTenure} Years</span>
              <span className="text-blue-600 font-mono">DTI Check Ready</span>
            </div>

          </div>
        )}

        {/* Buttons Nav */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-6">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 mr-1.5" />
              Back
            </button>
          ) : <div></div>}

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm shadow-md hover:bg-blue-700 transition-all group"
            >
              Next Step
              <ChevronRight className="w-4 h-4 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="inline-flex items-center px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-base shadow-lg shadow-blue-600/30 hover:from-blue-700 hover:to-indigo-700 transition-all group"
            >
              <Sparkles className="w-5 h-5 mr-2 text-blue-200 group-hover:rotate-12 transition-transform" />
              Generate Recommendation
            </button>
          )}
        </div>

      </div>

    </div>
  );
}
