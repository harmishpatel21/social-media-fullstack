// frontend/src/components/UploadForm.jsx
import React, { useState } from 'react'
import { Button, Container, Grid, Typography } from '@mui/material'

const UploadForm = () => {
    const [file, setFile] = useState(null)
    const [filename, setFilename] = useState('')
    const [error, setError] = useState(null)

    const handleChange = (e) => {
        const selectedFile = e.target.files[0]
        setFile(selectedFile)
        setFilename(selectedFile.name)
    }

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
            })

            const data = await response.json()
            // console.log(data)

            if (data.success) {
                console.log(data)
                setError(data.error)
            } else {
                setError('Error Uploading Photo')
            }
        } catch (error) {
            console.error('Error uploading photo:', error)
            setError('An error occurred while uploading the photo.')
        }
    }

    return (
        <Container>
            <Typography variant='h4' align='center' gutterBottom>
                Upload Image
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <input
                            type='file'
                            accept='image/*'
                            onChange={handleChange}
                            style={{ display: 'none' }}
                            id='upload-button'
                        />
                        <label htmlFor="upload-button">
                            <Button component="span" variant="contained" color="primary">
                                Choose File
                            </Button>
                        </label>
                    </Grid>
                    <Grid item>
                        <Button type="submit" variant="contained" color="primary" disabled={!file}>
                            Upload
                        </Button>
                    </Grid>
                </Grid>
                {filename && (
                    <Typography variant='body1' style={{ marginTop: '16px' }}>
                        Selected file: {filename}
                    </Typography>
                )}
                {error && (
                    <Typography variant="body1" color="error" style={{ marginTop: '16px' }}>
                        {error}
                    </Typography>
                )}
            </form>
        </Container>
    )
}

export default UploadForm;
