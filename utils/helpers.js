export const getFormaterdErrorMessage = message => {
    // split("The great Book") => ["The", "great", "Book"]
  const messages = message.split(' ');
  const key=messages[messages.length-1]

  switch (key) {
    case '(auth/invalid-email).':
      return 'Invalid Email';

    case '(auth/weak-password).':
      return 'Weak password';

    default:
      break;
  }
};
