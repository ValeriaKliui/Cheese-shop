import React from 'react'
import CloseDeleteIcon from './CloseDeleteIcon';

const DrawerItem = ({deleteFromCard, ...props}) => {
    const { item } = props;
    const { title, cost, src } = item;

    
    return (
        <div className='drawer__item'>
            <div className="item__photo item__photo_drawer">
                <img src={src} alt="" className='item__img_drawer' />
            </div>
            <div className="item__info">
            <p className="text item__title">
                {title}
            </p>
            <p className="cost__amount">
                {cost} BYN
            </p>
            </div>
            <CloseDeleteIcon deleteFromCard={deleteFromCard}/>
        </div>
    )
}

export default DrawerItem