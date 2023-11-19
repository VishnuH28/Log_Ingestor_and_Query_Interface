# log_ingestor.py
from flask import Flask, request, jsonify
from pymongo import MongoClient

app = Flask(__name__)
client = MongoClient("mongodb://localhost:27017/")
db = client["Logingestor"] 
db = client["Log"]

@app.route('/ingest', methods=['POST'])
def ingest_log():
    try:
        log_data = request.json
        # Validate and process log_data
        if validate_log(log_data):
            store_log(log_data)
            return jsonify({"status": "success"})
        else:
            return jsonify({"status": "error", "message": "Invalid log format"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})

def validate_log(log_data):
    # Implement validation logic
    return all(key in log_data for key in ["level", "message", "resourceId", "timestamp"])

def store_log(log_data):
    # Store logs in the database
    db.logs.insert_one(log_data)

if __name__ == '__main__':
    app.run(port=3000)
