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
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        // tabBarShowLabel: false,
        tabBarStyle: {backgroundColor: 'grey'},
        tabBarInactiveTintColor: 'blue',
        tabBarInactiveBackgroundColor: 'pink',
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: (props) => (
            <Ionicons name="home-outline" color={props.focused ? "blue" : "red"} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
          tabBarIcon:(props) => (
            <Ionicons name="md-cart-outline" color={props.focused ? "blue" : "red"} size={25} />
            ),
          }}
        
      />
      <Tab.Screen
        name="OrderDetailScreen"
        component={OrderDetailScreen}
        options={{
          
          tabBarIcon: (props) => (
            <Ionicons name="time-outline" color={props.focused ? "blue" : "red"} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={AccountScreen}
        options={{
          
          tabBarIcon: (props) => (
            <Ionicons name="person-outline" color={props.focused ? "blue" : "red"} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const App = ({navigation}) => {
  const [user, setUser] = useState(null);

  return (
    <AppContext.Provider value={{user, setUser}}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            // tabBarShowLabel: false,
            // tabBarStyle: {backgroundColor: 'grey'},
            // tabBarInactiveTintColor: 'blue',
            // tabBarInactiveBackgroundColor: 'pink',
          }}>
          <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          {/* <Stack.Screen name="LoginScreen" component={LoginScreen} /> */}
          <Stack.Screen
            name="Product Details"
            component={ProductDetailScreen}
          />
          <Stack.Screen
            // screenOptions={{headerShown: false}}
            name="TabNav"
            component={TabNavigator}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
};

export default App;
