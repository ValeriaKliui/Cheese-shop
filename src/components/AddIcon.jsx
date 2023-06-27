import React from 'react'

const AddIcon = ({onClickPlus, atCard, addToCard}) => {
  return (
    <div className={atCard ? ['add-icon', 'added'].join(' ') : ['add-icon']} onClick={()=>{onClickPlus(); addToCard()}}></div>
  )
}

export default AddIcon