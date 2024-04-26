import routes
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_uploads import UploadSet, IMAGES
import os

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mydb.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['UPLOADS_DEFAULT_DEST'] = os.getcwd()

db = SQLAlchemy(app)

images = UploadSet('images', IMAGES)




