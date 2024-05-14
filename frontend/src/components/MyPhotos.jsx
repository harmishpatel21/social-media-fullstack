import React, { useEffect, useState } from "react";
import '../style/MyPhotos.css'
import '../style/FormStyle.css'

const MyPhotos = () => {
    
    const [photos, setPhotos] = useState([])
    const [error, setError] = useState('')

    const fetchPhotos = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/my-photos', {
            method: 'GET',    
            headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            })
            
            const data = await response.json()
            if (data.success) {
                setPhotos(data.photos)
            } else (
                setError(data.error)
            )
        } catch (error) {
            setError('Error Fetching photos',error)
        }
    }

    return (
        <div>
            <h2>My Photos</h2>
            <div className="button-container">
                <button onClick={fetchPhotos}>Show Photos</button>
            </div>
            <br />
            <div className="photo-grid">
                {photos.map(photo => (
                    <div key={photo.id} className="photo-tile">
                        <img src={`http://localhost:5000/uploads/${photo.image_file}`} alt={`Photo ${photo.id}`} />
                    </div>
                ))}
            </div>
            {error && <p className="error-message">{error}</p>}
        </div>
    )
}

export default MyPhotos