import React, { useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { styled } from "@mui/system"

const StyledGridItem = styled(Grid)(({ theme }) => ({
    position: "relative",
    border: "1px solid black",
    overflow: "hidden",
    boxSizing: "border-box",
    "& img": {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        transition: "tranform 0.3s ease",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    },
    "&:hover img": {
        transform: "translate(-50%, -50%) scale(1.05)",
    },
}))


const MyPhotos = () => {

    const [photos, setPhotos] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const fetchPhotos = async () => {
        setLoading(true)
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
            setError('Error Fetching photos', error)
        }
        setLoading(false)
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h4" align="center" gutterBottom>
                    My Photos
                </Typography>
            </Grid>

            <Grid item xs={12} sx={{ marginBottom: 2 }}>
                <Button variant="contained" onClick={fetchPhotos} disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : 'Show Photos'}
                </Button>
            </Grid>

            {photos.map((photo) => (
                <StyledGridItem key={photo.id} item xs={12} sm={6} md={4} sx={{ height: 200 }}>
                    <img
                        src={`http://127.0.0.1:5000/uploads/${photo.image_file}`}
                        alt={`Photo ${photo.id}`}
                    />
                </StyledGridItem>
            ))}

            <Grid item xs={12}>
                {error && <Typography variant="body1" style={{ color: 'red' }}>{error}</Typography>}
            </Grid>
        </Grid>
    )
}

export default MyPhotos