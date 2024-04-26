import React, {useState, useEffect} from "react";

const Profile = () => {
    const [userData, setUserData] = useState([])
    
    const fetchProfileData = async () => {
        try {
            const response = await fetch("http://127.0.0.1:5000/api/profile")
            setUserData(response.data)
        } catch (error) {
            console.error('Error fetching profile data', error)
        }
    }

    return (
        <div>
            <h2>User Profile</h2>
            {userData ? (
                <div>
                    <p>Username: {userData.username}</p>
                    <p>Email: {userData.email}</p>
                </div>
            ) : (
                <p>Loading profile data...</p>
            )}
        </div>
    )
}

export default Profile