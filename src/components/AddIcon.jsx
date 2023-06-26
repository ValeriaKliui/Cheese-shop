import React from 'react'

const AddIcon = ({onClickPlus, isAdded}) => {
  return (
    <div className={isAdded ? ['add-icon', 'added'].join(' ') : ['add-icon']} onClick={onClickPlus}></div>
  )
}

export default AddIcon