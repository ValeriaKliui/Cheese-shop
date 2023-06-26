import { useState } from 'react'
import Header from './components/Header'
import './App.scss'
import Catalog from './components/Catalog'
import Drawer from './components/Drawer'

function App() {
  const [isOpened, setIsOpened] = useState(false);
  function handleCardClick(e) {
    if (!e.target.closest('.drawer')) {
      setIsOpened(false)
    }
  }
  return (
    <div className='wrapper'>
      <Header setIsOpened={setIsOpened} isOpened={isOpened} />
      <hr />
      <Catalog />
      <Drawer isOpened={isOpened} handleCardClick={handleCardClick} />
    </div>
  )
}

export default App
