import React from 'react'
import classes from './MyInput.module.scss'

const MyInput = ({ src, ...props }) => {
  const UsualInput = () => {
    return <input type="text" className={classes.MyInput} {...props} />
  }
  const InputWithIcon = () => {
    return (
      <div className='with_icon'>
        <input type="text" className={[classes.MyInput, 'input_with_icon'].join(' ')} {...props} />
        <img src={src} alt="" className='input__img'/>
      </div>
    )
  }

  return (
    <>
      {src ? (
        <InputWithIcon />
      ) : (
        <UsualInput />
      )}
    </>
  );
}

export default MyInput