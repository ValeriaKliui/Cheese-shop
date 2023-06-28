import React from 'react'
import axios from 'axios';
import CloseDeleteIcon from './CloseDeleteIcon';
import DrawerItem from './DrawerItem'

const Drawer = ({ isOpened, setIsOpened, handleCardClick, itemsChosen, setItemsChosen, setItems }) => {

  const drawerIsEmpty = itemsChosen.length === 0;

  function deleteFromCard(item, index) {
    console.log(index)
    axios.delete(`https://6499d13579fbe9bcf840095e.mockapi.io/card/${index}`);

    let newId = index - 1;
    setItemsChosen(prevItems => prevItems.filter(elem => elem.id !== item.id));
    setItems(prevItems => prevItems.map((item, index) => {
      return index === newId ? { ...item, atCard: !item.atCard } : item
    }))
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
            <CloseDeleteIcon isClosed={true} setIsOpened={setIsOpened}/>
            </div>
            {
              drawerIsEmpty ?
                <p className="text drawer_empty__text">
                  В корзине пусто.
                </p>
                :
                <div className="items">
                  {itemsChosen.map((item, index) => <DrawerItem key={item.id} item={item} deleteFromCard={() => {console.log(item, index); deleteFromCard(item, index)}} />)}
                </div>
            }
          </div>
        </div>}
    </>
  )
}

export default Drawer