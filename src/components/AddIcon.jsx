import React from 'react'

const AddIcon = ({onClickPlus, isAdded,addToCard}) => {
  return (
    <div className={isAdded ? ['add-icon', 'added'].join(' ') : ['add-icon']} onClick={()=>{onClickPlus();addToCard()}}></div>
  )
}

export default AddIcon