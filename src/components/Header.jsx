import React from 'react'
import AccountInfo from './AccountInfo'
import Logo from './Logo'
const Header = () => {
    return (
        <header className='header'>
            <Logo />
            <AccountInfo />
        </header>
    )
}

export default Header