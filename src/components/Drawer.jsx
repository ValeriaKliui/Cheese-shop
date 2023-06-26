import React from 'react'
import CatalogItem from './CatalogItem'

const Drawer = ({ isOpened, handleCardClick }) => {
  return (
    <>
      {isOpened &&
        <div className="shadow" onClick={handleCardClick}> 
          <div className='drawer'>
            <h2 className="title catalog__title">
              Ингредиенты
            </h2>
          </div>
        </div>}
    </>
  )
}

export default Drawer