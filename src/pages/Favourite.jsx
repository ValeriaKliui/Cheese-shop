import {useContext} from 'react'
import AppContext from '../AppContext';
import MyInput from '../components/UI/input/MyInput'
import input_pic from '../assets/icons/search_lupa.svg';
import no_fav from '../assets/icons/no-fav.png';
import Info from '../components/Info'

const Favourite = () => {
    const {renderItems, handleChange, inputSearch, itemsLiked} = useContext(AppContext);

    
    return (
        <div className='catalog'>
            <div className="catalog__top">
                <h2 className="title catalog__title">
                    {inputSearch ? `Поиск по: "${inputSearch}"` : 'Закладки'}
                </h2>
                <MyInput src={input_pic} placeholder='Поиск...' value={inputSearch} onChange={(e) => handleChange(e.target.value)} />
            </div>
            <>
            {itemsLiked.length ?  <div className="catalog__items">
                {renderItems(itemsLiked)}
            </div>
            : <Info src={no_fav} title='Закладок нет :(' subtext='Вы ничего не добавляли в закладки'/>}
            </>
        </div>
        )
}

export default Favourite