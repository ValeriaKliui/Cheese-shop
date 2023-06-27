import { useState, useEffect } from 'react'
import Header from './components/Header'
import './App.scss'
import Catalog from './components/Catalog'
import Drawer from './components/Drawer'

function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [itemsChosen, setItemsChosen] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('https://6499d13579fbe9bcf840095e.mockapi.io/cheeseItems').then(data => data.json()).then(data => {
      setItems(data.map(item => ({ ...item, atCard: false })))
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
      <Catalog itemsChosen={itemsChosen} setItemsChosen={setItemsChosen} items={items} setItems={setItems}/>
      <Drawer isOpened={isOpened} handleCardClick={handleCardClick} itemsChosen={itemsChosen} setItemsChosen={setItemsChosen} items={items} setItems={setItems}/>
    </div>
  )
}

export default App
