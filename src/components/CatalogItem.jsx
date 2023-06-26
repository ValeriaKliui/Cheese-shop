import {React, useState} from 'react'
import AddIcon from './AddIcon'
import Favourite from './Favourite'

const CatalogItem = ({title, src, cost}) => {
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
            <h3 className="item__title">
                {title}
            </h3>
            <div className="properties">
                <div className="cost">
                    <p className="small_text cost__text">
                        Цена:
                    </p>
                    <p className="cost__amount">
                        {cost} BYN 
                    </p>
                </div>
                <AddIcon onClickPlus={onClickPlus} isAdded={isAdded}/>
            </div>
        </div>
    )
}

export default CatalogItem