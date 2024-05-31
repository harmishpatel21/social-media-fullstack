import React, { useState, useEffect } from "react";
import {
    TextField,
    List,
    ListItem,
    ListItemText,
    CircularProgress,
} from '@mui/material';

const UserSearch = () => {
    const [query, setQuery] = useState('');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const searchUsers = async (searchQuery) => {
            setLoading(true);
            try {
                const response = await fetch(`http://127.0.0.1:5000/api/search?q=${searchQuery}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };

        if (query.trim() !== '') {
            searchUsers(query);
        } else {
            setUsers([]); // Clear users if query is empty
        }
    }, [query]);

    const handleInputChange = (event) => {
        const searchQuery = event.target.value;
        setQuery(searchQuery);
    };

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
                        <ListItem key={user.id}>
                            <ListItemText primary={user.username} />
                        </ListItem>
                    ))}
                </List>
            )}
        </div>
    );
};

export default UserSearch;
