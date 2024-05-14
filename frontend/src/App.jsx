import React, { useState } from "react"
import SignUp from "./components/SignUp"
import Login from "./components/Login"
import WelcomeMessage from "./components/WelcomeMessage"
import UploadForm from "./components/UploadForm"
import MyPhotos from "./components/MyPhotos"

const App = () => {
    const [isSignedUp, setIsSignedUp] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [username, setUsername] = useState('')
    const [showSignUp, setShowSignUp] = useState(false)
    const [showLogin, setShowLogin] = useState(false)

    const handleSignUpSuccess = () => {
        setIsSignedUp(true);
        setShowSignUp(false);
        setShowLogin(true);
    }

    const handleLoginSuccess = (username) => {
        setUsername(username);
        setIsLoggedIn(true);
    }

    return (
        <div>
            {/* <h1>Welcome to Social Media App</h1> */}

            {!isLoggedIn && (
                <div>
                    <button onClick={() => setShowSignUp(true)}>Sign Up</button>
                    <button onClick={() => setShowLogin(true)}>Login</button>
                </div>
            )}

            {showSignUp && (
                <div>
                    <h2>Sign Up</h2>
                    <SignUp onSignUpSuccess={handleSignUpSuccess} />
                </div>
            )}

            {showLogin && !isLoggedIn && (
                <div>
                    <h2>Login</h2>
                    <Login onLoginSuccess={handleLoginSuccess} />
                </div>
            )}

            {isLoggedIn && (
                <div>
                    <WelcomeMessage username={username} />
                    <MyPhotos />
                    <UploadForm />
                </div>
            )}
        </div>
    )
}

export default App;
