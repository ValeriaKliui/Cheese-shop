import { useState, useEffect } from 'react'
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import './App.scss'
import Header from './components/Header'
import Drawer from './components/Drawer'
import Home from './pages/Home';
import Favourite from './pages/Favourite';
import CatalogItem from './components/CatalogItem';
import AppContext from './AppContext';
import useTotalPrice from './hooks/useTotalPrice';

function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [itemsChoosen, setItemsChoosen] = useState([]);
  const [itemsLiked, setItemsLiked] = useState([]);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [inputSearch, setInputSearch] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [ordered, setOrdered] = useState(false);

  useEffect(() => {
    async function fetch() {
      const cardResponse = await axios.get('https://6499d13579fbe9bcf840095e.mockapi.io/card');
      const likedResponse = await axios.get('https://649ee36b245f077f3e9d0c98.mockapi.io/liked');
      const itemsResponse = await axios.get('https://6499d13579fbe9bcf840095e.mockapi.io/cheeseItems');
      setIsLoading(false);

      const itemsAtCardID = cardResponse.data.map(elem => elem.parentId);
      const likedItemsID = likedResponse.data.map(elem => elem.parentId)

      setItemsChoosen(cardResponse.data);
      setItemsLiked(likedResponse.data.map(elem => setItemsLikedChoosen(elem.parentId, itemsAtCardID, likedItemsID, elem)));
      setItems(itemsResponse.data.map(elem => setItemsLikedChoosen(elem.id, itemsAtCardID, likedItemsID, elem)));
      setTotalPrice(() => {
        const costsAtCard = cardResponse.data.map(e => e.cost);
        return costsAtCard.reduce((accum, curr) => accum + +curr, 0);
      })
    }
    fetch();
  }, [])

  function setItemsLikedChoosen (id, itemsAtCardID, likedItemsID, elem){
    const itemAtCard = itemsAtCardID.includes(id);
    const itemLiked = likedItemsID.includes(id);
    if (itemAtCard && itemLiked) return { ...elem, atCard: true, liked: true };
    if (!itemAtCard && itemLiked) return { ...elem, liked: true, atCard: false };
    if (itemAtCard && !itemLiked) return { ...elem, atCard: true, liked: false };
    return elem;
  }

  function handleCardClick(e) {
    if (!e.target.closest('.drawer')) {
      setIsOpened(false)
    }
  }
  function handleChange(e) {
    setInputSearch(e);
  }

  function renderItems(itemsToRender) {
    const fakeItems = Array(8).fill(1).map((elem, index) => ({ ...elem, title: '', atCard: '', liked: '', id: index }));
    const filteredItems = itemsToRender.filter(item => item.title.toLowerCase().includes(inputSearch.toLowerCase()));
    return (isLoading ? fakeItems : filteredItems).map((item) => {
      const isFavourite = item.parentId;
      return <CatalogItem
        key={item.id}
        addToCard={() => isFavourite ? addToCard(item, item.parentId) : addToCard(item, item.id)}
        addToFavourite={() => isFavourite ? addToFavourite(item, item.parentId) : addToFavourite(item, item.id)}
        setItems={setItems} items={items}
        loading={isLoading} {...item} />
    })
  }

  function addToCard(item, id) {
    setOrdered(false)
    const alreadyAtCard = itemsChoosen.find(elem => +elem.parentId === +id);
    if (alreadyAtCard) {
      setTotalPrice(() => {
        const costsAtCard = itemsChoosen.map(e => e.cost);
        return costsAtCard.reduce((accum, curr) => accum + +curr, 0) - +item.cost;
      })
      itemsChoosen.map(elem => +elem.parentId === +id && axios.delete(`https://6499d13579fbe9bcf840095e.mockapi.io/card/${elem.id}`));
      setItemsLiked(prevItems => prevItems.map(elem => +elem.parentId === +id ? { ...elem, atCard: false } : elem));
      setItemsChoosen(prevItems => prevItems.filter(elem => +elem.parentId !== +id));
      setItems(prevItems => prevItems.map(elem => +elem.id === +id ? { ...elem, atCard: !elem.atCard } : elem));
      console.log(Number(item.cost))
    }
    else {
      setTotalPrice(() => {
        const costsAtCard = itemsChoosen.map(e => e.cost);
        return costsAtCard.reduce((accum, curr) => accum + +curr, 0) + +item.cost;
      })
      axios.post('https://6499d13579fbe9bcf840095e.mockapi.io/card', { ...item, parentId: id, atCard: true }).then(res => setItemsChoosen(prevItems => [...prevItems, res.data]))
      setItemsLiked(prevItems => prevItems.map(elem => +elem.parentId === +id ? { ...elem, atCard: !elem.atCard } : elem));
      setItems(prevItems => prevItems.map(elem => +elem.id === +id ? { ...elem, atCard: !elem.atCard } : elem));
    }
  }
  
  function addToFavourite(item, id) {
    const alreadyLiked = itemsLiked.find(elem => +elem.parentId === +id);
    if (alreadyLiked) {
      itemsLiked.map(elem => +elem.parentId === +id && axios.delete(`https://649ee36b245f077f3e9d0c98.mockapi.io/liked/${elem.id}`));
      setItemsLiked(prevItems => prevItems.map(elem => +elem.parentId === +id ? { ...elem, liked: !elem.liked } : elem));
      setItemsLiked(prevItems => prevItems.filter(elem => +elem.parentId !== +id));
      setItems(prevItems => prevItems.map(elem => +elem.id === +id ? { ...elem, liked: !elem.liked } : elem));
    }
    else {
      addToCardFav(setItems, 'https://649ee36b245f077f3e9d0c98.mockapi.io/liked', item, id)
      axios.post('https://649ee36b245f077f3e9d0c98.mockapi.io/liked', { ...item, parentId: id, liked: true }).then(res => setItemsLiked(prevItems => [...prevItems, res.data]))
      setItems(prevItems => prevItems.map(elem => +elem.id === +id ? { ...elem, liked: !elem.liked } : elem));
    }
  }

  function addToCardFav(set, link, item, id){
    
  }

  function deleteFromCard(item) {
    setItemsChoosen(prevItems => prevItems.filter(elem => elem.id !== item.id))
    setItems(prevItems => prevItems.map(elem => elem.id === item.parentId ? { ...elem, atCard: !elem.atCard } : elem));
    axios.delete(`https://6499d13579fbe9bcf840095e.mockapi.io/card/${item.id}`);
    setTotalPrice(() => {
      const costsAtCard = itemsChoosen.map(e => e.cost);
      return costsAtCard.reduce((accum, curr) => accum + +curr, 0) - +item.cost;
    })  
  }

  return (
    <AppContext.Provider value={{
      items, itemsChoosen, itemsLiked, setIsOpened, isOpened, totalPrice,
      handleCardClick, deleteFromCard, renderItems, handleChange,
      setItemsChoosen, setItems, setItemsLiked, setTotalPrice,
      ordered, setOrdered
    }}>
      <div className='wrapper'>
        <Header />
        <hr />
        <Drawer />
        <Routes>
          <Route path="/" element={<Home />}
          />
          <Route path="/favourite" element={<Favourite />}
          />
        </Routes>
      </div>
    </AppContext.Provider>
  )
}

export default App
