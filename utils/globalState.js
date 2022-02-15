import {createContext} from 'react';

export const AppContext = createContext({
  user: null,
  setUser: () => {},
  orders: [],
  setOrders: () => {},
});
