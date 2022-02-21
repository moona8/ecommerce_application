import React, {createContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './Navigation';
import {AppContext} from './utils/globalState';

const App = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  return (
    <AppContext.Provider value={{user, setUser, orders, setOrders}}>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </AppContext.Provider>
  );
};

export default App;
