
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_uploads import UploadSet, IMAGES
from flask_login import LoginManager
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv

import os

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r'/api/*': {'origins': '*'}})

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mydb.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['SQLALCHEMY_ECHO'] = True
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
# app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

upload_dir = 'uploads'
if not os.path.exists(os.path.join(os.getcwd(), upload_dir)):
    os.makedirs(os.path.join(os.getcwd(), upload_dir))

app.config['UPLOADS_DEFAULT_DEST'] = os.path.join(os.getcwd(), 'uploads')

db = SQLAlchemy(app)
jwt = JWTManager(app)

# login_manager = LoginManager(app)

images = UploadSet('images', IMAGES)