from flask import request, jsonify, session, send_file
from flask_login import login_required, current_user, login_user, logout_user
from werkzeug.utils import secure_filename

from config import app, db, images
from models import User, Post
from auth import login_manager, load_user
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
            login_user(user)
            return jsonify({'success': True, 'message': 'Logged in'}), 200
        else:
            return jsonify({'success': False, 'error': 'Invalid Password'}), 401
    else:
        return jsonify({'success': False, 'error': 'User not found'}), 401


@app.route('/api/@me', methods=['POST'])
@login_required
def get_current_user():
    user = current_user
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401
    
    user = User.query.filter_by(id=user.id).first()
    return jsonify({
        'id': user.id,
        'username' : user.username
    })

@app.route('/api/upload-photo', methods=['POST'])
@login_required
def upload_photo():
    print("COMING TO UPLOAD PHOTO")
    user = current_user
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

    post = Post(image_file=file_path, author=user)

    db.session.add(post)
    db.session.commit()

    return jsonify({'success': True, 'message': 'Photo uploaded successfully'}), 200

@app.route('/api/user-image/<int:user_id>', methods=['GET'])
@login_required
def get_user_image(user_id):
    if current_user.id != user_id:
        return jsonify({
            'error': 'Unauthorized'
        }), 400
    
    user_image = Post.query.filter_by(user_id=user_id).all()

    if not user_image:
        return jsonify({
            'message': 'User Posts'
        }), 404
    
    image_paths = [image.image_file for image in user_image]
    image_path = image_paths[0]
    return jsonify({
        'image_paths': image_path,
        'message': 'Image Sent'
    }), 200

@app.route('/api/image/<path:image_path>', methods=['GET'])
@login_required
def get_image(image_path):
    return send_file(image_path)


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    configure_uploads(app, images)
    app.run(debug=True)