import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HeroIllustration from './components/HeroIllustration';
import MultiStepForm from './components/MultiStepForm';
import HowItWorksPage from './components/HowItWorksPage';
import DataScienceSection from './components/DataScienceSection';
import DashboardPage from './components/DashboardPage';
import AboutPage from './components/AboutPage';
import ContactSection from './components/ContactSection';
import EmiCalculator from './components/EmiCalculator';
import { 
  Sparkles, ArrowRight, ShieldCheck, Cpu, Calculator, 
  BarChart3, CheckCircle2, Award, Zap, ChevronRight 
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-500 selection:text-white">
      
      {/* Navigation Bar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onStartRecommendation={() => setActiveTab('recommendation')}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
        
        {/* TAB 1: HOME PAGE */}
        {activeTab === 'home' && (
          <div className="space-y-16 animate-in fade-in duration-300">
            
            {/* Hero Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
                  <span>Data Science & ML Academic Project</span>
                </div>

                <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black tracking-tight text-slate-900 leading-[1.15]">
                  Find the Personal Loan That <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800">Fits You.</span>
                </h1>

                <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Get a personalized loan recommendation based on your income, credit profile, expenses and financial requirements.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                  <button
                    onClick={() => setActiveTab('recommendation')}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-base shadow-lg shadow-blue-600/30 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl hover:shadow-blue-600/40 transition-all group"
                  >
                    <Sparkles className="w-5 h-5 mr-2 text-blue-200 group-hover:rotate-12 transition-transform" />
                    Check Eligibility
                    <ChevronRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => setActiveTab('how-it-works')}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-4 rounded-xl bg-white border border-slate-300 text-slate-700 font-semibold text-base shadow-xs hover:bg-slate-50 transition-colors"
                  >
                    How It Works
                  </button>
                </div>

                {/* Hero Badges */}
                <div className="pt-4 flex items-center justify-center lg:justify-start space-x-6 text-xs font-semibold text-slate-500">
                  <span className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-1.5" />
                    Scikit-Learn ML Backend
                  </span>
                  <span className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-1.5" />
                    Random Forest Algorithm
                  </span>
                </div>
              </div>

              {/* Right Vector Dashboard Illustration */}
              <div className="lg:col-span-5">
                <HeroIllustration />
              </div>

            </div>

            {/* Three Feature Cards */}
            <div className="space-y-6 pt-4">
              <div className="text-center space-y-2">
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                  Intelligent Credit Assessment Features
                </h3>
                <p className="text-sm text-slate-600">
                  Built with data science methodologies to evaluate creditworthiness transparently.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Card 1 */}
                <div className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-lg shadow-slate-200/40 space-y-4 hover:border-blue-300 hover:shadow-xl transition-all group">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">Smart Recommendation</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Machine learning analyzes your financial profile and recommends a suitable loan option.
                  </p>
                </div>

                {/* Card 2 */}
                <div className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-lg shadow-slate-200/40 space-y-4 hover:border-blue-300 hover:shadow-xl transition-all group">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">Risk Assessment</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Evaluate your financial profile and understand your estimated borrowing risk.
                  </p>
                </div>

                {/* Card 3 */}
                <div className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-lg shadow-slate-200/40 space-y-4 hover:border-blue-300 hover:shadow-xl transition-all group">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                    <Calculator className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">Personalized EMI</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Calculate an estimated EMI based on the recommended loan amount and tenure.
                  </p>
                </div>

              </div>
            </div>

            {/* Quick Teaser EMI Calculator Section */}
            <div className="pt-4">
              <EmiCalculator />
            </div>

            {/* Machine Learning Banner */}
            <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
              <div className="space-y-2 text-center md:text-left">
                <div className="inline-flex items-center text-xs font-bold text-blue-400 uppercase tracking-wider">
                  <Zap className="w-4 h-4 mr-1.5" />
                  Machine Learning Architecture
                </div>
                <h3 className="text-2xl sm:text-3xl font-black">Explore the Random Forest Model Metrics</h3>
                <p className="text-sm text-slate-400 max-w-xl">
                  Inspect feature importances, confusion matrix, accuracy, precision, and recall scores dynamically fetched from Python Flask.
                </p>
              </div>

              <button
                onClick={() => setActiveTab('data-science')}
                className="shrink-0 px-6 py-3.5 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-500 transition-colors inline-flex items-center"
              >
                View ML Behind Recommendation
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>

          </div>
        )}

        {/* TAB 2: LOAN RECOMMENDATION MULTI-STEP FORM */}
        {activeTab === 'recommendation' && (
          <MultiStepForm onNavigateToDataScience={() => setActiveTab('data-science')} />
        )}

        {/* TAB 3: HOW IT WORKS */}
        {activeTab === 'how-it-works' && (
          <HowItWorksPage onStartRecommendation={() => setActiveTab('recommendation')} />
        )}

        {/* TAB 4: DATA SCIENCE SECTION */}
        {activeTab === 'data-science' && (
          <DataScienceSection />
        )}

        {/* TAB 5: DASHBOARD PAGE */}
        {activeTab === 'dashboard' && (
          <DashboardPage />
        )}

        {/* TAB 6: ABOUT PAGE */}
        {activeTab === 'about' && (
          <AboutPage />
        )}

        {/* Contact Footer Section */}
        <ContactSection />

      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

    </div>
  );
}
