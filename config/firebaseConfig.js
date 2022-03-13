import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: 'AIzaSyD36MfOLpvr00aVZft0tK1IGhCM2v6RE0s',
  authDomain: 'ecommerce-926a1.firebaseapp.com',
  projectId: 'ecommerce-926a1',
  storageBucket: 'ecommerce-926a1.appspot.com',
  appId: '1:785436563123:android:555b30dd0bfaf8a68ac2c6',
  databaseUrl: 'https://ecommerce-926a1-default-rtdb.firebaseio.com/',
};

firebase.initializeApp(firebaseConfig);

let firebaseDB = firebase.database();
let firebaseAuth = firebase.auth();

export {firebaseDB, firebaseAuth};
//  databaseUrl: 'https://ecommerce-app-55cfc-default-rtdb.firebaseio.com/',