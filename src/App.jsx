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
      const [cardResponse, likedResponse, itemsResponse] = await Promise.all([
        axios.get('https://6499d13579fbe9bcf840095e.mockapi.io/card'),
        axios.get('https://649ee36b245f077f3e9d0c98.mockapi.io/liked'),
        axios.get('https://6499d13579fbe9bcf840095e.mockapi.io/cheeseItems')
      ])  
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

  function setItemsLikedChoosen(id, itemsAtCardID, likedItemsID, elem) {
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
    setOrdered(false);
    const alreadyAtCard = itemsChoosen.find(elem => +elem.parentId === +id);
    if (alreadyAtCard) {
      setTotalPrice(() => {
        const costsAtCard = itemsChoosen.map(e => e.cost);
        return costsAtCard.reduce((accum, curr) => accum + +curr, 0) - +item.cost;
      })
      removeAlreadyLikedCard(itemsChoosen, id, 'https://6499d13579fbe9bcf840095e.mockapi.io/card/', setItemsLiked, setItemsChoosen, setItems, 'atCard');
    }
    else {
      setTotalPrice(() => {
        const costsAtCard = itemsChoosen.map(e => e.cost);
        return costsAtCard.reduce((accum, curr) => accum + +curr, 0) + +item.cost;
      })
      addToCardFav(setItems, setItemsChoosen, 'https://6499d13579fbe9bcf840095e.mockapi.io/card', item, id, 'atCard')
      setItemsLiked(prevItems => makeOppositeValue(prevItems, 'parentId', id, 'atCard'))
    }
  }

  function addToFavourite(item, id) {
    const alreadyLiked = itemsLiked.find(elem => +elem.parentId === +id);
    if (alreadyLiked) {
      removeAlreadyLikedCard(itemsLiked, id, 'https://649ee36b245f077f3e9d0c98.mockapi.io/liked/', setItemsLiked, setItemsLiked, setItems, 'liked');
    }
    else {
      addToCardFav(setItems, setItemsLiked, 'https://649ee36b245f077f3e9d0c98.mockapi.io/liked', item, id, 'liked')
    }
  }

  function addToCardFav(setItems, setItemsArr, link, item, id, key) {
    try {
      axios.post(link, { ...item, parentId: id, [key]: true }).then(res => setItemsArr(prevItems => [...prevItems, res.data]))
      setItems(prevItems => makeOppositeValue(prevItems, ['id'], id, key))
    } catch (error) {
      alert('Не удалось добавить')
    }
  }

  function removeAlreadyLikedCard(itemsArr, id, link, setItemsArr1, setItemsArr2, setItemsArr3, key) {
   try {
    itemsArr.map(elem => +elem.parentId === +id && axios.delete(`${link}${elem.id}`));
    setItemsArr1(prevItems => makeOppositeValue(prevItems, 'parentId', id, key));
    setItemsArr2(prevItems => prevItems.filter(elem => +elem.parentId !== +id));
    setItemsArr3(prevItems => makeOppositeValue(prevItems, ['id'], id, key)); 
   } catch (error) {
    alert('Не удалось удалить')
   }
  }

  function deleteFromCard(item) {
    try {
      setItemsChoosen(prevItems => prevItems.filter(elem => elem.id !== item.id))
      setItems(prevItems => makeOppositeValue(prevItems, 'id', 'parentId', 'atCard'))
      axios.delete(`https://6499d13579fbe9bcf840095e.mockapi.io/card/${item.id}`);
      setTotalPrice(() => {
        const costsAtCard = itemsChoosen.map(e => e.cost);
        return costsAtCard.reduce((accum, curr) => accum + +curr, 0) - +item.cost;
      })     
    } catch (error) {
      alert('Не удалось удалить из корзины')
    }
  }

  function makeOppositeValue(arrItems, indexElem, id, key) {
    return arrItems.map(elem => +elem[indexElem] === +id ? { ...elem, [key]: !elem[key] } : elem);
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
