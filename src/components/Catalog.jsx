import { React, useState, useEffect } from 'react'
import axios from 'axios';
import CatalogItem from './CatalogItem'
import input_pic from '../assets/icons/search_lupa.svg';
import MyInput from './UI/input/MyInput'

const Catalog = ({renderItems, inputSearch, handleChange }) => {

  return (
    <div className='catalog'>
      <div className="catalog__top">
        <h2 className="title catalog__title">
          {inputSearch ? `Поиск по: "${inputSearch}"` : 'Ингредиенты'}
        </h2>
        <MyInput src={input_pic} placeholder='Поиск...' value={inputSearch} onChange={(e) => handleChange(e.target.value)} />
      </div>
      <div className="catalog__items">
        {renderItems()}
      </div>
    </div>
  )
}

export default Catalog