import {React, useState} from 'react'
import AddIcon from './AddIcon'
import Favourite from './Favourite'

const CatalogItem = ({title, src, cost, addToCard}) => {
    const [isAdded, setIsAdded] = useState(false);
    function onClickPlus(){
        setIsAdded(prevState=> !prevState);
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
                <AddIcon onClickPlus={onClickPlus} isAdded={isAdded} addToCard={addToCard}/>
            </div>
        </div>
    )
}

export default CatalogItem