import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.scss'
import Header from './components/Header'
import Catalog from './components/Catalog'
import Drawer from './components/Drawer'

function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [itemsChosen, setItemsChosen] = useState([]);
  const [itemsLiked, setItemsLiked] = useState([]);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      const cardResponse = await axios.get('https://6499d13579fbe9bcf840095e.mockapi.io/card');
      const likedResponse = await axios.get('https://649ee36b245f077f3e9d0c98.mockapi.io/liked');
      const itemsResponse = await axios.get('https://6499d13579fbe9bcf840095e.mockapi.io/cheeseItems');
      setIsLoading(false);
 
      const itemsAtCardID = cardResponse.data.map(elem => elem.parentId);
      const likedItemsID = likedResponse.data.map(elem=>elem.parentId)

      setItemsChosen(cardResponse.data);
      setItemsLiked(likedResponse.data);
      setItems(itemsResponse.data.map(elem => {
        return itemsAtCardID.includes(elem.id) ? { ...elem, atCard: true } : elem
      }));
      setItems(itemsResponse.data.map(elem => {
        return likedItemsID.includes(elem.id) ? { ...elem, liked: true } : elem
      }));
    }
    fetch();
  }, [])

  function handleCardClick(e) {
    if (!e.target.closest('.drawer')) {
      setIsOpened(false)
    }
  }
  return (
    <div className='wrapper'>
      <Header setIsOpened={setIsOpened} isOpened={isOpened} />
      <hr />
      <Catalog itemsChosen={itemsChosen} setItemsChosen={setItemsChosen} items={items} setItems={setItems} 
      itemsLiked={itemsLiked} setItemsLiked={setItemsLiked} loading={isLoading}/>
      <Drawer isOpened={isOpened} setIsOpened={setIsOpened} handleCardClick={handleCardClick} itemsChosen={itemsChosen} setItemsChosen={setItemsChosen} 
      items={items} setItems={setItems} itemsLiked={itemsLiked} setItemsLiked={setItemsLiked} />
    </div>
  )
}

export default App
