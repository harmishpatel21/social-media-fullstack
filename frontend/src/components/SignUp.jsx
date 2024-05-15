import React, { useState } from "react";
import "../style/App.css"

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

        <div className="form-container">
            <div className="input-container">
                <input type='text' placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="input-container">
                <input type='password' placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="button-container">
                <button onClick={handleSignUp}>Sign up</button>
            </div>

            {error && <p className="error-message">{error}</p>}
        </div>
    )
}

export default SignUp