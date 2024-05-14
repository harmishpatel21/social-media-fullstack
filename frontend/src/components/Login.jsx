import axios from "axios";
import React, { useState } from "react";

const Login = ({ onLoginSuccess }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    const handleLogin = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            })
            // .then(response => response.json())
            // .then(data => {
            //     const {access_token} = data
            //     localStorage.setItem('access_token', access_token)
            //     console.log('Login')
            // })

            const data = await response.json()

            if (data.success) {
                setMessage(data.message)
                onLoginSuccess(username)
                const {access_token} = data 
                // console.log(access_token)
                localStorage.setItem('access_token', access_token)
            } else {
                setError(data.error)
            }
        } catch (error) {
            console.log('Error Message====', error)
            setError('An Error Occured')
        }
    }

    return (
        <div>
            <input type='text' placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type='password' placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    )
}

export default Login