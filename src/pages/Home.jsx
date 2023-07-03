import React from 'react'
import Catalog from '../components/Catalog'

const Home = ({itemsChosen, setItemsChosen, items, setItems, itemsLiked, setItemsLiked, renderItems, handleChange}) => {
  return (
    <Catalog itemsChosen={itemsChosen} setItemsChosen={setItemsChosen} items={items} setItems={setItems} itemsLiked={itemsLiked} setItemsLiked={setItemsLiked} renderItems={renderItems} handleChange={handleChange}/>
    )
}

export default Home