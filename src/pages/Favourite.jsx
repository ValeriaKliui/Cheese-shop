import {useContext} from 'react'
import AppContext from '../AppContext';
import MyInput from '../components/UI/input/MyInput'
import input_pic from '../assets/icons/search_lupa.svg';

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
            <div className="catalog__items">
                {renderItems(itemsLiked)}
            </div>
        </div>
        )
}

export default Favourite