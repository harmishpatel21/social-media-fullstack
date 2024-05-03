from flask import request, jsonify
from flask_login import login_required, current_user, login_user, logout_user
from werkzeug.utils import secure_filename

from config import app, db, images
from models import User, Post
from flask_uploads import configure_uploads

@app.route('/home')
def home():
    return jsonify({'message': 'Hello World'})



@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'success': False, 'error': 'Username and password are required'}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({'success': False, 'error': 'Username already exists'}), 400

    user = User(username=username, password=password)
    # user.set_password(password)
    db.session.add(user)
    db.session.commit()

    return jsonify({'success': True, 'success': 'Success'}), 200

@app.route('/api/login', methods=['POST', 'GET'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    if not username or not password:
        return jsonify({'error': 'Username or password missing'}), 401
    
    user = User.query.filter_by(username=username).first()
    if user is not None:
        print(user)
        if password == user.password:
            return jsonify({'success': True, 'message': 'Logged in'}), 200
        else:
            return jsonify({'success': False, 'error': 'Invalid Password'}), 401
    else:
        return jsonify({'success': False, 'error': 'User not found'}), 401

        

# @app.route('/api/profile', methods=['POST'])
# def create_profile():
#     data = request.get_json()
#     username = data['username']
#     email = data['email']
#     password = data['password']

#     if not username or not password or not email:
#         return jsonify({'message': 'Fields are required.'}), 400
    
#     if User.query.filter_by(username=username).first():
#         return jsonify({'message': 'Username exists'}), 400
    
#     user = User(username=username, email=email, password=password)
#     db.session.add(user)
#     db.session.commit()
#     return jsonify({'message': 'Profile created.'}), 200

# @app.route('/api/login', methods=['POST'])
# def login():
#     data = request.get_json()
#     username = data['username']
#     password = data['password']

#     user = User.query.filter_by(username=username).first()

#     if user and user.check_password(password):
#         # login_user(user)
#         return jsonify({'success': True}), 200
#     else:
#         return jsonify({'success': False, 'error': 'Invalid Username or password'}), 401


# @app.route('/api/upload', methods=['POST'])
# @login_required
# def upload_photo():
#     if 'image' not in request.files:
#         return jsonify({'error': 'No File Found'}), 400
    
#     file = request.files['image']

#     if file.filename == '':
#         return jsonify({'error': 'No files selected'}), 400
    
#     if file and allowed_file(file.filename):
#         filename = secure_filename(file.filename)
#         file_path = images.save(file)

#         post = Post(image_file=file_path, user_id=current_user.id)
#         db.session.add(post)
#         db.session.commit()
#         return jsonify({'message': 'Photo Uploaded'}), 200
    
#     else:
#         return jsonify({'error': 'File type not allowed'}), 400

# def allowed_file(filename):
#     return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'png', 'jpg', 'jpeg', 'gif'}



if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    configure_uploads(app, images)
    app.run(debug=True)