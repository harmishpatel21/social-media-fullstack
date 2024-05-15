import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const defaultTheme = createTheme();


const SignUp = ({ onSignUpSuccess }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [usernameExistsError, setUsernameExistsError] = useState(false)

    const handleSignUp = async (e) => {
        e.preventDefault()
        
        try {
            const response = await fetch('http://127.0.0.1:5000/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            })

            const data = await response.json()
            console.log(data)

            if (data.success) {
                onSignUpSuccess()
                setMessage(data.message)
            } else {
                // Todo: change to dynamic response instead hard coded string
                if (data.error === 'Username already exists') {
                    setUsernameExistsError(true)
                }
                setError(data.error)
            }
        } catch {
            // console.error('Error Signing up', error)
            setError('An Error Occured')
        }
    }

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
        setUsernameExistsError(false)
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