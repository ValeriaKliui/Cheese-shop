import { useContext } from 'react'
import AppContext from '../AppContext';
import MyButton from './UI/button/MyButton';

const MakeOrder = () => {
    const { totalPrice, itemsChosen } = useContext(AppContext);
    const itemsAtCard = itemsChosen.length;
    
    return (
        <div className={itemsAtCard ? 'order' : 'hidden'}>
            <div className="order__row">
                <p className="text">Итого:</p>
                <div className="dots"></div>
                <p className="text_bold">{totalPrice} BYN</p>
            </div>
            <MyButton text='Оформить заказ'/>
        </div>
    )
}

export default MakeOrder