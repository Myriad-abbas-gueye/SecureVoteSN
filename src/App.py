import random
from flask import Flask, request, jsonify
from flask_cors import CORS
import auth
from twilio.rest import Client
import os
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)

load_dotenv()

# # Environment variables for Twilio
# TWILIO_ACCOUNT_SID = os.getenv('TWILIO_ACCOUNT_SID')
# TWILIO_AUTH_TOKEN = os.getenv('TWILIO_AUTH_TOKEN')
# TWILIO_PHONE_NUMBER = os.getenv('TWILIO_PHONE_NUMBER')

@app.route('/authenticate', methods=['POST'])
def authenticate_user():
    data = request.get_json()
    cni = data.get('cni')
    numero = data.get('numero')

    if cni and numero:
        authenticated, message = auth.authenticate_by_cni_and_numero(cni, numero)
    else:
        username = data.get('username')
        password = data.get('password')
        if username and password:
            authenticated, message = auth.authenticate_by_username_and_password(username, password)
        else:
            return jsonify({'authenticated': False, 'message': 'Invalid request'}), 400

    if authenticated:
        return jsonify({'authenticated': True, 'message': message}), 200
    else:
        return jsonify({'authenticated': False, 'message': message}), 401

client = Client()

@app.route('/send_verification', methods=['POST'])
def send_verification():
       phone_number = request.json['phone']
       try:
           verification = client.verify.services(os.getenv('TWILIO_VERIFY_SERVICE_SID')) \
               .verifications.create(to=phone_number, channel='sms')
           return jsonify({"message": "Verification code sent!", "sid": verification.sid}), 200
       except Exception as e:
           return jsonify({"error": str(e)}), 500

@app.route('/verify', methods=['POST'])
def verify():
       phone_number = request.json['phone']
       code = request.json['code']
       try:
           verification_check = client.verify.services(os.getenv('TWILIO_VERIFY_SERVICE_SID')) \
               .verification_checks.create(to=phone_number, code=code)
           if verification_check.status == "approved":
               return jsonify({"message": "Verification successful!", "status": verification_check.status}), 200
           else:
               return jsonify({"message": "Verification failed!", "status": verification_check.status}), 400
       except Exception as e:
           return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
