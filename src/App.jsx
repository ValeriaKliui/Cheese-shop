import { useState, useEffect } from 'react'
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss'
import Header from './components/Header'
import Drawer from './components/Drawer'
import Home from './pages/Home';
import Favourite from './pages/Favourite';
import CatalogItem from './components/CatalogItem';

function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [itemsChosen, setItemsChosen] = useState([]);
  const [itemsLiked, setItemsLiked] = useState([]);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [inputSearch, setInputSearch] = useState('');

  useEffect(() => {
    async function fetch() {
      const cardResponse = await axios.get('https://6499d13579fbe9bcf840095e.mockapi.io/card');
      const likedResponse = await axios.get('https://649ee36b245f077f3e9d0c98.mockapi.io/liked');
      const itemsResponse = await axios.get('https://6499d13579fbe9bcf840095e.mockapi.io/cheeseItems');
      setIsLoading(false);

      const itemsAtCardID = cardResponse.data.map(elem => elem.parentId);
      const likedItemsID = likedResponse.data.map(elem => elem.parentId)

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
  function handleChange(e) {
    setInputSearch(e);
  }

  function renderItems() {
    const fakeItems = Array(8).fill(1).map((elem,index)=> ({...elem, title: '', atCard: '', liked: '', id: index}))
    const filteredItems = items.filter(item => item.title.toLowerCase().includes(inputSearch.toLowerCase()));
    return (isLoading ? fakeItems : filteredItems).map((item) => {
      return <CatalogItem 
      key={item.id}
        addToCard={() => addToCard(item)} atCard={item.atCard}
        setItems={setItems} items={items}
        liked={item.liked} itemsLiked={itemsLiked} setItemsLiked={setItemsLiked} addToFavourite={() => addToFavourite(item)} loading={isLoading} {...item} />
    })
  }

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
  return (
    <div className='wrapper'>
      <Header setIsOpened={setIsOpened} isOpened={isOpened} />
      <hr />
      <Drawer isOpened={isOpened} setIsOpened={setIsOpened} handleCardClick={handleCardClick} itemsChosen={itemsChosen} setItemsChosen={setItemsChosen}
        items={items} setItems={setItems} itemsLiked={itemsLiked} setItemsLiked={setItemsLiked} />

      <Routes>
        <Route path="/"
          element={<Home itemsChosen={itemsChosen} setItemsChosen={setItemsChosen} items={items} setItems={setItems}
          itemsLiked={itemsLiked} setItemsLiked={setItemsLiked} loading={isLoading}
          inputSearch={inputSearch} 
          renderItems={renderItems} handleChange={handleChange}/>} 
          />
     <Route path="/favourite"
          element={<Favourite itemsChosen={itemsChosen} setItemsChosen={setItemsChosen} items={items} setItems={setItems}
          itemsLiked={itemsLiked} setItemsLiked={setItemsLiked} loading={isLoading}
          inputSearch={inputSearch} 
          renderItems={renderItems} handleChange={handleChange}/>} 
          /> </Routes>
    </div>
  )
}

export default App
