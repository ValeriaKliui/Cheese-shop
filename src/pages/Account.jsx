import React, { useContext } from 'react'
import AppContext from '../AppContext';
import MyInput from '../components/UI/input/MyInput'
import input_pic from '../assets/icons/search_lupa.svg';
import no_fav from '../assets/icons/no-fav.png';
import Info from '../components/Info'

const Account = () => {
    const { renderItems, itemsOrdered, setIsAccount } = useContext(AppContext);
    setIsAccount(true);
    return (
        <div className='catalog'>
            <div className="catalog__top">
                <h2 className="title catalog__title">
                  Мои заказы
                </h2>
            </div>
            {itemsOrdered[0] ? itemsOrdered.map((arr, index) =>
                <React.Fragment key={arr.id}>
                    <h3 className='order__info'>{arr.time}</h3>
                    <div className="catalog__items" key={index}>
                        {
                            renderItems(arr.items.map(elem => ({ ...elem })))
                        }
                    </div>
                </ React.Fragment>
            )
                : <Info src={no_fav} title='Заказов нет :(' subtext='Вы пока ничего не заказали' />
            }
        </div>
    )
}

export default Account