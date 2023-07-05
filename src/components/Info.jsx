import MyButton from "./UI/button/MyButton"
import { useContext } from 'react'
import AppContext from '../AppContext';
import { useEffect } from "react";

const Info = ({ title, subtext, src }) => {
  const { setIsOpened,isOpened } = useContext(AppContext);
  useEffect(()=>{
    console.log('j')
  }, [isOpened]);

  return (
    <div className='info'>
      <img src={src} alt="" />
      <h3>{title}</h3>
      <p className="subtext info__subtext">{subtext}</p>
      <MyButton text='Вернуться назад' onClick={console.log('j')} />
    </div>
  )
}

export default Info