import classes from './MyInput.module.scss'

const MyInput = ({ src, ...props }) => {
  return (
     <div className='with_icon'>
        <input type="text" className={[classes.MyInput, 'input_with_icon'].join(' ')}  {...props} />
        <img src={src} alt="" className='input__img'/>
      </div>
  );
}

export default MyInput