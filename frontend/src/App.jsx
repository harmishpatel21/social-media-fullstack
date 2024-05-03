import React, { useState } from "react"
import SignUp from "./components/SignUp"
import Login from "./components/Login"
import WelcomeMessage from "./components/WelcomeMessage"

const App = () => {
    const [isSignedUp, setIsSignedUp] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [username, setUsername] = useState(false)

    const handleSignUpSuccess = () => {
        setIsSignedUp(true)
    }

    const handleLoginSuccess = (username) => {
        setUsername(username)
        setIsLoggedIn(true)
    }

    return (
        <div>
            <h1>Welcom to Social Media App</h1>
            <div>
                <h2>Sign Up</h2>
                <SignUp onSignUpSuccess={handleSignUpSuccess} />
            </div>

            {!isLoggedIn ? (
                <div>
                    <h2>Login</h2>
                    <Login onLoginSuccess={handleLoginSuccess} />
                </div>
            ) : (
                <WelcomeMessage username={username} />
            )}

        </div>
    )
}

export default App