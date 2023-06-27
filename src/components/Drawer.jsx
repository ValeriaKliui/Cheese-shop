import React from 'react'
import CatalogItem from './CatalogItem'

const Drawer = ({ isOpened, handleCardClick, itemsChosen }) => {
const items = ()=>{
  return itemsChosen.map(item=><p>{item.title}</p>)
}
  return (
    <>
      {isOpened &&
        <div className="shadow" onClick={handleCardClick}> 
          <div className='drawer'>
            <h2 className="title catalog__title">
              Ингредиенты
            </h2>
            {items()}
          </div>
        </div>}
    </>
  )
}

export default Drawer