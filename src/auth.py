import bcrypt
from pymongo import MongoClient
from datetime import datetime

client = MongoClient('mongodb://localhost:27017/')
db = client['secure_vote_sn']
admin_collection = db['admin']
users_collection = db['voters']
logs_collection = db['logs']

def authenticate_by_cni_and_numero(cni, numero):
    user = users_collection.find_one({'national_id': cni, 'election_id': numero})

    if user:
        log = logs_collection.find_one({'national_id': cni})
        if log:
            return False, 'Authentication failed. You already voted.'
        else:
            logs_collection.insert_one({
                'timestamp': datetime.now(),
                'national_id': cni,
                'election_id': numero,
                'connected': True
            })
            return True, 'Authentication successful.'
    else:
        return False, 'You are not allowed to vote.'

def authenticate_by_username_and_password(username, password):
    user = admin_collection.find_one({'username': username})
    if user and bcrypt.checkpw(password.encode('utf-8'), user['password']):
        logs_collection.insert_one({
            'timestamp': datetime.now(),
            'username': username,
            'connected': True
        })
        return True, 'Authentication successful.'
    else:
        return False, 'Invalid username or password.'


