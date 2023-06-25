import React from 'react'
import logo from '../assets/cheeze.svg'

const Logo = () => {
    return (
        <div className="logo">
            <img src={logo} alt="Логотип магазина сыроделия" className='logo__img' />
            <div className="logo__text">
                <h1 className='logo__title'>Сыроварение</h1>
                <p className="subtext">
                    Оборудование и товары для сыроделия
                </p>
            </div>
        </div>
    )
}

export default Logo