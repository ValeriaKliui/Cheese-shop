import { React, useState, useEffect } from 'react'
import axios from 'axios';
import CatalogItem from './CatalogItem'
import input_pic from '../assets/icons/search_lupa.svg';
import MyInput from './UI/input/MyInput'

const Catalog = ({ itemsChosen, setItemsChosen, items, setItems }) => {
  const [inputSearch, setInputSearch] = useState('');


  function addToCard(item) {
    const notAtCard = !itemsChosen.filter((elem) => elem.title === item.title).length > 0;
    const atCard = !notAtCard;
    if (notAtCard) {
      axios.post('https://6499d13579fbe9bcf840095e.mockapi.io/card', { ...item, atCard: !item.atCard })
        .then(res => { setItemsChosen(prev => [...prev, res.data]) });
      setItems(prevItems => prevItems.map((elem) => {
        if (item.title === elem.title) {
          if (elem.atCard !== item.atCard) return elem;
          else return { ...elem, atCard: !elem.atCard };
        }
        else return elem
      }))
    }
    if (atCard) {
      console.log(item)
      setItems(prevItems => prevItems.map((elem) => {
        if (item.title === elem.title) {
          if (elem.atCard !== item.atCard) return elem;
          else return { ...elem, atCard: !elem.atCard };
        }
        else return elem
      }))
      setItemsChosen(prevItems => {
        return prevItems.filter(elem => {
          if (elem.title === item.title) {
            console.log('hh')
            axios.delete(`https://6499d13579fbe9bcf840095e.mockapi.io/card/${elem.id}`);
          }
          return elem.title !== item.title;
        })
      })
    }
  }

  function handleChange(e) {
    setInputSearch(e);
  }

  const filteredItems = () => {
    return items.filter(item => item.title.toLowerCase().includes(inputSearch.toLowerCase()));
  }

  return (
    <div className='catalog'>
      <div className="catalog__top">
        <h2 className="title catalog__title">
          {inputSearch ? `Поиск по: "${inputSearch}"` : 'Ингредиенты'}
        </h2>
        <MyInput src={input_pic} placeholder='Поиск...' value={inputSearch} onChange={(e) => handleChange(e.target.value)} />
      </div>
      <div className="catalog__items">
        {filteredItems().map((item, index) => {
          return <CatalogItem key={item.title} src={item.src} title={item.title} cost={item.cost} id={item.id} addToCard={() => addToCard(item)} setItems={setItems} items={items} atCard={item.atCard} />
        })}
      </div>
    </div>
  )
}

export default Catalog