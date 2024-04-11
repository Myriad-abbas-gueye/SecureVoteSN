from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from datetime import datetime

app = Flask(__name__)
CORS(app)
client = MongoClient('mongodb://localhost:27017/')
db = client['secure_vote_sn']
users_collection = db['voters']
logs_collection = db['logs']

@app.route('/authenticate', methods=['POST'])
def authenticate_user():
    data = request.get_json()
    cni = data.get('cni')
    numero = data.get('numero')

    user = users_collection.find_one({'national_id': cni, 'election_id': numero})

    if user:
        # Vérification si l'électeur a déjà voté
        log = logs_collection.find_one({'national_id': cni})
        if log:
            return jsonify({'authenticated': False, 'message': 'Authentication failed. You already vote.'}), 401
        else:
            # Journalisation de l'authentification
            logs_collection.insert_one({
                'timestamp': datetime.now(),
                'national_id': cni,
                'election_id': numero,
                'connected': True
            })
            return jsonify({'authenticated': True, 'message': 'Authentication successful.'}), 200
    else:
        return jsonify({'authenticated': False, 'message': 'You\'re not allowed to vote'}), 401

if __name__ == '__main__':
    app.run(debug=True)
