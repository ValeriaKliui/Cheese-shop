import {useContext} from 'react'
import AppContext from '../AppContext';
import MyInput from '../components/UI/input/MyInput'
import input_pic from '../assets/icons/search_lupa.svg';
import no_fav from '../assets/icons/no-fav.png';
import Info from '../components/Info'

const Account = () => {
    const {renderItems, handleChange, inputSearch, itemsOrdered} = useContext(AppContext);

    
    return (
        <div className='catalog'>
            <div className="catalog__top">
                <h2 className="title catalog__title">
                    {inputSearch ? `Поиск по: "${inputSearch}"` : 'Мои заказы'}
                </h2>
                <MyInput src={input_pic} placeholder='Поиск...' value={inputSearch} onChange={(e) => handleChange(e.target.value)} />
            </div>
            <>
            {itemsOrdered[0].items.length ?  <div className="catalog__items">
                {renderItems(itemsOrdered[0].items.map(elem=>({...elem, atCard: false})))}
            </div>
            : <Info src={no_fav} title='Заказов нет :(' subtext='Вы пока ничего не заказали'/>}
            </>
        </div>
        )
}

export default Account