import { useContext } from 'react';
import AppContext from '../AppContext';
import Catalog from '../components/Catalog';

const Home = () => {
  const { setIsAccount } = useContext(AppContext);
  setIsAccount(false);

  return <Catalog />;
};

export default Home;
