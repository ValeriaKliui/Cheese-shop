import React from 'react'
import AddIcon from './AddIcon'
import Favourite from './Favourite'

const CatalogItem = (props) => {
    return (
        <div className='catalog__item'>
            <div className="item__photo">
                <Favourite />
                <img src={props.src} alt="" className='item__img' />
            </div>
            <h3 className="item__title">
                Мезофильная закваска Danisco CHOOZIT MM
            </h3>
            <div className="properties">
                <div className="cost">
                    <p className="small_text cost__text">
                        Цена:
                    </p>
                    <p className="cost__amount">
                        12 999 руб.
                    </p>
                </div>
                <AddIcon />
            </div>
        </div>
    )
}

export default CatalogItem