import { Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Logo = () => {
    return (
        <div style={{
            display: "flex", marginRight: "auto", alignItems: "center", gap: "8px"
        }}>
            <Link to="/" >
                <img
                    src='ai-chat-logo.png'
                    alt='ai-chat-logo'
                    width={'50px'}
                    height={'50px'}
                    className='img-inverted' />
            </Link>
            <Typography sx={{
                    display: { md: "block", sm: "none", xs: "none" },
                    mr: "auto", fontWeight: "800", textShadow: "2px 2px 4px #000"
                }}>
                    <span style={{fontSize:"20px"}}>AI</span>-CHAT
                </Typography>
        </div>
    )
}

export default Logo
