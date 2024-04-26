// frontend/src/components/Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        fetchProfileData();
    }, []);

    const fetchProfileData = async () => {
        try {
            const response = await fetch("http://127.0.01:5000/api/profile");
            setUserData(response.data);
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    };

    return (
        <div>
            <h1>User Profile</h1>
            {userData ? (
                <div>
                    <h2>Username: {userData.username}</h2>
                    <p>Email: {userData.email}</p>
                    {/* Render more profile details here */}
                </div>
            ) : (
                <p>Loading profile data...</p>
            )}
        </div>
    );
};

export default Profile;
