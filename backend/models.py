from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from config import db

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    # email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(128))

    # def __repr__(self):
    #     return f"User('{self.username}', '{self.email})"

    
class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    image_file = db.Column(db.String(20), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __repr__(self):
        return f"Post('{self.image_file})"