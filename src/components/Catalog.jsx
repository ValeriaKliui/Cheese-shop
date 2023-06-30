import { React, useState, useEffect } from 'react'
import axios from 'axios';
import CatalogItem from './CatalogItem'
import input_pic from '../assets/icons/search_lupa.svg';
import MyInput from './UI/input/MyInput'

const Catalog = ({ itemsChosen, setItemsChosen, items, setItems, itemsLiked, setItemsLiked }) => {
  const [inputSearch, setInputSearch] = useState('');


  function addToCard(item) {
    // const notAtCard = !itemsChosen.filter((elem) => elem.title === item.title).length > 0;
    // const atCard = !notAtCard;
    // if (notAtCard) {
    //   axios.post('https://6499d13579fbe9bcf840095e.mockapi.io/card', { ...item, atCard: !item.atCard })
    //     .then(res => { setItemsChosen(prev => [...prev, res.data]) });
    //   setItems(prevItems => prevItems.map((elem) => {
    //     if (item.title === elem.title) {
    //       if (elem.atCard !== item.atCard) return elem;
    //       else return { ...elem, atCard: !elem.atCard };
    //     }
    //     else return elem
    //   }))
    // }
    // if (atCard) {
    //   setItems(prevItems => prevItems.map((elem) => {
    //     if (item.title === elem.title) {
    //       if (elem.atCard !== item.atCard) return elem;
    //       else return { ...elem, atCard: !elem.atCard };
    //     }
    //     else return elem
    //   }))
    //   setItemsChosen(prevItems => {
    //     return prevItems.filter(elem => {
    //       if (elem.title === item.title) {
    //         axios.delete(`https://6499d13579fbe9bcf840095e.mockapi.io/card/${elem.id}`).catch(function(error){console.log('its okay^)')});
    //       }
    //       return elem.title !== item.title;
    //     })
    //   })
    // }
    console.log(item)
    console.log(itemsChosen.map(elem=>elem.id === item.id))
  }

  // function addToFavourite (item) {
  //   const notLiked = !itemsLiked.filter((elem) => elem.title === item.title).length > 0;
  //   const alreadyLiked = !notLiked;
  //   if (notLiked) {
  //     axios.post('https://649ee36b245f077f3e9d0c98.mockapi.io/liked', { ...item, liked: !item.liked })
  //       .then(res => { setItemsLiked(prev => [...prev, res.data]) });
  //     setItems(prevItems => prevItems.map((elem) => {
  //       if (item.title === elem.title) {
  //         if (elem.liked !== item.liked) return elem;
  //         else return { ...elem, liked: !elem.liked };
  //       }
  //       else return elem
  //     }))
  //   }
  //   if (alreadyLiked) {
  //     setItems(prevItems => prevItems.map((elem) => {
  //       if (item.title === elem.title) {
  //         if (elem.liked !== item.liked) return elem;
  //         else return { ...elem, liked: !elem.liked };
  //       }
  //       else return elem
  //     }))
  //     setItemsLiked(prevItems => {
  //       return prevItems.filter(elem => {
  //         if (elem.title === item.title) {
  //           axios.delete(`https://649ee36b245f077f3e9d0c98.mockapi.io/liked/${elem.id}`).catch(function(error){console.log('its okay^)')});
  //         }
  //         return elem.title !== item.title;
  //       })
  //     })
  //   }
  // }

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
        {filteredItems().map((item) => {
          return <CatalogItem key={item.title}
          addToCard={() => addToCard(item)} atCard={item.atCard}  
          setItems={setItems} items={items} 
          liked={item.liked} itemsLiked={itemsLiked} setItemsLiked={setItemsLiked} addToFavourite={() => addToFavourite(item)} {...item}/> 
        })}
      </div>
    </div>
  )
}

export default Catalog