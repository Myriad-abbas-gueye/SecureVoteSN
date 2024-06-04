import unittest
import bcrypt
import mongomock
from pymongo import MongoClient
from datetime import datetime
from unittest.mock import patch
from auth import authenticate_by_cni_and_numero, authenticate_by_username_and_password

# Création d'une base de données MongoDB simulée
client = mongomock.MongoClient()
db = client['secure_vote_sn']
admin_collection = db['admin']
users_collection = db['voters']
logs_collection = db['logs']

# Configuration de test des données
def setUpModule():
    users_collection.insert_one({
        "_id": mongomock.ObjectId("6617accac6b77984456467e2"),
        "firstname": "Andre",
        "lastname": "Gilbert",
        "birth": "1995-05-28",
        "national_id": "1668400160560",
        "election_id": "898003496"
    })

    hashed_password = bcrypt.hashpw("admin_password".encode('utf-8'), bcrypt.gensalt())
    admin_collection.insert_one({
        "username": "admin",
        "password": hashed_password
    })

class TestAuthentication(unittest.TestCase):

    def setUp(self):
        self.client_patcher = patch('auth.MongoClient', return_value=client)
        self.client_patcher.start()
        self.addCleanup(self.client_patcher.stop)

    def test_authenticate_by_cni_and_numero_success(self):
        success, message = authenticate_by_cni_and_numero('1668400160560', '898003496')
        self.assertTrue(success)
        self.assertEqual(message, 'Authentication successful.')

    def test_authenticate_by_cni_and_numero_already_voted(self):
        logs_collection.insert_one({
            'timestamp': datetime.now(),
            'national_id': '1668400160560',
            'election_id': '898003496',
            'connected': True
        })
        success, message = authenticate_by_cni_and_numero('1668400160560', '898003496')
        self.assertFalse(success)
        self.assertEqual(message, 'Authentication failed. You already voted.')

    def test_authenticate_by_cni_and_numero_not_allowed(self):
        success, message = authenticate_by_cni_and_numero('1234567890', '111111111')
        self.assertFalse(success)
        self.assertEqual(message, 'You are not allowed to vote.')

    def test_authenticate_by_username_and_password_success(self):
        success, message = authenticate_by_username_and_password('admin', 'admin_password')
        self.assertTrue(success)
        self.assertEqual(message, 'Authentication successful.')

    def test_authenticate_by_username_and_password_invalid(self):
        success, message = authenticate_by_username_and_password('admin', 'wrong_password')
        self.assertFalse(success)
        self.assertEqual(message, 'Invalid username or password.')


if __name__ == '__main__':
    unittest.main()