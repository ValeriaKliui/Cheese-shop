import { React, useState } from 'react'
import axios from 'axios'
import AddIcon from './AddIcon'
import Favourite from './Favourite'

const CatalogItem = ({ title, src, cost, addToCard, atCard, liked, addToFavourite }) => {

    return (
        <div className='catalog__item'>
            <div className="item__photo">
                <Favourite addToFavourite={addToFavourite} liked={liked} />
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
                <AddIcon addToCard={addToCard} atCard={atCard}/>
            </div>
        </div>
    )
}

export default CatalogItem