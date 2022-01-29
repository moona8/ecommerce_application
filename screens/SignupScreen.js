import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  ScrollView,
} from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import Alert from '../components/Alert';
import {getFormaterdErrorMessage} from "../utils/helpers"
import {firebaseAuth, firebaseDB} from '../config/firebaseConfig';

const SignupScreen = ({navigation}) => {
  const [name, setname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [city, setcity] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validateFeilds = () => {
    if (
      name === '' ||
      email === '' ||
      password === '' ||
      city === '' ||
      confirmPassword === ''
    ) {
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
      throw new Error('All feilds are required');
    }
    else if(password!==confirmPassword){
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
      throw new Error('Password not matched');
    }
  };

  const register = () => {
    try {
      validateFeilds();

      firebaseAuth
        .createUserWithEmailAndPassword(email, password)
        .then(response => {
          const user = response.user;
          const userDetails = {
            uid: user.uid,
            email,
            city,
            name,
          };
          return firebaseDB
            .ref('/')
            .child('users')
            .child(user.uid)
            .set(userDetails);
        })
        .then(snap => {
          console.log('SNAP', snap);
          navigation.navigate('TabNav');
        })
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.text}>Create an account</Text>

      <FormInput
        labelValue={name}
        onChangeText={userName => setname(userName)}
        placeholderText="Username"
        iconType="user"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={city}
        onChangeText={userCity => setcity(userCity)}
        placeholderText="Enter your City"
        iconType="lock"
        secureTextEntry={true}
      />

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

      <FormInput
        labelValue={confirmPassword}
        onChangeText={userPassword => setConfirmPassword(userPassword)}
        placeholderText="Confirm Password"
        iconType="lock"
        secureTextEntry={true}
      />

      <FormButton
        buttonTitle="Sign Up"
        onPress={() => register(email, password)}
      />
      {errorMessage !== '' ? <Alert message={errorMessage} /> : null}

      <View style={styles.textPrivate}>
        <Text style={styles.color_textPrivate}>
          By registering, you confirm that you accept our{' '}
        </Text>
        <TouchableOpacity onPress={() => alert('Terms Clicked!')}>
          <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
            Terms of service
          </Text>
        </TouchableOpacity>
        <Text style={styles.color_textPrivate}> and </Text>
        <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
          Privacy Policy
        </Text>
      </View>

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.navButtonText}>Have an account? Sign In</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
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
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    fontFamily: 'Lato-Regular',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 35,
    justifyContent: 'center',
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: '400',
    fontFamily: 'Lato-Regular',
    color: 'grey',
  },
});
