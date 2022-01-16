import React, { useEffect,useState } from 'react';
// import {View,Text,} from 'react-native'

// import { View, Text } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Loginscreen from './screens/Loginscreen';
import OnBoardingScreen from './screens/OnBoardingScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  // const [isFirstScreen,setIsFirstScreen]=useState(null)

  // useEffect(() => {
   
  // }, [])
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} />
        <Stack.Screen name="Loginscreen" component={Loginscreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
