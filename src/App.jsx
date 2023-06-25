import { useState } from 'react'
import Header from './components/Header'
import './App.scss'
import Catalog from './components/Catalog'

function App() {

  return (
    <div className='wrapper'>
      <Header />
      <hr />
      <Catalog />
    </div>
  )
}

export default App
