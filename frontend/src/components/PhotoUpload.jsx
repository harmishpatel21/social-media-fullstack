import React, { useState } from 'react';

const PhotoUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert('Please select a file');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('image', selectedFile);

            const response = await fetch('http://127.0.0.1:5000/api/upload', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                setUploadStatus('Upload successful');
            } else {
                console.error('Error uploading photo:', response.statusText);
                setUploadStatus('Upload failed');
            }
        } catch (error) {
            console.error('Error uploading photo:', error.message);
            setUploadStatus('Upload failed');
        }
    };

    return (
        <div>
            <h2>Upload Photo</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            <p>{uploadStatus}</p>
        </div>
    );
};

export default PhotoUpload;