import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import {AppContext} from '../utils/globalState';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {firebaseAuth} from '../config/firebaseConfig';
import {storeData} from '../utils/helpers';

export default function AccountScreen({navigation}) {
  const {user, setUser} = useContext(AppContext);
  const logout = () => {
    firebaseAuth
      .signOut()
      .then(() => {
        setUser('');
       return storeData(null);
      })
      .then(() => {navigation.navigate('SignupScreen')})

      .catch(error => {
        // An error happened.
      });
  };
  return (
    <View>
      <View style={styles.userAvata}>
        <View style={styles.avata}></View>
        <Text style={styles.avataName}>{user?.name}</Text>
      </View>

      {/* userDetails */}
      <View style={styles.userDetails}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: '500',
            color: 'black',
            marginBottom: 10,
          }}>
          User Details
        </Text>
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
        <View
          style={{
            borderWidth: 2,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            //  fontWeight:' bold'
            height: 80,
            marginTop: 10,
          }}>
          <Text style={styles.text}>Address :</Text>
          <Text style={styles.text}>{user?.address}</Text>
        </View>
        <View>
          <TouchableOpacity onPress={logout}>
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  userAvata: {
    borderWidth: 2,
    height: 130,
    display: 'flex',
    flexDirection: 'row',
  },
  avata: {
    borderWidth: 2,
    borderRadius: 50,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 20,
    marginTop: 10,
    width: 100,
    height: 100,
  },
  avataName: {
    // borderWidth: 2,
    width: 10,
    height: 10,
    width: 200,
    height: 100,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 25,
    fontWeight: '500',
    color: 'black',
    paddingTop: 30,
  },

  //userDetails
  userDetails: {
    // borderWidth: 2,
    // width: '100%',
    marginLeft: 10,
    width: '95%',
    marginTop: 10,
    height: 40,
    marginBottom: 20,
  },
  details: {
    borderWidth: 2,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    //  fontWeight:' bold'
    height: 35,
    marginTop: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
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
