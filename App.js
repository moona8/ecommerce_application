import React, {createContext, useState} from 'react';

//screens
import LoginScreen from './screens/LoginScreen';
import OnBoardingScreen from './screens/OnBoardingScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import OrderDetailScreen from './screens/OrderDetailScreen';
import AccountScreen from './screens/AccountScreen';
import { AppContext } from './utils/globalState';

// navigation
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="CartScreen" component={CartScreen} />
      <Tab.Screen name="OrderDetailScreen" component={OrderDetailScreen} />
      <Tab.Screen name="Settings" component={AccountScreen} />
    </Tab.Navigator>
  );
}



const App = () => {
  const [user, setUser] = useState(null);
console.log(user,"appcComponent")
  return (
    <AppContext.Provider value={{user, setUser}}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SignupScreen" component={SignupScreen} />
          <Stack.Screen name="TabNav" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
};

export default App;
