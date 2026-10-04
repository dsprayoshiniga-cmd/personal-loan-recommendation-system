# Personal Loan Recommendation System (LoanWise)

An academic Data Science and Machine Learning project demonstrating an intelligent credit evaluation and personal loan recommendation engine built with **React, Vite, Tailwind CSS, Python Flask, Scikit-learn, and Recharts**.

---

## 🌟 Key Features

1. **Machine Learning Recommendation Engine**:
   - Random Forest Classification pipeline trained on 1,500 realistic applicant records (`loan_data.csv`).
   - Standard Scaling of numerical features (`credit_score`, `monthly_income`, `dti`, `savings`, `expenses`) and One-Hot Encoding of categorical variables.
   - Comparative evaluation with Logistic Regression benchmark.

2. **Full-Stack REST API Architecture**:
   - `POST /api/predict`: Runs multi-step user form payload through the trained `model.pkl` pipeline to infer eligibility, approval probability, risk level, interest rate, recommended amount & tenure, EMI, and human-readable explanations.
   - `GET /api/model-info`: Delivers dynamic metrics (Accuracy, Precision, Recall, F1-Score, Confusion Matrix, Feature Importances).
   - `GET /api/dashboard-stats`: Returns live analytics for the application dashboard.

3. **Multi-Step Recommendation Form**:
   - Step 1: Personal Information (Age, Gender, Marital Status, Dependents, Education)
   - Step 2: Employment & Income (Employment Type, Monthly Income, Employment Years, Employer Type)
   - Step 3: Financial Information (Credit Score, Existing Loan Y/N, Existing EMI, Monthly Expenses, Savings)
   - Step 4: Loan Requirement (Desired Loan Amount, Preferred Loan Tenure, Loan Purpose)
   - Step 5: Results Dashboard

4. **Interactive Recommendation Result Dashboard**:
   - Circular ML score gauge.
   - Eligibility (Eligible / Not Eligible) and Risk Level badges (Low, Medium, High).
   - Recommended Loan Amount, Tenure, Risk-Adjusted Interest Rate, and Monthly EMI.
   - **Personalized Explanation ("Why this recommendation?")**: Bullet list highlighting profile strengths (✓) and areas for improvement (⚠).
   - Prominent educational disclaimer banner.

5. **Interactive EMI Calculator**:
   - Real-time loan amount, interest rate, and tenure sliders.
   - Payment breakdown pie/donut chart powered by Recharts comparing Principal vs Total Interest.

6. **Data Science & Analytics Dashboard**:
   - Visual End-to-End Data Pipeline (Dataset → Cleaning → EDA → Feature Eng → Training → Evaluation → Inference).
   - Recharts visual graphs: Loan Eligibility distribution, Risk Tier breakdown, Loan Amount range breakdown, Employment Category breakdown.

---

## 📁 Project Structure

```
Personal loan/
├── backend/
│   ├── app.py                      # Flask REST API entrypoint
│   ├── requirements.txt            # Python dependencies
│   ├── model/
│   │   ├── train_model.py          # Synthetic dataset generator & Scikit-learn trainer
│   │   ├── model.pkl               # Trained ML pipeline (Preprocessor + RandomForest)
│   │   └── metrics.json            # Dynamic evaluation metrics (Accuracy, Precision, F1, etc.)
│   ├── data/
│   │   └── loan_data.csv           # Synthetic dataset (1,500 records)
│   └── routes/
│       └── prediction.py           # API endpoints (/api/predict, /api/model-info, /api/dashboard-stats)
└── frontend/
    ├── package.json
    ├── vite.config.js              # Vite config with API proxy to Flask (localhost:5000)
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx          # Header navigation bar & mobile menu
    │   │   ├── Footer.jsx          # Academic footer
    │   │   ├── HeroIllustration.jsx# Visual dashboard illustration component
    │   │   ├── MultiStepForm.jsx   # 5-step form with validation & ML loading state
    │   │   ├── ResultDashboard.jsx # Recommendation results dashboard
    │   │   ├── EmiCalculator.jsx   # Interactive loan EMI calculator with Recharts
    │   │   ├── DataScienceSection.jsx # ML pipeline flow, metrics grid, confusion matrix
    │   │   ├── DashboardPage.jsx   # Live analytics dashboard with 4 Recharts graphs
    │   │   ├── HowItWorksPage.jsx  # Process explanation & flow diagram
    │   │   ├── AboutPage.jsx       # Academic metadata & objectives
    │   │   └── ContactSection.jsx  # Tech stack & privacy notes
    │   ├── services/
    │   │   └── api.js              # API service client
    │   ├── index.css               # Tailwind CSS styles
    │   └── App.jsx                 # Main React layout
```

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v18+) & npm
- Python (v3.9+)

---

### Step 1: Start the Python Flask Backend

1. Open terminal and navigate to `backend/`:
   ```bash
   cd backend
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Train ML Model and Generate Dataset (Optional, `app.py` auto-trains if missing):
   ```bash
   python model/train_model.py
   ```

4. Start the Flask Backend Server:
   ```bash
   python app.py
   ```
   *The Flask API will run on `http://localhost:5000`.*

---

### Step 2: Start the React Frontend

1. Open a second terminal window and navigate to `frontend/`:
   ```bash
   cd frontend
   ```

2. Install npm dependencies (if not already installed):
   ```bash
   npm install
   ```

3. Launch Vite Development Server:
   ```bash
   npm run dev
   ```
   *Open `http://localhost:3000` in your web browser.*

---

## 🔬 Machine Learning Pipeline & Metrics

- **Algorithm**: `RandomForestClassifier` (120 estimators, max depth 12)
- **Problem Type**: Binary Classification (`1 = Eligible`, `0 = Not Eligible`)
- **Key Features**:
  - `loan_amount`, `loan_tenure`, `credit_score`, `monthly_income`, `existing_emi`, `monthly_expenses`, `savings`, `employment_years`, `employment_type`, `employer_type`, `loan_purpose`.
- **Metrics**:
  - Accuracy: **~84.7%**
  - Precision: **~83.9%**
  - Recall: **~87.1%**
  - F1 Score: **~85.4%**
  - ROC-AUC: **~93.5%**

---

## ⚠️ Academic Disclaimer

> **Disclaimer**: This application is built as a college Data Science & Machine Learning capstone project for educational and demonstration purposes only. The loan recommendations and predictions generated by the ML model do not constitute guaranteed bank approvals or official financial advice.
