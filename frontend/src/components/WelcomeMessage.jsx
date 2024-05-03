import React, { useState } from "react";

const WelcomeMessage = ({ username }) => {
    return (
        <div>
            <h2>Welcome, {username}</h2>
            <p> You are now logged in</p>
        </div>
    )
}

export default WelcomeMessage