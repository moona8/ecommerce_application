import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: 'AIzaSyBV2yxIwkyWOEtbtHzALM8OA22FPFiB5rI',
  authDomain: 'ecommerce-app-55cfc.firebaseapp.com',
  projectId: 'ecommerce-app-55cfc',
  storageBucket: 'ecommerce-app-55cfc.appspot.com',
  appId: '1:136134755375:android:99b185cb1c63bc22e0f2da',
  databaseUrl: 'https://ecommerce-app-55cfc-default-rtdb.firebaseio.com/',
};

firebase.initializeApp(firebaseConfig);

let firebaseDB = firebase.database();
let firebaseAuth = firebase.auth();

export {firebaseDB, firebaseAuth};
//  databaseUrl: 'https://ecommerce-app-55cfc-default-rtdb.firebaseio.com/',