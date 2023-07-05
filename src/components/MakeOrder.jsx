import axios from 'axios';
import { useContext, useState } from 'react'
import AppContext from '../AppContext';
import MyButton from './UI/button/MyButton';

const MakeOrder = () => {
    const { totalPrice, itemsChosen, setItemsChosen, setItems, setItemsLiked, items, setTotalPrice, setOrdered } = useContext(AppContext);
    const itemsAtCard = itemsChosen.length;

    function sentOrder(itemsToOrder) {
        axios.post('https://649ee36b245f077f3e9d0c98.mockapi.io/order', itemsToOrder).then(setOrdered(true));
        for (let i = 0; i < itemsChosen.length; i++) {
            axios.delete(`https://6499d13579fbe9bcf840095e.mockapi.io/card/${itemsChosen[i].id}`);
        }
        setItemsChosen([]);
        setItems(prevItems => prevItems.map(e => ({ ...e, atCard: false })))
        setItemsLiked(prevItems => prevItems.map(e => ({ ...e, atCard: false })));
        setTotalPrice(0);
    }

    return (
        <div className={itemsAtCard ? 'order' : 'hidden'}>
            <div className="order__row">
                <p className="text">Итого:</p>
                <div className="dots"></div>
                <p className="text_bold">{totalPrice} BYN</p>
            </div>
            <MyButton text='Оформить заказ' onClick={() => sentOrder(itemsChosen)} />
        </div>
    )
}

export default MakeOrder