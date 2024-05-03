// frontend/src/components/UploadForm.jsx
import React, { useState } from 'react';

const UploadForm = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        } else {
            setFile(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://127.0.0.1:5000/api/upload-photo', {
                method: 'POST',
                // headers: {
                //     'Content-Type': 'multipart/form-data'
                // },
                body: formData
            });

            const data = await response.json()

            if (data.success) {
                console.log(data)
            } else {
                setError('NOOO')
            }
        } catch (error) {
            console.error('Error uploading photo:', error);
            setError('An error occurred while uploading the photo.');
        }
    };

    return (
        <div>
            <h2>Upload Photo</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleChange} />
                <button type="submit">Upload</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default UploadForm;
