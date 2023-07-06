import { useContext } from 'react'
import AppContext from '../AppContext';
import CloseDeleteIcon from './CloseDeleteIcon';
import DrawerItem from './DrawerItem'
import Info from './Info';
import MakeOrder from './MakeOrder';
import card from '../assets/icons/card.png'
import order from '../assets/icons/order.png'

const Drawer = () => {
  const { itemsChoosen, isOpened, setIsOpened, handleCardClick, deleteFromCard, ordered } = useContext(AppContext);
  const drawerIsEmpty = itemsChoosen.length === 0;

  return (
    <>
      {isOpened &&
        <div className="shadow" onClick={handleCardClick}>
          <div className='drawer'>
            <div className="drawer__top">
              <div className="drawer__header">
                <h2 className="title catalog__title drawer__title">
                  Корзина
                </h2>
                <CloseDeleteIcon isClosed={true} setIsOpened={setIsOpened} />
              </div>
              <div>
                {!drawerIsEmpty &&
                  <div className="items">
                    {itemsChoosen.map((item) => <DrawerItem key={item.id} item={item} deleteFromCard={() => { deleteFromCard(item) }} />)}
                  </div>
                }
              </div>
            </div>
            <div>
              {ordered ? 
                <div>
                <Info title='Заказ оформлен!' subtext='Ваш заказ #18 скоро будет передан курьерской доставке'  src={order}/>
              </div>
              :
                (drawerIsEmpty && <div>
                  <Info title='Корзина пустая' subtext='Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.' src={card} />
                </div>)
                }
            </div>
            <MakeOrder />
          </div>
        </div>}
    </>
  )
}

export default Drawer