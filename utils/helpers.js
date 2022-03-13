import AsyncStorage from '@react-native-async-storage/async-storage';
export const getFormaterdErrorMessage = message => {
  // split("The great Book") => ["The", "great", "Book"]
  const messages = message.split(' ');
  const key = messages[messages.length - 1];

  switch (key) {
    case '(auth/invalid-email).':
      return 'Invalid Email';

    case '(auth/weak-password).':
      return 'Weak password';

    case '(auth/user-not-found).':
      return 'User not found';

    case '(auth/wrong-password).':
      return 'Wrong password';

    default:
      break;
  }
};
export const storeData = async value => {
  const jsonValue = JSON.stringify(value);
  return await AsyncStorage.setItem('@user', jsonValue);
};

export const getData = async () => {
  return AsyncStorage.getItem('@user');
  // return jsonValue != null ? JSON.sparse(jsonValue) : null;
};

export const getFormattedUser = userDetails => {
  let updatedUser = {...userDetails};
  updatedUser['cartKeys'] = updatedUser?.cart
    ? Object.keys(updatedUser.cart)
    : [];
  return updatedUser;
};
