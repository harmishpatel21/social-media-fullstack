import React, { useState } from "react";
import '../style/WelcomeMessage.css'

const WelcomeMessage = ({ username }) => {
    return (
        <div className="welcome-message-container">
            <h2>{username}</h2>
        </div>
    )
}

export default WelcomeMessage