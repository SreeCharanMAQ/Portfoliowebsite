import os
import bcrypt
import jwt
from datetime import datetime, timedelta
from functools import wraps
from flask import request, jsonify, current_app
from pymongo import MongoClient
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests

# MongoDB connection
client = MongoClient(os.getenv('MONGODB_URI', 'mongodb://localhost:27017/'))
db = client[os.getenv('DATABASE_NAME', 'portfolio_db')]
users_collection = db.users

class AuthManager:
    def __init__(self, app=None):
        self.app = app
        if app is not None:
            self.init_app(app)
    
    def init_app(self, app):
        app.config.setdefault('JWT_SECRET_KEY', os.getenv('JWT_SECRET_KEY', 'your-secret-key'))
        app.config.setdefault('JWT_ACCESS_TOKEN_EXPIRES', timedelta(hours=1))
        app.config.setdefault('GOOGLE_CLIENT_ID', os.getenv('GOOGLE_CLIENT_ID'))
    
    def hash_password(self, password):
        """Hash a password using bcrypt"""
        return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    
    def check_password(self, password, hashed):
        """Check if password matches hash"""
        return bcrypt.checkpw(password.encode('utf-8'), hashed)
    
    def generate_token(self, user_id):
        """Generate JWT token"""
        payload = {
            'user_id': str(user_id),
            'exp': datetime.utcnow() + current_app.config['JWT_ACCESS_TOKEN_EXPIRES']
        }
        return jwt.encode(payload, current_app.config['JWT_SECRET_KEY'], algorithm='HS256')
    
    def verify_token(self, token):
        """Verify JWT token"""
        try:
            payload = jwt.decode(token, current_app.config['JWT_SECRET_KEY'], algorithms=['HS256'])
            return payload['user_id']
        except jwt.ExpiredSignatureError:
            return None
        except jwt.InvalidTokenError:
            return None
    
    def register_user(self, email, password, name):
        """Register a new user"""
        # Check if user already exists
        if users_collection.find_one({'email': email}):
            return {'error': 'User already exists'}, 400
        
        # Hash password
        hashed_password = self.hash_password(password)
        
        # Create user document
        user_doc = {
            'email': email,
            'password': hashed_password,
            'name': name,
            'created_at': datetime.utcnow(),
            'auth_type': 'email'
        }
        
        # Insert user
        result = users_collection.insert_one(user_doc)
        
        # Generate token
        token = self.generate_token(result.inserted_id)
        
        return {
            'message': 'User registered successfully',
            'token': token,
            'user': {
                'id': str(result.inserted_id),
                'email': email,
                'name': name
            }
        }, 201
    
    def login_user(self, email, password):
        """Login user with email and password"""
        user = users_collection.find_one({'email': email})
        
        if not user or not self.check_password(password, user['password']):
            return {'error': 'Invalid credentials'}, 401
        
        # Generate token
        token = self.generate_token(user['_id'])
        
        return {
            'message': 'Login successful',
            'token': token,
            'user': {
                'id': str(user['_id']),
                'email': user['email'],
                'name': user['name']
            }
        }, 200
    
    def google_login(self, google_token):
        """Login user with Google OAuth"""
        try:
            # Verify Google token
            idinfo = id_token.verify_oauth2_token(
                google_token, 
                google_requests.Request(), 
                current_app.config['GOOGLE_CLIENT_ID']
            )
            
            email = idinfo['email']
            name = idinfo['name']
            google_id = idinfo['sub']
            
            # Check if user exists
            user = users_collection.find_one({'email': email})
            
            if user:
                # Update user with Google ID if not present
                if 'google_id' not in user:
                    users_collection.update_one(
                        {'_id': user['_id']},
                        {'$set': {'google_id': google_id, 'auth_type': 'google'}}
                    )
            else:
                # Create new user
                user_doc = {
                    'email': email,
                    'name': name,
                    'google_id': google_id,
                    'created_at': datetime.utcnow(),
                    'auth_type': 'google'
                }
                result = users_collection.insert_one(user_doc)
                user = {'_id': result.inserted_id, **user_doc}
            
            # Generate token
            token = self.generate_token(user['_id'])
            
            return {
                'message': 'Google login successful',
                'token': token,
                'user': {
                    'id': str(user['_id']),
                    'email': email,
                    'name': name
                }
            }, 200
            
        except ValueError as e:
            return {'error': 'Invalid Google token'}, 401
    
    def get_user_by_id(self, user_id):
        """Get user by ID"""
        from bson import ObjectId
        try:
            user = users_collection.find_one({'_id': ObjectId(user_id)})
            if user:
                return {
                    'id': str(user['_id']),
                    'email': user['email'],
                    'name': user['name'],
                    'auth_type': user.get('auth_type', 'email')
                }
            return None
        except:
            return None

def token_required(f):
    """Decorator to require valid JWT token"""
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        
        if not auth_header:
            return jsonify({'error': 'Token is missing'}), 401
        
        try:
            token = auth_header.split(' ')[1]  # Bearer <token>
        except IndexError:
            return jsonify({'error': 'Invalid token format'}), 401
        
        auth_manager = AuthManager()
        user_id = auth_manager.verify_token(token)
        
        if not user_id:
            return jsonify({'error': 'Token is invalid or expired'}), 401
        
        # Add user_id to kwargs
        kwargs['current_user_id'] = user_id
        return f(*args, **kwargs)
    
    return decorated
