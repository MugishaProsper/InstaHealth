export const generateRandomPassword = () => {
  const length = 8;
  const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const numberChars = '0123456789';
  const specialChars = '!@#$%&*_+|:?';
  
  const allChars = upperCaseChars + lowerCaseChars + numberChars + specialChars;
  
  let password = '';

  password += upperCaseChars.charAt(Math.floor(Math.random() * upperCaseChars.length));
  password += lowerCaseChars.charAt(Math.floor(Math.random() * lowerCaseChars.length));
  password += numberChars.charAt(Math.floor(Math.random() * numberChars.length));
  password += specialChars.charAt(Math.floor(Math.random() * specialChars.length));

  for (let i = 4; i < length; i++) {
    password += allChars.charAt(Math.floor(Math.random() * allChars.length));
  }

  password = password.split('').sort(() => Math.random() - 0.5).join('');
  
  return password;
};

