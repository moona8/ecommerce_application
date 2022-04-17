import React, {createContext, useState, useEffect, useContext} from 'react';
import {View, Text} from 'react-native';

//screens
import LoginScreen from './screens/LoginScreen';
import OnBoardingScreen from './screens/OnBoardingScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import OrderDetailScreen from './screens/OrderDetailScreen';
import AccountScreen from './screens/AccountScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import {getData, getFormattedUser, storeData} from './utils/helpers';

import {AppContext} from './utils/globalState';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// navigation

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';

import {firebaseAuth, firebaseDB} from './config/firebaseConfig';

const Stack = createNativeStackNavigator();
const TabStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// function TabStackScreen() {
//   return (
//     <TabStack.Navigator initialRouteName="HomeScreen">
//       <TabStack.Screen
//         name="HomeScreen"
//         component={HomeScreen}
//         options={{
//           headerShown: false,
//           presentation: 'modal',
//         }}
//       />
//       <TabStack.Screen
//         name="ProductDetailScreen"
//         component={ProductDetailScreen}
//         options={{headerShown: false}}
//       />
//     </TabStack.Navigator>
//   );
// }

function TabNavigator() {
  const {user} = useContext(AppContext);
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
        name="HomeScreen"
        component={HomeScreen}
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
          tabBarBadge: user.cartKeys ?user.cartKeys.length:0 ,
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

const LoadingPage = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Loadig...</Text>
    </View>
  );
};

const Navigation = () => {
  const {setUser,setProducts} = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  
  const _getUserData = () => {
    getData()
      .then(user => {
        if (user) {
          const data = JSON.parse(user)
              firebaseDB.ref(`/users/${data.uid}`).on('value', snap => {
          setUser(getFormattedUser(snap.val()));
          setLoading(false);
          navigation.navigate('TabNav');
        });
          // setUser(JSON.parse(user));
          // navigation.navigate('TabNav');
        }
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
  };
  const getProducts=()=>{
    firebaseDB.ref("/products").get()
    .then((snap)=>{
      console.log(snap.val(), "before");
      const products=Object.values(snap.val())
      console.log(products, "after");
      setProducts(products)})
    .catch((e)=>console.log(e))
  }
  useEffect(() => {
    //loading
    getProducts()
    _getUserData();

    // firebaseAuth.onAuthStateChanged(user => {
    //   console.log("USER", user);
    //   if (user?.uid) {
    //     firebaseDB.ref(`/users/${user.uid}`).on('value', snap => {
    //       setUser(snap.val());
    //       setLoading(false);
    //       navigation.navigate('TabNav');
    //     });
    //   }
    //   setLoading(false);
    // });
  }, []);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="OnBoardingScreen" component={loading ? LoadingPage : OnBoardingScreen} />
      <Stack.Screen name="LoginScreen" component={loading ? LoadingPage : LoginScreen} />
      <Stack.Screen name="SignupScreen" component={loading ? LoadingPage : SignupScreen} />
      <Stack.Screen name="TabNav" component={loading ? LoadingPage : TabNavigator} />
    </Stack.Navigator>
  );
};

export default Navigation;
