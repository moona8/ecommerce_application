import * as React from 'react';
import {View, Text, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Onboarding from 'react-native-onboarding-swiper';

const OnBoardingScreen = () => {
  const navigation = useNavigation()
  return (


    // <Text onPress={() => navigation.navigate("Loginscreen")}>login</Text>
    <Onboarding
    
      onSkip={() => navigation.navigate("LoginScreen")}
      onDone={() => navigation.navigate("LoginScreen")}
      pages={[
        {
          backgroundColor: '#a6e4d0',
          image: <Image source={require('../assets/onboarding-img1.png')} />,
          title: 'Connect to the World',
          subtitle: 'A New Way To Connect With The World',
        },
        {
          backgroundColor: '#fdeb93',
          image: <Image source={require('../assets/onboarding-img2.png')} />,
          title: 'Share Your Favorites',
          subtitle: 'Share Your Thoughts With Similar Kind of People',
        },
        {
          backgroundColor: '#e9bcbe',
          image: <Image source={require('../assets/onboarding-img3.png')} />,
          title: 'Become The Star',
          subtitle: "Let The Spot Light Capture You",
        },
      ]}
    />
  );
};

export default OnBoardingScreen;
