
import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  ScrollView,
} from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import {firebaseAuth, firebaseDB} from '../config/firebaseConfig';
import {AppContext} from '../utils/globalState';
import Alert from '../components/Alert';
import {getFormaterdErrorMessage} from "../utils/helpers"

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const {setUser} = useContext(AppContext);
  const validateFeilds = () => {
    if (email === '' || password === '') {
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
      throw new Error('All feilds are required');
    } 
  };

  const login = () => {
    try {
      validateFeilds();
      firebaseAuth
        .signInWithEmailAndPassword(email, password)
        .then(res => {
          // /users/uid
          // return firebaseDB.ref(`/users/${res.user.uid}`).get();
        })
        // .then(snap => {
        //   console.log(snap.val());
        //   // setUser(snap.val());
        //   // navigation.navigate('TabNav');
        // })
        .catch(error => {
          setErrorMessage(getFormaterdErrorMessage(error.message));
          console.log(error)
          setTimeout(() => {
            setErrorMessage('');
          }, 3000);

        });
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(user => {
      if (user.uid) {
        firebaseDB.ref(`/users/${user.uid}`).on("value", snap => {
          setUser(snap.val());
          navigation.navigate('TabNav');
        });
      }
    });
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../assets/logo.jpg')} style={styles.logo} />
      <Text style={styles.text}>ECOMMERCE APP</Text>

      <FormInput
        labelValue={email}
        onChangeText={userEmail => setEmail(userEmail)}
        placeholderText="Email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={password}
        onChangeText={userPassword => setPassword(userPassword)}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />

      <FormButton
        buttonTitle="Sign In"
        onPress={() => login(email, password)}
      />

      {/* <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
        <Text style={styles.navButtonText}>Forgot Password?</Text>
      </TouchableOpacity> */}
      {errorMessage !== '' ? <Alert message={errorMessage} /> : null}
      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate('SignupScreen')}>
        <Text style={styles.navButtonText}>
          Don't have an acount? Create here
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: 'cover',
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    fontFamily: 'Lato-Regular',
  },
});