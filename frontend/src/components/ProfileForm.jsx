import React, { useState } from 'react';
import LoginForm from './LoginForm';
import PhotoUpload from './PhotoUpload';

const ProfileForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [profileCreated, setProfileCreated] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleProfileSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await fetch('http://127.0.0.1:5000/api/profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                console.log('Profile created successfully');
                setProfileCreated(true);
                setFormData({
                    username: '',
                    email: '',
                    password: ''
                });
            } else {
                console.error('Error creating profile:', response.statusText);
            }
        } catch (error) {
            console.error('Error creating profile:', error.message);
        }
    };

    const handleLogin = async (loginData) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            if (response.ok) {
                console.log('Login successful');
                setLoggedIn(true);
            } else {
                console.error('Error logging in:', response.statusText);
            }
        } catch (error) {
            console.error('Error logging in:', error.message);
        }
    };

    return (
        <div>
            {!profileCreated ? (
                <div>
                    <h2>Create Profile</h2>
                    <form onSubmit={handleProfileSubmit}>
                        <div>
                            <label>Username:</label>
                            <input 
                                type="text" 
                                name="username" 
                                value={formData.username} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div>
                            <label>Email:</label>
                            <input 
                                type="email" 
                                name="email" 
                                value={formData.email} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input 
                                type="password" 
                                name="password" 
                                value={formData.password} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            ) : (
                <div>
                    <h2>Login</h2>
                    <LoginForm onLogin={handleLogin} />
                </div>
            )}
            {loggedIn && (
                <div>
                    <h2>Upload Photo</h2>
                    <PhotoUpload />
                </div>
            )}
        </div>
    );
};

export default ProfileForm;