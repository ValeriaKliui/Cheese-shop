import React from 'react'
import axios from 'axios';
import CloseDeleteIcon from './CloseDeleteIcon';
import DrawerItem from './DrawerItem'

const Drawer = ({ isOpened, setIsOpened, handleCardClick, itemsChosen, setItemsChosen, setItems }) => {

  const drawerIsEmpty = itemsChosen.length === 0;

  function deleteFromCard(item) {
    setItemsChosen(prevItems=> prevItems.filter(elem=> elem.id !== item.id))
    setItems(prevItems => prevItems.map(elem => elem.id === item.parentId ? {...elem, atCard: !elem.atCard} : elem));
    axios.delete(`https://6499d13579fbe9bcf840095e.mockapi.io/card/${item.id}`);
  }

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
                  {itemsChosen.map((item, index) => <DrawerItem key={item.id} item={item} deleteFromCard={() => { deleteFromCard(item) }} />)}
                </div>
            }
          </div>
        </div>}
    </>
  )
}

export default Drawer