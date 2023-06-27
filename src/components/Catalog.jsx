import { React, useState, useEffect } from 'react'
import CatalogItem from './CatalogItem'
import input_pic from '../assets/icons/search_lupa.svg';
import MyInput from './UI/input/MyInput'

const Catalog = ({ itemsChosen, setItemsChosen, items, setItems}) => {

  function addToCard(item) {
    const alreadyAdded = itemsChosen.filter(elem => elem.id === item.id);
    alreadyAdded.length > 0 ? setItemsChosen(prevItems => prevItems.filter(elem => elem.id != item.id)) : setItemsChosen(prevItems => [...prevItems, item]);
  }

  return (
    <div className='catalog'>
      <div className="catalog__top">
        <h2 className="title catalog__title">
          Ингредиенты
        </h2>
        <MyInput src={input_pic} placeholder='Поиск...' />
      </div>
      <div className="catalog__items">
        {items.map(item => {
          return <CatalogItem key={item.id} src={item.src} title={item.title} cost={item.cost} id={item.id} addToCard={() => addToCard(item)} setItems={setItems} items={items} atCard={item.atCard}/>
        })}
      </div>
    </div>
  )
}

export default Catalog