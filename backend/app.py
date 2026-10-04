import os
import sys

# Ensure backend root directory is on Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from flask import Flask, jsonify
from flask_cors import CORS
from routes.prediction import prediction_bp
from model.train_model import train_and_save_model, MODEL_PATH

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Register blueprints
app.register_blueprint(prediction_bp, url_prefix='/api')

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'online',
        'service': 'Personal Loan Recommendation System API',
        'model_loaded': os.path.exists(MODEL_PATH)
    })

def initialize_app():
    """Ensure data directory, dataset, and trained ML model exist before launching server."""
    if not os.path.exists(MODEL_PATH):
        print("Model file not found. Auto-generating synthetic dataset and training Machine Learning model...")
        train_and_save_model()

if __name__ == '__main__':
    initialize_app()
    print("Starting Personal Loan Recommendation Flask Backend on http://localhost:5000")
    app.run(host='0.0.0.0', port=5000, debug=True)
