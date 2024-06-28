import React, { useState, useEffect } from 'react' 
import {
    TextField,
    List,
    ListItem,
    ListItemText,
    CircularProgress,
} from '@mui/material'

import UserPhotos from './UserPhotos'

const UserSearch = () => {
    const [query, setQuery] = useState('') 
    const [users, setUsers] = useState([]) 
    const [loading, setLoading] = useState(false) 
    const [selectedUser, setSelectedUser] = useState(null) 


    useEffect(() => {
        const searchUsers = async (searchQuery) => {
            setLoading(true) 
            try {
                const response = await fetch(`http://127.0.0.1:5000/api/search?q=${searchQuery}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }) 
                if (!response.ok) {
                    throw new Error('Network response was not ok') 
                }
                const data = await response.json() 
                setUsers(data) 
            } catch (error) {
                console.error('Error fetching users:', error) 
            } finally {
                setLoading(false) 
            }
        };

        if (query.trim() !== '') {
            searchUsers(query)
        } else {
            setUsers([]) // Clear users if query is empty
        }
    }, [query])

    const handleInputChange = (event) => {
        const searchQuery = event.target.value
        setQuery(searchQuery)
    }

    const handleUserSelect = (username) => {
        setSelectedUser(username) 
    }

    return (
        <div>
            <TextField
                label="Search users"
                variant="outlined"
                fullWidth
                value={query}
                onChange={handleInputChange}
                margin="normal"
            />
            {loading ? (
                <CircularProgress />
            ) : (
                <List>
                    {users.map((user) => (
                        <ListItem button key={user.id} onClick={() => handleUserSelect(user.username)}>
                            <ListItemText primary={user.username} />
                        </ListItem>
                    ))}
                </List>
            )}
            {selectedUser && <UserPhotos username={selectedUser} />}
        </div>
    )    
}

export default UserSearch;
