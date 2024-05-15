from flask import request, jsonify, session, send_file, send_from_directory
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity, unset_jwt_cookies
from werkzeug.utils import secure_filename

from config import app, db, images
from models import User, Post
from flask_uploads import configure_uploads
import os

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

    return jsonify({'success': True, 'message': 'Success'}), 200

@app.route('/api/login', methods=['POST', 'GET'])
def login():
    print("COMING TO LOGIN")
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    if not username or not password:
        return jsonify({'error': 'Username or password missing'}), 401
    
    user = User.query.filter_by(username=username).first()
    if user is not None:
        if password == user.password:
            print(user.id)
            access_token = create_access_token(identity=username)
            # login_user(user)
            return jsonify({'success': True, 'message': 'Logged in', 'access_token': access_token}), 200
        else:
            return jsonify({'success': False, 'error': 'Invalid Password'}), 401
    else:
        return jsonify({'success': False, 'error': 'User not found'}), 401

@app.route('/api/logout', methods=['POST'])
@jwt_required()
def logout():
    resp = jsonify({'message': 'Logged out'})
    unset_jwt_cookies(resp)
    return resp, 200

@app.route('/api/@me', methods=['POST'])
@jwt_required()
def get_current_user():
    user = get_jwt_identity()
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401
    print(user)
    user = User.query.filter_by(username=user).first()
    return jsonify({
        'id': user.id,
        'username' : user.username
    })

@app.route('/api/upload-photo', methods=['POST'])
@jwt_required()
def upload_photo():
    print("COMING TO UPLOAD PHOTO")
    user = get_jwt_identity()
    if not user:
        return jsonify( {'success': False, 'error': 'User Not Found'}), 404
        
    if 'file' not in request.files:
        return jsonify({'success': False, 'error': 'No File Provided'}), 400
    
    file = request.files['file']
    print(file)
    if file:
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOADS_DEFAULT_DEST'], filename)
        file.save(file_path)

        post = Post(image_file=file_path, user_id=user)

        db.session.add(post)
        db.session.commit()

    return jsonify({'success': True, 'message': 'Photo uploaded successfully'}), 200

@app.route('/api/my-photos', methods=['GET'])
@jwt_required()
def my_photos():
    print("COMING HERE TO SHOW PHOTOS")
    user = get_jwt_identity()
    
    if not user:
        return jsonify( {'success': False, 'error': 'User Not Found'}), 404
    
    user__ = User.query.filter_by(username=user).first()
    user_id = user__.id
    
    if not user:
        return jsonify({'success': False, 'error': 'User Not Found'}), 404
    
    photos = Post.query.filter_by(user_id=user).all()
    if(len(photos) == 0):
        return jsonify({'success': False, 'error': 'No Photos Available'}), 404
    
    photos_data = [{'id': photo.id, 'image_file': photo.image_file} for photo in photos]
    # photos_data=[]
    return jsonify({'success': True, 'photos': photos_data}), 200

@app.route('/uploads/<path:filename>')
def serve_upload(filename):
    print("FILENAME====", filename)
    filename = filename.split("/")[-1]
    print("FILENAME====", filename)
    return send_from_directory(app.config['UPLOADS_DEFAULT_DEST'], filename)


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    configure_uploads(app, images)
    app.run(debug=True)