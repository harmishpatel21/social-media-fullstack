import React, { useState } from "react";
// import '../style/WelcomeMessage.css'

const WelcomeMessage = ({ username }) => {
    return (
        <div>
            <h2>{username}</h2>
        </div>
    )
}

export default WelcomeMessage