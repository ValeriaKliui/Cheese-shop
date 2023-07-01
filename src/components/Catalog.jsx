import { React, useState, useEffect } from 'react'
import axios from 'axios';
import CatalogItem from './CatalogItem'
import input_pic from '../assets/icons/search_lupa.svg';
import MyInput from './UI/input/MyInput'
import { nanoid } from 'nanoid'

const Catalog = ({ itemsChosen, setItemsChosen, items, setItems, itemsLiked, setItemsLiked, loading }) => {
  const [inputSearch, setInputSearch] = useState('');


  function addToCard(item) {
    const alreadyAtCard = itemsChosen.find(elem => +elem.parentId === +item.id);
    if (alreadyAtCard) {
      itemsChosen.map(elem => +elem.parentId === +item.id ? axios.delete(`https://6499d13579fbe9bcf840095e.mockapi.io/card/${elem.id}`) : null);
      setItemsChosen(prevItems => prevItems.filter(elem => +elem.parentId !== +item.id));
      setItems(prevItems => prevItems.map(elem => +elem.id === +item.id ? { ...elem, atCard: !elem.atCard } : elem));
    }
    else {
      axios.post('https://6499d13579fbe9bcf840095e.mockapi.io/card', { ...item, parentId: item.id }).then(res => setItemsChosen(prevItems => [...prevItems, res.data]))
      setItems(prevItems => prevItems.map(elem => +elem.id === +item.id ? { ...elem, atCard: !elem.atCard } : elem));
    }
  }

  function addToFavourite(item) {
    const alreadyLiked = itemsLiked.find(elem => +elem.parentId === +item.id);
    if (alreadyLiked) {
      itemsLiked.map(elem => +elem.parentId === +item.id ? axios.delete(`https://649ee36b245f077f3e9d0c98.mockapi.io/liked/${elem.id}`) : null);
      setItemsLiked(prevItems => prevItems.filter(elem => +elem.parentId !== +item.id));
      setItems(prevItems => prevItems.map(elem => +elem.id === +item.id ? { ...elem, liked: !elem.liked } : elem));
    }
    else {
      axios.post('https://649ee36b245f077f3e9d0c98.mockapi.io/liked', { ...item, parentId: item.id }).then(res => setItemsLiked(prevItems => [...prevItems, res.data]))
      setItems(prevItems => prevItems.map(elem => +elem.id === +item.id ? { ...elem, liked: !elem.liked } : elem));
    }
  }

  function handleChange(e) {
    setInputSearch(e);
  }


  function renderItems() {
    const fakeItems = Array(8).fill(1).map((elem,index)=> ({...elem, title: '', atCard: '', liked: '', id: index}))
    const filteredItems = items.filter(item => item.title.toLowerCase().includes(inputSearch.toLowerCase()));
    return (loading ? fakeItems : filteredItems).map((item) => {
      return <CatalogItem 
      key={item.id}
        addToCard={() => addToCard(item)} atCard={item.atCard}
        setItems={setItems} items={items}
        liked={item.liked} itemsLiked={itemsLiked} setItemsLiked={setItemsLiked} addToFavourite={() => addToFavourite(item)} loading={loading} {...item} />
    })
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
        {renderItems()}
      </div>
    </div>
  )
}

export default Catalog