import React from 'react'

const CloseDeleteIcon = ({deleteFromCard, isClosed, setIsOpened}) => {
  return (
    <div className={isClosed ? ['close_delete-icon', 'close'].join(' ') : 'close_delete-icon'} onClick={()=>isClosed ? setIsOpened(false) : deleteFromCard()}></div>
  )
}

export default CloseDeleteIcon