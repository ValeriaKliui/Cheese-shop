import AddIcon from './AddIcon';
import { useContext } from 'react';
import AppContext from '../AppContext';
import FavouriteIcon from './FavouriteIcon';
import ContentLoader from 'react-content-loader';

const CatalogItem = ({
  title,
  src,
  cost,
  addToCard,
  atCard,
  liked,
  addToFavourite,
  loading,
}) => {
  const { isAccount } = useContext(AppContext);
  return (
    <div className="catalog__item">
      {loading ? (
        <ContentLoader
          speed={2}
          width="120%"
          height={200}
          viewBox="0 0 200 200"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="10" ry="10" width="150" height="90" />
          <rect x="0" y="107" rx="3" ry="3" width="150" height="15" />
          <rect x="0" y="126" rx="3" ry="3" width="93" height="15" />
          <rect x="0" y="161" rx="8" ry="8" width="80" height="24" />
          <rect
            x="116"
            y="153"
            rx="8"
            ry="8"
            width="32"
            height="32"
          />
        </ContentLoader>
      ) : (
        <>
          <div className="item__photo">
            {!isAccount && (
              <FavouriteIcon
                addToFavourite={addToFavourite}
                liked={liked}
              />
            )}
            <img src={src} alt="" className="item__img" />
          </div>
          <p className="text item__title">{title}</p>
          <div className="properties">
            <div className="cost">
              <p className="small_text cost__text">Цена:</p>
              <p className="cost__amount">{cost} BYN</p>
            </div>
            {!isAccount && (
              <AddIcon addToCard={addToCard} atCard={atCard} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CatalogItem;
