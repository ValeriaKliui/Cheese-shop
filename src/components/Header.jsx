import {useContext} from 'react'
import AppContext from '../AppContext';
import { Link } from 'react-router-dom'
import AccountInfo from './AccountInfo'
import Logo from './Logo'

const Header = () => {
    const {setIsOpened} = useContext(AppContext);

    function onClickCard() {
        setIsOpened(prevState => !prevState);
    }
    return (
        <header className='header'>
            <Link to="/">
                <Logo />
            </ Link>
            <AccountInfo onClickCard={onClickCard} />
        </header>
    )
}

export default Header