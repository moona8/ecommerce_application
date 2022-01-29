import { View, Text ,StyleSheet,} from 'react-native';
import React,{useContext} from 'react';
import {AppContext} from '../utils/globalState';

export default function AccountScreen() {
  const { user} = useContext(AppContext);
  return (

    <View>
      <View style={styles.userDetails}>
        <Text style={{ fontSize: 22,fontWeight: '500',color:'black',} }>User Detail</Text>
        <View style={styles.details}>
          <Text style={styles.text}>Name :</Text>
          <Text style={styles.text}>{user?.name}</Text>
        </View>
        <View style={styles.details}> 
          <Text style={styles.text}>Email :</Text>
          <Text style={styles.text}>{user?.email}</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.text}>City :</Text>
          <Text style={styles.text}>{user?.city}</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  userDetails: {
    // borderWidth: 2,
    width: '100%',
    marginLeft: 10,
    width: '95%',
    marginTop: 10,
    height:40
  },
  details: {
    borderWidth: 2,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    //  fontWeight:' bold'
    height:35,
    
  },
  text:{
    fontSize: 18,
    fontWeight: '500',
    color:'black',
  },
  placeOrder: {
    borderWidth: 2,
    textAlign: 'center',
    justifyContent: 'center',
    width: 100,
    height: 20,
    marginLeft: '35%',
    marginTop: 10,
  },
});

