import classes from './MyButton.module.scss';

const MyButton = ({ text, onClick }) => {
  return (
    <button className={classes.MyButton} onClick={onClick}>
      {text}
    </button>
  );
};

export default MyButton;
