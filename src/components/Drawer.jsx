import React from 'react'
import DrawerItem from './DrawerItem'

const Drawer = ({ isOpened, handleCardClick, itemsChosen, setItemsChosen, items, setItems }) => {
  function deleteFromCard(item, id) {
    let newId = id-1;
    setItemsChosen(prevItems => prevItems.filter(elem => elem.id !== item.id));
    setItems(prevItems => prevItems.map((item, index) => {
      return index === newId ? { ...item, atCard: !item.atCard } : item
  }))
  }

  return (
    <>
      {isOpened &&
        <div className="shadow" onClick={handleCardClick}>
          <div className='drawer'>
            <h2 className="title catalog__title">
              Корзина
            </h2>
            <div className="items">
              {itemsChosen.map(item => <DrawerItem key={item.id} item={item} deleteFromCard={() => deleteFromCard(item, item.id)} />)}
            </div>
          </div>
        </div>}
    </>
  )
}

export default Drawer