import React, {createContext, useState, useEffect} from 'react';

//screens
import LoginScreen from './screens/LoginScreen';
import OnBoardingScreen from './screens/OnBoardingScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import OrderDetailScreen from './screens/OrderDetailScreen';
import AccountScreen from './screens/AccountScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';

import {AppContext} from './utils/globalState';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// navigation
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {firebaseAuth, firebaseDB} from './config/firebaseConfig';

const Stack = createNativeStackNavigator();
const TabStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabStackScreen  ()  {
  return (
    <TabStack.Navigator initialRouteName="HomeScreen">
      <TabStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,presentation: "modal"
        }}
      />
        <TabStack.Screen
            name="ProductDetailScreen"
            component={ProductDetailScreen}
            options={{headerShown: false,
            }}
          />
    </TabStack.Navigator>
  );
};

function TabNavigator() {

  
  return (
    <Tab.Navigator
    initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: true,
        // tabBarShowLabel: false,
        tabBarStyle: {backgroundColor: 'grey'},
        tabBarInactiveTintColor: 'blue',
        tabBarInactiveBackgroundColor: 'pink',
      }}>
      <Tab.Screen
        name="TabStackScreen"
        component={TabStackScreen}
        options={{
          headerShown: false,
          tabBarIcon: props => (
            <Ionicons
              name="home-outline"
              color={props.focused ? 'blue' : 'red'}
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
          tabBarIcon: props => (
            <Ionicons
              name="md-cart-outline"
              color={props.focused ? 'blue' : 'red'}
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name="OrderDetailScreen"
        component={OrderDetailScreen}
        options={{
          tabBarIcon: props => (
            <Ionicons
              name="time-outline"
              color={props.focused ? 'blue' : 'red'}
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={AccountScreen}
        options={{
          tabBarIcon: props => (
            <Ionicons
              name="person-outline"
              color={props.focused ? 'blue' : 'red'}
              size={25}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const App = ({navigation}) => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  return (
    <AppContext.Provider value={{user, setUser, orders, setOrders}}>
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
