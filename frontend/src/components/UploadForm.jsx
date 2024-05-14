// frontend/src/components/UploadForm.jsx
import React, { useState } from 'react'
import '../style/FormStyle.css'

const UploadForm = () => {
    const [file, setFile] = useState(null)
    const [previewURL, setPreviewURL] = useState('')
    const [error, setError] = useState(null)

    const handleChange = (e) => {
        const selectedFile = e.target.files[0]
        if (selectedFile) {
            setFile(selectedFile)
            const reader = new FileReader()
            reader.onload = () => {
                setPreviewURL(reader.result)
            }
            reader.readAsDataURL(selectedFile)
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append('file', file);

        try {

            const access_token = localStorage.getItem('access_token')
            if (!access_token) {
                setError('Access token not found. Please login.')
                return
            }

            const response = await fetch('http://127.0.0.1:5000/api/upload-photo', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${access_token}`
                },
                body: formData
            });

            const data = await response.json()
            // console.log(data)

            if (data.success) {
                console.log(data)
                setError(data.error)
            } else {

                setError('NOOO')
            }
        } catch (error) {
            console.error('Error uploading photo:', error);
            setError('An error occurred while uploading the photo.');
        }
    };

    return (
        <div className='form-container'>
            <h2>Upload Image</h2>

            <form onSubmit={handleSubmit}>
                <div className='input-container'>
                    <input type="file" onChange={handleChange} />
                </div>
                {/* {previewURL && (
                    <img src={previewURL} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px' }} />
                    )} */}
                
                <div className='button-container'>
                    <button type="submit">Upload</button>
                </div>
                {error && <p className='error-message'>{error}</p>}
            </form>
        </div>
    );
};

export default UploadForm;
