import React from 'react'
import MyInput from '../components/UI/input/MyInput'
import input_pic from '../assets/icons/search_lupa.svg';

const Favourite = ({inputSearch, renderItems, handleChange }) => {
    return (
        <div className='catalog'>
            <div className="catalog__top">
                <h2 className="title catalog__title">
                    {inputSearch ? `Поиск по: "${inputSearch}"` : 'Закладки'}
                </h2>
                <MyInput src={input_pic} placeholder='Поиск...' value={inputSearch} onChange={(e) => handleChange(e.target.value)} />
            </div>
            <div className="catalog__items">
                {renderItems()}
            </div>
        </div>)
}

export default Favourite