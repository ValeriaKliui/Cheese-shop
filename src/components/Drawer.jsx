import {useContext} from 'react'
import AppContext from '../AppContext';
import CloseDeleteIcon from './CloseDeleteIcon';
import DrawerItem from './DrawerItem'
import Info from './Info';
import MakeOrder from './MakeOrder';
import card from '../assets/icons/card.png'

const Drawer = () => {
  const {itemsChosen, isOpened, setIsOpened, handleCardClick, deleteFromCard} = useContext(AppContext);
  const drawerIsEmpty = itemsChosen.length === 0;

  return (
    <>
      {isOpened &&
        <div className="shadow" onClick={handleCardClick}>
          <div className='drawer'>
            <div className="drawer__top">
              <h2 className="title catalog__title">
                Корзина
              </h2>
              <CloseDeleteIcon isClosed={true} setIsOpened={setIsOpened} />
            </div>
            {
              drawerIsEmpty ?
              <div>
                <Info title='Корзина пустая' subtext='Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.' src={card}/>
                </div>
                :
                <div className="items">
                  {itemsChosen.map((item) => <DrawerItem key={item.id} item={item} deleteFromCard={() => { deleteFromCard(item) }} />)}
                </div>
            }
            <MakeOrder />
          </div>
        </div>}
    </>
  )
}

export default Drawer