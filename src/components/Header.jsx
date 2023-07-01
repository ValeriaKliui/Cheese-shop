import {React, useState} from 'react'
import AccountInfo from './AccountInfo'
import Logo from './Logo'

const Header = ({setIsOpened}) => {
    function onClickCard(){
        setIsOpened(prevState=>!prevState);
    }
    return (
        <header className='header'>
            <Logo />
            <AccountInfo onClickCard={onClickCard}/>
        </header>
    )
}

export default Header