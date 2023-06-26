import { React, useState, useEffect } from 'react'
import CatalogItem from './CatalogItem'
import input_pic from '../assets/icons/search_lupa.svg';
import MyInput from './UI/input/MyInput'

const Catalog = () => {
  const [items, setItems] = useState([]);
  const [itemsChosen, setItemsChosen] = useState([]);

  useEffect(()=>{
    fetch('https://6499d13579fbe9bcf840095e.mockapi.io/cheeseItems').then(data => data.json()).then(data => setItems(data))}
    , [])

    
  return (
    <div className='catalog'>
      <div className="catalog__top">
        <h2 className="title catalog__title">
          Ингредиенты
        </h2>
        <MyInput src={input_pic} placeholder='Поиск...' />
      </div>
      <div className="catalog__items">
        {items.map(item=>{
          return <CatalogItem key={item.id} src={item.src} title={item.title} cost={item.cost}/>
        })}
      </div>
    </div>
  )
}

export default Catalog