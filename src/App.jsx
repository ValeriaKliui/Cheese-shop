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
      setItemsLiked(likedResponse.data.map(elem => {
        const itemAtCard = itemsAtCardID.includes(elem.parentId);
        const itemLiked = likedItemsID.includes(elem.parentId);
        console.log(itemAtCard,itemLiked)
        if (itemAtCard && itemLiked) return { ...elem, atCard: true, liked: true };
        if (!itemAtCard && itemLiked) return { ...elem, liked: true, atCard: false };
        if (itemAtCard && !itemLiked) return { ...elem, atCard: true, liked: false };
        return elem;
      }));
      setItems(itemsResponse.data.map(elem => {
        const itemAtCard = itemsAtCardID.includes(elem.id);
        const itemLiked = likedItemsID.includes(elem.id);
        if (itemAtCard && itemLiked) return { ...elem, atCard: true, liked: true };
        if (!itemAtCard && itemLiked) return { ...elem, liked: true, atCard: false };
        if (itemAtCard && !itemLiked) return { ...elem, atCard: true, liked: false };
        return elem
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
    const isFavourite = item.parentId;
    const alreadyAtCard = itemsChosen.find(elem => +elem.parentId === +id);
    if (alreadyAtCard) {
      itemsChosen.map(elem => +elem.parentId === +id ? axios.delete(`https://6499d13579fbe9bcf840095e.mockapi.io/card/${elem.id}`) : null);
      isFavourite ? setItemsLiked(prevItems => prevItems.map(elem => +elem.parentId === +id ? { ...elem, atCard: !elem.atCard } : elem)) : null;
      setItemsChosen(prevItems => prevItems.filter(elem => +elem.parentId !== +id));
      setItems(prevItems => prevItems.map(elem => +elem.id === +id ? { ...elem, atCard: !elem.atCard } : elem));
    }
    else {
      axios.post('https://6499d13579fbe9bcf840095e.mockapi.io/card', { ...item, parentId: id }).then(res => setItemsChosen(prevItems => [...prevItems, res.data]))
      setItemsLiked(prevItems => prevItems.map(elem => +elem.parentId === +id ? { ...elem, atCard: !elem.atCard } : elem));
      setItems(prevItems => prevItems.map(elem => +elem.id === +id ? { ...elem, atCard: !elem.atCard } : elem));
    }
  }


  // function addToFavourite(item) {
  //   const alreadyLiked = itemsLiked.find(elem => +elem.parentId === +item.id);
  //   if (alreadyLiked) {
  //     itemsLiked.map(elem => +elem.parentId === +item.id ? axios.delete(`https://649ee36b245f077f3e9d0c98.mockapi.io/liked/${elem.id}`) : null);
  //     setItemsLiked(prevItems => prevItems.filter(elem => +elem.parentId !== +item.id));
  //     setItems(prevItems => prevItems.map(elem => +elem.id === +item.id ? { ...elem, liked: !elem.liked } : elem));
  //   }
  //   else {
  //     axios.post('https://649ee36b245f077f3e9d0c98.mockapi.io/liked', { ...item, parentId: item.id }).then(res => setItemsLiked(prevItems => [...prevItems, res.data]))
  //     setItems(prevItems => prevItems.map(elem => +elem.id === +item.id ? { ...elem, liked: !elem.liked } : elem));
  //   }
  // }


  function deleteFromCard(item) {
    setItemsChosen(prevItems => prevItems.filter(elem => elem.id !== item.id))
    setItems(prevItems => prevItems.map(elem => elem.id === item.parentId ? { ...elem, atCard: !elem.atCard } : elem));
    axios.delete(`https://6499d13579fbe9bcf840095e.mockapi.io/card/${item.id}`);
  }

  return (
    <AppContext.Provider value={{
      items, itemsChosen, itemsLiked, setIsOpened, isOpened,
      handleCardClick, deleteFromCard, renderItems, handleChange
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
