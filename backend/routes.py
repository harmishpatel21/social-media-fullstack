# from flask import request, jsonify
# from flask_login import login_required, current_user
# from werkzeug import secure_filename

# from config import app, db, images
# from models import User, Post

# @app.route('home')
# def home():
#     return jsonify({'message': 'Hello Worls'})

# @app.route('/api/profile', methods=['POST'])
# def create_profile():
#     data = request.get_json()
#     username = data['username']
#     email = data['email']
#     password = data['password']
#     user = User(username=username, email=email, password=password)
#     db.session.add(user)
#     db.session.commit()
#     return jsonify({'message': 'Profile created.'})

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