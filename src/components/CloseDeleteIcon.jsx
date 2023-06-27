import React from 'react'

const CloseDeleteIcon = ({deleteFromCard}) => {
  return (
    <div className='close_delete-icon' onClick={deleteFromCard}></div>
  )
}

export default CloseDeleteIcon