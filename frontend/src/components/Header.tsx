import { AppBar, Toolbar } from '@mui/material'
import React from 'react'
import Logo from './shared/Logo'
import { useAuth } from '../context/AuthContext'
import NavLinks from './shared/NavLinks'

const Header = () => {
    const auth = useAuth()
    return (
        <AppBar sx={{ bgcolor: "transparent", position: "static", boxShadow: 'none' }}>
            <Toolbar sx={{ display: 'flex' }}>
                <Logo />
                <div>
                    {auth?.isLoggedIn ?
                        <>
                            <NavLinks bg='#27899A' to='/chat' text='Go to chats' textColor='white' />
                            <NavLinks bg="#34BED6"
                                to="/" text='Logout'
                                textColor='white'
                                onClick={auth?.logout} />
                        </> :
                        <>
                            <NavLinks bg='#27899A' to='/login' text='Login' textColor='white' />
                            <NavLinks bg="#34BED6"
                                to="/signup" text='SignUp'
                                textColor='white'
                                onClick={auth?.logout} />
                        </>}
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default Header
