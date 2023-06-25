import React from 'react'
import CatalogItem from './CatalogItem'
import catalog_pic from '../assets/items/01.png'
import input_pic from '../assets/icons/search_lupa.svg';
import MyInput from './UI/input/MyInput'

const Catalog = () => {
  return (
    <div className='catalog'>
      <div className="catalog__top">
        <h2 className="title catalog__title">
          Ингредиенты
        </h2>
        <MyInput src={input_pic} placeholder='Поиск...' />
      </div>
      <div className="catalog__items">
        <CatalogItem src={catalog_pic} />
      </div>
    </div>
  )
}

export default Catalog