import React, { useState } from "react";
// import '../style/FormStyle.css'
import '../style/App.css'

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
                const { access_token } = data
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
        <div className="form-container">
            <div className="input-container">
                <input type='text' placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="input-container">
                <input type='password' placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="button-container">
                <button onClick={handleLogin}>Login</button>
            </div>

            {error && <p className="error-message">{error}</p>}
        </div>
    )
}

export default Login