# query_interface.py
from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient

app = Flask(__name__)
client = MongoClient("mongodb://localhost:27017/")
db = client["Log"]

def get_logs(filters):
    # Implement logic to retrieve logs based on filters
    # For simplicity, let's assume we want logs with a specific level
    return db.logs.find({"level": filters.get("level", "")})

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/search', methods=['POST'])
def search_logs():
    filters = request.form.to_dict()
    logs = get_logs(filters)
    return render_template('results.html', logs=logs)

if __name__ == '__main__':
    app.run(port=5000)
