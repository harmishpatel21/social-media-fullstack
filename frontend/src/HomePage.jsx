import React, { useState } from "react"
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Container,
    CssBaseline,
    ThemeProvider,
    // createTheme,
    Box,
} from "@mui/material"
import { createTheme } from "@mui/material/styles"
import SignUp from "./components/SignUp"
import Login from "./components/Login"
import WelcomeMessage from "./components/WelcomeMessage"
import UploadForm from "./components/UploadForm"
import MyPhotos from "./components/MyPhotos"
import UserSearch from "./components/UserSearch"


const theme = createTheme({
    palette: {
        primary: {
            main: "#4a148c"
        },
        secondary: {
            main: "#ff6f00"
        },
        background: {
            default: "f3e5f5"
        },
    },
})


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
        <ThemeProvider theme={theme}>
            <CssBaseline />

            <Container>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
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
                                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                    <WelcomeMessage username={username} />
                                </Typography>
                                <Button color="inherit" onClick={handleLogout}>Logout</Button>
                            </>
                        )}
                    </Toolbar>
                </AppBar>

                <Container sx={{ mt: 4 }}>

                    {!isLoggedIn && showSignUp && <SignUp onSignUpSuccess={handleSignUpSuccess} />}
                    {!isLoggedIn && showLogin && <Login onLoginSuccess={handleLoginSuccess} />}
                    {isLoggedIn && (
                        <>
                            <UserSearch />
                            <Box sx={{ display: "flex", mt: 4 }}>
                                <Box sx={{ flex: 3, pr: 2 }}>
                                    <MyPhotos />
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <UploadForm />
                                </Box>
                            </Box>
                        </>
                    )}
                </Container>
            </Container>
        </ThemeProvider>
    )
}

export default HomePage