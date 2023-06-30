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

  let itemsAddedEarlier = 0;

  useEffect(() => {
    // axios.get('https://6499d13579fbe9bcf840095e.mockapi.io/card',)
    //   .then(res => {
    //     setItemsChosen(res.data.map(item => item));
    //     return axios.get('https://6499d13579fbe9bcf840095e.mockapi.io/cheeseItems')
    //   })
    //   .then(res => {
    //     setItems(res.data.map(item => ({ ...item })))
    //     itemsAddedEarlier = res.data;
    //     return axios.get('https://6499d13579fbe9bcf840095e.mockapi.io/card')
    //   }).then(res => {
    //     if (res.data.length > 0) {
    //       res.data.map(elem => {
    //         if (itemsAddedEarlier.filter(elem1 => elem1.title === elem.title).length > 0) {
    //           setItems(prevItems => {
    //             return prevItems.map(prevItem => {
    //               if (prevItem.title === elem.title) {
    //                 return { ...prevItem, atCard: true }
    //               }
    //               else return prevItem;
    //             })
    //           })
    //         }
    //         else return elem
    //       })
    //     }
    //   })
    axios.get('https://6499d13579fbe9bcf840095e.mockapi.io/card',)
      .then(res => {
        setItemsChosen(res.data.map(item => item));
      })
    axios.get('https://6499d13579fbe9bcf840095e.mockapi.io/cheeseItems',)
      .then(res => {
        setItems(res.data.map(item => item));
      })
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
      <Catalog itemsChosen={itemsChosen} setItemsChosen={setItemsChosen} items={items} setItems={setItems} itemsLiked={itemsLiked} setItemsLiked={setItemsLiked} />
      <Drawer isOpened={isOpened} setIsOpened={setIsOpened} handleCardClick={handleCardClick} itemsChosen={itemsChosen} setItemsChosen={setItemsChosen} items={items} setItems={setItems} itemsLiked={itemsLiked} setItemsLiked={setItemsLiked} />
    </div>
  )
}

export default App
