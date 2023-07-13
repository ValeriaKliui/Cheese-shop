const AddIcon = ({ atCard, addToCard }) => {
  return (
    <div
      className={
        atCard ? ['add-icon', 'added'].join(' ') : ['add-icon']
      }
      onClick={() => {
        addToCard();
      }}
    ></div>
  );
};

export default AddIcon;
