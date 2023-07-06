import axios from 'axios';
import { useContext, useState } from 'react'
import AppContext from '../AppContext';
import MyButton from './UI/button/MyButton';

const MakeOrder = ({ orderID, setOrderID }) => {
    const { totalPrice, itemsChoosen, setItemsChoosen, setItems, setItemsLiked, setTotalPrice, setOrdered } = useContext(AppContext);
    const itemsAtCard = itemsChoosen.length;

    async function sentOrder(itemsToOrder) {
        try {
            const { data } = await axios.post('https://649ee36b245f077f3e9d0c98.mockapi.io/order', {
                items: itemsToOrder});
              setOrderID(data.id);
              console.log(orderID)
              for (let i = 0; i < itemsChoosen.length; i++) {
                  axios.delete(`https://6499d13579fbe9bcf840095e.mockapi.io/card/${itemsChoosen[i].id}`);
              }
              setOrdered(true);
              setItemsChoosen([]);
              setItems(prevItems => prevItems.map(e => ({ ...e, atCard: false })))
              setItemsLiked(prevItems => prevItems.map(e => ({ ...e, atCard: false })));
              setTotalPrice(0);
        } catch (error) {
            alert('Не удалось создать заказ')
        }
    }

    return (
        <div className={itemsAtCard ? 'order' : 'hidden'}>
            <div className="order__row">
                <p className="text">Итого:</p>
                <div className="dots"></div>
                <p className="text_bold">{totalPrice} BYN</p>
            </div>
            <MyButton text='Оформить заказ' onClick={() => sentOrder(itemsChoosen)} />
        </div>
    )
}

export default MakeOrder