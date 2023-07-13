import { useContext } from 'react';
import AppContext from '../AppContext';
import input_pic from '../assets/icons/search_lupa.svg';
import MyInput from './UI/input/MyInput';

const Catalog = () => {
  const { renderItems, handleChange, inputSearch, items } =
    useContext(AppContext);

  return (
    <div className="catalog">
      <div className="catalog__top">
        <h2 className="title catalog__title">
          {inputSearch ? `Поиск по: "${inputSearch}"` : 'Ингредиенты'}
        </h2>
        <MyInput
          src={input_pic}
          placeholder="Поиск..."
          value={inputSearch}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
      <div className="catalog__items">{renderItems(items)}</div>
    </div>
  );
};

export default Catalog;
