import os
import json
import joblib
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix, roc_auc_score

# Paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, 'data')
MODEL_DIR = os.path.join(BASE_DIR, 'model')
CSV_PATH = os.path.join(DATA_DIR, 'loan_data.csv')
MODEL_PATH = os.path.join(MODEL_DIR, 'model.pkl')
METRICS_PATH = os.path.join(MODEL_DIR, 'metrics.json')

def generate_synthetic_dataset(num_samples=1500, seed=42):
    """Generates a realistic synthetic loan applicant dataset for demonstration & training."""
    np.random.seed(seed)
    os.makedirs(DATA_DIR, exist_ok=True)
    
    genders = ['Male', 'Female', 'Other']
    marital_statuses = ['Single', 'Married', 'Divorced']
    educations = ['High School', 'Graduate', 'Post Graduate', 'Doctorate']
    employment_types = ['Salaried', 'Self Employed', 'Business', 'Other']
    employer_types = ['Private Company', 'Government', 'MNC', 'Self-Employed/Business', 'Other']
    existing_loan_opts = ['Yes', 'No']
    loan_purposes = ['Education', 'Medical', 'Home Renovation', 'Wedding', 'Vehicle', 'Personal', 'Business', 'Other']

    data = []
    
    for i in range(num_samples):
        age = int(np.random.randint(21, 65))
        gender = np.random.choice(genders, p=[0.55, 0.42, 0.03])
        marital = np.random.choice(marital_statuses, p=[0.4, 0.52, 0.08])
        dependents = int(np.random.choice([0, 1, 2, 3, 4], p=[0.35, 0.3, 0.2, 0.1, 0.05]))
        education = np.random.choice(educations, p=[0.15, 0.55, 0.25, 0.05])
        emp_type = np.random.choice(employment_types, p=[0.60, 0.20, 0.15, 0.05])
        emp_years = round(float(np.random.uniform(0.5, min(age - 18, 35))), 1)
        employer = np.random.choice(employer_types, p=[0.45, 0.20, 0.20, 0.10, 0.05])
        
        # Monthly Income with log-normal skew
        monthly_income = round(float(np.random.lognormal(mean=10.6, sigma=0.55)), -2)
        monthly_income = max(18000.0, min(monthly_income, 350000.0))
        
        # Credit Score (300 to 850)
        credit_score = int(np.random.normal(loc=680, scale=75))
        credit_score = max(300, min(850, credit_score))
        
        has_existing_loan = np.random.choice(existing_loan_opts, p=[0.45, 0.55])
        if has_existing_loan == 'Yes':
            existing_emi = round(float(np.random.uniform(0.05, 0.35) * monthly_income), -2)
        else:
            existing_emi = 0.0
            
        monthly_expenses = round(float(np.random.uniform(0.20, 0.50) * monthly_income), -2)
        savings = round(float(np.random.uniform(0.5, 12.0) * monthly_income), -2)
        
        # Loan Requirements
        loan_amount = round(float(np.random.uniform(30000, min(monthly_income * 25, 2000000))), -3)
        loan_tenure = int(np.random.choice([1, 2, 3, 4, 5, 6, 7], p=[0.1, 0.15, 0.25, 0.2, 0.15, 0.1, 0.05]))
        loan_purpose = np.random.choice(loan_purposes)
        
        # Domain Logic for Target Ground Truth (Synthetic Approval Rules with Noise)
        r = 0.12 / 12  # assumed 12% annual rate for monthly EMI estimate
        n = loan_tenure * 12
        est_monthly_emi = (loan_amount * r * ((1 + r)**n)) / (((1 + r)**n) - 1)
        
        total_debt_service = existing_emi + est_monthly_emi
        dti = total_debt_service / monthly_income
        net_disposable = monthly_income - monthly_expenses - existing_emi - est_monthly_emi
        disposable_ratio = net_disposable / monthly_income
        
        score_points = 0
        if credit_score >= 750:
            score_points += 35
        elif credit_score >= 680:
            score_points += 25
        elif credit_score >= 600:
            score_points += 12
        else:
            score_points -= 20

        if dti <= 0.40:
            score_points += 30
        elif dti <= 0.55:
            score_points += 15
        else:
            score_points -= 25

        if disposable_ratio >= 0.25:
            score_points += 20
        elif disposable_ratio >= 0.10:
            score_points += 10
        else:
            score_points -= 15

        if emp_years >= 2.0:
            score_points += 10
            
        if savings >= loan_amount * 0.2:
            score_points += 10
            
        # Noise
        noise = np.random.normal(0, 8)
        final_score = score_points + noise
        
        eligible = 1 if final_score >= 45 else 0
        
        data.append({
            'age': age,
            'gender': gender,
            'marital_status': marital,
            'dependents': dependents,
            'education': education,
            'employment_type': emp_type,
            'employment_years': emp_years,
            'employer_type': employer,
            'monthly_income': monthly_income,
            'credit_score': credit_score,
            'existing_loan': has_existing_loan,
            'existing_emi': existing_emi,
            'monthly_expenses': monthly_expenses,
            'savings': savings,
            'loan_amount': loan_amount,
            'loan_tenure': loan_tenure,
            'loan_purpose': loan_purpose,
            'loan_eligible': eligible
        })

    df = pd.DataFrame(data)
    df.to_csv(CSV_PATH, index=False)
    print(f"Synthetic dataset saved to {CSV_PATH} with {len(df)} records.")
    return df

def train_and_save_model():
    """Trains Random Forest Classifier model, evaluates dynamic metrics, and saves model pipeline."""
    os.makedirs(MODEL_DIR, exist_ok=True)
    
    if not os.path.exists(CSV_PATH):
        df = generate_synthetic_dataset()
    else:
        df = pd.read_csv(CSV_PATH)
        
    X = df.drop(columns=['loan_eligible'])
    y = df['loan_eligible']
    
    categorical_cols = ['gender', 'marital_status', 'education', 'employment_type', 'employer_type', 'existing_loan', 'loan_purpose']
    numerical_cols = ['age', 'dependents', 'employment_years', 'monthly_income', 'credit_score', 'existing_emi', 'monthly_expenses', 'savings', 'loan_amount', 'loan_tenure']
    
    # Preprocessor
    preprocessor = ColumnTransformer(
        transformers=[
            ('num', StandardScaler(), numerical_cols),
            ('cat', OneHotEncoder(handle_unknown='ignore', sparse_output=False), categorical_cols)
        ]
    )
    
    # Full Model Pipeline
    rf_model = RandomForestClassifier(n_estimators=120, max_depth=12, min_samples_split=4, random_state=42)
    pipeline = Pipeline(steps=[
        ('preprocessor', preprocessor),
        ('classifier', rf_model)
    ])
    
    # Train / Test split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
    
    pipeline.fit(X_train, y_train)
    
    # Evaluation
    y_pred = pipeline.predict(X_test)
    y_proba = pipeline.predict_proba(X_test)[:, 1]
    
    acc = float(accuracy_score(y_test, y_pred))
    prec = float(precision_score(y_test, y_pred))
    rec = float(recall_score(y_test, y_pred))
    f1 = float(f1_score(y_test, y_pred))
    roc_auc = float(roc_auc_score(y_test, y_proba))
    cm = confusion_matrix(y_test, y_pred).tolist()
    
    # Compare with Logistic Regression for academic reporting
    lr_pipeline = Pipeline(steps=[
        ('preprocessor', preprocessor),
        ('classifier', LogisticRegression(max_iter=1000, random_state=42))
    ])
    lr_pipeline.fit(X_train, y_train)
    lr_pred = lr_pipeline.predict(X_test)
    lr_acc = float(accuracy_score(y_test, lr_pred))
    lr_f1 = float(f1_score(y_test, lr_pred))

    # Feature importances
    cat_feature_names = pipeline.named_steps['preprocessor'].named_transformers_['cat'].get_feature_names_out(categorical_cols).tolist()
    all_feature_names = numerical_cols + cat_feature_names
    importances = pipeline.named_steps['classifier'].feature_importances_
    
    # Group importances back to high-level features for simple reporting
    feature_importance_list = []
    for name, imp in sorted(zip(all_feature_names, importances), key=lambda x: x[1], reverse=True)[:10]:
        feature_importance_list.append({'feature': name, 'importance': round(float(imp), 4)})

    # Save Pipeline (Model + Preprocessor)
    joblib.dump(pipeline, MODEL_PATH)
    print(f"Model successfully trained and saved to {MODEL_PATH}")
    
    metrics = {
        'algorithm': 'Random Forest Classifier',
        'problem_type': 'Binary Classification',
        'target_variable': 'loan_eligible',
        'total_samples': len(df),
        'train_samples': len(X_train),
        'test_samples': len(X_test),
        'eligible_percentage': round(float(y.mean() * 100), 2),
        'metrics': {
            'accuracy': round(acc * 100, 2),
            'precision': round(prec * 100, 2),
            'recall': round(rec * 100, 2),
            'f1_score': round(f1 * 100, 2),
            'roc_auc': round(roc_auc * 100, 2)
        },
        'comparison': {
            'random_forest_accuracy': round(acc * 100, 2),
            'logistic_regression_accuracy': round(lr_acc * 100, 2),
            'random_forest_f1': round(f1 * 100, 2),
            'logistic_regression_f1': round(lr_f1 * 100, 2)
        },
        'confusion_matrix': cm,
        'top_feature_importances': feature_importance_list
    }
    
    with open(METRICS_PATH, 'w') as f:
        json.dump(metrics, f, indent=4)
        
    print("Dynamic evaluation metrics saved to metrics.json")
    return metrics

if __name__ == '__main__':
    train_and_save_model()
