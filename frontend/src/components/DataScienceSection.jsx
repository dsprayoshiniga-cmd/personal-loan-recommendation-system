import React, { useEffect, useState } from 'react';
import { Cpu, Database, BarChart3, GitBranch, ShieldCheck, CheckCircle2, Zap, ArrowRight, Table, Layers } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { getModelInfo } from '../services/api';

export default function DataScienceSection() {
  const [modelData, setModelData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchModelData() {
      try {
        const data = await getModelInfo();
        setModelData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchModelData();
  }, []);

  const pipelineSteps = [
    { name: '1. Dataset', desc: 'Synthetic/Historical credit profile data', icon: Database },
    { name: '2. Data Cleaning', desc: 'Missing values, outlier detection, scaling', icon: Layers },
    { name: '3. EDA', desc: 'Correlation analysis & variable distributions', icon: BarChart3 },
    { name: '4. Feature Eng.', desc: 'DTI ratio, disposable income, one-hot encoding', icon: GitBranch },
    { name: '5. Training', desc: 'Random Forest (120 trees, max_depth=12)', icon: Cpu },
    { name: '6. Evaluation', desc: 'Stratified K-fold cross validation', icon: ShieldCheck },
    { name: '7. Prediction', desc: 'Real-time REST API inference pipeline', icon: Zap }
  ];

  const metrics = modelData?.metrics || {
    accuracy: 84.67,
    precision: 83.85,
    recall: 87.10,
    f1_score: 85.44,
    roc_auc: 93.49
  };

  const featureImportances = modelData?.top_feature_importances || [
    { feature: 'Loan Amount', importance: 0.2496 },
    { feature: 'Tenure', importance: 0.1300 },
    { feature: 'Credit Score', importance: 0.0848 },
    { feature: 'Monthly Income', importance: 0.0717 },
    { feature: 'Existing EMI', importance: 0.0623 },
    { feature: 'Savings', importance: 0.0549 },
    { feature: 'Expenses', importance: 0.0525 },
    { feature: 'Emp. Years', importance: 0.0482 }
  ];

  const cm = modelData?.confusion_matrix || [[119, 26], [20, 135]];

  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      
      {/* Title */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
          <Cpu className="w-3.5 h-3.5 mr-1.5 text-blue-600" />
          Academic Data Science Architecture
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Machine Learning Behind the Recommendation
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          Explore the machine learning methodology, evaluation metrics, feature importances, and model validation pipeline powering LoanWise.
        </p>
      </div>

      {/* Visual Data Pipeline Flowchart */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-lg shadow-slate-200/50 p-6 sm:p-8 space-y-6">
        <h3 className="text-lg font-bold text-slate-900 flex items-center">
          <GitBranch className="w-5 h-5 text-blue-600 mr-2" />
          End-to-End Data Science & Machine Learning Pipeline
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 relative">
          {pipelineSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="relative group">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-blue-50/60 hover:border-blue-200 transition-all text-center space-y-2 h-full flex flex-col items-center justify-center">
                  <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 shadow-2xs group-hover:scale-110 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-900">{step.name}</span>
                  <p className="text-[10px] text-slate-500 leading-tight">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Model Information & Metrics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Algorithm Specs */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-lg shadow-slate-200/50 p-6 space-y-6">
          <h3 className="text-lg font-bold text-slate-900 flex items-center border-b border-slate-100 pb-3">
            <Cpu className="w-5 h-5 text-blue-600 mr-2" />
            Model Specifications
          </h3>

          <div className="space-y-4 text-sm">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Algorithm</span>
              <span className="font-bold text-slate-900">{modelData?.algorithm || 'Random Forest Classifier'}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Problem Type</span>
              <span className="font-bold text-slate-900">{modelData?.problem_type || 'Binary Classification'}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Target Variable</span>
              <span className="font-mono text-xs font-bold text-blue-600">{modelData?.target_variable || 'loan_eligible'}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Total Dataset Size</span>
              <span className="font-bold text-slate-900">{modelData?.total_samples || 1500} Records</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Train/Test Split</span>
              <span className="font-bold text-slate-900">80% / 20% Stratified</span>
            </div>
          </div>

          {/* Comparative Benchmark */}
          <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-100 space-y-2">
            <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider">Model Benchmark Comparison</h4>
            <div className="space-y-1.5 text-xs text-slate-700">
              <div className="flex justify-between">
                <span>Random Forest Accuracy:</span>
                <span className="font-bold text-emerald-700">{modelData?.comparison?.random_forest_accuracy || metrics.accuracy}%</span>
              </div>
              <div className="flex justify-between">
                <span>Logistic Regression Accuracy:</span>
                <span className="font-bold text-slate-700">{modelData?.comparison?.logistic_regression_accuracy || 87.67}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Column: Dynamic Evaluation Metrics */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/90 shadow-lg shadow-slate-200/50 p-6 sm:p-8 space-y-6">
          <h3 className="text-lg font-bold text-slate-900 flex items-center border-b border-slate-100 pb-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 mr-2" />
            Dynamic Model Evaluation Metrics
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            
            {/* Accuracy */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-center space-y-1">
              <span className="text-xs font-semibold text-emerald-900 uppercase tracking-wider block">Accuracy</span>
              <span className="text-2xl sm:text-3xl font-black text-emerald-700">{metrics.accuracy}%</span>
              <span className="text-[10px] text-emerald-600 block">Overall Correct Predictions</span>
            </div>

            {/* Precision */}
            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 text-center space-y-1">
              <span className="text-xs font-semibold text-blue-900 uppercase tracking-wider block">Precision</span>
              <span className="text-2xl sm:text-3xl font-black text-blue-700">{metrics.precision}%</span>
              <span className="text-[10px] text-blue-600 block">Positive Predictive Value</span>
            </div>

            {/* Recall */}
            <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-center space-y-1">
              <span className="text-xs font-semibold text-indigo-900 uppercase tracking-wider block">Recall</span>
              <span className="text-2xl sm:text-3xl font-black text-indigo-700">{metrics.recall}%</span>
              <span className="text-[10px] text-indigo-600 block">True Positive Rate</span>
            </div>

            {/* F1 Score */}
            <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100 text-center space-y-1">
              <span className="text-xs font-semibold text-purple-900 uppercase tracking-wider block">F1 Score</span>
              <span className="text-2xl sm:text-3xl font-black text-purple-700">{metrics.f1_score}%</span>
              <span className="text-[10px] text-purple-600 block">Harmonic Mean (P & R)</span>
            </div>

          </div>

          {/* Confusion Matrix Table */}
          <div className="pt-2">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center">
              <Table className="w-4 h-4 mr-1.5 text-blue-600" />
              Confusion Matrix (Test Set: {modelData?.test_samples || 300} Applicants)
            </h4>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-center border-collapse">
                <thead>
                  <tr>
                    <th className="p-2 border border-slate-200 bg-slate-100 font-bold text-slate-700">Actual / Predicted</th>
                    <th className="p-2 border border-slate-200 bg-slate-50 font-semibold text-slate-700">Predicted Non-Eligible</th>
                    <th className="p-2 border border-slate-200 bg-slate-50 font-semibold text-slate-700">Predicted Eligible</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2.5 border border-slate-200 bg-slate-50 font-semibold text-slate-700">Actual Non-Eligible</td>
                    <td className="p-2.5 border border-slate-200 font-bold text-emerald-700 bg-emerald-50/50">TN: {cm[0][0]}</td>
                    <td className="p-2.5 border border-slate-200 font-bold text-rose-600 bg-rose-50/30">FP: {cm[0][1]}</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 border border-slate-200 bg-slate-50 font-semibold text-slate-700">Actual Eligible</td>
                    <td className="p-2.5 border border-slate-200 font-bold text-rose-600 bg-rose-50/30">FN: {cm[1][0]}</td>
                    <td className="p-2.5 border border-slate-200 font-bold text-emerald-700 bg-emerald-50/50">TP: {cm[1][1]}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>

      {/* Feature Importances Chart */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-lg shadow-slate-200/50 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center">
              <BarChart3 className="w-5 h-5 text-blue-600 mr-2" />
              Scikit-Learn Feature Importance Weights
            </h3>
            <p className="text-xs text-slate-500">Relative weight assigned to financial features during decision tree splitting</p>
          </div>
          <span className="text-xs font-mono bg-slate-100 text-slate-600 px-3 py-1 rounded-md border border-slate-200">
            RandomForestClassifier.feature_importances_
          </span>
        </div>

        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={featureImportances} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis type="number" tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} stroke="#94a3b8" fontSize={12} />
              <YAxis dataKey="feature" type="category" stroke="#475569" fontSize={12} width={120} />
              <Tooltip 
                formatter={(val) => [`${(val * 100).toFixed(2)}%`, 'Importance Weight']}
                contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', border: 'none' }}
              />
              <Bar dataKey="importance" fill="#2563EB" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
