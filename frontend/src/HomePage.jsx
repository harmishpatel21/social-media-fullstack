import React, {useState} from "react";
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import WelcomeMessage from "./components/WelcomeMessage";
import UploadForm from "./components/UploadForm";
import MyPhotos from "./components/MyPhotos";

const HomePage = () => {
    const [showSignUp, setShowSignUp] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [username, setUsername] = useState(false)

    const handleSignUpSuccess = () => {
        setShowSignUp(false)
        setShowLogin(true)
    }

    const handleLoginSuccess = (username) => {
        setUsername(username)
        setIsLoggedIn(true)
        setShowSignUp(false)
        setShowLogin(false)
    }
    
    const handleLogout = () => {
        setUsername('')
        setIsLoggedIn(false)
    }

    return (
        <Container>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow:1}}>
                        Welcome
                    </Typography>

                    {!isLoggedIn ? (
                        <>
                            <Button 
                                color="inherit" 
                                onClick={() => {
                                    setShowSignUp(true)
                                    setShowLogin(false)
                                }} 
                            >
                                Sign Up
                            </Button>
                            <Button 
                                color="inherit" 
                                onClick={() => { 
                                    setShowLogin(true)
                                    setShowSignUp(false)
                                }}
                            >
                                Login
                            </Button>
                        </>
                    ) : (
                        <>
                            <Typography variant="h6" component="div" sx={{flexGrow:1}}>
                                <WelcomeMessage username={username} />
                            </Typography>
                            <Button color="inherit" onClick={handleLogout}>Logout</Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
            <Container>
                
                {!isLoggedIn && showSignUp && <SignUp onSignUpSuccess={handleSignUpSuccess} /> }
                {!isLoggedIn && showLogin && <Login onLoginSuccess={handleLoginSuccess} />}
                {isLoggedIn && (
                    <>
                        <WelcomeMessage username={username} />
                        <Container sx={{display:'flex'}} >
                            <Container sx={{flex: 3}}>
                                <MyPhotos />
                            </Container>
                            <Container sx={{flex:1}}>
                                <UploadForm />
                            </Container>
                        </Container>
                    </>
                )}
            </Container>
        </Container>
    )
}

export default HomePage