// frontend/src/components/UploadForm.jsx
import React, { useState } from 'react'

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
            const response = await fetch('http://127.0.0.1:5000/api/upload-photo', {
                method: 'POST',
                credentials: 'include', // Include cookies in the request
                body: formData
            });

            console.log(response)
            const data = await response
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
        <div>
            <h2>Upload Image</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleChange} />
                {previewURL && (
                    <img src={previewURL} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px' }} />
                    )}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Upload</button>
            </form>
            {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
        </div>
    );
};

export default UploadForm;
