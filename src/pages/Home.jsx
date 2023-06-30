import React from 'react'
import Catalog from '../components/Catalog'

const Home = () => {
  return (
    <Catalog itemsChosen={itemsChosen} setItemsChosen={setItemsChosen} items={items} setItems={setItems} itemsLiked={itemsLiked} setItemsLiked={setItemsLiked} />
    )
}

export default Home