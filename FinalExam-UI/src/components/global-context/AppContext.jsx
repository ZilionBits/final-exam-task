import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useUserAuth } from '../authorization/UserAuth';

const POSTSAPI = 'http://localhost:8080/api/v1';

export const GlobalContext = createContext();

const AppContext = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [gamesData, setGamesData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [basketItems, setBasketItems] = useState(new Set());
  const [itemsCount, setItemsCount] = useState(0);
  const { token } = useUserAuth();

  const apiAuthCategory = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
    headers:{
      'Content-Type': 'application/json',
      Authorization:`Bearer ${token}`,
    }
  });

  useEffect(() => {
    let cancel = false;

    const fetchPostCategories = async () => {
      const response = await axios(`${POSTSAPI}/category`);
      setCategories(response.data);
    }

    const fetchGames = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await axios(`${POSTSAPI}`);
        if (!cancel) setGamesData(response.data);
      } catch (error) {
        if (!cancel) setIsError(true);
      }
      setIsLoading(false);
    };

    fetchGames();
    fetchPostCategories();

    return () => {
      cancel = true;
    };
  }, []);

  useEffect(() => {
    let count = basketItems.size;
    setItemsCount(count);
  }, [basketItems]);
  
  const addToBasket = (id) => {
    const item = gamesData.find((game) => game.id === id);
    if (!item) {
      return;
    }
    setBasketItems((bsk) => new Set(bsk).add(item));
  };
  

  const removeBasketItem = (id) => {
    setBasketItems((bsk) => {
      const newSet = new Set(bsk);
      const itemToRemove = [...newSet].find((item) => item.id === id);

      if (itemToRemove) {
        newSet.delete(itemToRemove);
      }

      return newSet;
    });
  };

  const removeCategory = async (cat) => {

    const response = await apiAuthCategory.delete('/category', {data:cat});
    console.log(response.data);
  }

  const addCategory = async (newCat) => {

    const response = await apiAuthCategory.post('/category', newCat);
    console.log(response.data);
  }



  const globalData = { addCategory, removeCategory, categories, itemsCount, addToBasket, setBasketItems, basketItems, removeBasketItem, gamesData, isLoading, isError };

  return <GlobalContext.Provider value={globalData}>{children}</GlobalContext.Provider>;
};

export default AppContext;
