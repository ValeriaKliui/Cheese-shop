import { useState, useEffect } from 'react'
import axios from 'axios';
import Header from './components/Header'
import './App.scss'
import Catalog from './components/Catalog'
import Drawer from './components/Drawer'

function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [itemsChosen, setItemsChosen] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('https://6499d13579fbe9bcf840095e.mockapi.io/cheeseItems').then(res=>setItems(res.data.map(item => ({ ...item, atCard: false }))))
    axios.get('https://6499d13579fbe9bcf840095e.mockapi.io/card').then(res=>setItemsChosen(res.data.map(item => ({ ...item, atCard: false }))))
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
      <Catalog itemsChosen={itemsChosen} setItemsChosen={setItemsChosen} items={items} setItems={setItems}/>
      <Drawer isOpened={isOpened} setIsOpened={setIsOpened} handleCardClick={handleCardClick} itemsChosen={itemsChosen} setItemsChosen={setItemsChosen} items={items} setItems={setItems}/>
    </div>
  )
}

export default App
