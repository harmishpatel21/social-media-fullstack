import React, { useState, useEffect } from 'react'
import {
    Box,
    Typography,
    CircularProgress,
    Grid,
    Card,
    CardMedia,
} from '@mui/material'

const UserPhotos = ({ username, token }) => {
    const [photos, setPhotos] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUserPhotos = async () => {
            setLoading(true)
            try {
                const response = await fetch(`http://127.0.0.1:5000/api/user-photos/${username}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    }
                })
                
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                const data = await response.json()
                setPhotos(data.photos)
            } catch (error) {
                console.error('Error fetching user photos:', error)
            } finally {
                setLoading (false)
            }
        }
        fetchUserPhotos()
    }, [username, token])

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Photos of {username}</Typography>
            {loading ? (
                <CircularProgress />
            ) : (
                <Grid container spacing={2}>
                    {photos.map((photo) => (
                        <Grid item key={photo.id} xs={12} sm={6} md={4} lg={3}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    image={`http://127.0.0.1:5000/uploads/${photo.image_file}`}
                                    alt="User photo"
                                />
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
}

export default UserPhotos 
