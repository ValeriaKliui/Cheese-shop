import { React, useState } from 'react'
import AddIcon from './AddIcon'
import Favourite from './Favourite'

const CatalogItem = ({ title, src, cost, addToCard, id, atCard,  setItems }) => {
    function onClickPlus() {
        let newId = +(id - 1);
        setItems(prevItems => prevItems.map((item, index) => {
            return index === newId ? { ...item, atCard: !item.atCard } : item
        }))
        
    }

    return (
        <div className='catalog__item'>
            <div className="item__photo">
                <Favourite />
                <img src={src} alt="" className='item__img' />
            </div>
            <p className="text item__title">
                {title}
            </p>
            <div className="properties">
                <div className="cost">
                    <p className="small_text cost__text">
                        Цена:
                    </p>
                    <p className="cost__amount">
                        {cost} BYN
                    </p>
                </div>
                <AddIcon onClickPlus={onClickPlus} addToCard={addToCard} atCard={atCard}/>
            </div>
        </div>
    )
}

export default CatalogItem