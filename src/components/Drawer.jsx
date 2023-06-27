import React from 'react'
import DrawerItem from './DrawerItem'

const Drawer = ({ isOpened, handleCardClick, itemsChosen, setItemsChosen }) => {
  function deleteFromCard(item) {
    setItemsChosen(prevItems => prevItems.filter(elem => elem.id !== item.id))
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
              {itemsChosen.map(item => <DrawerItem key={item.id} item={item} deleteFromCard={() => deleteFromCard(item)} />)}
            </div>
          </div>
        </div>}
    </>
  )
}

export default Drawer