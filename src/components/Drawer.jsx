import {useContext} from 'react'
import AppContext from '../AppContext';
import CloseDeleteIcon from './CloseDeleteIcon';
import DrawerItem from './DrawerItem'

const Drawer = () => {

  const {itemsChosen, isOpened, setIsOpened, handleCardClick, deleteFromCard} = useContext(AppContext);
  const drawerIsEmpty = itemsChosen.length === 0;

  return (
    <>
      {isOpened &&
        <div className="shadow" onClick={handleCardClick}>
          <div className={drawerIsEmpty ? ['drawer', 'drawer_empty'].join(' ') : 'drawer'}>
            <div className="drawer__top">
              <h2 className="title catalog__title">
                Корзина
              </h2>
              <CloseDeleteIcon isClosed={true} setIsOpened={setIsOpened} />
            </div>
            {
              drawerIsEmpty ?
                <p className="text drawer_empty__text">
                  В корзине пусто.
                </p>
                :
                <div className="items">
                  {itemsChosen.map((item) => <DrawerItem key={item.id} item={item} deleteFromCard={() => { deleteFromCard(item) }} />)}
                </div>
            }
          </div>
        </div>}
    </>
  )
}

export default Drawer