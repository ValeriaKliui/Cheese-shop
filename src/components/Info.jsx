import MyButton from "./UI/button/MyButton"
import { useContext } from 'react'
import AppContext from '../AppContext';

const Info = ({ title, subtext, src }) => {
  const { setIsOpened } = useContext(AppContext);

  function closeDrawer() {
    setIsOpened(false)
  }

  return (
    <div className='info'>
      <img className='info__pic' src={src} alt="" />
      <h3>{title}</h3>
      <p className="subtext info__subtext">{subtext}</p>
      <MyButton text='Вернуться назад' onClick={closeDrawer} />
    </div>
  )
}

export default Info