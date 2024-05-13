import React, { useState } from "react"

const Logout = ({ onLogoutSuccess }) => {

    const [isLoggingOut, setIsLoggingOut] = useState(false)

    const handleClick = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch('http://127.0.0.1:5000/api/logout', {
                method: 'OPTIONS',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            })
            data = await response.json()

            if (data.success) {
                onLogoutSuccess()
                console.log("DONE")
            }
        } catch (error) {
            console.error('Error Logging out', error)
        } finally {
            setIsLoggingOut(false)
        }
    }

    return (
        <div>
            <button onClick={handleClick}>Logout</button>
        </div>
    )
}

export default Logout