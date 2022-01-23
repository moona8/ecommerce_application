import { View, Text,Image,StyleSheet,TouchableOpacity } from 'react-native';
import React from 'react';

export default function HomeScreen() {
  return (
    <View styles={styles.container}>
        <TouchableOpacity
        style={styles.button}
      
      >
        <Text>Men</Text>
      </TouchableOpacity>
        <TouchableOpacity
        style={styles.button}
      
      >
        <Text>Men</Text>
      </TouchableOpacity>
        <TouchableOpacity
        style={styles.button}
      
      >
        <Text>Men</Text>
      </TouchableOpacity>
        <TouchableOpacity
        style={styles.button}
      
      >
        <Text>Men</Text>
      </TouchableOpacity>
     {/* <Image
     styles={styles.img}
        source={require('../assets/kids.jpg')}
      />
     <Image
     styles={styles.img}
        source={require('../assets/women.jpg')}
      />
     <Image
     styles={styles.img}
        source={require('../assets/kid.jpg')}
      /> */}
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      paddingTop: 50,
      display: 'flex',
  flexDirection: 'row',
    },
    button:{
        backgroundColor: '#04AA6D',
        border: 'none',
        color: 'white',
        padding: 40,
        textAlign: 'center',
        textDecoration: 'none',
        // display: 'inline-block',
        fontSize: 16,
        marginRight: 300,
        cursor: 'pointer',
        borderRadius:50,

      
    }
    
  });
//rnf