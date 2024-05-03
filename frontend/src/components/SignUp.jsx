import React, { useState } from "react";

const SignUp = ({ onSignUpSuccess }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    const handleSignUp = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            })

            const data = await response.json()

            if (data.success) {
                onSignUpSuccess()
                setMessage(data.message)
            } else {
                setError(data.error)
            }
        } catch {
            // console.error('Error Signing up', error)
            setError('An Error Occured')
        }
    }

    return (
        <div>
            <input type='text' placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type='password' placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleSignUp}>Sign Up</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {message && <p style={{ color: 'green' }}>{message}</p>}
        </div>
    )
}

export default SignUp