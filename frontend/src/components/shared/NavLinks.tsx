import React from 'react'
import { Link } from 'react-router-dom'

type Props = {
    to: string,
    bg: string,
    text: string,
    textColor: string,
    onClick?: () => Promise<void>
}

const NavLinks = (props: Props) => {
    return (
        <Link onClick={props.onClick}
            className='navlinks'
            to={props.to} style={{
                background: props.bg,
                color: props.textColor,
                fontFamily: "Nerko One, Lucida Sans"
            }}>
            {props.text}
        </Link>
    )
}

export default NavLinks
